# Static Invoice Generator

This is a self-contained, client-side invoice generator. The build uses only Node.js built-ins; the deployed pages use plain HTML, CSS and JavaScript with no framework, CDN, backend, analytics or API calls. The service worker precaches the hub, country pages and local assets for repeat offline use.

## Build

From the repository root:

```powershell
node .\invoice-generator\build.js
```

Or generate the same static-site structure with the standalone Python standard-library alternative (no Node.js or third-party packages required):

```powershell
python .\invoice-generator\build.py
```

The Node and Python generators share the country configuration, runtime files, SEO structure and offline asset list. The Node generator includes hand-written country guides; the Python alternative creates country-specific guide copy from the country checklist, tax label, identifier and editable rates.

Set the canonical host before building. Replace the sample host in `build.js`, or supply an environment variable:

```powershell
$env:DOMAIN = "https://www.example.com"
node .\invoice-generator\build.js
```

The same environment variable is honored by the Python alternative:

```powershell
$env:DOMAIN = "https://www.example.com"
python .\invoice-generator\build.py
```

`SITE_NAME` is configured near the top of `build.js`. The generated site is written to `public/invoice-generator/`, including `index.html`, all country pages, local assets, `sitemap.xml`, `robots.txt` and `sw.js`.

## Add a country

Add a country object in `countries.js` with a unique two-letter key and a unique slug, then run the build command. The generic page copy and FAQ are safe fallbacks; for a production launch, add useful country-specific copy and FAQs in `build.js` as well. Country-specific controls are selected by `extraFields`; extend the shared app only when a new kind of control is needed. Avoid copying `app.js` or `style.css`.

Country page filenames use the configured slug, for example `gst-invoice-generator-india.html`. The hub and sitemap are regenerated automatically.

## Update tax rates

All country rate defaults are defined at the top level of `countries.js` beside the country object. Edit `rates`, province presets or EU country presets there, rebuild, and verify those values with the relevant official authority before relying on them. Tax rates and invoice requirements can change; a displayed format warning is not an official tax-ID lookup.

## Deploy to shared hosting

1. Run the build and inspect `public/invoice-generator/`.
2. Upload the **contents** of that directory to `public_html/invoice-generator/` using your hosting file manager or SFTP. Keep the relative file structure intact.
3. Ensure your host serves `.html`, `.js`, `.css`, `.xml`, `.txt` and service-worker files with normal static MIME types and HTTPS enabled. Service workers require HTTPS except on localhost.
4. Visit `/invoice-generator/` and a country page. For production, set `DOMAIN` to the canonical HTTPS origin before building.
5. The generated `robots.txt` and `sitemap.xml` live in the subdirectory to avoid overwriting the existing site's files. If your host or search-console setup expects root-level versions, merge the sitemap URL into the site's existing root `robots.txt` and include the generated sitemap entries in the root sitemap.

The invoice draft, saved clients, items and invoice list are stored in browser local storage. Use the JSON backup to move data between devices. Private browsing settings, storage restrictions and clearing browser data can remove saved drafts.

## Included behavior

- Integer minor-unit invoice calculations and half-up per-line tax rounding.
- India intra-state CGST/SGST and inter-state IGST display, HSN/SAC and amount-in-words lakh/crore grouping.
- Country-specific tax labels and fields, editable custom line rates, tax-inclusive pricing, saved clients/items/invoices and JSON backups.
- Three print layouts, A4/Letter paper selection, a local QR encoder for short payment strings, and responsive light/dark styling.
- A concise legal notice is shown below the tool. This software does not decide tax compliance or validate registrations with an authority.

The offline QR encoder accepts UTF-8 payloads up to 106 bytes (QR versions 1-5, error correction L). Keep payment links short; the invoice remains usable if a QR payload is too long.
