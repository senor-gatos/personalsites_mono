<script lang="ts">
  import { onMount } from 'svelte';

  // ── KONAMI ─────────────────────────────────────
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiSeq: string[] = [];
  let konamiActive = $state(false);

  // ── TERMINAL ───────────────────────────────────
  let termOpen = $state(false);
  let termInput = $state('');
  let termHistory = $state<{ text: string; type?: 'input'|'error'|'success'|'dim' }[]>([
    { text: 'Workshop Terminal v1.0 — type `help` for commands', type: 'dim' },
    { text: '' },
  ]);
  let termEl = $state<HTMLInputElement | undefined>(undefined);

  // ── SCREENSAVER ────────────────────────────────
  let ssActive = $state(false);
  let ssX  = $state(60);
  let ssY  = $state(60);
  let ssDX = $state(1.4);
  let ssDY = $state(1.1);
  let ssBg = $state('#180f3a');
  let ssFrame: ReturnType<typeof requestAnimationFrame>;
  let idleTimer: ReturnType<typeof setTimeout>;

  const SS_COLORS = [
    '#180f3a', '#241965', '#653993', '#9F4094',
    '#B73D6E', '#c060c8', '#F19406', '#007a40',
    '#0a1628', '#1a2840', '#303048', '#2a1a3a',
  ];

  // ── AFTER-HOURS ────────────────────────────────
  let afterHours = $state(false);

  const ASCII_CAT = `
 /\\_/\\
( o.o )
 > ^ <  `;

  const CONSOLE_BANNER = `%c
 /\\_/\\        SENOR GATOS — THE WORKSHOP
( o.o )       senorgatos.com
 > ^ <
  |||         Type help() in the console for workshop commands.
  |||         Or don't. The cat doesn't care.
`;

  function resetIdle() {
    clearTimeout(idleTimer);
    if (ssActive) return;
    idleTimer = setTimeout(() => { ssActive = true; startSS(); }, 180000);
  }

  function nextSsColor() {
    const others = SS_COLORS.filter(c => c !== ssBg);
    ssBg = others[Math.floor(Math.random() * others.length)];
  }

  function startSS() {
    function frame() {
      ssX += ssDX;
      ssY += ssDY;
      const maxX = window.innerWidth  - 80;
      const maxY = window.innerHeight - 80;
      let bounced = false;
      if (ssX <= 0 || ssX >= maxX) { ssDX *= -1; bounced = true; }
      if (ssY <= 0 || ssY >= maxY) { ssDY *= -1; bounced = true; }
      if (bounced) nextSsColor();
      ssX = Math.max(0, Math.min(ssX, maxX));
      ssY = Math.max(0, Math.min(ssY, maxY));
      ssFrame = requestAnimationFrame(frame);
    }
    ssFrame = requestAnimationFrame(frame);
  }

  function dismissSS() {
    ssActive = false;
    cancelAnimationFrame(ssFrame);
    resetIdle();
  }

  function termRun(cmd: string) {
    const c = cmd.trim().toLowerCase();
    termHistory = [...termHistory, { text: `$ ${cmd}`, type: 'input' }];

    const responses: Record<string, () => void> = {
      help: () => {
        termHistory = [...termHistory,
          { text: 'Available commands:', type: 'dim' },
          { text: '  ls          list workshop files' },
          { text: '  cat [file]  read a file' },
          { text: '  pwd         current location' },
          { text: '  whoami      who are you, anyway' },
          { text: '  uname       system info' },
          { text: '  date        current timestamp' },
          { text: '  ping void   attempt contact with the void' },
          { text: '  meow        important command' },
          { text: '  clear       clear terminal' },
          { text: '  exit        close terminal' },
        ];
      },
      ls: () => {
        termHistory = [...termHistory,
          { text: 'workshop.log    secrets.txt    cat.gif    the-void.log    inventory.db' },
          { text: 'blueprint.pdf   .hidden_things  README.md  [REDACTED]' },
        ];
      },
      pwd: () => termHistory = [...termHistory, { text: '/home/senorgatos/workshop/basement' }],
      whoami: () => termHistory = [...termHistory, { text: 'senorgatos (basement tier)' }],
      uname: () => termHistory = [...termHistory, { text: 'Workshop OS v2.4.1 (Basement Edition) — all rights reserved, mostly' }],
      date: () => termHistory = [...termHistory, { text: new Date().toString() }],
      meow: () => termHistory = [...termHistory, { text: ASCII_CAT, type: 'success' }],
      clear: () => termHistory = [{ text: 'Workshop Terminal v1.0', type: 'dim' }, { text: '' }],
      exit: () => { termOpen = false; },
      'ping void': () => {
        termHistory = [...termHistory, { text: 'PING the-void (0.0.0.0): 56 bytes' }];
        [1,2,3].forEach((i) => setTimeout(() => {
          termHistory = [...termHistory, { text: `Request timeout for icmp_seq ${i}`, type: 'dim' }];
          if (i === 3) setTimeout(() => {
            termHistory = [...termHistory, { text: '64 bytes from 0.0.0.0: icmp_seq=4 ttl=1 time=∞ ms', type: 'success' }];
            termHistory = [...termHistory, { text: '  → it heard you', type: 'dim' }];
          }, 1400);
        }, i * 800));
      },
    };

    // cat [file]
    if (c.startsWith('cat ')) {
      const file = c.slice(4).trim();
      const files: Record<string, string[]> = {
        'secrets.txt':   ['nice try.', '', '...', '', '(or is it?)'],
        'the-void.log':  ['[connection established]', 'hello.', '...', 'you should visit /the-void sometime.', '[connection lost]'],
        'cat.gif':       [ASCII_CAT, '(it\'s just a cat)'],
        'readme.md':     ['# Workshop', 'you are already inside it.', 'that\'s the whole readme.'],
        'inventory.db':  ['try /inventory instead of poking around the filesystem'],
        'blueprint.pdf': ['access denied. try /blueprint.', 'the redactions are load-bearing.'],
      };
      const content = files[file];
      if (content) {
        termHistory = [...termHistory, ...content.map(t => ({ text: t }))];
      } else {
        termHistory = [...termHistory, { text: `cat: ${file}: No such file or directory`, type: 'error' }];
      }
    } else if (c.startsWith('sudo')) {
      termHistory = [...termHistory,
        { text: 'bash: sudo: command not found', type: 'error' },
        { text: '...or is it?', type: 'dim' },
        { text: 'try /sudo', type: 'dim' },
      ];
    } else if (responses[c]) {
      responses[c]();
    } else if (c === '') {
      termHistory = [...termHistory, { text: '' }];
    } else {
      termHistory = [...termHistory, { text: `bash: ${cmd}: command not found`, type: 'error' }];
    }

    termInput = '';
    setTimeout(() => termEl?.scrollIntoView({ block: 'end' }), 30);
  }

  function onTermKey(e: KeyboardEvent) {
    if (e.key === 'Enter') termRun(termInput);
  }

  onMount(() => {
    // Console banner
    console.log(CONSOLE_BANNER, 'color:#00ff88; font-family:monospace; font-size:12px; background:#180f3a; padding:12px; line-height:1.6;');
    console.log('%c Type help() for commands', 'color:#F19406; font-family:monospace; font-size:11px;');

    // Console commands
    (window as any).help = () => {
      console.log('%c Workshop Console Commands:', 'color:#c060c8; font-size:13px; font-weight:bold;');
      console.log('%c  help()    → this menu\n  cat()     → displays the cat\n  sudo()    → you know what this does\n  status()  → workshop status\n  secrets() → probably nothing', 'color:#00ff88; font-family:monospace; font-size:12px;');
    };
    (window as any).cat = () => console.log('%c' + ASCII_CAT, 'color:#00ff88; font-family:monospace; font-size:14px;');
    (window as any).sudo = () => {
      console.log('%c bash: sudo: command not found', 'color:#B73D6E; font-family:monospace;');
      setTimeout(() => console.log('%c ...or is it?  →  /sudo', 'color:#a888cc; font-family:monospace;'), 800);
    };
    (window as any).status = () => {
      const h = new Date().getHours();
      const status = (h >= 23 || h < 4) ? 'SHOULD BE SLEEPING' : 'VIBING';
      console.log(`%c STATUS: ${status}`, 'color:#F19406; font-family:monospace; font-size:13px;');
    };
    (window as any).secrets = () => {
      console.log('%c ...', 'color:#a888cc; font-family:monospace;');
      setTimeout(() => console.log('%c /blueprint', 'color:#00ff88; font-family:monospace; font-size:16px;'), 1200);
    };

    // After-hours check
    const h = new Date().getHours();
    afterHours = h >= 23 || h < 4;
    if (afterHours) document.documentElement.classList.add('after-hours');

    // Key listeners
    const onKey = (e: KeyboardEvent) => {
      // Konami
      konamiSeq = [...konamiSeq, e.key].slice(-KONAMI.length);
      if (konamiSeq.join(',') === KONAMI.join(',')) {
        konamiActive = true;
        konamiSeq = [];
      }
      // Backtick opens terminal
      if (e.key === '`' && !termOpen) {
        e.preventDefault();
        termOpen = true;
        setTimeout(() => termEl?.focus(), 50);
      }
      if (e.key === 'Escape') {
        termOpen = false;
        konamiActive = false;
        dismissSS();
      }
      resetIdle();
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('click', resetIdle);
    resetIdle();

    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('click', resetIdle);
      clearTimeout(idleTimer);
      cancelAnimationFrame(ssFrame);
      if (afterHours) document.documentElement.classList.remove('after-hours');
    };
  });
</script>

<!-- ── SCREENSAVER ────────────────────────────── -->
{#if ssActive}
  <div class="ss-overlay" onclick={dismissSS} role="button" tabindex="0" aria-label="Click to dismiss screensaver" onkeydown={(e) => e.key === 'Enter' && dismissSS()}>
    <div class="ss-cat" style="left:{ssX}px; top:{ssY}px;">
      <svg viewBox="0 0 42 42" width="80" height="80" shape-rendering="crispEdges" style="image-rendering:pixelated; transition: background 0.15s;">
        <rect width="42" height="42" fill={ssBg}/>
        <!-- hat amber -->
        <rect x="15" y="0"  width="12" height="3"  fill="#F19406"/>
        <rect x="15" y="3"  width="12" height="3"  fill="#F19406"/>
        <rect x="9"  y="6"  width="24" height="3"  fill="#F19406"/>
        <rect x="15" y="9"  width="12" height="3"  fill="#F19406"/>
        <!-- ears + head magenta-purple -->
        <rect x="6"  y="9"  width="6"  height="6"  fill="#c060c8"/>
        <rect x="30" y="9"  width="6"  height="6"  fill="#c060c8"/>
        <rect x="6"  y="12" width="30" height="18" fill="#c060c8"/>
        <!-- eyes -->
        <rect x="12" y="18" width="6"  height="6"  fill="#110830"/>
        <rect x="24" y="18" width="6"  height="6"  fill="#110830"/>
        <!-- nose + mouth -->
        <rect x="18" y="24" width="6"  height="3"  fill="#7030a0"/>
        <rect x="12" y="27" width="3"  height="3"  fill="#7030a0"/>
        <rect x="27" y="27" width="3"  height="3"  fill="#7030a0"/>
        <!-- chin -->
        <rect x="9"  y="27" width="24" height="3"  fill="#c060c8"/>
      </svg>
      <p class="ss-label mono">click anywhere to wake</p>
    </div>
  </div>
{/if}

<!-- ── KONAMI SECRET ROOM ─────────────────────── -->
{#if konamiActive}
  <div class="secret-room" role="dialog" aria-modal="true" aria-label="Secret room">
    <div class="secret-room__content">
      <div class="stars" aria-hidden="true">
        {#each Array(60) as _, i}
          <span class="star" style="left:{Math.random()*100}%;top:{Math.random()*100}%;animation-delay:{Math.random()*3}s;font-size:{Math.random()*10+8}px;">✦</span>
        {/each}
      </div>
      <div class="secret-room__panel">
        <h2 class="secret-room__title">CLASSIFIED SECTOR 7G</h2>
        <p class="mono" style="font-size:22px; color:var(--col-paper); margin:1rem 0; line-height:1.8;">
          you found the secret room.<br/>
          not much here yet.<br/>
          the cat is watching though.
        </p>
        <p class="mono" style="font-size:16px; color:var(--col-paper-dark);">
          [ konami code activated — good taste ]
        </p>
        <div style="display:flex; gap:1rem; margin-top:1.5rem; flex-wrap:wrap;">
          <a href="/blueprint" class="btn-pixel" onclick={() => konamiActive=false}>VIEW BLUEPRINTS →</a>
          <button class="btn-pixel" onclick={() => konamiActive=false}>← RETURN</button>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- ── MINI TERMINAL ───────────────────────────── -->
{#if termOpen}
  <div class="terminal-overlay" role="dialog" aria-label="Workshop terminal">
    <div class="terminal-window pixel-box">
      <div class="terminal-titlebar">
        <span class="mono" style="font-size:16px; color:var(--col-paper-dark);">workshop terminal</span>
        <div style="display:flex; gap:6px;">
          <span class="led" style="animation-delay:0s"></span>
          <span class="led led--amber" style="animation-delay:0.4s"></span>
        </div>
        <button class="terminal-close" onclick={() => termOpen=false} aria-label="Close terminal">✕</button>
      </div>
      <div class="terminal-body">
        {#each termHistory as line}
          <div class="t-line"
            class:t-input={line.type==='input'}
            class:t-error={line.type==='error'}
            class:t-success={line.type==='success'}
            class:t-dim={line.type==='dim'}
          >{line.text || ' '}</div>
        {/each}
        <div class="t-prompt">
          <span style="color:var(--col-neon)">$</span>
          <input
            bind:this={termEl}
            bind:value={termInput}
            onkeydown={onTermKey}
            class="t-input-field"
            spellcheck="false"
            autocomplete="off"
            aria-label="Terminal input"
          />
        </div>
        <div bind:this={termEl as any}></div>
      </div>
    </div>
    <p class="terminal-hint mono">press ESC or ` to close</p>
  </div>
{/if}

<style>
  /* ── SCREENSAVER ─────────────────── */
  .ss-overlay {
    position: fixed;
    inset: 0;
    z-index: 8888;
    background: #000;
    cursor: none;
  }

  .ss-cat {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .ss-label {
    font-size: 14px;
    color: #00ff88;
    opacity: 0.5;
    white-space: nowrap;
  }

  /* ── SECRET ROOM ─────────────────── */
  .secret-room {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #05050f;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
  }

  .secret-room__content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stars { position: absolute; inset: 0; pointer-events: none; }
  .star {
    position: absolute;
    color: #fff;
    animation: twinkle 3s ease-in-out infinite;
    opacity: 0.4;
  }

  .secret-room__panel {
    position: relative;
    z-index: 1;
    padding: 3rem;
    text-align: center;
    max-width: 500px;
    background: #0a0a1a;
    border: 4px solid var(--col-neon);
    box-shadow: 0 0 0 4px var(--col-neon-dim), 0 0 40px var(--col-neon-dim), 8px 8px 0 0 rgba(0,0,0,0.8);
  }

  .secret-room__title {
    font-family: var(--font-pixel);
    font-size: 12px;
    color: var(--col-neon);
    text-shadow: 0 0 10px var(--col-neon);
    margin-bottom: 1rem;
    animation: flicker 4s ease-in-out infinite;
  }

  /* ── MINI TERMINAL ───────────────── */
  .terminal-overlay {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9000;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: slideUp 0.2s ease-out;
  }

  @keyframes slideUp {
    from { transform: translateY(100%); }
    to   { transform: none; }
  }

  .terminal-window {
    width: min(800px, 100%);
    background: #080514;
    border: 4px solid var(--col-neon);
    border-bottom: none;
    box-shadow: 0 0 24px rgba(0,255,136,0.2);
    max-height: 50vh;
    display: flex;
    flex-direction: column;
  }

  .terminal-titlebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
    background: #0e0820;
    border-bottom: 2px solid var(--col-neon-dim);
    flex-shrink: 0;
  }

  .terminal-close {
    background: none;
    border: none;
    color: var(--col-paper-dark);
    cursor: pointer;
    font-size: 16px;
    padding: 0 4px;
  }
  .terminal-close:hover { color: var(--col-neon); }

  .terminal-body {
    padding: 1rem;
    overflow-y: auto;
    flex: 1;
    font-family: var(--font-mono);
    font-size: 20px;
    color: var(--col-neon);
  }

  .t-line {
    white-space: pre-wrap;
    line-height: 1.4;
    min-height: 1.4em;
  }

  .t-input  { color: var(--col-paper); }
  .t-error  { color: var(--col-red); }
  .t-success { color: var(--col-neon); text-shadow: 0 0 8px rgba(0,255,136,0.4); }
  .t-dim    { color: var(--col-paper-dark); }

  .t-prompt {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 4px;
  }

  .t-input-field {
    background: transparent;
    border: none;
    outline: none;
    color: var(--col-paper);
    font-family: var(--font-mono);
    font-size: 20px;
    flex: 1;
    caret-color: var(--col-neon);
  }

  .terminal-hint {
    font-size: 14px;
    color: var(--col-neon-dim);
    padding: 4px;
    width: min(800px, 100%);
    text-align: right;
  }

  /* ── SHARED ANIMATIONS ────────────── */
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes twinkle  { 0%,100% { opacity:0.2; transform:scale(1); } 50% { opacity:0.9; transform:scale(1.3); } }
  @keyframes flicker  { 0%,95%,100% { opacity:1; } 96% { opacity:0.4; } 97% { opacity:1; } 98% { opacity:0.2; } }

  /* ── AFTER-HOURS GLOBAL ───────────── */
  :global(html.after-hours) {
    --col-bg: #0f0820;
    --col-bench: #1a1035;
  }
</style>
