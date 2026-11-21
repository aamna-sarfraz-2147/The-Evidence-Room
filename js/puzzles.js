// Puzzle logic and forensic minigames:
// 1. Hex sector repair
// 2. Caesar shift decryptor
// 3. Evidence board red string matching
// 4. Deadhand terminal shell
// 5. Serum V-7 peptide sequencer
// 6. Final indictment submission

const PuzzleEngine = (() => {
  // 1. Hex Editor: Rebuild corrupted disk sectors
  // Clue found in Officer Kuznetsova's notes: target sequence is 54 48 41 14 42
  function initHexEditor() {
    const gridContainer = document.getElementById('hex-grid');
    const statusText = document.getElementById('hex-status');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';
    const currentValues = HEX_PUZZLE.grid.slice();
    const solvedTargets = new Set();

    const isCompleted = GameState.get().puzzles.hexComplete;

    HEX_PUZZLE.grid.forEach((byte, index) => {
      const cell = document.createElement('div');
      cell.className = 'hex-cell';
      cell.dataset.index = index;

      const target = HEX_PUZZLE.targets.find((t) => t.index === index);

      if (target) {
        cell.classList.add('corrupted');
        cell.title = 'Corrupted sector byte — Click to cycle values';

        if (isCompleted) {
          currentValues[index] = target.correct;
          cell.textContent = target.correct;
          cell.classList.remove('corrupted');
          cell.classList.add('repaired');
          solvedTargets.add(index);
        } else {
          cell.textContent = byte;
        }

        cell.addEventListener('click', () => {
          if (solvedTargets.has(index)) return;

          const opts = HEX_PUZZLE.options;
          const curr = cell.textContent;
          const nextIdx = (opts.indexOf(curr) + 1) % opts.length;
          const nextVal = opts[nextIdx];

          currentValues[index] = nextVal;
          cell.textContent = nextVal;

          if (nextVal === target.correct) {
            solvedTargets.add(index);
            cell.classList.remove('corrupted');
            cell.classList.add('repaired');

            if (solvedTargets.size === HEX_PUZZLE.targets.length) {
              statusText.textContent = 'SECTOR HEADER REBUILT (54 48 41 14 42) // TERMINAL_LOGS.dat DECLASSIFIED';
              statusText.style.color = 'var(--accent-emerald)';
              GameState.completePuzzle('hexComplete');
            } else {
              statusText.textContent = `Sector byte calibrated (${solvedTargets.size}/${HEX_PUZZLE.targets.length}).`;
              statusText.style.color = 'var(--accent-ice)';
            }
          } else {
            statusText.textContent = 'CRC32 checksum mismatch. Check First-Responder field notes for recovery signature.';
            statusText.style.color = 'var(--accent-amber)';
          }
        });
      } else {
        cell.textContent = byte;
      }

      gridContainer.appendChild(cell);
    });

    if (isCompleted) {
      statusText.textContent = 'SECTOR HEADER REBUILT (54 48 41 14 42) // TERMINAL_LOGS.dat DECLASSIFIED';
      statusText.style.color = 'var(--accent-emerald)';
    }
  }

  // 2. Caesar Shift Decryptor
  // Shifts intercepted radio memo 7 letters backward to reveal: "SERUM V-7 DERIVATIVE — THERMOS"
  function initCipherDecryptor() {
    const rawBox = document.getElementById('cipher-raw');
    const slider = document.getElementById('cipher-shift-slider');
    const shiftLabel = document.getElementById('cipher-shift-val');
    const previewBox = document.getElementById('cipher-preview');
    if (!slider || !previewBox) return;

    const ciphertext = WIRETAP_DATA.cipher.ciphertext;
    const targetPlaintext = WIRETAP_DATA.cipher.plaintext;

    function decodeCaesar(str, shift) {
      return str
        .split('')
        .map((char) => {
          if (char >= 'A' && char <= 'Z') {
            const code = char.charCodeAt(0) - 65;
            const shifted = (code - shift + 26) % 26;
            return String.fromCharCode(shifted + 65);
          }
          return char;
        })
        .join('');
    }

    function updateCipher() {
      const shift = parseInt(slider.value, 10);
      shiftLabel.textContent = `Shift: -${shift}`;
      const decoded = decodeCaesar(ciphertext, shift);
      previewBox.textContent = decoded;

      if (decoded === targetPlaintext) {
        previewBox.classList.add('solved');
        GameState.completePuzzle('cipherComplete');
      } else {
        previewBox.classList.remove('solved');
      }
    }

    slider.addEventListener('input', updateCipher);

    if (GameState.get().puzzles.cipherComplete) {
      slider.value = WIRETAP_DATA.cipher.shift;
      updateCipher();
    }
  }

  // 3. Evidence Board: Match suspect alibis with forensic contradictions
  // Draws red string connections between pin nodes using an HTML5 canvas overlay
  const boardConnections = [];
  let selectedAlibiCard = null;

  function initEvidenceBoard() {
    const alibiCol = document.getElementById('board-alibi-stack');
    const contraCol = document.getElementById('board-contra-stack');
    const canvas = document.getElementById('evidence-string-canvas');
    if (!alibiCol || !contraCol || !canvas) return;

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      const container = canvas.parentElement;
      if (container && container.offsetWidth > 0) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      } else {
        canvas.width = 780;
        canvas.height = 520;
      }
      drawStrings();
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Render suspect alibi cards on the left
    alibiCol.innerHTML = EVIDENCE_BOARD_DATA.alibis
      .map(
        (a) => `
        <div class="board-pin-card alibi" id="${a.id}" data-id="${a.id}">
          <div class="board-pin-title">${a.title}</div>
          <div class="board-pin-body">${a.body}</div>
          <div class="board-pin-node"></div>
        </div>
      `
      )
      .join('');

    // Render contradicting evidence cards on the right
    contraCol.innerHTML = EVIDENCE_BOARD_DATA.contradictions
      .map(
        (c) => `
        <div class="board-pin-card evidence" id="${c.id}" data-id="${c.id}" data-matches="${c.matchesAlibi}">
          <div class="board-pin-title">${c.title}</div>
          <div class="board-pin-body">${c.body}</div>
          <div class="board-pin-node"></div>
        </div>
      `
      )
      .join('');

    // Restore connections if previously solved
    if (GameState.get().puzzles.evidenceBoardComplete) {
      EVIDENCE_BOARD_DATA.contradictions.forEach((c) => {
        if (!boardConnections.some((x) => x.alibiId === c.matchesAlibi)) {
          boardConnections.push({ alibiId: c.matchesAlibi, contraId: c.id });
        }
        document.getElementById(c.matchesAlibi)?.classList.add('matched');
        document.getElementById(c.id)?.classList.add('matched');
      });
      setTimeout(drawStrings, 100);
    }

    // Card click events for matching pins
    document.querySelectorAll('.board-pin-card.alibi').forEach((card) => {
      card.addEventListener('click', () => {
        if (card.classList.contains('matched')) return;

        document.querySelectorAll('.board-pin-card.alibi').forEach((c) => c.classList.remove('selected'));
        selectedAlibiCard = card.dataset.id;
        card.classList.add('selected');
      });
    });

    document.querySelectorAll('.board-pin-card.evidence').forEach((card) => {
      card.addEventListener('click', () => {
        if (!selectedAlibiCard || card.classList.contains('matched')) return;

        const targetAlibi = card.dataset.matches;
        if (selectedAlibiCard === targetAlibi) {
          boardConnections.push({ alibiId: selectedAlibiCard, contraId: card.dataset.id });

          const alibiEl = document.getElementById(selectedAlibiCard);
          if (alibiEl) {
            alibiEl.classList.remove('selected');
            alibiEl.classList.add('matched');
          }
          card.classList.add('matched');
          selectedAlibiCard = null;

          drawStrings();

          if (boardConnections.length === EVIDENCE_BOARD_DATA.alibis.length) {
            GameState.completePuzzle('evidenceBoardComplete');
          }
        } else {
          card.style.borderColor = 'var(--accent-crimson)';
          setTimeout(() => {
            card.style.borderColor = '';
          }, 400);
        }
      });
    });

    function drawStrings() {
      if (canvas.parentElement && canvas.parentElement.offsetWidth > 0 && canvas.width !== canvas.parentElement.offsetWidth) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const containerRect = canvas.parentElement.getBoundingClientRect();

      boardConnections.forEach((conn) => {
        const alibiEl = document.getElementById(conn.alibiId);
        const contraEl = document.getElementById(conn.contraId);
        if (!alibiEl || !contraEl) return;

        const pinA = alibiEl.querySelector('.board-pin-node');
        const pinB = contraEl.querySelector('.board-pin-node');
        if (!pinA || !pinB) return;

        const rectA = pinA.getBoundingClientRect();
        const rectB = pinB.getBoundingClientRect();

        const x1 = rectA.left + rectA.width / 2 - containerRect.left;
        const y1 = rectA.top + rectA.height / 2 - containerRect.top;
        const x2 = rectB.left + rectB.width / 2 - containerRect.left;
        const y2 = rectB.top + rectB.height / 2 - containerRect.top;

        // Draw taut red thread with realistic catenary sag
        ctx.strokeStyle = '#F85149';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = 'rgba(248, 81, 73, 0.5)';
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2 + 18;
        ctx.quadraticCurveTo(midX, midY, x2, y2);
        ctx.stroke();

        ctx.shadowBlur = 0;
      });
    }
  }

  // 4. Deadhand Terminal CLI
  // Supports interactive commands: help, ls, cat, decrypt KW-NEVA-8809, mount, status, whoami, clear
  function initTerminalCLI() {
    const scrollArea = document.getElementById('term-log-area');
    const input = document.getElementById('term-cmd-input');
    if (!scrollArea || !input) return;

    const cmdHistory = [];
    let historyIdx = -1;

    function printLine(text, cssClass = 'dim') {
      const line = document.createElement('div');
      line.className = `term-out-line ${cssClass}`;
      line.innerHTML = text;
      scrollArea.appendChild(line);
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }

    printLine('AEGIS-OS SECURE TERMINAL // MOUNT POINT: /mnt/cold_archive', 'ice');
    printLine('Type <span style="color:#58A6FF;">help</span> for authorized commands.', 'dim');

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const rawCmd = input.value.trim();
        input.value = '';
        if (!rawCmd) return;

        cmdHistory.unshift(rawCmd);
        historyIdx = -1;

        printLine(`dvolkov@aegis-archive:~$ ${rawCmd}`, 'emerald');
        handleCommand(rawCmd);
      } else if (e.key === 'ArrowUp') {
        if (cmdHistory.length > 0 && historyIdx < cmdHistory.length - 1) {
          historyIdx++;
          input.value = cmdHistory[historyIdx];
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIdx > 0) {
          historyIdx--;
          input.value = cmdHistory[historyIdx];
        } else if (historyIdx === 0) {
          historyIdx = -1;
          input.value = '';
        }
      }
    });

    function handleCommand(cmdStr) {
      const parts = cmdStr.split(' ');
      const cmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ');

      switch (cmd) {
        case 'help':
          printLine('Available commands:', 'ice');
          printLine('  help                 Show command synopsis', 'dim');
          printLine('  ls                   List directory contents', 'dim');
          printLine('  cat &lt;file&gt;          Print contents of text document', 'dim');
          printLine('  decrypt &lt;key&gt;        Decrypt encrypted partition or blob', 'dim');
          printLine('  mount &lt;volume&gt;       Mount target storage volume', 'dim');
          printLine('  status               Display archive investigation status', 'dim');
          printLine('  whoami               Display investigator credentials', 'dim');
          printLine('  clear                Flush terminal buffer', 'dim');
          break;

        case 'ls':
          printLine('read_me.txt    protocol_v7.txt    kuznetsova_memo.log    deadhand_vault.enc', 'ice');
          break;

        case 'cat':
          if (!arg) {
            printLine('Usage: cat &lt;filename&gt;', 'amber');
          } else if (DEADHAND_FILES[arg]) {
            printLine(DEADHAND_FILES[arg].replace(/\n/g, '<br>'), 'dim');
          } else {
            printLine(`cat: ${arg}: No such file or encrypted sector`, 'crimson');
          }
          break;

        case 'decrypt':
          if (arg.toUpperCase() === 'KW-NEVA-8809') {
            printLine('[AUTHENTICATED] DECRYPTING PARTITION "V_VOLKOV_DEADHAND"...', 'emerald');
            printLine('SUCCESS: Decrypted partition contents mounted to /mnt/vault/v7', 'emerald');
            printLine('CRITICAL INTEL: Serum V-7 Molecular Sequence revealed:', 'amber');
            printLine('  Sequence: V7-CORE → NEVA-α → MYO-KILL → CLOAK-4H → TRACE-NULL', 'ice');
            GameState.completePuzzle('terminalDecrypted');
            GameState.completePuzzle('deadhandMounted');
          } else {
            printLine(`[ERROR] Decryption key invalid: "${arg}". Verify Viktor\'s terminal logs.`, 'crimson');
          }
          break;

        case 'mount':
          if (arg.toUpperCase() === 'V_VOLKOV_DEADHAND') {
            printLine('Mounting partition V_VOLKOV_DEADHAND (Read-Only)...', 'ice');
            printLine('Mounted successfully. Decrypted protocol available.', 'emerald');
            GameState.completePuzzle('deadhandMounted');
          } else {
            printLine(`mount: ${arg}: special device does not exist`, 'crimson');
          }
          break;

        case 'status':
          const st = GameState.get();
          printLine(`CASE #8809 // STAGE ${st.stage}`, 'ice');
          printLine(`Hex Reconstructed: ${st.puzzles.hexComplete ? 'YES' : 'NO'}`, 'dim');
          printLine(`Deadhand Partition: ${st.puzzles.deadhandMounted ? 'MOUNTED' : 'LOCKED'}`, 'dim');
          printLine(`Serum Sequenced: ${st.puzzles.serumComplete ? 'VERIFIED' : 'PENDING'}`, 'dim');
          break;

        case 'whoami':
          printLine('DARIA VOLKOV // SENIOR FORENSIC INVESTIGATOR // BADGE #8809-DV', 'ice');
          break;

        case 'clear':
          scrollArea.innerHTML = '';
          break;

        default:
          printLine(`Command not found: ${cmd}. Type "help" for options.`, 'crimson');
          break;
      }
    }
  }

  // 5. Serum V-7 Molecular Sequencer
  // Target sequence from Viktor's deadhand log: V7-CORE -> NEVA-α -> MYO-KILL -> CLOAK-4H -> TRACE-NULL
  function initSerumSequencer() {
    const slotsContainer = document.getElementById('serum-slots');
    const poolContainer = document.getElementById('serum-pool');
    const statusText = document.getElementById('serum-status');
    const resetBtn = document.getElementById('btn-serum-reset');
    if (!slotsContainer || !poolContainer) return;

    let currentSlots = [null, null, null, null, null];
    const isSolved = GameState.get().puzzles.serumComplete;

    function renderSlots() {
      slotsContainer.innerHTML = '';
      currentSlots.forEach((val, idx) => {
        const slot = document.createElement('div');
        slot.className = 'serum-slot';
        if (val) {
          slot.classList.add('filled');
          slot.textContent = val;
        } else {
          slot.textContent = `SLOT 0${idx + 1}`;
        }
        if (isSolved || checkSolved()) {
          slot.classList.add('solved');
        }

        slot.addEventListener('click', () => {
          if (isSolved) return;
          if (currentSlots[idx]) {
            currentSlots[idx] = null;
            renderSlots();
            renderPool();
            checkSequence();
          }
        });

        slotsContainer.appendChild(slot);
      });
    }

    function renderPool() {
      poolContainer.innerHTML = '';
      SERUM_PUZZLE.pool.forEach((molecule) => {
        const card = document.createElement('div');
        card.className = 'serum-pool-card';
        card.textContent = molecule;

        if (currentSlots.includes(molecule)) {
          card.classList.add('used');
        }

        card.addEventListener('click', () => {
          if (isSolved || card.classList.contains('used')) return;
          const firstEmpty = currentSlots.indexOf(null);
          if (firstEmpty !== -1) {
            currentSlots[firstEmpty] = molecule;
            renderSlots();
            renderPool();
            checkSequence();
          }
        });

        poolContainer.appendChild(card);
      });
    }

    function checkSolved() {
      return (
        currentSlots.length === SERUM_PUZZLE.correctSequence.length &&
        currentSlots.every((v, i) => v === SERUM_PUZZLE.correctSequence[i])
      );
    }

    function checkSequence() {
      if (!currentSlots.includes(null)) {
        if (checkSolved()) {
          statusText.textContent = 'MOLECULAR CHAIN VALIDATED // LETHAL PEPTIDE SYNTHESIS CONFIRMED';
          statusText.style.color = 'var(--accent-emerald)';
          renderSlots();
          GameState.completePuzzle('serumComplete');
        } else {
          statusText.textContent = 'INCOMPATIBLE PEPTIDE CHAIN. Verify Viktor\'s Deadhand protocol document.';
          statusText.style.color = 'var(--accent-amber)';
        }
      } else {
        statusText.textContent = 'Place 5 peptides into slots according to protocol.';
        statusText.style.color = 'var(--text-muted)';
      }
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        currentSlots = [null, null, null, null, null];
        renderSlots();
        renderPool();
        statusText.textContent = 'Chain reset. Select peptides.';
        statusText.style.color = 'var(--text-muted)';
      });
    }

    if (isSolved) {
      currentSlots = SERUM_PUZZLE.correctSequence.slice();
      statusText.textContent = 'MOLECULAR CHAIN VALIDATED // LETHAL PEPTIDE SYNTHESIS CONFIRMED';
      statusText.style.color = 'var(--accent-emerald)';
    }

    renderSlots();
    renderPool();
  }

  // 6. Final Case Indictment Form
  // Submits charges to reopen Case #8809 against Dr. Nikolai Vane and his co-conspirators
  function initIndictmentForm() {
    const form = document.getElementById('indictment-form');
    const culpritSelect = document.getElementById('indict-culprit');
    const weaponSelect = document.getElementById('indict-weapon');
    const motiveSelect = document.getElementById('indict-motive');
    const oppSelect = document.getElementById('indict-opportunity');
    const statusText = document.getElementById('indict-status');
    const resolutionOverlay = document.getElementById('ending-overlay');
    if (!form || !culpritSelect) return;

    culpritSelect.innerHTML = `<option value="">-- SELECT PRIMARY CULPRIT --</option>` +
      INDICTMENT_CONFIG.culprits.map((c) => `<option value="${c.value}">${c.label}</option>`).join('');

    weaponSelect.innerHTML = `<option value="">-- SELECT METHOD / WEAPON --</option>` +
      INDICTMENT_CONFIG.weapons.map((w) => `<option value="${w.value}">${w.label}</option>`).join('');

    motiveSelect.innerHTML = `<option value="">-- SELECT PRIMARY MOTIVE --</option>` +
      INDICTMENT_CONFIG.motives.map((m) => `<option value="${m.value}">${m.label}</option>`).join('');

    oppSelect.innerHTML = `<option value="">-- SELECT OPPORTUNITY / GAP --</option>` +
      INDICTMENT_CONFIG.opportunities.map((o) => `<option value="${o.value}">${o.label}</option>`).join('');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const chosenCulprit = culpritSelect.value;
      const chosenWeapon = weaponSelect.value;
      const chosenMotive = motiveSelect.value;
      const chosenOpp = oppSelect.value;

      const checkedCoConspirators = Array.from(
        document.querySelectorAll('input[name="coconspirator"]:checked')
      ).map((el) => el.value);

      const correct = INDICTMENT_CONFIG.correct;

      const culpritMatch = chosenCulprit === correct.culprit;
      const weaponMatch = chosenWeapon === correct.weapon;
      const motiveMatch = chosenMotive === correct.motive;
      const oppMatch = chosenOpp === correct.opportunity;
      const coMatch =
        checkedCoConspirators.includes('malekov') &&
        checkedCoConspirators.includes('lindqvist') &&
        checkedCoConspirators.length === 2;

      if (culpritMatch && weaponMatch && motiveMatch && oppMatch && coMatch) {
        statusText.textContent = 'INDICTMENT ACCEPTED // CASE #8809 REOPENED';
        statusText.style.color = 'var(--accent-emerald)';
        GameState.completePuzzle('indictmentSubmitted');

        setTimeout(() => {
          if (resolutionOverlay) resolutionOverlay.classList.add('active');
        }, 600);
      } else {
        let errorMsg = 'INDICTMENT REJECTED BY ARCHIVE MAGISTRATE: ';
        if (!culpritMatch) errorMsg += 'Primary culprit misidentified. ';
        else if (!weaponMatch) errorMsg += 'Weapon method unsubstantiated. ';
        else if (!motiveMatch) errorMsg += 'Motive hypothesis fails financial audit. ';
        else if (!oppMatch) errorMsg += 'Opportunity window contradicted by alibi logs. ';
        else if (!coMatch) errorMsg += 'Co-conspirator network incomplete. ';

        statusText.textContent = errorMsg;
        statusText.style.color = 'var(--accent-crimson)';
      }
    });
  }

  return {
    initHexEditor,
    initCipherDecryptor,
    initEvidenceBoard,
    redrawEvidenceBoard: () => {
      const canvas = document.getElementById('evidence-string-canvas');
      if (canvas && canvas.parentElement && canvas.parentElement.offsetWidth > 0) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const containerRect = canvas.parentElement.getBoundingClientRect();

        boardConnections.forEach((conn) => {
          const alibiEl = document.getElementById(conn.alibiId);
          const contraEl = document.getElementById(conn.contraId);
          if (!alibiEl || !contraEl) return;

          const pinA = alibiEl.querySelector('.board-pin-node');
          const pinB = contraEl.querySelector('.board-pin-node');
          if (!pinA || !pinB) return;

          const rectA = pinA.getBoundingClientRect();
          const rectB = pinB.getBoundingClientRect();

          const x1 = rectA.left + rectA.width / 2 - containerRect.left;
          const y1 = rectA.top + rectA.height / 2 - containerRect.top;
          const x2 = rectB.left + rectB.width / 2 - containerRect.left;
          const y2 = rectB.top + rectB.height / 2 - containerRect.top;

          ctx.strokeStyle = '#F85149';
          ctx.lineWidth = 2.5;
          ctx.shadowColor = 'rgba(248, 81, 73, 0.5)';
          ctx.shadowBlur = 8;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2 + 18;
          ctx.quadraticCurveTo(midX, midY, x2, y2);
          ctx.stroke();

          ctx.shadowBlur = 0;
        });
      }
    },
    initTerminalCLI,
    initSerumSequencer,
    initIndictmentForm,
  };
})();
