(function () {
  "use strict";

  const countries = window.INVOICE_COUNTRIES;
  const config = countries[document.body.dataset.country] || countries.custom;
  const root = document.getElementById("invoice-app");
  const storageKey = "invoice-generator-v1-" + config.code;
  const currencyNames = {
    INR: ["Rupees", "Paise"], GBP: ["Pounds", "Pence"], EUR: ["Euros", "Cents"],
    AED: ["Dirhams", "Fils"], AUD: ["Dollars", "Cents"], CAD: ["Dollars", "Cents"],
    SGD: ["Dollars", "Cents"], USD: ["Dollars", "Cents"]
  };
  const currencyOptions = ["INR", "GBP", "EUR", "AED", "AUD", "CAD", "SGD", "USD"];
  const provinces = config.provinces || [];
  const states = config.states || [];
  const escapeHtml = (value) => String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const today = new Date().toISOString().slice(0, 10);
  const defaultRate = () => config.code === "CA" && provinces[0] ? provinces[0].rate : config.rates[config.rates.length - 1] || 0;
  const blankItem = () => ({ description: "", code: "", quantity: "1", price: "0.00", rate: String(defaultRate()) });
  const sampleState = () => ({
    seller: { name: "", address: "", taxId: "", email: "", phone: "", logo: "" },
    client: { name: "Sample Client", address: "8 Garden Road\nMumbai, Maharashtra", taxId: "", email: "" },
    meta: { number: "INV-001", issueDate: today, dueDate: "", terms: "Net 30", customTerms: "", currency: config.currency, po: "", supplyDate: today, sellerState: states.includes("Maharashtra") ? "Maharashtra" : states[0] || "", placeOfSupply: states.includes("Maharashtra") ? "Maharashtra" : states[0] || "", supplyType: "intra", reverseCharge: false, zeroRatedNote: "", euCountry: "DE", province: provinces[0] ? provinces[0].name : "", stateTaxRate: "0", einNote: "" },
    items: [
      { description: "Design consultation", code: "", quantity: "2", price: "125.00", rate: String(defaultRate()) },
      { description: "Project materials", code: "", quantity: "1", price: "80.00", rate: String(config.code === "CA" ? defaultRate() : config.rates[0] || 0) }
    ],
    discount: { mode: "none", kind: "percent", value: "0" },
    charges: "0", amountPaid: "0", notes: "", termsText: "Payment due by the date shown above.", bank: "", paymentString: "", accent: "#3459d1", template: "classic", paper: config.letterDefault ? "letter" : "a4", inclusive: false
  });
  let savedData = readStorage();
  let state = savedData && savedData.draft ? mergeState(sampleState(), savedData.draft) : sampleState();
  if (savedData && savedData.seller && !(savedData.draft && savedData.draft.seller)) {
    state.seller = { ...state.seller, ...savedData.seller };
    if (typeof state.seller.logo !== "string" || state.seller.logo.length > 700000 || !/^data:image\/(?:jpeg|png|webp);base64,/i.test(state.seller.logo)) state.seller.logo = "";
  }
  let undoAction = null;
  let saveTimer;

  function readStorage() {
    try {
      const value = localStorage.getItem(storageKey);
      return value ? JSON.parse(value) : null;
    } catch {
      announce("Browser storage is unavailable. You can still use and download this invoice.");
      return null;
    }
  }

  function writeStorage() {
    try {
      const existing = readStorage() || {};
      existing.draft = state;
      existing.seller = state.seller;
      existing.clients = existing.clients || [];
      existing.items = existing.items || [];
      existing.invoices = (existing.invoices || []).slice(0, 50);
      localStorage.setItem(storageKey, JSON.stringify(existing));
      savedData = existing;
      setStatus("Saved in this browser");
      return true;
    } catch {
      setStatus("Could not save: browser storage is unavailable");
      return false;
    }
  }

  function mergeState(base, incoming) {
    if (!incoming || typeof incoming !== "object") return base;
    const merged = {
      ...base, ...incoming,
      seller: { ...base.seller, ...(incoming.seller || {}) },
      client: { ...base.client, ...(incoming.client || {}) },
      meta: { ...base.meta, ...(incoming.meta || {}) },
      discount: { ...base.discount, ...(incoming.discount || {}) },
      accent: /^#[0-9a-f]{6}$/i.test(incoming.accent || "") ? incoming.accent : base.accent,
      items: Array.isArray(incoming.items) && incoming.items.length ? incoming.items.slice(0, 100).map((item) => ({ ...blankItem(), ...item })) : base.items
    };
    if (typeof merged.seller.logo !== "string" || merged.seller.logo.length > 700000 || !/^data:image\/(?:jpeg|png|webp);base64,/i.test(merged.seller.logo)) merged.seller.logo = "";
    return merged;
  }

  function setStatus(message) {
    const node = document.getElementById("save-status");
    if (node) node.textContent = message;
  }
  function announce(message, undo) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.replaceChildren();
    const text = document.createElement("span");
    text.textContent = message;
    toast.append(text);
    if (undo) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "Undo";
      button.addEventListener("click", undo);
      toast.append(button);
    }
    toast.hidden = false;
    clearTimeout(announce.timer);
    announce.timer = setTimeout(() => { toast.hidden = true; }, 5000);
  }
  function numberInput(name, label, value, options) {
    const type = (options && options.type) || "text";
    const attrs = options && options.attrs ? options.attrs : "";
    return `<label class="field">${escapeHtml(label)}<input name="${escapeHtml(name)}" data-bind="${escapeHtml(name)}" type="${type}" value="${escapeHtml(value || "")}" ${attrs}></label>`;
  }
  function selectInput(name, label, value, options) {
    return `<label class="field">${escapeHtml(label)}<select name="${escapeHtml(name)}" data-bind="${escapeHtml(name)}">${options.map((entry) => `<option value="${escapeHtml(entry[0])}"${String(value) === String(entry[0]) ? " selected" : ""}>${escapeHtml(entry[1])}</option>`).join("")}</select></label>`;
  }
  function textArea(name, label, value) {
    return `<label class="field">${escapeHtml(label)}<textarea name="${escapeHtml(name)}" data-bind="${escapeHtml(name)}" rows="3">${escapeHtml(value || "")}</textarea></label>`;
  }
  function countryExtraFields() {
    const fields = [];
    if (config.extraFields.includes("sellerState")) fields.push(selectInput("meta.sellerState", "Seller state", state.meta.sellerState, states.map((entry) => [entry, entry])));
    if (config.extraFields.includes("placeOfSupply")) {
      fields.push(selectInput("meta.placeOfSupply", "Place of supply", state.meta.placeOfSupply, states.map((entry) => [entry, entry])));
      fields.push(selectInput("meta.supplyType", "Tax type", state.meta.supplyType, [["intra", "Intra-state (CGST + SGST)"], ["inter", "Inter-state (IGST)"]]));
    }
    if (config.extraFields.includes("supplyDate")) fields.push(numberInput("meta.supplyDate", "Supply date / tax point", state.meta.supplyDate, { type: "date" }));
    if (config.extraFields.includes("euCountry")) fields.push(selectInput("meta.euCountry", "Country rate", state.meta.euCountry, [["DE","Germany"],["FR","France"],["ES","Spain"],["IT","Italy"],["NL","Netherlands"],["IE","Ireland"]]));
    if (config.extraFields.includes("province")) fields.push(selectInput("meta.province", "Province / territory", state.meta.province, provinces.map((entry) => [entry.name, `${entry.name} (${entry.rate}% combined)`])));
    if (config.extraFields.includes("stateTaxRate")) fields.push(numberInput("meta.stateTaxRate", "State / local sales tax rate (%)", state.meta.stateTaxRate, { type: "number", attrs: 'min="0" max="100" step="0.001"' }));
    if (config.extraFields.includes("reverseCharge")) fields.push(`<label class="check-field"><input type="checkbox" data-bind="meta.reverseCharge"${state.meta.reverseCharge ? " checked" : ""}> Reverse charge applies</label>`);
    if (config.extraFields.includes("zeroRatedNote")) fields.push(numberInput("meta.zeroRatedNote", "Zero-rated / exemption note", state.meta.zeroRatedNote));
    if (config.extraFields.includes("einNote")) fields.push(numberInput("meta.einNote", "W-9 / EIN note (optional)", state.meta.einNote));
    return fields.join("");
  }

  function mount() {
    root.innerHTML = `
      <div class="ad-slot" id="ad-slot-top" aria-hidden="true"></div>
      <div class="app-toolbar no-print">
        <div class="mode-tabs" role="tablist" aria-label="Invoice workspace">
          <button type="button" class="mode-tab is-active" data-tab="edit" role="tab" aria-selected="true">Edit</button>
          <button type="button" class="mode-tab" data-tab="preview" role="tab" aria-selected="false">Preview</button>
        </div>
        <div class="toolbar-actions">
          <label class="compact-field">Template<select data-bind="template"><option value="classic">Classic</option><option value="modern">Modern</option><option value="minimal">Minimal</option></select></label>
          <label class="compact-field">Paper<select data-bind="paper"><option value="a4">A4</option><option value="letter">Letter</option></select></label>
          <button type="button" class="button secondary" data-action="blank">Start blank</button>
          <button type="button" class="button secondary" data-action="export">Download .json</button>
          <button type="button" class="button secondary" data-action="import">Import .json</button>
          <input id="import-file" class="visually-hidden" type="file" accept="application/json,.json" aria-label="Choose invoice backup file">
          <button type="button" class="button primary" data-action="save">Save invoice</button>
          <button type="button" class="button primary" data-action="print">Download PDF</button>
          <span id="save-status" class="field-help" role="status" aria-live="polite"></span>
        </div>
      </div>
      <div class="workspace">
        <section class="editor no-print" aria-label="Invoice details">
          <form id="invoice-form" novalidate>
            <section class="form-section"><h2>Seller details</h2><div class="field-grid">
              ${numberInput("seller.name", "Business name", state.seller.name)}
              ${numberInput("seller.taxId", config.taxIdLabel, state.seller.taxId)}
              ${numberInput("seller.email", "Email", state.seller.email, { type: "email" })}
              ${numberInput("seller.phone", "Phone", state.seller.phone, { type: "tel" })}
              ${textArea("seller.address", "Business address", state.seller.address)}
            </div><label class="field">Logo (optional, max 500 KB)<input type="file" id="logo-file" accept="image/jpeg,image/png,image/webp,image/gif" aria-describedby="logo-help"><span id="logo-help" class="field-help">Images are resized on your device before saving.</span></label><div id="tax-warning" class="inline-warning" role="status" hidden></div><div id="email-warning" class="inline-warning" role="status" hidden></div></section>
            <section class="form-section"><h2>Client details</h2><div class="field-grid">
              ${numberInput("client.name", "Client name", state.client.name)}
              ${numberInput("client.taxId", `${config.taxIdLabel} (optional)`, state.client.taxId)}
              ${numberInput("client.email", "Client email", state.client.email, { type: "email" })}
              ${textArea("client.address", "Client address", state.client.address)}
            </div><label class="field">Saved clients<select id="saved-clients"><option value="">Choose a saved client</option></select></label><button type="button" class="button secondary" data-action="save-client">Save client details</button></section>
            <section class="form-section"><h2>Invoice details</h2><div class="field-grid">
              ${numberInput("meta.number", "Invoice number", state.meta.number)}
              ${numberInput("meta.issueDate", "Issue date", state.meta.issueDate, { type: "date" })}
              ${numberInput("meta.dueDate", "Due date", state.meta.dueDate, { type: "date" })}
              ${selectInput("meta.terms", "Payment terms", state.meta.terms, [["Due on receipt","Due on receipt"],["Net 7","Net 7"],["Net 15","Net 15"],["Net 30","Net 30"],["Net 45","Net 45"],["Net 60","Net 60"],["custom","Custom"]])}
              <div id="custom-terms-wrap"${state.meta.terms === "custom" ? "" : " hidden"}>${numberInput("meta.customTerms", "Custom payment terms", state.meta.customTerms)}</div>
              ${selectInput("meta.currency", "Currency", state.meta.currency, currencyOptions.map((code) => [code, code]))}
              ${numberInput("meta.po", "PO number (optional)", state.meta.po)}
              ${countryExtraFields()}
            </div><p class="field-help">${escapeHtml(config.wording)}</p></section>
            <section class="form-section"><div class="section-title-row"><h2>Items</h2><button type="button" class="button secondary" data-action="add-item">Add item</button></div>
              <p class="field-help">Tax is rounded half-up to the nearest minor currency unit on each line.</p>
              <div class="toggle-row"><label class="check-field"><input type="checkbox" data-bind="inclusive"${state.inclusive ? " checked" : ""}> Prices include tax</label><span id="tax-mode-note"></span></div>
              <div class="items-editor" id="items-editor"></div>
              <label class="field">Quick-add saved item<select id="saved-items"><option value="">Choose a saved item</option></select></label>
              <div class="field-grid discount-grid">
                ${selectInput("discount.mode", "Discount", state.discount.mode, [["none","No discount"],["invoice","Invoice-level discount"]])}
                ${selectInput("discount.kind", "Discount type", state.discount.kind, [["percent","Percent (%)"],["fixed","Fixed amount"]])}
                ${numberInput("discount.value", "Discount value", state.discount.value, { type: "number", attrs: 'min="0" step="0.01"' })}
                ${numberInput("charges", "Shipping / other charges", state.charges, { type: "number", attrs: 'min="0" step="0.01"' })}
                ${numberInput("amountPaid", "Amount paid", state.amountPaid, { type: "number", attrs: 'min="0" step="0.01"' })}
              </div>
              <div class="inline-warning" id="number-warning" role="status" hidden></div>
            </section>
            <section class="form-section"><h2>Payment and notes</h2><div class="field-grid">
              ${textArea("notes", "Notes", state.notes)}
              ${textArea("termsText", "Terms and conditions", state.termsText)}
              ${textArea("bank", "Bank / payment details", state.bank)}
              ${numberInput("paymentString", "Payment QR text / link (optional)", state.paymentString)}
              <label class="field">Accent colour<input type="color" data-bind="accent" value="${escapeHtml(state.accent)}"></label>
            </div></section>
          </form>
          <section class="form-section saved-list"><h2>Saved invoices</h2><div id="invoice-list"></div></section>
          <section class="form-section"><button type="button" class="button danger" data-action="clear">Clear all my data</button><p class="privacy-note">Your data never leaves your browser.</p></section>
        </section>
        <section class="preview-column" aria-label="Invoice preview"><div id="invoice-preview" class="invoice-paper"></div></section>
      </div>
      <div class="sticky-total no-print" id="sticky-total" aria-live="polite"></div>
      <div class="ad-slot" id="ad-slot-bottom" aria-hidden="true"></div>
      <dialog id="confirm-dialog"><form method="dialog"><h2>Clear all saved invoice data?</h2><p>This removes all invoice-generator drafts, seller details, clients, saved items and invoices from this browser.</p><div class="dialog-actions"><button class="button secondary" value="cancel">Cancel</button><button class="button danger" value="clear">Clear all data</button></div></form></dialog>
      <div id="toast" class="toast" role="status" aria-live="polite" hidden></div>`;
    document.documentElement.style.setProperty("--invoice-accent", state.accent);
    bindEvents();
    renderItems();
    populateSavedLists();
    fillForm();
    updateAll();
  }

  function bindEvents() {
    root.addEventListener("input", onFormChange);
    root.addEventListener("change", onFormChange);
    root.addEventListener("click", onClick);
    document.getElementById("logo-file").addEventListener("change", onLogo);
    document.getElementById("import-file").addEventListener("change", onImport);
    document.getElementById("confirm-dialog").addEventListener("close", onConfirmClose);
    document.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "p") {
        event.preventDefault();
        printInvoice();
      } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        syncFromForm();
        writeStorage();
        announce("Invoice saved in this browser.");
      }
    });
  }

  function onFormChange(event) {
    const target = event.target;
    if (target.matches("[data-bind]")) {
      assignPath(state, target.dataset.bind, target.type === "checkbox" ? target.checked : target.value);
      if (target.dataset.bind === "meta.province") {
        const province = provinces.find((entry) => entry.name === target.value);
        if (province) { state.items.forEach((item) => { item.rate = String(province.rate); }); renderItems(); }
      }
      if (target.dataset.bind === "meta.placeOfSupply" || target.dataset.bind === "meta.sellerState") {
        state.meta.supplyType = state.meta.placeOfSupply === state.meta.sellerState ? "intra" : "inter";
        const supplyType = root.querySelector('[data-bind="meta.supplyType"]');
        if (supplyType) supplyType.value = state.meta.supplyType;
      }
      if (target.dataset.bind === "meta.euCountry") {
        const selectedRate = config.countryRates[target.value];
        state.items.forEach((item) => { item.rate = String(selectedRate || 0); });
        renderItems();
      }
      if (target.dataset.bind === "meta.stateTaxRate") {
        state.items.forEach((item) => { item.rate = String(parseRate(target.value)); });
        renderItems();
      }
      if (target.dataset.bind === "meta.terms") document.getElementById("custom-terms-wrap").hidden = target.value !== "custom";
      if (target.dataset.bind === "template") document.getElementById("invoice-preview").dataset.template = state.template;
      if (target.dataset.bind === "paper") document.documentElement.dataset.paper = state.paper;
    }
    if (target.dataset.itemField) {
      const row = target.closest("[data-item-index]");
      if (row) state.items[Number(row.dataset.itemIndex)][target.dataset.itemField] = target.value;
    }
    if (target.id === "saved-clients" && target.value !== "") {
      const client = (savedData.clients || [])[Number(target.value)];
      if (client) state.client = { ...client };
      fillForm();
    }
    if (target.id === "saved-items" && target.value !== "") {
      const item = (savedData.items || [])[Number(target.value)];
      if (item) state.items.push({ ...item });
      target.value = "";
      renderItems();
    }
    syncFromForm();
    updateAll();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(writeStorage, 250);
  }

  function syncFromForm() {
    root.querySelectorAll("[data-bind]").forEach((input) => assignPath(state, input.dataset.bind, input.type === "checkbox" ? input.checked : input.value));
  }
  function assignPath(object, path, value) {
    const keys = path.split(".");
    let target = object;
    while (keys.length > 1) target = target[keys.shift()];
    target[keys[0]] = value;
  }
  function fillForm() {
    root.querySelectorAll("[data-bind]").forEach((input) => {
      const value = input.dataset.bind.split(".").reduce((object, key) => object && object[key], state);
      if (input.type === "checkbox") input.checked = Boolean(value);
      else if (value !== undefined && value !== null) input.value = value;
    });
    document.documentElement.dataset.paper = state.paper;
    document.getElementById("invoice-preview").dataset.template = state.template;
    document.getElementById("custom-terms-wrap").hidden = state.meta.terms !== "custom";
  }

  function renderItems() {
    const editor = document.getElementById("items-editor");
    editor.replaceChildren();
    const table = document.createElement("table");
    table.className = "items-table";
    const head = document.createElement("thead");
    const header = document.createElement("tr");
    [config.codeLabel || "", "Description", "Qty", "Unit price", `${config.taxLabel} %`, ""].filter((value) => value !== "").forEach((value) => {
      const th = document.createElement("th");
      th.textContent = value;
      header.append(th);
    });
    head.append(header);
    const body = document.createElement("tbody");
    state.items.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.dataset.itemIndex = String(index);
      const fields = [];
      if (config.codeLabel) fields.push(["code", "text", config.codeLabel]);
      fields.push(["description", "text", "Description"], ["quantity", "number", "Quantity"], ["price", "number", "Unit price"], ["rate", "select", "Tax rate"]);
      fields.forEach(([field, type, label]) => {
        const td = document.createElement("td");
        const control = type === "select" ? document.createElement("select") : document.createElement("input");
        const rates = ratesForCountry();
        const customCurrent = field === "rate" && !rates.includes(Number(item.rate));
        if (type === "select") {
          rates.forEach((rate) => {
            const option = document.createElement("option");
            option.value = String(rate);
            option.textContent = `${rate}%`;
            control.append(option);
          });
          const customOption = document.createElement("option");
          customOption.value = "custom";
          customOption.textContent = "Custom…";
          control.append(customOption);
          control.value = customCurrent ? "custom" : String(item.rate);
          if (customCurrent) {
            const custom = document.createElement("input");
            custom.type = "number"; custom.min = "0"; custom.max = "100"; custom.step = "0.01";
            custom.value = item.rate;
            custom.dataset.itemField = field;
            custom.setAttribute("aria-label", `Custom tax rate percent, item ${index + 1}`);
            td.append(custom);
          }
        } else {
          control.type = type;
          if (field === "quantity") { control.min = "0"; control.step = "0.001"; }
          if (field === "price") { control.min = "0"; control.step = "0.01"; }
          control.value = item[field] || "";
        }
        control.dataset.itemField = field;
        control.setAttribute("aria-label", `${label}, item ${index + 1}`);
        if (field === "rate") {
          control.addEventListener("change", () => {
            if (control.value === "custom") {
              if (td.querySelector('input[data-item-field="rate"]')) return;
              const custom = document.createElement("input");
              custom.type = "number"; custom.min = "0"; custom.max = "100"; custom.step = "0.01";
              custom.value = "0";
              custom.dataset.itemField = "rate";
              custom.setAttribute("aria-label", `Custom tax rate percent, item ${index + 1}`);
              td.append(custom);
              custom.focus();
            } else {
              state.items[index].rate = control.value;
              const custom = td.querySelector('input[data-item-field="rate"]');
              if (custom) custom.remove();
              updateAll(); writeStorage();
            }
          });
        }
        td.append(control);
        if (customCurrent) td.insertBefore(control, td.firstChild);
        tr.append(td);
      });
      const actions = document.createElement("td");
      actions.className = "row-actions";
      [["up", "Move up"], ["down", "Move down"], ["duplicate", "Duplicate item"], ["save", "Save item to quick-add"], ["remove", "Remove item"]].forEach(([action, label]) => {
        const button = document.createElement("button");
        button.type = "button"; button.dataset.rowAction = action; button.setAttribute("aria-label", `${label}, item ${index + 1}`);
        button.textContent = action === "up" ? "↑" : action === "down" ? "↓" : action === "duplicate" ? "+" : action === "save" ? "Save" : "×";
        actions.append(button);
      });
      tr.append(actions);
      body.append(tr);
    });
    table.append(head, body);
    editor.append(table);
  }

  function ratesForCountry() {
    if (config.code === "CA") {
      const province = provinces.find((entry) => entry.name === state.meta.province);
      return province ? [0, province.rate] : config.rates;
    }
    if (config.code === "US") return [0, Math.max(0, parseRate(state.meta.stateTaxRate))];
    return config.rates;
  }

  function decimalScaled(value, places) {
    const text = String(value == null ? "" : value).trim();
    if (!/^\d+(?:\.\d*)?$/.test(text)) return 0n;
    const [whole, fraction = ""] = text.split(".");
    const factor = 10n ** BigInt(places);
    const digits = (fraction + "0".repeat(places)).slice(0, places);
    const remainder = fraction.slice(places);
    let result = BigInt(whole) * factor + BigInt(digits || "0");
    if (remainder && Number(remainder[0]) >= 5) result++;
    return result;
  }
  function parseRate(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  }
  function roundHalfUp(numerator, denominator) {
    // Tax is rounded half-up per line to the nearest minor unit before line taxes are summed.
    return (numerator + denominator / 2n) / denominator;
  }
  function moneyToMinor(value) { return decimalScaled(value, 2); }

  function calculate() {
    const lines = state.items.map((item) => {
      const quantityMilli = decimalScaled(item.quantity, 3);
      const unitMinor = moneyToMinor(item.price);
      const grossMinor = roundHalfUp(quantityMilli * unitMinor, 1000n);
      const rateHundredths = decimalScaled(String(parseRate(item.rate)), 2);
      const taxMinor = state.inclusive
        ? roundHalfUp(grossMinor * rateHundredths, 10000n + rateHundredths)
        : roundHalfUp(grossMinor * rateHundredths, 10000n);
      return { item, grossMinor, netMinor: state.inclusive ? grossMinor - taxMinor : grossMinor, taxMinor, rateHundredths };
    });
    let discountMinor = 0n;
    const netSubtotalMinor = lines.reduce((sum, line) => sum + line.netMinor, 0n);
    if (state.discount.mode === "invoice") {
      if (state.discount.kind === "percent") {
        discountMinor = roundHalfUp(netSubtotalMinor * decimalScaled(state.discount.value, 2), 10000n);
      } else discountMinor = moneyToMinor(state.discount.value);
      if (discountMinor > netSubtotalMinor) discountMinor = netSubtotalMinor;
    }
    let remainingDiscount = discountMinor;
    let remainingBase = netSubtotalMinor;
    const breakdown = new Map();
    lines.forEach((line, index) => {
      // Allocate invoice discounts proportionally in minor units; the last line absorbs any rounding remainder.
      const lineDiscount = index === lines.length - 1 || remainingBase === 0n
        ? remainingDiscount
        : roundHalfUp(remainingDiscount * line.netMinor, remainingBase);
      remainingDiscount -= lineDiscount;
      remainingBase -= line.netMinor;
      const base = line.netMinor - lineDiscount;
      const tax = state.inclusive && discountMinor === 0n
        ? line.taxMinor
        : roundHalfUp(base * line.rateHundredths, 10000n);
      line.baseMinor = base;
      line.taxMinor = tax;
      const key = String(line.rateHundredths);
      const bucket = breakdown.get(key) || { rate: Number(key) / 100, base: 0n, tax: 0n };
      bucket.base += line.baseMinor;
      bucket.tax += tax;
      breakdown.set(key, bucket);
    });
    const subtotalMinor = netSubtotalMinor;
    const taxMinor = [...breakdown.values()].reduce((sum, entry) => sum + entry.tax, 0n);
    const chargesMinor = moneyToMinor(state.charges);
    const totalMinor = subtotalMinor - discountMinor + taxMinor + chargesMinor;
    const paidMinor = moneyToMinor(state.amountPaid);
    return { lines, subtotalMinor, discountMinor, taxMinor, chargesMinor, totalMinor, paidMinor, balanceMinor: totalMinor - paidMinor, breakdown: [...breakdown.values()] };
  }

  function formatMoney(minor, currency) {
    const safeMinor = typeof minor === "bigint" ? minor : 0n;
    const amount = Number(safeMinor) / 100;
    try {
      return new Intl.NumberFormat(config.locale, { style: "currency", currency: currency || state.meta.currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number.isFinite(amount) ? amount : 0);
    } catch {
      return `${currency || state.meta.currency} ${Number.isFinite(amount) ? amount.toFixed(2) : "0.00"}`;
    }
  }
  const ones = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  function underThousand(number) {
    let result = "";
    if (number >= 100) { result += ones[Math.floor(number / 100)] + " Hundred"; number %= 100; if (number) result += " "; }
    if (number >= 20) { result += tens[Math.floor(number / 10)]; number %= 10; if (number) result += " " + ones[number]; }
    else if (number) result += ones[number];
    return result;
  }
  function numberWords(value, india) {
    // Indian invoices group whole-number amounts as lakh/crore; other pages use million/billion groups.
    let number = BigInt(value);
    if (number === 0n) return "Zero";
    const units = india ? [[10000000n,"Crore"],[100000n,"Lakh"],[1000n,"Thousand"],[1n,""]] : [[1000000000n,"Billion"],[1000000n,"Million"],[1000n,"Thousand"],[1n,""]];
    const parts = [];
    units.forEach(([size, label]) => {
      const group = Number(number / size);
      if (group > 0) { parts.push(underThousand(group) + (label ? " " + label : "")); number %= size; }
    });
    return parts.join(" ");
  }
  function amountWords(totalMinor) {
    const absolute = totalMinor < 0n ? -totalMinor : totalMinor;
    const major = absolute / 100n;
    const minor = absolute % 100n;
    const names = currencyNames[state.meta.currency] || [config.currencyName, config.minorName];
    const india = config.code === "IN";
    return `${totalMinor < 0n ? "Minus " : ""}${numberWords(major, india)} ${names[0]}${minor ? ` and ${numberWords(minor, false)} ${names[1]}` : ""} only`;
  }

  function updateAll() {
    const result = calculate();
    renderPreview(result);
    renderTotals(result);
    renderWarnings();
    document.getElementById("tax-mode-note").textContent = state.inclusive ? "Tax is included in item prices." : "Tax is added to item prices.";
    document.getElementById("invoice-preview").dataset.template = state.template;
    document.documentElement.style.setProperty("--invoice-accent", state.accent);
    root.querySelectorAll('[data-bind="meta.currency"]').forEach((select) => { if (select.value !== state.meta.currency) select.value = state.meta.currency; });
  }

  function setText(parent, tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = value == null ? "" : String(value);
    node.dir = "auto";
    parent.append(node);
    return node;
  }
  function renderPreview(result) {
    const preview = document.getElementById("invoice-preview");
    preview.replaceChildren();
    preview.dataset.template = state.template;
    const header = document.createElement("header"); header.className = "preview-header";
    if (state.seller.logo) {
      const image = document.createElement("img"); image.src = state.seller.logo; image.alt = `${state.seller.name || "Business"} logo`; image.className = "seller-logo"; header.append(image);
    }
    const seller = document.createElement("div"); seller.className = "seller-block";
    setText(seller, "h2", "", state.seller.name || "Your business");
    setText(seller, "p", "", state.seller.address);
    setText(seller, "p", "", [state.seller.email, state.seller.phone].filter(Boolean).join(" · "));
    if (state.seller.taxId) setText(seller, "p", "", `${config.taxIdLabel}: ${state.seller.taxId}`);
    const title = document.createElement("div"); title.className = "invoice-heading";
    setText(title, "span", "eyebrow", config.wordingTitle || "Invoice");
    setText(title, "h1", "", "INVOICE");
    setText(title, "p", "", state.meta.number || "Invoice number");
    header.append(seller, title);
    preview.append(header);
    const info = document.createElement("div"); info.className = "preview-info";
    const bill = document.createElement("section"); setText(bill, "h3", "", "Bill to");
    setText(bill, "p", "strong", state.client.name || "Client name");
    setText(bill, "p", "", state.client.address);
    if (state.client.email) setText(bill, "p", "", state.client.email);
    if (state.client.taxId) setText(bill, "p", "", `${config.taxIdLabel}: ${state.client.taxId}`);
    const dates = document.createElement("section"); setText(dates, "h3", "", "Invoice details");
    [["Invoice date", state.meta.issueDate],["Due date", state.meta.dueDate],["Payment terms", state.meta.terms === "custom" ? state.meta.customTerms : state.meta.terms],["PO number", state.meta.po],["Supply date", state.meta.supplyDate],["Place of supply", state.meta.placeOfSupply]].forEach(([label, value]) => {
      if (value) setText(dates, "p", "", `${label}: ${value}`);
    });
    info.append(bill, dates); preview.append(info);
    const table = document.createElement("table"); table.className = "preview-items";
    const thead = document.createElement("thead"); const heading = document.createElement("tr");
    const columns = [config.codeLabel, "Description", "Qty", "Unit price", "Tax", "Amount"].filter(Boolean);
    columns.forEach((text) => setText(heading, "th", "", text)); thead.append(heading); table.append(thead);
    const tbody = document.createElement("tbody");
    result.lines.forEach(({ item, grossMinor, baseMinor, taxMinor }) => {
      const tr = document.createElement("tr");
      if (config.codeLabel) setText(tr, "td", "", item.code);
      setText(tr, "td", "", item.description);
      setText(tr, "td", "numeric", item.quantity);
      setText(tr, "td", "numeric", formatMoney(moneyToMinor(item.price), state.meta.currency));
      setText(tr, "td", "numeric", `${parseRate(item.rate)}%`);
      setText(tr, "td", "numeric", formatMoney(state.inclusive ? grossMinor : baseMinor + taxMinor, state.meta.currency));
      tbody.append(tr);
    });
    table.append(tbody); preview.append(table);
    const summary = document.createElement("section"); summary.className = "preview-summary";
    const values = [["Subtotal", result.subtotalMinor]];
    if (result.discountMinor) values.push(["Discount", -result.discountMinor]);
    result.breakdown.forEach((entry) => {
      if (entry.base === 0n && entry.tax === 0n) return;
      if (config.code === "IN" && entry.rate === 0) {
        values.push(["GST 0%", entry.tax]);
      } else if (config.code === "IN" && state.meta.supplyType === "intra") {
        // Split each rate bucket in paise; SGST receives any odd paise so the two components still sum to GST.
        const cgst = roundHalfUp(entry.tax, 2n);
        values.push([`CGST ${entry.rate / 2}%`, cgst], [`SGST ${entry.rate / 2}%`, entry.tax - cgst]);
      } else {
        values.push([`${config.code === "IN" ? "IGST" : config.taxLabel} ${entry.rate}%`, entry.tax]);
      }
    });
    if (result.chargesMinor) values.push(["Shipping / other charges", result.chargesMinor]);
    values.forEach(([label, value]) => {
      if (label === "Discount" && !result.discountMinor) return;
      const row = document.createElement("div"); row.className = "total-row";
      setText(row, "span", "", label); setText(row, "span", "", formatMoney(value, state.meta.currency)); summary.append(row);
    });
    const grand = document.createElement("div"); grand.className = "total-row grand";
    setText(grand, "span", "", "Total"); setText(grand, "span", "", formatMoney(result.totalMinor, state.meta.currency)); summary.append(grand);
    const paid = document.createElement("div"); paid.className = "total-row"; setText(paid, "span", "", "Amount paid"); setText(paid, "span", "", formatMoney(result.paidMinor, state.meta.currency)); summary.append(paid);
    const due = document.createElement("div"); due.className = "total-row due"; setText(due, "span", "", "Balance due"); setText(due, "span", "", formatMoney(result.balanceMinor, state.meta.currency)); summary.append(due);
    preview.append(summary);
    setText(preview, "p", "amount-words", `Amount in words: ${amountWords(result.totalMinor)}`);
    [state.notes && ["Notes", state.notes], state.termsText && ["Terms", state.termsText], state.bank && ["Payment details", state.bank], state.meta.reverseCharge && ["Reverse charge", config.code === "EU" ? "Reverse charge applies. The customer is liable for VAT under the applicable reverse-charge rules." : "Reverse charge applies."], state.meta.zeroRatedNote && ["Zero-rated note", state.meta.zeroRatedNote], state.meta.einNote && ["Tax note", state.meta.einNote]].filter(Boolean).forEach(([label, value]) => {
      const section = document.createElement("section"); section.className = "preview-notes";
      setText(section, "h3", "", label); setText(section, "p", "", value); preview.append(section);
    });
    if (state.paymentString) {
      const qrSection = document.createElement("section"); qrSection.className = "preview-qr";
      setText(qrSection, "h3", "", "Payment QR");
      const canvas = document.createElement("canvas"); canvas.width = 180; canvas.height = 180; canvas.setAttribute("aria-label", "Payment QR code");
      qrSection.append(canvas); preview.append(qrSection);
      try { window.QRCodeEncoder.draw(canvas, state.paymentString); }
      catch { setText(qrSection, "p", "inline-warning", "Payment text is too long for the offline QR encoder."); }
    }
    setText(preview, "p", "preview-footer", `Thank you for your business · ${config.name}`);
  }

  function renderTotals(result) {
    const sticky = document.getElementById("sticky-total");
    sticky.replaceChildren();
    setText(sticky, "span", "", "Total due");
    setText(sticky, "strong", "", formatMoney(result.balanceMinor, state.meta.currency));
  }

  function renderWarnings() {
    const warning = document.getElementById("tax-warning");
    const emailWarning = document.getElementById("email-warning");
    const invalidEmail = [state.seller.email, state.client.email].some((email) => email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    emailWarning.textContent = invalidEmail ? "Check the format of the seller or client email address." : "";
    emailWarning.hidden = !invalidEmail;
    warning.hidden = true;
    if (config.taxIdPattern && state.seller.taxId) {
      try {
        const taxId = state.seller.taxId.trim();
        const validFormat = (new RegExp(config.taxIdPattern, "i")).test(taxId);
        if (!validFormat || (config.taxIdChecksum === "abn" && !validAbn(taxId))) {
          warning.textContent = `Check the format of this ${config.taxIdLabel}. This soft check does not verify it with a tax authority.`;
          warning.hidden = false;
        }
        function validAbn(value) {
          const digits = value.replace(/\s/g, "");
          if (!/^\d{11}$/.test(digits)) return false;
          const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
          const total = [...digits].reduce((sum, digit, index) => sum + (Number(digit) - (index === 0 ? 1 : 0)) * weights[index], 0);
          return total % 89 === 0;
        }
      } catch {
        warning.textContent = "The tax ID format rule is unavailable; please verify the number manually.";
        warning.hidden = false;
      }
    }
    const numberWarning = document.getElementById("number-warning");
    const invalid = state.items.some((item) => Number(item.quantity) < 0 || Number(item.price) < 0 || !Number.isFinite(Number(item.quantity)) || !Number.isFinite(Number(item.price)));
    numberWarning.textContent = invalid ? "Negative or invalid quantities and prices count as zero. Correct the highlighted values before issuing." : "";
    numberWarning.hidden = !invalid;
  }

  function populateSavedLists() {
    savedData = readStorage() || {};
    const clientSelect = document.getElementById("saved-clients");
    (savedData.clients || []).forEach((client, index) => {
      const option = document.createElement("option"); option.value = String(index); option.textContent = client.name || "Unnamed client"; clientSelect.append(option);
    });
    const itemSelect = document.getElementById("saved-items");
    (savedData.items || []).forEach((item, index) => {
      const option = document.createElement("option"); option.value = String(index); option.textContent = item.description || "Unnamed item"; itemSelect.append(option);
    });
    renderInvoiceList();
  }
  function renderInvoiceList() {
    const list = document.getElementById("invoice-list");
    if (!list) return;
    list.replaceChildren();
    (savedData.invoices || []).forEach((invoice, index) => {
      const row = document.createElement("div"); row.className = "saved-invoice";
      const label = document.createElement("span"); label.textContent = `${invoice.number || "Invoice"} · ${invoice.date || ""}`;
      row.append(label);
      [["open", "Open"],["duplicate", "Duplicate"],["delete", "Delete"]].forEach(([action, text]) => {
        const button = document.createElement("button"); button.type = "button"; button.textContent = text; button.dataset.invoiceAction = action; button.dataset.invoiceIndex = String(index); row.append(button);
      });
      list.append(row);
    });
    if (!(savedData.invoices || []).length) setText(list, "p", "field-help", "No saved invoices yet.");
  }

  function onClick(event) {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.tab) {
      root.dataset.activeTab = button.dataset.tab;
      root.querySelectorAll(".mode-tab").forEach((tab) => { const active = tab === button; tab.classList.toggle("is-active", active); tab.setAttribute("aria-selected", String(active)); });
      return;
    }
    if (button.dataset.rowAction) {
      const index = Number(button.closest("[data-item-index]").dataset.itemIndex);
      const action = button.dataset.rowAction;
      if (action === "save") { saveItem(state.items[index]); return; }
      if (action === "remove" && state.items.length > 1) {
        const removed = state.items.splice(index, 1)[0];
        undoAction = () => { state.items.splice(index, 0, removed); renderItems(); updateAll(); writeStorage(); };
        announce("Item removed.", undoAction);
      } else if (action === "duplicate") state.items.splice(index + 1, 0, { ...state.items[index] });
      else if (action === "up" && index > 0) [state.items[index - 1], state.items[index]] = [state.items[index], state.items[index - 1]];
      else if (action === "down" && index < state.items.length - 1) [state.items[index + 1], state.items[index]] = [state.items[index], state.items[index + 1]];
      else if (action === "remove") announce("An invoice must have at least one item.");
      renderItems(); updateAll(); writeStorage(); return;
    }
    if (button.dataset.invoiceAction) { invoiceAction(button.dataset.invoiceAction, Number(button.dataset.invoiceIndex)); return; }
    const action = button.dataset.action;
    if (action === "add-item") { state.items.push(blankItem()); renderItems(); updateAll(); writeStorage(); }
    if (action === "save") { saveInvoice(); }
    if (action === "print") printInvoice();
    if (action === "blank") {
      syncFromForm();
      const currentSeller = state.seller;
      state = sampleState();
      state.seller = currentSeller;
      state.client = { name: "", address: "", taxId: "", email: "" };
      state.items = [blankItem()];
      state.notes = ""; state.bank = ""; state.termsText = ""; state.amountPaid = "0";
      state.discount = { mode: "none", kind: "percent", value: "0" };
      fillForm(); renderItems(); updateAll(); writeStorage();
    }
    if (action === "export") exportJson();
    if (action === "import") document.getElementById("import-file").click();
    if (action === "save-client") saveClient();
    if (action === "clear") document.getElementById("confirm-dialog").showModal();
  }

  function saveInvoice() {
    syncFromForm();
    const data = readStorage() || {};
    const invoices = data.invoices || [];
    const snapshot = JSON.parse(JSON.stringify(state));
    const currentNumber = String(state.meta.number || "INV");
    invoices.unshift({ number: currentNumber, date: state.meta.issueDate, state: snapshot });
    data.invoices = invoices.slice(0, 50);
    state.meta.number = nextInvoiceNumber(currentNumber);
    data.draft = state; data.seller = state.seller; data.clients = data.clients || []; data.items = data.items || [];
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      savedData = data;
      fillForm(); updateAll(); renderInvoiceList();
      announce("Invoice saved. The next invoice number is ready.");
    } catch { state.meta.number = snapshot.meta.number; setStatus("Could not save invoice: browser storage is unavailable"); }
  }
  function nextInvoiceNumber(number) {
    const match = number.match(/^(.*?)(\d+)$/);
    if (!match) return `${number || "INV"}-001`;
    const next = (BigInt(match[2]) + 1n).toString().padStart(match[2].length, "0");
    return match[1] + next;
  }
  function invoiceAction(action, index) {
    const invoices = (savedData.invoices || []).slice();
    const invoice = invoices[index];
    if (!invoice) return;
    if (action === "open" || action === "duplicate") {
      state = mergeState(sampleState(), invoice.state);
      if (action === "duplicate") state.meta.number += "-COPY";
      fillForm(); renderItems(); updateAll(); writeStorage();
    } else {
      invoices.splice(index, 1);
      const removed = invoice;
      const restore = () => { invoices.splice(index, 0, removed); savedData.invoices = invoices; persistCollection(); renderInvoiceList(); };
      undoAction = restore;
      savedData.invoices = invoices; persistCollection(); announce("Saved invoice deleted.", restore);
    }
  }
  function persistCollection() {
    try { localStorage.setItem(storageKey, JSON.stringify(savedData)); }
    catch { setStatus("Could not update saved invoices: browser storage is unavailable"); }
  }
  function saveClient() {
    const data = readStorage() || {};
    const clients = data.clients || [];
    clients.unshift({ ...state.client });
    data.clients = clients.slice(0, 50); data.draft = state; data.seller = state.seller; data.items = data.items || []; data.invoices = data.invoices || [];
    try { localStorage.setItem(storageKey, JSON.stringify(data)); savedData = data; populateSavedLists(); announce("Client details saved in this browser."); }
    catch { setStatus("Could not save client: browser storage is unavailable"); }
  }
  function saveItem(item = state.items[state.items.length - 1]) {
    const data = readStorage() || {};
    data.items = [item, ...(data.items || []).filter((saved) => saved.description !== item.description)].slice(0, 50);
    data.draft = state; data.seller = state.seller; data.clients = data.clients || []; data.invoices = data.invoices || [];
    try { localStorage.setItem(storageKey, JSON.stringify(data)); savedData = data; populateSavedLists(); announce("Item saved for quick-add."); }
    catch { setStatus("Could not save item: browser storage is unavailable"); }
  }

  async function onLogo(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) || file.size > 500 * 1024) {
      announce("Choose an image smaller than 500 KB.");
      event.target.value = "";
      return;
    }
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("Could not read the selected logo."));
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
      const image = await new Promise((resolve, reject) => {
        const img = new Image(); img.onload = () => resolve(img); img.onerror = () => reject(new Error("Selected logo is not a readable image.")); img.src = dataUrl;
      });
      const scale = Math.min(1, 480 / image.width, 180 / image.height);
      const canvas = document.createElement("canvas"); canvas.width = Math.max(1, Math.round(image.width * scale)); canvas.height = Math.max(1, Math.round(image.height * scale));
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
      state.seller.logo = canvas.toDataURL("image/jpeg", 0.82);
      updateAll(); writeStorage();
    } catch (error) { announce(error.message); }
  }

  function exportJson() {
    syncFromForm();
    const blob = new Blob([JSON.stringify({ version: 1, country: config.code, state }, null, 2)], { type: "application/json" });
    downloadBlob(blob, `${(state.meta.number || "invoice").replace(/[^a-z0-9_-]/gi, "-")}.json`);
  }
  function onImport(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onerror = () => announce("Could not read this backup file.");
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const incoming = parsed && parsed.state ? parsed.state : parsed;
        if (!incoming || !Array.isArray(incoming.items) || incoming.items.length > 100) throw new Error("This file is not a valid invoice backup.");
        state = mergeState(sampleState(), incoming);
        fillForm(); renderItems(); updateAll(); writeStorage();
        announce("Invoice backup imported.");
      } catch (error) { announce(error.message || "This file is not a valid invoice backup."); }
      event.target.value = "";
    };
    reader.readAsText(file);
  }
  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url; link.download = filename; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function printInvoice() {
    let style = document.getElementById("dynamic-print-page");
    if (!style) { style = document.createElement("style"); style.id = "dynamic-print-page"; document.head.append(style); }
    style.textContent = `@media print { @page { size: ${state.paper === "letter" ? "Letter" : "A4"}; margin: 12mm; } }`;
    window.print();
  }
  function onConfirmClose() {
    const dialog = document.getElementById("confirm-dialog");
    if (dialog.returnValue !== "clear") return;
    try {
      Object.keys(countries).forEach((countryCode) => localStorage.removeItem("invoice-generator-v1-" + countries[countryCode].code));
      savedData = null; state = sampleState();
      fillForm(); renderItems(); populateSavedLists(); updateAll(); announce("All invoice-generator data was cleared.");
    } catch { setStatus("Could not clear data: browser storage is unavailable"); }
  }

  mount();
})();
