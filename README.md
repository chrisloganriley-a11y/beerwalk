# walk.beer

The Riley & Friends Beer Walk — an annual, self-organized walking tour of
the breweries, cideries, and taprooms of Fishtown and Kensington,
Philadelphia. This repo is the source for [walk.beer](https://walk.beer),
a blog-style archive of each year's walk: routes, stops, stories, and a
running list of every place visited, rated on our own Momentum Scale.

This is documentation, not a business — no booking, no payments, no
accounts. See [`SPEC.md`](SPEC.md) for the full product spec.

## Structure

Only `/public` is deployed. Everything else (this file, `SPEC.md`, the
GitHub Actions workflow) stays out of the live site.

```
public/
  index.html          Home
  walks/               Index of every walk
  walks/2025/          The Inaugural Walk
  walks/2026/          The Second Annual Walk
  breweries/           Every stop, mapped and rated
  about/                Origin story
  assets/css/          Shared stylesheet
  assets/js/            Brewery data + map behavior
  assets/vendor/leaflet/  Self-hosted Leaflet (map library)
  robots.txt, sitemap.xml
```

No build step, no framework — static HTML/CSS with a small amount of
vanilla JS for the map. Map tiles load from OpenStreetMap's public tile
servers (free, no API key); everything else, including the Leaflet
library itself, is self-hosted — no third-party analytics or trackers.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which publishes
`/public` to the `gh-pages` branch. GitHub Pages serves that branch at the
custom domain `walk.beer` (DNS + CNAME already configured).

## Adding a new year's walk

1. Add `public/walks/YYYY/index.html` (copy an existing year as a
   starting point).
2. Add its stops to `public/breweries/index.html` and
   `public/assets/js/breweries-data.js` (new entries, or add the year to
   an existing brewery's `years` list).
3. Add the new walk to `public/walks/index.html` and the homepage.
4. Add its URL to `public/sitemap.xml`.
