(function () {
  "use strict";
  const status = document.getElementById("offline-status");
  if (!("serviceWorker" in navigator)) {
    status.textContent = "Offline caching is not available in this browser.";
    return;
  }
  navigator.serviceWorker.register("./sw.js")
    .then(() => navigator.serviceWorker.ready)
    .then(() => { status.textContent = "This invoice generator is available offline after its first load."; })
    .catch(() => { status.textContent = "Offline caching could not be enabled. The generator still works online."; });
})();
