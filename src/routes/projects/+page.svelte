<script lang="ts">
  import { onMount } from 'svelte';
  import { projects } from '$lib/data/projects';
  import { collect } from '$lib/inventory';
  onMount(() => collect('blueprint'));

  const statusConfig = {
    'complete':    { label: 'COMPLETE',    stamp: 'stamp--crt'   },
    'in-progress': { label: 'IN PROGRESS', stamp: 'stamp--amber' },
    'planning':    { label: 'PLANNING',    stamp: 'stamp--blue'  },
    'shelved':     { label: 'SHELVED',     stamp: 'stamp--red'   },
    'obsolete':    { label: 'OBSOLETE',    stamp: 'stamp--red'   },
  };

  type Status = keyof typeof statusConfig | 'all';
  let activeFilter = $state<Status>('all');

  const filtered = $derived(
    activeFilter === 'all'
      ? projects
      : projects.filter(p => p.status === activeFilter)
  );

  const counts = $derived(
    Object.fromEntries(
      Object.keys(statusConfig).map(s => [s, projects.filter(p => p.status === s).length])
    )
  );
</script>

<svelte:head>
  <title>Builds — Senor Gatos</title>
</svelte:head>

<div class="container" style="padding-top:3rem; padding-bottom:4rem;">

  <header class="page-header">
    <div class="pixel-stamp stamp--blue" style="margin-bottom:1rem;">BLUEPRINT ARCHIVE</div>
    <h1>Builds</h1>
    <p class="mono" style="font-size:20px; color:var(--col-paper-dark); margin-top:0.5rem;">
      things i have built, am building, or thought about building
    </p>
  </header>

  <!-- Status filters -->
  <div class="filters">
    <button class="filter-btn" class:filter-btn--active={activeFilter === 'all'} onclick={() => activeFilter = 'all'}>
      ALL <span class="filter-count">{projects.length}</span>
    </button>
    {#each Object.entries(statusConfig) as [key, cfg]}
      {#if counts[key] > 0}
        <button
          class="filter-btn filter-btn--{key}"
          class:filter-btn--active={activeFilter === key}
          onclick={() => activeFilter = activeFilter === key ? 'all' : key as Status}
        >
          {cfg.label} <span class="filter-count">{counts[key]}</span>
        </button>
      {/if}
    {/each}
  </div>

  <!-- Wooden shelf -->
  <div class="shelf" aria-label="Projects shelf">
    <div class="shelf__bracket shelf__bracket--left" aria-hidden="true"></div>
    <div class="shelf__bracket shelf__bracket--right" aria-hidden="true"></div>

    <div class="shelf__board" aria-hidden="true"></div>

    <div class="shelf__items">
      {#each filtered as project}
        {@const status = statusConfig[project.status]}
        <div class="shelf-item pixel-box" data-status={project.status}>
          <div class="shelf-item__placard">
            <span class="pixel-stamp {status.stamp}" style="font-size:6px">{status.label}</span>
            <span class="mono shelf-item__year">{project.year}</span>
          </div>

          <h2 class="shelf-item__title">{project.title}</h2>
          <p class="shelf-item__desc">{project.desc}</p>

          <div class="shelf-item__tags">
            {#each project.tags as tag}
              <span class="pixel-stamp stamp--amber" style="font-size:5px">{tag}</span>
            {/each}
          </div>

          {#if project.link}
            <a href={project.link} class="btn-pixel" style="margin-top:1rem; font-size:6px;" target="_blank" rel="noopener noreferrer">
              VIEW →
            </a>
          {/if}
        </div>
      {/each}

      <!-- Empty slot placeholder -->
      <div class="shelf-item shelf-item--empty pixel-inset" aria-hidden="true">
        <span class="mono" style="color:var(--col-paper-dark); font-size:18px;">[ more coming ]</span>
        <span class="blink" style="color:var(--col-crt);">_</span>
      </div>
    </div>

    <div class="shelf__plank" aria-hidden="true"></div>
  </div>

</div>

<style>
  .page-header {
    margin-bottom: 2rem;
    border-bottom: 4px solid var(--col-pixel-border);
    padding-bottom: 1.5rem;
  }

  /* ── FILTERS ───────────────────────────────── */
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 2rem;
  }

  .filter-btn {
    font-family: var(--font-pixel);
    font-size: 7px;
    padding: 6px 12px;
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
    color: var(--col-paper-dark);
    cursor: pointer;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.1s, border-color 0.1s;
  }

  .filter-btn:hover { color: var(--col-neon); border-color: var(--col-neon); }

  .filter-btn--active          { color: var(--col-paper); border-color: var(--col-paper); background: rgba(255,255,255,0.05); }
  .filter-btn--in-progress.filter-btn--active { color: var(--col-amber); border-color: var(--col-amber); }
  .filter-btn--complete.filter-btn--active    { color: var(--col-crt);   border-color: var(--col-crt); }
  .filter-btn--planning.filter-btn--active    { color: var(--col-blue);  border-color: var(--col-blue); }
  .filter-btn--shelved.filter-btn--active,
  .filter-btn--obsolete.filter-btn--active    { color: var(--col-red);   border-color: var(--col-red); }

  .filter-count {
    font-family: var(--font-mono);
    font-size: 14px;
    opacity: 0.6;
  }

  /* ── SHELF ─────────────────────────────────── */
  .shelf {
    position: relative;
    padding: 0 3rem;
  }

  .shelf__bracket {
    position: absolute;
    top: 0;
    width: 20px;
    height: 100%;
    background: var(--col-wood-light);
    border: 2px solid var(--col-pixel-border);
  }

  .shelf__bracket--left  { left: 0; }
  .shelf__bracket--right { right: 0; }

  .shelf__board {
    height: 12px;
    background: var(--col-wood-light);
    border: 2px solid var(--col-pixel-border);
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 0 0 rgba(0,0,0,0.3);
  }

  .shelf__plank {
    height: 16px;
    background: var(--col-wood-mid);
    border: 2px solid var(--col-pixel-border);
    margin-top: 1.5rem;
    box-shadow: 0 6px 0 0 rgba(0,0,0,0.4);
  }

  .shelf__items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.5rem;
  }

  /* ── SHELF ITEM (project card) ─────────────── */
  .shelf-item {
    background: var(--col-bench);
    padding: 1.5rem;
    border: 2px solid var(--col-pixel-border);
    box-shadow:
      4px 4px 0 0 rgba(0,0,0,0.5),
      inset 1px 1px 0 0 rgba(255,255,255,0.04);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: transform 0.1s;
  }

  .shelf-item:hover {
    transform: translateY(-3px);
    border-color: var(--col-neon);
    box-shadow:
      4px 4px 0 0 rgba(0,0,0,0.5),
      0 0 16px rgba(0,255,136,0.2);
  }

  .shelf-item:hover .shelf-item__title {
    color: var(--col-neon);
    text-shadow: 0 0 8px rgba(0,255,136,0.4);
  }

  .shelf-item[data-status='complete']    { border-top: 4px solid var(--col-crt); }
  .shelf-item[data-status='in-progress'] { border-top: 4px solid var(--col-amber); }
  .shelf-item[data-status='shelved']     { border-top: 4px solid var(--col-red); }
  .shelf-item[data-status='planning']    { border-top: 4px solid var(--col-blue); }
  .shelf-item[data-status='obsolete']    { border-top: 4px solid var(--col-red); opacity: 0.7; }

  .shelf-item--empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 120px;
    opacity: 0.4;
    background: var(--col-bg);
  }

  .shelf-item__placard {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .shelf-item__year {
    font-size: 16px;
    color: var(--col-paper-dark);
  }

  .shelf-item__title {
    font-size: 9px;
    color: var(--col-crt);
  }

  .shelf-item__desc {
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: var(--col-paper-dark);
    flex: 1;
    margin: 0;
  }

  .shelf-item__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
</style>
