/* ============================================================
   THE EVIDENCE ROOM — Master Application Controller & UI Logic
   Screen Transitions, Draggable Floating Windows, macOS Dock,
   Paper-on-Glass Documents, Quick Notes & Lucide Icons
   ============================================================ */

window.App = (() => {
  let highestZIndex = 100;
  let activeDossierFileId = 'death-certificate';

  /* ============================================================
     1. INITIALIZATION & SCREEN ROUTING
     ============================================================ */
  function init() {
    GameState.load();
    setupClock();
    setupTitleScreen();
    setupChaptersScreen();
    setupDesktopUI();
    setupWindowSystem();
    setupDossierViewer();
    setupLabTabs();
    setupTerminalTabs();
    renderPersonsOfInterest();

    // Initialize Forensic & Media Engines
    MediaEngine.initLeafletMap('leaflet-map');
    MediaEngine.renderCrimeScene('crime-scene-svg-container', 'forensic-popup-card');
    MediaEngine.initCctvPlayer();
    MediaEngine.initToxicologyChart();
    MediaEngine.initWiretapPlayer();

    // Initialize Puzzle Engines
    PuzzleEngine.initHexEditor();
    PuzzleEngine.initCipherDecryptor();
    PuzzleEngine.initEvidenceBoard();
    PuzzleEngine.initTerminalCLI();
    PuzzleEngine.initSerumSequencer();
    PuzzleEngine.initIndictmentForm();

    // Render Lucide Icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    refreshDesktopState();
  }

  function setScreen(screenId) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('screen--active'));
    const target = document.getElementById(screenId);
    if (target) target.classList.add('screen--active');

    if (screenId === 'screen-chapters') {
      setTimeout(() => {
        MediaEngine.initLeafletMap('leaflet-map');
      }, 100);
    }
  }

  /* ============================================================
     2. CLOCK & TOP STATUS BAR
     ============================================================ */
  function setupClock() {
    function update() {
      const now = new Date();
      // Format in MSK (UTC+3)
      const mskTime = new Date(now.getTime() + (3 * 60 + now.getTimezoneOffset()) * 60000);
      const hours = String(mskTime.getHours()).padStart(2, '0');
      const mins = String(mskTime.getMinutes()).padStart(2, '0');
      const secs = String(mskTime.getSeconds()).padStart(2, '0');
      const clockEl = document.getElementById('live-msk-clock');
      if (clockEl) {
        clockEl.textContent = `${hours}:${mins}:${secs} MSK`;
      }
    }
    update();
    setInterval(update, 1000);
  }

  function refreshDesktopState() {
    const st = GameState.get();
    const stagePill = document.getElementById('topbar-stage-pill');
    const objectiveEl = document.getElementById('objective-text');
    const notesBadge = document.getElementById('notes-count-badge');

    if (stagePill) stagePill.textContent = `STAGE ${st.stage}`;
    if (objectiveEl) objectiveEl.textContent = GameState.getStageObjective();
    if (notesBadge) notesBadge.textContent = st.notes.length;

    renderQuickNotes();
  }

  /* ============================================================
     3. TITLE SCREEN CONTROLLER
     ============================================================ */
  function setupTitleScreen() {
    const btnInvestigate = document.getElementById('btn-investigate');
    const btnSubtag = document.getElementById('investigate-subtag');
    const investigateLabel = document.getElementById('investigate-label');
    const btnRestart = document.getElementById('btn-restart');
    const restartConfirmBox = document.getElementById('restart-confirm-box');
    const btnConfirmPurge = document.getElementById('btn-confirm-purge');
    const btnCancelPurge = document.getElementById('btn-cancel-purge');
    const closedStamp = document.getElementById('closed-stamp');
    const laserSweep = document.getElementById('laser-sweep');

    function refreshTitleButtons() {
      const hasSave = GameState.hasSave();
      if (hasSave) {
        investigateLabel.textContent = '[ RESUME INVESTIGATION ]';
        btnSubtag.textContent = GameState.resumeLabel();
        btnSubtag.style.display = 'inline-block';
        btnRestart.classList.remove('disabled');
      } else {
        investigateLabel.textContent = '[ INVESTIGATE ]';
        btnSubtag.style.display = 'none';
        btnRestart.classList.add('disabled');
      }
    }
    refreshTitleButtons();

    btnInvestigate.addEventListener('click', () => {
      // Shatter tilted closed stamp
      closedStamp.classList.add('shattered');

      // Biometric laser sweep line across screen
      laserSweep.classList.add('sweeping');

      setTimeout(() => {
        laserSweep.classList.remove('sweeping');
        setScreen('screen-chapters');
      }, 750);
    });

    btnRestart.addEventListener('click', () => {
      if (!GameState.hasSave()) return;
      btnRestart.style.display = 'none';
      restartConfirmBox.classList.add('active');
    });

    btnCancelPurge.addEventListener('click', () => {
      restartConfirmBox.classList.remove('active');
      btnRestart.style.display = 'block';
    });

    btnConfirmPurge.addEventListener('click', () => {
      GameState.clear();
      restartConfirmBox.classList.remove('active');
      btnRestart.style.display = 'block';
      refreshTitleButtons();
      closedStamp.classList.remove('shattered');
      refreshDesktopState();
    });
  }

  /* ============================================================
     4. CHAPTERS SCREEN CONTROLLER
     ============================================================ */
  function setupChaptersScreen() {
    const btnBackTitle = document.getElementById('btn-back-title');
    const btnEnterCh1 = document.getElementById('btn-enter-ch1');
    const handshakeModal = document.getElementById('handshake-modal');

    btnBackTitle.addEventListener('click', () => {
      setScreen('screen-title');
    });

    btnEnterCh1.addEventListener('click', () => {
      MediaEngine.zoomToNovosibirsk();

      // Show 3-line terminal handshake
      handshakeModal.classList.add('active');
      const lines = [
        document.getElementById('hs-line-1'),
        document.getElementById('hs-line-2'),
        document.getElementById('hs-line-3'),
      ];

      setTimeout(() => lines[0]?.classList.add('revealed'), 350);
      setTimeout(() => lines[1]?.classList.add('revealed'), 800);
      setTimeout(() => lines[2]?.classList.add('revealed'), 1300);

      setTimeout(() => {
        handshakeModal.classList.remove('active');
        lines.forEach((l) => l?.classList.remove('revealed'));
        setScreen('screen-desktop');
        refreshDesktopState();

        // Auto open Case Dossier on first entry
        openWindow('win-dossier');
      }, 2000);
    });
  }

  /* ============================================================
     5. DESKTOP & FLOATING WINDOW SYSTEM
     ============================================================ */
  function setupDesktopUI() {
    const btnExit = document.getElementById('btn-exit-os');
    const btnNotesToggle = document.getElementById('btn-notes-toggle');
    const notesDrawer = document.getElementById('notes-drawer');
    const btnCloseNotes = document.getElementById('btn-close-notes');

    btnExit.addEventListener('click', () => {
      setScreen('screen-title');
      const btnInvestigate = document.getElementById('btn-investigate');
      const btnSubtag = document.getElementById('investigate-subtag');
      const investigateLabel = document.getElementById('investigate-label');
      investigateLabel.textContent = '[ RESUME INVESTIGATION ]';
      btnSubtag.textContent = GameState.resumeLabel();
      btnSubtag.style.display = 'inline-block';
      document.getElementById('closed-stamp').classList.remove('shattered');
    });

    btnNotesToggle.addEventListener('click', () => {
      notesDrawer.classList.toggle('open');
      btnNotesToggle.classList.toggle('active');
    });

    btnCloseNotes.addEventListener('click', () => {
      notesDrawer.classList.remove('open');
      btnNotesToggle.classList.remove('active');
    });

    // Close Resolution Modal Button
    const btnCloseEnding = document.getElementById('btn-close-ending');
    if (btnCloseEnding) {
      btnCloseEnding.addEventListener('click', () => {
        document.getElementById('ending-overlay').classList.remove('active');
      });
    }
  }

  function renderQuickNotes() {
    const notesList = document.getElementById('notes-list');
    if (!notesList) return;

    const notes = GameState.get().notes;
    notesList.innerHTML = notes
      .map(
        (n) => `
        <div class="note-entry ${n.type === 'clue' ? 'clue' : ''}">
          <div class="note-entry-meta">${n.stamp} // ${n.type ? n.type.toUpperCase() : 'NOTE'}</div>
          <div>${n.text}</div>
        </div>
      `
      )
      .join('');
  }

  function setupWindowSystem() {
    const dockItems = document.querySelectorAll('.dock-item');
    const windows = document.querySelectorAll('.os-window');

    // Dock Item Click -> Toggle Window
    dockItems.forEach((item) => {
      item.addEventListener('click', () => {
        const winId = item.dataset.targetWindow;
        if (!winId) return;

        const targetWin = document.getElementById(winId);
        if (!targetWin) return;

        if (targetWin.classList.contains('open') && !targetWin.classList.contains('minimized')) {
          // If already focused, minimize it
          if (targetWin.classList.contains('focused')) {
            targetWin.classList.add('minimized');
            item.classList.remove('active');
          } else {
            focusWindow(targetWin);
          }
        } else {
          openWindow(winId);
        }
      });
    });

    // Window Dragging & Chrome Buttons
    windows.forEach((win) => {
      const header = win.querySelector('.window-header');
      const closeBtn = win.querySelector('.dot-close');
      const minBtn = win.querySelector('.dot-minimize');
      const expandBtn = win.querySelector('.dot-expand');

      win.addEventListener('mousedown', () => focusWindow(win));

      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          closeWindow(win.id);
        });
      }

      if (minBtn) {
        minBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          win.classList.add('minimized');
          const dockItem = document.querySelector(`.dock-item[data-target-window="${win.id}"]`);
          if (dockItem) dockItem.classList.remove('active');
        });
      }

      if (expandBtn) {
        expandBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          win.style.top = '10px';
          win.style.left = '10px';
          win.style.width = 'calc(100vw - 20px)';
          win.style.height = 'calc(100vh - 120px)';
        });
      }

      // Smooth Dragging
      if (header) {
        let isDragging = false;
        let startX, startY, initLeft, initTop;

        header.addEventListener('mousedown', (e) => {
          if (e.target.classList.contains('traffic-dot')) return;
          isDragging = true;
          focusWindow(win);

          startX = e.clientX;
          startY = e.clientY;
          initLeft = win.offsetLeft;
          initTop = win.offsetTop;

          function onMouseMove(moveEvent) {
            if (!isDragging) return;
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;

            const maxLeft = window.innerWidth - win.offsetWidth;
            const maxTop = window.innerHeight - win.offsetHeight - 60;

            win.style.left = `${Math.max(0, Math.min(maxLeft, initLeft + deltaX))}px`;
            win.style.top = `${Math.max(40, Math.min(maxTop, initTop + deltaY))}px`;
          }

          function onMouseUp() {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          }

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        });
      }
    });
  }

  function openWindow(winId) {
    const win = document.getElementById(winId);
    if (!win) return;

    win.classList.remove('minimized');
    win.classList.add('open');
    focusWindow(win);

    // Initial positioning if not set
    if (!win.style.top || !win.style.left) {
      const offsetCount = document.querySelectorAll('.os-window.open').length * 24;
      const leftPos = Math.max(20, Math.floor((window.innerWidth - (win.offsetWidth || 780)) / 2) + (offsetCount % 120) - 60);
      const topPos = Math.max(50, Math.floor((window.innerHeight - (win.offsetHeight || 520)) / 2) - 30 + (offsetCount % 80));
      win.style.left = `${leftPos}px`;
      win.style.top = `${topPos}px`;
    }

    const dockItem = document.querySelector(`.dock-item[data-target-window="${winId}"]`);
    if (dockItem) {
      dockItem.classList.add('has-window');
      dockItem.classList.add('active');
    }

    // Refresh layout-specific widgets when opened
    if (winId === 'win-lab') {
      setTimeout(() => {
        MediaEngine.resizeCctv();
        MediaEngine.initToxicologyChart();
      }, 150);
    } else if (winId === 'win-board') {
      setTimeout(() => {
        PuzzleEngine.redrawEvidenceBoard();
      }, 150);
    }
  }

  function closeWindow(winId) {
    const win = document.getElementById(winId);
    if (!win) return;

    win.classList.remove('open');
    win.classList.remove('focused');

    const dockItem = document.querySelector(`.dock-item[data-target-window="${winId}"]`);
    if (dockItem) {
      dockItem.classList.remove('has-window');
      dockItem.classList.remove('active');
    }
  }

  function focusWindow(win) {
    highestZIndex += 1;
    document.querySelectorAll('.os-window').forEach((w) => w.classList.remove('focused'));
    win.classList.add('focused');
    win.style.zIndex = highestZIndex;

    document.querySelectorAll('.dock-item').forEach((item) => {
      item.classList.toggle('active', item.dataset.targetWindow === win.id);
    });
  }

  /* ============================================================
     6. "PAPER-ON-GLASS" DOSSIER VIEWER CONTROLLER
     ============================================================ */
  function setupDossierViewer() {
    renderDossierFileList();
    renderDossierActiveDocument();
  }

  function renderDossierFileList() {
    const listContainer = document.getElementById('dossier-file-index');
    if (!listContainer) return;

    listContainer.innerHTML = CASE_FILES.map((file) => {
      const isUnlocked = GameState.get().unlockedFiles.includes(file.id);
      const isActive = file.id === activeDossierFileId;
      const icon = isUnlocked
        ? file.type === 'svg'
          ? 'crosshair'
          : 'file-text'
        : 'lock';

      return `
        <div class="file-index-item ${isActive ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}" data-file-id="${file.id}">
          <i data-lucide="${icon}" style="width:14px; height:14px;"></i>
          <span>${file.name}</span>
        </div>
      `;
    }).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();

    listContainer.querySelectorAll('.file-index-item').forEach((item) => {
      item.addEventListener('click', () => {
        const fileId = item.dataset.fileId;
        const isUnlocked = GameState.get().unlockedFiles.includes(fileId);
        if (!isUnlocked) {
          alert('SECTOR CORRUPTED // REPAIR NVTA DISK SECTOR IN FORENSIC LAB FIRST');
          return;
        }
        activeDossierFileId = fileId;
        renderDossierFileList();
        renderDossierActiveDocument();
      });
    });
  }

  function renderDossierActiveDocument() {
    const viewer = document.getElementById('dossier-viewer');
    if (!viewer) return;

    const file = CASE_FILES.find((f) => f.id === activeDossierFileId);
    if (!file) return;

    if (file.id === 'crime-scene') {
      viewer.innerHTML = `
        <div class="paper-sheet">
          <div class="paper-letterhead">
            <div>
              <div class="letterhead-agency">${file.letterhead.agency}</div>
              <div class="letterhead-title">${file.letterhead.title}</div>
            </div>
            <div class="letterhead-stamp">${file.letterhead.stamp}</div>
          </div>
          <div class="paper-content">
            ${file.contentHtml}
            <div class="crime-scene-container" style="margin-top:1rem;">
              <div id="crime-scene-svg-container" class="crime-scene-svg-wrapper"></div>
              <div id="forensic-popup-card" class="forensic-popup-card"></div>
            </div>
            <div class="daria-margin-note">${file.marginNotes[0]}</div>
          </div>
        </div>
      `;
      MediaEngine.renderCrimeScene('crime-scene-svg-container', 'forensic-popup-card');
      return;
    }

    // Standard Paper-on-Glass Document
    const metaRows = file.metaGrid
      .map((m) => `<div><dt>${m.label}</dt><dd>${m.value}</dd></div>`)
      .join('');

    const notesHtml = file.marginNotes
      .map((n) => `<div class="daria-margin-note">${n}</div>`)
      .join('');

    viewer.innerHTML = `
      <div class="paper-sheet">
        <div class="paper-letterhead">
          <div>
            <div class="letterhead-agency">${file.letterhead.agency}</div>
            <div class="letterhead-title">${file.letterhead.title}</div>
          </div>
          <div class="letterhead-stamp">${file.letterhead.stamp}</div>
        </div>

        <dl class="paper-meta-grid">
          ${metaRows}
        </dl>

        <div class="paper-content">
          ${file.contentHtml}
          ${notesHtml}
        </div>
      </div>
    `;

    // Redaction bars peel on click/hover
    viewer.querySelectorAll('.redaction-bar').forEach((bar) => {
      bar.addEventListener('click', () => {
        bar.classList.toggle('declassified');
      });
    });
  }

  /* ============================================================
     7. PERSONS OF INTEREST (POI CARDS)
     ============================================================ */
  function renderPersonsOfInterest() {
    const container = document.getElementById('poi-card-grid');
    if (!container) return;

    const revealedSecrets = GameState.get().revealedDiscrepancies;

    container.innerHTML = SUSPECTS.map((suspect) => {
      const isRevealed = revealedSecrets.includes(suspect.id);

      return `
        <div class="poi-card" id="poi-card-${suspect.id}">
          <div class="poi-header">
            <div class="poi-portrait-frame">
              ${suspect.avatarSvg}
            </div>
            <div class="poi-identity">
              <div class="poi-name">${suspect.name}</div>
              <div class="poi-role">${suspect.role}</div>
            </div>
          </div>

          <div class="poi-section">
            <div class="poi-label">Official Alibi</div>
            <div class="poi-text">${suspect.alibi}</div>
          </div>

          <div class="poi-section">
            <div class="poi-label">Motive Hypothesis</div>
            <div class="poi-text">${suspect.motive}</div>
          </div>

          <div class="poi-discrepancy">
            <div class="poi-label">Discrepancy / Hidden Secret</div>
            ${
              isRevealed
                ? `<div class="discrepancy-revealed">${suspect.secret}</div>`
                : `<div class="discrepancy-locked"><i data-lucide="lock" style="width:12px; height:12px;"></i> [CORRELATION REQUIRED IN LAB / BOARD]</div>`
            }
          </div>
        </div>
      `;
    }).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  /* ============================================================
     8. FORENSIC LAB & TERMINAL TAB NAVIGATION
     ============================================================ */
  function setupLabTabs() {
    const tabs = [
      { btn: document.getElementById('tab-btn-sector'), pane: document.getElementById('tab-pane-sector') },
      { btn: document.getElementById('tab-btn-cctv'), pane: document.getElementById('tab-pane-cctv') },
      { btn: document.getElementById('tab-btn-wiretap'), pane: document.getElementById('tab-pane-wiretap') },
    ];

    tabs.forEach((tab) => {
      if (!tab.btn) return;
      tab.btn.addEventListener('click', () => {
        if (tab.btn.classList.contains('locked')) {
          alert('TAB LOCKED // RESTORE NVTA SECTOR FIRST');
          return;
        }

        tabs.forEach((t) => {
          t.btn?.classList.remove('active');
          t.pane?.classList.remove('active');
        });

        tab.btn.classList.add('active');
        tab.pane?.classList.add('active');

        if (tab.btn.id === 'tab-btn-cctv') {
          setTimeout(() => {
            MediaEngine.initToxicologyChart();
          }, 100);
        }
      });
    });

    // Unlocking condition
    if (GameState.get().puzzles.hexComplete) {
      document.getElementById('tab-btn-cctv')?.classList.remove('locked');
    }
  }

  function setupTerminalTabs() {
    const tabs = [
      { btn: document.getElementById('term-tab-btn-cli'), pane: document.getElementById('term-pane-cli') },
      { btn: document.getElementById('term-tab-btn-serum'), pane: document.getElementById('term-pane-serum') },
      { btn: document.getElementById('term-tab-btn-indict'), pane: document.getElementById('term-pane-indict') },
    ];

    tabs.forEach((tab) => {
      if (!tab.btn) return;
      tab.btn.addEventListener('click', () => {
        tabs.forEach((t) => {
          t.btn?.classList.remove('active');
          t.pane?.classList.remove('active');
        });
        tab.btn.classList.add('active');
        tab.pane?.classList.add('active');
      });
    });
  }

  return {
    init,
    openWindow,
    closeWindow,
    renderDossierFileList,
    renderDossierActiveDocument,
    renderPersonsOfInterest,
    refreshDesktopState,
  };
})();

// Initialize once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});
