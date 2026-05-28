<script lang="ts">
  import BookPopout from '$lib/components/BookPopout.svelte';
  import { getBookEgg, pickQuote, pickCheese } from '$lib/data/bookEggs';
  import type { MovieQuote } from '$lib/data/bookEggs';

  const books = [
    { x: 4,   w: 11, h: 52, c: '#c04444' },
    { x: 17,  w: 13, h: 64, c: '#4455c0' },
    { x: 32,  w: 10, h: 44, c: '#44a044' },
    { x: 44,  w: 12, h: 58, c: '#c08030' },
    { x: 58,  w: 10, h: 48, c: '#9040c0' },
    { x: 70,  w: 13, h: 62, c: '#c04444' },
    { x: 85,  w: 10, h: 42, c: '#4080c0' },
    { x: 97,  w: 12, h: 54, c: '#40a060' },
    { x: 111, w: 10, h: 46, c: '#b05030' },
    { x: 123, w: 13, h: 60, c: '#304090' },
    { x: 138, w: 10, h: 50, c: '#808020' },
    { x: 150, w: 12, h: 44, c: '#c04080' },
    { x: 164, w: 10, h: 56, c: '#4444c0' },
    { x: 176, w: 13, h: 38, c: '#30a050' },
    { x: 191, w: 10, h: 62, c: '#a03060' },
  ];

  const SHELF_Y = 68;

  let activeQuote = $state<MovieQuote | null>(null);

  function clickBook(index: number) {
    const egg = getBookEgg(index);
    if (egg === 'quote') {
      activeQuote = pickQuote(index);
    } else {
      const cheese = pickCheese(index);
      window.open(cheese.url, '_blank', 'noopener,noreferrer');
    }
  }
</script>

<div class="shelf-corner">
  <svg
    viewBox="0 0 204 76"
    width="204"
    height="76"
    style="image-rendering:pixelated; display:block;"
    role="img"
    aria-label="Bookshelf — click a book"
  >
    <!-- shelf board -->
    <rect x="0" y={SHELF_Y} width="204" height="8" fill="#241650"/>
    <rect x="0" y={SHELF_Y} width="204" height="2" fill="#3a2478"/>
    <rect x="0" y={SHELF_Y} width="4" height="8" fill="#1a1040"/>

    <!-- clickable books -->
    {#each books as b, i}
      <g
        role="button"
        tabindex="0"
        aria-label="Click to open book {i + 1}"
        style="cursor:pointer;"
        onclick={() => clickBook(i)}
        onkeydown={(e) => e.key === 'Enter' && clickBook(i)}
      >
        <rect x={b.x} y={SHELF_Y - b.h} width={b.w} height={b.h} fill={b.c}/>
        <rect x={b.x} y={SHELF_Y - b.h} width={b.w} height={2} fill="rgba(255,255,255,0.18)"/>
        <rect x={b.x} y={SHELF_Y - 4}   width={b.w} height={4} fill="rgba(0,0,0,0.22)"/>
        <!-- hover highlight (invisible until hover, handled by CSS) -->
        <rect class="book-hover" x={b.x} y={SHELF_Y - b.h} width={b.w} height={b.h} fill="rgba(255,255,255,0)" />
      </g>
    {/each}

    <!-- knick-knack -->
    <rect x="196" y={SHELF_Y - 20} width="8" height="20" fill="#1a1828"/>
    <rect x="197" y={SHELF_Y - 18} width="6" height="12" fill="#101020"/>
    <rect x="198" y={SHELF_Y - 14} width="4"  height="4"  fill="#00ff88" opacity="0.8"/>
  </svg>
</div>

{#if activeQuote}
  <BookPopout quote={activeQuote} onclose={() => activeQuote = null} />
{/if}

<style>
  .shelf-corner {
    position: fixed;
    top: var(--nav-h);
    right: 0;
    z-index: 5;        /* raised so books are clickable above page content */
    opacity: 0.6;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
    transition: opacity 0.2s;
  }

  .shelf-corner:hover {
    opacity: 0.9;
  }

  /* Book hover — brighten the book slightly */
  :global(.book-hover:hover) {
    fill: rgba(255,255,255,0.12) !important;
  }
</style>
