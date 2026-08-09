/* Cartoon-tinted Leaflet map for /breweries/. Progressive enhancement —
   the full brewery list in the page HTML is the source of truth; this
   just plots it. Tile tint/desaturation lives in style.css. */
(function () {
  if (typeof L === "undefined" || typeof BREWERIES === "undefined") return;

  var mapEl = document.getElementById("brewery-map");
  if (!mapEl) return;

  var TIER_LABEL = { sprint: "Sprint", run: "Run", walk: "Walk", crawl: "Crawl" };
  var TIER_VAR = {
    sprint: "var(--tier-sprint)",
    run: "var(--tier-run)",
    walk: "var(--tier-walk)",
    crawl: "var(--tier-crawl)"
  };

  function pinIcon(tier) {
    var color = tier ? TIER_VAR[tier] : "var(--ink-faint)";
    var html =
      '<svg width="26" height="34" viewBox="0 0 26 34" xmlns="http://www.w3.org/2000/svg" class="pin-icon">' +
      '<path d="M13 0C5.8 0 0 5.7 0 12.8c0 9.6 13 21.2 13 21.2s13-11.6 13-21.2C26 5.7 20.2 0 13 0z" fill="' + color + '"/>' +
      '<circle cx="13" cy="12.8" r="5" fill="#fff"/></svg>';
    return L.divIcon({ html: html, className: "", iconSize: [26, 34], iconAnchor: [13, 34], popupAnchor: [0, -30] });
  }

  var map = L.map(mapEl, { scrollWheelZoom: false });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var bounds = [];

  BREWERIES.forEach(function (b) {
    var latest = b.reviews && b.reviews.length ? b.reviews[b.reviews.length - 1] : null;
    var tier = latest ? latest.tier : null;

    var marker = L.marker([b.lat, b.lon], { icon: pinIcon(tier), title: b.name }).addTo(map);
    bounds.push([b.lat, b.lon]);

    var tierHtml = tier
      ? '<span class="tier tier-' + tier + '">' + TIER_LABEL[tier] + "</span>"
      : '<span class="tier" style="background:var(--ink-faint)">Not yet rated</span>';

    var blurbHtml = '<p class="popup-blurb">' + (latest ? latest.note : "Rating coming soon.") + "</p>";

    marker.bindPopup(
      '<div class="popup-tier">' + tierHtml + "</div>" +
      '<div class="popup-name">' + b.name + "</div>" +
      blurbHtml +
      '<a class="popup-link" href="/breweries/#' + b.slug + '">More on this stop &rarr;</a>'
    );

    marker.on("mouseover", function () { this.openPopup(); });
  });

  if (bounds.length) map.fitBounds(bounds, { padding: [30, 30] });
})();
