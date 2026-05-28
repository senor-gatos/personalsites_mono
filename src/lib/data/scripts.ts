// ── SCRIPTS & SKETCHES ───────────────────────────────────────────────────────
// Add your sketches, scripts, and bits here.
// content is optional — leave blank and add a link, or fill it in.

export type ScriptType   = 'sketch' | 'script' | 'bit' | 'monologue' | 'premise';
export type ScriptStatus = 'performed' | 'draft' | 'shelved' | 'in-progress';

export interface Script {
  id: string;
  title: string;
  type: ScriptType;
  status: ScriptStatus;
  logline: string;       // one-line premise
  date: string;
  tags: string[];
  content?: string;      // optional full text (markdown-ish)
  link?: string;         // or a link to the piece
  note?: string;         // personal note, not shown prominently
}

export const scripts: Script[] = [
  {
    id: 'placeholder-1',
    title: 'Your First Sketch Title Here',
    type: 'sketch',
    status: 'draft',
    logline: 'Replace this with the one-line premise of your sketch.',
    date: '2026-05-28',
    tags: ['comedy'],
    content: `Replace this with the actual text of your sketch, or delete content and add a link instead.`,
  },
];
