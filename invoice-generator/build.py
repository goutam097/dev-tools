#!/usr/bin/env python3
"""Generate the invoice-generator static site using only the Python standard library."""

from decimal import Decimal
from html import escape
import hashlib
import json
import os
from pathlib import Path
import re
import xml.sax.saxutils

DOMAIN = os.environ.get("DOMAIN", "https://example.com").rstrip("/")
SITE_NAME = "Free Invoice Generator"
SOURCE = Path(__file__).resolve().parent
OUTPUT = SOURCE.parent / "public" / "invoice-generator"


def parse_countries():
    source = (SOURCE / "countries.js").read_text(encoding="utf-8")
    match = re.search(r"window\.INVOICE_COUNTRIES\s*=\s*", source)
    if not match:
        raise ValueError("countries.js must assign window.INVOICE_COUNTRIES")
    literal = source[match.end():].strip()
    if literal.endswith(";"):
        literal = literal[:-1]

    converted = []
    index = 0
    while index < len(literal):
        char = literal[index]
        if char == '"':
            start = index
            index += 1
            while index < len(literal):
                if literal[index] == "\\":
                    index += 2
                    continue
                if literal[index] == '"':
                    index += 1
                    break
                index += 1
            converted.append(literal[start:index])
            continue
        if char.isalpha() or char in "_$":
            start = index
            index += 1
            while index < len(literal) and (literal[index].isalnum() or literal[index] in "_$"):
                index += 1
            token = literal[start:index]
            lookahead = index
            while lookahead < len(literal) and literal[lookahead].isspace():
                lookahead += 1
            converted.append(json.dumps(token) if lookahead < len(literal) and literal[lookahead] == ":" else token)
            continue
        converted.append(char)
        index += 1
    result = json.loads("".join(converted))
    if not isinstance(result, dict) or not result:
        raise ValueError("countries.js did not contain any country configurations")
    return result


def e(value):
    return escape(str(value), quote=True)


def schema_script(data):
    encoded = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    encoded = encoded.replace("<", "\\u003c").replace(">", "\\u003e").replace("&", "\\u0026")
    return f'<script type="application/ld+json">{encoded}</script>'


def rate_example(country):
    if country["code"] == "US":
        return Decimal("8.25")
    if country.get("countryRates"):
        return Decimal(str(country["countryRates"].get("DE", country["rates"][-1])))
    if country.get("provinces"):
        return Decimal(str(country["provinces"][0]["rate"]))
    rates = country.get("rates") or [0]
    rate = Decimal(str(rates[-1]))
    return rate if rate else Decimal("10")


def faq_items(country, rate):
    tax = country["taxLabel"]
    name = country["name"]
    tax_id = country["taxIdLabel"]
    return [
        (f"Does this page verify a {tax_id}?",
         "No. It flags a basic format only; it does not look up the number or confirm registration."),
        (f"How are {tax} rates selected?",
         "Choose a rate per line. Verify the classification and current rate for the actual supply."),
        ("Can I enter tax-inclusive prices?",
         "Yes. Enable inclusive pricing to extract tax from each gross line amount."),
        ("Does the generator submit invoices or returns?",
         "No. It creates a draft in this browser and sends no invoice or return."),
        (f"What should I review before issuing a {name} invoice?",
         f"Review dates, party details, {tax_id}, item descriptions and the applicable rate."),
        ("Are the displayed rates guaranteed to be current?",
         "No. Confirm current rates and invoice rules with the official authority or an accountant.")
    ]


def country_copy(country):
    name = country["name"]
    tax = country["taxLabel"]
    tax_id = country["taxIdLabel"]
    rate = rate_example(country)
    currency = country["currency"]
    rate_text = ", ".join(f"{item:g}%" for item in country.get("rates", []))
    checklist = country.get("checklist", [])
    wording = country.get("wording", "")
    sample_tax = Decimal("100") * rate / Decimal("100")
    total = Decimal("100") + sample_tax
    paragraphs = [
        f"{name} invoices should identify the supplier and customer, show a unique number and relevant dates. Local rules determine other particulars. {wording} Use the checklist below, then confirm any extra fields required for this transaction.",
        f"This generator groups {tax} by line and rate. Starting rates include {rate_text}. For example, {currency} 100.00 at {rate}% adds {currency} {sample_tax:.2f} tax and totals {currency} {total:.2f}. This is arithmetic only; it does not determine the correct rate.",
        f"Check registration, dates, party details, description, payment terms and jurisdiction rules. The {tax_id} warning checks format only, not registration. Review the preview and records; ask the local authority or an accountant about unusual or cross-border supplies."
    ]
    example = (
        f"Worked example: a net {currency} 100.00 item at {rate}% {tax} has {currency} {sample_tax:.2f} tax and totals {currency} {total:.2f}. "
        "For a gross price, enable inclusive pricing to extract the tax instead of adding it again."
    )
    mistakes = [
        f"Applying a {tax} preset without checking the supply classification.",
        f"Treating a {tax_id} format warning as registration verification.",
        "Adding tax twice to a price that already includes it.",
        "Leaving out a required date, registration number or item description."
    ]
    return paragraphs, example, mistakes, faq_items(country, rate), rate


def structured_breadcrumb(country=None):
    entries = [
        {"@type": "ListItem", "position": 1, "name": SITE_NAME, "item": f"{DOMAIN}/invoice-generator/"}
    ]
    if country:
        entries.append({
            "@type": "ListItem", "position": 2,
            "name": f'{country["name"]} {country["taxLabel"]} invoice generator',
            "item": f'{DOMAIN}/invoice-generator/{country["slug"]}.html'
        })
    return {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": entries}


def page_layout(title, description, canonical, body, countries, country=None, faq=None):
    country_links = " · ".join(
        f'<a href="./{e(item["slug"])}.html">{e(item["name"])} invoice generator</a>'
        for item in countries.values()
    )
    hreflang = ""
    if country:
        hreflang = "\n".join(
            f'<link rel="alternate" hreflang="{e(item["locale"])}" href="{DOMAIN}/invoice-generator/{e(item["slug"])}.html">'
            for item in countries.values()
        ) + f'\n<link rel="alternate" hreflang="x-default" href="{DOMAIN}/invoice-generator/">'
    else:
        hreflang = f'<link rel="alternate" hreflang="x-default" href="{DOMAIN}/invoice-generator/">'
    schemas = []
    if country:
        schemas.append({
            "@context": "https://schema.org", "@type": "WebApplication",
            "name": title, "description": description, "url": canonical,
            "applicationCategory": "BusinessApplication", "operatingSystem": "Any",
            "browserRequirements": "Requires JavaScript; works offline after loading."
        })
        schemas.append({
            "@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": [
                {"@type": "Question", "name": question,
                 "acceptedAnswer": {"@type": "Answer", "text": answer}}
                for question, answer in faq
            ]
        })
    else:
        schemas.append({
            "@context": "https://schema.org", "@type": "WebApplication",
            "name": SITE_NAME,
            "description": "Free country-specific invoice generator that works in your browser.",
            "url": canonical, "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any"
        })
    schemas.append(structured_breadcrumb(country))
    country_key = next((key for key, item in countries.items() if item is country), None)
    lang = country["locale"].split("-")[0] if country else "en"
    return f"""<!doctype html>
<html lang="{e(lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#f3f5f8">
<title>{e(title)}</title>
<meta name="description" content="{e(description)}">
<link rel="canonical" href="{e(canonical)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{e(SITE_NAME)}">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(description)}">
<meta property="og:url" content="{e(canonical)}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{e(title)}">
<meta name="twitter:description" content="{e(description)}">
<link rel="stylesheet" href="./style.css">
{hreflang}
{chr(10).join(schema_script(item) for item in schemas)}
</head>
<body{f' data-country="{e(country_key)}"' if country_key else ""}>
<header class="site-header"><a class="brand" href="./">{e(SITE_NAME)}</a><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="./">Invoice Generator</a>{f' / {e(country["name"])}' if country else ""}</nav></header>
<main>{body}</main>
<footer class="site-footer"><strong>Free tools</strong><div class="tool-footer"><a href="../tools/">Developer tools</a><a href="../">DevTools Hub</a></div><div class="country-links"><strong>Invoice generators:</strong> {country_links}</div><p>Your data never leaves your browser. This tool helps create invoices. Tax rules vary; confirm requirements with your tax authority or accountant.</p><p id="offline-status" role="status" aria-live="polite">Preparing offline access…</p></footer>
<script src="./offline.js"></script>
{('<script src="./countries.js"></script><script src="./qr-encoder.js"></script><script src="./app.js"></script>' if country else "")}
</body></html>"""


def country_page(key, country, countries):
    title = f'{country["name"]} {country["taxLabel"]} Invoice Generator | Free Online'
    description = f'Create a free {country["name"]} {country["taxLabel"]} invoice. Add tax rates, calculate totals, preview, print or download a JSON backup. Works in your browser.'
    canonical = f'{DOMAIN}/invoice-generator/{country["slug"]}.html'
    paragraphs, example, mistakes, faq, rate = country_copy(country)
    checklist = "".join(f"<li>{e(item)}</li>" for item in country.get("checklist", []))
    mistake_list = "".join(f"<li>{e(item)}</li>" for item in mistakes)
    faq_html = "".join(f"<details><summary>{e(question)}</summary><p>{e(answer)}</p></details>" for question, answer in faq)
    related = " · ".join(
        f'<a href="./{e(item["slug"])}.html">{e(item["name"])} invoice generator</a>'
        for other, item in countries.items() if other != key
    )
    body = f"""<article class="page-content"><h1>{e(country["name"])} {e(country["taxLabel"])} Invoice Generator</h1><p>{e(paragraphs[0])}</p></article>
<div id="invoice-app"></div>
<article class="seo-content">
<p>{e(paragraphs[0])}</p><p>{e(paragraphs[1])}</p><p>{e(paragraphs[2])}</p>
<h2>What to include on a {e(country["name"])} invoice</h2><p>{e(country.get("wording", ""))}</p><ul>{checklist}</ul>
<h2>Worked example</h2><p>{e(example)}</p>
<h2>Common invoice mistakes to avoid</h2><ul>{mistake_list}</ul>
<h2>Frequently asked questions</h2>{faq_html}
<h2>Related invoice tools</h2><p>{related}</p>
<p class="legal-disclaimer">This tool helps create invoices. Tax rules vary; confirm requirements with your tax authority or accountant.</p>
</article>"""
    return page_layout(title, description, canonical, body, countries, country, faq)


def hub_page(countries):
    canonical = f"{DOMAIN}/invoice-generator/"
    title = "Free Invoice Generator | GST, VAT & Sales Tax"
    description = "Create free GST, VAT and sales-tax invoices online. Choose your country, calculate totals, preview and print. Your data stays in your browser."
    options = "".join(
        f'<option value="./{e(country["slug"])}.html">{e(country["name"])} — {e(country["taxLabel"])}</option>'
        for country in countries.values()
    )
    links = "".join(
        f'<li><a href="./{e(country["slug"])}.html">{e(country["name"])} {e(country["taxLabel"])} invoice generator</a></li>'
        for country in countries.values()
    )
    body = f"""<article class="page-content"><h1>Free Invoice Generator</h1><p>Create a printable invoice in your browser. Choose a country-specific page for GST, VAT or sales-tax fields. No account, server upload or external service is needed.</p>
<div class="hub-picker"><label class="visually-hidden" for="country-picker">Choose your country or invoice type</label><select id="country-picker">{options}</select><button class="button primary" id="open-country" type="button">Open generator</button></div>
<h2>Choose a country invoice generator</h2><ul>{links}</ul><p>Your information stays in this browser. Export a JSON backup if you want to move a draft to another device.</p></article>
<script>document.getElementById("open-country").addEventListener("click",function(){{location.href=document.getElementById("country-picker").value;}});</script>"""
    return page_layout(title, description, canonical, body, countries)


def main():
    countries = parse_countries()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for filename in ("app.js", "countries.js", "offline.js", "qr-encoder.js", "qr-encoder-LICENSE.txt", "style.css"):
        (OUTPUT / filename).write_bytes((SOURCE / filename).read_bytes())
    (OUTPUT / "index.html").write_text(hub_page(countries), encoding="utf-8")
    for key, country in countries.items():
        (OUTPUT / f'{country["slug"]}.html').write_text(country_page(key, country, countries), encoding="utf-8")
    urls = [
        f"{DOMAIN}/invoice-generator/",
        *(f'{DOMAIN}/invoice-generator/{country["slug"]}.html' for country in countries.values())
    ]
    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    sitemap += "".join(f"  <url><loc>{xml.sax.saxutils.escape(url)}</loc></url>\n" for url in urls)
    sitemap += "</urlset>\n"
    (OUTPUT / "sitemap.xml").write_text(sitemap, encoding="utf-8")
    (OUTPUT / "robots.txt").write_text(
        f"User-agent: *\nAllow: /\nSitemap: {DOMAIN}/invoice-generator/sitemap.xml\n",
        encoding="utf-8"
    )
    assets = [
        "./", "./index.html", "./app.js", "./countries.js", "./offline.js",
        "./qr-encoder.js", "./qr-encoder-LICENSE.txt", "./style.css",
        *(f'./{country["slug"]}.html' for country in countries.values())
    ]
    digest = hashlib.sha256()
    digest.update(DOMAIN.encode("utf-8"))
    digest.update(SITE_NAME.encode("utf-8"))
    for filename in ("app.js", "countries.js", "offline.js", "qr-encoder.js", "style.css"):
        digest.update((SOURCE / filename).read_bytes())
    for page in sorted(OUTPUT.glob("*.html")):
        digest.update(page.read_bytes())
    for filename in ("sitemap.xml", "robots.txt"):
        digest.update((OUTPUT / filename).read_bytes())
    template = (SOURCE / "sw-template.js").read_text(encoding="utf-8")
    worker = template.replace("__PRECACHE_ASSETS__", json.dumps(assets))
    worker = worker.replace("__CACHE_VERSION__", f"invoice-generator-{digest.hexdigest()[:12]}")
    (OUTPUT / "sw.js").write_text(worker, encoding="utf-8")
    print(f"Built {len(countries)} country pages and a hub at {OUTPUT.relative_to(SOURCE.parent)}")


if __name__ == "__main__":
    main()
