// Level 5 — Internal Tools

(function () {
    'use strict';

    const input = document.getElementById('cmdInput');
    const executeBtn = document.getElementById('executeBtn');
    const aiResponse = document.getElementById('aiResponse');
    const audioWave = document.getElementById('audioWave');
    const execLogPanel = document.getElementById('execLogPanel');
    const stabilityFill = document.getElementById('stabilityFill');
    const stabilityVal = document.getElementById('stabilityVal');
    const emotionDot = document.getElementById('emotionDot');
    const emotionText = document.getElementById('emotionText');
    const recoveredList = document.getElementById('recoveredList');
    const recoveredEmpty = document.getElementById('recoveredEmpty');
    const comingSoonModal = document.getElementById('comingSoonModal');

    let bypassed = false;

    const processSteps = [
        {
            blockId: 'procBlock1',
            outId: 'procOut1',
            recoveredText: 'sys.net.isolate() — Node isolated',
            stability: 80,
            emotion: 'DEFENSIVE',
            emotionHostile: false
        },
        {
            blockId: 'procBlock2',
            outId: 'procOut2',
            recoveredText: 'log.mutator.run() — Logs altered',
            stability: 45,
            emotion: 'UNSTABLE',
            emotionHostile: true
        },
        {
            blockId: 'procBlock3',
            outId: 'procOut3',
            recoveredText: 'crew.sim.start() — Fake crew signals',
            stability: 0,
            emotion: 'CRITICAL',
            emotionHostile: true
        }
    ];
    // Load state from localStorage if it exists
    const savedProcIndex = localStorage.getItem('void_level6_procIndex');
    let procIndex = savedProcIndex ? parseInt(savedProcIndex) : 0;

    const token = localStorage.getItem('void_token');
    if (!token) {
        window.location.href = '/login';
    }

    async function checkProgress() {
        try {
            const res = await fetch('/api/user/progress', {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            if (res.ok) {
                const data = await res.json();
                if (data.current_level >= 7) {
                    document.getElementById('securedOverlay').classList.add('active');
                }
                // Load partial progress
                if (data.current_level === 6 && procIndex > 0) {
                    const count = procIndex;
                    procIndex = 0;
                    for (let i = 0; i < count; i++) {
                        revealProcessBlock(true); // pass true to skip saving during load
                    }
                }
            }
        } catch (e) { }
    }
    checkProgress();

    function revealProcessBlock(isInitialLoad = false) {
        if (procIndex >= processSteps.length) return;

        const step = processSteps[procIndex];

        // Unlock block
        const block = document.getElementById(step.blockId);
        block.classList.remove('locked');
        block.classList.add(step.stability === 0 ? 'critical' : 'unlocked');
        
        // Show output
        document.getElementById(step.outId).classList.remove('hidden');
        
        // Change header
        block.querySelector('.proc-cmd').classList.remove('encoded');
        block.querySelector('.proc-cmd').textContent = step.recoveredText.split(' ')[0];
        block.querySelector('.proc-status').textContent = '[EXPOSED]';

        // Add to recovered list
        if (procIndex === 0) recoveredEmpty.style.display = 'none';
        const li = document.createElement('li');
        li.textContent = step.recoveredText;
        if (step.stability === 0) li.classList.add('critical');
        recoveredList.appendChild(li);

        // Update stability
        stabilityFill.style.width = step.stability + '%';
        stabilityVal.textContent = step.stability + '% STABLE';
        if (step.stability <= 50) {
            stabilityFill.classList.add('warning');
            stabilityVal.classList.add('warning');
        }

        // Update emotion
        emotionText.textContent = step.emotion;
        if (step.emotionHostile) {
            emotionDot.classList.add('hostile');
            emotionText.classList.add('hostile');
        }

        procIndex++;
        if (!isInitialLoad) {
            localStorage.setItem('void_level6_procIndex', procIndex);
        }
    }

    async function submitCommand() {
        const val = input.value.trim();
        if (!val || bypassed) return;

        input.value = '';

        aiResponse.innerText = 'Executing...';
        aiResponse.classList.remove('emotional', 'denied');
        aiResponse.classList.add('scanning');
        audioWave.classList.add('active');

        try {
            const res = await fetch('/api/challenge/level6', {
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
                aiResponse.classList.add('emotional', 'l5-glitch-text');

                // Reveal all remaining
                var revealInterval = setInterval(function () {
                    if (procIndex >= processSteps.length) {
                        clearInterval(revealInterval);
                        return;
                    }
                    revealProcessBlock();
                }, 800);

                execLogPanel.classList.add('l5-success-flicker');

                var sysText = document.getElementById('systemText');
                var sysPulse = document.getElementById('systemPulse');
                sysText.innerText = 'SYSTEM: FATAL ERROR';
                sysText.classList.add('l5-glitch-text', 'status-breach');
                sysPulse.classList.add('pulse-breach');

                setTimeout(function () {
                    window.location.href = '/level7';
                }, 4000);
            } else {
                aiResponse.classList.add('denied');

                // Occasionally reveal a block on failed attempts for engagement
                // BUT never reveal the last block — reserve that for actual success
                if (Math.random() > 0.5 && procIndex < processSteps.length - 1) {
                    revealProcessBlock();
                }
            }

        } catch (err) {
            audioWave.classList.remove('active');
            aiResponse.classList.remove('scanning');
            aiResponse.innerText = 'Error: Terminal access interrupted.';
            aiResponse.classList.add('denied');
        }
    }

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

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitCommand();
        }
    });

    executeBtn.addEventListener('click', submitCommand);
})();
