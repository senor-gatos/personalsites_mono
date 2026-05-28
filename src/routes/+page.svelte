<script lang="ts">
  import { onMount } from 'svelte';
  import { collect } from '$lib/inventory';
  import NowPlaying from '$lib/components/NowPlaying.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  onMount(() => collect('workshop'));

  let duckClicks = $state(0);
  let duckMessage = $state('');
  let showDuckMsg = $state(false);
  let duckTimer: ReturnType<typeof setTimeout>;

  const duckLines = [
    'quack.',
    'QUACK.',
    '...quack?',
    'I said quack.',
    'ok this is getting weird.',
    'seriously stop.',
    'fine. you want a secret? check /the-void',
    '...quack.',
  ];

  function clickDuck() {
    duckClicks++;
    duckMessage = duckLines[Math.min(duckClicks - 1, duckLines.length - 1)];
    showDuckMsg = true;
    clearTimeout(duckTimer);
    duckTimer = setTimeout(() => { showDuckMsg = false; }, 2200);
  }

  const workbenchItems = [
    {
      id: 'notebook',
      href: '/blog',
      label: 'Log Book',
      desc: 'thoughts, articles & rants',
      icon: 'notebook',
      col: 'var(--col-paper)',
    },
    {
      id: 'corkboard',
      href: '/hobbies',
      label: 'Hobbies Board',
      desc: 'ongoing obsessions & progress',
      icon: 'corkboard',
      col: '#c87840',
    },
    {
      id: 'blueprint',
      href: '/projects',
      label: 'Blueprint Tube',
      desc: 'things I have built or am building',
      icon: 'blueprint',
      col: 'var(--col-blue)',
    },
    {
      id: 'dossier',
      href: '/about',
      label: 'Dossier',
      desc: 'who even is this person',
      icon: 'dossier',
      col: 'var(--col-crt)',
    },
  ];

  // no fade-in needed
</script>

<svelte:head>
  <title>Senor Gatos — The Workshop</title>
  <meta name="description" content="Basement engineer. Sci-fi enjoyer. Maker of things." />
</svelte:head>

<div class="workbench">

  <!-- Ambient workshop ceiling light glow -->
  <div class="ceiling-light" aria-hidden="true"></div>

  <!-- ── HERO ─────────────────────────────────── -->
  <header class="hero">
    <div class="hero__monitor pixel-box pixel-box--crt">
      <div class="monitor__screen">
        <div class="monitor__scanline" aria-hidden="true"></div>
        <p class="monitor__label mono">WORKSHOP OS v2.4.1</p>
        <h1 class="monitor__title">
          SENOR<br/>GATOS
        </h1>
        <p class="monitor__sub mono">
          basement artificer &amp;<br />
          way too distracted engineer<br />
          <span class="blink">_</span>
        </p>
        <div class="monitor__status">
          <span class="led"></span>
          <span class="mono" style="font-size:16px">SYSTEMS NOMINAL</span>
        </div>
      </div>
      <div class="monitor__base">
        <span class="led" style="animation-delay:0s"></span>
        <span class="led led--amber" style="animation-delay:0.5s"></span>
        <span class="led" style="animation-delay:1s"></span>
      </div>
    </div>

    <NowPlaying />

    <!-- Rubber duck easter egg -->
    <button class="duck" onclick={clickDuck} aria-label="A rubber duck. Click it." title="quack?">
      <span class="duck__body" aria-hidden="true">🦆</span>
      {#if showDuckMsg}
        <span class="duck__speech">{duckMessage}</span>
      {/if}
    </button>
  </header>

  <!-- ── WORKBENCH SURFACE ─────────────────────── -->
  <section class="bench-surface">
    <div class="bench-surface__grain" aria-hidden="true"></div>

    <!-- Hidden blinking pixel — click it -->
    <a href="/blueprint" class="hidden-pixel" aria-label="Something is here..." title=""></a>

    <!-- Scattered tools / ambient items -->
    <div class="ambient" aria-hidden="true">
      <span class="ambient__item ambient__item--bolt">⬡</span>
      <span class="ambient__item ambient__item--screw">✕</span>
      <span class="ambient__item ambient__item--ring">◎</span>
      <span class="ambient__item ambient__item--chip">▣</span>
    </div>

    <!-- Nav items as physical objects on the bench -->
    <div class="bench-items">
      {#each workbenchItems as item, i}
        <a
          href={item.href}
          class="bench-item pixel-box"
          style="--item-col:{item.col}; animation-delay:{i * 0.1}s"
          aria-label="{item.label} — {item.desc}"
        >
          <div class="bench-item__icon">
            {#if item.icon === 'notebook'}
              {@render NotebookIcon()}
            {:else if item.icon === 'corkboard'}
              {@render CorkboardIcon()}
            {:else if item.icon === 'blueprint'}
              {@render BlueprintIcon()}
            {:else if item.icon === 'dossier'}
              {@render DossierIcon()}
            {/if}
          </div>
          <div class="bench-item__label pixel-stamp" style="color:var(--item-col); border-color:var(--item-col)">
            {item.label}
          </div>
          <div class="bench-item__desc mono">{item.desc}</div>
        </a>
      {/each}
    </div>
  </section>

  <!-- ── RECENT LOG ENTRIES ─────────────────────── -->
  <section class="recent-log container">
    <h2 class="section-title">
      <span class="led led--amber" style="margin-right:10px"></span>
      RECENT LOG ENTRIES
    </h2>
    <div class="log-entries">
      {#if data.recentPosts.length === 0}
        <div class="log-entry pixel-inset">
          <span class="log-entry__date mono">—</span>
          <span class="log-entry__title" style="opacity:0.5;">no entries yet. check back soon.</span>
        </div>
      {:else}
        {#each data.recentPosts as post, i}
          <div class="log-entry pixel-inset">
            <span class="log-entry__date mono">{post.date}</span>
            <a href="/blog/{post.slug}" class="log-entry__title">{post.title}</a>
            {#if i === 0}
              <span class="pixel-stamp stamp--crt" style="font-size:6px;">NEW</span>
            {/if}
          </div>
        {/each}
      {/if}
    </div>
    <a href="/blog" class="btn-pixel" style="margin-top:1.5rem; display:inline-block">
      OPEN LOG BOOK →
    </a>
  </section>

</div>

<!-- ── INLINE PIXEL ART ICON COMPONENTS ───────── -->

{#snippet NotebookIcon()}
  <svg viewBox="0 0 32 32" width="64" height="64" class="pixel-icon" aria-hidden="true">
    <rect x="6"  y="2"  width="20" height="28" fill="var(--col-paper)" />
    <rect x="6"  y="2"  width="4"  height="28" fill="var(--col-paper-dark)" />
    <rect x="10" y="8"  width="12" height="2"  fill="var(--col-ink)" />
    <rect x="10" y="13" width="12" height="2"  fill="var(--col-ink)" />
    <rect x="10" y="18" width="8"  height="2"  fill="var(--col-ink)" />
    <rect x="10" y="23" width="10" height="2"  fill="var(--col-ink)" />
    <rect x="4"  y="8"  width="4"  height="2"  fill="var(--col-amber)" />
    <rect x="4"  y="16" width="4"  height="2"  fill="var(--col-amber)" />
    <rect x="4"  y="22" width="4"  height="2"  fill="var(--col-amber)" />
  </svg>
{/snippet}

{#snippet CorkboardIcon()}
  <svg viewBox="0 0 32 32" width="64" height="64" class="pixel-icon" aria-hidden="true">
    <rect x="2"  y="2"  width="28" height="28" fill="#c87840" />
    <rect x="4"  y="4"  width="24" height="24" fill="#b06030" />
    <!-- pin -->
    <rect x="14" y="6"  width="4"  height="4"  fill="var(--col-red)" />
    <rect x="15" y="10" width="2"  height="6"  fill="#888" />
    <!-- sticky note -->
    <rect x="8"  y="14" width="10" height="8"  fill="#f0e060" />
    <rect x="9"  y="16" width="8"  height="1"  fill="#888" />
    <rect x="9"  y="18" width="6"  height="1"  fill="#888" />
    <!-- pin 2 -->
    <rect x="21" y="10" width="4"  height="4"  fill="var(--col-crt)" />
    <rect x="22" y="14" width="2"  height="5"  fill="#888" />
  </svg>
{/snippet}

{#snippet BlueprintIcon()}
  <svg viewBox="0 0 32 32" width="64" height="64" class="pixel-icon" aria-hidden="true">
    <!-- rolled tube -->
    <rect x="4"  y="12" width="24" height="10" fill="var(--col-blue)" />
    <rect x="4"  y="12" width="24" height="2"  fill="#6090d0" />
    <rect x="4"  y="20" width="24" height="2"  fill="#2050a0" />
    <ellipse cx="4"  cy="17" rx="3" ry="5" fill="#4070b0" />
    <ellipse cx="28" cy="17" rx="3" ry="5" fill="#4070b0" />
    <!-- grid lines -->
    <rect x="8"  y="14" width="16" height="1"  fill="rgba(255,255,255,0.3)" />
    <rect x="8"  y="17" width="16" height="1"  fill="rgba(255,255,255,0.3)" />
    <rect x="14" y="13" width="1"  height="8"  fill="rgba(255,255,255,0.3)" />
    <rect x="18" y="13" width="1"  height="8"  fill="rgba(255,255,255,0.3)" />
  </svg>
{/snippet}

{#snippet DossierIcon()}
  <svg viewBox="0 0 32 32" width="64" height="64" class="pixel-icon" aria-hidden="true">
    <rect x="2"  y="6"  width="28" height="22" fill="#3a5a3a" />
    <rect x="2"  y="6"  width="28" height="3"  fill="#2a4a2a" />
    <rect x="8"  y="4"  width="16" height="4"  fill="#2a4a2a" />
    <rect x="4"  y="10" width="24" height="16" fill="var(--col-paper)" />
    <!-- stamp -->
    <rect x="16" y="18" width="10" height="6"  fill="rgba(200,40,40,0.3)" />
    <rect x="17" y="19" width="8"  height="1"  fill="var(--col-red)" />
    <rect x="17" y="21" width="8"  height="1"  fill="var(--col-red)" />
    <rect x="17" y="23" width="5"  height="1"  fill="var(--col-red)" />
    <!-- person silhouette -->
    <rect x="6"  y="12" width="6"  height="6"  fill="var(--col-paper-dark)" />
    <rect x="7"  y="14" width="4"  height="3"  fill="#c8b090" />
    <rect x="5"  y="18" width="8"  height="5"  fill="var(--col-paper-dark)" />
  </svg>
{/snippet}

<style>
  /* ── WORKBENCH WRAPPER ───────────────────────── */
  .workbench {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* Ceiling light glow — warm purple haze */
  .ceiling-light {
    position: fixed;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 280px;
    background: radial-gradient(ellipse at top, rgba(192,96,200,0.12) 0%, rgba(183,61,110,0.04) 50%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* ── HERO — centered OS screen ───────────────── */
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - var(--nav-h));
    padding: 3rem 2rem;
    position: relative;
  }

  /* CRT monitor — green phosphor screen
     We locally override --col-crt back to phosphor green
     so only this component stays green on the purple UI */
  .hero__monitor {
    --col-crt:      #00ff88;
    --col-crt-dim:  #007a40;
    --col-crt-glow: #80ffbb;

    flex-shrink: 0;
    background: #050f08;
    border: 4px solid #00ff88;
    box-shadow:
      0 0 0 4px #007a40,
      0 0 40px #007a40,
      0 0 80px rgba(0,255,136,0.15),
      8px 8px 0 0 rgba(0,0,0,0.8);
    width: min(480px, 90vw);
  }

  .monitor__screen {
    padding: 2.5rem 3rem;
    position: relative;
    overflow: hidden;
    background: #020d06;
  }

  /* Scanline effect */
  .monitor__scanline {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(0,0,0,0.18) 3px,
      rgba(0,0,0,0.18) 4px
    );
    pointer-events: none;
    z-index: 1;
  }

  .monitor__label {
    font-size: 13px;
    color: #007a40;
    margin-bottom: 1.5rem;
    letter-spacing: 1px;
  }

  .monitor__title {
    font-family: var(--font-pixel);
    font-size: clamp(28px, 6vw, 48px);
    color: #00ff88;
    text-shadow: 0 0 16px #007a40;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    animation: flicker 6s ease-in-out infinite;
  }

  @keyframes flicker {
    0%, 89%, 100% { opacity: 1; }
    90% { opacity: 0.7; }
    91% { opacity: 1; }
    92% { opacity: 0.3; }
    93% { opacity: 1; }
  }

  .monitor__sub {
    font-size: 22px;
    color: #00ff88;
    opacity: 0.8;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  .monitor__status {
    display: flex;
    align-items: center;
    gap: 8px;
    opacity: 0.65;
  }

  .monitor__status .mono {
    color: #00ff88;
    font-size: 18px;
  }

  .monitor__base {
    height: 20px;
    background: #0a1a0a;
    border-top: 4px solid #007a40;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    /* keep LEDs green inside the monitor */
    --col-crt: #00ff88;
  }

  /* Duck floats below the monitor */

  /* ── DUCK ────────────────────────────────────── */
  .duck {
    background: none;
    border: none;
    cursor: pointer;
    position: relative;
    font-size: 40px;
    padding: 8px;
    animation: float 3s ease-in-out infinite;
    transition: transform 0.1s;
    margin-top: 1.5rem;
  }

  .duck:hover { transform: scale(1.1) rotate(-5deg); }
  .duck:active { transform: scale(0.9); }

  .duck__speech {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--col-paper);
    color: var(--col-ink);
    font-family: var(--font-pixel);
    font-size: 7px;
    padding: 6px 10px;
    white-space: nowrap;
    border: 2px solid var(--col-ink);
    box-shadow: 3px 3px 0 0 rgba(0,0,0,0.5);
    pointer-events: none;
    animation: popIn 0.15s ease-out;
  }

  .duck__speech::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: var(--col-ink);
  }

  @keyframes popIn {
    from { transform: translateX(-50%) scale(0.7); opacity: 0; }
    to   { transform: translateX(-50%) scale(1);   opacity: 1; }
  }

  /* Hidden pixel — blinks once every 8s, almost invisible */
  .hidden-pixel {
    position: absolute;
    bottom: 18%;
    right: 12%;
    width: 3px;
    height: 3px;
    background: var(--col-neon);
    display: block;
    animation: hidden-blink 8s step-end infinite;
    z-index: 2;
    cursor: crosshair;
  }

  @keyframes hidden-blink {
    0%, 97%, 100% { opacity: 0; }
    98% { opacity: 1; }
  }

  .hidden-pixel:hover {
    opacity: 1 !important;
    box-shadow: 0 0 6px 2px var(--col-neon);
    animation: none;
  }

  /* ── BENCH SURFACE ───────────────────────────── */
  .bench-surface {
    background: var(--col-wood-mid);
    border-top: 4px solid var(--col-pixel-border);
    border-bottom: 4px solid rgba(0,0,0,0.4);
    padding: 3rem 2rem;
    position: relative;
    overflow: hidden;
  }

  /* Wood grain — CSS only */
  .bench-surface__grain {
    position: absolute;
    inset: 0;
    background-image:
      repeating-linear-gradient(
        87deg,
        transparent 0px,
        transparent 18px,
        rgba(0,0,0,0.04) 18px,
        rgba(0,0,0,0.04) 19px
      ),
      repeating-linear-gradient(
        92deg,
        transparent 0px,
        transparent 40px,
        rgba(0,0,0,0.03) 40px,
        rgba(0,0,0,0.03) 41px
      );
    pointer-events: none;
  }

  /* Scattered ambient workshop items */
  .ambient {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .ambient__item {
    position: absolute;
    font-size: 14px;
    opacity: 0.15;
    color: var(--col-crt-dim);
    font-family: monospace;
  }

  .ambient__item--bolt  { top: 15%; left: 5%;  transform: rotate(30deg); }
  .ambient__item--screw { top: 70%; left: 8%;  transform: rotate(-15deg); }
  .ambient__item--ring  { top: 20%; right: 6%; }
  .ambient__item--chip  { top: 60%; right: 5%; transform: rotate(45deg); }

  /* Main bench items grid */
  .bench-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .bench-item {
    background: var(--col-bench);
    padding: 1.5rem;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    transition: transform 0.12s ease, box-shadow 0.12s ease;
    border: 2px solid var(--col-pixel-border);
    box-shadow:
      4px 4px 0 0 rgba(0,0,0,0.6),
      inset 1px 1px 0 0 rgba(255,255,255,0.04);
  }

  .bench-item:hover {
    transform: translate(-2px, -2px);
    box-shadow:
      6px 6px 0 0 rgba(0,0,0,0.6),
      inset 1px 1px 0 0 rgba(255,255,255,0.04),
      0 0 18px rgba(0,255,136,0.2);
    border-color: var(--col-neon);
  }

  .bench-item:hover .bench-item__label {
    color: var(--col-neon) !important;
    border-color: var(--col-neon) !important;
    text-shadow: 0 0 8px rgba(0,255,136,0.5);
  }

  .bench-item:hover .bench-item__desc {
    color: var(--col-neon);
    opacity: 0.85;
  }

  .bench-item:active {
    transform: translate(1px, 1px);
    box-shadow: 2px 2px 0 0 rgba(0,0,0,0.6);
  }

  .bench-item__label {
    font-size: 7px;
    letter-spacing: 1px;
  }

  .bench-item__desc {
    font-size: 17px;
    color: var(--col-paper-dark);
    text-align: center;
    opacity: 0.7;
  }

  .pixel-icon {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }

  /* ── RECENT LOG ──────────────────────────────── */
  .recent-log {
    padding: 3rem 1.5rem;
  }

  .section-title {
    font-size: 11px;
    color: var(--col-crt);
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .log-entries {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .log-entry {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
    flex-wrap: wrap;
  }

  .log-entry__date {
    font-size: 16px;
    color: var(--col-paper-dark);
    flex-shrink: 0;
  }

  .log-entry__title {
    flex: 1;
    font-family: var(--font-body);
    font-size: 1.1rem;
    color: var(--col-paper);
    min-width: 180px;
  }

  .log-entry__title:hover {
    color: var(--col-neon);
    text-shadow: 0 0 8px rgba(0,255,136,0.4);
  }

  @media (max-width: 600px) {
    .hero { flex-direction: column; align-items: center; }
    .bench-items { grid-template-columns: 1fr 1fr; gap: 1rem; }
  }
</style>
