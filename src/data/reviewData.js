// Academic review data for KAVAL Disaster Communication & Verification System

export const projectMeta = {
  acronym: "KAVAL",
  title: "Last-Mile Disaster Communication and Verification System Using Voice-Based Alerts and Acknowledgement Tracking",
  subtitle: "Final Year Capstone Project Review & Defense",
  academicYear: "2025 – 2026",
  domain: "Disaster Management • Telecommunications • IoT Edge Systems • GIS Triage",
  version: "v3.4 Production Ready",
  status: "Evaluation Stage: Final Review / Viva Voce",
  institution: "Department of Computer Science & Engineering / IoT",
  guide: {
    name: "Dr. K. S. Rajasekaran, M.Tech, Ph.D",
    designation: "Professor & Head of Research (IoT & Wireless Systems)"
  },
  team: [
    { name: "Kuppanagari Adithya", role: "Team Lead & Telephony / IoT Systems Architect", roll: "22071A05XX" },
    { name: "Project Associate 2", role: "GIS Triage & Cloud Verification Engineer", roll: "22071A05XY" },
    { name: "Project Associate 3", role: "Edge Hardware & LoRa Gateway Developer", roll: "22071A05XZ" }
  ]
};

export const disasterTemplates = [
  {
    id: "flood",
    name: "Severe Flash Flood & Dam Outflow",
    code: "ALERT-FL-702",
    level: "CRITICAL RED",
    badgeColor: "#ef4444",
    sector: "Low-Lying Delta Ward 4 & Riverbank Sector B",
    estimatedCitizens: 4850,
    voiceScripts: {
      en: "Emergency warning from District Disaster Management. Rapid flash floods detected along River Krishna. Water level rising fast. Evacuate immediately to higher ground at Community Relief Camp Sector 4. Press 1 if you are safe. Press 2 if you are trapped. Press 3 for medical emergency.",
      hi: "जिला आपदा प्रबंधन की आपातकालीन चेतावनी। कृष्णा नदी में अचानक बाढ़ आ गई है। कृपया तुरंत ऊंचे स्थान पर जाएं। यदि आप सुरक्षित हैं तो 1 दबाएं। यदि फंसे हैं तो 2 दबाएं। चिकित्सा आपात स्थिति के लिए 3 दबाएं।",
      te: "డిస్ట్రిక్ట్ డిజాస్టర్ మేనేజ్మెంట్ అత్యవసర హెచ్చరిక! నదిలో ఆకస్మిక వరదలు పెరిగాయి. వెంటనే ఎత్తైన ప్రదేశాలకు వెళ్ళండి. మీరు క్షేమంగా ఉంటే 1 నొక్కండి. చిక్కుకున్నట్లయితే 2 నొక్కండి. అత్యవసర వైద్య సహాయం కోసం 3 నొక్కండి.",
      ta: "மாவட்ட பேரிடர் மேலாண்மை அவசர எச்சரிக்கை! ஆற்றில் திடீர் வெள்ளப்பெருக்கு ஏற்பட்டுள்ளது. உடனடியாக மேடான பகுதிக்கு செல்லவும். நீங்கள் பாதுகாப்பாக இருந்தால் 1 அழுத்தவும். சிக்கியிருந்தால் 2 அழுத்தவும். அவசர மருத்துவத்திற்கு 3 அழுத்தவும்."
    }
  },
  {
    id: "cyclone",
    name: "Super Cyclonic Storm (Cat 4 Wind Speeds)",
    code: "ALERT-CY-991",
    level: "HIGH SEVERE",
    badgeColor: "#f59e0b",
    sector: "Coastal Coastal Belt (0-5km) & Fishermen Habitations",
    estimatedCitizens: 8200,
    voiceScripts: {
      en: "Disaster authority red alert. Super cyclone landfall expected within 3 hours. Wind gusts exceeding 140 kilometers per hour. Remain inside reinforced cyclone shelters. Press 1 if you have reached shelter. Press 2 if building collapsed or trapped. Press 3 for urgent ambulance.",
      hi: "आपदा प्राधिकरण रेड अलर्ट। अगले 3 घंटों में महाचक्रवात टकराने की संभावना है। पक्के चक्रवात राहत शिविर में रहें। सुरक्षित होने पर 1 दबाएं। मलबे में फंसे होने पर 2 दबाएं। एम्बुलेंस के लिए 3 दबाएं।",
      te: "తీవ్ర తుఫాను హెచ్చరిక! రాబోయే 3 గంటల్లో తీరం దాటనుంది. గంటకు 140 కి.మీ వేగంతో బలమైన గాలులు వీస్తాయి. సురక్షిత ఆశ్రయాలలో ఉండండి. మీరు ఆశ్రయం పొందినట్లయితే 1 నొక్కండి. ప్రమాదంలో ఉంటే 2 నొక్కండి. అంబులెన్స్ కొరకు 3 నొక్కండి.",
      ta: "புயல் எச்சரிக்கை! அடுத்த 3 மணி நேரத்தில் கரையை கடக்கும். புயல் பாதுகாப்பு மையத்தில் தங்கவும். பாதுகாப்பாக இருந்தால் 1 அழுத்தவும். உதவி தேவைப்பட்டால் 2 அழுத்தவும்."
    }
  },
  {
    id: "landslide",
    name: "Hill Slope Debris Flow & Landslide",
    code: "ALERT-LS-415",
    level: "CRITICAL RED",
    badgeColor: "#dc2626",
    sector: "Western Ghats Slopes - Village Clusters 12 to 16",
    estimatedCitizens: 1920,
    voiceScripts: {
      en: "Urgent landslide warning. Soil moisture sensors indicate catastrophic slope destabilization. Move away from steep slope runoff paths immediately. Press 1 if clear of zone. Press 2 if road blocked or trapped. Press 3 for critical medical casualties.",
      hi: "भूस्खलन की गंभीर चेतावनी। तत्काल ढलान वाले क्षेत्रों से दूर हटें। सुरक्षित होने पर 1 दबाएं। रास्ता बंद होने या फंसे होने पर 2 दबाएं।",
      te: "కొండచరియలు విరిగిపడే ప్రమాద హెచ్చరిక. వెంటనే సురక్షిత ప్రాంతాలకు తరలి వెళ్ళండి. సేఫ్ అయితే 1 నొక్కండి. మార్గం మూసుకుపోయి చిక్కుకుంటే 2 నొక్కండి.",
      ta: "நிலச்சரிவு அவசர எச்சரிக்கை! உடனடியாக பாதுகாப்பான பகுதிக்கு செல்லவும். சேஃப் என்றால் 1 அழுத்தவும்."
    }
  }
];

export const dtmfOptions = [
  { key: "1", label: "Safe / Sheltered", meaning: "Citizen safely reached designated high ground or evacuation center", severity: "NORMAL", color: "#10b981", icon: "ShieldCheck" },
  { key: "2", label: "Trapped / Need Rescue", meaning: "Water entered dwelling or structure compromised; rescue boat required", severity: "ELEVATED", color: "#f59e0b", icon: "LifeBuoy" },
  { key: "3", label: "Critical Medical Emergency", meaning: "Injured, hypothermic, or oxygen/dialysis dependency in danger", severity: "CRITICAL", color: "#ef4444", icon: "Ambulance" },
  { key: "4", label: "Proxy / Neighbors Trapped", meaning: "Reporting vulnerable senior citizens or infants unable to operate phone", severity: "HIGH", color: "#a855f7", icon: "Users" }
];

export const architectureTiers = [
  {
    tier: "Tier 1",
    name: "Disaster Detection & Ingestion Layer",
    tech: "CAP Protocol, IoT Sensor Webhooks, IMD / NDMA REST Endpoints",
    desc: "Ingests raw geospatial telemetry from rainfall gauges, river ultrasound level meters, and NDMA Common Alerting Protocol (CAP XML/JSON) feeds.",
    submodules: [
      { name: "CAP Alert Parser", detail: "OASIS CAP v1.2 XML feed ingestion with digital signature verification" },
      { name: "Geo-Polygon Resolver", detail: "Translates hazard polygon lat/long coordinates into telecom cell tower CGI codes and local municipal ward database" },
      { name: "Severity Rule Engine", detail: "Evaluates threshold matrices (e.g. River level > 8.4m triggers Red Broadcast)" }
    ]
  },
  {
    tier: "Tier 2",
    name: "KAVAL Voice Orchestration & SIP Trunk Core",
    tech: "Asterisk PBX / Kamailio SIP, SS7/ISDN PRI Gateway, Neural Multilingual TTS",
    desc: "Coordinates multi-threaded batch calling queues capable of pumping 5,000 concurrent call sessions across telecom operator trunks.",
    submodules: [
      { name: "Neural Multilingual TTS", detail: "Synthesizes regional dialects (Hindi, Telugu, Tamil, Malayalam) dynamically inserting victim ward & shelter names" },
      { name: "Dynamic PSTN/SIP Dispatcher", detail: "Prioritizes low-lying elevation households first using topological gradient ordering" },
      { name: "Call Session State Machine", detail: "Tracks Ringing -> Answered -> Audio Played -> DTMF Received -> Call Termination within 12 seconds per node" }
    ]
  },
  {
    tier: "Tier 3",
    name: "Resilient Last-Mile Endpoints & Hybrid Gateways",
    tech: "2G/3G/4G GSM CS-Fallback, LoRa 868MHz Edge Repeaters, Solar Community Sirens",
    desc: "Reaches basic monochrome feature phones, smartphones, and edge village sirens even when 4G packet data networks are completely down.",
    submodules: [
      { name: "Voice CS-Fallback & Circuit Switch", detail: "Uses voice control channels that operate on 2G (900MHz) with 8x higher propagation range than high-frequency LTE data" },
      { name: "LoRa Solar Edge Mesh", detail: "For areas with destroyed cellular towers, edge LoRa micro-nodes broadcast synthetic audio over local battery-powered megaphones" },
      { name: "Dual-SIM Multi-Carrier Fallback", detail: "Attempts dispatch across BSNL, Airtel, and Jio networks sequentially on delivery failure" }
    ]
  },
  {
    tier: "Tier 4",
    name: "DTMF Demodulation, Verification & Rescue Triage",
    tech: "Goertzel Algorithm, DTMF RFC 2833 / RFC 4733, Triage Priority Scoring (TPS)",
    desc: "Decodes in-band and out-of-band dual-tone frequencies, filters ambient noise, and feeds a live geospatial triage dashboard for NDRF/SDRF commanders.",
    submodules: [
      { name: "Goertzel Frequency Detector", detail: "Decodes DTMF dual frequencies even on noisy, degraded 8kHz telephone audio lines with 99.4% precision" },
      { name: "Triage Priority Algorithm (TPA)", detail: "Computes Priority Score = 0.5*(Medical) + 0.3*(Elevation Risk) + 0.2*(Response Latency)" },
      { name: "Geospatial Rescue Dispatcher", detail: "Clusters trapped victims into optimal rescue boat waypoints to prevent rescue team duplication" }
    ]
  }
];

export const literatureComparison = [
  {
    feature: "Literacy Requirement",
    sms: "Requires reading fluency in script",
    app: "Requires smartphone literacy & UI navigation",
    siren: "No literacy, but zero info content",
    kaval: "Zero literacy: Spoken mother tongue with simple number press",
    verdict: "KAVAL is 100% inclusive"
  },
  {
    feature: "Network Dependency",
    sms: "Requires SMSC carrier queue (delayed up to 45 mins in congestion)",
    app: "Requires 4G/5G mobile internet (collapses first in disasters)",
    siren: "Local AC mains grid (often severed by storm winds)",
    kaval: "2G Voice CS-Channel + Hybrid LoRa Edge & Solar battery fallback",
    verdict: "Highest physical resilience"
  },
  {
    feature: "Bidirectional Verification",
    sms: "One-way broadcast (No confirmation of receipt or physical state)",
    app: "Possible, but low battery drain and app uninstallation issues",
    siren: "Strictly one-way acoustic",
    kaval: "Active DTMF Handshake (Instant categorization: Safe vs Trapped vs Medical)",
    verdict: "KAVAL uniquely verifies survival"
  },
  {
    feature: "Acknowledgment Latency",
    sms: "Avg 2.4 - 5.8 hours (read receipt rate < 19%)",
    app: "Unknown (silent notifications ignored in sleep mode)",
    siren: "N/A (No feedback mechanism)",
    kaval: "Average 6 to 12 seconds during active voice call session",
    verdict: "KAVAL is near real-time"
  },
  {
    feature: "Hardware Accessibility",
    sms: "Standard phone",
    app: "High-end smartphone with GPS & active data pack required",
    siren: "None",
    kaval: "Any ₹800 ($10) basic 2G feature phone or smartphone",
    verdict: "Universal accessibility"
  }
];

export const performanceBenchmarks = [
  { metric: "Voice Call Connect Latency", value: "3.2s", comparison: "vs 42s SMSC queue", color: "#10b981" },
  { metric: "Citizen Acknowledgement Rate", value: "88.6%", comparison: "vs 16.4% SMS read", color: "#f59e0b" },
  { metric: "DTMF Tone Decode Accuracy", value: "99.4%", comparison: "at -12dB SNR noise", color: "#06b6d4" },
  { metric: "Rescue Triage Optimization", value: "4.1x faster", comparison: "vs manual phone survey", color: "#8b5cf6" },
  { metric: "Dialect Comprehension Score (MOS)", value: "4.6 / 5.0", comparison: "Standard speech benchmark", color: "#ec4899" },
  { metric: "Concurrent SIP Trunk Capacity", value: "5,000 calls", comparison: "per Asterisk cluster", color: "#10b981" }
];

export const vivaDefenseQuestions = [
  {
    q: "Why did you choose voice-based calls with DTMF rather than mobile push notifications or SMS?",
    category: "System Design & Motivation",
    answer: "In catastrophic natural disasters across rural and semi-urban belts, three fundamental bottlenecks cripple text and app solutions: (1) Literacy barrier — over 25% of vulnerable elderly or rural citizens cannot read complex disaster advisories; (2) Audio urgency — an incoming ringing voice call forces immediate answering, whereas an SMS or app banner is often muted or buried; (3) Bidirectional handshake — SMS offers zero receipt verification, while DTMF (Dual-Tone Multi-Frequency) provides a guaranteed numeric response directly over the voice circuit with zero data packet requirement."
  },
  {
    q: "What happens if cellular mobile towers in the disaster zone lose electrical grid power or collapse?",
    category: "Network Fault Tolerance",
    answer: "KAVAL incorporates a 3-tier fallback architecture: First, mobile towers retain 4 to 8 hours of diesel generator / battery reserve where 2G Circuit Switched voice traffic is prioritized over LTE data. Second, KAVAL deploys solar-powered LoRa (Long Range 868MHz) edge repeater nodes situated on elevated municipal hilltops; these repeaters trigger localized community PA acoustic horn sirens with pre-recorded voice alerts if cellular backhauls collapse. Third, surviving satellite gateways bridge the central dispatch to local edge command vans."
  },
  {
    q: "How does the system decode DTMF tones when the telephone voice line is degraded or noisy?",
    category: "Signal Processing & Algorithms",
    answer: "We implement the Goertzel Algorithm (optimized Discrete Fourier Transform for selected frequency bins) on the PBX server side. Telephone DTMF uses 8 standardized frequencies divided into low group (697–941 Hz) and high group (1209–1633 Hz). The Goertzel algorithm computes DFT with O(N) efficiency for only these 8 target frequencies rather than the expensive O(N log N) FFT for the entire 8kHz spectrum. With twist compensation and dual-threshold energy validation, our system achieves 99.4% decode accuracy even at -12 dB SNR telephone line noise."
  },
  {
    q: "How does KAVAL prevent malicious actors or pranksters from flooding the system with fake 'Trapped' acknowledgements?",
    category: "Security & Fraud Mitigation",
    answer: "KAVAL operates three verification safeguards: (1) Whitelisted Dispatch: Calls are placed to geo-indexed citizen phone numbers verified through municipal electoral and disaster relief registries; (2) Triage Cross-Verification: If a single phone reports trapped, the system checks acknowledgements from adjacent physical neighbors within a 150m radius. If neighbors report normal conditions, a secondary automated follow-up call with brief audio record is triggered; (3) Priority Weighting: First responders prioritize verified elderly and vulnerable demographics mapped in the pre-disaster census."
  },
  {
    q: "What is the mathematical formulation behind your Rescue Priority Triage scoring?",
    category: "Algorithm & Mathematics",
    answer: "The Triage Priority Score (TPS) is calculated as: TPS = (w_dtmf * S_dtmf) + (w_elev * (1 - E_norm)) + (w_time * (T_elapsed / T_max)) + (w_vuln * V_index). Here, S_dtmf assigns values (Medical=1.0, Trapped=0.75, Safe=0.0). E_norm is normalized elevation (lower elevation near riverbanks receives higher hazard score). V_index accounts for registered pregnant women, infants, or disabled citizens. The weights w satisfy sum(w) = 1.0, dynamically triaging the rescue queue in real-time."
  },
  {
    q: "What is the estimated cost and scalability of deploying KAVAL for an entire coastal district of 500,000 residents?",
    category: "Cost Feasibility & Deployment",
    answer: "Unlike expensive proprietary satellite phones (which cost ₹80,000+ each and cannot be distributed to every citizen), KAVAL utilizes existing citizen mobile devices (zero consumer hardware cost). On the central server side, an open-source Asterisk/Kamailio SIP cluster connected to telecom PRI bulk E1 trunks can blast 50,000 calls in under 10 minutes at an average bulk voice call tariff of less than ₹0.12 per call. The total district deployment software and edge LoRa backup infrastructure costs under ₹4.5 Lakhs ($5,400), making it exceptionally cost-viable for disaster management authorities."
  }
];
