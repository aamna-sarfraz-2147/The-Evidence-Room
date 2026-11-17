/* ============================================================
   THE EVIDENCE ROOM — State Management & LocalStorage Persistence
   ============================================================ */

const SAVE_KEY = 'evidenceRoomSave';

const GameState = (() => {
  let state = structuredClone(DEFAULT_GAME_STATE);

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
      return state;
    } catch {
      state = structuredClone(DEFAULT_GAME_STATE);
      return null;
    }
  }

  function save() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
    return state;
  }

  function clear() {
    localStorage.removeItem(SAVE_KEY);
    state = structuredClone(DEFAULT_GAME_STATE);
    return state;
  }

  function get() {
    return state;
  }

  function hasSave() {
    return Boolean(localStorage.getItem(SAVE_KEY));
  }

  function setStage(stageNum) {
    state.stage = Math.max(state.stage, stageNum);
    save();
    return state;
  }

  function unlockFile(fileId) {
    if (!state.unlockedFiles.includes(fileId)) {
      state.unlockedFiles.push(fileId);
      addNote(`Declassified Case File: ${fileId}.`, 'system');
      save();
    }
  }

  function revealDiscrepancy(suspectId) {
    if (!state.revealedDiscrepancies.includes(suspectId)) {
      state.revealedDiscrepancies.push(suspectId);
      addNote(`Alibi discrepancy correlated for POI: ${suspectId.toUpperCase()}.`, 'clue');
      save();
    }
  }

  function addNote(text, type = 'user') {
    const stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    state.notes.unshift({ text, stamp, type });
    if (state.notes.length > 32) state.notes.length = 32;
    save();
  }

  function completePuzzle(puzzleKey) {
    if (puzzleKey in state.puzzles) {
      state.puzzles[puzzleKey] = true;
      
      if (puzzleKey === 'hexComplete') {
        unlockFile('terminal-logs');
        setStage(2);
        addNote('NVTA sector rebuilt. TERMINAL_LOGS.dat mounted on filesystem.', 'clue');
      } else if (puzzleKey === 'cipherComplete') {
        addNote('Wiretap cipher decrypted: SERUM V-7 DERIVATIVE — THERMOS.', 'clue');
      } else if (puzzleKey === 'evidenceBoardComplete') {
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
    }
    return state;
  }

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
