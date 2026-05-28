<script lang="ts">
  import { onMount } from 'svelte';

  const lines = [
    { text: '$ sudo make me a sandwich', delay: 0 },
    { text: 'bash: sudo: command not found', delay: 600 },
    { text: '', delay: 1000 },
    { text: '...', delay: 1400 },
    { text: '', delay: 2000 },
    { text: 'or is it?', delay: 2600 },
    { text: '', delay: 3400 },
    { text: '> checking permissions...', delay: 3800 },
    { text: '> access level: BASEMENT TIER', delay: 4400 },
    { text: '> sandwich_protocol: NOT FOUND', delay: 5000 },
    { text: '> cat_protocol: ACTIVE', delay: 5600 },
    { text: '', delay: 6200 },
    { text: ' /\\_/\\  ', delay: 6600 },
    { text: '( o.o ) <-- this is the sandwich now', delay: 7000 },
    { text: ' > ^ <  ', delay: 7000 },
    { text: '', delay: 7800 },
    { text: '> TASK COMPLETE', delay: 8200 },
    { text: '', delay: 8600 },
    { text: '[ ← go back ]', delay: 9200, isLink: true },
  ];

  let visible = $state<typeof lines>([]);

  onMount(() => {
    lines.forEach((line, i) => {
      setTimeout(() => {
        visible = [...visible, line];
      }, line.delay);
    });
  });
</script>

<svelte:head><title>sudo — Senor Gatos</title></svelte:head>

<div class="sudo-page">
  <div class="terminal">
    {#each visible as line}
      {#if line.isLink}
        <p class="t-line t-link"><a href="/">← go back to workshop</a></p>
      {:else}
        <p class="t-line" class:t-dim={line.text.startsWith('bash:')}>{line.text || ' '}</p>
      {/if}
    {/each}
    {#if visible.length < lines.length}
      <span class="blink" style="color:var(--col-neon)">▌</span>
    {/if}
  </div>
</div>

<style>
  .sudo-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .terminal {
    font-family: var(--font-mono);
    font-size: 22px;
    color: var(--col-neon);
    max-width: 600px;
    width: 100%;
  }

  .t-line {
    margin-bottom: 0.2rem;
    white-space: pre;
    animation: fadeIn 0.15s ease;
  }

  .t-dim { color: var(--col-paper-dark); }

  .t-link a {
    color: var(--col-amber);
    text-decoration: none;
  }
  .t-link a:hover { color: var(--col-neon); }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateX(-4px); }
    to   { opacity: 1; transform: none; }
  }
</style>
