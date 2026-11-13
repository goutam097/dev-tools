"use strict";
const CACHE = "invoice-generator-d8715b9ed95d";
const ASSETS = ["./","./index.html","./app.js","./countries.js","./offline.js","./qr-encoder.js","./qr-encoder-LICENSE.txt","./style.css","./gst-invoice-generator-india.html","./vat-invoice-generator-uk.html","./vat-invoice-generator-eu.html","./vat-invoice-generator-uae.html","./gst-invoice-generator-australia.html","./gst-invoice-generator-canada.html","./gst-invoice-generator-singapore.html","./sales-tax-invoice-generator-us.html","./invoice-generator-custom-tax.html"];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("invoice-generator-") && key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then((cached) => {
    if (cached) return cached;
    return fetch(event.request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
      }
      return response;
    });
  }));
});
