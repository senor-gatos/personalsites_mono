<script lang="ts">
  import { scripts } from '$lib/data/scripts';

  const typeConfig: Record<string, { label: string; stamp: string }> = {
    sketch:    { label: 'SKETCH',    stamp: 'stamp--amber' },
    script:    { label: 'SCRIPT',    stamp: 'stamp--blue' },
    bit:       { label: 'BIT',       stamp: 'stamp--crt' },
    monologue: { label: 'MONOLOGUE', stamp: 'stamp--red' },
    premise:   { label: 'PREMISE',   stamp: 'stamp--amber' },
  };

  const statusConfig: Record<string, { label: string; stamp: string }> = {
    performed:   { label: 'PERFORMED',   stamp: 'stamp--crt' },
    draft:       { label: 'DRAFT',       stamp: 'stamp--amber' },
    shelved:     { label: 'SHELVED',     stamp: 'stamp--red' },
    'in-progress': { label: 'WIP',       stamp: 'stamp--blue' },
  };

  let expandedId = $state<string | null>(null);
</script>

<svelte:head>
  <title>Scripts & Sketches — Senor Gatos</title>
  <meta name="description" content="Comedy writing — sketches, scripts, bits, and premises." />
</svelte:head>

<div class="container" style="padding-top:3rem; padding-bottom:4rem; max-width:860px;">

  <header class="page-header">
    <div class="pixel-stamp stamp--amber" style="margin-bottom:1rem;">THE WRITING ROOM</div>
    <h1>Scripts & Sketches</h1>
    <p class="mono" style="font-size:18px; color:var(--col-paper-dark); margin-top:0.5rem;">
      comedy writing — sketches, scripts, bits &amp; premises
    </p>
  </header>

  {#if scripts.length === 0}
    <div class="empty pixel-inset" style="padding:3rem; text-align:center;">
      <p class="mono" style="color:var(--col-paper-dark); font-size:20px;">no scripts yet.<br/>the page is blank.<br/>that's the writer's condition.</p>
      <span class="blink" style="color:var(--col-crt);">_</span>
    </div>
  {:else}
    <div class="script-list">
      {#each scripts as script}
        {@const tc = typeConfig[script.type]}
        {@const sc = statusConfig[script.status]}
        <div class="script-card pixel-inset" class:script-card--open={expandedId === script.id}>

          <div class="script-card__header">
            <div class="script-card__meta">
              <span class="mono script-card__date">{script.date}</span>
              <span class="pixel-stamp {tc.stamp}" style="font-size:6px;">{tc.label}</span>
              <span class="pixel-stamp {sc.stamp}" style="font-size:6px;">{sc.label}</span>
              {#each script.tags as tag}
                <span class="pixel-stamp stamp--amber" style="font-size:5px;">{tag}</span>
              {/each}
            </div>

            <h2 class="script-card__title">{script.title}</h2>
            <p class="script-card__logline">{script.logline}</p>

            <div class="script-card__actions">
              {#if script.content}
                <button
                  class="btn-pixel"
                  style="font-size:7px;"
                  onclick={() => expandedId = expandedId === script.id ? null : script.id}
                >
                  {expandedId === script.id ? '▲ CLOSE' : '▼ READ'}
                </button>
              {/if}
              {#if script.link}
                <a href={script.link} target="_blank" rel="noopener noreferrer" class="btn-pixel" style="font-size:7px;">
                  OPEN →
                </a>
              {/if}
            </div>
          </div>

          {#if expandedId === script.id && script.content}
            <div class="script-content content-area">
              <pre class="script-text">{script.content}</pre>
            </div>
          {/if}

        </div>
      {/each}
    </div>
  {/if}

</div>

<style>
  .page-header {
    margin-bottom: 3rem;
    border-bottom: 4px solid var(--col-pixel-border);
    padding-bottom: 1.5rem;
  }

  .script-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .script-card {
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
    border-left: 6px solid var(--col-pixel-border);
    transition: border-color 0.15s;
  }

  .script-card:hover,
  .script-card--open {
    border-left-color: var(--col-amber);
  }

  .script-card__header {
    padding: 1.25rem 1.5rem;
  }

  .script-card__meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
  }

  .script-card__date {
    font-size: 14px;
    color: var(--col-paper-dark);
  }

  .script-card__title {
    font-size: 11px;
    color: var(--col-crt);
    margin-bottom: 0.5rem;
  }

  .script-card__logline {
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--col-paper-dark);
    margin: 0 0 1rem;
    font-style: italic;
  }

  .script-card__actions {
    display: flex;
    gap: 0.75rem;
  }

  /* Script content — formatted like a real script */
  .script-content {
    border-top: 2px solid var(--col-pixel-border);
    max-width: 100%;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .script-text {
    font-family: 'Courier New', 'Courier', monospace;
    font-size: 0.9rem;
    color: var(--col-paper);
    white-space: pre-wrap;
    line-height: 1.7;
    margin: 0;
  }

  .empty {
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
  }
</style>
