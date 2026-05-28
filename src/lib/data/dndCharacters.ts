// ── D&D CHARACTERS ───────────────────────────────────────────────────────────
// Add every character you've played here.
// portrait colors: headColor, hairColor, outfitColor — used for pixel art portrait

export type CharStatus = 'active' | 'retired' | 'deceased' | 'tpk';

export interface DndCharacter {
  id: string;
  name: string;
  race: string;
  charClass: string;
  subclass?: string;
  level: number;
  alignment?: string;
  campaign: string;
  setting?: string;
  status: CharStatus;
  backstory: string;
  memorableMoment?: string;
  // pixel portrait colors
  portrait: {
    skin:   string;
    hair:   string;
    outfit: string;
    accent?: string;  // weapon glow, magic effect, etc.
  };
}

export const characters: DndCharacter[] = [
  {
    id: 'placeholder',
    name: 'Your Character Name',
    race: 'Race',
    charClass: 'Class',
    subclass: 'Subclass',
    level: 5,
    alignment: 'Chaotic Good',
    campaign: 'Campaign Name',
    setting: 'Setting',
    status: 'retired',
    backstory: 'A brief description of who this character was and what made them interesting.',
    memorableMoment: 'That one time they did the thing that made the whole table react.',
    portrait: { skin: '#c8a070', hair: '#3a2010', outfit: '#4060c0', accent: '#c060c8' },
  },
];
