/* Brewery map + Momentum filter for /breweries/. Progressive enhancement —
   the full brewery list in the page HTML is the source of truth; this plots
   it and lets the four scale words filter both the map and the list.
   Popups are built as DOM nodes (textContent), never from HTML strings. */
(function () {
  var TIER_LABEL = { sprint: "Sprint", run: "Run", walk: "Walk", crawl: "Crawl" };
  var markers = [];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function latestReview(b) {
    return b.reviews && b.reviews.length ? b.reviews[b.reviews.length - 1] : null;
  }

  var mapEl = document.getElementById("brewery-map");
  if (mapEl && typeof L !== "undefined" && typeof BREWERIES !== "undefined") {
    var map = L.map(mapEl, { scrollWheelZoom: false, zoomSnap: 0.25 });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var bounds = [];
    BREWERIES.forEach(function (b) {
      var latest = latestReview(b);
      var tier = latest && TIER_LABEL[latest.tier] ? latest.tier : "";
      var html =
        '<div class="brewery-pin" data-tier="' + tier + '">' +
        '<svg viewBox="0 0 26 34" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<path d="M13 0C5.8 0 0 5.7 0 12.8c0 9.6 13 21.2 13 21.2s13-11.6 13-21.2C26 5.7 20.2 0 13 0z" fill="currentColor"/>' +
        '<circle cx="13" cy="12.8" r="5" fill="#0034eb"/></svg></div>';
      var icon = L.divIcon({ html: html, className: "", iconSize: [26, 34], iconAnchor: [13, 34], popupAnchor: [0, -30] });
      var marker = L.marker([b.lat, b.lon], { icon: icon, title: b.name, keyboard: true }).addTo(map);
      bounds.push([b.lat, b.lon]);

      var box = el("div");
      box.appendChild(el("div", "popup-tier", tier ? TIER_LABEL[tier] : "Not yet rated"));
      box.appendChild(el("div", "popup-name", b.name));
      box.appendChild(el("p", "popup-blurb", latest ? latest.note : "Rating coming soon."));
      var link = el("a", "popup-link", "Read the full entry →");
      link.href = "#" + b.slug;
      link.addEventListener("click", function () { highlight(b.slug); });
      box.appendChild(link);
      marker.bindPopup(box, { maxWidth: 300 });
      marker.on("mouseover", function () { this.openPopup(); });

      markers.push({ marker: marker, tier: tier });
    });

    if (bounds.length) map.fitBounds(bounds, { padding: [30, 30] });
  }

  function highlight(slug) {
    document.querySelectorAll(".brewery-item.is-highlighted").forEach(function (li) { li.classList.remove("is-highlighted"); });
    var li = document.getElementById(slug);
    if (li) li.classList.add("is-highlighted");
  }
  if (location.hash) highlight(location.hash.slice(1));
  window.addEventListener("hashchange", function () { highlight(location.hash.slice(1)); });

  // The live thing: the four scale words filter the map and the list.
  var scale = document.querySelector(".scale-list");
  var status = document.querySelector(".filter-status");
  if (!scale || !status) return;

  var buttons = scale.querySelectorAll(".scale-word");
  var items = document.querySelectorAll(".brewery-item");
  var count = status.querySelector(".filter-count");
  var current = null;

  function apply(tier) {
    current = tier;
    var shown = 0;
    items.forEach(function (li) {
      var match = !tier || li.getAttribute("data-tier") === tier;
      li.hidden = !match;
      if (match) shown++;
    });
    markers.forEach(function (m) {
      var pin = m.marker.getElement() && m.marker.getElement().querySelector(".brewery-pin");
      if (pin) pin.classList.toggle("is-dimmed", !!tier && m.tier !== tier);
    });
    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-tier") === tier));
    });
    scale.classList.toggle("is-filtering", !!tier);
    status.hidden = !tier;
    if (tier) count.textContent = "Showing " + shown + " " + TIER_LABEL[tier] + (shown === 1 ? " stop" : " stops") + ".";
  }

  buttons.forEach(function (btn) {
    btn.disabled = false;
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", function () {
      var tier = btn.getAttribute("data-tier");
      apply(current === tier ? null : tier);
    });
  });
  status.querySelector("button").addEventListener("click", function () { apply(null); });
})();
