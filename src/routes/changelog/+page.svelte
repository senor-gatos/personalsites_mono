<script lang="ts">
  import { changelog } from '$lib/data/changelog';

  const typeConfig = {
    feature: { label: 'FEATURE', stamp: 'stamp--crt' },
    fix:     { label: 'FIX',     stamp: 'stamp--red' },
    content: { label: 'CONTENT', stamp: 'stamp--amber' },
    design:  { label: 'DESIGN',  stamp: 'stamp--blue' },
  };
</script>

<svelte:head>
  <title>Changelog — Senor Gatos</title>
</svelte:head>

<div class="container" style="padding-top:3rem; padding-bottom:4rem; max-width:760px;">

  <header class="page-header">
    <div class="pixel-stamp stamp--amber" style="margin-bottom:1rem;">PATCH NOTES</div>
    <h1>Changelog</h1>
    <p class="mono" style="font-size:18px; color:var(--col-paper-dark); margin-top:0.5rem;">
      what changed, when, and why
    </p>
  </header>

  <div class="log">
    {#each changelog as entry}
      {@const cfg = typeConfig[entry.type]}
      <div class="log-entry">
        <div class="log-entry__marker" aria-hidden="true">
          <div class="marker-dot"></div>
          <div class="marker-line"></div>
        </div>
        <div class="log-entry__body">
          <div class="log-entry__header">
            <span class="mono log-entry__date">{entry.date}</span>
            <span class="pixel-stamp {cfg.stamp}" style="font-size:6px;">{cfg.label}</span>
          </div>
          <h2 class="log-entry__title">{entry.title}</h2>
          <ul class="log-entry__items">
            {#each entry.items as item}
              <li>
                <span class="mono" style="color:var(--col-crt); margin-right:8px;">+</span>
                {item}
              </li>
            {/each}
          </ul>
        </div>
      </div>
    {/each}
  </div>

</div>

<style>
  .page-header {
    margin-bottom: 3rem;
    border-bottom: 4px solid var(--col-pixel-border);
    padding-bottom: 1.5rem;
  }

  .log {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .log-entry {
    display: flex;
    gap: 1.5rem;
  }

  /* Timeline marker */
  .log-entry__marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 16px;
  }

  .marker-dot {
    width: 12px;
    height: 12px;
    background: var(--col-crt);
    flex-shrink: 0;
    box-shadow: 0 0 8px var(--col-neon-dim);
    margin-top: 6px;
  }

  .marker-line {
    flex: 1;
    width: 2px;
    background: var(--col-pixel-border);
    min-height: 24px;
    margin-top: 4px;
  }

  .log-entry:last-child .marker-line { display: none; }

  .log-entry__body {
    padding-bottom: 2.5rem;
    flex: 1;
  }

  .log-entry__header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .log-entry__date {
    font-size: 16px;
    color: var(--col-paper-dark);
  }

  .log-entry__title {
    font-size: 10px;
    color: var(--col-paper);
    margin-bottom: 0.75rem;
  }

  .log-entry__items {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .log-entry__items li {
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--col-paper-dark);
    line-height: 1.5;
  }
</style>
