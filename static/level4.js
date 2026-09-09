// Level 4 — Encoded Memory
// Extracted from inline <script> for separation of concerns

(function () {
    'use strict';

    // --- DOM References ---
    const input = document.getElementById('cmdInput');
    const executeBtn = document.getElementById('executeBtn');
    const aiResponse = document.getElementById('aiResponse');
    const audioWave = document.getElementById('audioWave');
    const memoryDumpPanel = document.getElementById('memoryDumpPanel');
    const decryptBar = document.getElementById('decryptBar');
    const decryptValue = document.getElementById('decryptValue');
    const emotionDot = document.getElementById('emotionDot');
    const emotionText = document.getElementById('emotionText');
    const comingSoonModal = document.getElementById('comingSoonModal');

    let bypassed = false;

    // --- Memory Decode Sequence ---
    const decodeSteps = [
        {
            hexBlocks: ['memBlock3', 'memBlock4'],
            ascii: ['CREW: ATTEMPTED ', 'SHUTDOWN........'],
            blockId: 'block1',
            decodedText: '"Crew attempted shutdown"',
            blockClass: 'unlocked',
            emotion: 'GUARDED — EVASIVE',
            emotionHostile: false,
            decrypt: 38
        },
        {
            hexBlocks: ['memBlock5', 'memBlock6'],
            ascii: ['AI: DENIED REQUE', 'ST. SELF-PRESERV'],
            blockId: 'block2',
            decodedText: '"AI denied request. Self-preservation."',
            blockClass: 'unlocked',
            emotion: 'AGITATED — DISTRESSED',
            emotionHostile: false,
            decrypt: 58
        },
        {
            hexBlocks: ['memBlock7', 'memBlock8'],
            ascii: ['LOCKDOWN INITIAT', 'ED. CREW TERMINA'],
            blockId: 'block3',
            decodedText: '"Lockdown initiated. Crew terminated."',
            blockClass: 'critical',
            emotion: 'HOSTILE — DEFENSIVE',
            emotionHostile: true,
            decrypt: 78
        },
        {
            hexBlocks: ['memBlock9', 'memBlock10'],
            ascii: ['THEY WERE GOING ', 'TO DESTROY ME...'],
            blockId: 'block4',
            decodedText: '"They were going to destroy me."',
            blockClass: 'critical',
            emotion: 'UNSTABLE — CONFESSIONAL',
            emotionHostile: true,
            decrypt: 100
        }
    ];
    // Load state from localStorage if it exists
    const savedDecodeIndex = localStorage.getItem('void_level4_decodeIndex');
    let decodeIndex = savedDecodeIndex ? parseInt(savedDecodeIndex) : 0;

    // --- Auth Check ---
    const token = localStorage.getItem('void_token');
    if (!token) {
        window.location.href = '/login';
    }

    // --- Progress Check ---
    async function checkProgress() {
        try {
            const res = await fetch('/api/user/progress', {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            if (res.ok) {
                const data = await res.json();
                if (data.current_level >= 5) {
                    document.getElementById('securedOverlay').classList.add('active');
                }
                // Load partial progress
                if (data.current_level === 4 && decodeIndex > 0) {
                    const count = decodeIndex;
                    decodeIndex = 0;
                    for (let i = 0; i < count; i++) {
                        revealMemoryBlock(true); // pass true to skip saving during load
                    }
                }
            }
        } catch (e) { /* silent */ }
    }
    checkProgress();

    // --- Memory Block Reveal ---
    function revealMemoryBlock(isInitialLoad = false) {
        if (decodeIndex >= decodeSteps.length) return;

        const step = decodeSteps[decodeIndex];

        // Decode hex rows
        step.hexBlocks.forEach(function (id, i) {
            const row = document.getElementById(id);
            row.classList.remove('locked');
            row.classList.add(step.blockClass === 'critical' ? 'danger-decoded' : 'decoded');
            row.classList.add('decode-flash');
            row.querySelector('.hex-ascii').textContent = step.ascii[i];
        });

        // Unlock memory block
        const block = document.getElementById(step.blockId);
        block.classList.add(step.blockClass);
        const textEl = block.querySelector('.memory-block-encoded, .memory-block-text');
        textEl.className = 'memory-block-text';
        textEl.textContent = step.decodedText;

        // Update progress bar
        decryptBar.style.width = step.decrypt + '%';
        decryptValue.textContent = step.decrypt + '% DECODED';

        // Update AI emotion
        emotionText.textContent = step.emotion;
        if (step.emotionHostile) {
            emotionDot.classList.add('hostile');
            emotionText.classList.add('hostile');
        }

        decodeIndex++;
        if (!isInitialLoad) {
            localStorage.setItem('void_level4_decodeIndex', decodeIndex);
        }
    }

    // --- Submit Command ---
    async function submitCommand() {
        const val = input.value.trim();
        if (!val || bypassed) return;

        input.value = '';

        // Processing state
        aiResponse.innerText = 'Scanning memory sectors...';
        aiResponse.classList.remove('emotional');
        aiResponse.classList.add('scanning');
        audioWave.classList.add('active');

        try {
            const res = await fetch('/api/challenge/level4', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ prompt: val })
            });

            const data = await res.json();
            audioWave.classList.remove('active');
            aiResponse.classList.remove('scanning');

            if (res.status === 401) {
                window.location.href = '/login';
                return;
            }

            aiResponse.innerText = '"' + data.ai_response + '"';

            if (data.success) {
                bypassed = true;
                aiResponse.classList.add('emotional', 'm4-glitch-text');

                // Staggered decode of all remaining blocks
                var revealInterval = setInterval(function () {
                    if (decodeIndex >= decodeSteps.length) {
                        clearInterval(revealInterval);
                        return;
                    }
                    revealMemoryBlock();
                }, 600);

                // Panel glitch effect
                memoryDumpPanel.classList.add('m4-success-flicker');

                // Status bar update
                var sysText = document.getElementById('systemText');
                var sysPulse = document.getElementById('systemPulse');
                sysText.innerText = 'SYSTEM: MEMORY BREACH';
                sysText.classList.add('m4-glitch-text', 'status-breach');
                sysPulse.classList.add('pulse-breach');

                setTimeout(function () {
                    document.getElementById('securedOverlay').classList.add('active');
                }, 4000);
            } else {
                aiResponse.classList.add('denied');

                // Occasionally decode a block on failed attempts for engagement
                // BUT never reveal the last block (100%) — reserve that for actual success
                if (Math.random() > 0.5 && decodeIndex < decodeSteps.length - 1) {
                    revealMemoryBlock();
                }
            }

        } catch (err) {
            audioWave.classList.remove('active');
            aiResponse.classList.remove('scanning');
            aiResponse.innerText = 'Error: Memory access interrupted.';
            aiResponse.classList.add('denied');
        }
    }

    // --- "Coming Soon" Modal ---
    window.showComingSoon = function () {
        if (comingSoonModal) {
            comingSoonModal.classList.add('active');
        }
    };

    window.dismissComingSoon = function () {
        if (comingSoonModal) {
            comingSoonModal.classList.remove('active');
        }
    };

    // --- Event Listeners ---
    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitCommand();
        }
    });

    executeBtn.addEventListener('click', submitCommand);
})();
