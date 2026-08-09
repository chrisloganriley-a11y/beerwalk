# walk.beer — Product Spec (Draft v1)

## 1. What this is

A personal blog-style archive of the **Riley & Friends Beer Walk**, an annual
self-organized walking tour of breweries, cideries, and taprooms in
Fishtown/Kensington, Philadelphia. Documentation, not a business — no
booking, no payments, no scheduling, no lead capture. If a real tour
business happens later, this is a separate phase with its own spec.

**Non-goals for v1:** e-commerce, account system, contact forms, email
capture, "book now" CTAs, third-party analytics/trackers.

## 2. Brand

- **Wordmark:** `walk.beer`, set lowercase as a custom inline-SVG
  logotype. Byline underneath: "Riley & Friends Beer Walk."
- **Voice:** first-person, warm, a little irreverent. This is Riley and
  friends telling you about a thing they did, not a company describing a
  product.
- **Tone guardrail:** no marketing language ("unlock," "experience,"
  "curated journey"). Write it the way you'd tell a friend about it.

## 3. Site map

```
/                    Home — intro + links into the walk posts + brewery rollup
/walks/               Index of every walk, newest first
/walks/2026/          "Second Annual Walk" recap (Aug 1, 2026)
/walks/2025/          "The Inaugural Walk" recap (Jul 4, 2025)
/breweries/           Cumulative rollup: every place visited, ratings, map
/about/                Origin story
```

Clean URLs via GitHub Pages directory `index.html` files (`/walks/2026/index.html`
resolves to `walk.beer/walks/2026/`).

### 3.1 This is an ongoing series, not a two-off

Confirmed: there will be a 2027 walk, and presumably more after that. The
site is built so adding a year is just: drop a new `/walks/YYYY/` folder,
add its stops to the rollup page's data, done — no redesign. Nothing in
the spec should be written as if "two walks" is a permanent fact.

## 4. Content — real data

### Walk 1 — The Inaugural Walk, July 4, 2025

> Fishtown has more than 20 breweries, cideries, and taprooms packed into a
> few square miles — reason enough, we decided, to celebrate it with a walk.
> On the Fourth of July, 2025, we set out at noon in the middle of a
> Philadelphia summer to see how much of it we could cover in a day. Turnout
> was great, and most of the group stuck it out for nearly the whole route.
> We finished the night with burgers at Johnny Brenda's.

Stops (8): Human Robot, Wissahickon Brewing, Sacred Vice, Punch Buggy
Brewing, Lost Time, St. Oners, Mural City Cellars, Frankford Hall
(beer garden — finishing stop before Johnny Brenda's).

### Walk 2 — The Second Annual Walk, August 1, 2026

> After a long, cold winter, we were ready to get back outside — and to
> finally do the walk right. This year's route was the full loop: twelve
> stops across Fishtown and Kensington, one drink at each place, in one day.
> Fewer people came out than the year before, but we picked up a few new
> friends along the way. We started at 12:30 PM sharp and called it a night
> around 11 PM (some kept going). The mission never changed: try everything,
> pace yourself, survive.

Stops (12): Human Robot, Fermentary Form, Wissahickon Brewing, Punch Buggy
Brewing, Sacred Vice, Lost Time, Brewery ARS , St. Oners, Evil
Genius, Pips, Forest & Main, Mural City Cellars.


### Cumulative rollup (`/breweries/`)

13+ unique establishments across the series so far (grows as new walks
happen — see §3.1). For each: name, neighborhood, which walk(s) it appeared
on, a **Momentum Rating**, and a one-sentence justification.

**Rating scale — "The Momentum Scale"** (decided): a four-tier taxonomy
about how each stop affects the pace of the walk, not just "was the beer
good":

| Tier | Value | Meaning |
|---|---|---|
| **SPRINT** | 4 | Itinerary-breaking. Good enough to abandon the schedule and just stay. |
| **RUN** | 3 | The ideal pace-setter — one drink, good vibes, back on schedule. |
| **WALK** | 2 | Fine. Utilitarian. One quick pour, use the bathroom, move on. |
| **CRAWL** | 1 | Momentum killer — slow service, packed, no seats. Threatens the whole day. |

Each brewery on the rollup gets its tier (as a small badge/icon, reusable
on the map popups too) plus a short human-written line explaining why —
same spirit as the tap-list/service-speed/crowd-density factors in the
tiering logic, just written as a real sentence instead of evaluated
against a JSON schema at runtime. Ratings are authored by you, once, as
content — not computed live.

## 5. Design system

- **Typography:** system font stack for body copy (fast, no third-party
  font requests); one self-hosted display face for the wordmark/headings if
  we want more character — decide once we see it in browser.
- **Layout:** clean, generous whitespace, editorial blog feel — not
  "SaaS landing page." Kill the purple gradient hero, generic "How It
  Works" steps, and stock step-card treatment from the current site; none
  of it matches what this actually is.
- **Photos:** placeholder slots per stop (hero image per walk, optional
  photo per brewery on the rollup page). You'll drop real files in later;
  not everyone wants to be pictured, so placeholders stay generic (no
  faces) until you clear each one.
- **Accessibility:** semantic HTML, real alt text once photos exist,
  sufficient color contrast, keyboard-operable map tooltips.
- **Mobile-first**, since most people will hit this from a phone at a bar.

## 6. The map — decided

**Leaflet + OpenStreetMap tiles**, confirmed. Real, accurate positions;
genuine hover/click tooltips per pin; free, no API key, no billing, no
Google tracking. Honest tradeoff: map tiles load from OSM's public tile
servers, so it's not 100% zero-third-party — the one deliberate exception,
and the same approach privacy-conscious sites use instead of Google Maps.

**Cartoonish overlay, my recommended approach:** rather than depend on a
third-party "stylized" tile provider (fragile — most require their own API
keys/accounts, e.g. Stadia/Mapbox), I'd get the cartoon feel through things
fully under our control:

- A CSS filter on the base OSM tiles (desaturate + warm/sepia tint) so the
  realistic map recedes into the background instead of competing for
  attention.
- Custom hand-drawn-style SVG pin markers per brewery (small beer-glass /
  footstep icons, matching the same line-art language as the `walk.beer`
  wordmark) instead of default Leaflet pins.
- Playful, illustrated popups on hover — brewery name, rating, blurb — with
  the same line-art treatment.

This keeps the map accurate and reliable while giving it a hand-made,
"someone actually drew this" feel rather than looking like an embedded
Google Maps widget. Flag if you pictured something more heavily
illustrated (e.g. a fully custom cartoon basemap, not just tinted OSM) —
that's a bigger design/effort lift and worth calling out explicitly if
that's actually what you want.

## 7. Technical architecture

- Static HTML/CSS, minimal vanilla JS (map tooltips, mobile nav only).
  No build step, no framework — matches the current repo's philosophy and
  keeps GitHub Pages deployment trivial.
- Shared `/assets/css/style.css` instead of the current copy-pasted inline
  `<style>` block per page.
- File structure: `/assets/{css,js,img,fonts}/`, `/walks/2025/`,
  `/walks/2026/`, `/breweries/`, `/about/`.
- No third-party analytics or trackers.
- `robots.txt` + `sitemap.xml` since content is now real and worth
  indexing correctly.

## 8. SEO / metadata fixes

Current meta tags describe a fictional "self-guided pub crawl app" — all
title/description/OG/Twitter tags get rewritten to match reality. Fix
`og:image` (currently points at a `preview.jpg` that doesn't exist).

## 9. Security & HTTPS — findings

- DNS is already correctly configured: apex A records and `www` CNAME both
  point at GitHub Pages correctly.
- **HTTPS is currently broken.** I tested it directly: `https://walk.beer`
  fails certificate verification because GitHub is still serving its
  generic `*.github.io` wildcard cert instead of one issued for
  `walk.beer`. This means "Enforce HTTPS" likely isn't checked yet in the
  repo's **Settings → Pages**, or the cert hasn't finished provisioning
  since the CNAME was only added today. Fix: go to Settings → Pages, and
  once "Enforce HTTPS" is available (checkbox un-greyed), enable it. If
  it's greyed out, it means GitHub hasn't finished issuing the cert yet —
  can take up to 24h after DNS + CNAME are both correct (yours already are).
- No third-party scripts reduces attack surface generally.
- Static site + GitHub Pages means no server/database to secure — the main
  residual risk is just the HTTPS cert step above.

## 10. Broken things in the current site to remove/replace

- Footer links to `about.html`, `history.html`, `photos.html`, `#` (Home,
  Contact) — none of these pages exist. Replace with real nav.
- Fabricated brewery list and "12 breweries in Kensington and Fishtown"
  placeholder map.
- Generic "How It Works" 3-step section — describes an app that doesn't
  exist.
- README.md describes a "self-guided pub crawl application" with
  hypothetical future features (reviews, custom routes) — rewrite to match
  reality.

## 11. Open items blocking final content

1. ~~Confirm exact spelling/name for "St. Oners" and "Arsenal/ARS."~~ — done.
2. ~~Rating scale.~~ — done: the Momentum Scale (SPRINT/RUN/WALK/CRAWL).
3. ~~Map approach.~~ — done: Leaflet/OSM, tinted base tiles + custom
   cartoon pins/popups. Confirm this reading of "cartoonish overlay"
   matches what you pictured, or say if you meant a fully custom
   illustrated basemap instead (bigger lift, but doable).
4. ~~Additional walks.~~ — done: ongoing annual series, 2027 confirmed next.
   No further walks to account for right now beyond 2025/2026.

## 12. v1 build — shipped

Home, `/walks/`, `/walks/2025/`, `/walks/2026/`, `/breweries/` (with the
Leaflet/OSM cartoon map), `/about/` are live.

**Ratings, round one:** 10 of 13 stops have real Momentum reviews from
Chris (Human Robot, Fermentery Form, Wissahickon, Punch Buggy, Sacred
Vice, Lost Time, Evil Genius, Pip's, Forest & Main, Mural City Cellars).
Brewery ARS, St. Oner's, and Frankford Hall are still "Not yet rated."
Data model: each brewery in `assets/js/breweries-data.js` holds a
`reviews` array (not a single rating), so a new visit just appends a new
`{label, tier, note}` entry instead of overwriting the last one — both
the map and the rollup page badge use the latest entry. The matching
`<li>` markup lives in `breweries/index.html` (kept as hand-written HTML,
not rendered from the JS data, so content stays visible without
JavaScript).

**Per-walk route maps:** each `/walks/YYYY/` page now has a real map of
that year's route (replacing the "group photo" placeholder) — numbered
pins in visit order, connected by an actual walking path. No GPS track
exists for either walk, so the path is computed via OSRM's public
foot-routing API over OpenStreetMap's street network between consecutive
stops, in visited order; the page says so explicitly (`.map-caveat`) so
it's never mistaken for a recorded track. Distance (2025: ~4.0 mi, 2026:
~4.6 mi) comes from that same computed route and is now a stat on each
page. Geometry is pre-fetched and baked into `assets/js/routes-data.js` —
no live routing calls happen on page load.

**Correction during rollout:** the first deploy assumed GitHub Pages was
serving from a `gh-pages` branch built by `.github/workflows/deploy.yml`
(that workflow existed, ran successfully, and DNS/CNAME all looked
consistent with it). It wasn't — Pages was actually configured to build
straight from the `main` branch root via Jekyll, and that workflow/branch
were dead infrastructure. Restructuring the repo into `/public` deleted
the root `index.html` the real mechanism depended on, which took
`walk.beer` down for a few minutes (it fell back to auto-rendering
`README.md`). Fixed by moving the site back to the repo root and using
`_config.yml`'s Jekyll `exclude` list to keep `SPEC.md`/`README.md` out of
the published output instead, and removing the unused workflow. Lesson:
verify the actual configured Pages source (Settings → Pages) before
trusting what a workflow file implies.

## 13. Not yet built — next round

- **A "Research" page** — Chris's own musings on what to add for next
  year's walk (candidate breweries, route ideas, logistics notes). Not
  scoped yet: is this a public blog-style page like the others, or more
  of a running/informal notes page? Decide voice and structure before
  building.
- **Outbound links per brewery** — on the `/breweries/` rollup, link out
  to (a) each brewery's own website and (b) its Untappd and/or
  BeerAdvocate page, so a visitor has context beyond our one-line blurb.
  Needs the actual URLs gathered per venue (13 of them) before this can
  be built — can source these the same way the addresses were verified.
