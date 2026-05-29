<script lang="ts">
  import { onMount } from 'svelte';
  import { collect } from '$lib/inventory';
  onMount(() => collect('dossier'));
  let pinColors = ['var(--col-red)', 'var(--col-crt)', 'var(--col-amber)', 'var(--col-blue)'];
</script>

<svelte:head>
  <title>Who? — Senor Gatos</title>
</svelte:head>

<div class="corkboard-wrapper container" style="padding-top:3rem; padding-bottom:4rem;">

  <div class="corkboard pixel-box">
    <div class="corkboard__texture" aria-hidden="true"></div>

    <!-- Dossier card -->
    <div class="dossier" style="--pin:{pinColors[0]}">
      <div class="dossier__pin" aria-hidden="true"></div>
      <div class="dossier__header">
        <span class="pixel-stamp stamp--red" style="font-size:7px">CLASSIFIED</span>
        <h1>SUBJECT: SENOR GATOS</h1>
      </div>

      <div class="dossier__photo-row">
        <!-- pixel art placeholder portrait -->
        <div class="dossier__photo" aria-label="A pixelated portrait">
          <svg viewBox="0 0 32 40" width="96" height="120" aria-hidden="true" style="image-rendering:pixelated;">
            <!-- head -->
            <rect x="8"  y="2"  width="16" height="16" fill="#c8a070" />
            <!-- eyes -->
            <rect x="10" y="8"  width="4"  height="4"  fill="#3a2010" />
            <rect x="18" y="8"  width="4"  height="4"  fill="#3a2010" />
            <!-- nose -->
            <rect x="14" y="12" width="4"  height="2"  fill="#b08050" />
            <!-- mouth -->
            <rect x="11" y="15" width="10" height="2"  fill="#3a2010" />
            <!-- hair -->
            <rect x="8"  y="2"  width="16" height="4"  fill="#3a2010" />
            <rect x="6"  y="4"  width="20" height="2"  fill="#3a2010" />
            <!-- neck -->
            <rect x="13" y="18" width="6"  height="4"  fill="#c8a070" />
            <!-- shoulders / shirt -->
            <rect x="4"  y="22" width="24" height="14" fill="#304060" />
            <rect x="12" y="22" width="8"  height="4"  fill="#c8a070" />
            <!-- cat ears (because why not) -->
            <rect x="6"  y="0"  width="4"  height="4"  fill="#3a2010" />
            <rect x="22" y="0"  width="4"  height="4"  fill="#3a2010" />
          </svg>
        </div>

        <div class="dossier__bio">
          <div class="dossier__field">
            <span class="dossier__label mono">ALIAS</span>
            <span class="dossier__value">Senor Gatos</span>
          </div>
          <div class="dossier__field">
            <span class="dossier__label mono">LOCATION</span>
            <span class="dossier__value">The Basement</span>
          </div>
          <div class="dossier__field">
            <span class="dossier__label mono">OCCUPATION</span>
            <span class="dossier__value">Basement Artificer & Way Too Distracted Engineer</span>
          </div>
          <div class="dossier__field">
            <span class="dossier__label mono">CONTACT</span>
            <span class="dossier__value">
              <a href="mailto:your@email.com" style="color:var(--col-crt);">your@email.com</a>
            </span>
          </div>
          <div class="dossier__field">
            <span class="dossier__label mono">STATUS</span>
            <span class="dossier__value" style="color:var(--col-crt)">
              <span class="led" style="margin-right:6px"></span>PROBABLY FINE
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- About note card -->
    <div class="note-card note-card--yellow" style="--pin:{pinColors[2]}">
      <div class="note-card__pin" aria-hidden="true"></div>
      <h2>The Deal</h2>
      <p>
        Hi. I'm a person who makes things and thinks about things and then makes a website about those things.
        I like science fiction, nerding out about electronics, the general concept of space, and asking
        "what if we made it weirder."
      </p>
      <p>
        This site is my public workbench — an ongoing, never-finished, always-slightly-broken project
        that I nerd out on in my spare time.
      </p>
    </div>

    <!-- Interests card -->
    <div class="note-card note-card--blue" style="--pin:{pinColors[1]}">
      <div class="note-card__pin" aria-hidden="true"></div>
      <h2>Interests</h2>
      <ul class="interest-list">
        <li>🚀 Space & astronomy</li>
        <li>📖 Sci-fi literature</li>
        <li>⚡ Electronics & microcontrollers</li>
        <li>🕹️ Game development (perpetually)</li>
        <li>🐱 Cats (obviously)</li>
        <li>🔧 Making things break in interesting ways</li>
      </ul>
    </div>

    <!-- Find me elsewhere card -->
    <div class="note-card note-card--green" style="--pin:{pinColors[3]}">
      <div class="note-card__pin" aria-hidden="true"></div>
      <h2>Find me elsewhere</h2>
      <ul class="social-list">
        <li>
          <a href="https://github.com/SenorGatos" target="_blank" rel="noopener noreferrer" class="social-item social-item--github">
            <span class="social-item__label">GITHUB</span>
            <span class="social-item__handle">github.com/SenorGatos</span>
          </a>
        </li>
        <li>
          <a href="https://discord.gg/yourinvite" target="_blank" rel="noopener noreferrer" class="social-item social-item--discord">
            <span class="social-item__label">DISCORD</span>
            <span class="social-item__handle">discord.gg/yourinvite</span>
          </a>
        </li>
        <li>
          <a href="https://twitch.tv/yourname" target="_blank" rel="noopener noreferrer" class="social-item social-item--twitch">
            <span class="social-item__label">TWITCH</span>
            <span class="social-item__handle">twitch.tv/yourname</span>
          </a>
        </li>
        <li>
          <a href="https://bsky.app/profile/yourname.bsky.social" target="_blank" rel="noopener noreferrer" class="social-item social-item--bluesky">
            <span class="social-item__label">BLUESKY</span>
            <span class="social-item__handle">@yourname.bsky.social</span>
          </a>
        </li>
        <li>
          <a href="https://letterboxd.com/yourname" target="_blank" rel="noopener noreferrer" class="social-item social-item--letterboxd">
            <span class="social-item__label">LETTERBOXD</span>
            <span class="social-item__handle">letterboxd.com/yourname</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- Uses / setup link -->
    <a href="/uses" class="uses-card" style="--pin:{pinColors[0]}">
      <div class="uses-card__pin" aria-hidden="true"></div>
      <h2>The Setup</h2>
      <p>Hardware, software, home lab, and bench tools — what's actually on the desk.</p>
      <span class="uses-card__cta mono">view uses →</span>
    </a>

    <!-- Red-string note -->
    <div class="redstring-note" aria-hidden="true">
      <span class="mono" style="font-size:14px; color:var(--col-red); transform:rotate(-3deg); display:block;">
        ??? connects to ???
      </span>
    </div>

  </div>
</div>

<style>
  .corkboard-wrapper {
    max-width: 1000px;
  }

  .corkboard {
    background: #b06830;
    padding: 3rem 2.5rem;
    position: relative;
    border: 8px solid var(--col-wood-light);
    box-shadow:
      0 0 0 4px var(--col-pixel-border),
      12px 12px 0 0 rgba(0,0,0,0.5);
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: flex-start;
  }

  /* Cork texture */
  .corkboard__texture {
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 20% 30%, rgba(0,0,0,0.06) 2px, transparent 2px),
      radial-gradient(circle at 60% 70%, rgba(0,0,0,0.05) 3px, transparent 3px),
      radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04) 2px, transparent 2px),
      radial-gradient(circle at 40% 80%, rgba(0,0,0,0.04) 2px, transparent 2px);
    background-size: 40px 40px, 60px 60px, 50px 50px, 35px 35px;
    pointer-events: none;
  }

  /* Dossier */
  .dossier {
    background: var(--col-paper);
    padding: 1.5rem;
    border: 2px solid var(--col-paper-dark);
    box-shadow: 4px 4px 0 0 rgba(0,0,0,0.4);
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 560px;
  }

  .dossier__pin,
  .note-card__pin {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 16px;
    background: var(--pin);
    border: 2px solid rgba(0,0,0,0.3);
    box-shadow: 1px 2px 3px rgba(0,0,0,0.4);
    z-index: 2;
  }

  .dossier__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--col-paper-dark);
  }

  .dossier__header h1 {
    font-size: 9px;
    color: var(--col-ink);
  }

  .dossier__photo-row {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
  }

  .dossier__photo {
    border: 3px solid var(--col-ink);
    background: var(--col-paper-dark);
    flex-shrink: 0;
    overflow: hidden;
    image-rendering: pixelated;
  }

  .dossier__bio {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .dossier__field {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .dossier__label {
    font-size: 11px;
    color: var(--col-amber-dim);
  }

  .dossier__value {
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--col-ink);
    display: flex;
    align-items: center;
  }

  /* Note cards */
  .note-card {
    padding: 1.25rem 1.5rem;
    border: 2px solid rgba(0,0,0,0.15);
    box-shadow: 4px 4px 0 0 rgba(0,0,0,0.3);
    position: relative;
    z-index: 1;
    max-width: 300px;
    transform: rotate(-1.5deg);
  }

  .note-card:nth-child(even) {
    transform: rotate(1deg);
  }

  .note-card--yellow {
    background: #f5e840;
    color: var(--col-ink);
  }

  .note-card--blue {
    background: #d0e8f8;
    color: var(--col-ink);
  }

  .note-card--green {
    background: #d8f5e0;
    color: var(--col-ink);
    transform: rotate(2deg);
  }

  .social-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .social-item {
    display: flex;
    flex-direction: column;
    gap: 1px;
    text-decoration: none;
    padding: 6px 8px;
    border: 2px solid transparent;
    transition: border-color 0.15s, background 0.15s;
  }

  .social-item__label {
    font-family: var(--font-pixel);
    font-size: 7px;
    letter-spacing: 0.5px;
  }

  .social-item__handle {
    font-family: var(--font-mono);
    font-size: 16px;
    color: #2a1a0a;
    opacity: 0.7;
  }

  .social-item--github      .social-item__label { color: #333; }
  .social-item--discord     .social-item__label { color: #5865f2; }
  .social-item--twitch      .social-item__label { color: #6441a5; }
  .social-item--bluesky     .social-item__label { color: #0085ff; }
  .social-item--letterboxd  .social-item__label { color: #1a8740; }

  .social-item--github:hover     { border-color: #333;    background: rgba(0,0,0,0.06); }
  .social-item--discord:hover    { border-color: #5865f2; background: rgba(88,101,242,0.08); }
  .social-item--twitch:hover     { border-color: #6441a5; background: rgba(100,65,165,0.08); }
  .social-item--bluesky:hover    { border-color: #0085ff; background: rgba(0,133,255,0.08); }
  .social-item--letterboxd:hover { border-color: #1a8740; background: rgba(26,135,64,0.08); }

  .note-card h2 {
    font-size: 9px;
    color: var(--col-ink);
    margin-bottom: 0.75rem;
  }

  .note-card p {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: #2a1a0a;
    margin-bottom: 0.75rem;
  }

  /* Uses card — orange sticky note */
  .uses-card {
    background: #ffd090;
    color: var(--col-ink);
    padding: 1.25rem 1.5rem;
    border: 2px solid rgba(0,0,0,0.15);
    box-shadow: 4px 4px 0 rgba(0,0,0,0.3);
    position: relative;
    z-index: 1;
    max-width: 220px;
    transform: rotate(-1deg);
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: transform 0.15s, box-shadow 0.15s;
  }

  .uses-card:hover {
    transform: rotate(0deg) translateY(-3px);
    box-shadow: 6px 6px 0 rgba(0,0,0,0.3);
  }

  .uses-card__pin {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 16px;
    background: var(--pin);
    border: 2px solid rgba(0,0,0,0.3);
    box-shadow: 1px 2px 3px rgba(0,0,0,0.4);
  }

  .uses-card h2 {
    font-size: 9px;
    color: var(--col-ink);
    margin: 0;
  }

  .uses-card p {
    font-family: var(--font-body);
    font-size: 0.85rem;
    color: #3a2010;
    margin: 0;
    line-height: 1.5;
  }

  .uses-card__cta {
    font-size: 13px;
    color: #8a5010;
    margin-top: 0.25rem;
  }

  .uses-card:hover .uses-card__cta { color: #3a1a08; }

  .note-card p:last-child { margin-bottom: 0; }

  .interest-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: #2a1a0a;
  }

  .redstring-note {
    position: relative;
    z-index: 0;
    align-self: flex-end;
    opacity: 0.5;
    transform: rotate(3deg);
  }

  @media (max-width: 700px) {
    .dossier__photo-row { flex-direction: column; }
    .note-card { max-width: 100%; }
  }
</style>
