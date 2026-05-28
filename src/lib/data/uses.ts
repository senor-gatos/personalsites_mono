// ── USES / SETUP ─────────────────────────────────────────────────────────────
// Edit this file to update the /uses page.

export interface UsesItem {
  name: string;
  desc: string;
  link?: string;
}

export interface UsesSection {
  id: string;
  title: string;
  icon: string;
  items: UsesItem[];
}

export const uses: UsesSection[] = [
  {
    id: 'workstation',
    title: 'The Bench (Workstation)',
    icon: '🖥',
    items: [
      { name: '[Your Computer]',        desc: 'Main machine. Fill this in.' },
      { name: '[Your Monitor(s)]',      desc: 'Fill in size, resolution, etc.' },
      { name: '[Your Keyboard]',        desc: 'Mechanical? Membrane? Fill it in.' },
      { name: '[Your Mouse]',           desc: 'Fill this in.' },
      { name: '[Your Headphones/Audio]',desc: 'Fill this in.' },
    ],
  },
  {
    id: 'homelab',
    title: 'The Server Room (Home Lab)',
    icon: '🖧',
    items: [
      { name: '[Your Server Hardware]', desc: 'CPU, RAM, storage. Fill this in.' },
      { name: 'Ubuntu Server',          desc: 'OS of choice for the home server.', link: 'https://ubuntu.com/server' },
      { name: 'Docker + Compose',       desc: 'All services run in containers. Makes updates trivial.', link: 'https://docs.docker.com/compose/' },
      { name: 'Jellyfin',               desc: 'Media server. No subscriptions. Your library, your rules.', link: 'https://jellyfin.org' },
      { name: 'Tailscale',              desc: 'Zero-config WireGuard VPN. Makes everything accessible everywhere.', link: 'https://tailscale.com' },
      { name: 'Nginx Proxy Manager',    desc: 'Reverse proxy with a nice UI for SSL cert management.', link: 'https://nginxproxymanager.com' },
    ],
  },
  {
    id: 'dev',
    title: 'Development',
    icon: '⌨',
    items: [
      { name: 'VS Code',                desc: 'Editor. The extensions ecosystem is hard to beat.', link: 'https://code.visualstudio.com' },
      { name: 'This website',           desc: 'SvelteKit + MDsveX. Hand-crafted CSS. No UI library.' },
      { name: '[Your terminal]',        desc: 'Fill in your terminal of choice.' },
      { name: '[Your shell config]',    desc: 'zsh, fish, bash? Fill this in.' },
    ],
  },
  {
    id: 'software',
    title: 'Daily Drivers',
    icon: '⚙',
    items: [
      { name: '[Your browser]',         desc: 'Fill this in.' },
      { name: '[Your notes app]',       desc: 'Obsidian, Notion, paper? Fill this in.' },
      { name: 'Letterboxd',             desc: 'Film tracking and logging. The good kind of social media.', link: 'https://letterboxd.com' },
      { name: '[Your music app]',       desc: 'Spotify, Apple Music, local files? Fill this in.' },
    ],
  },
  {
    id: 'bench-tools',
    title: 'Physical Bench Tools',
    icon: '🔧',
    items: [
      { name: '[Your soldering iron]',  desc: 'Brand and model. Fill this in.' },
      { name: '[Your multimeter]',      desc: 'Fill this in.' },
      { name: '[Your 3D printer]',      desc: 'If applicable. Fill this in.' },
      { name: 'iFixit Pro Tech Toolkit',desc: 'The standard kit for device repair.', link: 'https://www.ifixit.com/Store/Tools/Pro-Tech-Toolkit/IF145-307' },
    ],
  },
];
