export interface Project {
  id: string;
  title: string;
  desc: string;
  status: 'complete' | 'in-progress' | 'shelved' | 'planning';
  tags: string[];
  year: number;
  link?: string;
}

export const projects: Project[] = [
  {
    id: 'workshop-site',
    title: 'This Website',
    desc: 'A pixel-art basement workshop site. You are inside it right now. Meta.',
    status: 'in-progress',
    tags: ['sveltekit', 'css', 'web'],
    year: 2026,
  },
  {
    id: 'iot-platform',
    title: 'IoT Platform & Devices',
    desc: 'Hardware prototypes + a platform to manage them. First prototype in progress. The goal: real users, recurring revenue, a small team.',
    status: 'in-progress',
    tags: ['hardware', 'iot', 'firmware', 'platform'],
    year: 2026,
  },
  {
    id: 'civic-platform',
    title: 'Civic Engagement Platform',
    desc: 'A tool to connect people with their local government in a way that actually works. MVP targeting a real community or municipality.',
    status: 'in-progress',
    tags: ['civic', 'web', 'community', 'social-good'],
    year: 2026,
  },
  {
    id: 'cloud-chamber',
    title: 'Permanent Cloud Chamber + HV Mod',
    desc: 'Making cosmic radiation visible with a supersaturated alcohol chamber. The flagship bench project. High voltage modification in progress.',
    status: 'in-progress',
    tags: ['physics', 'high-voltage', 'radiation', 'hardware'],
    year: 2026,
  },
  {
    id: 'geiger-mapper',
    title: 'Geiger Counter + GPS Mapper',
    desc: 'A portable radiation detector that logs location data. Maps background radiation as you move around. Practical and deeply weird.',
    status: 'planning',
    tags: ['physics', 'hardware', 'gps', 'radiation'],
    year: 2026,
  },
  {
    id: 'tesla-coil',
    title: 'Mini Tesla Coil (SSTC)',
    desc: 'A solid-state Tesla coil that plays music through plasma. Because why wouldn\'t you.',
    status: 'planning',
    tags: ['high-voltage', 'plasma', 'audio', 'hardware'],
    year: 2026,
  },
  {
    id: 'radio-telescope',
    title: 'Radio Telescope / H-Line Detector',
    desc: 'Detect the 21cm hydrogen line emission from the Milky Way with a dish and an SDR dongle. Then write Python to process the signal.',
    status: 'planning',
    tags: ['astronomy', 'radio', 'sdr', 'python'],
    year: 2026,
  },
  {
    id: 'eeg',
    title: 'EEG Brain Wave Detector',
    desc: 'Read electrical activity from the brain, visualize it. Part curiosity, part wanting to understand what\'s actually happening up there.',
    status: 'planning',
    tags: ['neuroscience', 'hardware', 'signal-processing'],
    year: 2026,
  },
  {
    id: 'smarthome',
    title: 'Local-Only Smart Home',
    desc: 'Custom home automation stack — AC control & power monitoring over WiFi, temp/humidity over BLE, MQTT broker, and a task manager for orchestrating everything. No cloud. No subscriptions. No data leaving the house.',
    status: 'in-progress',
    tags: ['iot', 'mqtt', 'ble', 'wifi', 'home-automation', 'linux'],
    year: 2026,
  },
  {
    id: 'homelab',
    title: 'Home Lab / Self-Hosted Stack',
    desc: 'A home server running Jellyfin, assorted self-hosted services, and whatever else seems like a good idea at 1am. Ongoing infrastructure project.',
    status: 'in-progress',
    tags: ['self-hosting', 'linux', 'homelab', 'networking'],
    year: 2025,
  },
  {
    id: 'jellyfin',
    title: 'Jellyfin Media Server',
    desc: 'Personal media server for the DVD & Blu-ray collection. No subscriptions. No algorithms. Just the library.',
    status: 'complete',
    tags: ['jellyfin', 'self-hosting', 'media', 'linux'],
    year: 2025,
  },
];
