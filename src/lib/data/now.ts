// ── NOW PLAYING ───────────────────────────────────────────────────────────────
// Edit this file to update the "now playing" widget on the homepage.
//
// type options:
//   'song'     → shows a music note icon
//   'game'     → shows a controller icon
//   'activity' → shows a wrench icon
//   'watch'    → shows a screen icon (movie/show)
//   'read'     → shows a book icon
//   'off'      → hides the widget entirely
//
// detail is optional — artist, platform, "season 2", whatever

export const now = {
  type: 'read' as 'song' | 'game' | 'activity' | 'watch' | 'read' | 'off',
  title: 'Jurassic Park',
  detail: 'Michael Crighton',
};
