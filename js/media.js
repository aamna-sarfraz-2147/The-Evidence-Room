/* ============================================================
   THE EVIDENCE ROOM — Procedural Multimedia Engine
   Zero broken external assets: Canvas CCTV, Web Audio + Speech,
   Chart.js Biometrics, Inline SVG Crime Scene, Leaflet Map
   ============================================================ */

const MediaEngine = (() => {
  /* ============================================================
     1. INLINE SVG ARCHITECTURAL CRIME SCENE VIEWER
     ============================================================ */
  function renderCrimeScene(containerId, popupCardId) {
    const container = document.getElementById(containerId);
    const popupCard = document.getElementById(popupCardId);
    if (!container) return;

    container.innerHTML = `
      <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" style="background:#090D13; border-radius:8px;">
        <defs>
          <pattern id="gridPattern" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#161B22" stroke-width="0.8"/>
          </pattern>
          <radialGradient id="hotspotGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#58A6FF" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#58A6FF" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <!-- Floor Grid -->
        <rect width="800" height="480" fill="url(#gridPattern)"/>

        <!-- Lab Outer Walls -->
        <rect x="50" y="40" width="700" height="400" fill="none" stroke="#30363D" stroke-width="3"/>
        <rect x="54" y="44" width="692" height="392" fill="#0D1117" opacity="0.6"/>

        <!-- Hazard Corridor Striping -->
        <line x1="50" y1="40" x2="750" y2="40" stroke="#D29922" stroke-dasharray="8 6" stroke-width="2"/>
        <line x1="50" y1="440" x2="750" y2="440" stroke="#D29922" stroke-dasharray="8 6" stroke-width="2"/>

        <!-- Decontamination Airlock Zone -->
        <rect x="50" y="160" width="120" height="160" fill="#161B22" stroke="#484F58" stroke-width="1.5"/>
        <text x="60" y="185" fill="#8B949E" font-family="JetBrains Mono" font-size="10" letter-spacing="1">L4 AIRLOCK</text>
        <!-- Airlock Sliding Door -->
        <line x1="170" y1="180" x2="170" y2="300" stroke="#58A6FF" stroke-width="3"/>

        <!-- Biosecurity Hood & Workbench -->
        <rect x="230" y="70" width="340" height="80" fill="#1C2128" stroke="#30363D" stroke-width="1.5"/>
        <text x="245" y="100" fill="#6E7681" font-family="JetBrains Mono" font-size="10">LAMINAR FLOW CABINET // SERUM SYNTHESIS</text>

        <!-- Viktor's Workstation Console Desk -->
        <rect x="300" y="220" width="220" height="110" rx="4" fill="#1C2128" stroke="#388BFD" stroke-width="1.5"/>
        <text x="315" y="245" fill="#8B949E" font-family="JetBrains Mono" font-size="10">WKSTN-01 (VIKTOR VOLKOV)</text>
        
        <!-- Monitors on desk -->
        <rect x="330" y="260" width="60" height="20" fill="#0D1117" stroke="#58A6FF" stroke-width="1"/>
        <rect x="400" y="260" width="60" height="20" fill="#0D1117" stroke="#58A6FF" stroke-width="1"/>
        <!-- Chair footprint -->
        <circle cx="400" cy="360" r="18" fill="#161B22" stroke="#484F58" stroke-dasharray="3 3"/>

        <!-- Incubator & Storage Racks -->
        <rect x="620" y="70" width="100" height="150" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
        <text x="630" y="95" fill="#6E7681" font-family="JetBrains Mono" font-size="9">VAULT COLD-4C</text>

        <!-- Emergency Shower & Eye Wash -->
        <circle cx="670" cy="380" r="24" fill="#0D1117" stroke="#F85149" stroke-width="1.5"/>
        <text x="645" y="384" fill="#F85149" font-family="JetBrains Mono" font-size="8">SAFETY SHOWER</text>

        <!-- HOTSPOT A: Viktor's Steel Thermos -->
        <g id="hotspot-thermos" class="hotspot-group" transform="translate(315, 280)">
          <circle cx="0" cy="0" r="16" fill="url(#hotspotGlow)" class="hotspot-pulse"/>
          <circle cx="0" cy="0" r="6" fill="#D29922"/>
          <text x="12" y="4" fill="#D29922" font-family="JetBrains Mono" font-size="11" font-weight="700">[A] THERMOS</text>
        </g>

        <!-- HOTSPOT B: Airlock Biometric Keypad -->
        <g id="hotspot-keypad" class="hotspot-group" transform="translate(170, 240)">
          <circle cx="0" cy="0" r="16" fill="url(#hotspotGlow)" class="hotspot-pulse"/>
          <circle cx="0" cy="0" r="6" fill="#58A6FF"/>
          <text x="-95" y="4" fill="#58A6FF" font-family="JetBrains Mono" font-size="11" font-weight="700">[B] KEYPAD</text>
        </g>

        <!-- HOTSPOT C: Wiped Workstation Terminal -->
        <g id="hotspot-terminal" class="hotspot-group" transform="translate(430, 270)">
          <circle cx="0" cy="0" r="16" fill="url(#hotspotGlow)" class="hotspot-pulse"/>
          <circle cx="0" cy="0" r="6" fill="#F85149"/>
          <text x="14" y="4" fill="#F85149" font-family="JetBrains Mono" font-size="11" font-weight="700">[C] TERMINAL</text>
        </g>
      </svg>
    `;

    const hotspotDetails = {
      'hotspot-thermos': {
        tag: 'HOTSPOT [A] // STEEL THERMOS RESIDUE',
        body: 'Spectrometric surface swab detected trace synthetic potassium-channel blocker peptide along the silicone seal. The exterior brushed steel cylinder was thoroughly sanitized with isopropyl alcohol.',
      },
      'hotspot-keypad': {
        tag: 'HOTSPOT [B] // AIRLOCK ACCESS CONTROLLER',
        body: 'Biometric telemetry logs confirm an unauthorized master keycard override executed at 02:04 MSK. Reader security records match credential token assigned to Dr. Nikolai Vane.',
      },
      'hotspot-terminal': {
        tag: 'HOTSPOT [C] // WIPED CONSOLE HARD DRIVE',
        body: 'Terminal power was severed remotely at 02:15 MSK immediately following cardiac telemetry cessation. Primary disk sector headers were overwritten with zero-bytes using military liaison utility.',
      },
    };

    ['hotspot-thermos', 'hotspot-keypad', 'hotspot-terminal'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', () => {
          const detail = hotspotDetails[id];
          if (popupCard && detail) {
            popupCard.innerHTML = `
              <div class="forensic-card-tag">${detail.tag}</div>
              <div class="forensic-card-body">${detail.body}</div>
            `;
            popupCard.classList.add('active');
            GameState.addNote(`Examined Crime Scene: ${detail.tag}`, 'clue');
          }
        });
      }
    });
  }

  /* ============================================================
     2. PROCEDURAL CCTV VIDEO PLAYER (HTML5 CANVAS)
     "CAM_04 // L4_BIO_CHAMBER", Play/Pause, Scrubber (01:55-02:40),
     Phosphor Scanlines & Vector Silhouettes
     ============================================================ */
  let cctvAnimFrame = null;
  let cctvPlaying = false;
  let cctvCurrentSeconds = 0; // 0 = 01:55:00, 2700 = 02:40:00 (45 minutes)
  const CCTV_TOTAL_SECONDS = 45 * 60; // 2700s

  function formatCctvTime(sec) {
    const startMins = 1 * 60 + 55; // 01:55 in mins
    const totalMins = startMins + Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    const hh = String(Math.floor(totalMins / 60)).padStart(2, '0');
    const mm = String(totalMins % 60).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    return `${hh}:${mm}:${ss} MSK`;
  }

  function initCctvPlayer() {
    const canvas = document.getElementById('cctv-canvas');
    const playBtn = document.getElementById('btn-cctv-play');
    const slider = document.getElementById('cctv-time-slider');
    const timecode = document.getElementById('cctv-timecode');
    const banner = document.getElementById('cctv-event-banner');
    if (!canvas || !slider) return;

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      const rect = canvas.parentElement.getBoundingClientRect();
      if (rect.width > 0) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      } else {
        canvas.width = 640;
        canvas.height = 320;
      }
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    slider.max = CCTV_TOTAL_SECONDS;
    slider.value = cctvCurrentSeconds;

    function renderCctvFrame() {
      if (canvas.width === 0 || canvas.width === 640) {
        const rect = canvas.parentElement.getBoundingClientRect();
        if (rect.width > 0 && rect.width !== canvas.width) {
          canvas.width = rect.width;
          canvas.height = rect.height;
        }
      }
      const w = canvas.width || 640;
      const h = canvas.height || 320;

      // 1. Phosphor Night-Vision Dark Slate-Green Background
      ctx.fillStyle = '#060D09';
      ctx.fillRect(0, 0, w, h);

      // 2. Perspective Lab Room Geometry
      ctx.strokeStyle = 'rgba(63, 185, 80, 0.18)';
      ctx.lineWidth = 1;

      // Floor grid perspective
      const vanishY = h * 0.35;
      for (let x = 0; x <= w; x += w / 10) {
        ctx.beginPath();
        ctx.moveTo(x, h);
        ctx.lineTo(w * 0.5 + (x - w * 0.5) * 0.25, vanishY);
        ctx.stroke();
      }

      // Back Wall & Airlock Frame
      ctx.fillStyle = '#09150E';
      ctx.fillRect(w * 0.08, vanishY - 40, w * 0.2, h * 0.5);
      ctx.strokeStyle = 'rgba(63, 185, 80, 0.3)';
      ctx.strokeRect(w * 0.08, vanishY - 40, w * 0.2, h * 0.5);

      // Workstation Console Desk
      const deskX = w * 0.45;
      const deskY = h * 0.48;
      const deskW = w * 0.38;
      const deskH = h * 0.32;
      ctx.fillStyle = '#0A1810';
      ctx.fillRect(deskX, deskY, deskW, deskH);
      ctx.strokeStyle = 'rgba(63, 185, 80, 0.4)';
      ctx.strokeRect(deskX, deskY, deskW, deskH);

      // Monitor Screen Glow
      ctx.fillStyle = 'rgba(88, 166, 255, 0.25)';
      ctx.fillRect(deskX + 20, deskY - 35, 55, 35);
      ctx.strokeRect(deskX + 20, deskY - 35, 55, 35);

      // 3. Dynamic Silhouettes Based on Time
      // 01:55 = 0s.
      // 02:04 = 9 mins = 540s (Vane enters with 2 mugs and swaps thermos)
      // 02:14 = 19 mins = 1140s (Viktor collapses)
      // 02:34 = 39 mins = 2340s (Malekov aide exits with dossier)
      const sec = cctvCurrentSeconds;

      // Check current active event for Banner
      if (sec >= 500 && sec <= 600) {
        banner.textContent = '02:04 MSK // DR. VANE ENTERS // THERMOS SWAP DETECTED';
        banner.classList.add('active');
        GameState.revealDiscrepancy('vane');
      } else if (sec >= 1110 && sec <= 1220) {
        banner.textContent = '02:14 MSK // DR. VOLKOV COLLAPSE // VENTRICULAR FIBRILLATION';
        banner.classList.add('active');
      } else if (sec >= 2300 && sec <= 2420) {
        banner.textContent = '02:34 MSK // MALEKOV AIDE ENTERS // DOSSIER EXFILTRATION';
        banner.classList.add('active');
        GameState.revealDiscrepancy('malekov');
      } else {
        banner.classList.remove('active');
      }

      // Silhouette: Viktor Volkov
      if (sec < 1140) {
        // Seated at console typing
        const jitter = Math.sin(sec * 4) * 1.5;
        ctx.fillStyle = '#11291B';
        // Head
        ctx.beginPath();
        ctx.arc(deskX + 70 + jitter, deskY + 15, 14, 0, Math.PI * 2);
        ctx.fill();
        // Torso & arms
        ctx.fillRect(deskX + 50, deskY + 30, 40, 50);
        ctx.fillRect(deskX + 40, deskY + 40, 60, 16);
      } else if (sec >= 1140 && sec <= 1180) {
        // Collapsing animation (staggering down to floor)
        const prog = (sec - 1140) / 40;
        ctx.fillStyle = '#11291B';
        const fallY = deskY + 20 + prog * 70;
        ctx.beginPath();
        ctx.arc(deskX + 60 + prog * 40, fallY, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(deskX + 40 + prog * 40, fallY + 14, 45, 30);
      } else {
        // Viktor motionless on the floor beside console
        ctx.fillStyle = '#0F2317';
        ctx.beginPath();
        ctx.ellipse(deskX + 110, deskY + 110, 42, 16, Math.PI * 0.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Thermos on desk
      ctx.fillStyle = sec > 560 ? '#D29922' : '#8B949E';
      ctx.fillRect(deskX + 12, deskY + 10, 8, 16);

      // Silhouette: Dr. Nikolai Vane (02:04 MSK = 540s window: 510s to 590s)
      if (sec >= 510 && sec <= 590) {
        const vaneProg = (sec - 510) / 80;
        // Approaches desk, pauses, retreats
        let vaneX = w * 0.18;
        if (vaneProg < 0.4) {
          vaneX = w * 0.18 + (vaneProg / 0.4) * (deskX - w * 0.22);
        } else if (vaneProg < 0.6) {
          vaneX = deskX - w * 0.04; // Swapping thermos
        } else {
          vaneX = deskX - w * 0.04 - ((vaneProg - 0.6) / 0.4) * (deskX - w * 0.22);
        }

        ctx.fillStyle = '#214D33';
        // Head with spectacles hint
        ctx.beginPath();
        ctx.arc(vaneX + 15, deskY - 10, 13, 0, Math.PI * 2);
        ctx.fill();
        // Lab coat torso
        ctx.fillRect(vaneX, deskY + 4, 30, 75);
        // Mug in hand
        ctx.fillStyle = '#58A6FF';
        ctx.fillRect(vaneX + 28, deskY + 25, 10, 10);
      }

      // Silhouette: General Malekov's Aide (02:34 MSK = 2340s window: 2310s to 2390s)
      if (sec >= 2310 && sec <= 2390) {
        const aideProg = (sec - 2310) / 80;
        let aideX = w * 0.18;
        if (aideProg < 0.45) {
          aideX = w * 0.18 + (aideProg / 0.45) * (deskX + deskW * 0.4);
        } else {
          aideX = deskX + deskW * 0.4 - ((aideProg - 0.45) / 0.55) * (deskX + deskW * 0.4 - w * 0.18);
        }

        ctx.fillStyle = '#1A3324';
        // Military Cap Profile
        ctx.beginPath();
        ctx.arc(aideX + 16, deskY - 20, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(aideX + 8, deskY - 30, 20, 6);
        // Long Military Trench Coat
        ctx.fillRect(aideX, deskY - 6, 32, 90);
        // Sealed Dossier under arm
        ctx.fillStyle = '#D29922';
        ctx.fillRect(aideX + 22, deskY + 20, 16, 22);
      }

      // 4. Night-Vision Phosphor Scanlines & Lens Grain
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 2);
      }

      // Random phosphor speckle
      ctx.fillStyle = 'rgba(63, 185, 80, 0.08)';
      for (let i = 0; i < 40; i++) {
        const rx = Math.random() * w;
        const ry = Math.random() * h;
        ctx.fillRect(rx, ry, 2, 2);
      }

      // Camera HUD Overlay
      ctx.fillStyle = '#58A6FF';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText(CCTV_DATA.feedName, 14, 22);

      // Blinking REC dot
      if (Math.floor(Date.now() / 600) % 2 === 0) {
        ctx.fillStyle = '#F85149';
        ctx.beginPath();
        ctx.arc(w - 24, 18, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText('REC', w - 54, 22);
      }

      // Timestamp
      ctx.fillStyle = '#3FB950';
      ctx.fillText(formatCctvTime(cctvCurrentSeconds), 14, h - 14);

      // Crosshair
      ctx.strokeStyle = 'rgba(63, 185, 80, 0.35)';
      ctx.strokeRect(w * 0.5 - 20, h * 0.5 - 20, 40, 40);
    }

    function step() {
      if (cctvPlaying) {
        cctvCurrentSeconds += 0.8; // Advance timeline smoothly
        if (cctvCurrentSeconds > CCTV_TOTAL_SECONDS) {
          cctvCurrentSeconds = 0;
        }
        slider.value = cctvCurrentSeconds;
        timecode.textContent = formatCctvTime(cctvCurrentSeconds);
      }
      renderCctvFrame();
      cctvAnimFrame = requestAnimationFrame(step);
    }

    playBtn.addEventListener('click', () => {
      cctvPlaying = !cctvPlaying;
      playBtn.innerHTML = cctvPlaying
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
    });

    slider.addEventListener('input', (e) => {
      cctvCurrentSeconds = parseFloat(e.target.value);
      timecode.textContent = formatCctvTime(cctvCurrentSeconds);
      renderCctvFrame();
    });

    timecode.textContent = formatCctvTime(cctvCurrentSeconds);
    step();
  }

  /* ============================================================
     3. CHART.JS TOXICOLOGY & BIOMETRIC SPIKE GRAPH
     ============================================================ */
  let toxicologyChart = null;

  function initToxicologyChart() {
    const canvas = document.getElementById('toxicology-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    if (toxicologyChart) {
      toxicologyChart.destroy();
    }

    const ctx = canvas.getContext('2d');
    toxicologyChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: TOXICOLOGY_DATA.labels,
        datasets: [
          {
            label: 'Heart Rate (BPM)',
            data: TOXICOLOGY_DATA.heartRate,
            borderColor: '#58A6FF',
            backgroundColor: 'rgba(88, 166, 255, 0.1)',
            borderWidth: 2,
            tension: 0.35,
            yAxisID: 'yHR',
            pointRadius: 4,
            pointHoverRadius: 6,
          },
          {
            label: 'Serum Potassium (mmol/L)',
            data: TOXICOLOGY_DATA.potassium,
            borderColor: '#D29922',
            backgroundColor: 'rgba(210, 153, 34, 0.1)',
            borderWidth: 2,
            tension: 0.35,
            yAxisID: 'yPotassium',
            pointRadius: 4,
          },
          {
            label: 'V-7 Toxin Saturation (%)',
            data: TOXICOLOGY_DATA.serumToxin,
            borderColor: '#F85149',
            backgroundColor: 'rgba(248, 81, 73, 0.15)',
            borderWidth: 2,
            borderDash: [5, 4],
            tension: 0.35,
            yAxisID: 'yToxin',
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            labels: {
              color: '#8B949E',
              font: { family: "'JetBrains Mono', monospace", size: 11 },
            },
          },
          tooltip: {
            backgroundColor: '#161B22',
            titleColor: '#F0F6FC',
            bodyColor: '#8B949E',
            borderColor: '#262E3A',
            borderWidth: 1,
            titleFont: { family: "'JetBrains Mono', monospace" },
            bodyFont: { family: "'Inter', sans-serif" },
          },
        },
        scales: {
          x: {
            grid: { color: 'rgba(38, 46, 58, 0.5)' },
            ticks: { color: '#8B949E', font: { family: "'JetBrains Mono', monospace" } },
          },
          yHR: {
            type: 'linear',
            position: 'left',
            title: { display: true, text: 'BPM', color: '#58A6FF' },
            grid: { color: 'rgba(38, 46, 58, 0.4)' },
            ticks: { color: '#58A6FF' },
            min: 0,
            max: 200,
          },
          yPotassium: {
            type: 'linear',
            position: 'right',
            title: { display: true, text: 'mmol/L', color: '#D29922' },
            grid: { drawOnChartArea: false },
            ticks: { color: '#D29922' },
            min: 0,
            max: 12,
          },
          yToxin: {
            type: 'linear',
            position: 'right',
            display: false,
            min: 0,
            max: 100,
          },
        },
      },
    });
  }

  /* ============================================================
     4. VOICED WIRETAP & AUDIO LOGS (WEB SPEECH + WEB AUDIO STATIC)
     ============================================================ */
  let audioCtx = null;
  let noiseNode = null;
  let noiseGain = null;
  let isPlayingWiretap = false;
  let currentDialogueIndex = 0;
  let waveformAnimFrame = null;

  function initWebAudioStatic() {
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) return;
      if (!audioCtx) {
        audioCtx = new AudioCtxClass();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Generate procedural white noise buffer for radio static
      const bufferSize = audioCtx.sampleRate * 2;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      noiseNode.loop = true;

      // Bandpass filter to sound like an authentic high-frequency radio receiver
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1400;
      filter.Q.value = 2.5;

      noiseGain = audioCtx.createGain();
      noiseGain.gain.value = 0.035; // Gentle atmospheric crackle

      noiseNode.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);
      noiseNode.start(0);
    } catch (e) {
      console.warn('Web Audio API static initialization suppressed:', e);
    }
  }

  function stopWebAudioStatic() {
    if (noiseNode) {
      try { noiseNode.stop(); } catch {}
      noiseNode.disconnect();
      noiseNode = null;
    }
  }

  function initWiretapPlayer() {
    const playBtn = document.getElementById('btn-wiretap-play');
    const transcriptBox = document.getElementById('wiretap-transcript-box');
    const canvas = document.getElementById('wiretap-waveform');
    if (!playBtn || !transcriptBox) return;

    // Render Transcript Lines
    transcriptBox.innerHTML = WIRETAP_DATA.dialogue
      .map((item, idx) => `
        <div class="wiretap-line" id="wiretap-line-${idx}">
          <span class="wiretap-speaker">${item.speaker}:</span>
          <span class="wiretap-text">"${item.text}"</span>
        </div>
      `)
      .join('');

    function renderWaveform() {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width = canvas.offsetWidth;
      const h = canvas.height = canvas.offsetHeight;

      ctx.fillStyle = '#080C10';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = isPlayingWiretap ? '#58A6FF' : 'rgba(88, 166, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      const sliceWidth = w / 60;
      let x = 0;

      for (let i = 0; i < 60; i++) {
        const amp = isPlayingWiretap ? Math.sin(Date.now() * 0.01 + i * 0.3) * (h * 0.35) * (Math.random() * 0.6 + 0.4) : 0;
        const y = h * 0.5 + amp;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.stroke();

      waveformAnimFrame = requestAnimationFrame(renderWaveform);
    }
    renderWaveform();

    function speakLine(index) {
      if (index >= WIRETAP_DATA.dialogue.length || !isPlayingWiretap) {
        isPlayingWiretap = false;
        stopWebAudioStatic();
        playBtn.textContent = '▶ PLAY INTERCEPTED WIRETAP';
        document.querySelectorAll('.wiretap-line').forEach((l) => l.classList.remove('active'));
        GameState.completePuzzle('audioPlayed');
        return;
      }

      currentDialogueIndex = index;
      document.querySelectorAll('.wiretap-line').forEach((l, idx) => {
        l.classList.toggle('active', idx === index);
      });

      const line = WIRETAP_DATA.dialogue[index];

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(line.text);
        utterance.rate = line.voiceParams.rate;
        utterance.pitch = line.voiceParams.pitch;

        // Try to match appropriate English voices
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const matchedVoice = voices.find((v) =>
            v.lang.startsWith('en') && (line.voiceParams.gender === 'female' ? /female|zira|samantha|victoria/i.test(v.name) : /male|david|george|alex/i.test(v.name))
          );
          if (matchedVoice) utterance.voice = matchedVoice;
        }

        utterance.onend = () => {
          setTimeout(() => speakLine(index + 1), 600);
        };
        utterance.onerror = () => {
          setTimeout(() => speakLine(index + 1), 1200);
        };

        window.speechSynthesis.speak(utterance);
      } else {
        // Fallback delay if speech synthesis is blocked
        setTimeout(() => speakLine(index + 1), 3200);
      }
    }

    playBtn.addEventListener('click', () => {
      if (isPlayingWiretap) {
        isPlayingWiretap = false;
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        stopWebAudioStatic();
        playBtn.textContent = '▶ PLAY INTERCEPTED WIRETAP';
      } else {
        isPlayingWiretap = true;
        initWebAudioStatic();
        playBtn.textContent = '⏹ HALT WIRETAP SCAN';
        speakLine(0);
      }
    });
  }

  /* ============================================================
     5. INTERACTIVE LEAFLET MAP (CHAPTERS JURISDICTIONS)
     CartoDB Dark Matter tiles, custom glowing map pin
     ============================================================ */
  let leafletMap = null;

  function initLeafletMap(containerId = 'leaflet-map') {
    const container = document.getElementById(containerId);
    if (!container || typeof L === 'undefined') return;

    if (leafletMap) {
      leafletMap.remove();
    }

    // Centered on Russia (Moscow to Novosibirsk corridor)
    leafletMap = L.map(containerId, {
      center: [55.0, 60.0],
      zoom: 4,
      zoomControl: false,
      attributionControl: false,
    });

    // CartoDB Dark Matter Tiles (No API key needed)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(leafletMap);

    // Custom Glowing Radar Marker Icons
    const createGlowingIcon = (color, label) => {
      return L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="position:relative; width:16px; height:16px;">
            <div style="position:absolute; inset:-4px; border-radius:50%; background:${color}; opacity:0.35; animation:pulseBeacon 2s infinite;"></div>
            <div style="position:absolute; inset:2px; border-radius:50%; background:${color}; border:2px solid #FFFFFF;"></div>
            <span style="position:absolute; top:20px; left:-30px; font-family:'JetBrains Mono',monospace; font-size:10px; font-weight:700; color:${color}; white-space:nowrap; text-shadow:0 1px 4px #000;">${label}</span>
          </div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
    };

    const moscowCoords = [55.7558, 37.6173];
    const novosibirskCoords = [55.0084, 82.9357];

    L.marker(moscowCoords, { icon: createGlowingIcon('#58A6FF', 'MOSCOW ARCHIVE') }).addTo(leafletMap);
    L.marker(novosibirskCoords, { icon: createGlowingIcon('#D29922', 'VITYAZ LAB [CH 01]') }).addTo(leafletMap);

    // Dashed flight / data transport corridor
    L.polyline([moscowCoords, novosibirskCoords], {
      color: '#58A6FF',
      weight: 2,
      dashArray: '6, 8',
      opacity: 0.7,
    }).addTo(leafletMap);
  }

  function zoomToNovosibirsk() {
    if (leafletMap) {
      leafletMap.flyTo([55.0084, 82.9357], 6, { duration: 1.5 });
    }
  }

  return {
    renderCrimeScene,
    initCctvPlayer,
    resizeCctv: () => {
      const canvas = document.getElementById('cctv-canvas');
      if (canvas && canvas.parentElement) {
        const rect = canvas.parentElement.getBoundingClientRect();
        if (rect.width > 0) {
          canvas.width = rect.width;
          canvas.height = rect.height;
        }
      }
    },
    initToxicologyChart,
    initWiretapPlayer,
    initLeafletMap,
    zoomToNovosibirsk,
  };
})();
