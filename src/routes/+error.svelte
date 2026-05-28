<script lang="ts">
  import { page } from '$app/state';
</script>

<svelte:head>
  <title>{page.status === 404 ? 'SIGNAL LOST' : 'ERROR'} — Senor Gatos</title>
</svelte:head>

<div class="error-page">
  <div class="monitor pixel-box">
    <div class="monitor__screen">
      <div class="scanline" aria-hidden="true"></div>

      <p class="label mono">WORKSHOP OS v2.4.1 — SYSTEM ALERT</p>

      <h1 class="code">{page.status}</h1>

      {#if page.status === 404}
        <p class="message mono">SIGNAL LOST</p>
        <p class="detail mono">
          the workshop couldn't find what you were looking for.<br/>
          it may have been moved, redacted, or never existed.<br/>
          <span class="blink">_</span>
        </p>
      {:else}
        <p class="message mono">SYSTEM ERROR</p>
        <p class="detail mono">
          something broke in the workshop.<br/>
          {page.error?.message ?? 'unknown fault.'}<br/>
          <span class="blink">_</span>
        </p>
      {/if}

      <div class="status-row">
        <span class="led"></span>
        <span class="mono" style="font-size:16px; color:#007a40">ATTEMPTING RECOVERY...</span>
      </div>
    </div>
    <div class="base">
      <span class="led" style="animation-delay:0s"></span>
      <span class="led led--amber" style="animation-delay:0.5s"></span>
      <span class="led" style="animation-delay:1s"></span>
    </div>
  </div>

  <a href="/" class="btn-pixel" style="margin-top:2rem;">← RETURN TO WORKSHOP</a>
</div>

<style>
  .error-page {
    min-height: calc(100vh - var(--nav-h));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .monitor {
    --col-crt:     #00ff88;
    --col-crt-dim: #007a40;
    background: #050f08;
    border: 4px solid #00ff88;
    box-shadow:
      0 0 0 4px #007a40,
      0 0 40px #007a40,
      8px 8px 0 0 rgba(0,0,0,0.8);
    width: min(480px, 90vw);
  }

  .monitor__screen {
    padding: 2.5rem 3rem;
    position: relative;
    overflow: hidden;
    background: #020d06;
  }

  .scanline {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(0,0,0,0.18) 3px,
      rgba(0,0,0,0.18) 4px
    );
    pointer-events: none;
    z-index: 1;
  }

  .label {
    font-size: 12px;
    color: #007a40;
    margin-bottom: 1.5rem;
  }

  .code {
    font-family: var(--font-pixel);
    font-size: clamp(40px, 10vw, 72px);
    color: #00ff88;
    text-shadow: 0 0 20px #007a40;
    line-height: 1;
    margin-bottom: 0.5rem;
    animation: flicker 5s ease-in-out infinite;
  }

  .message {
    font-size: 26px;
    color: #00ff88;
    opacity: 0.9;
    margin-bottom: 1.25rem;
    letter-spacing: 2px;
  }

  .detail {
    font-size: 18px;
    color: #00ff88;
    opacity: 0.65;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  .status-row {
    display: flex;
    align-items: center;
    gap: 8px;
    opacity: 0.6;
    --col-crt: #00ff88;
  }

  .base {
    height: 20px;
    background: #0a1a0a;
    border-top: 4px solid #007a40;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    --col-crt: #00ff88;
  }

  @keyframes flicker {
    0%, 89%, 100% { opacity: 1; }
    90% { opacity: 0.7; }
    91% { opacity: 1; }
    92% { opacity: 0.3; }
    93% { opacity: 1; }
  }
</style>
