<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  let { data }: { data: PageData } = $props();

  let query = $state('');
  let inputEl: HTMLInputElement;

  onMount(() => inputEl?.focus());

  interface Result {
    title: string;
    desc: string;
    href: string;
    section: string;
    tags?: string[];
  }

  const results = $derived((): Result[] => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const out: Result[] = [];

    // Blog posts
    for (const p of data.posts) {
      if (
        p.title.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      ) {
        out.push({ title: p.title, desc: p.excerpt ?? '', href: `/blog/${p.slug}`, section: 'Log Book', tags: p.tags });
      }
    }

    // Projects
    for (const p of data.projects) {
      if (p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.tags.some(t => t.includes(q))) {
        out.push({ title: p.title, desc: p.desc, href: '/projects', section: 'Builds', tags: p.tags });
      }
    }

    // Active hobbies
    for (const h of data.hobbies) {
      if (h.title.toLowerCase().includes(q) || h.desc.toLowerCase().includes(q)) {
        out.push({ title: h.title, desc: h.desc, href: '/hobbies', section: 'Hobbies' });
      }
    }

    // Queued skills
    for (const s of data.queue) {
      if (s.title.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)) {
        out.push({ title: s.title, desc: s.desc, href: '/hobbies', section: 'Hobbies' });
      }
    }

    return out;
  });

  // Group by section
  const grouped = $derived(() => {
    const map = new Map<string, Result[]>();
    for (const r of results()) {
      const list = map.get(r.section) ?? [];
      list.push(r);
      map.set(r.section, list);
    }
    return map;
  });
</script>

<svelte:head>
  <title>Search — Senor Gatos</title>
</svelte:head>

<div class="container" style="padding-top:3rem; padding-bottom:4rem; max-width:760px;">

  <header style="margin-bottom:2rem;">
    <h1 style="font-size:14px;">Search the Workshop</h1>
  </header>

  <div class="search-wrap">
    <span class="search-icon mono" aria-hidden="true">⌕</span>
    <input
      bind:this={inputEl}
      bind:value={query}
      class="search-input"
      type="search"
      placeholder="search posts, projects, hobbies..."
      aria-label="Search"
      spellcheck="false"
      autocomplete="off"
    />
    {#if query}
      <span class="search-count mono">{results().length} result{results().length !== 1 ? 's' : ''}</span>
    {/if}
  </div>

  {#if query.length >= 2}
    {#if results().length === 0}
      <p class="no-results mono">nothing found for "{query}"</p>
    {:else}
      <div class="results">
        {#each [...grouped().entries()] as [section, items]}
          <div class="result-group">
            <h2 class="result-group__label">
              <span class="pixel-stamp stamp--amber" style="font-size:6px;">{section}</span>
            </h2>
            {#each items as item}
              <a href={item.href} class="result-card pixel-inset">
                <div class="result-card__title">{item.title}</div>
                {#if item.desc}
                  <p class="result-card__desc">{item.desc}</p>
                {/if}
                {#if item.tags?.length}
                  <div class="result-card__tags">
                    {#each item.tags as tag}
                      <span class="genre-tag">{tag}</span>
                    {/each}
                  </div>
                {/if}
              </a>
            {/each}
          </div>
        {/each}
      </div>
    {/if}
  {:else if query.length > 0}
    <p class="hint mono">keep typing...</p>
  {:else}
    <p class="hint mono">type to search across posts, projects &amp; hobbies</p>
  {/if}

</div>

<style>
  .search-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 2px solid var(--col-neon);
    background: var(--col-bench);
    padding: 0 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 0 16px rgba(0,255,136,0.15);
  }

  .search-icon {
    font-size: 24px;
    color: var(--col-neon);
    flex-shrink: 0;
  }

  .search-input {
    background: transparent;
    border: none;
    outline: none;
    font-family: var(--font-mono);
    font-size: 26px;
    color: var(--col-paper);
    padding: 0.75rem 0;
    width: 100%;
    caret-color: var(--col-neon);
  }

  .search-input::placeholder { color: var(--col-paper-dark); opacity: 0.5; }
  .search-input::-webkit-search-cancel-button { display: none; }

  .search-count {
    font-size: 15px;
    color: var(--col-paper-dark);
    flex-shrink: 0;
    white-space: nowrap;
  }

  .no-results, .hint {
    font-size: 18px;
    color: var(--col-paper-dark);
    padding: 1rem 0;
    opacity: 0.7;
  }

  .results { display: flex; flex-direction: column; gap: 2rem; }

  .result-group { display: flex; flex-direction: column; gap: 0.6rem; }
  .result-group__label { margin-bottom: 0.25rem; }

  .result-card {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 1rem 1.25rem;
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
    border-left: 4px solid var(--col-crt-dim);
    text-decoration: none;
    transition: border-color 0.12s, box-shadow 0.12s;
  }

  .result-card:hover {
    border-left-color: var(--col-neon);
    border-color: var(--col-neon);
    box-shadow: 0 0 12px rgba(0,255,136,0.15);
  }

  .result-card__title {
    font-family: var(--font-pixel);
    font-size: 9px;
    color: var(--col-crt);
    transition: color 0.12s;
  }

  .result-card:hover .result-card__title {
    color: var(--col-neon);
    text-shadow: 0 0 8px rgba(0,255,136,0.4);
  }

  .result-card__desc {
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: var(--col-paper-dark);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .result-card__tags {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }

  .genre-tag {
    font-family: var(--font-pixel);
    font-size: 5px;
    padding: 2px 5px;
    color: var(--col-paper-dark);
    border: 1px solid var(--col-pixel-border);
  }
</style>
