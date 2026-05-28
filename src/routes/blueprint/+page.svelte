<script lang="ts">
  import { collect } from '$lib/inventory';
  import { onMount } from 'svelte';

  onMount(() => collect('blueprint'));
</script>

<svelte:head><title>CLASSIFIED — Senor Gatos</title></svelte:head>

<div class="blueprint-page container" style="padding-top:3rem; padding-bottom:4rem;">

  <div class="doc">
    <div class="doc__header">
      <span class="pixel-stamp stamp--red" style="font-size:10px; padding:8px 16px;">TOP SECRET</span>
      <h1 class="doc__title">PROJECT: ████████</h1>
      <div class="doc__meta mono">
        DOCUMENT REF: SG-████-██ &nbsp;|&nbsp; CLEARANCE: BASEMENT LEVEL &nbsp;|&nbsp; DATE: ██/██/████
      </div>
    </div>

    <div class="doc__body">

      <h2>1. OBJECTIVE</h2>
      <p>The goal of this project is to ████████████ using a combination of ██████████ and standard
      ████████ techniques. Results are expected to ████ within ██ working days, assuming
      the ████ holds and the cat doesn't ████ on the keyboard again.</p>

      <h2>2. MATERIALS REQUIRED</h2>
      <ul>
        <li>██ units of ████████ (the good kind)</li>
        <li>1x soldering iron (the haunted one)</li>
        <li>███ metres of ██████ wire</li>
        <li>Approximately ████ cups of coffee</li>
        <li>1x rubber duck (for debugging)</li>
        <li>████████████ (DO NOT SUBSTITUTE)</li>
      </ul>

      <h2>3. RISK ASSESSMENT</h2>
      <p>Primary risks include: ████████, accidental ████████████, and the possibility that
      ████████████████████████████████████████████████████████████████████████████████
      ████████████████ which would be bad. Mitigation: ██████ and hope for the best.</p>

      <h2>4. TIMELINE</h2>
      <div class="timeline">
        <div class="timeline__row"><span>Phase 1:</span><span class="redact">████████████████████</span></div>
        <div class="timeline__row"><span>Phase 2:</span><span>Acquire more ██████████</span></div>
        <div class="timeline__row"><span>Phase 3:</span><span class="redact">████████████████████████████████</span></div>
        <div class="timeline__row"><span>Phase 4:</span><span>Profit? (unconfirmed)</span></div>
        <div class="timeline__row"><span>Phase 5:</span><span class="redact">████████████████████████████████████████████████████</span></div>
      </div>

      <h2>5. NOTES</h2>
      <p>Appendix A has been removed at the request of ████████. Appendix B does not exist.
      Appendix C is ████████████████████████████████████████████████████████████████████████.
      If you have reached this page by accident, please ████████ and return to the workshop.</p>

      <p>This document will self-████████ in ██ minutes.</p>

      <div class="doc__footer">
        <span class="pixel-stamp stamp--red" style="font-size:8px; transform:rotate(-8deg); display:inline-block;">REDACTED</span>
        <a href="/" class="btn-pixel" style="margin-left:2rem;">← RETURN TO WORKSHOP</a>
      </div>
    </div>
  </div>
</div>

<style>
  .doc {
    max-width: 720px;
    margin: 0 auto;
    background: var(--col-bench);
    border: 4px solid var(--col-pixel-border);
    box-shadow: 8px 8px 0 0 rgba(0,0,0,0.5);
    font-family: var(--font-body);
    color: var(--col-paper);
  }

  .doc__header {
    padding: 2rem 2.5rem 1.5rem;
    border-bottom: 4px solid var(--col-pixel-border);
    background: #110830;
  }

  .doc__title {
    font-size: 16px;
    color: var(--col-neon);
    margin: 1rem 0 0.5rem;
    letter-spacing: 2px;
  }

  .doc__meta {
    font-size: 14px;
    color: var(--col-paper-dark);
  }

  .doc__body {
    padding: 2rem 2.5rem;
  }

  .doc__body h2 {
    font-size: 9px;
    color: var(--col-neon);
    margin: 2rem 0 0.75rem;
    letter-spacing: 1px;
  }

  .doc__body p {
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--col-paper);
    margin-bottom: 1rem;
  }

  .doc__body ul {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }

  .doc__body li {
    margin-bottom: 0.4rem;
    color: var(--col-paper);
  }

  .redact {
    background: var(--col-paper);
    color: var(--col-paper);
    border-radius: 0;
    user-select: none;
    letter-spacing: 0;
    cursor: not-allowed;
  }

  .redact:hover {
    background: var(--col-neon);
    color: var(--col-neon);
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .timeline__row {
    display: flex;
    gap: 1rem;
    font-size: 1rem;
    color: var(--col-paper);
  }

  .timeline__row span:first-child {
    font-family: var(--font-pixel);
    font-size: 8px;
    color: var(--col-paper-dark);
    flex-shrink: 0;
    padding-top: 4px;
  }

  .doc__footer {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 2px dashed var(--col-pixel-border);
    display: flex;
    align-items: center;
  }
</style>
