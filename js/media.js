// Media and interactive components: Crime scene floorplan, CCTV canvas player,
// Chart.js biometrics chart, voiced radio wiretap, and tactical jurisdiction map.

const MediaEngine = (() => {
  // 1. Interactive Crime Scene Floorplan
  // Renders the biosecurity chamber SVG and wires up the three investigation hotspots
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
        <circle cx="400" cy="360" r="18" fill="#161B22" stroke="#484F58" stroke-dasharray="3 3"/>

        <!-- Incubator & Storage Racks -->
        <rect x="620" y="70" width="100" height="150" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
        <text x="630" y="95" fill="#6E7681" font-family="JetBrains Mono" font-size="9">VAULT COLD-4C</text>

        <!-- Emergency Shower & Eye Wash -->
        <circle cx="670" cy="380" r="24" fill="#0D1117" stroke="#F85149" stroke-width="1.5"/>
        <text x="645" y="384" fill="#F85149" font-family="JetBrains Mono" font-size="8">SAFETY SHOWER</text>

        <!-- Hotspot A: Viktor's Steel Thermos -->
        <g id="hotspot-thermos" class="hotspot-group" transform="translate(315, 280)">
          <circle cx="0" cy="0" r="16" fill="url(#hotspotGlow)" class="hotspot-pulse"/>
          <circle cx="0" cy="0" r="6" fill="#D29922"/>
          <text x="12" y="4" fill="#D29922" font-family="JetBrains Mono" font-size="11" font-weight="700">[A] THERMOS</text>
        </g>

        <!-- Hotspot B: Airlock Biometric Keypad -->
        <g id="hotspot-keypad" class="hotspot-group" transform="translate(170, 240)">
          <circle cx="0" cy="0" r="16" fill="url(#hotspotGlow)" class="hotspot-pulse"/>
          <circle cx="0" cy="0" r="6" fill="#58A6FF"/>
          <text x="-95" y="4" fill="#58A6FF" font-family="JetBrains Mono" font-size="11" font-weight="700">[B] KEYPAD</text>
        </g>

        <!-- Hotspot C: Wiped Workstation Terminal -->
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

  // 2. CCTV Security Camera Simulation (HTML5 Canvas)
  // Handles timeline scrubbing (01:55 to 02:40 MSK) and silhouette animations
  let cctvAnimFrame = null;
  let cctvPlaying = false;
  let cctvCurrentSeconds = 0; // 0 = 01:55:00, 2700 = 02:40:00 (45 minutes total)
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

      // Dark slate-green phosphor background
      ctx.fillStyle = '#060D09';
      ctx.fillRect(0, 0, w, h);

      // Perspective room geometry
      ctx.strokeStyle = 'rgba(63, 185, 80, 0.18)';
      ctx.lineWidth = 1;

      const vanishY = h * 0.35;
      for (let x = 0; x <= w; x += w / 10) {
        ctx.beginPath();
        ctx.moveTo(x, h);
        ctx.lineTo(w * 0.5 + (x - w * 0.5) * 0.25, vanishY);
        ctx.stroke();
      }

      // Back wall and airlock door
      ctx.fillStyle = '#09150E';
      ctx.fillRect(w * 0.08, vanishY - 40, w * 0.2, h * 0.5);
      ctx.strokeStyle = 'rgba(63, 185, 80, 0.3)';
      ctx.strokeRect(w * 0.08, vanishY - 40, w * 0.2, h * 0.5);

      // Workstation desk
      const deskX = w * 0.45;
      const deskY = h * 0.48;
      const deskW = w * 0.38;
      const deskH = h * 0.32;
      ctx.fillStyle = '#0A1810';
      ctx.fillRect(deskX, deskY, deskW, deskH);
      ctx.strokeStyle = 'rgba(63, 185, 80, 0.4)';
      ctx.strokeRect(deskX, deskY, deskW, deskH);

      // Console monitor glow
      ctx.fillStyle = 'rgba(88, 166, 255, 0.25)';
      ctx.fillRect(deskX + 20, deskY - 35, 55, 35);
      ctx.strokeRect(deskX + 20, deskY - 35, 55, 35);

      const sec = cctvCurrentSeconds;

      // Check key timestamps for event banner and POI discrepancy reveals
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

      // Silhouette: Dr. Viktor Volkov (typing, collapsing, then still)
      if (sec < 1140) {
        const jitter = Math.sin(sec * 4) * 1.5;
        ctx.fillStyle = '#11291B';
        ctx.beginPath();
        ctx.arc(deskX + 70 + jitter, deskY + 15, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(deskX + 50, deskY + 30, 40, 50);
        ctx.fillRect(deskX + 40, deskY + 40, 60, 16);
      } else if (sec >= 1140 && sec <= 1180) {
        const prog = (sec - 1140) / 40;
        ctx.fillStyle = '#11291B';
        const fallY = deskY + 20 + prog * 70;
        ctx.beginPath();
        ctx.arc(deskX + 60 + prog * 40, fallY, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(deskX + 40 + prog * 40, fallY + 14, 45, 30);
      } else {
        ctx.fillStyle = '#0F2317';
        ctx.beginPath();
        ctx.ellipse(deskX + 110, deskY + 110, 42, 16, Math.PI * 0.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Thermos on desk
      ctx.fillStyle = sec > 560 ? '#D29922' : '#8B949E';
      ctx.fillRect(deskX + 12, deskY + 10, 8, 16);

      // Silhouette: Dr. Nikolai Vane swapping the thermos (02:04 MSK)
      if (sec >= 510 && sec <= 590) {
        const vaneProg = (sec - 510) / 80;
        let vaneX = w * 0.18;
        if (vaneProg < 0.4) {
          vaneX = w * 0.18 + (vaneProg / 0.4) * (deskX - w * 0.22);
        } else if (vaneProg < 0.6) {
          vaneX = deskX - w * 0.04;
        } else {
          vaneX = deskX - w * 0.04 - ((vaneProg - 0.6) / 0.4) * (deskX - w * 0.22);
        }

        ctx.fillStyle = '#214D33';
        ctx.beginPath();
        ctx.arc(vaneX + 15, deskY - 10, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(vaneX, deskY + 4, 30, 75);
        ctx.fillStyle = '#58A6FF';
        ctx.fillRect(vaneX + 28, deskY + 25, 10, 10);
      }

      // Silhouette: General Malekov's aide exfiltrating the dossier (02:34 MSK)
      if (sec >= 2310 && sec <= 2390) {
        const aideProg = (sec - 2310) / 80;
        let aideX = w * 0.18;
        if (aideProg < 0.45) {
          aideX = w * 0.18 + (aideProg / 0.45) * (deskX + deskW * 0.4);
        } else {
          aideX = deskX + deskW * 0.4 - ((aideProg - 0.45) / 0.55) * (deskX + deskW * 0.4 - w * 0.18);
        }

        ctx.fillStyle = '#1A3324';
        ctx.beginPath();
        ctx.arc(aideX + 16, deskY - 20, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(aideX + 8, deskY - 30, 20, 6);
        ctx.fillRect(aideX, deskY - 6, 32, 90);
        ctx.fillStyle = '#D29922';
        ctx.fillRect(aideX + 22, deskY + 20, 16, 22);
      }

      // Scanline pattern overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 2);
      }

      // Phosphor speckle
      ctx.fillStyle = 'rgba(63, 185, 80, 0.08)';
      for (let i = 0; i < 40; i++) {
        const rx = Math.random() * w;
        const ry = Math.random() * h;
        ctx.fillRect(rx, ry, 2, 2);
      }

      // Camera HUD header
      ctx.fillStyle = '#58A6FF';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText(CCTV_DATA.feedName, 14, 22);

      // Blinking recording indicator
      if (Math.floor(Date.now() / 600) % 2 === 0) {
        ctx.fillStyle = '#F85149';
        ctx.beginPath();
        ctx.arc(w - 24, 18, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText('REC', w - 54, 22);
      }

      // Timecode
      ctx.fillStyle = '#3FB950';
      ctx.fillText(formatCctvTime(cctvCurrentSeconds), 14, h - 14);

      // Centered crosshair
      ctx.strokeStyle = 'rgba(63, 185, 80, 0.35)';
      ctx.strokeRect(w * 0.5 - 20, h * 0.5 - 20, 40, 40);
    }

    function step() {
      if (cctvPlaying) {
        cctvCurrentSeconds += 0.8;
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

  // 3. Viktor's Biometric & Toxicology Chart (Chart.js)
  // Shows heart rate spike, fatal potassium surge, and serum concentration
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

  // 4. Voiced Radio Wiretap Player (Web Audio API + Speech Synthesis)
  // Plays intercepted radio dialogue with background static and live canvas waveform
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

      // Procedural white noise buffer for radio static
      const bufferSize = audioCtx.sampleRate * 2;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      noiseNode.loop = true;

      // Bandpass filter centered at 1400Hz gives an authentic military radio hiss
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1400;
      filter.Q.value = 2.5;

      noiseGain = audioCtx.createGain();
      noiseGain.gain.value = 0.035;

      noiseNode.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);
      noiseNode.start(0);
    } catch (e) {
      console.warn('Web Audio initialization note:', e);
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

  // 5. Tactical Cartographic Jurisdiction Map
  // Renders a high-resolution, self-contained SVG tactical map of the Eurasian jurisdiction.
  // Visualizes central Moscow Archive, Novosibirsk Vityaz Lab (Ch 01), and locked Order 44-B sectors.
  function renderJurisdictionMap(containerId = 'jurisdiction-map') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="tactical-hud-box hud-top-left">
        <div>AEGIS TACTICAL JURISDICTION DISPLAY // WGS-84</div>
        <div style="color:var(--text-secondary); margin-top:2px;">GRID: EURASIAN CONTINENTAL CORRIDOR // SECTOR 04</div>
      </div>
      <div class="tactical-hud-box hud-top-right">
        <div>SATELLITE DOWNLINK: ENCRYPTED // TELEMETRY STABLE</div>
        <div style="color:var(--text-secondary); margin-top:2px;">LIVE COORD SYNC: MOSCOW ↔ NOVOSIBIRSK</div>
      </div>
      <div class="tactical-hud-box hud-bottom-left">
        <div>TARGET RETICLE: 55.0084° N, 82.9357° E</div>
        <div style="color:var(--accent-amber); margin-top:2px;">BEARING: 062° // RANGE: 2,810 KM // VECTOR READY</div>
      </div>

      <svg viewBox="0 0 1000 580" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="background:#070B10;">
        <defs>
          <!-- Grid Pattern -->
          <pattern id="tacGridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#131B26" stroke-width="0.75"/>
            <circle cx="0" cy="0" r="1" fill="#1F2C3D"/>
          </pattern>

          <!-- Radial Glow for Novosibirsk Active Target -->
          <radialGradient id="novoTargetGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#D29922" stop-opacity="0.8"/>
            <stop offset="60%" stop-color="#D29922" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#D29922" stop-opacity="0"/>
          </radialGradient>

          <!-- Radial Glow for Moscow Archive -->
          <radialGradient id="moscowNodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#58A6FF" stop-opacity="0.8"/>
            <stop offset="70%" stop-color="#58A6FF" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#58A6FF" stop-opacity="0"/>
          </radialGradient>

          <!-- Radar Sweep Cone Gradient -->
          <radialGradient id="radarSweepGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#58A6FF" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#58A6FF" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <!-- Base Grid -->
        <rect width="1000" height="580" fill="url(#tacGridPattern)"/>

        <!-- Latitude Lines -->
        <g stroke="#182230" stroke-width="1" stroke-dasharray="3 4">
          <line x1="40" y1="90" x2="960" y2="90"/>
          <line x1="40" y1="180" x2="960" y2="180"/>
          <line x1="40" y1="280" x2="960" y2="280"/>
          <line x1="40" y1="390" x2="960" y2="390"/>
          <line x1="40" y1="490" x2="960" y2="490"/>
        </g>
        <g font-family="JetBrains Mono" font-size="9" fill="#3D4B5C">
          <text x="50" y="85">75°00' N // ARCTIC CIRCLE</text>
          <text x="50" y="175">65°00' N // SIBERIAN SUBARCTIC</text>
          <text x="50" y="275">55°00' N // CENTRAL TAIGA ZONE</text>
          <text x="50" y="385">45°00' N // STEPPE FRONTIER</text>
        </g>

        <!-- Longitude Lines -->
        <g stroke="#182230" stroke-width="1" stroke-dasharray="3 4">
          <line x1="140" y1="40" x2="140" y2="540"/>
          <line x1="280" y1="40" x2="280" y2="540"/>
          <line x1="420" y1="40" x2="420" y2="540"/>
          <line x1="560" y1="40" x2="560" y2="540"/>
          <line x1="700" y1="40" x2="700" y2="540"/>
          <line x1="840" y1="40" x2="840" y2="540"/>
        </g>
        <g font-family="JetBrains Mono" font-size="9" fill="#3D4B5C">
          <text x="145" y="530">30°00' E</text>
          <text x="285" y="530">50°00' E</text>
          <text x="425" y="530">70°00' E // URAL DIVIDE</text>
          <text x="565" y="530">90°00' E</text>
          <text x="705" y="530">110°00' E</text>
          <text x="845" y="530">130°00' E</text>
        </g>

        <!-- Stylized Eurasian Landmass Contour -->
        <path d="M 60 220 
                 Q 100 160 150 140 
                 Q 200 120 220 80 
                 Q 260 60 310 90 
                 Q 360 80 410 70 
                 Q 470 60 520 80 
                 Q 580 60 640 70 
                 Q 710 60 770 90 
                 Q 830 80 880 130 
                 Q 920 180 940 250 
                 Q 910 320 870 360 
                 Q 820 400 760 420 
                 Q 700 430 630 440 
                 Q 550 450 470 460 
                 Q 380 470 300 480 
                 Q 220 490 160 460 
                 Q 110 420 80 340 Z"
              fill="#0D1520" fill-opacity="0.5" stroke="#1D2A3B" stroke-width="1.8"/>

        <!-- Inset Seas & Geographic Features -->
        <path d="M 120 260 Q 140 280 160 270 Q 150 310 130 330 Z" fill="#070B10" stroke="#1D2A3B" stroke-width="1.2"/>
        <path d="M 120 410 Q 150 390 180 420 Q 160 460 130 450 Z" fill="#070B10" stroke="#1D2A3B" stroke-width="1.2"/>
        <path d="M 230 400 Q 250 380 270 420 Q 260 460 235 450 Z" fill="#070B10" stroke="#1D2A3B" stroke-width="1.2"/>
        <path d="M 720 330 Q 740 310 750 360 Q 735 380 720 350 Z" fill="#070B10" stroke="#1D2A3B" stroke-width="1.2"/>

        <!-- Concentric Range Rings Around Novosibirsk Target -->
        <g stroke="#1F2F44" stroke-width="1" stroke-dasharray="4 6" fill="none">
          <circle cx="550" cy="280" r="70"/>
          <circle cx="550" cy="280" r="140"/>
          <circle cx="550" cy="280" r="220"/>
          <circle cx="550" cy="280" r="310"/>
        </g>
        <g font-family="JetBrains Mono" font-size="8.5" fill="#3E5470">
          <text x="555" y="205">500 KM</text>
          <text x="555" y="135">1,000 KM</text>
          <text x="555" y="55">1,500 KM</text>
          <text x="555" y="355">500 KM</text>
          <text x="555" y="425">1,000 KM</text>
        </g>

        <!-- Animated Rotating Radar Line centered at Novosibirsk -->
        <g class="tactical-radar-line">
          <line x1="550" y1="280" x2="860" y2="280" stroke="#58A6FF" stroke-width="1.5" stroke-opacity="0.4"/>
          <polygon points="550,280 860,240 860,280" fill="url(#radarSweepGradient)"/>
        </g>

        <!-- Tactical Data Conduits -->
        <!-- Locked Conduit: Novosibirsk to Norilsk (CH 02) -->
        <path d="M 550 280 Q 590 200 610 140" fill="none" stroke="#F85149" stroke-width="1.5" stroke-dasharray="4 6" stroke-opacity="0.45"/>

        <!-- Locked Conduit: Moscow to Black Sea (CH 03) -->
        <path d="M 210 320 Q 180 380 160 430" fill="none" stroke="#F85149" stroke-width="1.5" stroke-dasharray="4 6" stroke-opacity="0.45"/>

        <!-- Active Data Corridor: Moscow Central Archive -> Novosibirsk Vityaz Lab -->
        <path id="primaryDataCorridor" d="M 210 320 Q 380 230 550 280" fill="none" stroke="#58A6FF" stroke-width="2.5" stroke-dasharray="8 6" class="tactical-corridor-flow"/>
        <path d="M 210 320 Q 380 230 550 280" fill="none" stroke="#58A6FF" stroke-width="1" stroke-opacity="0.4"/>

        <!-- Traveling Data Pulse along Active Corridor -->
        <circle r="4" fill="#FFFFFF">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M 210 320 Q 380 230 550 280"/>
        </circle>
        <circle r="8" fill="#58A6FF" opacity="0.6">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M 210 320 Q 380 230 550 280"/>
        </circle>

        <!-- NODE 1: MOSCOW CENTRAL ARCHIVE -->
        <g transform="translate(210, 320)">
          <circle cx="0" cy="0" r="22" fill="url(#moscowNodeGlow)"/>
          <circle cx="0" cy="0" r="14" fill="none" stroke="#58A6FF" stroke-width="1.5" stroke-dasharray="3 3"/>
          <circle cx="0" cy="0" r="5" fill="#58A6FF"/>
          <circle cx="0" cy="0" r="18" fill="none" stroke="#58A6FF" stroke-width="1.5" class="tactical-node-pulse"/>
          <text x="-85" y="-24" fill="#58A6FF" font-family="JetBrains Mono" font-size="11" font-weight="700">MOSCOW ARCHIVE // NODE_04</text>
          <text x="-85" y="-12" fill="#8B949E" font-family="JetBrains Mono" font-size="9">55.7558° N, 37.6173° E</text>
          <rect x="-85" y="12" width="115" height="18" rx="3" fill="#0D1117" stroke="#388BFD" stroke-width="1"/>
          <text x="-80" y="24" fill="#3FB950" font-family="JetBrains Mono" font-size="9" font-weight="700">● SECURE LINK [OK]</text>
        </g>

        <!-- NODE 3: NORILSK SUBZERO STORAGE (CHAPTER 02 - SEALED) -->
        <g transform="translate(610, 140)">
          <circle cx="0" cy="0" r="8" fill="#1C2128" stroke="#F85149" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="3" fill="#F85149"/>
          <text x="14" y="-4" fill="#F85149" font-family="JetBrains Mono" font-size="10" font-weight="700">NORILSK STORAGE [CH 02]</text>
          <text x="14" y="8" fill="#8B949E" font-family="JetBrains Mono" font-size="8.5">69.3558° N, 88.1893° E // ORDER 44-B [SEALED]</text>
        </g>

        <!-- NODE 4: BLACK SEA SUBMERSIBLE TERMINAL (CHAPTER 03 - SEALED) -->
        <g transform="translate(160, 430)">
          <circle cx="0" cy="0" r="8" fill="#1C2128" stroke="#F85149" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="3" fill="#F85149"/>
          <text x="14" y="-4" fill="#F85149" font-family="JetBrains Mono" font-size="10" font-weight="700">BLACK SEA TERMINAL [CH 03]</text>
          <text x="14" y="8" fill="#8B949E" font-family="JetBrains Mono" font-size="8.5">43.6028° N, 39.7342° E // ORDER 44-B [SEALED]</text>
        </g>

        <!-- NODE 2: NOVOSIBIRSK VITYAZ LAB (CHAPTER 01 - ACTIVE TARGET) -->
        <g id="target-novosibirsk-group" class="target-crosshair-group" transform="translate(550, 280)">
          <circle cx="0" cy="0" r="36" fill="url(#novoTargetGlow)"/>
          <circle cx="0" cy="0" r="26" fill="none" stroke="#D29922" stroke-width="1.5" class="tactical-node-pulse"/>
          <circle cx="0" cy="0" r="16" fill="rgba(210, 153, 34, 0.15)" stroke="#D29922" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="4" fill="#D29922"/>

          <!-- Crosshair Reticle -->
          <line x1="-30" y1="0" x2="-10" y2="0" stroke="#D29922" stroke-width="2"/>
          <line x1="10" y1="0" x2="30" y2="0" stroke="#D29922" stroke-width="2"/>
          <line x1="0" y1="-30" x2="0" y2="-10" stroke="#D29922" stroke-width="2"/>
          <line x1="0" y1="10" x2="0" y2="30" stroke="#D29922" stroke-width="2"/>

          <!-- Target Corner Brackets -->
          <path d="M -22 -14 L -22 -22 L -14 -22" fill="none" stroke="#D29922" stroke-width="2"/>
          <path d="M 22 -14 L 22 -22 L 14 -22" fill="none" stroke="#D29922" stroke-width="2"/>
          <path d="M -22 14 L -22 22 L -14 22" fill="none" stroke="#D29922" stroke-width="2"/>
          <path d="M 22 14 L 22 22 L 14 22" fill="none" stroke="#D29922" stroke-width="2"/>

          <!-- Tactical Callout Label -->
          <text x="36" y="-14" fill="#D29922" font-family="JetBrains Mono" font-size="11.5" font-weight="700">VITYAZ LAB // CHAPTER 01</text>
          <text x="36" y="0" fill="#E3B341" font-family="JetBrains Mono" font-size="9.5">CASE #8809: DR. VIKTOR VOLKOV</text>
          <text x="36" y="14" fill="#8B949E" font-family="JetBrains Mono" font-size="8.5">55.0084° N, 82.9357° E // BIO-SECTOR L4</text>
          <rect x="36" y="20" width="135" height="18" rx="3" fill="#0D1117" stroke="#D29922" stroke-width="1"/>
          <text x="42" y="32" fill="#D29922" font-family="JetBrains Mono" font-size="8.5" font-weight="700">▲ TARGET READY // UNLOCKED</text>
        </g>
      </svg>
    `;

    // Connect hover highlighting on Chapter 1 card
    const ch1Card = document.getElementById('card-chapter-1');
    const targetGroup = document.getElementById('target-novosibirsk-group');
    if (ch1Card && targetGroup) {
      ch1Card.addEventListener('mouseenter', () => {
        targetGroup.classList.add('focused');
      });
      ch1Card.addEventListener('mouseleave', () => {
        targetGroup.classList.remove('focused');
      });
    }
  }

  // Smooth target reticle locking animation when user clicks [ ENTER ARCHIVE ]
  function focusNovosibirsk() {
    const targetGroup = document.getElementById('target-novosibirsk-group');
    if (targetGroup) {
      targetGroup.classList.add('focused');
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
    initJurisdictionMap: renderJurisdictionMap,
    refreshJurisdictionMap: () => renderJurisdictionMap('jurisdiction-map'),
    focusNovosibirsk,
    zoomToNovosibirsk: focusNovosibirsk,
  };
})();
