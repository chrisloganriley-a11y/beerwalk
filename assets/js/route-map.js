/* Per-walk route map with a "drag through the day" scrubber. Draws the
   computed walking path (routes-data.js) plus numbered stop pins, in visit
   order, for every .route-map[data-year] on the page. Dragging the range
   input walks the route stop by stop: the path so far turns gold, the
   current pin lights up, and the matching <li> in the stop list (if the
   page has one, via data-stops) is marked aria-current="step".
   The <ol> of stops in the HTML is the no-JS fallback. */
(function () {
  if (typeof L === "undefined" || typeof ROUTES === "undefined" || typeof BREWERIES === "undefined") return;

  var TIER_LABEL = { sprint: "Sprint", run: "Run", walk: "Walk", crawl: "Crawl" };

  var byId = {};
  BREWERIES.forEach(function (b) { byId[b.slug] = b; });

  function latestTier(b) {
    return b.reviews && b.reviews.length ? b.reviews[b.reviews.length - 1].tier : null;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  // Index of the geometry point closest to each stop, searching forward so
  // a route that passes the same corner twice still slices in visit order.
  function stopIndexes(geometry, stops) {
    var out = [];
    var from = 0;
    stops.forEach(function (b) {
      var best = from, bestD = Infinity;
      for (var i = from; i < geometry.length; i++) {
        var dLat = geometry[i][0] - b.lat, dLon = geometry[i][1] - b.lon;
        var d = dLat * dLat + dLon * dLon;
        if (d < bestD) { bestD = d; best = i; }
      }
      out.push(best);
      from = best;
    });
    out[out.length - 1] = geometry.length - 1;
    return out;
  }

  function pinIcon(n) {
    var html = '<div class="stop-pin">' + n + "</div>";
    return L.divIcon({ html: html, className: "", iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -18] });
  }

  function popupFor(n, b, slug) {
    var box = el("div");
    box.appendChild(el("div", "popup-name", n + ". " + b.name));
    var tier = latestTier(b);
    box.appendChild(el("div", "popup-tier", tier ? TIER_LABEL[tier] : "Not yet rated"));
    var link = el("a", "popup-link", "More on this stop →");
    link.href = "/breweries/#" + slug;
    box.appendChild(link);
    return box;
  }

  document.querySelectorAll(".route-map[data-year]").forEach(function (mapEl) {
    var route = ROUTES[mapEl.getAttribute("data-year")];
    if (!route) return;

    var slugs = route.stops.filter(function (s) { return byId[s]; });
    var stops = slugs.map(function (s) { return byId[s]; });

    var map = L.map(mapEl, { scrollWheelZoom: false, zoomSnap: 0.25 });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var rest = L.polyline(route.geometry, { className: "route-line-rest", weight: 3, opacity: 0.7, lineJoin: "round" }).addTo(map);
    var done = L.polyline([], { className: "route-line", weight: 5, opacity: 1, lineJoin: "round" }).addTo(map);

    var markers = stops.map(function (b, i) {
      var m = L.marker([b.lat, b.lon], { icon: pinIcon(i + 1), title: (i + 1) + ". " + b.name, keyboard: true }).addTo(map);
      m.bindPopup(popupFor(i + 1, b, slugs[i]));
      return m;
    });

    map.fitBounds(rest.getBounds(), { padding: [28, 28] });

    var cut = stopIndexes(route.geometry, stops);
    var scrub = document.getElementById(mapEl.getAttribute("data-scrub") || "");
    var list = document.getElementById(mapEl.getAttribute("data-stops") || "");
    var items = list ? list.querySelectorAll("li") : [];

    function setStop(n) {
      done.setLatLngs(route.geometry.slice(0, cut[n - 1] + 1));
      markers.forEach(function (m, i) {
        var pin = m.getElement() && m.getElement().querySelector(".stop-pin");
        if (!pin) return;
        pin.classList.toggle("is-done", i < n - 1);
        pin.classList.toggle("is-current", i === n - 1);
      });
      for (var i = 0; i < items.length; i++) {
        if (i === n - 1) items[i].setAttribute("aria-current", "step");
        else items[i].removeAttribute("aria-current");
      }
      if (scrub) {
        var b = stops[n - 1];
        var tier = latestTier(b);
        var readout = scrub.querySelector(".scrub-readout");
        readout.textContent = "";
        readout.appendChild(el("span", "stop-count", "Stop " + n + " of " + stops.length));
        readout.appendChild(el("span", "stop-title", b.name + (tier ? " · " + TIER_LABEL[tier] : "")));
      }
    }

    if (scrub) {
      var input = scrub.querySelector("input[type=range]");
      input.min = 1;
      input.max = stops.length;
      input.value = 1;
      input.addEventListener("input", function () { setStop(parseInt(input.value, 10)); });
      scrub.hidden = false;
    }
    setStop(1);
  });
})();
