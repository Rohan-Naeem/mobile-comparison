# Mobile Comparison — Phone Comparison

Compare phones side by side: 2 or 3 mobiles, real specs, images, prices by storage, and real expert reviews.

## Homepage keyword
- Primary: **Phone Comparison** (27,100/mo, KD 59%)
- Early target: **Compare Phones** (4,400/mo, KD 21% Easy)
- "Mobile comparison" is only 590/mo — it is a supporting keyword, not the homepage primary.

## Vs pages (high-volume brand keywords)
- iPhone vs Samsung — 40,500/mo, KD 26%
- iPhone vs Android — 1,500,000/mo, KD 43%
- Samsung vs iPhone — same pair as iPhone vs Samsung
- iPhone 17 Pro vs iPhone 16 Pro — 4,400/mo, KD 15%

## Data
- `data/phones.json` — 40 phones, 12 brands. Specs from GSMArena spec pages (17 Nov 2026), prices are US launch/list prices ONLY where verified, reviews are linked GSMArena reviews (no invented star rating).
- No free phone-spec API worked as a live source (see `data/DATA_SOURCES.md`): azharimm, FonoAPI and the Railway demo were dead; RapidAPI / MobileAPI.dev need a key. So the site does NOT call an API live — it builds static pages from the verified local dataset. That is also better for SEO and speed.
- Images are hotlinked from GSMArena's CDN (`fdn2.gsmarena.com`) — download/self-host them for production.
- Coverage is 40 phones in v1, not every mobile ever made. Add phones by adding them to `data/phones.json` and re-running `build_site.py` (in the workspace, not in this repo).

## Files
- `index.html` — homepage compare tool (2 or 3 phones, search)
- `phones/` — one page per phone
- `brands/` — one page per brand
- `compare/` — vs pages
- `styles.css`, `script.js`, `sitemap.xml`, `robots.txt`, `llms.txt`
