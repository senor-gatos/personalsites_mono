<script lang="ts">
  import { nowPage } from '$lib/data/now-page';

  const sections = [
    { key: 'listening', label: 'LISTENING TO', icon: '♪' },
    { key: 'reading',   label: 'READING',       icon: '📖' },
    { key: 'watching',  label: 'WATCHING',       icon: '▶' },
    { key: 'playing',   label: 'PLAYING',        icon: '🕹' },
  ] as const;
</script>

<svelte:head>
  <title>Now — Senor Gatos</title>
  <meta name="description" content="What I'm up to right now." />
</svelte:head>

<div class="container" style="padding-top:3rem; padding-bottom:4rem; max-width:720px;">

  <header class="page-header">
    <div class="pixel-stamp stamp--crt" style="margin-bottom:1rem;">STATUS</div>
    <h1>Now</h1>
    <p class="mono" style="font-size:16px; color:var(--col-paper-dark); margin-top:0.5rem;">
      what I'm up to as of <span style="color:var(--col-paper)">{nowPage.updated}</span>
    </p>
    <p class="mono" style="font-size:14px; color:var(--col-paper-dark); margin-top:0.25rem;">
      {nowPage.location}
    </p>
  </header>

  <!-- Currently consuming -->
  <section class="now-section">
    <h2 class="now-section__title">
      <span class="led led--amber" style="margin-right:10px;"></span>
      Currently
    </h2>
    <div class="now-grid">
      {#each sections as s}
        {@const data = nowPage[s.key]}
        {#if data.item}
          <div class="now-card pixel-inset">
            <div class="now-card__label mono">{s.icon} {s.label}</div>
            <div class="now-card__item">{data.item}</div>
            {#if data.detail}
              <div class="now-card__detail mono">{data.detail}</div>
            {/if}
            {#if data.note}
              <p class="now-card__note">{data.note}</p>
            {/if}
          </div>
        {/if}
      {/each}
    </div>
  </section>

  <!-- Working on -->
  <section class="now-section">
    <h2 class="now-section__title">
      <span class="led" style="margin-right:10px;"></span>
      Working On
    </h2>
    <ul class="now-list">
      {#each nowPage.working_on as item}
        <li class="now-list__item">
          <span class="now-list__bullet mono" aria-hidden="true">→</span>
          {item}
        </li>
      {/each}
    </ul>
  </section>

  <!-- Thinking about -->
  <section class="now-section">
    <h2 class="now-section__title">
      <span class="led led--blue" style="margin-right:10px;"></span>
      Thinking About
    </h2>
    <ul class="now-list">
      {#each nowPage.thinking_about as item}
        <li class="now-list__item">
          <span class="now-list__bullet mono" aria-hidden="true">→</span>
          {item}
        </li>
      {/each}
    </ul>
  </section>

  <p class="now-footer mono">
    inspired by <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer">nownownow.com</a> —
    a movement of people sharing what they're up to right now.
    edit <code>src/lib/data/now-page.ts</code> to update.
  </p>

</div>

<style>
  .page-header {
    margin-bottom: 3rem;
    border-bottom: 4px solid var(--col-pixel-border);
    padding-bottom: 1.5rem;
  }

  .now-section { margin-bottom: 2.5rem; }

  .now-section__title {
    font-size: 10px;
    color: var(--col-crt);
    display: flex;
    align-items: center;
    margin-bottom: 1.25rem;
  }

  .now-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
  }

  .now-card {
    padding: 1rem 1.25rem;
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .now-card__label {
    font-size: 12px;
    color: var(--col-paper-dark);
    margin-bottom: 0.2rem;
  }

  .now-card__item {
    font-family: var(--font-pixel);
    font-size: 9px;
    color: var(--col-paper);
    line-height: 1.4;
  }

  .now-card__detail {
    font-size: 16px;
    color: var(--col-crt);
  }

  .now-card__note {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--col-paper-dark);
    margin: 0.2rem 0 0;
    font-style: italic;
  }

  .now-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .now-list__item {
    display: flex;
    gap: 0.75rem;
    font-family: var(--font-body);
    font-size: 1.05rem;
    color: var(--col-paper);
    line-height: 1.6;
  }

  .now-list__bullet {
    color: var(--col-crt);
    flex-shrink: 0;
    font-size: 18px;
    padding-top: 2px;
  }

  .now-footer {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 2px dashed var(--col-pixel-border);
    font-size: 14px;
    color: var(--col-paper-dark);
    line-height: 1.7;
  }

  .now-footer code {
    font-family: var(--font-mono);
    font-size: 16px;
    color: var(--col-crt);
  }
</style>
