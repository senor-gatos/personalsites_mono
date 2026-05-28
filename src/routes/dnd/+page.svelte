<script lang="ts">
  import { characters } from '$lib/data/dndCharacters';
  import type { DndCharacter } from '$lib/data/dndCharacters';

  const statusConfig = {
    active:   { label: 'ACTIVE',    stamp: 'stamp--crt',   icon: '⚔' },
    retired:  { label: 'RETIRED',   stamp: 'stamp--amber', icon: '🛡' },
    deceased: { label: 'DECEASED',  stamp: 'stamp--red',   icon: '💀' },
    tpk:      { label: 'TPK',       stamp: 'stamp--red',   icon: '💀' },
  };

  // Sort: active first, then retired, then deceased
  const order = { active: 0, retired: 1, deceased: 2, tpk: 3 };
  const sorted = [...characters].sort((a,b) => order[a.status] - order[b.status]);
</script>

<svelte:head>
  <title>D&D Characters — Senor Gatos</title>
  <meta name="description" content="Every D&D character I've played, remembered with varying degrees of accuracy." />
</svelte:head>

<div class="container" style="padding-top:3rem; padding-bottom:4rem;">

  <header class="page-header">
    <div class="pixel-stamp stamp--red" style="margin-bottom:1rem;">THE PARTY</div>
    <h1>D&D Characters</h1>
    <p class="mono" style="font-size:18px; color:var(--col-paper-dark); margin-top:0.5rem;">
      every character i've played — remembered with varying degrees of accuracy
    </p>
    <div style="display:flex; gap:0.75rem; margin-top:1rem; flex-wrap:wrap;">
      {#each Object.entries(statusConfig) as [key, cfg]}
        <span class="pixel-stamp {cfg.stamp}" style="font-size:6px;">{cfg.icon} {cfg.label} ({characters.filter(c => c.status === key).length})</span>
      {/each}
    </div>
  </header>

  <div class="char-grid">
    {#each sorted as char}
      {@const sc = statusConfig[char.status]}
      <div class="char-card pixel-box" data-status={char.status}>

        <!-- Pixel portrait -->
        <div class="char-portrait">
          <svg viewBox="0 0 32 40" width="64" height="80" style="image-rendering:pixelated;" aria-hidden="true">
            <!-- body / outfit -->
            <rect x="4"  y="24" width="24" height="16" fill={char.portrait.outfit}/>
            <rect x="8"  y="22" width="16" height="6"  fill={char.portrait.outfit}/>
            <!-- neck -->
            <rect x="13" y="19" width="6"  height="5"  fill={char.portrait.skin}/>
            <!-- head -->
            <rect x="8"  y="6"  width="16" height="16" fill={char.portrait.skin}/>
            <!-- hair -->
            <rect x="8"  y="6"  width="16" height="4"  fill={char.portrait.hair}/>
            <rect x="6"  y="8"  width="4"  height="8"  fill={char.portrait.hair}/>
            <rect x="22" y="8"  width="4"  height="8"  fill={char.portrait.hair}/>
            <!-- eyes -->
            <rect x="11" y="13" width="3"  height="3"  fill="#1a0a08"/>
            <rect x="18" y="13" width="3"  height="3"  fill="#1a0a08"/>
            <!-- mouth -->
            <rect x="13" y="18" width="6"  height="2"  fill="#8a4030"/>
            <!-- accent glow (magic, weapon, etc.) -->
            {#if char.portrait.accent}
              <rect x="0"  y="28" width="6"  height="12" fill={char.portrait.accent} opacity="0.8"/>
              <rect x="0"  y="30" width="4"  height="2"  fill="#ffffff" opacity="0.4"/>
            {/if}
            <!-- deceased overlay -->
            {#if char.status === 'deceased' || char.status === 'tpk'}
              <rect x="0" y="0" width="32" height="40" fill="rgba(0,0,0,0.45)"/>
              <rect x="9"  y="12" width="4" height="4" fill="#ff2020" opacity="0.9"/>
              <rect x="19" y="12" width="4" height="4" fill="#ff2020" opacity="0.9"/>
            {/if}
          </svg>
        </div>

        <!-- Character info -->
        <div class="char-info">
          <div class="char-info__header">
            <span class="pixel-stamp {sc.stamp}" style="font-size:6px;">{sc.icon} {sc.label}</span>
            {#if char.alignment}
              <span class="mono char-alignment">{char.alignment}</span>
            {/if}
          </div>

          <h2 class="char-name">{char.name}</h2>

          <div class="char-stats mono">
            <span class="char-race-class">{char.race} · {char.charClass}{char.subclass ? ` (${char.subclass})` : ''}</span>
            <span class="char-level">Level {char.level}</span>
          </div>

          <div class="char-campaign mono">
            <span class="char-campaign__label">CAMPAIGN</span>
            <span class="char-campaign__name">{char.campaign}{char.setting ? ` — ${char.setting}` : ''}</span>
          </div>

          <p class="char-backstory">{char.backstory}</p>

          {#if char.memorableMoment}
            <blockquote class="char-moment">
              "{char.memorableMoment}"
            </blockquote>
          {/if}
        </div>

      </div>
    {/each}
  </div>

</div>

<style>
  .page-header {
    margin-bottom: 3rem;
    border-bottom: 4px solid var(--col-pixel-border);
    padding-bottom: 1.5rem;
  }

  .char-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 2rem;
  }

  .char-card {
    background: var(--col-bench);
    border: 2px solid var(--col-pixel-border);
    box-shadow: 5px 5px 0 rgba(0,0,0,0.5);
    display: flex;
    gap: 1.25rem;
    padding: 1.5rem;
    transition: transform 0.1s;
  }

  .char-card:hover { transform: translateY(-2px); }

  .char-card[data-status='active']   { border-top: 4px solid var(--col-neon); }
  .char-card[data-status='retired']  { border-top: 4px solid var(--col-amber); }
  .char-card[data-status='deceased'] { border-top: 4px solid var(--col-red); opacity: 0.8; }
  .char-card[data-status='tpk']      { border-top: 4px solid var(--col-red); opacity: 0.8; }

  .char-portrait {
    flex-shrink: 0;
    background: #0a0818;
    border: 2px solid var(--col-pixel-border);
    padding: 4px;
    align-self: flex-start;
  }

  .char-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;
  }

  .char-info__header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .char-alignment {
    font-size: 13px;
    color: var(--col-paper-dark);
    opacity: 0.7;
  }

  .char-name {
    font-size: 11px;
    color: var(--col-crt);
    margin: 0;
  }

  .char-stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .char-race-class {
    font-size: 14px;
    color: var(--col-paper-dark);
  }

  .char-level {
    font-size: 14px;
    color: var(--col-amber);
  }

  .char-campaign {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .char-campaign__label {
    font-size: 11px;
    color: var(--col-paper-dark);
    opacity: 0.6;
  }

  .char-campaign__name {
    font-size: 14px;
    color: var(--col-paper-dark);
  }

  .char-backstory {
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: var(--col-paper-dark);
    margin: 0;
    line-height: 1.6;
  }

  .char-moment {
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-style: italic;
    color: var(--col-amber);
    border-left: 3px solid var(--col-amber-dim);
    padding-left: 0.75rem;
    margin: 0;
    line-height: 1.5;
  }
</style>
