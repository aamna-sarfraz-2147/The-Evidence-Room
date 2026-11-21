// Game state manager: handles saving progress to localStorage and triggers live UI updates across the desktop.
// Teammates: all changes to stage, notes, or puzzle flags automatically notify subscribers
// so the status bar and quick notes drawer update immediately in real time without refreshing.

const SAVE_KEY = 'evidenceRoomSave';

const GameState = (() => {
  let state = structuredClone(DEFAULT_GAME_STATE);
  const listeners = new Set();

  // Allows UI components (like the status bar and notes drawer) to listen for live state changes
  function subscribe(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
  }

  function notify(changeType, payload) {
    listeners.forEach((fn) => {
      try {
        fn(state, changeType, payload);
      } catch (err) {
        console.error('GameState listener error:', err);
      }
    });
  }

  // Load saved session from browser storage if present
  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) {
        state = structuredClone(DEFAULT_GAME_STATE);
        return null;
      }
      const parsed = JSON.parse(raw);
      state = {
        ...structuredClone(DEFAULT_GAME_STATE),
        ...parsed,
        puzzles: {
          ...structuredClone(DEFAULT_GAME_STATE.puzzles),
          ...(parsed.puzzles || {}),
        },
      };
      notify('load', state);
      return state;
    } catch {
      state = structuredClone(DEFAULT_GAME_STATE);
      return null;
    }
  }

  // Write current state to localStorage and alert active listeners
  function save() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
    notify('save', state);
    return state;
  }

  // Clear archive data when the user clicks restart and confirms
  function clear() {
    localStorage.removeItem(SAVE_KEY);
    state = structuredClone(DEFAULT_GAME_STATE);
    notify('clear', state);
    return state;
  }

  function get() {
    return state;
  }

  function hasSave() {
    return Boolean(localStorage.getItem(SAVE_KEY));
  }

  // Advance stage number and trigger live UI refresh
  function setStage(stageNum) {
    if (stageNum > state.stage) {
      state.stage = stageNum;
      save();
      notify('stageChange', state.stage);
    }
    return state;
  }

  // Unlock evidence document files
  function unlockFile(fileId) {
    if (!state.unlockedFiles.includes(fileId)) {
      state.unlockedFiles.push(fileId);
      addNote(`Declassified Case File: ${fileId}.`, 'system');
      save();
      notify('fileUnlocked', fileId);
    }
  }

  // Uncover contradictions on suspect profile cards
  function revealDiscrepancy(suspectId) {
    if (!state.revealedDiscrepancies.includes(suspectId)) {
      state.revealedDiscrepancies.push(suspectId);
      addNote(`Alibi discrepancy correlated for POI: ${suspectId.toUpperCase()}.`, 'clue');
      save();
      notify('discrepancyRevealed', suspectId);
    }
  }

  // Record a field note or clue to Daria's quick notes drawer
  function addNote(text, type = 'user') {
    const stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    state.notes.unshift({ text, stamp, type });
    if (state.notes.length > 32) state.notes.length = 32;
    save();
    notify('noteAdded', { text, stamp, type });
  }

  // Mark a puzzle complete, update story progression, and trigger live updates
  function completePuzzle(puzzleKey) {
    if (puzzleKey in state.puzzles) {
      state.puzzles[puzzleKey] = true;

      // Hex repair unlocks terminal logs and advances game to Stage 2
      if (puzzleKey === 'hexComplete') {
        unlockFile('terminal-logs');
        setStage(2);
        addNote('NVTA sector rebuilt. TERMINAL_LOGS.dat mounted on filesystem.', 'clue');
      } else if (puzzleKey === 'cipherComplete') {
        addNote('Wiretap cipher decrypted: SERUM V-7 DERIVATIVE — THERMOS.', 'clue');
      } else if (puzzleKey === 'evidenceBoardComplete') {
        // Solving the evidence board debunks all three suspect alibis and elevates to Stage 3
        revealDiscrepancy('vane');
        revealDiscrepancy('malekov');
        revealDiscrepancy('lindqvist');
        setStage(3);
        addNote('All suspect alibis debunked on Evidence Board. Case elevated to Stage 3.', 'clue');
      } else if (puzzleKey === 'terminalDecrypted' || puzzleKey === 'deadhandMounted') {
        addNote('Partition V_VOLKOV_DEADHAND mounted. Secret protocol decrypted.', 'clue');
      } else if (puzzleKey === 'serumComplete') {
        addNote('Lethal molecular sequence verified: V7-CORE → NEVA-α → MYO-KILL → CLOAK-4H → TRACE-NULL.', 'clue');
      } else if (puzzleKey === 'indictmentSubmitted') {
        addNote('Formal Indictment filed with Federal Forensic Archives.', 'system');
      }

      save();
      notify('puzzleCompleted', puzzleKey);
    }
    return state;
  }

  // Dynamic objective displayed in the top status bar pill
  function getStageObjective() {
    if (state.stage === 1) {
      return 'Examine case files & repair corrupted terminal disk sectors.';
    } else if (state.stage === 2) {
      return 'Analyze CAM_04 surveillance footage, biometrics & intercepted wiretap.';
    } else {
      return 'Access Deadhand terminal, sequence Serum V-7 & submit formal indictment.';
    }
  }

  function resumeLabel() {
    if (state.stage === 1) return 'STAGE 1 // SECTOR REPAIR';
    if (state.stage === 2) return 'STAGE 2 // FORENSIC LAB';
    return 'STAGE 3 // DEADHAND & INDICTMENT';
  }

  return {
    subscribe,
    load,
    save,
    clear,
    get,
    hasSave,
    setStage,
    unlockFile,
    revealDiscrepancy,
    addNote,
    completePuzzle,
    getStageObjective,
    resumeLabel,
  };
})();
