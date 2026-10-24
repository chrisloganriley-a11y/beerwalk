/* Section entrances: each [data-reveal] rises in once as it enters the
   viewport; siblings inside a [data-stagger] group arrive in reading order.
   Content is never left hidden: no observer, or a missed one, shows it. */
(function () {
  var targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    group.querySelectorAll("[data-reveal]").forEach(function (el, i) {
      el.style.setProperty("--i", i);
    });
  });

  function show(el) { el.classList.add("is-in"); }

  if (!("IntersectionObserver" in window)) { targets.forEach(show); return; }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      show(entry.target);
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });

  targets.forEach(function (el) { io.observe(el); });

  window.addEventListener("load", function () {
    setTimeout(function () {
      targets.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) show(el);
      });
    }, 2500);
  });
})();

/* Click-to-load video: the page shows our own picture and a link to
   YouTube; only when someone presses play does it swap in YouTube's
   no-cookie player. No request reaches YouTube before that click. */
(function () {
  document.querySelectorAll(".video-facade[data-video]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("data-video");
      if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
      e.preventDefault();
      var frame = document.createElement("iframe");
      frame.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      frame.title = link.getAttribute("data-title") || "Video";
      frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      var box = document.createElement("div");
      box.className = "video-frame";
      box.appendChild(frame);
      link.replaceWith(box);
      frame.focus();
    });
  });
})();
