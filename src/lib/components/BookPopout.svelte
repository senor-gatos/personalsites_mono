<script lang="ts">
  import type { MovieQuote } from '$lib/data/bookEggs';

  let { quote, onclose }: { quote: MovieQuote; onclose: () => void } = $props();
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  class="overlay"
  role="dialog"
  aria-modal="true"
  aria-label="Movie quote"
  onclick={onclose}
  onkeydown={(e) => e.key === 'Escape' && onclose()}
>
  <div class="page" onclick={(e) => e.stopPropagation()}>
    <!-- torn top edge -->
    <svg class="tear" viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0,20 L0,8 Q20,0 40,10 Q60,18 80,6 Q100,0 120,12 Q140,20 160,8 Q180,0 200,10 Q220,18 240,5 Q260,0 280,12 Q300,20 320,7 Q340,0 360,10 Q380,18 400,8 L400,20 Z"
        fill="#f5ecd8"
      />
    </svg>

    <div class="page__body">
      <p class="page__label mono">📖 from the shelf</p>
      <blockquote class="page__quote">
        "{quote.quote}"
      </blockquote>
      <p class="page__credit">
        — <em>{quote.film}</em>, {quote.year}
      </p>
    </div>

    <!-- torn bottom edge -->
    <svg class="tear tear--bottom" viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0,0 L0,12 Q20,20 40,10 Q60,4 80,14 Q100,20 120,8 Q140,2 160,12 Q180,20 200,10 Q220,4 240,15 Q260,20 280,8 Q300,2 320,13 Q340,20 360,10 Q380,4 400,12 L400,0 Z"
        fill="#f5ecd8"
      />
    </svg>

    <button class="close-btn btn-pixel" onclick={onclose} aria-label="Close">
      ← put it back
    </button>
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 9000;
    background: rgba(10,4,20,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    animation: fadeIn 0.2s ease;
    cursor: pointer;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .page {
    background: #f5ecd8;
    max-width: 420px;
    width: 100%;
    cursor: default;
    position: relative;
    animation: pageIn 0.25s cubic-bezier(0.34,1.56,0.64,1);
    /* subtle rotation like it fell off a shelf */
    transform: rotate(-1.5deg);
    box-shadow: 4px 8px 24px rgba(0,0,0,0.5);
  }

  @keyframes pageIn {
    from { transform: rotate(-1.5deg) translateY(-20px) scale(0.92); opacity: 0; }
    to   { transform: rotate(-1.5deg) translateY(0) scale(1); opacity: 1; }
  }

  .tear {
    display: block;
    width: 100%;
    height: 20px;
    margin-bottom: -1px;
  }

  .tear--bottom {
    margin-top: -1px;
    margin-bottom: 0;
  }

  .page__body {
    background: #f5ecd8;
    padding: 1.25rem 2rem;
    /* subtle lined paper effect */
    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 27px,
      rgba(100,120,180,0.12) 27px,
      rgba(100,120,180,0.12) 28px
    );
  }

  .page__label {
    font-size: 12px;
    color: #a08060;
    margin-bottom: 1rem;
    letter-spacing: 1px;
  }

  .page__quote {
    font-family: 'Crimson Pro', Georgia, serif;
    font-size: 1.4rem;
    line-height: 1.6;
    color: #2a1a0a;
    margin: 0 0 1rem;
    font-style: italic;
    border: none;
    padding: 0;
  }

  .page__credit {
    font-family: 'Crimson Pro', Georgia, serif;
    font-size: 1rem;
    color: #6a4a2a;
    text-align: right;
    margin: 0;
  }

  .close-btn {
    display: block;
    margin: 0.75rem auto 0;
    font-size: 7px;
    background: #2a1a0a;
    color: #f5ecd8;
    outline-color: #2a1a0a;
  }

  .close-btn:hover {
    color: #ffffff;
    outline-color: #6a4a2a;
    box-shadow: none;
    text-shadow: none;
  }
</style>
