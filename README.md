# senorgatos.com — The Workshop

Personal site for Senor Gatos. Built with SvelteKit + MDsveX.
Pop-art basement tinkerer aesthetic. There are easter eggs. Find them yourself.

---

## Dev setup

```sh
npm install
npm run dev -- --open   # starts on localhost:5173
npm run build           # production build
npm run preview         # preview the production build locally
```

---

## Adding content

### Blog posts

Drop a `.md` file in `src/lib/posts/`. That's it — it appears on `/blog` automatically, sorted by date.

**Required frontmatter:**

```markdown
---
title: "Post title here"
date: "2026-05-28"
tags: ["tag1", "tag2"]
excerpt: "One sentence shown on the index card."
---

Your content here. Standard markdown: # headings, **bold**, `code`, lists, links, etc.
```

Slug comes from the filename — `my-cool-post.md` → `/blog/my-cool-post`.

---

### Hobbies

Edit `src/lib/data/hobbies.ts`. Each hobby is an object in the array:

```ts
{
  id: 'unique-id',
  title: 'Hobby Name',
  desc: 'Short description shown on the card.',
  progress: 60,          // 0–100, shows as a gauge bar
  unit: 'hours in',      // label under the gauge
  icon: '⚡',            // emoji shown on the card
  color: 'crt',          // 'crt' | 'amber' | 'blue' | 'red'
  log: [
    { date: '2026-05-27', note: 'What happened today.' },
  ],
}
```

---

### Projects

Edit `src/lib/data/projects.ts`. Each project is an object:

```ts
{
  id: 'unique-id',
  title: 'Project Name',
  desc: 'What it is.',
  status: 'in-progress',  // 'complete' | 'in-progress' | 'shelved' | 'planning'
  tags: ['sveltekit', 'hardware'],
  year: 2026,
  link: 'https://...',    // optional — shows a VIEW → button
}
```

---

### Now Playing widget

Edit `src/lib/data/now.ts` — one file, three fields:

```ts
export const now = {
  type: 'song',        // 'song' | 'game' | 'activity' | 'watch' | 'read' | 'off'
  title: 'Song Name',  // what to display
  detail: 'Artist',    // optional second line (artist, platform, etc.)
};
```

Set `type: 'off'` to hide the widget entirely.

### About page

Edit `src/routes/about/+page.svelte` directly. The bio text, interests list, and dossier fields are all plain HTML you can update inline.

### Scripts & Sketches

Edit `src/lib/data/scripts.ts`. Each entry has:
- `type`: `'sketch' | 'script' | 'bit' | 'monologue' | 'premise'`
- `status`: `'performed' | 'draft' | 'shelved' | 'in-progress'`
- `logline`: one-line premise shown on the card
- `content`: optional full text (shown in an expandable panel)
- `link`: optional external link instead of inline content

### D&D Characters

Edit `src/lib/data/dndCharacters.ts`. Each character has name, race, class, level, campaign, status, backstory, and a `portrait` object with `skin`, `hair`, `outfit`, `accent` hex colors — these generate a unique pixel art portrait automatically.

### Social media links

Links appear in two places — update both when you have your real handles:

1. **Footer** — `src/routes/+layout.svelte`, search for `social-links`. Four `<a>` tags with `href` placeholders.
2. **About corkboard** — `src/routes/about/+page.svelte`, search for `Find me elsewhere`. Same four links plus display handles.

Placeholders to replace:
- `yourinvite` → your Discord invite code (e.g. `discord.gg/abc123`)
- `yourname` → your Twitch, Bluesky, and Letterboxd handles

---

## Project structure

```
src/
  app.css                  ← global design system (palette, fonts, utilities)
  app.html                 ← HTML shell (fonts loaded here)
  lib/
    posts/                 ← blog posts (*.md)
    data/
      hobbies.ts           ← hobby data
      projects.ts          ← project data
    inventory.ts           ← easter egg inventory system
    components/
      EasterEggs.svelte    ← all easter egg logic lives here
  routes/
    +layout.svelte         ← nav, footer, global wrappers
    +page.svelte           ← homepage (the workbench)
    blog/                  ← /blog index + /blog/[slug] post pages
    projects/              ← /projects shelf
    hobbies/               ← /hobbies gauge cards
    about/                 ← /about corkboard
    the-void/              ← secret
    blueprint/             ← secret
    sudo/                  ← secret
    inventory/             ← secret
```

---

## Deployment

Install an adapter first:

```sh
# Cloudflare Pages (recommended — free)
npm install @sveltejs/adapter-cloudflare

# Vercel
npm install @sveltejs/adapter-vercel

# Static export
npm install @sveltejs/adapter-static
```

Then update `svelte.config.js`:

```js
import adapter from '@sveltejs/adapter-cloudflare'; // or vercel / static
```

For **Cloudflare Pages**: connect the repo in the Cloudflare dashboard, set build command `npm run build`, output directory `.svelte-kit/cloudflare`.

For **Vercel**: `npx vercel` — it auto-detects SvelteKit.

---

## RSS feed

Live at `/rss.xml`. Autodiscovery is wired into the `<head>` so feed readers find it automatically.

---

## Tech

- [SvelteKit](https://svelte.dev/docs/kit) — framework
- [MDsveX](https://mdsvex.pngwn.io/) — markdown in Svelte
- [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) — pixel font
- [VT323](https://fonts.google.com/specimen/VT323) — CRT mono font
- [Crimson Pro](https://fonts.google.com/specimen/Crimson+Pro) — body font
