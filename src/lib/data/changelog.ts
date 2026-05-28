// ── CHANGELOG ────────────────────────────────────────────────────────────────
// Add new entries at the top. date is ISO format (YYYY-MM-DD).
// type: 'feature' | 'fix' | 'content' | 'design'

export interface ChangeEntry {
  date: string;
  type: 'feature' | 'fix' | 'content' | 'design';
  title: string;
  items: string[];
}

export const changelog: ChangeEntry[] = [
  {
    date: '2026-05-28',
    type: 'content',
    title: 'First real content',
    items: [
      'Jellyfin home server blog post',
      'Media collection page with DVD/Blu-ray library and filtering',
      '/now page — what I\'m up to right now',
      '/uses page — hardware, software, and bench tools',
      'Hobbies and projects data filled in from skills backlog',
      'Social links: GitHub, Discord, Twitch, Bluesky, Letterboxd',
    ],
  },
  {
    date: '2026-05-27',
    type: 'feature',
    title: 'Easter egg extravaganza',
    items: [
      'Mini terminal (backtick key) with fake workshop commands',
      'Idle screensaver — bouncing pixel cat after 60 seconds',
      'Morse code LED in nav — spells MEOW',
      'Cat hunger meter — come back after 3 days and it gets sad',
      'Inventory system — visit all 5 sections to collect items',
      '/blueprint, /sudo, /the-void secret routes',
      'Konami code secret room',
      'Footer rapid-click reveals secret routes',
      'After-hours mode (11pm–4am)',
      'Console commands: help(), cat(), sudo(), status(), secrets()',
    ],
  },
  {
    date: '2026-05-27',
    type: 'feature',
    title: 'Workshop opens',
    items: [
      'Homepage CRT monitor hero, centered',
      'Blog with MDsveX markdown posts',
      'Projects shelf with status placards',
      'Hobbies page with gauge bars',
      'About corkboard with pinned dossier',
      'Pop art palette — deep indigo + phosphor green + hot pink',
      'Pixel cat with top hat in nav — clicks to spin',
      'Rubber duck easter egg',
      'RSS feed at /rss.xml',
      '404 SIGNAL LOST page',
      'Now Playing widget',
    ],
  },
];
