# walk.beer

The Riley & Friends Beer Walk — an annual, self-organized walking tour of
the breweries, cideries, and taprooms of Fishtown and Kensington,
Philadelphia. This repo is the source for [walk.beer](https://walk.beer),
a blog-style archive of each year's walk: routes, stops, stories, and a
running list of every place visited, rated on our own Momentum Scale.

This is documentation, not a business — no booking, no payments, no
accounts. See [`SPEC.md`](SPEC.md) for the full product spec.

## Structure

Everything at the repo root is the live site — GitHub Pages builds and
serves this repo's `main` branch directly via its built-in Jekyll. None of
our HTML has front matter, so Jekyll passes it through unmodified; it's
only used here to honor `_config.yml`'s `exclude` list, which keeps this
file and `SPEC.md` out of the published output.

```
index.html          Home
walks/               Index of every walk
walks/2025/          The Inaugural Walk
walks/2026/          The Second Annual Walk
breweries/           Every stop, mapped and rated
about/                Origin story
assets/css/          Shared stylesheet (cobalt + lager-gold design system)
assets/js/            Brewery/route data, maps, Momentum filter, reveals
assets/fonts/         Self-hosted Bebas Neue + EB Garamond (OFL, licences alongside)
assets/img/           Archival/open-licence pictures + credits.json
assets/vendor/leaflet/  Self-hosted Leaflet 1.9.4 (map library)
robots.txt, sitemap.xml
_config.yml           Jekyll build-exclude list (SPEC.md, this file)
```

No build step, no framework — static HTML/CSS with a small amount of
vanilla JS for the map. Map tiles load from OpenStreetMap's public tile
servers (free, no API key); everything else, including the Leaflet
library itself, is self-hosted — no third-party analytics or trackers.

## Security

Every page carries a Content-Security-Policy `<meta>` tag (GitHub Pages
can't set response headers). It allows scripts, styles and fonts from
this site only, images from this site plus `tile.openstreetmap.org`, and
one frame source, `www.youtube-nocookie.com`, for the click-to-play El
video on the home page. Keep it working when editing:

- No inline `<script>` or `style="…"` attributes — they'll be blocked.
  Put CSS in `style.css` and JS in `assets/js/`.
- Build map popups and other dynamic text with `textContent`, not HTML
  strings.
- Outbound links use `target="_blank" rel="noopener noreferrer"`.
- New third-party sources need a deliberate CSP change on every page.

Pictures are open-licensed (public domain, CC0, CC BY, CC BY-SA) and
credited in every page's footer; the source record is
`assets/img/credits.json`.

## Deployment

Pushing to `main` is the deploy — GitHub Pages rebuilds straight from the
branch (Settings → Pages → source is "Deploy from a branch: main"). No
Actions workflow is involved; there was one (`.github/workflows/deploy.yml`)
but it pushed to an unused `gh-pages` branch that Pages was never actually
configured to read from, so it's been removed rather than left as
misleading dead infrastructure. DNS + custom domain (`walk.beer`) are
already configured; see `SPEC.md` for the HTTPS cert status.

## Adding a new year's walk

1. Add `walks/YYYY/index.html` (copy an existing year as a starting point).
2. Add its stops to `breweries/index.html` and
   `assets/js/breweries-data.js` (new entries, or add the year to an
   existing brewery's `years` list).
3. Add the new walk to `walks/index.html` and the homepage.
4. Add its URL to `sitemap.xml`.
