// Set DOMAIN and SITE_NAME here, or override DOMAIN with an environment variable.
const DOMAIN = (process.env.DOMAIN || "https://example.com").replace(/\/+$/, "");
const SITE_NAME = "Free Invoice Generator";

async function build() {
const fs = await import("node:fs");
const path = await import("node:path");
const vm = await import("node:vm");
const crypto = await import("node:crypto");
const root = __dirname;
const output = path.join(root, "..", "public", "invoice-generator");
const countriesSource = fs.readFileSync(path.join(root, "countries.js"), "utf8");
const context = { window: {} };
vm.runInNewContext(countriesSource, context, { timeout: 1000 });
const countries = context.window.INVOICE_COUNTRIES;

const guide = {
  in: {
    intro: "Use this India GST invoice generator to prepare a draft with GSTIN fields, HSN/SAC codes, place of supply and a choice between intra-state and inter-state tax presentation. It runs in your browser; the figures and draft stay on this device unless you choose to download or print them.",
    paragraphs: [
      "A practical GST invoice identifies the supplier, its GSTIN, the recipient where relevant, a consecutive invoice number and the invoice date. Include a clear description, quantity, taxable value and applicable rate for every item. The place of supply matters: it helps determine whether the example should display CGST and SGST or IGST. This tool shows a soft GSTIN format warning, not a government verification.",
      "For an intra-state example, a taxable value of ₹1,000 at 18% produces ₹180 total GST, shown as ₹90 CGST and ₹90 SGST. For an inter-state supply at the same rate, the example shows ₹180 IGST instead. This presentation is arithmetic support only; exemptions, special territories, registration status and supply-specific rules can change the correct treatment.",
      "Enter HSN/SAC codes where relevant, describe the supply clearly, and check the invoice sequence, dates, customer details and place of supply before issuing. Confirm current invoicing rules and any required e-invoice or e-way bill process with the official tax authority or an accountant."
    ],
    example: "Worked example: three units priced at ₹100 each have a taxable value of ₹300. At 18%, line GST is ₹54. For an intra-state supply, the preview shows ₹27 CGST and ₹27 SGST; for an inter-state supply, it shows ₹54 IGST. A second item at 5% is calculated and grouped separately.",
    mistakes: ["Leaving the place of supply inconsistent with the transaction", "Using an HSN/SAC or rate without checking the current classification", "Treating a format warning as official GSTIN verification", "Forgetting that a tax invoice may need additional details for the transaction"]
  },
  uk: {
    intro: "Prepare a UK VAT invoice draft with line-level 20%, 5% or 0% rates, a VAT number field, supply-date field and tax-inclusive or tax-exclusive prices. The page works offline after it has loaded and performs calculations locally; it does not submit your data to HMRC or any other service.",
    paragraphs: [
      "A VAT invoice commonly identifies the supplier and its VAT registration number, a unique sequential invoice number, invoice date and tax point. It also describes the goods or services, quantities, net amounts and VAT charged. Customer details and any required special wording depend on the kind of transaction and whether a full, simplified or modified invoice is appropriate.",
      "For example, a £100 net standard-rated item at 20% adds £20 VAT, making £120 due. A qualifying reduced-rated item at 5% adds £5 per £100 net, while a zero-rated item has no VAT charged. With tax-inclusive entry, the displayed price already contains VAT and the tool extracts the tax portion; always confirm which rate applies to the actual supply.",
      "Add the correct tax point or supply date, make invoice numbers sequential, and state reverse-charge or zero-rating information only where it applies. Check that the selected currency and customer details are correct before printing. Rate choices here are editable software defaults, not a ruling about a product's VAT liability; confirm the latest HMRC guidance for unusual, exempt or cross-border supplies."
    ],
    example: "Worked example: £100 net at 20% gives £20 VAT; £100 net at 5% gives £5 VAT; and £100 at 0% gives no VAT. Together the invoice total is £325. If prices include tax, £120 at 20% contains £20 VAT rather than adding another £24.",
    mistakes: ["Confusing zero-rated supplies with exempt supplies", "Using the invoice date instead of the relevant tax point without checking", "Adding VAT to prices that were already entered as tax-inclusive", "Applying reverse-charge wording to a domestic supply without checking the rules"]
  },
  eu: {
    intro: "Create an EU VAT invoice draft with configurable member-state rate presets for Germany, France, Spain, Italy, the Netherlands and Ireland. It includes a reverse-charge control and supports inclusive or exclusive pricing. VAT rules are country- and transaction-specific, so treat the calculation as a useful draft rather than a determination of liability.",
    paragraphs: [
      "An invoice normally identifies both parties, their VAT identification numbers when relevant, a sequential number, invoice date and supply date, and a description of each good or service. It should make the taxable amount, rate and VAT amount understandable. Member states can require additional particulars, and national invoice rules may differ for simplified invoices or particular industries.",
      "A cross-border business-to-business supply may be subject to a reverse charge when the relevant conditions are fulfilled. Check customer status, VAT ID validity, place-of-supply rules and evidence of transport before using that treatment. A checkbox here adds a standard explanatory note to the draft; it does not test eligibility or make a cross-border tax decision.",
      "Select a rate preset to populate a starting point for the selected country, then verify the exact rate and product treatment from that country's tax authority. This generic EU page cannot account for every reduced rate, temporary change, domestic requirement or special scheme. Keep the invoice currency, dates and VAT totals aligned with the underlying contract and accounting records."
    ],
    example: "Worked example: at a 19% German standard-rate preset, a €100 net line has €19 VAT and totals €119. A separate 0% line remains €100 before any permitted adjustment. If a valid reverse-charge transaction applies, verify the prescribed wording and reporting treatment rather than relying solely on this preview.",
    mistakes: ["Assuming one member state's standard rate applies throughout the EU", "Using the reverse-charge option without confirming both parties and transaction qualify", "Omitting a required supply date or VAT ID", "Treating this generic page as a check of VAT ID validity"]
  },
  ae: {
    intro: "Draft a UAE VAT tax invoice with AED currency, 5% and 0% line-rate choices, and a 15-digit TRN format warning. The invoice layout uses a clear English label and leaves room for your own bilingual business and customer details. All data entry and calculations take place on your device.",
    paragraphs: [
      "A UAE tax invoice generally identifies the supplier by name, address and TRN, includes the invoice number and issue date, and describes the goods or services supplied. Customer details, date of supply, taxable value, applicable rate, VAT amount and total payable should be clear. The required particulars can depend on the transaction and invoice type.",
      "For a straightforward standard-rated example, AED 1,000 before tax at 5% results in AED 50 VAT and AED 1,050 payable. A zero-rated treatment is not the same as an exempt supply. The dropdown is a calculation aid: confirm the legal classification and invoice wording for the actual supply rather than choosing a rate only because it is available.",
      "Check the TRN digits, dates, supplier information and customer details against your records; the on-page check only compares a basic format and does not verify registration. Confirm any reverse-charge treatment and the current Federal Tax Authority requirements before issuing. The generator does not submit tax returns or certify an invoice as compliant."
    ],
    example: "Worked example: two services of AED 400 each total AED 800 before tax. At 5%, VAT is AED 40 and the total is AED 840. For a qualifying zero-rated supply, the invoice still needs the applicable classification and supporting records even though VAT charged is zero.",
    mistakes: ["Confusing a zero rate with an exempt supply", "Omitting the TRN or supply date where required", "Assuming a 15-digit format check confirms that a TRN is active", "Using reverse-charge wording without checking the relevant supply"]
  },
  au: {
    intro: "Prepare an Australian GST tax invoice draft with AUD, an ABN field and 10% or 0% line rates. The generator can display GST-inclusive or GST-exclusive prices and amount-in-words text. It is an offline drafting aid, not an ABN lookup, accounting system or substitute for checking current ATO requirements.",
    paragraphs: [
      "A tax invoice generally identifies the supplier and ABN, gives the issue date, describes each item and its quantity, and shows the price and GST treatment. For invoices at or above the applicable threshold, tax invoice requirements apply; buyer details can be required for higher-value invoices. The precise particulars and whether a document should be titled Tax Invoice depend on the circumstances.",
      "For a simple standard-rated example, a GST-exclusive AUD 100 supply attracts AUD 10 GST and totals AUD 110. A GST-inclusive AUD 110 price contains AUD 10 GST. The switch changes how the amount is interpreted; check whether your listed price is inclusive before entering it so the same tax is not added twice.",
      "Verify the ABN against your business records and ensure the item description, date, total and GST treatment are accurate. This page checks only the ABN's basic digit count, not the checksum or the Australian Business Register. Special supplies, GST-free sales and input-taxed sales have different treatment, so confirm those categories with the ATO or your accountant."
    ],
    example: "Worked example: three units at AUD 110 each with GST included total AUD 330. The embedded GST is AUD 30, leaving AUD 300 before tax. At an exclusive AUD 100 per unit, the same three units total AUD 330 after AUD 30 GST.",
    mistakes: ["Adding GST again to a price that already includes it", "Assuming every zero-GST item is treated the same way", "Using an ABN number without checking its registration status", "Forgetting buyer information needed for a higher-value tax invoice"]
  },
  ca: {
    intro: "Create a Canadian invoice draft with province and territory presets for common combined GST/HST/PST rates, CAD currency and a GST/HST registration number field. Provincial tax combinations and place-of-supply rules are fact-specific; confirm the correct tax treatment and rate for your transaction before sending the invoice.",
    paragraphs: [
      "A useful commercial invoice identifies the seller and customer, uses a unique invoice number and date, and itemizes the goods or services, quantity, price and taxes charged. Where registration details are required, show the GST/HST account number. Separately identifying applicable GST/HST and provincial tax can make the calculation easier for the customer to review.",
      "This page provides a province selector as a starting point, not a universal combined-rate determination. For example, selecting Ontario suggests 13% HST, while Alberta starts with 5% GST. Place of supply, customer type, goods, services, delivery, registration and special rules can change what must be charged. Some provinces also have separate provincial sales tax considerations.",
      "Check the applicable place-of-supply guidance and current CRA or provincial tax authority instructions. The preset does not determine whether you must register, whether a supply is exempt or zero-rated, or how to handle self-assessment. Enter an appropriate item rate and inspect the tax breakdown and registration number before issuing."
    ],
    example: "Worked example: a CAD 200 taxable sale using the Ontario 13% preset shows CAD 26 tax and a CAD 226 total. The same CAD 200 sale using Alberta's 5% preset shows CAD 10 tax and a CAD 210 total. These examples assume the selected province and rate are correct for the supply.",
    mistakes: ["Applying the seller's province instead of checking place-of-supply rules", "Treating a province preset as a legal tax determination", "Omitting a GST/HST account number when required", "Forgetting separate provincial tax or special product rules"]
  },
  sg: {
    intro: "Draft a Singapore GST tax invoice in SGD with a configurable GST percentage, supplier registration field and inclusive/exclusive pricing switch. The default rate is an editable starting value; confirm the current IRAS rate and whether your business and supply are subject to GST before issuing an invoice.",
    paragraphs: [
      "A tax invoice commonly includes the supplier's name, address and GST registration number, a unique invoice identifier and date, and the customer's details. Describe the goods or services and show the value, applicable GST rate and amount, and total. Requirements can vary with customer type and invoice format, so follow current IRAS rules for your business.",
      "At a 9% exclusive rate, SGD 100 of standard-rated supplies has SGD 9 GST and totals SGD 109. With a tax-inclusive SGD 109 price, the included GST is SGD 9. These figures illustrate arithmetic only; rate changes, zero-rated exports, exempt supplies and other classifications have specific conditions.",
      "Review the GST registration number, date, invoice sequence and tax category. Avoid charging GST merely because the invoice tool contains a rate option: registration and supply classification matter. This page does not validate registration status, determine whether GST is claimable or file returns. Confirm the latest rate and invoice particulars with IRAS or a qualified adviser."
    ],
    example: "Worked example: two standard-rated items worth SGD 50 each have SGD 100 net value. At 9%, GST is SGD 9, producing a SGD 109 total. If the prices already include GST, enter the gross prices and select inclusive pricing to extract the tax instead of adding it again.",
    mistakes: ["Charging GST without confirming GST registration and supply status", "Using an outdated rate", "Double-counting GST in inclusive prices", "Treating an exempt supply as zero-rated"]
  },
  us: {
    intro: "Create a US invoice with USD, a state and local sales-tax percentage field, and Letter paper as the default. The United States does not have a national VAT; state and local rules govern sales tax. The rate field is a manual estimate and this page does not determine nexus, sourcing, exemptions or registration obligations.",
    paragraphs: [
      "A professional invoice usually shows seller and customer contact information, a unique invoice number, issue and due dates, a clear description of each item, quantities, unit prices and a total. If sales tax applies, identify the relevant jurisdiction and show the rate and tax amount clearly. Include payment terms and any purchase-order reference useful to the customer.",
      "For illustration, a USD 100 taxable sale at a manually entered 8.25% rate adds USD 8.25 tax and totals USD 108.25. A different destination can have a different combined state, county, city or district rate. Taxability can also vary by product and customer exemption, so this arithmetic does not establish that the tax is due.",
      "Check state and local rules for economic or physical nexus, sourcing, registration, filing and exemption documentation. Do not treat the optional EIN note as a substitute for a W-9 or official tax form. This generic invoice does not calculate jurisdiction-specific tax or provide tax advice; verify the applicable rate and invoice requirements with the relevant revenue authority."
    ],
    example: "Worked example: a USD 100 taxable service with an entered 8.25% rate has USD 8.25 tax and USD 108.25 due. If the transaction is not taxable, set the rate to zero only after confirming the applicable jurisdiction and exemption rules.",
    mistakes: ["Assuming a single national sales-tax rate exists", "Using a rate for the seller's address without checking sourcing rules", "Charging tax without confirming registration and nexus", "Treating the EIN note as a completed W-9"]
  },
  custom: {
    intro: "Use this flexible invoice generator when your country is not listed or when you need a simple custom-tax invoice. Enter the tax label and percentage on each line, choose the currency, and add local wording in the notes. Verify local invoice and tax rules independently before using the document for a real transaction.",
    paragraphs: [
      "A clear invoice typically names the seller and customer, provides a unique number and issue date, and describes what was supplied. Itemized quantity, unit price, currency, tax rate and tax amount help both parties understand the total. Add due date, payment details and any required business registration or tax identifiers for your location.",
      "For a generic example, a 100-unit taxable item at a 10% custom rate adds 10 tax units and totals 110. The correct currency name, decimal precision, tax rounding and applicable rate vary. This page uses two decimal places for arithmetic and a configurable currency selector; confirm that those conventions suit your currency and local accounting requirements.",
      "Before issuing, check whether your country requires additional invoice particulars, an electronic invoice format, sequential numbering or special wording. Verify whether the supply is taxable, exempt or subject to a reverse charge. This generic page does not determine local compliance, validate registration numbers with an authority or transmit information to a tax agency."
    ],
    example: "Worked example: a quantity of two at 50 units each gives a 100-unit taxable base. At a custom 10% rate, tax is 10 and the total is 110. Choose the correct currency and local tax wording, then independently verify the required invoice fields.",
    mistakes: ["Assuming a generic rate or currency format matches local rules", "Leaving out a required registration number or supply date", "Using tax-inclusive values while expecting tax to be added", "Treating a formatted tax ID as verified"]
  }
};

const faqByCountry = {
  in: [
    ["Does this tool verify a GSTIN?", "No. It applies a basic format warning in your browser; it does not contact or query a government service."],
    ["When should I select IGST?", "Use the inter-state presentation only when your transaction's place-of-supply treatment supports it; confirm the applicable rules."],
    ["Can I add HSN or SAC?", "Yes. Each line has an optional HSN/SAC field that appears in the preview."],
    ["How is tax rounded?", "Each line's tax is rounded half-up to the nearest paise before the totals are summed."],
    ["Where is my draft saved?", "Only in this browser's local storage, unless you explicitly export or print it."],
    ["Is this an e-invoice filing service?", "No. It creates a printable draft and does not submit an invoice or return."]
  ],
  uk: [
    ["Can one invoice contain several VAT rates?", "Yes. Choose a rate on each line; the preview groups and totals tax by rate."],
    ["Does the VAT number get checked with HMRC?", "No. The format warning is local and does not verify registration."],
    ["Can prices include VAT?", "Yes. Use the Prices include tax switch before entering or reviewing gross prices."],
    ["Does the tool decide whether a supply is zero-rated?", "No. Confirm the correct VAT liability and any required evidence."],
    ["Can I add a supply date?", "Yes. The supply-date field is included in the invoice details."],
    ["Does this send information to HMRC?", "No. The generator is client-side and makes no service or API requests."]
  ],
  eu: [
    ["Which countries have rate presets?", "Germany, France, Spain, Italy, the Netherlands and Ireland are available as editable starting points."],
    ["Does the country picker select every applicable VAT rate?", "No. It sets a standard-rate starting point; verify reduced and special rates for the actual supply."],
    ["Does reverse charge verify the transaction?", "No. It adds explanatory wording only; eligibility and reporting must be checked separately."],
    ["Are VAT IDs validated online?", "No. This offline page only performs a soft format check."],
    ["Can I enter tax-inclusive prices?", "Yes. Switch the inclusive-pricing control on to extract tax from gross line prices."],
    ["Is this legal or tax advice?", "No. Confirm requirements with the relevant member state's tax authority or an accountant."]
  ],
  ae: [
    ["Does the TRN field contact the FTA?", "No. The tool checks the number's format locally and does not verify registration."],
    ["What currency is selected by default?", "AED is selected for the UAE page; the currency can be changed."],
    ["Can I use a zero rate?", "A 0% option is available, but confirm the transaction's correct VAT classification first."],
    ["Can I add reverse-charge wording?", "Yes. The optional switch adds a short note to the invoice preview."],
    ["Can I use Arabic labels?", "The layout is designed to accept bilingual business and customer text; enter the wording you need."],
    ["Does the invoice get filed automatically?", "No. It is a local draft for review, printing or JSON backup."]
  ],
  au: [
    ["Does the page validate an ABN?", "No. It only warns about the expected 11-digit shape and does not check the official register."],
    ["Can I switch between included and added GST?", "Yes. The inclusive pricing control changes how tax is calculated and displayed."],
    ["Is every sale subject to GST?", "No. Registration and supply classification matter; verify the treatment with current ATO guidance."],
    ["Does the tool create a compliant tax invoice?", "It creates a useful draft, but you must check required particulars and thresholds."],
    ["What is the default currency?", "AUD is selected by default and can be changed in the invoice details."],
    ["Are my details uploaded?", "No. The app works locally and does not make API or analytics calls."]
  ],
  ca: [
    ["How does the province selector work?", "It suggests a combined starting rate; confirm place-of-supply rules and any separate provincial taxes."],
    ["Does it verify my GST/HST number?", "No. The field uses a soft format check only and makes no online lookup."],
    ["Can I change the suggested rate?", "Yes. Set a different rate per line using the tax-rate selector."],
    ["Are PST amounts always included?", "No. Provincial tax treatment varies; enter applicable taxes and confirm current provincial rules."],
    ["Can the invoice show several rates?", "Yes. Tax totals are grouped by the rates used on the individual lines."],
    ["Where are saved invoices stored?", "In this browser only, until you export a backup or print the invoice."]
  ],
  sg: [
    ["Can I edit Singapore's default GST rate?", "Yes. The country rate list is editable in countries.js; verify the current rate before updating."],
    ["Does the tool check a GST number with IRAS?", "No. It only performs a soft local format check."],
    ["Can an invoice use zero-rated supplies?", "A 0% line is available, but confirm the supply classification and required records."],
    ["Does the inclusive toggle extract GST?", "Yes. It calculates the tax portion from an inclusive line price."],
    ["Is this connected to IRAS?", "No. The static tool makes no network requests and submits no returns."],
    ["Can I download my draft?", "Yes. Print to PDF or download a JSON backup from the toolbar."]
  ],
  us: [
    ["Does this calculate US state tax automatically?", "No. Enter the state or local rate yourself after checking the relevant jurisdiction."],
    ["Is there a national US VAT rate?", "No. The United States does not have a national VAT; sales tax varies by jurisdiction."],
    ["Does it determine sales-tax nexus?", "No. Nexus, sourcing, taxability and registration require a separate analysis."],
    ["What paper size is selected?", "Letter is the default on the US page; A4 is also available."],
    ["Can I include an EIN or W-9 note?", "Yes. An optional note field is available, but it does not replace a W-9."],
    ["Does the tax field verify the selected rate?", "No. It only calculates the rate you enter and does not validate local rules."]
  ],
  custom: [
    ["Can I use my country's currency?", "Yes. Select one of the listed currencies; if unavailable, choose a suitable option and state terms in the notes."],
    ["Can I set a custom tax rate?", "Yes. Add a custom percentage on each line."],
    ["Does the page know local invoice laws?", "No. This generic page is a calculator and template, not a local compliance engine."],
    ["Does it validate my tax ID?", "No. A local format warning, where configured, is not official validation."],
    ["Can I save an invoice for later?", "Yes. Save invoices locally in your browser or download a JSON backup."],
    ["Does this tool send invoice data anywhere?", "No. It is client-side and does not send data to a server."]
  ]
};

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}
function jsonForHtml(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}
function layout({ title, description, canonical, body, country, structuredData, isHub = false }) {
  const links = Object.entries(countries).map(([, item]) =>
    `<a href="./${esc(item.slug)}.html">${esc(item.name)} invoice generator</a>`
  ).join(" · ");
  const hreflang = Object.values(countries).map((item) =>
    `<link rel="alternate" hreflang="${esc(item.locale)}" href="${DOMAIN}/invoice-generator/${esc(item.slug)}.html">`
  ).join("\n");
  return `<!doctype html>
<html lang="${country ? esc(country.locale.split("-")[0]) : "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#f3f5f8">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITE_NAME)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<link rel="stylesheet" href="./style.css">
${isHub ? `<link rel="alternate" hreflang="x-default" href="${DOMAIN}/invoice-generator/">` : `${hreflang}\n<link rel="alternate" hreflang="x-default" href="${DOMAIN}/invoice-generator/">`}
${structuredData.map((data) => `<script type="application/ld+json">${jsonForHtml(data)}</script>`).join("\n")}
</head>
<body${country ? ` data-country="${esc(Object.keys(countries).find((key) => countries[key] === country))}"` : ""}>
<header class="site-header"><a class="brand" href="./">${esc(SITE_NAME)}</a><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="./">Invoice Generator</a>${country ? ` / ${esc(country.name)}` : ""}</nav></header>
<main>${body}</main>
<footer class="site-footer"><strong>Free tools</strong><div class="tool-footer"><a href="../tools/">Developer tools</a><a href="../">DevTools Hub</a></div><div class="country-links"><strong>Invoice generators:</strong> ${links}</div><p>Your data never leaves your browser. This tool helps create invoices. Tax rules vary; confirm requirements with your tax authority or accountant.</p><p id="offline-status" role="status" aria-live="polite">Preparing offline access…</p></footer>
<script src="./offline.js"></script>
${country ? `<script src="./countries.js"></script><script src="./qr-encoder.js"></script><script src="./app.js"></script>` : ""}
</body></html>`;
}
function faqSchema(faq) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({
    "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer }
  })) };
}
function countryPage(key, country) {
  const copy = guide[key] || guide.custom;
  const faq = faqByCountry[key] || faqByCountry.custom;
  const canonical = `${DOMAIN}/invoice-generator/${country.slug}.html`;
  const title = `${country.name} ${country.taxLabel} Invoice Generator | Free Online`;
  const description = `Create a free ${country.name} ${country.taxLabel} invoice. Add tax rates, calculate totals, preview, print or download a JSON backup. Works in your browser.`;
  const related = Object.entries(countries).filter(([other]) => other !== key).slice(0, 4)
    .map(([, item]) => `<a href="./${esc(item.slug)}.html">${esc(item.name)} invoice generator</a>`).join(" · ");
  const checklist = country.checklist.map((item) => `<li>${esc(item)}</li>`).join("");
  const mistakes = copy.mistakes.map((item) => `<li>${esc(item)}</li>`).join("");
  const faqs = faq.map(([question, answer]) => `<details><summary>${esc(question)}</summary><p>${esc(answer)}</p></details>`).join("");
  const content = `<article class="page-content"><h1>${esc(country.name)} ${esc(country.taxLabel)} Invoice Generator</h1><p>${esc(copy.intro)}</p></article>
<div id="invoice-app"></div>
<article class="seo-content">
<p>${esc(copy.paragraphs[0])}</p><p>${esc(copy.paragraphs[1])}</p><p>${esc(copy.paragraphs[2])}</p>
<h2>What to include on a ${esc(country.name)} invoice</h2><p>${esc(country.wording)}</p><ul>${checklist}</ul>
<h2>Worked example</h2><p>${esc(copy.example)}</p>
<h2>Common invoice mistakes to avoid</h2><ul>${mistakes}</ul>
<h2>Frequently asked questions</h2>${faqs}
<h2>Related invoice tools</h2><p>${related}</p>
<p class="legal-disclaimer">This tool helps create invoices. Tax rules vary; confirm requirements with your tax authority or accountant.</p>
</article>`;
  const structuredData = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: title, description, url: canonical, applicationCategory: "BusinessApplication", operatingSystem: "Any", browserRequirements: "Requires JavaScript; works offline after loading." },
    faqSchema(faq),
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Invoice Generator", item: `${DOMAIN}/invoice-generator/` },
      { "@type": "ListItem", position: 2, name: `${country.name} ${country.taxLabel} invoice generator`, item: canonical }
    ] }
  ];
  return layout({ title, description, canonical, body: content, country, structuredData });
}
function hubPage() {
  const canonical = `${DOMAIN}/invoice-generator/`;
  const countryOptions = Object.values(countries).map((country) => `<option value="./${esc(country.slug)}.html">${esc(country.name)} — ${esc(country.taxLabel)}</option>`).join("");
  const countryCards = Object.values(countries).map((country) => `<li><a href="./${esc(country.slug)}.html">${esc(country.name)} ${esc(country.taxLabel)} invoice generator</a></li>`).join("");
  const body = `<article class="page-content"><h1>Free Invoice Generator</h1><p>Create a printable invoice in your browser. Choose a country-specific page for GST, VAT or sales-tax fields. No account, server upload or external service is needed.</p>
<div class="hub-picker"><label class="visually-hidden" for="country-picker">Choose your country or invoice type</label><select id="country-picker">${countryOptions}</select><button class="button primary" id="open-country" type="button">Open generator</button></div>
<h2>Choose a country invoice generator</h2><ul>${countryCards}</ul><p>Your information stays in this browser. Export a JSON backup if you want to move a draft to another device.</p></article>
<script>document.getElementById("open-country").addEventListener("click",function(){location.href=document.getElementById("country-picker").value;});</script>`;
  const structuredData = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: SITE_NAME, description: "Free country-specific invoice generator that works in your browser.", url: canonical, applicationCategory: "BusinessApplication", operatingSystem: "Any" },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: SITE_NAME, item: canonical }] }
  ];
  return layout({ title: "Free Invoice Generator | GST, VAT & Sales Tax", description: "Create free GST, VAT and sales-tax invoices online. Choose your country, calculate totals, preview and print. Your data stays in your browser.", canonical, body, structuredData, isHub: true });
}

fs.mkdirSync(output, { recursive: true });
for (const name of ["app.js", "countries.js", "offline.js", "qr-encoder.js", "qr-encoder-LICENSE.txt", "style.css"]) fs.copyFileSync(path.join(root, name), path.join(output, name));
fs.writeFileSync(path.join(output, "index.html"), hubPage(), "utf8");
const pages = Object.entries(countries);
for (const [key, country] of pages) fs.writeFileSync(path.join(output, `${country.slug}.html`), countryPage(key, country), "utf8");
const urls = [`${DOMAIN}/invoice-generator/`, ...pages.map(([, country]) => `${DOMAIN}/invoice-generator/${country.slug}.html`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${esc(url)}</loc></url>`).join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(output, "sitemap.xml"), sitemap, "utf8");
fs.writeFileSync(path.join(output, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${DOMAIN}/invoice-generator/sitemap.xml\n`, "utf8");
const precache = [
  "./", "./index.html", "./app.js", "./countries.js", "./offline.js", "./qr-encoder.js", "./qr-encoder-LICENSE.txt", "./style.css",
  ...pages.map(([, country]) => `./${country.slug}.html`)
];
const cacheVersion = crypto.createHash("sha256")
  .update(DOMAIN + SITE_NAME)
  .update(["app.js", "countries.js", "offline.js", "qr-encoder.js", "style.css"].map((name) => fs.readFileSync(path.join(root, name))).join(""))
  .update(fs.readFileSync(path.join(output, "index.html")))
  .update(pages.map(([, country]) => fs.readFileSync(path.join(output, `${country.slug}.html`))).join(""))
  .update(fs.readFileSync(path.join(output, "sitemap.xml")))
  .update(fs.readFileSync(path.join(output, "robots.txt")))
  .digest("hex").slice(0, 12);
const worker = fs.readFileSync(path.join(root, "sw-template.js"), "utf8")
  .replace("__PRECACHE_ASSETS__", JSON.stringify(precache))
  .replace("__CACHE_VERSION__", `invoice-generator-${cacheVersion}`);
fs.writeFileSync(path.join(output, "sw.js"), worker, "utf8");
console.log(`Built ${pages.length} country pages and a hub at ${path.relative(process.cwd(), output)}`);
}

build().catch((error) => {
  console.error("Invoice generator build failed:", error);
  process.exitCode = 1;
});
