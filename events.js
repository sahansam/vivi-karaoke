/* =====================================================================
   EVENTS – the only file you edit for events & photo albums.
   Full guide: README.md in the GitHub repo (shown on the repo start page).

   NEW EVENT:
   1. Folder name:  events/JJJJ-MM-TT-pubname   (e.g. events/2026-12-12-pub80)
      - lowercase, no spaces, no apostrophes ( l'incontro -> lincontro )
   2. Put the flyer in that folder as  flyer.jpg  and upload the folder into "events".
   3. Copy one { ... }, block below, paste it at the TOP of the list, change the text.
      id = exactly the folder name.

   PHOTOS AFTER THE EVENT:
   Upload 01.jpg, 02.jpg ... into the event folder and write the number
   of photos, e.g.  photos: 12,   (see README.md on GitHub for details)

   AUTOMATIC: at 6:00 the morning after the event it moves from
   "Nächste Karaoke-Abende" to "Vergangene Karaoke-Abende".

   Every { ... } block ends with a comma. Text goes in "quotes".
   ===================================================================== */

window.EVENTS = [

  {
    id:      "2027-01-09-massis-taverna",
    date:    "2027-01-09",
    time:    "20:00",
    title:   "Karaoke Night mit Vivi",
    venue:   "Massi's Taverna",
    address: "Kirchgasse 11",
    city:    "71706 Markgröningen",
    info:    ["Raucherlokal", "Eintritt frei"],
    text:    "Karaoke Night in Massi's Taverna in Markgröningen – komm vorbei und sing mit!",
    flyer:   "flyer.jpg",
    photos:  0,
  },

  {
    id:      "2026-11-28-lincontro",          // = folder name
    date:    "2026-11-28",                     // JJJJ-MM-TT
    time:    "21:00",
    title:   "Karaoke mit Vivi",
    venue:   "l'incontro",
    address: "Überkinger Straße 2",
    city:    "Stuttgart-Bad Cannstatt",
    info:    ["Raucherlokal", "Eintritt frei"],
    text:    "Karaoke-Abend im l'incontro in Bad Cannstatt – komm vorbei und sing mit!",
    flyer:   "flyer.jpg",
    photos:  0,
  },

  {
    id:      "2026-10-24-massis-taverna",
    date:    "2026-10-24",
    time:    "20:00",
    title:   "Karaoke by Vivi",
    venue:   "Massi's Taverna",
    address: "Kirchgasse 11",
    city:    "71706 Markgröningen",
    info:    ["Raucherlokal", "Eintritt frei"],
    text:    "Karaoke by Vivi in Massi's Taverna – singen, lachen, Spaß haben.",
    flyer:   "flyer.jpg",
    photos:  4,
  },

];
