<script lang="ts">
  import BookPopout from '$lib/components/BookPopout.svelte';
  import { getBookEgg, pickQuote, pickCheese } from '$lib/data/bookEggs';
  import type { MovieQuote } from '$lib/data/bookEggs';

  let { onmugfall = () => {} }: { onmugfall?: () => void } = $props();

  let activeQuote  = $state<MovieQuote | null>(null);
  let mugFallen    = $state(false);
  let mugSplat     = $state(false);

  function clickMug() {
    if (mugFallen) return;
    mugFallen = true;
    setTimeout(() => { mugSplat = true; }, 600);
    setTimeout(() => { onmugfall(); }, 700);
  }

  function clickBook(index: number) {
    const egg = getBookEgg(index);
    if (egg === 'quote') {
      activeQuote = pickQuote(index);
    } else {
      const cheese = pickCheese(index);
      window.open(cheese.url, '_blank', 'noopener,noreferrer');
    }
  }

  // ── SHELF BOOK DATA ────────────────────────────────────────────────────────
  // Upper shelf — books + items, bottom-aligned to y=72 in the 900×80 viewBox
  const upperBooks = [
    { x: 8,   w: 12, h: 52, c: '#c04444', hi: '#d06060' },
    { x: 22,  w: 14, h: 64, c: '#4455c0', hi: '#6070d8' },
    { x: 38,  w: 10, h: 44, c: '#44a044', hi: '#60b860' },
    { x: 50,  w: 12, h: 56, c: '#c08030', hi: '#d09848' },
    { x: 64,  w: 10, h: 40, c: '#9040c0', hi: '#a858d0' },
    { x: 76,  w: 14, h: 60, c: '#c04444', hi: '#d06060' },
    { x: 92,  w: 10, h: 48, c: '#4080c0', hi: '#60a0d8' },
    { x: 104, w: 12, h: 52, c: '#40a060', hi: '#58b878' },
    // gap — old monitor sits here (x 120–196)
    { x: 200, w: 10, h: 44, c: '#b05030', hi: '#c06848' },
    { x: 212, w: 14, h: 60, c: '#304090', hi: '#4858b0' },
    { x: 228, w: 12, h: 52, c: '#808020', hi: '#989838' },
    { x: 242, w: 10, h: 36, c: '#c04080', hi: '#d05898' },
    // gap — boxes here (x 256–320)
    { x: 324, w: 12, h: 56, c: '#4444c0', hi: '#6060d8' },
    { x: 338, w: 10, h: 48, c: '#c05040', hi: '#d06858' },
    { x: 350, w: 14, h: 64, c: '#30a050', hi: '#48b868' },
    { x: 366, w: 10, h: 44, c: '#a03060', hi: '#b84878' },
    // gap — robot (x 380–414)
    { x: 418, w: 12, h: 52, c: '#5050c0', hi: '#6868d8' },
    { x: 432, w: 10, h: 40, c: '#b08030', hi: '#c09848' },
    { x: 444, w: 14, h: 60, c: '#c04444', hi: '#d06060' },
    { x: 460, w: 12, h: 48, c: '#40a080', hi: '#58b898' },
    { x: 474, w: 10, h: 56, c: '#8030c0', hi: '#9848d0' },
    // gap — stacked boxes (x 488–554)
    { x: 558, w: 14, h: 60, c: '#4060b0', hi: '#5878c8' },
    { x: 574, w: 10, h: 44, c: '#c06030', hi: '#d07848' },
    { x: 586, w: 12, h: 52, c: '#30a040', hi: '#48b858' },
    { x: 600, w: 10, h: 40, c: '#a040a0', hi: '#b858b8' },
    { x: 612, w: 14, h: 64, c: '#4444c0', hi: '#6060d8' },
    // gap — plant (x 630–670)
    { x: 674, w: 12, h: 56, c: '#c04040', hi: '#d06060' },
    { x: 688, w: 10, h: 48, c: '#40a0c0', hi: '#58b8d8' },
    { x: 700, w: 14, h: 60, c: '#8040b0', hi: '#9858c8' },
    { x: 716, w: 10, h: 44, c: '#b07030', hi: '#c08848' },
    { x: 728, w: 12, h: 52, c: '#4060c0', hi: '#6078d8' },
    // gap — phone / speaker (x 744–800)
    { x: 804, w: 10, h: 40, c: '#c04044', hi: '#d05858' },
    { x: 816, w: 14, h: 56, c: '#3050a0', hi: '#4868b8' },
    { x: 832, w: 10, h: 48, c: '#40b040', hi: '#58c858' },
    { x: 844, w: 12, h: 60, c: '#a06020', hi: '#b87838' },
    { x: 858, w: 10, h: 44, c: '#8030a0', hi: '#9848b8' },
    { x: 870, w: 14, h: 52, c: '#304090', hi: '#4858a8' },
  ];

  // Lower shelf — more items, bottom-aligned to y=72
  const lowerBooks = [
    { x: 8,   w: 12, h: 44, c: '#b03030', hi: '#c84848' },
    { x: 22,  w: 10, h: 52, c: '#3050b0', hi: '#4868c8' },
    { x: 34,  w: 14, h: 48, c: '#308030', hi: '#489848' },
    { x: 50,  w: 10, h: 40, c: '#a07820', hi: '#b89038' },
    { x: 62,  w: 12, h: 56, c: '#703090', hi: '#8848a8' },
    { x: 76,  w: 10, h: 44, c: '#b04030', hi: '#c85848' },
    // gap — binders/folders (x 88–160)
    { x: 164, w: 14, h: 52, c: '#3040a0', hi: '#4858b8' },
    { x: 180, w: 10, h: 40, c: '#60a030', hi: '#78b848' },
    { x: 192, w: 12, h: 60, c: '#c04040', hi: '#d85858' },
    { x: 206, w: 10, h: 44, c: '#a04090', hi: '#b858a8' },
    { x: 218, w: 14, h: 52, c: '#4060c0', hi: '#5878d8' },
    // gap — mini TV / screen (x 236–310)
    { x: 314, w: 10, h: 44, c: '#c04030', hi: '#d85848' },
    { x: 326, w: 12, h: 56, c: '#3080b0', hi: '#4898c8' },
    { x: 340, w: 10, h: 40, c: '#80a020', hi: '#98b838' },
    { x: 352, w: 14, h: 48, c: '#9030a0', hi: '#a848b8' },
    { x: 368, w: 10, h: 52, c: '#c05030', hi: '#d86848' },
    // gap — walkie talkie / radios (x 382–450)
    { x: 454, w: 12, h: 44, c: '#3060a0', hi: '#4878b8' },
    { x: 468, w: 10, h: 56, c: '#a03050', hi: '#b84868' },
    { x: 480, w: 14, h: 48, c: '#308040', hi: '#489858' },
    { x: 496, w: 10, h: 40, c: '#c07030', hi: '#d88848' },
    // gap — speaker (x 510–580)
    { x: 584, w: 12, h: 52, c: '#4040b0', hi: '#5858c8' },
    { x: 598, w: 10, h: 44, c: '#b04040', hi: '#c85858' },
    { x: 610, w: 14, h: 60, c: '#30a030', hi: '#48b848' },
    { x: 626, w: 10, h: 48, c: '#a03080', hi: '#b84898' },
    { x: 638, w: 12, h: 52, c: '#4060c0', hi: '#5878d8' },
    // gap — misc boxes (x 654–730)
    { x: 734, w: 10, h: 44, c: '#c04040', hi: '#d85858' },
    { x: 746, w: 14, h: 52, c: '#3050a0', hi: '#4868b8' },
    { x: 762, w: 10, h: 60, c: '#40a040', hi: '#58b858' },
    { x: 774, w: 12, h: 44, c: '#c08030', hi: '#d89848' },
    { x: 788, w: 10, h: 48, c: '#8030c0', hi: '#9848d8' },
    { x: 800, w: 14, h: 56, c: '#3040a0', hi: '#4858b8' },
    { x: 816, w: 10, h: 40, c: '#c04444', hi: '#d85858' },
    { x: 828, w: 12, h: 52, c: '#408040', hi: '#589858' },
    { x: 842, w: 10, h: 44, c: '#a03060', hi: '#b84878' },
    { x: 854, w: 14, h: 60, c: '#4060c0', hi: '#5878d8' },
    { x: 870, w: 10, h: 48, c: '#c05030', hi: '#d86848' },
  ];
</script>

<!-- ── UPPER SHELF ────────────────────────────────────────────────────────── -->
<div class="shelf shelf--upper">
  <svg class="shelf-svg" viewBox="0 0 900 84" preserveAspectRatio="xMidYMax meet">
    <!-- shelf board -->
    <rect x="0" y="72" width="900" height="12" fill="#241650"/>
    <rect x="0" y="72" width="900" height="3" fill="#3a2478"/>

    <!-- books — each clickable -->
    {#each upperBooks as b, i}
      <g
        role="button"
        tabindex="0"
        aria-label="Book"
        style="cursor:pointer;"
        onclick={() => clickBook(i)}
        onkeydown={(e) => e.key === 'Enter' && clickBook(i)}
      >
        <rect x={b.x} y={72 - b.h} width={b.w} height={b.h} fill={b.c}/>
        <rect x={b.x} y={72 - b.h} width={b.w} height={3} fill={b.hi}/>
        <rect x={b.x} y={72 - 4}   width={b.w} height={4} fill="rgba(0,0,0,0.25)"/>
        <rect class="book-hover" x={b.x} y={72 - b.h} width={b.w} height={b.h} fill="rgba(255,255,255,0)"/>
      </g>
    {/each}

    <!-- Old CRT monitor silhouette on shelf -->
    <rect x="120" y="16" width="76" height="56" fill="#0a0808"/>
    <rect x="124" y="18" width="68" height="44" fill="#121020"/>
    <rect x="128" y="20" width="60" height="38" fill="#1a1028"/>
    <rect x="140" y="62" width="44" height="4" fill="#0a0808"/>
    <rect x="130" y="66" width="56" height="6" fill="#0a0808"/>

    <!-- Cardboard boxes -->
    <rect x="256" y="40" width="36" height="32" fill="#b8843a"/>
    <rect x="256" y="40" width="36" height="4" fill="#c89a50"/>
    <rect x="258" y="44" width="32" height="2" fill="#a07030"/>
    <rect x="294" y="44" width="24" height="28" fill="#c89040"/>
    <rect x="294" y="44" width="24" height="4" fill="#d8a858"/>

    <!-- Little robot on shelf -->
    <rect x="380" y="32" width="28" height="40" fill="#5050b8"/>
    <rect x="382" y="28" width="24" height="16" fill="#3838a0"/>
    <rect x="386" y="32" width="6" height="6"  fill="#ffee00"/>
    <rect x="396" y="32" width="6" height="6"  fill="#ffee00"/>
    <rect x="386" y="42" width="16" height="2" fill="#8080e0"/>
    <rect x="380" y="72" width="8"  height="0" fill="#3030a0"/>
    <rect x="400" y="72" width="8"  height="0" fill="#3030a0"/>
    <!-- antenna -->
    <rect x="393" y="22" width="2" height="8" fill="#aaaaff"/>
    <rect x="391" y="20" width="6" height="4" fill="#ccccff"/>

    <!-- Stacked boxes right area -->
    <rect x="488" y="28" width="28" height="44" fill="#a08850"/>
    <rect x="488" y="28" width="28" height="4" fill="#b89e68"/>
    <rect x="490" y="34" width="24" height="1" fill="#907840"/>
    <rect x="490" y="48" width="24" height="1" fill="#907840"/>
    <rect x="518" y="36" width="22" height="36" fill="#b0783a"/>
    <rect x="518" y="36" width="22" height="4" fill="#c08850"/>

    <!-- Plant in pot -->
    <rect x="636" y="52" width="28" height="20" fill="#6a3a18"/>
    <rect x="638" y="50" width="24" height="4"  fill="#7a4828"/>
    <!-- stem -->
    <rect x="649" y="30" width="2" height="22" fill="#309030"/>
    <!-- leaves -->
    <rect x="638" y="30" width="12" height="8" fill="#30a030"/>
    <rect x="642" y="22" width="10" height="8" fill="#38b038"/>
    <rect x="650" y="26" width="12" height="8" fill="#28a028"/>
    <rect x="646" y="18" width="8"  height="8" fill="#40b840"/>

    <!-- Speaker/phone right side -->
    <rect x="744" y="30" width="48" height="42" fill="#1a1428"/>
    <rect x="746" y="32" width="44" height="38" fill="#221a38"/>
    <!-- speaker grille dots -->
    <rect x="750" y="36" width="4" height="4" rx="2" fill="#333"/>
    <rect x="758" y="36" width="4" height="4" rx="2" fill="#333"/>
    <rect x="766" y="36" width="4" height="4" rx="2" fill="#333"/>
    <rect x="774" y="36" width="4" height="4" rx="2" fill="#333"/>
    <rect x="750" y="44" width="4" height="4" rx="2" fill="#333"/>
    <rect x="758" y="44" width="4" height="4" rx="2" fill="#333"/>
    <rect x="766" y="44" width="4" height="4" rx="2" fill="#333"/>
    <rect x="774" y="44" width="4" height="4" rx="2" fill="#333"/>
  </svg>
</div>

<!-- ── WALL DECORATIONS ─────────────────────────────────────────────────── -->
<div class="wall-deco">
  <!-- Sci-fi space poster — links to NASA climate science -->
  <svg class="poster" viewBox="0 0 72 96" preserveAspectRatio="xMidYMid meet"
    role="link"
    tabindex="0"
    aria-label="Space poster — NASA Scientific Consensus on Climate Change"
    title="NASA: Scientific Consensus on Climate Change"
    style="cursor:pointer;"
    onclick={() => window.open('https://science.nasa.gov/climate-change/scientific-consensus/', '_blank', 'noopener')}
    onkeydown={(e) => e.key === 'Enter' && window.open('https://science.nasa.gov/climate-change/scientific-consensus/', '_blank', 'noopener')}
  >
    <rect x="0" y="0" width="72" height="96" fill="#08040f"/>
    <!-- Planet -->
    <rect x="20" y="24" width="32" height="32" fill="#2030a0"/>
    <rect x="16" y="28" width="40" height="24" fill="#2030a0"/>
    <rect x="24" y="20" width="24" height="40" fill="#2030a0"/>
    <!-- planet shading -->
    <rect x="20" y="24" width="12" height="32" fill="#1824a0"/>
    <rect x="24" y="20" width="8" height="40" fill="#1020a8"/>
    <!-- planet highlight -->
    <rect x="32" y="24" width="8" height="8" fill="#4060d0"/>
    <!-- ring -->
    <rect x="8" y="36" width="56" height="6" fill="#60408080"/>
    <rect x="4" y="38" width="64" height="4" fill="#50307060"/>
    <!-- stars -->
    <rect x="6"  y="6"  width="2" height="2" fill="#ffffff80"/>
    <rect x="14" y="12" width="2" height="2" fill="#ffffff"/>
    <rect x="58" y="8"  width="2" height="2" fill="#ffffff80"/>
    <rect x="52" y="72" width="2" height="2" fill="#ffffff"/>
    <rect x="10" y="80" width="2" height="2" fill="#ffffff80"/>
    <rect x="62" y="64" width="2" height="2" fill="#ffffff80"/>
    <rect x="30" y="76" width="2" height="2" fill="#ffffff"/>
    <rect x="64" y="82" width="2" height="2" fill="#ffffff80"/>
    <!-- Title bar at bottom -->
    <rect x="4" y="82" width="64" height="10" fill="#200840"/>
    <rect x="10" y="84" width="52" height="6" fill="#300c60"/>
  </svg>

  <!-- Hanging cables from shelf -->
  <svg class="wall-cables" viewBox="0 0 900 120" preserveAspectRatio="xMidYMid meet">
    <!-- cable 1 -->
    <path d="M 180 0 C 180 40 168 60 170 120" stroke="#2a1a3a" stroke-width="3" fill="none"/>
    <path d="M 182 0 C 182 42 170 62 172 120" stroke="#3a2a4a" stroke-width="2" fill="none"/>
    <!-- cable 2 -->
    <path d="M 340 0 C 338 30 350 50 345 120" stroke="#1a0a2a" stroke-width="4" fill="none"/>
    <!-- cable 3 -->
    <path d="M 600 0 C 608 35 595 55 600 120" stroke="#2a1a3a" stroke-width="3" fill="none"/>
    <path d="M 603 0 C 611 37 598 57 603 120" stroke="#3a2a4a" stroke-width="2" fill="none"/>
    <!-- cable 4 -->
    <path d="M 760 0 C 755 28 765 45 760 120" stroke="#1a0a2a" stroke-width="3" fill="none"/>
    <!-- ethernet cable with plug -->
    <path d="M 480 0 C 475 45 490 70 485 120" stroke="#e0a020" stroke-width="2" fill="none"/>
    <rect x="481" y="116" width="8" height="6" fill="#c08818"/>
  </svg>
</div>

<!-- ── LOWER SHELF ────────────────────────────────────────────────────────── -->
<div class="shelf shelf--lower" aria-hidden="true">
  <svg class="shelf-svg" viewBox="0 0 900 84" preserveAspectRatio="xMidYMax meet">
    <rect x="0" y="72" width="900" height="12" fill="#241650"/>
    <rect x="0" y="72" width="900" height="3" fill="#3a2478"/>

    {#each lowerBooks as b, i}
      <g
        role="button"
        tabindex="0"
        aria-label="Book"
        style="cursor:pointer;"
        onclick={() => clickBook(i + upperBooks.length)}
        onkeydown={(e) => e.key === 'Enter' && clickBook(i + upperBooks.length)}
      >
        <rect x={b.x} y={72 - b.h} width={b.w} height={b.h} fill={b.c}/>
        <rect x={b.x} y={72 - b.h} width={b.w} height={3} fill={b.hi}/>
        <rect x={b.x} y={72 - 4}   width={b.w} height={4} fill="rgba(0,0,0,0.25)"/>
        <rect class="book-hover" x={b.x} y={72 - b.h} width={b.w} height={b.h} fill="rgba(255,255,255,0)"/>
      </g>
    {/each}

    <!-- Ring binders / folders -->
    <rect x="88" y="20" width="20" height="52" fill="#c02020"/>
    <rect x="88" y="20" width="4" height="52"  fill="#a01818"/>
    <rect x="90" y="32" width="2" height="8"   fill="#ff4040"/>
    <rect x="90" y="44" width="2" height="8"   fill="#ff4040"/>
    <rect x="110" y="24" width="20" height="48" fill="#2020c0"/>
    <rect x="110" y="24" width="4" height="48"  fill="#1818a0"/>
    <rect x="132" y="28" width="20" height="44" fill="#20a020"/>
    <rect x="132" y="28" width="4" height="44"  fill="#189018"/>

    <!-- Mini TV / retro device -->
    <rect x="236" y="20" width="68" height="52" fill="#0a0a18"/>
    <rect x="240" y="22" width="60" height="40" fill="#0e0e22"/>
    <rect x="242" y="24" width="56" height="36" fill="#12102a"/>
    <!-- screen glow -->
    <rect x="244" y="26" width="52" height="32" fill="#101828"/>
    <rect x="250" y="30" width="40" height="24" fill="#141c30" opacity="0.8"/>
    <!-- TV legs -->
    <rect x="248" y="72" width="8"  height="4" fill="#080814"/>
    <rect x="288" y="72" width="8"  height="4" fill="#080814"/>
    <!-- antenna -->
    <rect x="270" y="10" width="2" height="12" fill="#303030"/>
    <rect x="268" y="8" width="6"  height="4"  fill="#404040"/>

    <!-- Walkie-talkie / radio devices -->
    <rect x="382" y="22" width="20" height="50" fill="#303030"/>
    <rect x="384" y="24" width="16" height="30" fill="#202020"/>
    <rect x="386" y="26" width="12" height="20" fill="#0a1428" opacity="0.9"/>
    <rect x="390" y="14" width="4"  height="10" fill="#282828"/>
    <!-- buttons -->
    <rect x="385" y="56" width="6" height="4" fill="#404040"/>
    <rect x="394" y="56" width="6" height="4" fill="#c04040"/>
    <rect x="404" y="22" width="18" height="50" fill="#383838"/>
    <rect x="406" y="24" width="14" height="28" fill="#282828"/>
    <rect x="406" y="24" width="14" height="20" fill="#101828" opacity="0.9"/>
    <rect x="410" y="14" width="4"  height="10" fill="#303030"/>

    <!-- Speaker box -->
    <rect x="510" y="12" width="64" height="60" fill="#181428"/>
    <rect x="514" y="14" width="56" height="52" fill="#201c38"/>
    <!-- speaker cone -->
    <rect x="526" y="22" width="32" height="32" fill="#141020"/>
    <rect x="532" y="26" width="20" height="20" fill="#0e0c1a" rx="10"/>
    <rect x="538" y="30" width="8"  height="8"  fill="#181428"/>
    <!-- tweeter -->
    <rect x="554" y="44" width="12" height="12" fill="#141020" rx="6"/>

    <!-- Misc boxes and clutter -->
    <rect x="654" y="32" width="32" height="40" fill="#8a6a30"/>
    <rect x="654" y="32" width="32" height="4"  fill="#a07a40"/>
    <rect x="690" y="40" width="24" height="32" fill="#6a4a20"/>
    <rect x="690" y="40" width="24" height="3"  fill="#7a5830"/>
    <rect x="716" y="36" width="16" height="36" fill="#9a7238"/>
    <rect x="716" y="36" width="16" height="3"  fill="#aa8248"/>
  </svg>
</div>

<!-- ── DESK LAMP GLOW (radial gradient positioned above desk) ── -->
<div class="lamp-glow" aria-hidden="true"></div>

<!-- ── DESK LEFT OBJECTS ─────────────────────────────────────────────────── -->
<div class="desk-left" aria-hidden="true">
  <svg viewBox="0 0 200 140" width="200" height="140" style="image-rendering:pixelated; overflow:visible;">
    <!-- Desk lamp -->
    <rect x="20" y="100" width="36" height="6"  fill="#2a2a3a"/>  <!-- base -->
    <rect x="35" y="30"  width="6"  height="70" fill="#2a2a3a"/>  <!-- pole -->
    <rect x="36" y="28"  width="40" height="6"  fill="#2a2a3a" transform="rotate(-20 36 28)"/> <!-- arm -->
    <!-- lamp head -->
    <polygon points="70,8 90,8 86,28 66,28" fill="#c0a020"/>
    <rect x="68" y="28" width="20" height="4" fill="#a08018"/>
    <!-- bulb glow -->
    <rect x="72" y="12" width="12" height="12" fill="#fff8e0" opacity="0.9"/>

    <!-- Stacked books (lying flat) — each links somewhere -->
    <g role="button" tabindex="0" aria-label="C for Dummies" title="C for Dummies" style="cursor:pointer"
       onclick={() => window.open('https://c-for-dummies.com/', '_blank', 'noopener')}
       onkeydown={(e) => e.key==='Enter' && window.open('https://c-for-dummies.com/', '_blank', 'noopener')}>
      <rect x="100" y="112" width="80" height="14" fill="#4060c0"/>
      <rect x="100" y="112" width="80" height="3"  fill="#6080d8"/>
      <rect x="120" y="114" width="20" height="4"  fill="rgba(255,255,255,0.2)"/>
      <rect class="book-hover" x="100" y="112" width="80" height="14" fill="rgba(255,255,255,0)"/>
    </g>
    <g role="button" tabindex="0" aria-label="xkcd" title="xkcd" style="cursor:pointer"
       onclick={() => window.open('https://xkcd.com/', '_blank', 'noopener')}
       onkeydown={(e) => e.key==='Enter' && window.open('https://xkcd.com/', '_blank', 'noopener')}>
      <rect x="102" y="98"  width="74" height="14" fill="#c04040"/>
      <rect x="102" y="98"  width="74" height="3"  fill="#d86060"/>
      <rect x="120" y="100" width="20" height="4"  fill="rgba(255,255,255,0.2)"/>
      <rect class="book-hover" x="102" y="98" width="74" height="14" fill="rgba(255,255,255,0)"/>
    </g>
    <g role="button" tabindex="0" aria-label="NYT Connections" title="NYT Connections" style="cursor:pointer"
       onclick={() => window.open('https://www.nytimes.com/games/connections', '_blank', 'noopener')}
       onkeydown={(e) => e.key==='Enter' && window.open('https://www.nytimes.com/games/connections', '_blank', 'noopener')}>
      <rect x="104" y="84"  width="76" height="14" fill="#f0a020"/>
      <rect x="104" y="84"  width="76" height="3"  fill="#f8b840"/>
      <rect x="120" y="86"  width="20" height="4"  fill="rgba(255,255,255,0.2)"/>
      <rect class="book-hover" x="104" y="84" width="76" height="14" fill="rgba(255,255,255,0)"/>
    </g>
    <g role="button" tabindex="0" aria-label="xkcd" title="xkcd" style="cursor:pointer"
       onclick={() => window.open('https://xkcd.com/', '_blank', 'noopener')}
       onkeydown={(e) => e.key==='Enter' && window.open('https://xkcd.com/', '_blank', 'noopener')}>
      <rect x="106" y="70"  width="70" height="14" fill="#40a040"/>
      <rect x="106" y="70"  width="70" height="3"  fill="#60b860"/>
      <rect class="book-hover" x="106" y="70" width="70" height="14" fill="rgba(255,255,255,0)"/>
    </g>
    <g role="button" tabindex="0" aria-label="C for Dummies" title="C for Dummies" style="cursor:pointer"
       onclick={() => window.open('https://c-for-dummies.com/', '_blank', 'noopener')}
       onkeydown={(e) => e.key==='Enter' && window.open('https://c-for-dummies.com/', '_blank', 'noopener')}>
      <rect x="108" y="58"  width="68" height="12" fill="#8040c0"/>
      <rect x="108" y="58"  width="68" height="3"  fill="#9858d0"/>
      <rect class="book-hover" x="108" y="58" width="68" height="12" fill="rgba(255,255,255,0)"/>
    </g>

    <!-- Breadboard / Arduino-ish thing -->
    <rect x="100" y="30" width="56" height="28" fill="#207020"/>
    <rect x="102" y="32" width="52" height="24" fill="#289028"/>
    <!-- header pins -->
    {#each [0,4,8,12,16,20,24,28,32,36,40,44] as px}
      <rect x={104 + px} y="30" width="2" height="3" fill="#c0c0a0"/>
      <rect x={104 + px} y="53" width="2" height="3" fill="#c0c0a0"/>
    {/each}
    <!-- chips on board -->
    <rect x="110" y="36" width="20" height="12" fill="#101010"/>
    <rect x="112" y="38" width="16" height="8"  fill="#181818"/>
    <rect x="136" y="38" width="12" height="8"  fill="#101010"/>
    <!-- LED indicators -->
    <rect x="104" y="40" width="4" height="4" fill="#00ff00" opacity="0.9"/>
    <rect x="110" y="40" width="4" height="4" fill="#ff8800" opacity="0.7"/>
    <!-- USB port -->
    <rect x="152" y="38" width="6" height="6" fill="#4040c0"/>
  </svg>
</div>

<!-- ── DESK RIGHT OBJECTS ─────────────────────────────────────────────────── -->
<div class="desk-right" aria-hidden="true">
  <svg viewBox="0 0 220 140" width="220" height="140" style="image-rendering:pixelated; overflow:visible;">
    <!-- Coffee mug — clickable, falls when clicked -->
    <g
      class="mug-group"
      class:mug-falling={mugFallen}
      role="button"
      tabindex="0"
      aria-label="Coffee mug"
      style="cursor:{mugFallen ? 'default' : 'pointer'}; transform-origin: 54px 100px;"
      onclick={clickMug}
      onkeydown={(e) => e.key === 'Enter' && clickMug()}
    >
      <rect x="10" y="48" width="44" height="52" fill="#6a3c1c"/>
      <rect x="10" y="48" width="44" height="6"  fill="#502c10"/>
      <rect x="10" y="48" width="44" height="3"  fill="#7a4c2c"/>
      <rect x="14" y="51" width="36" height="6"  fill="#3a1c08"/>
      <!-- handle -->
      <rect x="54" y="58" width="10" height="4"  fill="#6a3c1c"/>
      <rect x="58" y="62" width="6"  height="20" fill="#6a3c1c"/>
      <rect x="54" y="82" width="10" height="4"  fill="#6a3c1c"/>
      <rect x="22" y="70" width="20" height="12" fill="rgba(255,255,255,0.08)"/>
      {#if !mugFallen}
        <!-- steam only before falling -->
        <rect x="20" y="34" width="4" height="12" fill="#d0d8f0" opacity="0.4" class="steam s1"/>
        <rect x="30" y="28" width="4" height="18" fill="#d0d8f0" opacity="0.35" class="steam s2"/>
        <rect x="42" y="32" width="4" height="14" fill="#d0d8f0" opacity="0.3" class="steam s3"/>
      {/if}
    </g>

    <!-- Scattered papers / sticky notes -->
    <rect x="74"  y="88" width="60" height="44" fill="#f5e840" transform="rotate(-3 74 88)"/>
    <rect x="80"  y="96" width="44" height="3"  fill="rgba(0,0,0,0.15)" transform="rotate(-3 74 88)"/>
    <rect x="80" y="103" width="36" height="3"  fill="rgba(0,0,0,0.15)" transform="rotate(-3 74 88)"/>
    <rect x="80" y="110" width="40" height="3"  fill="rgba(0,0,0,0.15)" transform="rotate(-3 74 88)"/>
    <rect x="138" y="96" width="56" height="36" fill="#f0f0f0" transform="rotate(2 138 96)"/>
    <rect x="144" y="104" width="40" height="2" fill="rgba(100,100,255,0.2)" transform="rotate(2 138 96)"/>
    <rect x="144" y="110" width="36" height="2" fill="rgba(100,100,255,0.2)" transform="rotate(2 138 96)"/>
    <rect x="144" y="116" width="32" height="2" fill="rgba(100,100,255,0.2)" transform="rotate(2 138 96)"/>
    <!-- pin -->
    <rect x="86" y="86" width="6" height="6" fill="#c04040"/>

    <!-- Circuit board / PCB -->
    <rect x="74"  y="24" width="80" height="52" fill="#1a4a1a"/>
    <rect x="76"  y="26" width="76" height="48" fill="#225522"/>
    <!-- PCB traces -->
    <path d="M 80 40 h 20 v 10 h 30 v -10 h 20" stroke="#c0a020" stroke-width="2" fill="none"/>
    <path d="M 80 55 h 70" stroke="#c0a020" stroke-width="2" fill="none"/>
    <path d="M 100 30 v 36" stroke="#c0a020" stroke-width="2" fill="none"/>
    <path d="M 130 30 v 20 h 10 v 16" stroke="#c0a020" stroke-width="2" fill="none"/>
    <!-- chips -->
    <rect x="82"  y="32" width="16" height="12" fill="#080808"/>
    <rect x="84"  y="34" width="12" height="8"  fill="#121212"/>
    <rect x="106" y="32" width="20" height="16" fill="#080808"/>
    <rect x="108" y="34" width="16" height="12" fill="#121212"/>
    <rect x="134" y="44" width="14" height="10" fill="#080808"/>
    <!-- LEDs on board -->
    <rect x="82"  y="52" width="6" height="6" fill="#00ff40" opacity="0.9"/>
    <rect x="92"  y="52" width="6" height="6" fill="#ff4000" opacity="0.7"/>
    <!-- capacitors -->
    <rect x="120" y="30" width="8" height="10" fill="#3a3a9a" rx="4"/>
    <rect x="146" y="30" width="8" height="10" fill="#9a3a3a" rx="4"/>
    <!-- pin headers -->
    {#each [0,6,12,18,24,30] as py}
      <rect x="152" y={28 + py} width="4" height="4" fill="#c0c0a0"/>
    {/each}
  </svg>
</div>

<!-- ── KEYBOARD ───────────────────────────────────────────────────────────── -->
<div class="keyboard-row" aria-hidden="true">
  <svg viewBox="0 0 320 48" width="320" height="48" style="image-rendering:pixelated;">
    <!-- keyboard body -->
    <rect x="0"  y="4"  width="320" height="44" fill="#18141e"/>
    <rect x="0"  y="4"  width="320" height="4"  fill="#221c2a"/>
    <rect x="2"  y="44" width="316" height="4"  fill="#100c14"/>
    <!-- key rows — row 1 (function keys, smaller) -->
    {#each Array(14) as _, i}
      <rect x={4 + i * 22} y={8}  width={18} height={8}  fill="#28222e" rx="1"/>
    {/each}
    <!-- row 2 -->
    {#each Array(13) as _, i}
      <rect x={4 + i * 24} y={19} width={20} height={10} fill="#28222e" rx="1"/>
    {/each}
    <!-- row 3 -->
    {#each Array(12) as _, i}
      <rect x={8 + i * 26} y={32} width={22} height={10} fill="#28222e" rx="1"/>
    {/each}
    <!-- spacebar -->
    <rect x="60" y="32" width="160" height="0" fill="#28222e" rx="1"/>
    <!-- key highlights (top edge) -->
    {#each Array(13) as _, i}
      <rect x={5 + i * 24} y={19}  width={18} height={2} fill="#38303e"/>
    {/each}
    {#each Array(12) as _, i}
      <rect x={9 + i * 26} y={32}  width={20} height={2} fill="#38303e"/>
    {/each}
    <!-- RGB strip at bottom -->
    <rect x="0" y="46" width="320" height="2" fill="url(#rgbGrad)"/>
    <defs>
      <linearGradient id="rgbGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="#ff0040"/>
        <stop offset="25%"  stop-color="#ff8800"/>
        <stop offset="50%"  stop-color="#c060c8"/>
        <stop offset="75%"  stop-color="#4060ff"/>
        <stop offset="100%" stop-color="#00ff88"/>
      </linearGradient>
    </defs>
  </svg>
</div>

<!-- ── LAUNDRY PILE ──────────────────────────────────────────────────────── -->
<div class="laundry" aria-hidden="true">
  <svg viewBox="0 0 160 90" width="160" height="90" style="image-rendering:pixelated; overflow:visible;">
    <!-- shadow -->
    <ellipse cx="80" cy="85" rx="70" ry="8" fill="rgba(0,0,0,0.4)"/>
    <!-- jeans / denim pile (base) -->
    <polygon points="10,80 90,76 140,82 120,88 20,90" fill="#3a5090"/>
    <polygon points="15,76 80,70 130,76 120,82 18,84" fill="#4060a8"/>
    <!-- hoodie (red, draped over) -->
    <polygon points="30,68 100,62 135,72 110,80 25,78" fill="#c03020"/>
    <polygon points="35,64 95,58 125,66 108,74 30,72" fill="#d04030"/>
    <!-- white t-shirt -->
    <polygon points="50,58 110,52 130,60 105,68 45,66" fill="#d8d4c8"/>
    <polygon points="55,54 105,48 125,55 103,63 50,61" fill="#e8e4d8"/>
    <!-- sleeve hanging off -->
    <polygon points="125,55 145,58 148,70 135,68" fill="#c0bca8"/>
    <!-- orange sock sticking out -->
    <polygon points="8,70 24,66 28,74 12,78" fill="#e07820"/>
    <polygon points="10,68 26,64 30,72 14,76" fill="#f08830"/>
    <!-- purple something peeking -->
    <polygon points="90,76 115,72 120,80 95,84" fill="#8040b0"/>
    <!-- wrinkle lines on jeans -->
    <path d="M 25 80 Q 60 76 100 78" stroke="#304080" stroke-width="1.5" fill="none"/>
    <path d="M 40 84 Q 75 80 110 82" stroke="#304080" stroke-width="1" fill="none"/>
  </svg>
</div>

<!-- ── OLD PC TOWER ──────────────────────────────────────────────────────── -->
<div class="pc-tower" aria-hidden="true">
  <svg viewBox="0 0 56 120" width="56" height="120" style="image-rendering:pixelated;">
    <!-- tower body -->
    <rect x="4"  y="0"  width="48" height="116" fill="#1a1828"/>
    <rect x="4"  y="0"  width="48" height="4"   fill="#24203a"/>
    <rect x="6"  y="2"  width="44" height="2"   fill="#2c2840"/>
    <!-- front panel texture -->
    <rect x="8"  y="8"  width="40" height="8"   fill="#12101e"/>
    <!-- drive bays -->
    <rect x="10" y="20" width="36" height="6"   fill="#0e0c18"/>
    <rect x="10" y="20" width="36" height="2"   fill="#18162a"/>
    <rect x="10" y="30" width="36" height="6"   fill="#0e0c18"/>
    <rect x="10" y="42" width="36" height="6"   fill="#0e0c18"/>
    <!-- power button -->
    <rect x="16" y="56" width="12" height="12"  fill="#141220"/>
    <rect x="19" y="59" width="6"  height="6"   fill="#1c1a2c" rx="3"/>
    <!-- power LED -->
    <rect x="32" y="59" width="4"  height="4"   fill="#00aa00"/>
    <!-- HDD LED -->
    <rect x="32" y="66" width="4"  height="4"   fill="#ff8800" opacity="0.6"/>
    <!-- ventilation holes -->
    {#each [80, 88, 96, 104] as y}
      {#each [10, 18, 26, 34, 42] as x}
        <rect x={x} y={y} width="4" height="2" fill="#0a0818"/>
      {/each}
    {/each}
    <!-- bottom feet -->
    <rect x="8"  y="112" width="10" height="4" fill="#0a0818"/>
    <rect x="38" y="112" width="10" height="4" fill="#0a0818"/>
  </svg>
</div>

<!-- ── POWER STRIP ON FLOOR ──────────────────────────────────────────────── -->
<div class="power-strip" aria-hidden="true">
  <svg viewBox="0 0 180 28" width="180" height="28" style="image-rendering:pixelated;">
    <rect x="0"  y="4"  width="180" height="20" fill="#1a1828"/>
    <rect x="0"  y="4"  width="180" height="3"  fill="#24203a"/>
    <!-- sockets -->
    {#each [12, 36, 60, 84, 108, 132] as x}
      <rect x={x}   y="8"  width="16" height="12" fill="#0e0c18" rx="2"/>
      <rect x={x+4} y="11" width="3"  height="3"  fill="#080818"/>
      <rect x={x+9} y="11" width="3"  height="3"  fill="#080818"/>
    {/each}
    <!-- power button -->
    <rect x="156" y="6"  width="18" height="16" fill="#0e0c18"/>
    <rect x="159" y="9"  width="12" height="10" fill="#c04040" rx="5"/>
    <!-- indicator light -->
    <rect x="160" y="13" width="4"  height="4"  fill="#ff0000"/>
    <!-- cord -->
    <path d="M 180 14 Q 190 14 190 28" stroke="#0a0818" stroke-width="4" fill="none"/>
  </svg>
</div>

<!-- ── COFFEE SPLAT (appears when mug falls) ─────────────────────────────── -->
{#if mugSplat}
  <div class="coffee-splat" aria-hidden="true">
    <svg viewBox="0 0 120 50" width="120" height="50" style="image-rendering:pixelated; overflow:visible;">
      <!-- main puddle -->
      <ellipse cx="55" cy="35" rx="50" ry="12" fill="#3a1c08" opacity="0.85"/>
      <ellipse cx="55" cy="35" rx="38" ry="8"  fill="#4a2410" opacity="0.9"/>
      <!-- splat blobs -->
      <ellipse cx="18" cy="28" rx="10" ry="6"  fill="#3a1c08" opacity="0.7" transform="rotate(-20 18 28)"/>
      <ellipse cx="90" cy="24" rx="8"  ry="5"  fill="#3a1c08" opacity="0.65" transform="rotate(15 90 24)"/>
      <ellipse cx="100" cy="38" rx="12" ry="5" fill="#3a1c08" opacity="0.6" transform="rotate(-10 100 38)"/>
      <ellipse cx="12" cy="40" rx="8"  ry="4"  fill="#4a2410" opacity="0.55"/>
      <!-- tiny drops -->
      <ellipse cx="30" cy="18" rx="4" ry="3" fill="#3a1c08" opacity="0.5"/>
      <ellipse cx="75" cy="16" rx="3" ry="2" fill="#3a1c08" opacity="0.45"/>
      <ellipse cx="105" cy="22" rx="3" ry="2" fill="#3a1c08" opacity="0.4"/>
      <!-- mug lying on its side (knocked over) -->
      <rect x="52" y="22" width="36" height="28" fill="#6a3c1c" transform="rotate(90 70 36)"/>
      <rect x="52" y="22" width="36" height="5"  fill="#502c10" transform="rotate(90 70 36)"/>
    </svg>
  </div>
{/if}

<!-- ── FLOOR CABLES ──────────────────────────────────────────────────────── -->
<div class="floor-cables" aria-hidden="true">
  <svg viewBox="0 0 600 60" width="600" height="60" style="image-rendering:pixelated;">
    <path d="M 50 10 C 80 30 120 10 160 20 S 240 40 300 20 S 380 5 440 25 S 520 45 580 30" stroke="#1a1030" stroke-width="4" fill="none"/>
    <path d="M 20 30 C 60 10 100 40 150 30 S 220 15 280 35 S 360 50 420 30" stroke="#2a1a40" stroke-width="3" fill="none"/>
    <path d="M 0 20 C 40 35 90 15 130 25 S 200 45 260 25 S 320 10 380 30 S 450 50 500 35 S 560 20 600 30" stroke="#c0a020" stroke-width="2" fill="none" opacity="0.6"/>
  </svg>
</div>

<style>
  /* ── SHELVES ─── */
  .shelf {
    position: absolute;
    left: 0;
    right: 0;
    height: 84px;
  }

  .shelf--upper { top: 14%; }
  .shelf--lower { top: 46%; }

  .shelf-svg {
    width: 100%;
    height: 84px;
    display: block;
    image-rendering: pixelated;
  }

  /* ── WALL DECORATIONS ─── */
  .wall-deco {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .poster {
    position: absolute;
    top: 4%;
    left: 6%;
    width: clamp(48px, 5vw, 80px);
    height: auto;
    image-rendering: pixelated;
    box-shadow: 0 0 0 2px #241650, 4px 4px 0 rgba(0,0,0,0.4);
    transition: box-shadow 0.2s, transform 0.2s;
    pointer-events: all;  /* override parent's pointer-events: none */
  }

  .poster:hover {
    box-shadow: 0 0 0 2px var(--col-crt), 0 0 12px rgba(0,255,136,0.3), 4px 4px 0 rgba(0,0,0,0.4);
    transform: scale(1.05);
  }

  .wall-cables {
    position: absolute;
    top: 16%;
    left: 0;
    width: 100%;
    height: 120px;
    image-rendering: pixelated;
  }

  /* ── DESK OBJECTS ─── */
  /* "desk surface" sits at ~65% from top = ~35% from bottom of scene-hero.
     Desk objects bottom-align to the desk top (+4px for desk thickness). */
  .desk-left {
    position: absolute;
    bottom: 96px;
    left: 0;
    image-rendering: pixelated;
    z-index: 2;
  }

  .desk-right {
    position: absolute;
    bottom: 96px;
    right: 0;
    image-rendering: pixelated;
    z-index: 2;
  }

  .keyboard-row {
    position: absolute;
    bottom: 76px;
    left: 50%;
    transform: translateX(-50%);
    image-rendering: pixelated;
    z-index: 2;
  }

  /* ── LAMP GLOW ─── */
  .lamp-glow {
    position: absolute;
    bottom: 86px;
    left: 3%;
    pointer-events: none;
    width: clamp(180px, 22%, 320px);
    height: 45%;
    background: radial-gradient(ellipse at 30% 80%, rgba(240,180,20,0.18) 0%, rgba(240,160,10,0.06) 40%, transparent 70%);
    z-index: 2;
  }

  /* ── FLOOR ITEMS ─── */
  .laundry {
    position: absolute;
    bottom: 0;
    right: 2%;
    image-rendering: pixelated;
    z-index: 1;
  }

  .pc-tower {
    position: absolute;
    bottom: 0;
    left: 3%;
    image-rendering: pixelated;
    z-index: 1;
  }

  .power-strip {
    position: absolute;
    bottom: 4px;
    left: 22%;
    image-rendering: pixelated;
    z-index: 1;
  }

  .floor-cables {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    image-rendering: pixelated;
    z-index: 1;
  }

  /* ── STEAM ANIMATION ─── */
  .steam {
    animation: steam-rise 2.5s ease-in-out infinite;
  }
  .s1 { animation-delay: 0s; }
  .s2 { animation-delay: 0.6s; }
  .s3 { animation-delay: 1.2s; }

  @keyframes steam-rise {
    0%   { opacity: 0; transform: translateY(0) scaleX(1); }
    30%  { opacity: 0.5; }
    70%  { opacity: 0.3; transform: translateY(-14px) scaleX(1.4); }
    100% { opacity: 0; transform: translateY(-22px) scaleX(0.8); }
  }

  /* Book hover glow */
  :global(.book-hover:hover) {
    fill: rgba(255,255,255,0.14) !important;
  }

  /* ── MUG FALL ─── */
  .mug-group:not(.mug-falling):hover :global(rect:first-child) {
    filter: brightness(1.2);
  }

  :global(.mug-falling) {
    animation: mug-fall 0.6s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
    transform-origin: 54px 100px;
  }

  @keyframes mug-fall {
    0%   { transform: rotate(0deg)   translate(0px,  0px);  }
    25%  { transform: rotate(25deg)  translate(8px,  0px);  }
    55%  { transform: rotate(85deg)  translate(20px, 10px); }
    100% { transform: rotate(90deg)  translate(30px, 160px); opacity: 0; }
  }

  /* ── COFFEE SPLAT ─── */
  .coffee-splat {
    position: absolute;
    bottom: 30px;
    right: 60px;
    z-index: 2;
    animation: splat-in 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
  }

  @keyframes splat-in {
    from { transform: scale(0.2); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }
</style>

{#if activeQuote}
  <BookPopout quote={activeQuote} onclose={() => activeQuote = null} />
{/if}
