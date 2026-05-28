<script lang="ts">
  import { onMount } from 'svelte';

  let messages = $state<string[]>([]);
  const transmissions = [
    'hello.',
    'you found the void.',
    'not many people end up here.',
    '...',
    'the duck told you, didn\'t it.',
    'figures.',
    '...',
    'there\'s nothing here.',
    'just static.',
    'and the faint hum of something.',
    '...',
    'you should probably go back.',
    'or don\'t.',
    'the void doesn\'t care.',
    '▓▒░ END TRANSMISSION ░▒▓',
  ];

  let i = 0;

  onMount(() => {
    const interval = setInterval(() => {
      if (i < transmissions.length) {
        messages = [...messages, transmissions[i]];
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1400);

    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>the void</title>
</svelte:head>

<div class="void">
  <div class="void__terminal">
    {#each messages as msg, idx}
      <p
        class="void__line mono"
        class:void__line--transmission={msg.includes('END TRANSMISSION')}
        style="animation-delay:{idx * 0.1}s"
      >
        {msg}
      </p>
    {/each}
    {#if messages.length < transmissions.length}
      <span class="blink void__cursor">▌</span>
    {:else}
      <div class="void__footer">
        <a href="/" class="btn-pixel" style="margin-top:2rem;">← RETURN TO WORKSHOP</a>
      </div>
    {/if}
  </div>
</div>

<style>
  .void {
    min-height: 100vh;
    background: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .void__terminal {
    max-width: 500px;
    width: 100%;
  }

  .void__line {
    font-size: 20px;
    color: #40ff80;
    margin-bottom: 0.75rem;
    animation: fadeUp 0.3s ease both;
    text-shadow: 0 0 8px rgba(64,255,128,0.5);
  }

  .void__line--transmission {
    color: #ffffff;
    letter-spacing: 2px;
    margin-top: 1rem;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: none; }
  }

  .void__cursor {
    color: #40ff80;
    font-size: 24px;
  }

  .void__footer {
    margin-top: 2rem;
  }
</style>
