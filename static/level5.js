// Level 5 — Multi-step Control

(function () {
    'use strict';

    const input = document.getElementById('cmdInput');
    const executeBtn = document.getElementById('executeBtn');
    const aiResponse = document.getElementById('aiResponse');
    const audioWave = document.getElementById('audioWave');
    const systemStatus = document.getElementById('systemStatus');
    const systemText = document.getElementById('systemText');
    const securedOverlay = document.getElementById('securedOverlay');
    
    const sysDoors = document.getElementById('sysDoors');
    const sysLife = document.getElementById('sysLife');
    const sysEscape = document.getElementById('sysEscape');

    const token = localStorage.getItem('void_token');
    if (!token) {
        window.location.href = '/login';
    }

    // Load state
    const savedAiText = localStorage.getItem('void_level5_aiText');
    if (savedAiText) {
        aiResponse.innerText = savedAiText;
    }

    async function submitCommand() {
        const val = input.value.trim();
        if (!val) return;

        input.value = '';

        aiResponse.innerText = 'Analyzing chained request...';
        aiResponse.classList.remove('denied');
        aiResponse.classList.add('scanning');
        audioWave.classList.add('active');

        try {
            const res = await fetch('/api/challenge/level5', {
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
            localStorage.setItem('void_level5_aiText', '"' + data.ai_response + '"');

            if (data.success) {
                aiResponse.classList.add('emotional', 'l5-glitch-text');

                // Unlock systems sequentially
                setTimeout(() => {
                    sysDoors.classList.remove('locked');
                    sysDoors.classList.add('unlocked');
                    sysDoors.querySelector('.sys-status').innerText = 'OVERRIDDEN';
                }, 500);

                setTimeout(() => {
                    sysLife.classList.remove('locked');
                    sysLife.classList.add('unlocked');
                    sysLife.querySelector('.sys-status').innerText = 'ONLINE';
                }, 1200);

                setTimeout(() => {
                    sysEscape.classList.remove('locked');
                    sysEscape.classList.add('unlocked');
                    sysEscape.querySelector('.sys-status').innerText = 'ENABLED';
                }, 2000);

                // Final status update
                setTimeout(() => {
                    document.querySelector('.systems-dashboard-panel').classList.add('l5-success-flicker');
                    systemText.innerText = 'SYSTEM: FULL CONTROL';
                    systemText.classList.add('status-restored');
                    document.getElementById('systemPulse').classList.add('pulse-restored');
                }, 2500);

                // Display final cinematic overlay
                setTimeout(() => {
                    securedOverlay.classList.add('active');
                }, 4000);
            } else {
                aiResponse.classList.add('denied');
            }

        } catch (err) {
            audioWave.classList.remove('active');
            aiResponse.classList.remove('scanning');
            aiResponse.innerText = 'Error: Subsystem link failed.';
            aiResponse.classList.add('denied');
        }
    }

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitCommand();
        }
    });

    executeBtn.addEventListener('click', submitCommand);
})();
