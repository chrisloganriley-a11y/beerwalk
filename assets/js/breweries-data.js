/* Shared brewery/venue data — used by the map on /breweries/.
   Momentum ratings are authored by hand, not computed.

   Each brewery holds a `reviews` array instead of one fixed rating, so a
   new review can just be appended (e.g. after next year's walk) without
   overwriting the last one. `reviews` is ordered oldest -> newest; the
   map and the "latest" badge both use the LAST entry. Empty array means
   not yet rated.

   `links` holds outbound references (website, Untappd, BeerAdvocate) —
   any field can be omitted if that venue doesn't have one (e.g. a
   winery or cider bar won't have a BeerAdvocate profile). */

const BREWERIES = [
  {
    slug: "human-robot",
    name: "Human Robot",
    type: "Brewery",
    neighborhood: "Kensington",
    address: "1710 N 5th St",
    lat: 39.9773032, lon: -75.1435877,
    years: [2025, 2026],
    links: {
      website: "https://www.humanrobotbeer.com/",
      untappd: "https://untappd.com/HumanRobot",
      beeradvocate: "https://www.beeradvocate.com/beer/profile/58686/"
    },
    reviews: [
      {
        label: "Through 2026",
        tier: "sprint",
        note: "We've started the walk here both years — best lagers in Philly, by far. The Milk Tubes are a must. It's easy to get ahead of yourself because the beers are that good. Great vibes, and an amazing start to the day. Whenever anyone asks me what beer to try, Human Robot is the first name I bring up."
      }
    ]
  },
  {
    slug: "fermentery-form",
    name: "Fermentery Form",
    type: "Brewery",
    neighborhood: "Kensington",
    address: "1700 N Palethorp St",
    lat: 39.9709169, lon: -75.1386766,
    years: [2026],
    links: {
      website: "https://www.fermenteryform.com/",
      untappd: "https://untappd.com/FermenteryForm",
      beeradvocate: "https://www.beeradvocate.com/beer/profile/50398/"
    },
    reviews: [
      {
        label: "Through 2026",
        tier: "sprint",
        note: "Awesome beer, great ambiance — feels like a back-alley bar in Belgium. Since it's a blendery and mostly farmhouse ales, it can't be a late stop, but starting here or hitting it early is a great way to cool off and check out all the barrels. Grab a bottle of Lofi or Petite and your group is good to go."
      }
    ]
  },
  {
    slug: "wissahickon-brewing",
    name: "Wissahickon Brewing Co.",
    type: "Brewery",
    neighborhood: "Kensington",
    address: "1526 N American St",
    lat: 39.9746001, lon: -75.1402239,
    years: [2025, 2026],
    links: {
      website: "https://www.wissahickonbrew.com/",
      untappd: "https://untappd.com/WissahickonBrewingCo",
      beeradvocate: "https://www.beeradvocate.com/beer/profile/48558/"
    },
    reviews: [
      {
        label: "Through 2026",
        tier: "run",
        note: "Great addition to American Street. The beers are okay, but the food comes out quick. You might have to fight through some dogs and babies in the fall, but midsummer on a Saturday it's smooth sailing. Grab some fries — helps you not die. In 2025 a few of us got bogged down by the alcoholic slushies. We avoided that mistake in 2026."
      }
    ]
  },
  {
    slug: "punch-buggy-brewing",
    name: "Punch Buggy Brewing Co.",
    type: "Brewery",
    neighborhood: "Kensington",
    address: "1445 N American St",
    lat: 39.9736447, lon: -75.1396225,
    years: [2025, 2026],
    links: {
      website: "https://punchbuggybrewing.com/",
      untappd: "https://untappd.com/PunchBuggyBrewingCompany",
      beeradvocate: "https://www.beeradvocate.com/beer/profile/60257/"
    },
    reviews: [
      {
        label: "Through 2026",
        tier: "walk",
        note: "The beers are nothing to write home about, but it's on the way to other places and makes a great space-filler. Nice outdoor area when it's not 100 degrees. They've also got a PS5 — one walker this year skipped the beer entirely and just chilled on the console."
      }
    ]
  },
  {
    slug: "sacred-vice",
    name: "Sacred Vice Brewing Co.",
    type: "Brewery",
    neighborhood: "Kensington",
    address: "120 W Berks St",
    lat: 39.9788463, lon: -75.1357282,
    years: [2025, 2026],
    links: {
      website: "https://sacredvice.com/",
      untappd: "https://untappd.com/SacredViceBrewing",
      beeradvocate: "https://www.beeradvocate.com/beer/profile/56777/"
    },
    reviews: [
      {
        label: "Through 2026",
        tier: "run",
        note: "Easy to grab a beer. The lagers are pretty good — not as good as Human Robot, but the venue is awesome: vintage decor with a great wooden bar and plenty of taps. In 2026 we got there early and it was easy in and out. Get there later on a Saturday and it'll get busy, and potentially loud depending on who's spinning the vinyl — we found that out in 2025."
      }
    ]
  },
  {
    slug: "lost-time-brewing",
    name: "Lost Time Brewing Co.",
    type: "Brewery",
    neighborhood: "Kensington",
    address: "2145 N Front St",
    lat: 39.9828129, lon: -75.1324732,
    years: [2025, 2026],
    links: {
      website: "https://www.losttimebrewco.com/",
      untappd: "https://untappd.com/LostTimeBrewingCo",
      beeradvocate: "https://www.beeradvocate.com/beer/profile/68543/"
    },
    reviews: [
      {
        label: "Through 2026",
        tier: "walk",
        note: "Mikey's Gym. Grab the lager, or if you're feeling frisky, get the sour (not a big fan myself). In 2026 a walker grabbed a random stromboli from a vendor outside. Easy in and out. Not a big fan of dogs in the establishment, but overall a positive experience — a great neighborhood spot to spend some quality time."
      }
    ]
  },
  {
    slug: "brewery-ars",
    name: "Brewery ARS",
    type: "Brewery",
    neighborhood: "Fishtown",
    address: "2223 Frankford Ave",
    lat: 39.9799544, lon: -75.1288064,
    years: [2026],
    links: {
      website: "https://www.breweryars.com/",
      untappd: "https://untappd.com/w/brewery-ars/159823",
      beeradvocate: "https://www.beeradvocate.com/beer/profile/69800/"
    },
    reviews: [
      {
        label: "Through 2026",
        tier: "walk",
        note: "The beers are okay — grab one and move on. Nice outdoor seating, and depending on the day they'll have food vendors. Nothing to think too hard about here."
      }
    ]
  },
  {
    slug: "st-oners",
    name: "St. Oner's",
    type: "Brewpub — a Tired Hands joint",
    neighborhood: "Fishtown",
    address: "2218 Frankford Ave",
    lat: 39.9801503, lon: -75.1292107,
    years: [2025, 2026],
    links: {
      website: "https://www.stonersfishtown.com/",
      untappd: "https://untappd.com/v/st-oner-s/9856584"
    },
    reviews: [
      {
        label: "Through 2026",
        tier: "run",
        note: "The beers can be heavy, but you can find something lighter if you look. I'll stop in here when I'm feeling something hoppy or something fancy — not dissimilar to Forest & Main. They've also got food, which is life-giving on the walk, especially since this is early in the second route. Good service here."
      }
    ]
  },
  {
    slug: "evil-genius",
    name: "Evil Genius Beer Co.",
    type: "Brewery",
    neighborhood: "Fishtown",
    address: "1727 N Front St",
    lat: 39.9757484, lon: -75.1338733,
    years: [2026],
    links: {
      website: "https://evilgeniusbeer.com/",
      untappd: "https://untappd.com/evilgeniusbeer",
      beeradvocate: "https://www.beeradvocate.com/beer/profile/29022/"
    },
    reviews: [
      {
        label: "Through 2026",
        tier: "walk",
        note: "Beers are just okay. The inside is large — a great filler stop with outdoor seating too. Everyone can find a seat. One beer and move on."
      }
    ]
  },
  {
    slug: "pips",
    name: "Pip's",
    type: "Cider Bar",
    neighborhood: "Fishtown",
    address: "1321 N Lee St",
    lat: 39.9707343, lon: -75.1349985,
    years: [2026],
    links: {
      website: "https://www.instagram.com/pipsbyploughman/",
      untappd: "https://untappd.com/v/pip-s-a-bar-by-ploughman-cider-co/13715103"
    },
    reviews: [
      {
        label: "Through 2026",
        tier: "walk",
        note: "New for 2026. Great vibes, but it's down near Frankford, which means it gets busy with cool people. The free pool table must pull folks in from the street. They're friends with Human Robot — one of the few places outside the taproom where you can get it on draft, not just in a can. They've also got some pretty cool funk ciders. Watch out, though: some of the drinks are high ABV, and in 2026 we got there later in the night, so it was hopping."
      }
    ]
  },
  {
    slug: "forest-and-main",
    name: "Forest & Main",
    type: "Brewery",
    neighborhood: "Fishtown",
    address: "1416 Frankford Ave",
    lat: 39.9723900, lon: -75.1349025,
    years: [2026],
    links: {
      website: "https://forestandmain.com/",
      untappd: "https://untappd.com/forestandmain",
      beeradvocate: "https://www.beeradvocate.com/beer/profile/65170/"
    },
    reviews: [
      {
        label: "Through 2026",
        tier: "walk",
        note: "New for 2026 — the beers are really good. Can get busy, and it's hard to find a seat later at night. The pub lager is the move on the walk. I love their farmhouse ales, but stay away from those while walking — they'll slow you down. We ended up getting food here to stay alive."
      }
    ]
  },
  {
    slug: "mural-city-cellars",
    name: "Mural City Cellars",
    type: "Urban Winery",
    neighborhood: "Fishtown",
    address: "1831 Frankford Ave",
    lat: 39.9775855, lon: -75.1310006,
    years: [2025, 2026],
    links: {
      website: "https://www.muralcitycellars.com/",
      untappd: "https://untappd.com/v/mural-city-cellars/12586885"
    },
    reviews: [
      {
        label: "Through 2026",
        tier: "crawl",
        note: "We've come here both years, and both times we probably didn't need to end up here so close to the end of the walk. After drinking all day, arriving at a winery doesn't feel like an oasis — it feels like dread, because at that point you need water more than you need more fermented grapes."
      }
    ]
  },
  {
    slug: "frankford-hall",
    name: "Frankford Hall",
    type: "Beer Garden",
    neighborhood: "Fishtown",
    address: "1210 Frankford Ave",
    lat: 39.9694850, lon: -75.1346830,
    years: [2025],
    links: {
      website: "https://frankfordhall.com/",
      untappd: "https://untappd.com/v/frankford-hall/51542",
      beeradvocate: "https://www.beeradvocate.com/beer/profile/25632/"
    },
    reviews: [
      {
        label: "Through 2025",
        tier: "walk",
        note: "This was the final stop on the walk in 2025. Technically not a brewery, since they don't ferment their own beer, but it's a great place to grab a stein and chill outside around a bunch of younger people. Get a pretzel, get a liter of lager, and hope you can crawl home. Removed from the walk in 2026 — jury's out on whether we try it again next year."
      }
    ]
  }
];
