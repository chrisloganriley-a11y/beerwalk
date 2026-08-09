/* Per-walk route map. Draws the computed walking path (routes-data.js)
   plus numbered stop markers, in visit order, for the #route-map element
   on a given /walks/YYYY/ page (reads the year from data-year). */
(function () {
  if (typeof L === "undefined" || typeof ROUTES === "undefined" || typeof BREWERIES === "undefined") return;

  var mapEl = document.getElementById("route-map");
  if (!mapEl) return;

  var year = mapEl.getAttribute("data-year");
  var route = ROUTES[year];
  if (!route) return;

  var byId = {};
  BREWERIES.forEach(function (b) { byId[b.slug] = b; });

  var map = L.map(mapEl, { scrollWheelZoom: false });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.polyline(route.geometry, {
    color: "var(--accent)",
    weight: 4,
    opacity: 0.85,
    lineJoin: "round"
  }).addTo(map);

  function numberIcon(n) {
    var html =
      '<div style="background:var(--paper-raised);border:2px solid var(--accent);color:var(--ink);' +
      "width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;" +
      'font-family:var(--sans);font-weight:700;font-size:12px;box-shadow:0 1px 3px rgba(0,0,0,0.35);">' +
      n + "</div>";
    return L.divIcon({ html: html, className: "", iconSize: [26, 26], iconAnchor: [13, 13], popupAnchor: [0, -16] });
  }

  var bounds = [];
  route.stops.forEach(function (slug, i) {
    var b = byId[slug];
    if (!b) return;
    var marker = L.marker([b.lat, b.lon], { icon: numberIcon(i + 1), title: (i + 1) + ". " + b.name }).addTo(map);
    marker.bindPopup(
      '<div class="popup-name">' + (i + 1) + ". " + b.name + "</div>" +
      '<a class="popup-link" href="/breweries/#' + slug + '">More on this stop &rarr;</a>'
    );
    bounds.push([b.lat, b.lon]);
  });

  if (bounds.length) map.fitBounds(bounds, { padding: [24, 24] });
})();
