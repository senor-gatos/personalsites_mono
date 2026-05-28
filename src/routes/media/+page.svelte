<script lang="ts">
  import { collection, ALL_GENRES } from '$lib/data/media';

  let activeGenre  = $state('all');
  let activeFormat = $state('all');
  let activeType   = $state('all');
  let showWishlist = $state(false);

  const owned    = $derived(collection.filter(m => m.status === 'owned'));
  const wishlist = $derived(collection.filter(m => m.status === 'wishlist'));

  const filtered = $derived(
    owned.filter(m =>
      (activeGenre  === 'all' || m.genres.includes(activeGenre)) &&
      (activeFormat === 'all' || m.format === activeFormat) &&
      (activeType   === 'all' || m.type === activeType)
    )
  );

  const formatLabel = { dvd: 'DVD', bluray: 'Blu-ray', uhd: '4K UHD' };
  const formatStamp = { dvd: 'stamp--blue', bluray: 'stamp--crt', uhd: 'stamp--amber' };
</script>

<svelte:head>
  <title>Media Collection — Senor Gatos</title>
  <meta name="description" content="Physical media collection — DVDs, Blu-rays, and 4K UHDs. Served locally via Jellyfin." />
</svelte:head>

<div class="container" style="padding-top:3rem; padding-bottom:4rem;">

  <header class="page-header">
    <div class="pixel-stamp stamp--blue" style="margin-bottom:1rem;">THE LIBRARY</div>
    <h1>Media Collection</h1>
    <p class="mono" style="font-size:18px; color:var(--col-paper-dark); margin-top:0.5rem; line-height:1.6;">
      physical media — DVDs, Blu-rays &amp; 4K UHDs.<br/>
      served locally via <a href="/blog/building-my-jellyfin-server">Jellyfin</a>. no subscriptions.
    </p>
    <div style="display:flex; gap:0.5rem; margin-top:1rem; flex-wrap:wrap; align-items:center;">
      <span class="pixel-stamp stamp--crt" style="font-size:6px;">{owned.length} OWNED</span>
      {#if wishlist.length}
        <span class="pixel-stamp stamp--amber" style="font-size:6px;">{wishlist.length} ON WISHLIST</span>
      {/if}
    </div>
  </header>

  <!-- ── FILTERS ──────────────────────────────────────── -->
  <div class="filters">
    <div class="filter-group">
      <span class="filter-label mono">TYPE</span>
      <div class="filter-btns">
        {#each ['all', 'film', 'series'] as t}
          <button class="filter-btn" class:filter-btn--active={activeType === t} onclick={() => activeType = t}>
            {t === 'all' ? 'ALL' : t.toUpperCase()}
          </button>
        {/each}
      </div>
    </div>

    <div class="filter-group">
      <span class="filter-label mono">FORMAT</span>
      <div class="filter-btns">
        {#each ['all', 'dvd', 'bluray', 'uhd'] as f}
          <button class="filter-btn" class:filter-btn--active={activeFormat === f} onclick={() => activeFormat = f}>
            {f === 'all' ? 'ALL' : formatLabel[f as keyof typeof formatLabel]}
          </button>
        {/each}
      </div>
    </div>

    <div class="filter-group">
      <span class="filter-label mono">GENRE</span>
      <div class="filter-btns">
        <button class="filter-btn" class:filter-btn--active={activeGenre === 'all'} onclick={() => activeGenre = 'all'}>ALL</button>
        {#each ALL_GENRES as g}
          <button class="filter-btn" class:filter-btn--active={activeGenre === g} onclick={() => activeGenre = g}>
            {g.toUpperCase()}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- ── COLLECTION GRID ──────────────────────────────── -->
  {#if filtered.length === 0}
    <p class="mono" style="color:var(--col-paper-dark); padding:2rem 0;">nothing matches those filters.</p>
  {:else}
    <div class="media-grid">
      {#each filtered.sort((a,b) => a.title.localeCompare(b.title)) as item}
        <div class="media-card pixel-inset">
          <div class="media-card__header">
            <span class="pixel-stamp {formatStamp[item.format]}" style="font-size:5px;">{formatLabel[item.format]}</span>
            <span class="mono media-card__year">{item.year}</span>
          </div>
          <h3 class="media-card__title">{item.title}</h3>
          <div class="media-card__genres">
            {#each item.genres as g}
              <span class="genre-tag">{g}</span>
            {/each}
          </div>
          {#if item.note}
            <p class="media-card__note mono">{item.note}</p>
          {/if}
        </div>
      {/each}
    </div>
  {/if}

  <!-- ── WISHLIST ──────────────────────────────────────── -->
  {#if wishlist.length}
    <section style="margin-top:3rem;">
      <button class="wishlist-toggle mono" onclick={() => showWishlist = !showWishlist}>
        {showWishlist ? '▼' : '▶'} WISHLIST ({wishlist.length})
      </button>
      {#if showWishlist}
        <div class="media-grid" style="margin-top:1rem; opacity:0.6;">
          {#each wishlist as item}
            <div class="media-card pixel-inset">
              <div class="media-card__header">
                <span class="pixel-stamp stamp--red" style="font-size:5px;">WANT</span>
                <span class="mono media-card__year">{item.year}</span>
              </div>
              <h3 class="media-card__title">{item.title}</h3>
              <div class="media-card__genres">
                {#each item.genres as g}
                  <span class="genre-tag">{g}</span>
                {/each}
              </div>
              {#if item.note}
                <p class="media-card__note mono">{item.note}</p>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </section>
  {/if}

</div>

<style>
  .page-header {
    margin-bottom: 2rem;
    border-bottom: 4px solid var(--col-pixel-border);
    padding-bottom: 1.5rem;
  }

  /* ── FILTERS ─── */
  .filters {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2rem;
    padding: 1.25rem;
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
  }

  .filter-group {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .filter-label {
    font-size: 13px;
    color: var(--col-paper-dark);
    padding-top: 5px;
    width: 60px;
    flex-shrink: 0;
  }

  .filter-btns {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .filter-btn {
    font-family: var(--font-pixel);
    font-size: 6px;
    padding: 4px 8px;
    background: var(--col-bg);
    border: 2px solid var(--col-pixel-border);
    color: var(--col-paper-dark);
    cursor: pointer;
    letter-spacing: 0.5px;
    transition: color 0.1s, border-color 0.1s;
  }

  .filter-btn:hover { color: var(--col-neon); border-color: var(--col-neon); }

  .filter-btn--active {
    color: var(--col-neon);
    border-color: var(--col-neon);
    background: rgba(0,255,136,0.07);
  }

  /* ── GRID ─── */
  .media-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .media-card {
    padding: 1rem;
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .media-card:hover {
    border-color: var(--col-neon);
    box-shadow: 0 0 10px rgba(0,255,136,0.12);
  }

  .media-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .media-card__year {
    font-size: 14px;
    color: var(--col-paper-dark);
  }

  .media-card__title {
    font-size: 9px;
    color: var(--col-paper);
    line-height: 1.4;
  }

  .media-card__genres {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .genre-tag {
    font-family: var(--font-pixel);
    font-size: 5px;
    padding: 2px 5px;
    color: var(--col-paper-dark);
    border: 1px solid var(--col-pixel-border);
  }

  .media-card__note {
    font-size: 13px;
    color: var(--col-paper-dark);
    margin: 0;
    opacity: 0.7;
    font-style: italic;
  }

  /* ── WISHLIST ─── */
  .wishlist-toggle {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: var(--col-paper-dark);
    padding: 0;
    letter-spacing: 1px;
  }

  .wishlist-toggle:hover { color: var(--col-neon); }
</style>
