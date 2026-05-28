<script lang="ts">
  import { onMount } from 'svelte';
  import { hobbies, queue, someday, lifeGoals, type QueuedSkill } from '$lib/data/hobbies';
  import { collect } from '$lib/inventory';
  onMount(() => collect('gauge'));

  const colMap = {
    crt:   'var(--col-crt)',
    amber: 'var(--col-amber)',
    blue:  'var(--col-blue)',
    red:   'var(--col-red)',
  };
</script>

<svelte:head>
  <title>Hobbies — Senor Gatos</title>
</svelte:head>

<div class="container" style="padding-top:3rem; padding-bottom:5rem;">

  <!-- ── ACTIVE ───────────────────────────────────────── -->
  <header class="page-header">
    <div class="pixel-stamp stamp--amber" style="margin-bottom:1rem;">HOBBY BOARD</div>
    <h1>Currently Nerding</h1>
    <p class="mono" style="font-size:20px; color:var(--col-paper-dark); margin-top:0.5rem;">
      things i am actively into right now
    </p>
  </header>

  <div class="hobby-grid">
    {#each hobbies as hobby}
      {@const col = colMap[hobby.color]}
      <div class="hobby-card pixel-box" style="--hcol:{col}">
        <div class="hobby-card__header">
          <span class="hobby-card__icon">{hobby.icon}</span>
          <h2 class="hobby-card__title">{hobby.title}</h2>
        </div>
        <p class="hobby-card__desc">{hobby.desc}</p>
        <div class="hobby-gauge">
          <div class="hobby-gauge__header">
            <span class="mono hobby-gauge__label">PROGRESS</span>
            <span class="mono hobby-gauge__value" style="color:var(--hcol)">{hobby.progress}%</span>
          </div>
          <div class="gauge-track">
            <div
              class="gauge-fill"
              style="width:{hobby.progress}%; background: repeating-linear-gradient(
                90deg,
                var(--hcol) 0px, var(--hcol) 10px,
                color-mix(in srgb, var(--hcol) 50%, black) 10px,
                color-mix(in srgb, var(--hcol) 50%, black) 12px
              );"
              role="progressbar"
              aria-valuenow={hobby.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="{hobby.title} progress"
            ></div>
          </div>
          <span class="mono hobby-gauge__unit">{hobby.unit}</span>
        </div>
        {#if hobby.log.length > 0}
          <div class="hobby-log">
            <div class="pixel-stamp" style="color:var(--hcol); border-color:var(--hcol); font-size:6px; margin-bottom:0.75rem;">FIELD NOTES</div>
            {#each hobby.log as entry}
              <div class="hobby-log__entry">
                <span class="mono hobby-log__date">{entry.date}</span>
                <span class="hobby-log__note">{entry.note}</span>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <!-- ── QUEUE ─────────────────────────────────────────── -->
  <section class="section">
    <h2 class="section-heading">
      <span class="led led--amber" style="margin-right:10px; animation-delay:0.3s"></span>
      In The Queue
    </h2>
    <p class="mono section-sub">skills I'm planning to learn — in rough order of priority</p>

    <div class="queue-grid">
      {#each queue as skill}
        <div class="queue-card pixel-inset">
          <span class="queue-card__icon">{skill.icon}</span>
          <div class="queue-card__body">
            <div class="queue-card__title pixel-stamp stamp--crt" style="font-size:6px;">{skill.title}</div>
            <p class="queue-card__desc">{skill.desc}</p>
            <span class="queue-card__timeline mono">{skill.timeline}</span>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- ── SOMEDAY ───────────────────────────────────────── -->
  <section class="section">
    <h2 class="section-heading">
      <span class="led" style="margin-right:10px; animation-delay:0.6s; opacity:0.5;"></span>
      Someday
    </h2>
    <p class="mono section-sub">lower urgency — but they're on the list</p>

    <div class="someday-tags">
      {#each someday as item}
        <span class="someday-tag">
          <span class="someday-tag__icon">{item.icon}</span>
          {item.title}
        </span>
      {/each}
    </div>
  </section>

  <!-- ── LIFE GOALS ────────────────────────────────────── -->
  <section class="section">
    <h2 class="section-heading">
      <span class="led led--blue" style="margin-right:10px; animation-delay:0.9s;"></span>
      Life Goals
    </h2>
    <p class="mono section-sub">not skills — just things I want to do or build</p>

    <div class="goals-grid">
      {#each lifeGoals as goal}
        <div class="goal-card pixel-inset" class:goal-card--active={goal.status === 'active'}>
          <div class="goal-card__header">
            <span class="goal-card__icon">{goal.icon}</span>
            <div>
              <div class="goal-card__title pixel-stamp" style="font-size:6px; {goal.status === 'active' ? 'color:var(--col-crt); border-color:var(--col-crt);' : 'color:var(--col-paper-dark); border-color:var(--col-paper-dark);'}">
                {goal.status === 'active' ? 'ACTIVE' : 'SOMEDAY'}
              </div>
              <h3 class="goal-card__name">{goal.title}</h3>
            </div>
          </div>
          <p class="goal-card__desc">{goal.desc}</p>
          <ul class="goal-steps">
            {#each goal.steps as step}
              <li class="goal-step">
                <span class="goal-step__bullet" aria-hidden="true">→</span>
                {step}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>

</div>

<style>
  .page-header {
    margin-bottom: 3rem;
    border-bottom: 4px solid var(--col-pixel-border);
    padding-bottom: 1.5rem;
  }

  /* ── ACTIVE CARDS ─── */
  .hobby-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .hobby-card {
    background: var(--col-bench);
    padding: 1.75rem;
    border: 2px solid var(--col-pixel-border);
    border-top: 4px solid var(--hcol);
    box-shadow: 5px 5px 0 0 rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .hobby-card__header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .hobby-card__icon { font-size: 2rem; line-height: 1; }

  .hobby-card__title {
    font-size: 9px;
    color: var(--hcol);
  }

  .hobby-card__desc {
    font-family: var(--font-body);
    color: var(--col-paper-dark);
    font-size: 1rem;
    margin: 0;
  }

  .hobby-gauge { display: flex; flex-direction: column; gap: 4px; }

  .hobby-gauge__header { display: flex; justify-content: space-between; align-items: center; }
  .hobby-gauge__label  { font-size: 14px; color: var(--col-paper-dark); }
  .hobby-gauge__value  { font-size: 18px; }
  .hobby-gauge__unit   { font-size: 13px; color: var(--col-paper-dark); opacity: 0.6; }

  .hobby-log { border-top: 2px solid var(--col-pixel-border); padding-top: 1rem; }
  .hobby-log__entry { display: flex; gap: 0.75rem; margin-bottom: 0.5rem; align-items: flex-start; flex-wrap: wrap; }
  .hobby-log__date  { font-size: 14px; color: var(--col-paper-dark); flex-shrink: 0; opacity: 0.7; }
  .hobby-log__note  { font-family: var(--font-body); font-size: 0.9rem; color: var(--col-paper-dark); flex: 1; }

  /* ── SECTION HEADINGS ─── */
  .section { margin-bottom: 4rem; }

  .section-heading {
    font-size: 11px;
    color: var(--col-crt);
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .section-sub {
    font-size: 17px;
    color: var(--col-paper-dark);
    margin-bottom: 1.5rem;
    opacity: 0.7;
  }

  /* ── QUEUE ─── */
  .queue-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }

  .queue-card {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .queue-card:hover {
    border-color: var(--col-neon);
    box-shadow: 0 0 10px rgba(0,255,136,0.15);
  }

  .queue-card__icon { font-size: 1.5rem; flex-shrink: 0; padding-top: 2px; }
  .queue-card__body { display: flex; flex-direction: column; gap: 0.3rem; }
  .queue-card__title { margin-bottom: 0.2rem; }

  .queue-card__desc {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--col-paper-dark);
    margin: 0;
    line-height: 1.5;
  }

  .queue-card__timeline {
    font-size: 14px;
    color: var(--col-amber);
    opacity: 0.8;
  }

  /* ── SOMEDAY ─── */
  .someday-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .someday-tag {
    font-family: var(--font-pixel);
    font-size: 7px;
    padding: 6px 10px;
    border: 2px solid var(--col-pixel-border);
    color: var(--col-paper-dark);
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.15s, border-color 0.15s;
  }

  .someday-tag:hover {
    color: var(--col-neon);
    border-color: var(--col-neon);
  }

  .someday-tag__icon { font-size: 1rem; }

  /* ── LIFE GOALS ─── */
  .goals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .goal-card {
    padding: 1.5rem;
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .goal-card--active {
    border-left: 4px solid var(--col-crt);
  }

  .goal-card__header {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .goal-card__icon { font-size: 1.75rem; flex-shrink: 0; }

  .goal-card__name {
    font-size: 9px;
    color: var(--col-paper);
    margin-top: 0.4rem;
  }

  .goal-card__desc {
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: var(--col-paper-dark);
    margin: 0;
  }

  .goal-steps {
    list-style: none;
    padding: 0;
    border-top: 2px solid var(--col-pixel-border);
    padding-top: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .goal-step {
    display: flex;
    gap: 0.5rem;
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--col-paper-dark);
  }

  .goal-step__bullet {
    color: var(--col-crt);
    flex-shrink: 0;
    font-family: var(--font-mono);
  }
</style>
