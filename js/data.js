/* ============================================================
   THE EVIDENCE ROOM — Case Data & Dossier Files
   Thriller-grade prose, zero placeholders, offline procedural assets
   ============================================================ */

const CHAPTERS = [
  {
    id: 'novosibirsk-moscow',
    number: '01',
    caseId: '8809',
    title: 'NOVOSIBIRSK // MOSCOW',
    locationSubtext: 'Moscow Archive Node 04 → Project Vityaz Biosafety Lab',
    coords: '55.0084° N, 82.9357° E',
    victim: 'Dr. Viktor Volkov (Age 38)',
    desc: 'Chief Biochemical Engineer found dead at his workstation inside a sealed Level-4 facility. Case closed within 48 hours under Ministry Directive 44-B.',
    unlocked: true,
    status: 'ACTIVE // CLEARANCE GRANTED',
  },
  {
    id: 'norilsk-subzero-02',
    number: '02',
    caseId: '8814',
    title: '[LOCATION REDACTED]',
    locationSubtext: 'Norilsk Extraction Vault // Siberian Arctic',
    coords: '69.3558° N, 88.1893° E',
    victim: '████████████ (Order 44-B)',
    desc: 'Deep geological cold storage facility. Transmission channel severed by military provost marshal.',
    unlocked: false,
    status: 'ORDER 44-B // SEALED',
  },
  {
    id: 'sochi-deepwater-03',
    number: '03',
    caseId: '8821',
    title: '[LOCATION REDACTED]',
    locationSubtext: 'Black Sea Submersible Terminal // Sochi Coastal',
    coords: '43.6028° N, 39.7342° E',
    victim: '████████████ (Order 44-B)',
    desc: 'Foreign courier exchange nexus. Encrypted telemetry awaiting diplomatic authorization.',
    unlocked: false,
    status: 'ORDER 44-B // SEALED',
  },
];

const CASE_FILES = [
  {
    id: 'death-certificate',
    name: 'DEATH_CERTIFICATE.pdf',
    type: 'pdf',
    meta: 'Official Forensic Autopsy · Scrubbed · 2.4 KB',
    stage: 1,
    locked: false,
    letterhead: {
      agency: 'MINISTRY OF PUBLIC HEALTH // STATE CORONER BUREAU',
      title: 'CERTIFICATE OF DEATH & POST-MORTEM FORENSIC SUMMARY',
      stamp: 'CLASSIFIED // ORDER 44-B',
    },
    metaGrid: [
      { label: 'Subject Name', value: 'Dr. Viktor Volkov' },
      { label: 'Identification', value: 'BIO-8809-VV // LEVEL-4 CLEARANCE' },
      { label: 'Date / Time', value: '14 OCTOBER 2026 // 02:14 MSK' },
      { label: 'Location', value: 'Vityaz Biosafety Lab, Novosibirsk (Workstation 01)' },
      { label: 'Attending Coroner', value: 'Dr. A. Chernov (Chief Medical Examiner)' },
      { label: 'Official Cause', value: 'Acute Myocardial Infarction secondary to acute exhaustion' },
    ],
    redactions: [
      {
        id: 'redact-tox',
        text: 'residual toxicological blood serum screen identified an anomalous synthetic potassium-channel neurotoxin derivative consistent with experimental biological catalog V-7',
      },
      {
        id: 'redact-coercion',
        text: 'Attending physician autopsy certification completed under express verbal directive of General A. Malekov, Military Liaison',
      },
    ],
    contentHtml: `
      <p>Subject was discovered slumped prone over primary workstation terminal WKSTN-01 inside the negative-pressure biocontainment chamber. Biological barrier integrity was uncompromised. No aerosol contaminants detected in local scrubbers.</p>
      
      <p>External examination revealed cyanosis of the distal digits and lips, marked bilateral mydriasis (dilated pupils), and complete absence of mechanical trauma or electrical entry wounds. Initial cardiac telemetry indicated sudden-onset refractory ventricular fibrillation terminating in asystole within 180 seconds.</p>
      
      <p>Toxicological screening subsection: <span class="redaction-bar" data-reveal="redact-tox">[TOXICOLOGY EXCISED BY MILITARY LIAISON ORDER 44-B]</span>. Specimen vials were requisitioned by military provost courier prior to mass-spectrometry quantification.</p>
      
      <p>Administrative determination: Death is ruled non-homicidal natural cardiac arrest. Case #8809 permanently closed. No judicial inquest permitted. <span class="redaction-bar" data-reveal="redact-coercion">[ORDER 44-B ADMINISTRATIVE DIRECTIVE ATTACHED]</span>.</p>
    `,
    marginNotes: [
      "Viktor had a resting heart rate of 52. He ran 10 kilometers every Sunday. He did NOT collapse of natural exhaustion at 38 years old.",
      "Look at the excised toxicology section—Chernov admitted to me in private that Viktor's blood potassium was 9.4 mmol/L. That is an impossible physiological spike without an injected or ingested peptide agent.",
    ],
  },
  {
    id: 'first-responder',
    name: 'FIRST_RESPONDER_NOTES.txt',
    type: 'txt',
    meta: 'Field Dispatch Log · Officer R. Kuznetsova · Typewritten',
    stage: 1,
    locked: false,
    letterhead: {
      agency: 'FEDERAL SECURITY FORENSIC FIRST RESPONSE // SIBERIAN SECTOR',
      title: 'DISPATCH INCIDENT REPORT // CALLSIGN: VITYAZ-RESPONSE-04',
      stamp: 'OFFICIAL FIELD DISPATCH',
    },
    metaGrid: [
      { label: 'Responding Officer', value: 'Senior Inspector Raisa Kuznetsova' },
      { label: 'Dispatch Timestamp', value: '14 OCTOBER 2026 // 02:26 MSK' },
      { label: 'Arrival On Scene', value: '02:31 MSK (Bio-Airlock Entry)' },
      { label: 'Incident Status', value: 'CODE ZERO (Unresponsive Male)' },
    ],
    contentHtml: `
      <p><strong>02:31 MSK:</strong> Breached inner containment airlock. Dr. Viktor Volkov found seated upright, head resting sideways across keyboard console. No palpable carotid pulse. Body temperature warm, extremities flaccid. Defibrillator pads applied; monitor showed flatline asystole. Resuscitation abandoned at 02:35 MSK per protocol.</p>
      
      <p><strong>02:37 MSK:</strong> Preliminary scene sweep. Lab atmospheric monitors registering green across all channels. No chemical spills. On the left side of Viktor's desk sat his personal brushed-steel thermos—still warm to the touch, with traces of black tea and a faint sweet almond residue along the silicone rim.</p>
      
      <p><strong>02:44 MSK:</strong> General Anatoly Malekov's personal aide and driver entered the airlock without prior notification. They presented a signed Ministerial Order 44-B, demanding immediate custody of Viktor's workstation hard drives and personal logbooks.</p>
      
      <p><strong>02:51 MSK:</strong> Before relinquishing the physical disk under protest, I forced a sector dump of the corrupted primary volume. The damaged NVTA partition header was tagged with emergency recovery signature bytes at index offsets: <strong>54 48 41 14 42</strong>. If anyone with forensic clearance reads this: use these five repair bytes to reconstruct the corrupted partition.</p>
      
      <p><strong>03:05 MSK:</strong> Military liaison officially sealed the room. Scene turned over to military provost.</p>
    `,
    marginNotes: [
      "Raisa knew they were going to bury this. She hid the disk sector recovery bytes right in her field notes: 54 48 41 14 42.",
      "Malekov's aide arrived on the scene in 13 minutes. It takes 45 minutes to drive from Moscow military headquarters to Novosibirsk base. He was already waiting in a staff car nearby.",
    ],
  },
  {
    id: 'crime-scene',
    name: 'CRIME_SCENE_DIAGRAM.svg',
    type: 'svg',
    meta: 'Architectural Biosecurity Floorplan · 3 Pulsing Hotspots',
    stage: 1,
    locked: false,
    letterhead: {
      agency: 'PROJECT VITYAZ // BIO-CONTAINMENT LEVEL-4',
      title: 'PRIMARY SYNTHESIS WORKSTATION ARCHITECTURAL DIAGRAM',
      stamp: 'FORENSIC TELEMETRY',
    },
    metaGrid: [
      { label: 'Chamber ID', value: 'L4-CHAMBER-04 (Negative Pressure)' },
      { label: 'Surveillance Node', value: 'CAM_04 INFRARED / OPTICAL' },
      { label: 'Air Recirculation', value: 'HEPA-99.997% (No Aerosol Leak)' },
      { label: 'Access Control', value: 'Biometric Airlock + Keycard Override' },
    ],
    contentHtml: `
      <p>Interactive spatial reconstruction of Chamber 04. Hover and click the three pulsing telemetry hotspots below to examine critical physical evidence recovered from the scene.</p>
    `,
    marginNotes: [
      "The crime scene wasn't broken into—whoever killed Viktor had authorized access and knew his routine down to the second.",
    ],
  },
  {
    id: 'terminal-logs',
    name: 'TERMINAL_LOGS.dat',
    type: 'dat',
    meta: 'Encrypted Disk Dump · Requires Sector Repair',
    stage: 1,
    locked: true,
    letterhead: {
      agency: 'FEDERAL FORENSICS // DATA RECOVERY DIVISION',
      title: 'RECOVERED SECURE WORKSTATION SYSTEM LOGS',
      stamp: 'DECLASSIFIED // SECTOR RESTORED',
    },
    metaGrid: [
      { label: 'Drive Serial', value: 'NVTA-MALEKOV-8809' },
      { label: 'Integrity Check', value: 'CRC32 PASSED (HEADER 54 48 41 14 42)' },
      { label: 'Mount Point', value: '/dev/nvta0s1 (Declassified)' },
      { label: 'Scrubbed By', value: 'LIAISON ADMIN OVERRIDE' },
    ],
    contentHtml: `
      <pre style="font-family:var(--font-mono); font-size:12px; line-height:1.7; color:var(--paper-ink);">
[01:58:12 MSK]  V_VOLKOV     mount /secure/vityaz/serum_v7
[02:01:44 MSK]  V_VOLKOV     warn: toxicology anomaly — synthetic peptide signature detected in culture
[02:04:19 MSK]  L4_AIRLOCK   Keycard access logged: ID #004-VANE [override authorization: GRANTED]
[02:06:55 MSK]  V_VOLKOV     encrypt partition DEADHAND key=KW-NEVA-8809
[02:09:12 MSK]  REMOTE       Session hijack initiated: WKSTN-VANE → WKSTN-VOLKOV [Duration: 14m 18s]
[02:11:03 MSK]  SYSTEM       Order 44-B remote purge invoked by MALEKOV_LIAISON_DAEMON
[02:14:02 MSK]  BIOMETRIC    Subject telemetry: VENTRICULAR FIBRILLATION DETECTED (HR 174 BPM)
[02:14:48 MSK]  BIOMETRIC    Subject asystole flagged — automated medical alert suppressed by remote policy
[02:18:20 MSK]  REMOTE       Session terminated by WKSTN-VANE. Local audit logs zeroed.
      </pre>
    `,
    marginNotes: [
      "Nikolai Vane entered the chamber at 02:04. And his workstation hijacked Viktor's computer while Viktor was going into cardiac arrest.",
      "Viktor knew they were coming for him. He encrypted the deadhand partition with the key KW-NEVA-8809 before he lost consciousness.",
    ],
  },
];

const SUSPECTS = [
  {
    id: 'malekov',
    name: 'General Anatoly Malekov',
    role: 'Military Liaison — Ministry of Defense Oversight',
    motive: 'Cover up multi-million-ruble budget embezzlement and unsanctioned human biological tests before an international audit.',
    alibi: 'Claims continuous presence at a high-level Ministry of Defense strategy conference in Moscow (verified by formal military attendance rolls).',
    secret: 'Perimeter checkpoint camera logs at 02:34 MSK show Malekov\'s personal staff sedan at the Novosibirsk facility; his driver retrieved a sealed dossier containing Viktor\'s classified research binders.',
    avatarSvg: `
      <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="90" fill="#0D1117"/>
        <path d="M40 18C48 18 54 24 54 33C54 42 47 48 40 48C33 48 26 42 26 33C26 24 32 18 40 18Z" fill="#30363D"/>
        <!-- Military Cap & Epaulets -->
        <path d="M22 22C22 16 30 11 40 11C50 11 58 16 58 22L62 25H18L22 22Z" fill="#21262D"/>
        <circle cx="40" cy="17" r="3" fill="#D29922"/>
        <path d="M14 84C14 62 25 54 40 54C55 54 66 62 66 84H14Z" fill="#1C2128"/>
        <path d="M38 54V84M42 54V84" stroke="#D29922" stroke-width="2"/>
        <!-- Medals -->
        <rect x="22" y="62" width="6" height="4" fill="#F85149"/>
        <rect x="29" y="62" width="6" height="4" fill="#D29922"/>
        <rect x="22" y="68" width="6" height="4" fill="#58A6FF"/>
      </svg>
    `,
  },
  {
    id: 'vane',
    name: 'Dr. Nikolai Vane',
    role: 'Chief Co-Researcher & Lead Biochemist',
    motive: 'Professional jealousy, exclusive ownership of the Serum V-7 commercial patent, and a promised $12M offshore windfall from Lindqvist.',
    alibi: 'Logged inside B-Wing secondary laboratory throughout the night shift (verified by automated keycard swipe readers).',
    secret: 'Access readers reveal a 14-minute unlogged gap (02:02–02:16 MSK). Security footage and terminal logs prove he entered Viktor\'s chamber to swap the thermos and operated a remote hijack to wipe the terminal.',
    avatarSvg: `
      <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="90" fill="#0D1117"/>
        <path d="M40 19C47 19 53 25 53 33C53 41 46 47 40 47C34 47 27 41 27 33C27 25 33 19 40 19Z" fill="#30363D"/>
        <!-- Spectacles -->
        <circle cx="35" cy="32" r="5" stroke="#58A6FF" stroke-width="1.5" fill="none"/>
        <circle cx="45" cy="32" r="5" stroke="#58A6FF" stroke-width="1.5" fill="none"/>
        <path d="M40 32H40.5" stroke="#58A6FF" stroke-width="1.5"/>
        <!-- Lab Coat -->
        <path d="M15 85C15 62 26 53 40 53C54 53 65 62 65 85H15Z" fill="#E6EDF3"/>
        <path d="M35 53L40 70L45 53" fill="#21262D"/>
        <rect x="22" y="64" width="8" height="12" rx="2" fill="#8B949E"/>
      </svg>
    `,
  },
  {
    id: 'lindqvist',
    name: 'Soren Lindqvist',
    role: 'International Defense Contractor & Swedish Broker',
    motive: 'Acquire weaponized Serum V-7 formula for auction to a foreign consortium; Viktor was the sole scientist refusing to sign off on export.',
    alibi: 'Out of jurisdiction in Zurich, Switzerland; verified passport check-in and room key scan at the Dolder Grand Hotel.',
    secret: 'Forensic network tracing reveals an active high-bandwidth encrypted VPN tunnel originating not from Zurich, but from a private safehouse just 3.2 kilometers from the Novosibirsk lab compound.',
    avatarSvg: `
      <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="90" fill="#0D1117"/>
        <path d="M40 19C47 19 53 25 53 33C53 41 47 47 40 47C33 47 27 41 27 33C27 25 33 19 40 19Z" fill="#30363D"/>
        <!-- Sunglasses / Sleek Noir -->
        <rect x="31" y="29" width="18" height="6" rx="2" fill="#0D1117"/>
        <!-- Dark Trench Coat -->
        <path d="M15 85C15 60 25 52 40 52C55 52 65 60 65 85H15Z" fill="#161B22"/>
        <path d="M32 52L40 68L48 52" fill="#090D12"/>
        <!-- Earpiece wire -->
        <path d="M52 35C52 44 48 50 48 50" stroke="#8B949E" stroke-width="1" fill="none"/>
      </svg>
    `,
  },
];

const HEX_PUZZLE = {
  grid: [
    '4E', '56', '3F', '41', '00', '88', '09', 'FF',
    '56', '2D', '37', '??', 'DE', 'AD', 'H?', 'ND',
    'A1', 'C0', 'FF', 'EE', '14', 'm?', 'GAP', '00',
    '44', '2D', '42', 'SCR', 'UB', '??', 'OK', '01',
  ],
  targets: [
    { index: 2, correct: '54', label: 'T (NVTA header)' },
    { index: 11, correct: '48', label: 'H (V-7 H)' },
    { index: 14, correct: '41', label: 'A (DEADHA ND)' },
    { index: 21, correct: '14', label: '14 (14m gap marker)' },
    { index: 29, correct: '42', label: 'B (44-B)' },
  ],
  options: ['??', '3F', '54', '48', '41', '14', '42', 'FF', '00', 'C1', '9A'],
  targetSequence: ['54', '48', '41', '14', '42'],
};

const CCTV_DATA = {
  feedName: 'CAM_04 // L4_BIO_CHAMBER // INFRARED NIGHT-VISION',
  startTime: '01:55',
  endTime: '02:40',
  events: [
    {
      time: '02:04',
      title: '02:04 MSK // DR. VANE ENTERS // THERMOS SWAP DETECTED',
      desc: 'Dr. Nikolai Vane enters through airlock holding two mugs. Discretely swaps Viktor\'s steel thermos on the desk console while Viktor is turned toward the incubator.',
    },
    {
      time: '02:14',
      title: '02:14 MSK // DR. VOLKOV COLLAPSE // VENTRICULAR FIBRILLATION',
      desc: 'Dr. Viktor Volkov clutches his chest, knocks over lab supplies, and collapses beside his workstation terminal. Cardiac telemetry indicates rapid asystole.',
    },
    {
      time: '02:34',
      title: '02:34 MSK // MALEKOV AIDE ENTERS // DOSSIER EXFILTRATION',
      desc: 'General Malekov\'s aide in military trench coat enters airlock, removes a sealed dossier stamped ORDER 44-B from Viktor\'s shelf, and departs.',
    },
  ],
};

const TOXICOLOGY_DATA = {
  labels: ['01:50', '01:55', '02:00', '02:04', '02:08', '02:11', '02:14', '02:18', '02:22', '02:25'],
  heartRate: [54, 55, 53, 56, 78, 126, 174, 0, 0, 0],
  potassium: [4.1, 4.2, 4.2, 4.3, 5.8, 7.9, 9.6, 9.8, 9.8, 9.7],
  serumToxin: [0, 0, 0, 12, 48, 86, 99, 99, 95, 90],
};

const WIRETAP_DATA = {
  cipher: {
    ciphertext: 'ZLYBT V-7 KLYPCHAPCL — AOLYTVZ',
    shift: 7,
    plaintext: 'SERUM V-7 DERIVATIVE — THERMOS',
    hint: 'Archival Caesar shift. Move letters 7 places backward.',
  },
  dialogue: [
    {
      speaker: 'DARIA VOLKOV',
      voiceParams: { pitch: 1.05, rate: 0.95, gender: 'female' },
      text: 'Wiretap intercept from the B-Wing secure channel, timestamped twenty minutes prior to Viktor\'s death.',
    },
    {
      speaker: 'DR. NIKOLAI VANE',
      voiceParams: { pitch: 1.25, rate: 1.05, gender: 'male' },
      text: 'The dosage window is four hours. Once the derivative binds to the cardiac receptors, no standard toxicology panel will detect it.',
    },
    {
      speaker: 'GENERAL ANATOLY MALEKOV',
      voiceParams: { pitch: 0.75, rate: 0.9, gender: 'male' },
      text: 'Ensure Viktor\'s personal terminals are wiped before the regional coroner arrives. Order 44-B is already authorized.',
    },
    {
      speaker: 'SOREN LINDQVIST',
      voiceParams: { pitch: 0.95, rate: 1.0, gender: 'male' },
      text: 'The buyer\'s wire transfer of twelve million is in escrow. The formula must be in Zurich by dawn.',
    },
  ],
};

const EVIDENCE_BOARD_DATA = {
  alibis: [
    {
      id: 'alibi-vane',
      suspect: 'Dr. Nikolai Vane',
      title: 'VANE // B-WING CONTINUOUS PRESENCE',
      body: 'Official alibi claims Vane remained inside the secondary synthesis lab all night, supported by continuous electronic badge scans.',
    },
    {
      id: 'alibi-malekov',
      suspect: 'General Anatoly Malekov',
      title: 'MALEKOV // MOSCOW DEFENSE BRIEFING',
      body: 'Official alibi claims Malekov was present in Moscow attending the Ministry of Defense strategic summit with high-ranking officers.',
    },
    {
      id: 'alibi-lindqvist',
      suspect: 'Soren Lindqvist',
      title: 'LINDQVIST // ZURICH HOTEL CHECK-IN',
      body: 'Official alibi claims Lindqvist was out of the country in Switzerland, registered at the Dolder Grand Hotel in Zurich.',
    },
  ],
  contradictions: [
    {
      id: 'contra-vane',
      matchesAlibi: 'alibi-vane',
      title: 'CONTRADICTION // 14-MIN GAP & REMOTE HIJACK',
      body: 'Security footage logs Vane entering Viktor\'s chamber at 02:04 MSK to swap the thermos, followed by a 14-minute remote terminal hijack from Vane\'s PC.',
    },
    {
      id: 'contra-malekov',
      matchesAlibi: 'alibi-malekov',
      title: 'CONTRADICTION // MALEKOV AIDE DOSSIER THEFT',
      body: 'Checkpoint cameras log Malekov\'s staff vehicle at Novosibirsk base; his aide retrieved Viktor\'s classified biological dossier 20 minutes post-mortem.',
    },
    {
      id: 'contra-lindqvist',
      matchesAlibi: 'alibi-lindqvist',
      title: 'CONTRADICTION // NOVOSIBIRSK SAFEHOUSE VPN',
      body: 'High-bandwidth encrypted telemetry reveals Lindqvist\'s VPN tunnel originated from a safehouse just 3.2 kilometers from the Novosibirsk lab.',
    },
  ],
};

const DEADHAND_FILES = {
  'read_me.txt': `Daria—
If you are reading this, Nikolai went through with it. They want the V-7 formula for an illegal foreign sale.
I encrypted the deadhand partition with key: KW-NEVA-8809.
Run command: decrypt KW-NEVA-8809 or mount V_VOLKOV_DEADHAND.
Do not let them bury the truth.
— Viktor`,
  'protocol_v7.txt': `CLASSIFIED RESEARCH PROTOCOL: SERUM V-7 DERIVATIVE
The lethal synthesized derivative sequence consists of 5 peptides:
1. V7-CORE (Synthetic receptor base)
2. NEVA-α (Targeting peptide)
3. MYO-KILL (Potassium-channel blocker)
4. CLOAK-4H (Metabolic masking agent)
5. TRACE-NULL (Rapid enzymatic degrader)
Order of assembly must follow strict covalent bonding sequence.`,
  'kuznetsova_memo.log': `Officer Kuznetsova confidential dispatch:
Scene sanitized under Order 44-B. Hard drives confiscated by Malekov's aide.
Recovery sector signature: 54 48 41 14 42.`,
  'deadhand_vault.enc': `[ENCRYPTED BLOB // MOUNT PARTITION 'V_VOLKOV_DEADHAND' TO ACCESS]`,
};

const SERUM_PUZZLE = {
  pool: ['NEVA-α', 'MYO-KILL', 'V7-CORE', 'BIND-θ', 'CLOAK-4H', 'STABILIZER', 'TRACE-NULL'],
  correctSequence: ['V7-CORE', 'NEVA-α', 'MYO-KILL', 'CLOAK-4H', 'TRACE-NULL'],
  desc: 'Assemble the lethal 5-peptide molecular chain Viktor identified before cardiac arrest.',
};

const INDICTMENT_CONFIG = {
  culprits: [
    { value: 'malekov', label: 'General Anatoly Malekov' },
    { value: 'vane', label: 'Dr. Nikolai Vane' },
    { value: 'lindqvist', label: 'Soren Lindqvist' },
  ],
  weapons: [
    { value: 'airlock', label: 'Induced hypoxia via airlock venting' },
    { value: 'serum-v7', label: 'Serum V-7 lethal derivative (thermos)' },
    { value: 'blunt-force', label: 'Staged blunt trauma' },
  ],
  motives: [
    { value: 'payout-patent', label: '$12M payout + exclusive Serum V-7 patent rights' },
    { value: 'promotion', label: 'Military command promotion' },
    { value: 'revenge', label: 'Personal academic rivalry' },
  ],
  opportunities: [
    { value: 'moscow', label: 'Present during Moscow summit' },
    { value: 'thermos-remote', label: 'Thermos spike + 14-min remote terminal hijack' },
    { value: 'zurich', label: 'Zurich hotel telephone link' },
  ],
  correct: {
    culprit: 'vane',
    weapon: 'serum-v7',
    motive: 'payout-patent',
    opportunity: 'thermos-remote',
    coConspirators: ['malekov', 'lindqvist'],
  },
};

const DEFAULT_GAME_STATE = {
  chapterId: 'novosibirsk-moscow',
  stage: 1, // 1: Sector Repair, 2: CCTV/Biometrics/Wiretap, 3: Deadhand/Indictment
  unlockedFiles: ['death-certificate', 'first-responder', 'crime-scene'],
  revealedDiscrepancies: [],
  notes: [
    { text: 'Mounted Case #8809 from unauthorized Moscow node.', stamp: '02:00', type: 'system' },
    { text: 'Viktor\'s death certificate claims overwork. I know that is a lie.', stamp: '02:01', type: 'clue' },
  ],
  puzzles: {
    hexComplete: false,
    cctvAnalyzed: false,
    cipherComplete: false,
    audioPlayed: false,
    evidenceBoardComplete: false,
    terminalDecrypted: false,
    deadhandMounted: false,
    serumComplete: false,
    indictmentSubmitted: false,
  },
  resolution: null,
};
