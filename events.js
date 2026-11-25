/* =====================================================================
   EVENTS – the only file you edit for events & photo albums.

   NEW EVENT:
   1. Make a folder name:  events/JJJJ-MM-TT-name   (e.g. events/2026-12-12-pub80)
   2. Upload the flyer into that folder as  flyer.jpg
   3. Copy one { ... }, block below, paste it at the TOP of the list, change the text.

   AFTER THE EVENT (photo album):
   1. Upload the compressed photos into the same folder (01.jpg, 02.jpg, ...)
   2. Write the file names into  photos: [ ... ]
   The event moves to "Vergangene Abende" automatically the day after.

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
    photos:  [
    ],
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
    photos:  [
      // after the event, e.g.:  "01.jpg", "02.jpg", "03.jpg",
    ],
  },

];
