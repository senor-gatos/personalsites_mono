<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.meta.title} — Senor Gatos</title>
  <meta name="description"          content={data.meta.excerpt} />
  <meta property="og:type"          content="article" />
  <meta property="og:title"         content="{data.meta.title} — Senor Gatos" />
  <meta property="og:description"   content={data.meta.excerpt} />
  <meta property="article:published_time" content={data.meta.date} />
  {#each data.meta.tags as tag}
    <meta property="article:tag" content={tag} />
  {/each}
  <meta name="twitter:title"        content="{data.meta.title} — Senor Gatos" />
  <meta name="twitter:description"  content={data.meta.excerpt} />
</svelte:head>

<div class="post-wrapper">
  <div class="post-spine" aria-hidden="true">
    <span class="post-spine__line"></span>
    <span class="post-spine__hole"></span>
    <span class="post-spine__hole"></span>
    <span class="post-spine__hole"></span>
    <span class="post-spine__line"></span>
  </div>

  <article class="content-area post-page">
    <header class="post-header">
      <div class="post-header__meta">
        <span class="mono post-date">{data.meta.date}</span>
        <div class="post-tags">
          {#each data.meta.tags as tag}
            <span class="pixel-stamp stamp--amber" style="font-size:6px">{tag}</span>
          {/each}
        </div>
      </div>
      <h1 class="post-title">{data.meta.title}</h1>
    </header>

    <div class="post-body">
      <data.content />
    </div>

    <footer class="post-footer">
      <a href="/blog" class="btn-pixel" style="font-size:7px;">← BACK TO LOG BOOK</a>
    </footer>
  </article>
</div>

<style>
  .post-wrapper {
    display: flex;
    gap: 0;
    max-width: 900px;
    margin: 3rem auto;
    padding: 0 1.5rem;
  }

  /* Spiral binding spine */
  .post-spine {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 32px;
    flex-shrink: 0;
    padding: 1rem 0;
    background: var(--col-wood-light);
    border: 2px solid var(--col-pixel-border);
    border-right: none;
  }

  .post-spine__hole {
    width: 16px;
    height: 16px;
    border-radius: 0;
    background: var(--col-bg);
    border: 2px solid var(--col-pixel-border);
  }

  .post-spine__line {
    width: 2px;
    flex: 1;
    background: var(--col-pixel-border);
    max-height: 40px;
  }

  /* Override content-area max-width for post page */
  .post-page {
    max-width: 100%;
    flex: 1;
  }

  .post-header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px dashed var(--col-paper-dark);
  }

  .post-header__meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }

  .post-date {
    font-size: 16px;
    color: var(--col-paper-dark);
  }

  .post-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .post-title {
    font-size: 14px !important;
    line-height: 1.3;
  }

  .post-body {
    position: relative;
    z-index: 1;
  }

  /* Post body heading + text overrides */
  :global(.post-body h1),
  :global(.post-body h2),
  :global(.post-body h3),
  :global(.post-body h4) {
    color: var(--col-neon) !important;
    text-shadow: 0 0 8px rgba(0,255,136,0.3);
  }
  :global(.post-body h2) { margin-top: 2rem; }
  :global(.post-body ul, .post-body ol) {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }
  :global(.post-body li) { margin-bottom: 0.25rem; color: #f0e0ff; }
  :global(.post-body strong) { color: #ffffff; font-weight: 700; }
  :global(.post-body p) { color: #f0e0ff; }

  .post-footer {
    margin-top: 3rem;
    padding-top: 1rem;
    border-top: 2px dashed var(--col-paper-dark);
  }

  @media (max-width: 600px) {
    .post-spine { display: none; }
    .post-wrapper { padding: 0 0.75rem; margin: 1.5rem auto; }
  }
</style>
