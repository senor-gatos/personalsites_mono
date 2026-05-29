---
title: "Building a Local-Only Smart Home (No Cloud Required)"
date: "2026-05-28"
tags: ["iot", "mqtt", "ble", "home-automation", "self-hosting"]
excerpt: "Full home automation with AC control, power monitoring, temp and humidity sensors — all running locally, all yours, nothing phoning home."
---

Most smart home products want to be your friend. They want to be in the cloud. They want a subscription. They want to know when you're home, how warm you like it, and what time you go to bed.

No thanks.

This is the build log for a fully local home automation stack — AC control and power monitoring over WiFi, temperature and humidity sensing over BLE, an MQTT broker tying it all together, and a task manager handling the automation logic. Everything runs on the home server. Nothing leaves the network.

## The Stack

**Protocol choices:**

| Layer | Protocol | Why |
|---|---|---|
| AC + power control | WiFi | ESP32-based devices, easy to flash |
| Temp/humidity | BLE | Low power, no WiFi overhead, sensors run for months on a battery |
| Message bus | MQTT (Mosquitto) | Lightweight, battle-tested, works great on a Pi or home server |
| Automation logic | Custom task manager / cron | Full control, no vendor lock-in |

## Hardware

**Air conditioning control:**
Flashed a [your AC IR blaster / smart plug here] with custom firmware. The ESP32 reads MQTT commands and fires IR signals at the AC unit — effectively giving the AC a local API it never had.

The beauty here: the AC has no idea anything changed. It still responds to the remote. We just added a silent middleman.

**Power monitoring:**
[Your power monitoring device — Shelly EM, Sonoff POW, or similar] on the main circuits I care about. Reports live wattage to the broker every few seconds. Great for knowing if you left the AC blasting while you're away, or for spotting devices that never actually turn off.

**Temperature & humidity sensors:**
[Your BLE sensors — Xiaomi, Govee, or DIY] scattered around the house. BLE beacons broadcasting readings every 30 seconds. A daemon on the server picks them up and publishes to MQTT. No WiFi credentials, no pairing app, just passive broadcasts.

The BLE approach is underrated. These sensors run for 6-12 months on a CR2032. There's nothing to configure after initial setup. They just talk and anything listening can hear them.

## MQTT Broker

Running Mosquitto in Docker on the home server:

```yaml
services:
  mosquitto:
    image: eclipse-mosquitto
    container_name: mosquitto
    volumes:
      - ./config:/mosquitto/config
      - ./data:/mosquitto/data
      - ./log:/mosquitto/log
    ports:
      - "1883:1883"
    restart: unless-stopped
```

Minimal config — local network only, no external access, no TLS needed (it's a private LAN):

```
listener 1883 0.0.0.0
allow_anonymous true
persistence true
persistence_location /mosquitto/data/
log_dest file /mosquitto/log/mosquitto.log
```

The topic structure I landed on:

```
home/
  living_room/
    temp          ← BLE sensor reading
    humidity      ← BLE sensor reading
    ac/state      ← current AC state (on/off/temp/mode)
    ac/command    ← publish here to control AC
  office/
    temp
    humidity
  power/
    ac_circuit    ← live watts
    server_room   ← live watts
    total         ← total draw
```

Clean, readable, easy to add new rooms.

## BLE to MQTT Bridge

A small Python daemon runs on the server, scanning for BLE advertisements and publishing readings. The sensors broadcast in a predictable format — parsing varies by brand but libraries like `bluetooth-sensor-state-data` handle most common ones.

```python
# simplified sketch
import asyncio
from bleak import BleakScanner
import paho.mqtt.client as mqtt

mqtt_client = mqtt.Client()
mqtt_client.connect("localhost", 1883)

async def scan():
    devices = await BleakScanner.discover(timeout=10)
    for device in devices:
        if device.address in KNOWN_SENSORS:
            reading = parse_advertisement(device)
            topic = f"home/{KNOWN_SENSORS[device.address]}/temp"
            mqtt_client.publish(topic, reading.temperature)

while True:
    asyncio.run(scan())
    time.sleep(25)
```

Runs as a systemd service. Restarts automatically if it crashes. Logs to journald.

## Automation Logic

This is the part I'm still iterating on. The decision: cron jobs vs. a proper task manager.

**Cron approach:** Simple, reliable, Unix-native. Turn on AC at 5pm on weekdays. Check humidity, run dehumidifier if above threshold. Works well for time-based rules.

**Task manager approach:** More flexible. Rules like "if temperature above 27°C AND power draw below 500W AND time is between 8am-10pm, enable cooling" become composable. I'm leaning toward building a small rules engine that subscribes to MQTT and publishes commands.

Current thinking is a hybrid: cron for simple scheduled jobs, a lightweight Python rules engine for conditional logic. The rules engine is just a loop that reads from MQTT, evaluates conditions, and publishes commands.

```
[MQTT broker]
    ↑              ↓
[BLE bridge]    [Rules engine]
[ESP32 devices]     ↓
                [AC command topic]
                    ↓
                [ESP32 IR blaster]
                    ↓
                [Air conditioner]
```

No cloud anywhere in that diagram. That's the point.

## What Works Now

- ✅ BLE sensors reading and publishing every 30 seconds
- ✅ AC control via MQTT command
- ✅ Power monitoring live in the dashboard
- ✅ Basic scheduled automation via cron
- 🔧 Rules engine — in progress
- 📋 Dashboard UI — planned

## What's Next

A lightweight local dashboard (probably just a SvelteKit app pointing at the MQTT broker via WebSocket) so I can see everything at a glance without opening a terminal. And the rules engine — once that's done, the automation gets genuinely useful rather than just cool.

The goal isn't a smart home that does everything automatically. It's a home where I control everything precisely, from wherever I am, without trusting a third party to not sunset their API.

---

*If you're building something similar or want to compare notes, find me on [Discord](/about).*
