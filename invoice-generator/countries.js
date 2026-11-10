// Rates and rules change. Verify with the official tax authority before relying on them.
window.INVOICE_COUNTRIES = {
  in: {
    code: "IN", slug: "gst-invoice-generator-india", name: "India", locale: "en-IN",
    currency: "INR", currencyName: "Rupees", minorName: "Paise", taxLabel: "GST",
    taxIdLabel: "GSTIN", taxIdPattern: "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$",
    rates: [0, 5, 12, 18, 28], title: "Tax Invoice", codeLabel: "HSN/SAC",
    extraFields: ["sellerState", "placeOfSupply", "supplyType", "reverseCharge"],
    wording: "Show the supplier and recipient details, GSTINs where applicable, invoice number and date, place of supply, HSN/SAC, taxable value, tax rate and tax amount.",
    checklist: ["Supplier name, address and GSTIN", "Unique invoice number and issue date", "Recipient details and GSTIN where applicable", "HSN/SAC, quantity, taxable value and GST rate", "Place of supply and CGST/SGST or IGST amounts"],
    states: ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu and Kashmir","Ladakh","Puducherry"],
    wordingTitle: "GST invoice"
  },
  uk: {
    code: "GB", slug: "vat-invoice-generator-uk", name: "United Kingdom", locale: "en-GB",
    currency: "GBP", currencyName: "Pounds", minorName: "Pence", taxLabel: "VAT",
    taxIdLabel: "VAT number", taxIdPattern: "^(GB)?[0-9]{9}$", rates: [0, 5, 20],
    extraFields: ["supplyDate", "reverseCharge", "zeroRatedNote"],
    wording: "A VAT invoice generally includes the supplier's VAT number, a unique sequential number, dates, customer details, a description of goods or services, and VAT amounts.",
    checklist: ["Supplier name, address and VAT registration number", "Unique invoice number and tax point / supply date", "Customer name and address", "Description, quantities and net amounts", "VAT rate and VAT amount for each rate"],
    wordingTitle: "VAT invoice"
  },
  eu: {
    code: "EU", slug: "vat-invoice-generator-eu", name: "European Union", locale: "en-IE",
    currency: "EUR", currencyName: "Euros", minorName: "Cents", taxLabel: "VAT",
    taxIdLabel: "VAT ID", taxIdPattern: "^[A-Z]{2}[A-Z0-9]{8,12}$", rates: [0, 5, 10, 19, 20, 21, 22, 23, 25, 27],
    countryRates: { DE: 19, FR: 20, ES: 21, IT: 22, NL: 21, IE: 23 },
    extraFields: ["euCountry", "reverseCharge"],
    wording: "EU VAT invoice requirements depend on the member state and transaction. Cross-border B2B supplies may use reverse charge when the relevant conditions are met.",
    checklist: ["Supplier and customer names, addresses and VAT IDs", "Sequential invoice number and invoice date", "Supply date and description of goods or services", "Taxable amount and applicable VAT rate", "VAT amount or the applicable reverse-charge wording"],
    wordingTitle: "VAT invoice"
  },
  ae: {
    code: "AE", slug: "vat-invoice-generator-uae", name: "United Arab Emirates", locale: "en-AE",
    currency: "AED", currencyName: "Dirhams", minorName: "Fils", taxLabel: "VAT / ضريبة القيمة المضافة",
    taxIdLabel: "TRN / رقم التسجيل الضريبي", taxIdPattern: "^[0-9]{15}$", rates: [0, 5],
    extraFields: ["reverseCharge"], wordingTitle: "Tax Invoice / فاتورة ضريبية",
    wording: "A UAE tax invoice generally identifies the supplier and TRN, invoice and supply dates, customer details, goods or services, taxable amounts, VAT rate and VAT charged.",
    checklist: ["Supplier name, address and 15-digit TRN", "Tax invoice title, unique number and dates", "Customer name and address where required", "Description, quantity and taxable value", "VAT rate, VAT amount and total payable"]
  },
  au: {
    code: "AU", slug: "gst-invoice-generator-australia", name: "Australia", locale: "en-AU",
    currency: "AUD", currencyName: "Dollars", minorName: "Cents", taxLabel: "GST",
    taxIdLabel: "ABN", taxIdPattern: "^[0-9]{11}$", taxIdChecksum: "abn", rates: [0, 10],
    extraFields: [], wordingTitle: "Tax Invoice",
    wording: "A tax invoice generally includes the supplier's identity and ABN, issue date, description and quantity, price, GST amount or a statement that the price includes GST, and total.",
    checklist: ["Supplier identity and ABN", "Tax Invoice title for invoices of $82.50 or more", "Issue date and description of each item", "GST amount or clear GST-inclusive pricing", "Total price and buyer details when required"]
  },
  ca: {
    code: "CA", slug: "gst-invoice-generator-canada", name: "Canada", locale: "en-CA",
    currency: "CAD", currencyName: "Dollars", minorName: "Cents", taxLabel: "GST/HST/PST",
    taxIdLabel: "GST/HST registration number", taxIdPattern: "^[0-9]{9}RT[0-9]{4}$",
    rates: [0, 5, 11, 12, 13, 14, 15], extraFields: ["province"],
    wordingTitle: "Invoice",
    wording: "Canadian GST/HST/PST treatment depends on the place of supply, province, and goods or services. A commercial invoice should clearly show supplier details, tax registration where applicable, and each tax charged.",
    checklist: ["Supplier and customer names and addresses", "Invoice number and invoice date", "Description, quantity and price of each supply", "GST/HST registration number where required", "Applicable GST/HST/PST rate and amount, itemized clearly"],
    provinces: [
      { name:"Alberta", rate:5 }, { name:"British Columbia", rate:12 }, { name:"Manitoba", rate:12 },
      { name:"New Brunswick", rate:15 }, { name:"Newfoundland and Labrador", rate:15 },
      { name:"Northwest Territories", rate:5 }, { name:"Nova Scotia", rate:14 }, { name:"Nunavut", rate:5 },
      { name:"Ontario", rate:13 }, { name:"Prince Edward Island", rate:15 }, { name:"Quebec", rate:14.975 },
      { name:"Saskatchewan", rate:11 }, { name:"Yukon", rate:5 }
    ]
  },
  sg: {
    code: "SG", slug: "gst-invoice-generator-singapore", name: "Singapore", locale: "en-SG",
    currency: "SGD", currencyName: "Dollars", minorName: "Cents", taxLabel: "GST",
    taxIdLabel: "GST registration number", taxIdPattern: "^[0-9]{8,9}[A-Z]?$", rates: [0, 9],
    extraFields: [], wordingTitle: "Tax Invoice",
    wording: "A Singapore tax invoice for a standard-rated supply generally includes the supplier's name, address and GST number, invoice date and number, customer details, description, amounts and GST.",
    checklist: ["Supplier name, address and GST registration number", "Tax Invoice title, date and identifying number", "Customer name and address", "Description, quantity and value of each supply", "GST rate, amount and total payable"]
  },
  us: {
    code: "US", slug: "sales-tax-invoice-generator-us", name: "United States", locale: "en-US",
    currency: "USD", currencyName: "Dollars", minorName: "Cents", taxLabel: "Sales tax",
    taxIdLabel: "EIN (optional)", taxIdPattern: "^[0-9]{2}-?[0-9]{7}$", rates: [0],
    extraFields: ["stateTaxRate", "einNote"], wordingTitle: "Invoice",
    wording: "The United States has no national VAT. Sales tax rules vary by state and locality, and a seller may need to show local tax registration and tax separately.",
    checklist: ["Seller and customer contact details", "Unique invoice number and invoice date", "Clear description, quantity and price", "State and local sales tax rate and amount when applicable", "Payment terms and amount due"],
    letterDefault: true
  },
  custom: {
    code: "XX", slug: "invoice-generator-custom-tax", name: "Custom tax", locale: "en-GB",
    currency: "USD", currencyName: "Units", minorName: "Cents", taxLabel: "Tax",
    taxIdLabel: "Tax ID", taxIdPattern: "", rates: [0], extraFields: [],
    wordingTitle: "Invoice",
    wording: "Invoice requirements differ by country and transaction. Adapt the tax label, rate and wording to your local requirements before issuing an invoice.",
    checklist: ["Seller and customer names and addresses", "Unique invoice number and issue date", "Description, quantity and price for each item", "Tax rate and amount where applicable", "Total payable, currency and payment terms"]
  }
};
