export interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  desc: string;
  route: string;
}

export const ALL_ITEMS: InventoryItem[] = [
  { id: 'workshop', name: 'Workshop Key',    icon: '🔧', desc: 'Found in the workshop. Smells like solder.', route: '/' },
  { id: 'logbook',  name: 'Log Book',        icon: '📓', desc: 'A weathered notebook. Something is scrawled inside.', route: '/blog' },
  { id: 'blueprint',name: 'Blueprint Tube',  icon: '📐', desc: 'Rolled schematics. Most of it is redacted.', route: '/projects' },
  { id: 'gauge',    name: 'Broken Gauge',    icon: '🕹️', desc: 'Reads 100% on everything. Probably fine.', route: '/hobbies' },
  { id: 'dossier',  name: 'Dossier',         icon: '📁', desc: 'A file stamped CLASSIFIED. It\'s about you.', route: '/about' },
];

export function getCollected(): Set<string> {
  if (typeof localStorage === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem('sg_inventory');
    return new Set(raw ? JSON.parse(raw) : []);
  } catch { return new Set(); }
}

export function collect(id: string): boolean {
  if (typeof localStorage === 'undefined') return false;
  const col = getCollected();
  if (col.has(id)) return false;
  col.add(id);
  localStorage.setItem('sg_inventory', JSON.stringify([...col]));
  return true; // returns true if newly collected
}

export function isComplete(): boolean {
  return getCollected().size >= ALL_ITEMS.length;
}
