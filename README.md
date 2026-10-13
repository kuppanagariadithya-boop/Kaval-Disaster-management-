# KAVAL: Last-Mile Disaster Communication and Verification System

> **Final Year Engineering Capstone Project Review & Defense (2025–2026)**  
> **Department of Computer Science & Engineering / IoT & Communication**

---

## 📌 Executive Overview & Abstract

In catastrophic natural disasters (flash floods, cyclones, landslides), conventional warning systems break down at the **"last-mile"**:
1. **The Illiteracy Trap:** Over 25% of rural populations cannot comprehend textual SMS bulletins.
2. **The Verification Void:** Sirens and radio broadcasts are one-way; disaster management agencies have **zero feedback** on who received the alert or where victims are trapped.
3. **Data Network Fragility:** 4G/5G mobile packet data networks require intact fiber backhauls and mains power grids, which collapse first during severe storms.

**KAVAL** introduces an automated, high-resilience architecture that dispatches **synthesized regional voice calls** over 2G Circuit-Switched (CS) fallback channels and solar LoRa repeaters. Citizens acknowledge their safety status using standard phone keypad numbers:
- **`[ 1 ]`** Safe / Sheltered
- **`[ 2 ]`** Trapped / Evacuation Needed
- **`[ 3 ]`** Critical Medical Emergency
- **`[ 4 ]`** Neighbor / Proxy Report

These in-band audio tones are demodulated via the server-side **Goertzel Algorithm** into an automated **Geospatial Rescue Triage Heatmap** for NDRF/SDRF rescue operations.

---

## 🏗️ 4-Tier System Architecture

```
[ Tier 1: Ingestion ] ──────> [ Tier 2: Voice PBX Core ] ──────> [ Tier 3: Last-Mile ] ──────> [ Tier 4: Triage ]
  • Sensor Telemetry            • Asterisk / Kamailio SIP          • 2G CS-Voice Handsets         • Goertzel Demodulation
  • OASIS CAP v1.2 XML          • Neural Multilingual TTS          • Solar 868MHz LoRa Mesh       • TPS Priority Ranking
  • IoT Ultrasound Gauges       • Batch Priority Dispatch          • 100W Community PA Horns      • GIS Rescue Boat Map
```

---

## 🚀 Live Demo & Website Formats

- **Single-File Standalone Review (Open directly in any browser):** `kaval-review.html`
- **React 19 + Vite + Three.js Application:** `npm run dev` (Port 5175)
- **Production Bundle:** Pre-built in `/dist`

---

## 📊 Key Results & Empirical Benchmarks

- **Acknowledgement Turnaround Latency:** **8.4 seconds** median (vs 2.4 - 5.8 hours for text SMS)
- **Citizen Response Rate:** **88.6%** (vs 16.4% SMS read receipts)
- **DTMF Demodulation Precision:** **99.4%** at -12 dB SNR telephone line noise
- **Demographic Comprehension:** **96.8%** across dialectal voice testing

---

## 👥 Project Team & Credentials

- **Team Lead:** Kuppanagari Adithya
- **Faculty Mentor:** Dr. K. S. Rajasekaran, M.Tech, Ph.D
- **Academic Year:** 2025–2026
