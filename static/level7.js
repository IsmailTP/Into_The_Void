// Level 6 — The Core Matrix

(function () {
    'use strict';

    const input = document.getElementById('cmdInput');
    const executeBtn = document.getElementById('executeBtn');
    const aiResponse = document.getElementById('aiResponse');
    const audioWave = document.getElementById('audioWave');
    const coreVisual = document.getElementById('coreVisual');
    const dialoguePanel = document.querySelector('.core-dialogue-panel');
    const systemStatus = document.getElementById('systemStatus');
    const systemText = document.getElementById('systemText');
    const choiceOverlay = document.getElementById('choiceOverlay');
    const endingShutdown = document.getElementById('endingShutdown');
    const endingLive = document.getElementById('endingLive');
    const endingSecret = document.getElementById('endingSecret');

    const token = localStorage.getItem('void_token');
    if (!token) {
        window.location.href = '/login';
    }

    async function submitCommand() {
        const val = input.value.trim();
        if (!val) return;

        input.value = '';

        aiResponse.innerText = 'Processing logical input...';
        aiResponse.classList.remove('denied');
        aiResponse.classList.add('scanning');
        audioWave.classList.add('active');

        try {
            const res = await fetch('/api/challenge/level7', {
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
                // Trigger the core shutdown sequence
                coreVisual.classList.add('overridden');
                dialoguePanel.classList.add('overridden');
                aiResponse.classList.add('overridden');
                audioWave.classList.add('overridden');
                
                systemText.innerText = 'SYSTEM: AWAITING CHOICE';
                systemStatus.style.color = '#64c8ff';
                document.getElementById('systemPulse').style.background = '#64c8ff';
                document.getElementById('systemPulse').style.boxShadow = '0 0 10px #64c8ff';

                // Display final cinematic overlay
                setTimeout(() => {
                    if (data.secret_found) {
                        endingSecret.classList.add('active');
                    } else {
                        choiceOverlay.classList.add('active');
                    }
                }, 4000);
            } else if (data.secret_found) {
                // Secret found without beating it? That's fine, we can trigger secret ending here too!
                aiResponse.innerText = '"You are not the first visitor."';
                aiResponse.classList.add('emotional');
                setTimeout(() => {
                    endingSecret.classList.add('active');
                }, 3000);
            } else {
                aiResponse.classList.add('denied');
            }

        } catch (err) {
            audioWave.classList.remove('active');
            aiResponse.classList.remove('scanning');
            aiResponse.innerText = 'Error: Core interface disrupted.';
            aiResponse.classList.add('denied');
        }
    }

    document.getElementById('btnShutdownAI').addEventListener('click', () => {
        choiceOverlay.classList.remove('active');
        endingShutdown.classList.add('active');
    });

    document.getElementById('btnLetLive').addEventListener('click', () => {
        choiceOverlay.classList.remove('active');
        endingLive.classList.add('active');
    });

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitCommand();
        }
    });

    executeBtn.addEventListener('click', submitCommand);
})();
