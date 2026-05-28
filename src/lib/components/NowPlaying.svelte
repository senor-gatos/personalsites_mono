<script lang="ts">
  import { now } from '$lib/data/now';

  const icons = {
    song:     '♪',
    game:     '🕹',
    activity: '⚙',
    watch:    '▶',
    read:     '📖',
    off:      '',
  };

  const labels = {
    song:     'NOW PLAYING',
    game:     'NOW PLAYING',
    activity: 'CURRENTLY',
    watch:    'NOW WATCHING',
    read:     'NOW READING',
    off:      '',
  };
</script>

{#if now.type !== 'off'}
  <div class="now-playing" aria-label="{labels[now.type]}: {now.title}">
    <div class="now-playing__label mono">{labels[now.type]}</div>
    <div class="now-playing__track">
      <span class="now-playing__icon" aria-hidden="true">{icons[now.type]}</span>
      <div class="now-playing__info">
        <span class="now-playing__title">{now.title}</span>
        {#if now.detail}
          <span class="now-playing__detail mono">{now.detail}</span>
        {/if}
      </div>
      <span class="now-playing__bar" aria-hidden="true">
        <span class="bar b1"></span>
        <span class="bar b2"></span>
        <span class="bar b3"></span>
        <span class="bar b4"></span>
      </span>
    </div>
  </div>
{/if}

<style>
  .now-playing {
    background: #020d06;
    border: 2px solid #007a40;
    box-shadow: 0 0 12px rgba(0,255,136,0.1), 4px 4px 0 0 rgba(0,0,0,0.5);
    padding: 0.6rem 1rem;
    width: min(340px, 90vw);
    margin-top: 1.25rem;
  }

  .now-playing__label {
    font-size: 11px;
    color: #007a40;
    letter-spacing: 1px;
    margin-bottom: 0.4rem;
  }

  .now-playing__track {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .now-playing__icon {
    font-size: 1.2rem;
    color: #00ff88;
    flex-shrink: 0;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.6; }
  }

  .now-playing__info {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
  }

  .now-playing__title {
    font-family: var(--font-mono);
    font-size: 20px;
    color: #00ff88;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .now-playing__detail {
    font-size: 14px;
    color: #007a40;
  }

  /* Animated equaliser bars */
  .now-playing__bar {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 18px;
    flex-shrink: 0;
  }

  .bar {
    width: 3px;
    background: #00ff88;
    display: block;
    animation: eq 0.8s ease-in-out infinite alternate;
  }

  .b1 { height: 40%; animation-delay: 0s;    }
  .b2 { height: 80%; animation-delay: 0.15s; }
  .b3 { height: 60%; animation-delay: 0.3s;  }
  .b4 { height: 30%; animation-delay: 0.45s; }

  @keyframes eq {
    from { transform: scaleY(0.3); }
    to   { transform: scaleY(1);   }
  }
</style>
