# Mobile Comparison — Data Sources

Generated 17 Nov 2026. Dataset: `phones.json` (40 phones, 12 brands).
No website was built and nothing was pushed to GitHub in this task.

## 1. Free APIs tested — none worked as a live data source

| API | Result | Evidence |
|---|---|---|
| azharimm/phone-specs-api — `https://api-mobilespecs.azharimm.dev/v2/` | DOES NOT WORK from here | `curl` to `/v2/`, `/v2/brands` and `/v2/apple_iphone_14-11861` (correct GSMArena ID, verified on GSMArena) all returned empty, 17 Nov 2026. `browser.open` on the same URL also failed. Open-source, no key, live-scrapes GSMArena — but the public instance appears down/dead. |
| FonoAPI — `https://fonoapi.freshpixl.com/v1/getdevice` | DOES NOT WORK from here | Token page `https://fonoapi.freshpixl.com/token/generate` and `getdevice?device=Galaxy S23&token=demo` both returned empty. Also its database was last updated **29 Mar 2019** — no iPhone 17, Galaxy S25, Pixel 10, etc. — so it is unusable for current phones even if it worked. |
| thechandrakant15/mobile-specs-api (GitHub) | NO LIVE INSTANCE | Open-source scraper (Node/TypeScript, 7 endpoints, no key). No public demo URL found — self-host only (default `localhost:4000`). |
| Sanjeevu-Tarun/gsmarena-dxomark-mobile-specs-api (GitHub) | NO LIVE INSTANCE | README states "No public API instance is provided — self-hosting is required". Adds DXOMark scores + press renders. |
| Railway demo — `phone-specs-api-production.up.railway.app` (200 phones, from a dev.to article, Aug 2026) | DEAD | `curl` to `/` and `/api/v1/specs/apple_iphone16promax` both returned `{"status":"error","code":404,"message":"Application not found"}`. |
| Smartphone DB (RapidAPI, 14,000+ devices) | NEEDS KEY | RapidAPI key required; free-tier limit not verified. Not callable without a key. |
| Mobile Phone Specs Database (RapidAPI) | NEEDS KEY | Basic free plan: **30 requests/month**; Pro $19/mo (150/day). Too low for a live site. |
| MobileAPI.dev | NEEDS KEY | Search/autocomplete/specs/images; API key required after signup; free-tier limits unverified. Site itself returns HTTP 200. |
| phonespecapi.com | NEEDS KEY | Free tier for development/low traffic; key required. Not tested (no key). |

**What was used instead:** specs were read directly from each phone's GSMArena spec page
(`https://www.gsmarena.com/<slug>-<id>.php`, fetched 17 Nov 2026 with a browser
User-Agent; brand pages + pagination used to find correct slugs — e.g. iPhone 17 Pro Max
is `apple_iphone_17_pro_max-13964`, NOT 14447 as guessed in the task brief).
Review summaries are the opening 1–2 sentences of the linked GSMArena review page.
**Caveat:** scraping GSMArena violates its Terms of Service. This dataset is a seed for
the site — verify/attribute it, and do not present it as an official feed. GSMArena
itself offers no official API.

**Other datasets checked:** `sksalapur/gsmarena-scraper` (`all_devices.json`, 2,751 phones,
scraped Aug 2025) — fields are misaligned (display_size holds contrast ratio, battery is
null, camera is "Photo / Video"), so it was used only to cross-check URLs, not as the
spec source. Kaggle GSMArena dataset is from 2017 and stale.

## 2. Per-phone sources

Specs + image + review for every phone come from its GSMArena spec page
(`specs_source_url` in `phones.json`) and its GSMArena review page
(`review.url`). Prices are US launch/list prices per storage tier, verified by web
search on 17 Nov 2026 — see `price_source_url` per phone. Full list:

- Apple iPhone 17 Pro Max — https://www.gsmarena.com/apple_iphone_17_pro_max-13964.php — prices $1,199/$1,399/$1,599/$1,999 (256GB/512GB/1TB/2TB)
- Apple iPhone 17 Pro — https://www.gsmarena.com/apple_iphone_17_pro-14049.php — $1,099/$1,299/$1,499
- Apple iPhone 17 — https://www.gsmarena.com/apple_iphone_17-14050.php — $799 (256GB only verified)
- Apple iPhone Air — https://www.gsmarena.com/apple_iphone_17_air-13502.php — $999 (256GB launch only verified)
- Apple iPhone 16 Pro Max — https://www.gsmarena.com/apple_iphone_16_pro_max-13123.php — $1,199 (256GB only verified)
- Apple iPhone 16 Pro — https://www.gsmarena.com/apple_iphone_16_pro-13315.php — $999/$1,099/$1,299 (128/256/512GB)
- Apple iPhone 16 — https://www.gsmarena.com/apple_iphone_16-13317.php — $799 (128GB only verified)
- Apple iPhone 15 Pro Max — https://www.gsmarena.com/apple_iphone_15_pro_max-12548.php — $1,199 (256GB only verified)
- Apple iPhone 15 — https://www.gsmarena.com/apple_iphone_15-12559.php — $799 (128GB only verified)
- Apple iPhone 14 — https://www.gsmarena.com/apple_iphone_14-11861.php — price unverified
- Samsung Galaxy S25 Ultra — https://www.gsmarena.com/samsung_galaxy_s25_ultra-13322.php — $1,299.99/$1,419.99/$1,659.99
- Samsung Galaxy S25 — https://www.gsmarena.com/samsung_galaxy_s25-13610.php — $799 (128GB only verified)
- Samsung Galaxy S24 Ultra — https://www.gsmarena.com/samsung_galaxy_s24_ultra-12771.php — $1,299.99 (256GB only verified)
- Samsung Galaxy S24 — https://www.gsmarena.com/samsung_galaxy_s24-12773.php — $799 (128GB only verified)
- Samsung Galaxy S23 Ultra — https://www.gsmarena.com/samsung_galaxy_s23_ultra-12024.php — $1,199 (256GB only verified)
- Samsung Galaxy S23 — https://www.gsmarena.com/samsung_galaxy_s23-12082.php — $799 (128GB only verified)
- Samsung Galaxy A56 — https://www.gsmarena.com/samsung_galaxy_a56-13603.php — $499.99/$549.99 (128/256GB)
- Samsung Galaxy A55 — https://www.gsmarena.com/samsung_galaxy_a55-12824.php — price unverified (not sold in US)
- Google Pixel 10 Pro — https://www.gsmarena.com/google_pixel_10_pro_5g-13987.php — $999/$1,099/$1,219/$1,449
- Google Pixel 10 — https://www.gsmarena.com/google_pixel_10_5g-13979.php — $799 (128GB only verified)
- Google Pixel 9 Pro — https://www.gsmarena.com/google_pixel_9_pro-13218.php — $999/$1,099/$1,219/$1,449
- Google Pixel 9 — https://www.gsmarena.com/google_pixel_9-13219.php — $799/$899 (128/256GB)
- Google Pixel 8a — https://www.gsmarena.com/google_pixel_8a-12937.php — $499 (128GB only verified)
- Xiaomi 15 Ultra — https://www.gsmarena.com/xiaomi_15_ultra-13657.php — price unverified (not sold in US)
- Xiaomi 15 — https://www.gsmarena.com/xiaomi_15-13472.php — price unverified (not sold in US)
- Xiaomi Redmi Note 13 Pro — https://www.gsmarena.com/xiaomi_redmi_note_13_pro-12581.php — price unverified
- OnePlus 13 — https://www.gsmarena.com/oneplus_13-13477.php — $899/$999 (256/512GB)
- OnePlus 12 — https://www.gsmarena.com/oneplus_12-12725.php — price unverified (sources conflict: $799 vs $899)
- Oppo Find X8 Pro — https://www.gsmarena.com/oppo_find_x8_pro-13467.php — price unverified (not sold in US)
- Oppo Find X8 — https://www.gsmarena.com/oppo_find_x8-13407.php — price unverified (not sold in US)
- Vivo X200 Pro — https://www.gsmarena.com/vivo_x200_pro-13410.php — price unverified (not sold in US)
- Vivo X200 — https://www.gsmarena.com/vivo_x200-13433.php — price unverified (not sold in US)
- Realme GT 7 Pro — https://www.gsmarena.com/realme_gt_7_pro-13470.php — price unverified (not sold in US)
- Realme GT 7 — https://www.gsmarena.com/realme_gt_7_5g-13863.php — price unverified (not sold in US)
- Huawei Pura 70 Ultra — https://www.gsmarena.com/huawei_pura_70_ultra-12940.php — price unverified (not sold in US)
- Motorola Edge 50 Ultra — https://www.gsmarena.com/motorola_edge_50_ultra-12919.php — $649 (512GB, single secondary source — re-verify)
- Motorola Edge 50 — https://www.gsmarena.com/motorola_edge_50-13231.php — price unverified
- Nothing Phone 3 — https://www.gsmarena.com/nothing_phone_(3)_5g-13969.php — $799/$899 (256/512GB)
- Nothing Phone 2 — https://www.gsmarena.com/nothing_phone_(2)-12386.php — price unverified
- Sony Xperia 1 VI — https://www.gsmarena.com/sony_xperia_1_vi-13003.php — price unverified in USD (€1,399 MSRP per PhoneArena)

Images: all 40 image URLs are GSMArena `fdn2.gsmarena.com/vv/bigpic/...` URLs taken from
each phone's spec page — real phone images, hotlinked from GSMArena's CDN. For production,
download and self-host them (hotlinking can break / is not ideal).

## 3. What is verified vs unverified

- **Fully verified (specs + image + review + at least one price tier): 24 of 40 phones.**
- **Specs + image + review, price unverified: 16 phones** — iPhone 14, Galaxy A55,
  Xiaomi 15 Ultra, Xiaomi 15, Redmi Note 13 Pro, OnePlus 12, Oppo Find X8 Pro,
  Oppo Find X8, Vivo X200 Pro, Vivo X200, Realme GT 7 Pro, Realme GT 7,
  Huawei Pura 70 Ultra, Motorola Edge 50, Nothing Phone 2, Sony Xperia 1 VI.
  Their `prices` arrays are empty and `prices_note` says why — never invent a price.
- **Reviews: 40 of 40** — every phone has a real GSMArena review URL and the opening
  1–2 sentences of that review. No star rating or score is included (GSMArena reviews
  do not give a single numeric score — none was invented).
- **Display refresh rate: 37 of 40** have a refresh rate extracted from the Display Type
  field; 3 are null (not stated on the spec page in that form).
- **Prices are US launch/list prices, not current prices.** Several 2025 models have
  since been discounted or discontinued (e.g. iPhone 17 Pro/Pro Max discontinued by
  Apple on 9 Sep 2026; iPhone 17's price was raised $799 → $899 the same day).
  `gsmarena_price_listed` in the JSON is GSMArena's current retail snapshot on the
  spec page — it is NOT a launch price and should not be shown as one.
- **Coverage gaps:** only 40 phones (the most-compared 2023–2025 flagships/mid-range).
  No iPhone 18 series, Galaxy S26 series, or Pixel 11 series (released Aug–Sep 2026,
  after the Aug 2025 dataset and not in the target list). No Sony phones beyond Xperia 1 VI.
  Expanding to "every mobile" needs the same pipeline run over full brand lists
  (GSMArena brand pages paginate, e.g. Samsung has 29 pages) — or a paid API key.
