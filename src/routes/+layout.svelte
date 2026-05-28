<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import EasterEggs from '$lib/components/EasterEggs.svelte';
  import BookshelfCorner from '$lib/components/BookshelfCorner.svelte';

  let { children } = $props();
  let catDeg    = $state(0);
  let morseOn   = $state(true);
  let catHungry = $state(false);
  let footerClicks = $state(0);
  let footerSecret = $state(false);
  let footerTimer: ReturnType<typeof setTimeout>;
  let afterHours = $state(false);

  function spinCat(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    catDeg += 90;
  }

  function clickFooter() {
    footerClicks++;
    clearTimeout(footerTimer);
    if (footerClicks >= 5) {
      footerSecret = true;
      footerClicks = 0;
    } else {
      footerTimer = setTimeout(() => { footerClicks = 0; }, 1200);
    }
  }

  // Morse code for MEOW: M=-- E=. O=--- W=.--
  // Timing unit = 140ms. 1=dot, 3=dash, gap=1u, letter=3u, word=7u
  const U = 140;
  const MORSE_SEQ: [number, boolean][] = [
    // M (--)
    [3*U,true],[1*U,false],[3*U,true],[3*U,false],
    // E (.)
    [1*U,true],[3*U,false],
    // O (---)
    [3*U,true],[1*U,false],[3*U,true],[1*U,false],[3*U,true],[3*U,false],
    // W (.--)
    [1*U,true],[1*U,false],[3*U,true],[1*U,false],[3*U,true],[7*U,false],
  ];

  onMount(() => {
    // Morse LED driver
    let i = 0;
    function morseStep() {
      const [dur, on] = MORSE_SEQ[i];
      morseOn = on;
      i = (i + 1) % MORSE_SEQ.length;
      setTimeout(morseStep, dur);
    }
    morseStep();

    // Hunger meter — if last visit was >3 days ago, cat is sad
    const last = localStorage.getItem('sg_lastVisit');
    const now = Date.now();
    if (last && now - parseInt(last) > 3 * 24 * 60 * 60 * 1000) {
      catHungry = true;
    }
    localStorage.setItem('sg_lastVisit', String(now));

    // After-hours status text
    const h = new Date().getHours();
    afterHours = h >= 23 || h < 4;
  });

  const navItems = [
    { href: '/',          label: 'Workshop' },
    { href: '/blog',      label: 'Log Book' },
    { href: '/projects',  label: 'Builds' },
    { href: '/hobbies',   label: 'Hobbies' },
    { href: '/media',     label: 'Media' },
    { href: '/now',       label: 'Now' },
    { href: '/about',     label: 'Who?' },
  ];
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <!-- RSS autodiscovery -->
  <link rel="alternate" type="application/rss+xml" title="Senor Gatos — Workshop Log" href="/rss.xml" />
  <!-- Default OG / social meta — individual pages override these -->
  <meta property="og:site_name"   content="Senor Gatos" />
  <meta property="og:type"        content="website" />
  <meta property="og:title"       content="Senor Gatos — The Workshop" />
  <meta property="og:description" content="Basement engineer. Maker of things." />
  <meta property="og:image"       content="https://senorgatos.com/og-default.png" />
  <meta name="twitter:card"       content="summary_large_image" />
  <meta name="twitter:title"      content="Senor Gatos — The Workshop" />
  <meta name="twitter:description" content="Basement engineer. Maker of things." />
</svelte:head>

<nav class="nav">
  <div class="nav__inner">
    <a href="/" class="nav__logo" aria-label="Senor Gatos home">
      <!-- Pixel cat with top hat — SVG, each rect = 3px pixel -->
      <svg
        class="cat-sprite"
        viewBox="0 0 42 39"
        width="42" height="39"
        aria-hidden="true"
        role="img"
        title="click me"
        onclick={spinCat}
        style="image-rendering:pixelated; overflow:visible; transform:rotate({catDeg}deg); transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1); cursor:pointer; transform-origin:center;"
      >
        <!-- Top hat (amber) -->
        <rect x="15" y="0"  width="12" height="3"  fill="#F19406"/>
        <rect x="15" y="3"  width="12" height="3"  fill="#F19406"/>
        <rect x="9"  y="6"  width="24" height="3"  fill="#F19406"/>
        <rect x="15" y="9"  width="12" height="3"  fill="#F19406"/>
        <!-- Left ear / Right ear (magenta-purple) -->
        <rect x="6"  y="9"  width="6"  height="6"  fill="#c060c8"/>
        <rect x="30" y="9"  width="6"  height="6"  fill="#c060c8"/>
        <!-- Head (magenta-purple) -->
        <rect x="6"  y="12" width="30" height="18" fill="#c060c8"/>
        <!-- Eyes — sad droopy when hungry -->
        {#if catHungry}
          <!-- sad half-closed eyes -->
          <rect x="12" y="21" width="6" height="3" fill="#110830"/>
          <rect x="24" y="21" width="6" height="3" fill="#110830"/>
          <!-- sad brow lines -->
          <rect x="11" y="18" width="8" height="2" fill="#7030a0"/>
          <rect x="23" y="18" width="8" height="2" fill="#7030a0"/>
          <!-- tear drop -->
          <rect x="15" y="24" width="2" height="3" fill="#4488ff" opacity="0.8"/>
        {:else}
          <rect x="12" y="18" width="6" height="6" fill="#110830"/>
          <rect x="24" y="18" width="6" height="6" fill="#110830"/>
        {/if}
        <!-- Nose -->
        <rect x="18" y="24" width="6"  height="3"  fill="#7030a0"/>
        <!-- Mouth — frown when hungry, smile otherwise -->
        {#if catHungry}
          <rect x="13" y="30" width="3" height="3" fill="#7030a0"/>
          <rect x="16" y="27" width="10" height="3" fill="#7030a0"/>
          <rect x="26" y="30" width="3" height="3" fill="#7030a0"/>
        {:else}
          <rect x="12" y="27" width="3"  height="3"  fill="#7030a0"/>
          <rect x="27" y="27" width="3"  height="3"  fill="#7030a0"/>
        {/if}
        <!-- Chin -->
        <rect x="9"  y="27" width="24" height="3"  fill="#c060c8"/>
        <!-- Whiskers left -->
        <rect x="0"  y="21" width="9"  height="2"  fill="#e090e8" opacity="0.7"/>
        <rect x="0"  y="25" width="9"  height="2"  fill="#e090e8" opacity="0.7"/>
        <!-- Whiskers right -->
        <rect x="33" y="21" width="9"  height="2"  fill="#e090e8" opacity="0.7"/>
        <rect x="33" y="25" width="9"  height="2"  fill="#e090e8" opacity="0.7"/>
      </svg>
      <span class="nav__logo-text">SENOR GATOS</span>
      <!-- Morse LED — spells MEOW in morse code -->
      <span
        class="morse-led"
        title="it's morse code"
        style="opacity:{morseOn ? 1 : 0.05};"
        aria-hidden="true"
      ></span>
    </a>

    <ul class="nav__links">
      {#each navItems as item}
        <li>
          <a
            href={item.href}
            class="nav__link"
            class:nav__link--active={page.url.pathname === item.href ||
              (item.href !== '/' && page.url.pathname.startsWith(item.href))}
          >
            {item.label}
          </a>
        </li>
      {/each}
    </ul>

    <div class="nav__status">
      <span class="led led--amber" style="animation-delay:0.7s"></span>
      <span class="mono" style="font-size:18px; color: var(--col-paper-dark)">
        STATUS: {afterHours ? 'SHOULD BE SLEEPING' : 'VIBING'}
      </span>
    </div>
  </div>
</nav>

<main class="page-wrapper">
  {@render children()}
</main>

<footer class="footer">
  <div class="footer__inner">
    <button class="footer-text mono" onclick={clickFooter} aria-label="Footer text">
      {#if footerSecret}
        <span style="color:var(--col-neon); text-shadow:0 0 8px rgba(0,255,136,0.5);">
          psst. try /blueprint, /sudo, /the-void, /inventory
        </span>
      {:else}
        &copy; {new Date().getFullYear()} SENOR GATOS — MADE IN THE BASEMENT
      {/if}
    </button>

    <nav class="social-links" aria-label="Social media links">
      <a href="https://github.com/SenorGatos"            class="social-link social-link--github"     target="_blank" rel="noopener noreferrer">GITHUB</a>
      <a href="https://discord.gg/yourinvite"            class="social-link social-link--discord"    target="_blank" rel="noopener noreferrer">DISCORD</a>
      <a href="https://twitch.tv/yourname"               class="social-link social-link--twitch"     target="_blank" rel="noopener noreferrer">TWITCH</a>
      <a href="https://bsky.app/profile/yourname.bsky.social" class="social-link social-link--bluesky" target="_blank" rel="noopener noreferrer">BLUESKY</a>
      <a href="https://letterboxd.com/yourname"          class="social-link social-link--letterboxd" target="_blank" rel="noopener noreferrer">LBXD</a>
    </nav>

    <span class="footer__leds">
      <span class="led led--blue" style="animation-delay:0s"></span>
      <span class="led led--blue" style="animation-delay:0.25s"></span>
      <span class="led led--blue" style="animation-delay:0.5s"></span>
    </span>
  </div>
</footer>

<EasterEggs />

{#if page.url.pathname !== '/'}
  <BookshelfCorner />
{/if}

<style>
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    height: var(--nav-h);
    background: var(--col-wood-mid);
    border-bottom: 4px solid var(--col-pixel-border);
    box-shadow: 0 4px 0 0 rgba(0,0,0,0.4);
  }

  .nav__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav__logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    flex-shrink: 0;
  }

  .nav__logo-text {
    font-family: var(--font-pixel);
    font-size: 10px;
    color: var(--col-crt);
    letter-spacing: 1px;
    text-shadow: 0 0 8px var(--col-crt-dim);
  }

  .nav__logo:hover .nav__logo-text {
    color: var(--col-neon);
    text-shadow: 0 0 12px rgba(0,255,136,0.6);
  }

  .cat-sprite {
    display: block;
    flex-shrink: 0;
    /* slight vertical centering within nav */
    margin-top: 4px;
  }

  .nav__links {
    list-style: none;
    display: flex;
    gap: 0.25rem;
    flex: 1;
  }

  .nav__link {
    font-family: var(--font-pixel);
    font-size: 8px;
    color: var(--col-paper-dark);
    text-decoration: none;
    padding: 6px 10px;
    border: 2px solid transparent;
    letter-spacing: 0.5px;
    transition: color 0.1s, border-color 0.1s;
    white-space: nowrap;
  }

  .nav__link:hover {
    color: var(--col-neon);
    border-color: var(--col-neon);
    background: rgba(0, 255, 136, 0.08);
    text-shadow: 0 0 8px rgba(0,255,136,0.5);
  }

  :global(.nav__link--active) {
    color: var(--col-neon);
    border-color: var(--col-neon-dim);
    background: rgba(0, 255, 136, 0.06);
  }

  .nav__status {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
    opacity: 0.7;
  }

  .footer {
    background: var(--col-wood-mid);
    border-top: 4px solid var(--col-pixel-border);
    padding: 1rem 1.5rem;
  }

  .footer__inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .footer__leds {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  /* Morse code LED */
  .morse-led {
    width: 8px;
    height: 8px;
    background: var(--col-neon);
    display: inline-block;
    flex-shrink: 0;
    margin-left: 8px;
    box-shadow: 0 0 6px 2px var(--col-neon-dim);
    transition: opacity 0.05s linear;
  }

  /* Social links */
  .social-links {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .social-link {
    font-family: var(--font-pixel);
    font-size: 7px;
    padding: 5px 8px;
    border: 2px solid var(--col-pixel-border);
    text-decoration: none;
    color: var(--col-paper-dark);
    letter-spacing: 0.5px;
    transition: color 0.15s, border-color 0.15s, box-shadow 0.15s, text-shadow 0.15s;
  }

  .social-link:hover {
    text-shadow: none;
  }

  .social-link--github:hover {
    color: var(--col-paper);
    border-color: var(--col-paper);
    box-shadow: 0 0 8px rgba(240,224,255,0.3);
  }

  .social-link--discord:hover {
    color: #5865f2;
    border-color: #5865f2;
    box-shadow: 0 0 8px rgba(88,101,242,0.3);
  }

  .social-link--twitch:hover {
    color: #bf94ff;
    border-color: #bf94ff;
    box-shadow: 0 0 8px rgba(191,148,255,0.3);
  }

  .social-link--bluesky:hover {
    color: #0085ff;
    border-color: #0085ff;
    box-shadow: 0 0 8px rgba(0,133,255,0.3);
  }

  .social-link--letterboxd:hover {
    color: #00c030;
    border-color: #00c030;
    box-shadow: 0 0 8px rgba(0,192,48,0.3);
  }

  /* Clickable footer text */
  .footer-text {
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 20px;
    color: var(--col-paper-dark);
    padding: 0;
    text-align: left;
    transition: color 0.2s;
  }
  .footer-text:hover { color: var(--col-paper); }

  @media (max-width: 700px) {
    .nav__status { display: none; }
    .nav__link { font-size: 7px; padding: 6px 7px; }
    .nav__logo-text { font-size: 8px; }
  }
</style>
