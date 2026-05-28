export interface HobbyLog {
  date: string;
  note: string;
}

export type HobbyStatus = 'active' | 'queued' | 'someday';

export interface Hobby {
  id: string;
  title: string;
  desc: string;
  progress: number;
  unit: string;
  icon: string;
  color: 'crt' | 'amber' | 'blue' | 'red';
  status: HobbyStatus;
  log: HobbyLog[];
}

export interface LifeGoal {
  id: string;
  title: string;
  desc: string;
  icon: string;
  status: 'active' | 'someday';
  steps: string[];
}

// ── ACTIVE — currently doing these ────────────────────────────────────────────

export const hobbies: Hobby[] = [
  {
    id: 'improv',
    title: 'Improv Comedy',
    desc: 'Long-form Harold work. Already at Level 3 — ensemble scenes, game of the scene, the whole thing.',
    progress: 60,
    unit: '% through the program',
    icon: '🎭',
    color: 'amber',
    status: 'active',
    log: [],
  },
  {
    id: 'sketch-writing',
    title: 'Writing',
    desc: 'Finding the game of the scene on paper. Premise, escalation, button. Still figuring out my POV.',
    progress: 25,
    unit: '% of a full show',
    icon: '✎',
    color: 'amber',
    status: 'active',
    log: [],
  },
  {
    id: 'physics-tinkering',
    title: 'Electronics & Physics',
    desc: 'Cloud chambers, Geiger counters, Tesla coils. Making radiation visible and sparks happen on purpose.',
    progress: 35,
    unit: '% of project list',
    icon: '⚡',
    color: 'crt',
    status: 'active',
    log: [
      { date: '2026-05-15', note: 'Fried another ESP32. Progress.' },
    ],
  },
  {
    id: 'gaming',
    title: 'Gaming',
    desc: 'Across genres, platforms, decades. Currently studying why some games feel good and others don\'t.',
    progress: 100,
    unit: '% committed to the bit',
    icon: '🕹️',
    color: 'blue',
    status: 'active',
    log: [],
  },
  {
    id: 'twitch',
    title: 'Twitch Streaming',
    desc: 'Live. Still figuring out how to talk to an empty chat without losing my mind.',
    progress: 20,
    unit: '% to Affiliate',
    icon: '📡',
    color: 'red',
    status: 'active',
    log: [],
  },
  {
    id: 'film',
    title: 'Film Appreciation',
    desc: 'Watching everything. Logging on Letterboxd. Building a vocabulary for why shots work.',
    progress: 30,
    unit: '% through the canon',
    icon: '🎬',
    color: 'blue',
    status: 'active',
    log: [],
  },
  {
    id: 'dnd-playing',
    title: 'D&D (Playing)',
    desc: 'Roleplaying over optimal play. Still want a moment the whole table talks about after.',
    progress: 45,
    unit: '% of player mastery',
    icon: '🎲',
    color: 'crt',
    status: 'active',
    log: [],
  },
  {
    id: 'reading',
    title: 'Reading',
    desc: 'Working through the classics and whatever pile is on the bench. Blindsight broke me.',
    progress: 42,
    unit: 'books this year',
    icon: '📚',
    color: 'amber',
    status: 'active',
    log: [
      { date: '2026-05-20', note: 'Finished The Left Hand of Darkness. Wow.' },
      { date: '2026-04-10', note: 'Started Blindsight. Immediately unsettled.' },
    ],
  },
];

// ── QUEUED — want to start, have a plan ───────────────────────────────────────

export interface QueuedSkill {
  id: string;
  title: string;
  desc: string;
  icon: string;
  timeline: string;
}

export const queue: QueuedSkill[] = [
  { id: 'crochet',        icon: '✿', title: 'Crochet',           desc: 'Starting with hooks and worsted weight. Working toward amigurumi.',           timeline: '1–3 months' },
  { id: 'vfx',            icon: '✦', title: 'VFX (Blender)',     desc: 'Donut tutorial → simulations → integrate CGI into real footage.',             timeline: '12–18 months' },
  { id: '3d-printing',    icon: '◈', title: '3D Printing',       desc: 'TinkerCAD → Fusion 360. Design things that solve real problems.',             timeline: '2–4 months' },
  { id: 'piano',          icon: '♪', title: 'Piano',             desc: 'C major scale → hands together → one real song start to finish.',             timeline: '6–12 months' },
  { id: 'kung-fu',        icon: '☯', title: 'Kung Fu',           desc: 'Stances, strikes, forms. In-person school required.',                         timeline: '1–2 years' },
  { id: 'asl',            icon: '☯', title: 'ASL',               desc: 'Its own grammar, not signed English. 200 signs → full conversation.',         timeline: '1–2 years' },
  { id: 'spanish',        icon: '◎', title: 'Spanish',           desc: 'Daily streak habit. 500 words → language exchange → subjunctive (the wall).',  timeline: '6–18 months' },
  { id: 'concept-art',    icon: '✏', title: 'Concept Art',       desc: 'Drawabox → figure drawing → Krita → 8–10 portfolio pieces.',                  timeline: '~3 years' },
  { id: 'woodworking',    icon: '⌂', title: 'Woodworking',       desc: 'Hand tools → power tools → furniture I designed.',                            timeline: '1–2 years' },
  { id: 'blacksmithing',  icon: '⚒', title: 'Blacksmithing',     desc: 'Forge a hook. Then a knife. Then something I\'m proud to display.',           timeline: '6–18 months' },
  { id: 'archery',        icon: '➶', title: 'Archery',           desc: 'Recurve bow. Form first, accuracy second. 30 yards with good groupings.',      timeline: '1–3 months' },
  { id: 'cooking',        icon: '✺', title: 'Cooking',           desc: 'Knife skills → sauces from scratch → hosting a dinner without a recipe.',      timeline: '6–12 months' },
  { id: 'baking',         icon: '❀', title: 'Baking',            desc: 'Cookies → bread → sourdough starter → croissants (ambitious).',               timeline: '3–6 months' },
  { id: 'video-editing',  icon: '⊡', title: 'Video Editing',     desc: 'DaVinci Resolve. Color grading, multicam, a signature editing style.',        timeline: '2–4 months' },
  { id: 'painting',       icon: '◉', title: 'Painting',          desc: 'Acrylics to start. Value studies → original work → 3 pieces I\'d show.',      timeline: '3–6 months' },
  { id: 'dnd-dm',         icon: '⬢', title: 'D&D (DMing)',        desc: 'Prep situations not plots. Complete a full campaign arc. Make someone cry.', timeline: '6–12 months' },
  { id: 'electronics-repair', icon: '🔧', title: 'Electronics Repair', desc: 'Phone screen → battery → board-level soldering under magnification.',   timeline: '3–6 months' },
  { id: 'cpr',            icon: '♥', title: 'CPR & First Aid',   desc: 'Get certified. Practice until AED operation is automatic.',                   timeline: '1–2 days' },
];

// ── SOMEDAY — long-term or low-urgency ────────────────────────────────────────

export const someday: { id: string; icon: string; title: string; }[] = [
  { id: 'glass-blowing',  icon: '◌', title: 'Glass Blowing' },
  { id: 'gardening',      icon: '✾', title: 'Porch Gardening' },
  { id: 'firearms',       icon: '◈', title: 'Firearms Handling' },
  { id: 'diy-electric',   icon: '⚡', title: 'DIY Electrical' },
  { id: 'notary',         icon: '⊕', title: 'Notary Public' },
  { id: 'meditation',     icon: '◯', title: 'Meditation' },
  { id: 'journaling',     icon: '✒', title: 'Journaling' },
  { id: 'organizing',     icon: '⊙', title: 'Cleaning & Systems' },
  { id: 'writing-book',   icon: '❋', title: 'Write a Book' },
  { id: 'improv-advanced',icon: '🎤', title: 'House Team / Performing' },
  { id: 'short-film',     icon: '🎥', title: 'Short Filmmaking' },
];

// ── LIFE GOALS — not skills, just things to do ────────────────────────────────

export const lifeGoals: LifeGoal[] = [
  {
    id: 'iot',
    title: 'IoT Platform & Devices',
    icon: '⚛',
    desc: 'Ship hardware. Get early users. Build recurring revenue. Then a small team.',
    status: 'active',
    steps: [
      'Ship first hardware prototype',
      'Launch platform with early users',
      'Establish a recurring revenue model',
      'Build a small team around the product',
    ],
  },
  {
    id: 'civic',
    title: 'Civic Engagement Platform',
    icon: '⊛',
    desc: 'Real civic impact, measurable. Multiple cities. Mission-aligned partners.',
    status: 'active',
    steps: [
      'Launch MVP with a real community or municipality',
      'Demonstrate measurable civic impact',
      'Find mission-aligned partners or funding',
      'Scale to multiple cities or communities',
    ],
  },
  {
    id: 'reading-habit',
    title: 'Read 10–20 books a year',
    icon: '📖',
    desc: '1 book per month = very achievable with 20 min/day. Track on Goodreads or StoryGraph.',
    status: 'active',
    steps: [
      '10 books = ~1 per month — 20 min/day',
      '20 books = ~1 every 2.5 weeks',
      'Mix fiction & non-fiction',
      'Track on Goodreads or StoryGraph',
    ],
  },
  {
    id: 'local-office',
    title: 'Run for local office',
    icon: '⌂',
    desc: 'School board, city council, or community planning. Start attending meetings now.',
    status: 'someday',
    steps: [
      'Attend local school board or city council meetings',
      'Join a community organization or neighborhood board',
      'Volunteer on a local campaign',
      'Consider school board or city council run',
    ],
  },
  {
    id: 'mentor',
    title: 'Volunteer as tutor or mentor',
    icon: '◎',
    desc: 'Library tutoring, Big Brothers Big Sisters, SCORE, ESL, or after-school programs.',
    status: 'someday',
    steps: [
      'Look into library tutoring programs',
      'Research Big Brothers Big Sisters',
      'Check out SCORE for small business mentoring',
      'Find a community center ESL or after-school program',
    ],
  },
  {
    id: 'court-watching',
    title: 'Court watching',
    icon: '⚖',
    desc: 'Most courtrooms are open to the public. Criminal, civil, family, appellate — great complement to civic work.',
    status: 'active',
    steps: [
      'Check your local courthouse schedule online',
      'Try different court types: criminal, civil, family, appellate',
      'Go at least once',
    ],
  },
];
