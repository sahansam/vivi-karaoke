# Vivi's Mic Drop – vivikaraoke.de

Website for **Vivi's Mic Drop – Karaoke & Sound** (Stuttgart & Region).
Hosted for free with GitHub Pages. Every upload here is live on vivikaraoke.de after 1–2 minutes.

---

## 📁 Folder structure

```
vivi-karaoke/
├── index.html                  ← homepage (business card + events + info)
├── events.html                 ← all upcoming + past events  (vivikaraoke.de/events)
├── events.js                   ← ✏️ THE ONLY FILE YOU EDIT for events and photos
├── phototool-vmd/index.html    ← private photo tool (vivikaraoke.de/phototool-vmd/)
│
├── events/                     ← one folder per event
│   ├── 2026-10-24-massis-taverna/
│   │   ├── flyer.jpg           ← the event flyer
│   │   ├── 01.jpg              ← photos of the night (after the event)
│   │   ├── 02.jpg
│   │   └── …
│   ├── 2026-11-28-lincontro/
│   │   └── flyer.jpg
│   └── 2027-01-09-massis-taverna/
│       └── flyer.jpg
│
├── karaoke-jga-stuttgart.html          ┐
├── karaoke-geburtstag-party.html       │ info pages for Google
├── karaoke-firmenfeier-stuttgart.html  │
├── karaoke-fuer-kneipen-bars.html      ┘
├── impressum.html, datenschutz.html    ← legal pages
├── style.css, events.css, events-app.js, limelight.woff2, og-image.jpg
├── sitemap.xml, robots.txt             ← for Google
├── _config.yml                         ← keeps this README off the website
└── CNAME                               ← ⚠️ never delete (keeps vivikaraoke.de working)
```

### Folder name rules (important)

`JJJJ-MM-TT-pubname` → e.g. `2026-12-12-pub80`

- date first: year-month-day
- lowercase, no spaces → use `-` (`massis-taverna`)
- no apostrophes or umlauts: `l'incontro` → `lincontro`, `Fässle` → `faessle`
- the folder name must be **exactly** the same as `id:` in events.js

---

## 🎤 A) New event – before the night (3 min)

1. On your computer make a folder, e.g. `2026-12-12-pub80`, put the flyer inside and rename it to **`flyer.jpg`**.
2. GitHub → open the **`events`** folder → **Add file → Upload files** → drag the folder in → **Commit changes**.
3. Open **`events.js`** → ✏️ pencil → copy one block from `{` to `},` → paste it right under `window.EVENTS = [` → change it:

```js
  {
    id:      "2026-12-12-pub80",      // = folder name
    date:    "2026-12-12",            // JJJJ-MM-TT
    time:    "20:00",
    title:   "Karaoke mit Vivi",      // not shown, can stay
    venue:   "Pub80",                 // shown as the headline
    address: "Straße Nr.",
    city:    "PLZ Ort",
    info:    ["Raucherlokal", "Eintritt frei"],
    text:    "Karaoke-Abend im Pub80 – komm vorbei und sing mit!",
    flyer:   "flyer.jpg",
    photos:  0,
  },
```

4. **Commit changes.** The event appears under **„Nächste Karaoke-Abende“**.

What happens automatically:
- the homepage shows the **3 nearest** events; with more than 3 a **„+X weitere Termine →“** button appears
- at **6:00 the morning after** the event it moves to **„Vergangene Karaoke-Abende“**

---

## 📸 B) Photos – after the night (5 min)

### Easiest way: the photo tool (private link)
1. Open **vivikaraoke.de/phototool-vmd/** (bookmark it – it is not linked anywhere and hidden from Google; it cannot upload or change anything by itself).
2. Choose the event → choose the photos (best 15–40).
3. Tap **„Prepare photos“** → you get **`fotos-<event>.zip`**.
   The tool resizes the photos to 1600 px, removes the hidden GPS/location data, numbers them `01.jpg, 02.jpg …` and updates `events.js` for you.
4. Unzip it → GitHub repo start page → **Add file → Upload files** → drag in **both** the `events` folder and `events.js` → **Commit changes**.
5. Done: the event gets a **„📸 Fotos ansehen (12)“** button that opens the album.

Adding more photos later? Just run the tool again for the same event – new photos continue the numbering (13, 14 …).

### Manual way
Upload photos named `01.jpg`, `02.jpg` … into the event folder and change that event's line in events.js to the number of photos, e.g. `photos:  12,`.

### Photo rules (DSGVO)
- prefer stage, crowd and Vivi – avoid unflattering close-ups of drunk guests
- if someone asks to be removed: delete the photo on GitHub and lower the number in events.js (or send it to Claude to renumber)
- a small sign at the venue: *„Heute wird fotografiert – sag uns Bescheid, wenn du nicht drauf sein willst“*
- iPhone HEIC photos: send them to yourself via WhatsApp/AirDrop first, or set *Settings → Camera → Formats → Most Compatible*

### Share an album
Each album has its own link: `vivikaraoke.de/#fotos-2026-10-24-massis-taverna` (= `#fotos-` + folder name). Post it in the WhatsApp group.

---

## 🔒 Who can change the website
Only the GitHub account **sahansam** (passkey + 2FA). Visitors can only look.
- Settings → Collaborators must stay **empty**.
- Never click **Merge** on a pull request from someone else – just close it.

## ⚠️ If something breaks

- **Site empty / events gone after editing events.js** → almost always a missing `"` or `,`. Open the file's **History**, compare with the last version, or send a screenshot to Claude.
- **Red ❌ under Deployments** → Actions tab → failed run → **Re-run all jobs**.
- **Never delete `CNAME`.**
