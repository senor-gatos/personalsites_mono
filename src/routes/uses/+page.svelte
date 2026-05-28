<script lang="ts">
  import { uses } from '$lib/data/uses';
</script>

<svelte:head>
  <title>Uses — Senor Gatos</title>
  <meta name="description" content="Hardware, software, and tools in the workshop." />
</svelte:head>

<div class="container" style="padding-top:3rem; padding-bottom:4rem; max-width:860px;">

  <header class="page-header">
    <div class="pixel-stamp stamp--crt" style="margin-bottom:1rem;">INVENTORY</div>
    <h1>Uses & Setup</h1>
    <p class="mono" style="font-size:18px; color:var(--col-paper-dark); margin-top:0.5rem;">
      what's on the bench, in the rack, and running in the background
    </p>
  </header>

  <div class="uses-sections">
    {#each uses as section}
      <section class="uses-section">
        <h2 class="uses-section__title">
          <span class="uses-section__icon">{section.icon}</span>
          {section.title}
        </h2>
        <div class="uses-list">
          {#each section.items as item}
            <div class="uses-item pixel-inset">
              <div class="uses-item__name">
                {#if item.link}
                  <a href={item.link} target="_blank" rel="noopener noreferrer">{item.name}</a>
                {:else}
                  <span>{item.name}</span>
                {/if}
              </div>
              <p class="uses-item__desc">{item.desc}</p>
            </div>
          {/each}
        </div>
      </section>
    {/each}
  </div>

</div>

<style>
  .page-header {
    margin-bottom: 3rem;
    border-bottom: 4px solid var(--col-pixel-border);
    padding-bottom: 1.5rem;
  }

  .uses-sections {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .uses-section__title {
    font-size: 10px;
    color: var(--col-crt);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--col-pixel-border);
  }

  .uses-section__icon { font-size: 1.4rem; }

  .uses-list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .uses-item {
    display: flex;
    align-items: baseline;
    gap: 1.5rem;
    padding: 0.75rem 1rem;
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
    flex-wrap: wrap;
    transition: border-color 0.15s;
  }

  .uses-item:hover { border-color: var(--col-pixel-border); }

  .uses-item__name {
    font-family: var(--font-pixel);
    font-size: 8px;
    color: var(--col-paper);
    flex-shrink: 0;
    min-width: 200px;
  }

  .uses-item__name a {
    color: var(--col-crt);
  }

  .uses-item__name a:hover {
    color: var(--col-neon);
    text-shadow: 0 0 8px rgba(0,255,136,0.4);
  }

  .uses-item__desc {
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--col-paper-dark);
    margin: 0;
    flex: 1;
  }
</style>
