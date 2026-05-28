<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { collect } from '$lib/inventory';

  let { data }: { data: PageData } = $props();
  onMount(() => collect('logbook'));

  let search     = $state('');
  let activeTag  = $state('all');

  const allTags = $derived(
    ['all', ...new Set(data.posts.flatMap(p => p.tags))].sort((a, b) =>
      a === 'all' ? -1 : b === 'all' ? 1 : a.localeCompare(b)
    )
  );

  const filtered = $derived(
    data.posts.filter(p => {
      const matchesTag    = activeTag === 'all' || p.tags.includes(activeTag);
      const q             = search.toLowerCase();
      const matchesSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q));
      return matchesTag && matchesSearch;
    })
  );
</script>

<svelte:head>
  <title>Log Book — Senor Gatos</title>
</svelte:head>

<div class="container" style="padding-top:3rem; padding-bottom:4rem;">

  <header class="page-header">
    <div class="page-header__tab pixel-stamp stamp--amber">LOG BOOK</div>
    <h1>Workshop Log</h1>
    <p class="mono" style="font-size:20px; color:var(--col-paper-dark); margin-top:0.5rem;">
      field notes, articles &amp; miscellaneous transmissions
    </p>
  </header>

  {#if data.posts.length === 0}
    <div class="empty-state pixel-box" style="padding:3rem; text-align:center; margin-top:2rem;">
      <p class="mono" style="font-size:22px; color:var(--col-paper-dark);">
        no entries yet.<br/>check back soon.
      </p>
      <span class="blink" style="color:var(--col-crt); font-size:24px;">_</span>
    </div>
  {:else}
    <!-- ── SEARCH + FILTER ───────────────────────────── -->
    <div class="controls">
      <div class="search-wrap">
        <span class="search-icon mono" aria-hidden="true">⌕</span>
        <input
          class="search-input"
          type="search"
          placeholder="search entries..."
          bind:value={search}
          aria-label="Search posts"
        />
      </div>
      <div class="tag-filters">
        {#each allTags as tag}
          <button
            class="tag-btn"
            class:tag-btn--active={activeTag === tag}
            onclick={() => activeTag = tag}
          >
            {tag === 'all' ? 'ALL' : tag}
          </button>
        {/each}
      </div>
    </div>

    <!-- ── RESULTS ──────────────────────────────────── -->
    {#if filtered.length === 0}
      <p class="mono" style="color:var(--col-paper-dark); padding:2rem 0;">
        no entries match. <button class="reset-btn mono" onclick={() => { search = ''; activeTag = 'all'; }}>clear filters</button>
      </p>
    {:else}
      <div class="post-list">
        {#each filtered as post}
          <article class="post-card pixel-inset">
            <div class="post-card__meta">
              <span class="mono post-card__date">{post.date}</span>
              <div class="post-card__tags">
                {#each post.tags as tag}
                  <button
                    class="pixel-stamp stamp--amber tag-chip"
                    style="font-size:6px; cursor:pointer; background:none; border-width:2px;"
                    class:tag-chip--active={activeTag === tag}
                    onclick={() => activeTag = activeTag === tag ? 'all' : tag}
                  >{tag}</button>
                {/each}
              </div>
            </div>
            <h2 class="post-card__title">
              <a href="/blog/{post.slug}">{post.title}</a>
            </h2>
            {#if post.excerpt}
              <p class="post-card__excerpt">{post.excerpt}</p>
            {/if}
            <a href="/blog/{post.slug}" class="btn-pixel" style="margin-top:1rem; font-size:7px;">
              READ ENTRY →
            </a>
          </article>
        {/each}
      </div>
    {/if}
  {/if}
</div>

<style>
  .page-header {
    margin-bottom: 2rem;
    border-bottom: 4px solid var(--col-pixel-border);
    padding-bottom: 1.5rem;
  }

  .page-header__tab { margin-bottom: 1rem; }

  /* ── CONTROLS ─── */
  .controls {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2rem;
    padding: 1rem 1.25rem;
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
  }

  .search-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 2px solid var(--col-pixel-border);
    background: var(--col-bg);
    padding: 0 0.75rem;
    transition: border-color 0.15s;
  }

  .search-wrap:focus-within {
    border-color: var(--col-neon);
  }

  .search-icon {
    font-size: 20px;
    color: var(--col-paper-dark);
    flex-shrink: 0;
  }

  .search-input {
    background: transparent;
    border: none;
    outline: none;
    font-family: var(--font-mono);
    font-size: 20px;
    color: var(--col-paper);
    padding: 0.5rem 0;
    width: 100%;
    caret-color: var(--col-neon);
  }

  .search-input::placeholder { color: var(--col-paper-dark); opacity: 0.5; }

  /* hide browser search clear button */
  .search-input::-webkit-search-cancel-button { display: none; }

  .tag-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .tag-btn {
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

  .tag-btn:hover      { color: var(--col-neon); border-color: var(--col-neon); }
  .tag-btn--active    { color: var(--col-neon); border-color: var(--col-neon); background: rgba(0,255,136,0.07); }

  .tag-chip { font-family: var(--font-pixel); letter-spacing: 0.5px; }
  .tag-chip--active { background: rgba(0,255,136,0.1) !important; }

  .reset-btn {
    background: none;
    border: none;
    color: var(--col-crt);
    cursor: pointer;
    font-size: 16px;
    padding: 0;
    text-decoration: underline;
  }

  /* ── POST CARDS ─── */
  .post-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .post-card {
    padding: 1.5rem 2rem;
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
    border-left: 6px solid var(--col-crt-dim);
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .post-card:hover {
    border-left-color: var(--col-neon);
    border-color: var(--col-neon);
    box-shadow: 0 0 16px rgba(0,255,136,0.15);
  }

  .post-card:hover .post-card__title a {
    color: var(--col-neon);
    text-shadow: 0 0 8px rgba(0,255,136,0.5);
  }

  .post-card__meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
  }

  .post-card__date    { font-size: 16px; color: var(--col-paper-dark); }
  .post-card__tags    { display: flex; gap: 6px; flex-wrap: wrap; }

  .post-card__title   { font-size: 11px; margin: 0.5rem 0; }
  .post-card__title a { color: var(--col-crt); text-decoration: none; transition: color 0.15s, text-shadow 0.15s; }
  .post-card__title a:hover { color: var(--col-neon); }

  .post-card__excerpt { font-family: var(--font-body); color: var(--col-paper-dark); font-size: 1rem; margin: 0; }
</style>
