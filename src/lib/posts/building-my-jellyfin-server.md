---
title: "Building My Home Media Server with Jellyfin"
date: "2026-05-28"
tags: ["self-hosting", "jellyfin", "homelab", "linux"]
excerpt: "No subscriptions. No algorithms. No content disappearing overnight. Just the library, running in the basement."
---

I have a DVD collection. A real one — physical discs, cases, the whole thing. And for a long time it just sat on a shelf looking good while I paid for three streaming services and still couldn't find anything to watch.

That changes now.

## Why Jellyfin

The short version: it's free, open source, and you own it. No subscription, no terms-of-service change that suddenly removes your access, no algorithm pushing you toward whatever they need to monetize this quarter. You rip your discs, you run the server, you watch your stuff.

The alternatives I looked at:

- **Plex** — the obvious choice, but the free tier is increasingly crippled and it phones home constantly. Hard pass.
- **Emby** — Jellyfin's predecessor, now proprietary. The community forked it into Jellyfin specifically because of this.
- **Jellyfin** — fully open source, actively maintained, genuinely excellent. This is the one.

## The Hardware

I'm running Jellyfin on a dedicated home server that was already handling some other self-hosted services. The specs don't need to be impressive for a personal library — the key requirement is hardware transcoding support if you want to stream to devices that can't handle the native file format.

**Server specs:**
- CPU: [your CPU here]
- RAM: [your RAM here]
- Storage: [your storage setup — HDDs for media, SSD for OS]
- OS: Ubuntu Server [version]

For transcoding, integrated graphics or a dedicated GPU with NVENC/QuickSync support makes a huge difference. Software transcoding on a low-power CPU can choke on 1080p, let alone 4K.

## Ripping the Collection

Before you can serve anything, you need the files. I use **MakeMKV** for ripping — it's the industry standard, handles copy protection (for personal backups, which is legal in many jurisdictions — check yours), and outputs lossless MKV files.

For compression after ripping, **HandBrake** is excellent. I use the H.264 MKV preset with quality tuned to RF18 for most films — good balance of quality and file size. For stuff I care a lot about visually, I skip compression and keep the lossless MKV.

File naming matters for Jellyfin's metadata scraping. The standard is:

```
Movies/
  Film Title (Year)/
    Film Title (Year).mkv
TV Shows/
  Show Name/
    Season 01/
      Show Name - S01E01 - Episode Title.mkv
```

Get this right and Jellyfin will pull metadata, posters, and descriptions automatically from TheMovieDB.

## Installation

I'm running Jellyfin in Docker because it makes updates trivial and keeps things contained. The compose file is minimal:

```yaml
services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    network_mode: host
    volumes:
      - /path/to/config:/config
      - /path/to/cache:/cache
      - /path/to/media:/media:ro
    restart: unless-stopped
    environment:
      - JELLYFIN_PublishedServerUrl=http://your-server-ip
```

The `:ro` on the media mount is intentional — read-only means Jellyfin can't accidentally touch the files.

After `docker compose up -d`, hit `http://your-server-ip:8096` and run through the setup wizard. It'll ask you to add library folders, pick the media type, and that's mostly it.

## Hardware Transcoding Setup

Out of the box, Jellyfin will software-transcode everything. That's fine for a few streams but burns CPU. To enable hardware transcoding:

1. Dashboard → Playback → Transcoding
2. Select your hardware acceleration method (Intel QuickSync, NVIDIA NVENC, etc.)
3. Pass through the device to Docker — for Intel iGPU, add `--device /dev/dri:/dev/dri` to your compose file

After enabling this, watch your CPU usage drop off a cliff when streaming. The difference is dramatic.

## Remote Access

For access outside the house I use **Tailscale** — a zero-config WireGuard VPN that makes your devices act like they're on the same local network. No port forwarding, no dynamic DNS, no exposing Jellyfin to the public internet. Install Tailscale on the server and your phone/laptop, and the Jellyfin URL just works from anywhere.

If you want proper remote access without VPN, you can use a reverse proxy (Caddy or Nginx Proxy Manager) with a domain and SSL. But Tailscale is simpler and frankly more secure for personal use.

## The Result

The collection is [see the media page](/media) — physical discs I've owned for years, finally accessible from any screen in the house. Or from my phone on the road. Or from a friend's TV when we want to watch something specific.

The streaming services are still there for new releases. But for the stuff I actually care about — the films I've bought, the series I've rewatched enough times to warrant owning — the library is mine now.

That feels good.

---

*Running any self-hosted services? Always curious what other people are running in their basements — find me on [Discord](/about) or [Bluesky](/about).*
