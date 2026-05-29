<script lang="ts">
  import { collection, ALL_GENRES, boardGames, books, lego } from '$lib/data/media';

  // ── FILM FILTERS ─────────────────────────────────────────────────────────────
  let activeGenre  = $state('all');
  let activeFormat = $state('all');
  let activeType   = $state('all');
  let showWishlist = $state(false);

  const owned    = $derived(collection.filter(m => m.status === 'owned'));
  const wishlist = $derived(collection.filter(m => m.status === 'wishlist'));

  const filteredFilms = $derived(
    owned.filter(m =>
      (activeGenre  === 'all' || m.genres.includes(activeGenre)) &&
      (activeFormat === 'all' || m.format === activeFormat) &&
      (activeType   === 'all' || m.type === activeType)
    )
  );

  const formatLabel = { dvd: 'DVD', bluray: 'Blu-ray', uhd: '4K UHD' };
  const formatStamp = { dvd: 'stamp--blue', bluray: 'stamp--crt', uhd: 'stamp--amber' };

  // ── BOOK FILTERS ─────────────────────────────────────────────────────────────
  let bookStatus = $state('all');
  let bookType   = $state('all');

  const filteredBooks = $derived(
    books.filter(b =>
      (bookStatus === 'all' || b.status === bookStatus) &&
      (bookType   === 'all' || b.type   === bookType)
    )
  );

  const bookStatusLabel: Record<string, string> = {
    read: 'READ', reading: 'READING', unread: 'TBR', wishlist: 'WANT',
  };
  const bookStatusStamp: Record<string, string> = {
    read: 'stamp--crt', reading: 'stamp--amber', unread: 'stamp--blue', wishlist: 'stamp--red',
  };

  // ── LEGO FILTERS ─────────────────────────────────────────────────────────────
  let legoTheme = $state('all');
  const legoThemes = $derived(['all', ...new Set(lego.map(s => s.theme))].sort((a,b) => a === 'all' ? -1 : b === 'all' ? 1 : a.localeCompare(b)));

  const filteredLego = $derived(
    lego.filter(s => legoTheme === 'all' || s.theme === legoTheme)
  );

  // ── TABS ─────────────────────────────────────────────────────────────────────
  type Tab = 'films' | 'games' | 'books' | 'lego';
  let activeTab = $state<Tab>('films');

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'films', label: 'Films & Series', icon: '📼', count: owned.length },
    { id: 'games', label: 'Board Games',    icon: '♟',  count: boardGames.filter(g => g.status === 'owned').length },
    { id: 'books', label: 'Books',          icon: '📚', count: books.filter(b => b.status !== 'wishlist').length },
    { id: 'lego',  label: 'Lego',           icon: '⬡',  count: lego.filter(s => s.status === 'owned').length },
  ];
</script>

<svelte:head>
  <title>Collection — Senor Gatos</title>
  <meta name="description" content="Physical media, board games, books and Lego collection." />
</svelte:head>

<div class="container" style="padding-top:3rem; padding-bottom:4rem;">

  <header class="page-header">
    <div class="pixel-stamp stamp--blue" style="margin-bottom:1rem;">THE COLLECTION</div>
    <h1>Collection</h1>
    <p class="mono" style="font-size:18px; color:var(--col-paper-dark); margin-top:0.5rem;">
      films, board games, books &amp; lego — things worth owning physically
    </p>
  </header>

  <!-- ── TABS ────────────────────────────────────────────── -->
  <div class="tab-bar">
    {#each tabs as tab}
      <button
        class="tab-btn"
        class:tab-btn--active={activeTab === tab.id}
        onclick={() => activeTab = tab.id}
      >
        <span class="tab-btn__icon">{tab.icon}</span>
        <span class="tab-btn__label">{tab.label}</span>
        <span class="tab-btn__count mono">{tab.count}</span>
      </button>
    {/each}
  </div>

  <!-- ══ FILMS ══════════════════════════════════════════════ -->
  {#if activeTab === 'films'}
    <div class="section-note mono">
      served locally via <a href="/blog/building-my-jellyfin-server">Jellyfin</a>. no subscriptions.
    </div>

    <div class="filters">
      <div class="filter-group">
        <span class="filter-label mono">TYPE</span>
        <div class="filter-btns">
          {#each ['all','film','series'] as t}
            <button class="filter-btn" class:filter-btn--active={activeType===t} onclick={() => activeType=t}>
              {t === 'all' ? 'ALL' : t.toUpperCase()}
            </button>
          {/each}
        </div>
      </div>
      <div class="filter-group">
        <span class="filter-label mono">FORMAT</span>
        <div class="filter-btns">
          {#each ['all','dvd','bluray','uhd'] as f}
            <button class="filter-btn" class:filter-btn--active={activeFormat===f} onclick={() => activeFormat=f}>
              {f === 'all' ? 'ALL' : formatLabel[f as keyof typeof formatLabel]}
            </button>
          {/each}
        </div>
      </div>
      <div class="filter-group">
        <span class="filter-label mono">GENRE</span>
        <div class="filter-btns">
          <button class="filter-btn" class:filter-btn--active={activeGenre==='all'} onclick={() => activeGenre='all'}>ALL</button>
          {#each ALL_GENRES as g}
            <button class="filter-btn" class:filter-btn--active={activeGenre===g} onclick={() => activeGenre=g}>{g.toUpperCase()}</button>
          {/each}
        </div>
      </div>
    </div>

    {#if filteredFilms.length === 0}
      <p class="mono empty-msg">nothing matches.</p>
    {:else}
      <div class="media-grid">
        {#each filteredFilms.sort((a,b) => a.title.localeCompare(b.title)) as item}
          <div class="media-card pixel-inset">
            <div class="media-card__header">
              <span class="pixel-stamp {formatStamp[item.format]}" style="font-size:5px;">{formatLabel[item.format]}</span>
              <span class="mono media-card__year">{item.year}</span>
            </div>
            <h3 class="media-card__title">{item.title}</h3>
            <div class="media-card__genres">
              {#each item.genres as g}<span class="genre-tag">{g}</span>{/each}
            </div>
            {#if item.note}<p class="media-card__note mono">{item.note}</p>{/if}
          </div>
        {/each}
      </div>
    {/if}

    {#if wishlist.length}
      <section class="wishlist-section">
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
                  {#each item.genres as g}<span class="genre-tag">{g}</span>{/each}
                </div>
                {#if item.note}<p class="media-card__note mono">{item.note}</p>{/if}
              </div>
            {/each}
          </div>
        {/if}
      </section>
    {/if}
  {/if}

  <!-- ══ BOARD GAMES ════════════════════════════════════════ -->
  {#if activeTab === 'games'}
    {@const ownedGames = boardGames.filter(g => g.status === 'owned')}
    {@const wishGames  = boardGames.filter(g => g.status === 'wishlist')}

    <div class="media-grid media-grid--games">
      {#each ownedGames.sort((a,b) => a.title.localeCompare(b.title)) as game}
        <div class="media-card media-card--game pixel-inset">
          <h3 class="media-card__title">{game.title}</h3>
          <div class="game-meta mono">
            <span>👥 {game.minPlayers}{game.maxPlayers !== game.minPlayers ? `–${game.maxPlayers}` : ''} players</span>
            <span>⏱ {game.playTime}</span>
          </div>
          <div class="media-card__genres">
            {#each game.genres as g}<span class="genre-tag">{g}</span>{/each}
          </div>
          {#if game.note}<p class="media-card__note mono">{game.note}</p>{/if}
        </div>
      {/each}
    </div>

    {#if wishGames.length}
      <section class="wishlist-section">
        <button class="wishlist-toggle mono" onclick={() => showWishlist = !showWishlist}>
          {showWishlist ? '▼' : '▶'} WISHLIST ({wishGames.length})
        </button>
        {#if showWishlist}
          <div class="media-grid media-grid--games" style="margin-top:1rem; opacity:0.6;">
            {#each wishGames as game}
              <div class="media-card pixel-inset">
                <span class="pixel-stamp stamp--red" style="font-size:5px; margin-bottom:0.5rem; display:inline-block;">WANT</span>
                <h3 class="media-card__title">{game.title}</h3>
                <div class="game-meta mono">
                  <span>👥 {game.minPlayers}–{game.maxPlayers}</span>
                  <span>⏱ {game.playTime}</span>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </section>
    {/if}
  {/if}

  <!-- ══ BOOKS ══════════════════════════════════════════════ -->
  {#if activeTab === 'books'}
    <div class="filters">
      <div class="filter-group">
        <span class="filter-label mono">STATUS</span>
        <div class="filter-btns">
          {#each ['all','read','reading','unread','wishlist'] as s}
            <button class="filter-btn" class:filter-btn--active={bookStatus===s} onclick={() => bookStatus=s}>
              {s === 'all' ? 'ALL' : bookStatusLabel[s] ?? s.toUpperCase()}
            </button>
          {/each}
        </div>
      </div>
      <div class="filter-group">
        <span class="filter-label mono">TYPE</span>
        <div class="filter-btns">
          {#each ['all','fiction','non-fiction','textbook','graphic-novel','reference'] as t}
            <button class="filter-btn" class:filter-btn--active={bookType===t} onclick={() => bookType=t}>
              {t === 'all' ? 'ALL' : t.toUpperCase()}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <div class="book-list">
      {#each filteredBooks.sort((a,b) => a.title.localeCompare(b.title)) as book}
        {@const ss = bookStatusStamp[book.status]}
        {@const sl = bookStatusLabel[book.status]}
        <div class="book-row pixel-inset">
          <div class="book-row__spine" style="background:{book.status === 'read' ? 'var(--col-crt-dim)' : book.status === 'reading' ? 'var(--col-amber-dim)' : 'var(--col-pixel-border)'}"></div>
          <div class="book-row__info">
            <div class="book-row__meta">
              <span class="pixel-stamp {ss}" style="font-size:5px;">{sl}</span>
              <span class="pixel-stamp stamp--blue" style="font-size:5px;">{book.type.toUpperCase()}</span>
              {#each book.genres as g}<span class="genre-tag">{g}</span>{/each}
            </div>
            <h3 class="book-row__title">{book.title}</h3>
            <p class="book-row__author mono">{book.author}{book.year ? ` · ${book.year}` : ''}</p>
            {#if book.note}<p class="media-card__note mono">{book.note}</p>{/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- ══ LEGO ═══════════════════════════════════════════════ -->
  {#if activeTab === 'lego'}
    {@const ownedLego = lego.filter(s => s.status === 'owned')}
    {@const wishLego  = lego.filter(s => s.status === 'wishlist')}

    <div class="filters">
      <div class="filter-group">
        <span class="filter-label mono">THEME</span>
        <div class="filter-btns">
          {#each legoThemes as t}
            <button class="filter-btn" class:filter-btn--active={legoTheme===t} onclick={() => legoTheme=t}>
              {t === 'all' ? 'ALL' : t.toUpperCase()}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <div class="lego-grid">
      {#each filteredLego.filter(s => s.status==='owned').sort((a,b) => a.name.localeCompare(b.name)) as set}
        <div class="lego-card pixel-inset">
          <div class="lego-card__header">
            <span class="pixel-stamp stamp--amber" style="font-size:5px;">{set.theme.toUpperCase()}</span>
            <span class="mono lego-card__num">#{set.setNumber}</span>
          </div>
          <h3 class="media-card__title">{set.name}</h3>
          <div class="lego-meta mono">
            <span>⬡ {set.pieces.toLocaleString()} pcs</span>
            {#if set.year}<span>{set.year}</span>{/if}
          </div>
          <div class="lego-status">
            <span class="pixel-stamp {set.built ? 'stamp--crt' : 'stamp--red'}" style="font-size:5px;">{set.built ? 'BUILT' : 'UNBUILT'}</span>
            {#if set.built}
              <span class="pixel-stamp {set.displayed ? 'stamp--amber' : 'stamp--blue'}" style="font-size:5px;">{set.displayed ? 'DISPLAYED' : 'BOXED'}</span>
            {/if}
          </div>
          {#if set.note}<p class="media-card__note mono">{set.note}</p>{/if}
        </div>
      {/each}
    </div>

    {#if wishLego.length}
      <section class="wishlist-section">
        <button class="wishlist-toggle mono" onclick={() => showWishlist = !showWishlist}>
          {showWishlist ? '▼' : '▶'} WISHLIST ({wishLego.length})
        </button>
        {#if showWishlist}
          <div class="lego-grid" style="margin-top:1rem; opacity:0.6;">
            {#each wishLego as set}
              <div class="lego-card pixel-inset">
                <div class="lego-card__header">
                  <span class="pixel-stamp stamp--red" style="font-size:5px;">WANT</span>
                  <span class="mono lego-card__num">#{set.setNumber}</span>
                </div>
                <h3 class="media-card__title">{set.name}</h3>
                <div class="lego-meta mono"><span>⬡ {set.pieces.toLocaleString()} pcs</span></div>
              </div>
            {/each}
          </div>
        {/if}
      </section>
    {/if}
  {/if}

</div>

<style>
  .page-header {
    margin-bottom: 2rem;
    border-bottom: 4px solid var(--col-pixel-border);
    padding-bottom: 1.5rem;
  }

  .section-note {
    font-size: 15px;
    color: var(--col-paper-dark);
    margin-bottom: 1.5rem;
  }

  /* ── TABS ─── */
  .tab-bar {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    border-bottom: 3px solid var(--col-pixel-border);
    padding-bottom: 0;
  }

  .tab-btn {
    font-family: var(--font-pixel);
    font-size: 7px;
    padding: 8px 14px;
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
    border-bottom: none;
    color: var(--col-paper-dark);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    letter-spacing: 0.5px;
    transition: color 0.1s, background 0.1s;
    position: relative;
    bottom: -3px;
  }

  .tab-btn:hover { color: var(--col-neon); }

  .tab-btn--active {
    color: var(--col-neon);
    background: var(--col-bg);
    border-color: var(--col-neon);
    border-bottom: 3px solid var(--col-bg);
  }

  .tab-btn__icon { font-size: 1rem; }
  .tab-btn__count { font-size: 12px; color: var(--col-paper-dark); opacity: 0.7; }

  /* ── FILTERS ─── */
  .filters {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2rem;
    padding: 1rem 1.25rem;
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
  }

  .filter-group { display: flex; align-items: flex-start; gap: 0.75rem; flex-wrap: wrap; }
  .filter-label { font-size: 13px; color: var(--col-paper-dark); padding-top: 5px; width: 60px; flex-shrink: 0; }
  .filter-btns  { display: flex; flex-wrap: wrap; gap: 4px; }

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

  .filter-btn:hover      { color: var(--col-neon); border-color: var(--col-neon); }
  .filter-btn--active    { color: var(--col-neon); border-color: var(--col-neon); background: rgba(0,255,136,0.07); }

  /* ── SHARED CARD STYLES ─── */
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

  .media-card__header   { display: flex; justify-content: space-between; align-items: center; }
  .media-card__year     { font-size: 14px; color: var(--col-paper-dark); }
  .media-card__title    { font-size: 9px; color: var(--col-paper); line-height: 1.4; }
  .media-card__genres   { display: flex; flex-wrap: wrap; gap: 4px; }
  .media-card__note     { font-size: 13px; color: var(--col-paper-dark); margin: 0; opacity: 0.7; font-style: italic; }

  .genre-tag {
    font-family: var(--font-pixel);
    font-size: 5px;
    padding: 2px 5px;
    color: var(--col-paper-dark);
    border: 1px solid var(--col-pixel-border);
  }

  /* ── FILMS ─── */
  .media-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
  }

  /* ── BOARD GAMES ─── */
  .media-grid--games { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }

  .game-meta {
    display: flex;
    gap: 1rem;
    font-size: 14px;
    color: var(--col-paper-dark);
    flex-wrap: wrap;
  }

  /* ── BOOKS ─── */
  .book-list { display: flex; flex-direction: column; gap: 0.6rem; }

  .book-row {
    display: flex;
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
    transition: border-color 0.15s;
    overflow: hidden;
  }

  .book-row:hover { border-color: var(--col-neon); }

  .book-row__spine {
    width: 8px;
    flex-shrink: 0;
    transition: background 0.2s;
  }

  .book-row__info {
    padding: 0.75rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    flex: 1;
  }

  .book-row__meta { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
  .book-row__title { font-size: 9px; color: var(--col-paper); }
  .book-row__author { font-size: 14px; color: var(--col-paper-dark); }

  /* ── LEGO ─── */
  .lego-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .lego-card { padding: 1rem; background: var(--col-bench); border: 2px solid var(--col-pixel-border); display: flex; flex-direction: column; gap: 0.5rem; transition: border-color 0.15s, box-shadow 0.15s; }
  .lego-card:hover { border-color: var(--col-neon); box-shadow: 0 0 10px rgba(0,255,136,0.12); }

  .lego-card__header { display: flex; justify-content: space-between; align-items: center; }
  .lego-card__num { font-size: 13px; color: var(--col-paper-dark); }
  .lego-meta { display: flex; gap: 0.75rem; font-size: 14px; color: var(--col-paper-dark); }
  .lego-status { display: flex; gap: 4px; flex-wrap: wrap; }

  /* ── WISHLIST ─── */
  .wishlist-section { margin-top: 2rem; }

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

  .empty-msg { color: var(--col-paper-dark); padding: 2rem 0; }
</style>
