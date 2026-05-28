<script lang="ts">
  import { onMount } from 'svelte';
  import { ALL_ITEMS, getCollected, isComplete } from '$lib/inventory';

  let collected = $state(new Set<string>());
  let complete = $state(false);

  onMount(() => {
    collected = getCollected();
    complete = isComplete();
  });
</script>

<svelte:head><title>Inventory — Senor Gatos</title></svelte:head>

<div class="container" style="padding-top:3rem; padding-bottom:4rem; max-width:700px;">

  <header style="margin-bottom:2.5rem; border-bottom:4px solid var(--col-pixel-border); padding-bottom:1.5rem;">
    <div class="pixel-stamp stamp--crt" style="margin-bottom:1rem;">INVENTORY</div>
    <h1>Workshop Finds</h1>
    <p class="mono" style="font-size:18px; color:var(--col-paper-dark); margin-top:0.5rem;">
      {collected.size} / {ALL_ITEMS.length} items collected
    </p>
  </header>

  {#if complete}
    <div class="unlock pixel-box pixel-box--crt" style="padding:2rem; text-align:center; margin-bottom:2rem;">
      <p class="mono" style="font-size:20px; color:var(--col-neon);">COLLECTION COMPLETE</p>
      <p class="mono" style="font-size:16px; color:var(--col-paper-dark); margin-top:0.5rem;">
        you found everything. the workshop acknowledges you.<br/>
        the cat is unimpressed but respectful.
      </p>
    </div>
  {:else}
    <p class="mono" style="font-size:17px; color:var(--col-paper-dark); margin-bottom:2rem;">
      explore the workshop to find all items. something happens when you do.
    </p>
  {/if}

  <div class="item-grid">
    {#each ALL_ITEMS as item}
      {@const found = collected.has(item.id)}
      <div class="item-card pixel-inset" class:item-card--found={found} class:item-card--missing={!found}>
        <div class="item-card__icon">{found ? item.icon : '?'}</div>
        <div class="item-card__info">
          {#if found}
            <div class="item-card__name pixel-stamp stamp--crt" style="font-size:6px;">{item.name}</div>
            <p class="item-card__desc">{item.desc}</p>
          {:else}
            <div class="item-card__name pixel-stamp stamp--red" style="font-size:6px;">UNDISCOVERED</div>
            <p class="item-card__desc" style="color:var(--col-paper-dark); opacity:0.4;">
              visit somewhere in the workshop...
            </p>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <div style="margin-top:2rem;">
    <a href="/" class="btn-pixel">← BACK TO WORKSHOP</a>
  </div>
</div>

<style>
  .item-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .item-card {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem 1.5rem;
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .item-card--found {
    border-color: var(--col-neon);
    box-shadow: 0 0 12px rgba(0,255,136,0.15);
  }

  .item-card--missing {
    opacity: 0.5;
    filter: grayscale(0.4);
  }

  .item-card__icon {
    font-size: 2.5rem;
    flex-shrink: 0;
    width: 48px;
    text-align: center;
  }

  .item-card__name {
    margin-bottom: 0.4rem;
  }

  .item-card__desc {
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: var(--col-paper);
    margin: 0;
  }
</style>
