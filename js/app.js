/**
 * SkyRoutine 🐾 - Application Engine & State Manager
 */

class SkyRoutineApp {
    constructor() {
        this.STORAGE_KEY = 'sky_routine_app_data_v1';
        
        // Initial default state
        this.defaultState = {
            challenge: {
                totalDays: 100,
                currentDay: 1,
                startDate: new Date().toISOString().split('T')[0]
            },
            goals: {
                targetWeightKg: 50.0,
                currentWeightKg: 54.0,
                jobApplicationsCount: 0,
                contentIdeasCount: 0,
                confidenceScore: 85
            },
            namaj: {
                fajr: false,
                dhuhr: false,
                asr: false,
                maghrib: false,
                isha: false
            },
            timers: {
                intern: { timeSpent: 0, targetSec: 3600, running: false, done: false }, // 1 hr
                report: { timeSpent: 0, targetSec: 3600, running: false, done: false }, // 1 hr
                practice: { timeSpent: 0, targetSec: 7200, running: false, done: false }, // 2 hr
                walk: { timeSpent: 0, targetSec: 1800, running: false, done: false } // 30 mins
            },
            checklist: {
                chulAchrano: false,
                roomGhuchano: false,
                dinnerSkipped: false,
                noTea: true,
                noChocolate: true,
                noOvereating: true,
                waterLitersLogged: 0,
                fuskaCountThisWeek: 0
            },
            techLearning: {
                html: false,
                css: false,
                tailwind: false,
                laravel: false,
                react: false,
                nextjs: false
            },
            reflections: {
                badBehaviorAvoided: true, // "khabar behaviour krini ajk"
                dinnerSkipped: true,
                earlySleepPlan: true,
                glowySkinCareDone: true,
                lastSubmittedDate: null
            },

            settings: {
                hideCompleted: false,
                wallpaperMode: false
            }
        };

        this.state = this.loadState();
        this.activeTimers = {};
        this.mascotQuotes = [
            "Shuvo Shokal! Ajk amader 100 days challenge er aro ekta shundor din! 🌸",
            "5 Waqt Namaj porle mon ekdom shanti hoye jay. Shobgulo completed koro! 🕌",
            "1hr Intern kaj + 2hr Coding practice korle kothao atkabe na! Direct dream job! 💻✨",
            "Ada gonta (30 mins) hatcho to? Nijer care newa shobcheye important! 🏃‍♀️",
            "Dream weight 50kg Target + Self Confidence ekebare peak-e jabe! Keep going! 💪",
            "HTML, CSS, Tailwind, Laravel, React, Next.js — protidin thortu thortu shikhe pro hoye jabe! 🚀",
            "Ajk rater dinner light r behavior ekdom cool & polite rakhbo, tight sleep dibo! 🌙",
            "Tumi financial & mental dik theke ekdom strong & capable hobe. I believe in you! ❤️",
            "Mochi tomak shob shomoy cheer korbe! Paws up! 🐾✨",
            "Kaj completed hole meow chime bajbe! Ajker shob tasks done kore felo! 🐱🎉"
        ];
        
        this.init();
    }

    // Load state from localStorage
    loadState() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Check if new day has started to auto-reset daily tasks if needed
                const todayStr = new Date().toISOString().split('T')[0];
                if (parsed.lastActiveDate !== todayStr) {
                    // It's a new day! Increment day if not max
                    if (parsed.challenge && parsed.challenge.currentDay < 100) {
                        parsed.challenge.currentDay += 1;
                    }
                    // Reset daily task checks
                    parsed.namaj = { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false };
                    parsed.checklist.chulAchrano = false;
                    parsed.checklist.roomGhuchano = false;
                    parsed.checklist.dinnerSkipped = false;
                    parsed.techLearning = { html: false, css: false, tailwind: false, laravel: false, react: false, nextjs: false };
                    parsed.timers.intern.timeSpent = 0; parsed.timers.intern.done = false; parsed.timers.intern.running = false;
                    parsed.timers.report.timeSpent = 0; parsed.timers.report.done = false; parsed.timers.report.running = false;
                    parsed.timers.practice.timeSpent = 0; parsed.timers.practice.done = false; parsed.timers.practice.running = false;
                    parsed.timers.walk.timeSpent = 0; parsed.timers.walk.done = false; parsed.timers.walk.running = false;
                    parsed.lastActiveDate = todayStr;
                }
                return { ...this.defaultState, ...parsed };
            }
        } catch (e) {
            console.error("Error loading state", e);
        }
        const state = { ...this.defaultState };
        state.lastActiveDate = new Date().toISOString().split('T')[0];
        return state;
    }

    // Save state to localStorage
    saveState() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
        } catch (e) {
            console.error("Error saving state", e);
        }
    }

    init() {
        this.renderAll();
        this.bindEvents();
        this.checkNightReflectionTrigger();
        this.setupHourlyReminder();
        this.requestDesktopNotificationPermission();
        this.showMascotDialogue("Assalamu Alaikum! Ajker routine complete krte ready to? 🐾✨");
    }

    renderAll() {
        this.renderChallengeBanner();
        this.renderNamajWidget();
        this.renderTimersWidget();
        this.renderChecklistWidget();
        this.renderTechWidget();
        this.renderGoalsWidget();
        this.renderDonutChart();
        this.renderWallpaperState();
    }

    // Canvas Donut Chart for Routine Progress
    renderDonutChart() {
        const canvas = document.getElementById('progressChartCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width = 280;
        const height = canvas.height = 280;

        // Calculate completed stats
        const namajDone = Object.values(this.state.namaj).filter(Boolean).length; // out of 5
        const timersDone = Object.values(this.state.timers).filter(t => t.done || t.timeSpent >= t.targetSec).length; // out of 4
        const techDone = Object.values(this.state.techLearning).filter(Boolean).length; // out of 6
        const careDone = (this.state.checklist.chulAchrano ? 1 : 0) + (this.state.checklist.roomGhuchano ? 1 : 0); // out of 2

        const totalItems = 5 + 4 + 6 + 2; // 17 items total
        const completedTotal = namajDone + timersDone + techDone + careDone;
        const percent = Math.round((completedTotal / totalItems) * 100);

        const data = [
            { label: 'Namaj', value: namajDone, total: 5, color: '#0ea5e9' },
            { label: 'Work/Timers', value: timersDone, total: 4, color: '#fbbf24' },
            { label: 'Tech Practice', value: techDone, total: 6, color: '#c084fc' },
            { label: 'Care & Room', value: careDone, total: 2, color: '#34d399' }
        ];

        ctx.clearRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = 95;
        const innerRadius = 65;

        let startAngle = -Math.PI / 2;

        // Draw donut slices
        data.forEach(item => {
            const sliceAngle = (item.value / totalItems) * (Math.PI * 2);
            if (sliceAngle > 0) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
                ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true);
                ctx.closePath();
                ctx.fillStyle = item.color;
                ctx.fill();
                startAngle += sliceAngle;
            }
        });

        // Draw remaining empty track
        const remainingAngle = ((totalItems - completedTotal) / totalItems) * (Math.PI * 2);
        if (remainingAngle > 0) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, startAngle, startAngle + remainingAngle);
            ctx.arc(centerX, centerY, innerRadius, startAngle + remainingAngle, startAngle, true);
            ctx.closePath();
            ctx.fillStyle = '#e0f2fe';
            ctx.fill();
        }

        // Center Text (% complete)
        ctx.fillStyle = '#0284c7';
        ctx.font = '800 2.2rem "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${percent}%`, centerX, centerY - 6);

        ctx.fillStyle = '#64748b';
        ctx.font = '600 0.82rem "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Daily Routine Done', centerX, centerY + 24);

        // Render Legend HTML
        const legendEl = document.getElementById('chartLegend');
        if (legendEl) {
            legendEl.innerHTML = data.map(d => `
                <div class="legend-item">
                    <span class="legend-color" style="background:${d.color}"></span>
                    <span>${d.label}: ${d.value}/${d.total}</span>
                </div>
            `).join('');
        }
    }

    // 🧚‍♀️ Hourly PC Fairy Reminder Popup & Desktop Notifications
    setupHourlyReminder() {
        // Run every 1 hour (3600,000 ms)
        setInterval(() => {
            this.triggerHourlyFairyReminder();
        }, 3600000);
    }

    requestDesktopNotificationPermission() {
        if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
            Notification.requestPermission();
        }
    }

    triggerHourlyFairyReminder() {
        window.cuteAudio.playFanfare();
        
        // Show Fairy Modal
        const modal = document.getElementById('fairyModalOverlay');
        if (modal) {
            modal.classList.add('active');
        }

        // Show Desktop Notification if permitted
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification("🧚‍♀️ Luna the Sky Fairy Reminder!", {
                body: "1 hour has passed! Take a deep breath, drink water, and check off your routine tasks!",
                icon: "https://fav.farm/🧚‍♀️"
            });
        }
    }

    closeFairyModal() {
        window.cuteAudio.playPop();
        const modal = document.getElementById('fairyModalOverlay');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Cute Scolding Logic ("Boka Dibe" when tasks are missed)
    scoldUserForMissingTasks() {
        window.cuteAudio.playCatMeow();
        
        const bubble = document.getElementById('mascotSpeechBubble');
        if (bubble) {
            bubble.classList.add('scolding');
            setTimeout(() => bubble.classList.remove('scolding'), 1500);
        }

        // Check missing items
        const pendingNamaj = Object.entries(this.state.namaj).filter(([k, v]) => !v).map(([k]) => k.toUpperCase());
        const pendingTimers = Object.entries(this.state.timers).filter(([k, v]) => !v.done).map(([k]) => k.toUpperCase());

        let scoldMsg = "";
        if (pendingNamaj.length > 0) {
            scoldMsg = `😾 Hey! Tumi ekhono ${pendingNamaj.slice(0, 2).join(', ')} namaj koro ni! Fast pora complete koro! 🕌`;
        } else if (pendingTimers.length > 0) {
            scoldMsg = `😾 Ayyy! ${pendingTimers[0]} session akhono pending! Amader 50kg weight target & dream developer job goal bhule gele? Ekhoni finish koro! 💻🔥`;
        } else {
            scoldMsg = "😾 Boka ar dibo na! Ajk tumi shob kaj ekdom shundor mtw complete korecho! Proud of you! ❤️✨";
        }

        this.showMascotDialogue(scoldMsg);
    }

    // Data Export & Import (JSON Backup)
    exportBackupData() {
        const jsonStr = JSON.stringify(this.state, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SkyRoutine_Backup_Day${this.state.challenge.currentDay}.json`;
        a.click();
        URL.revokeObjectURL(url);
        window.cuteAudio.playChime();
        this.showMascotDialogue("Backup data downloaded successfully! Complete safety for your routine! 📄✨");
    }

    importBackupData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = JSON.parse(e.target.result);
                if (parsed && parsed.challenge) {
                    this.state = parsed;
                    this.saveState();
                    this.renderAll();
                    window.cuteAudio.playFanfare();
                    this.triggerConfetti();
                    this.showMascotDialogue("Routine data restored successfully! All progress loaded! 🌟");
                }
            } catch (err) {
                alert("Invalid JSON backup file!");
            }
        };
        reader.readAsText(file);
    }


    // 100 Days Challenge Progress Header
    renderChallengeBanner() {
        const currentDay = this.state.challenge.currentDay;
        const totalDays = this.state.challenge.totalDays;
        const remainingDays = totalDays - currentDay;
        const percent = Math.round((currentDay / totalDays) * 100);

        document.getElementById('currentDayText').innerText = `Day ${currentDay}`;
        document.getElementById('remainingDaysText').innerText = `${remainingDays} Days Left`;
        document.getElementById('progressPercentText').innerText = `${percent}%`;
        document.getElementById('progressBarFill').style.width = `${percent}%`;
        document.getElementById('dayCounterBadge').innerText = `DAY ${currentDay} OF 100`;
    }

    // Namaj Widget
    renderNamajWidget() {
        const grid = document.getElementById('namajGrid');
        if (!grid) return;

        const prayers = [
            { key: 'fajr', name: 'Fajr', time: 'Bhor / Dawn', icon: '🌅' },
            { key: 'dhuhr', name: 'Dhuhr', time: 'Dupur / Noon', icon: '☀️' },
            { key: 'asr', name: 'Asr', time: 'Bikel / Afternoon', icon: '🌤️' },
            { key: 'maghrib', name: 'Maghrib', time: 'Sondhya / Evening', icon: '🌆' },
            { key: 'isha', name: 'Isha', time: 'Rat / Night', icon: '🌙' }
        ];

        let html = '';
        let completedCount = 0;

        prayers.forEach(p => {
            const isDone = this.state.namaj[p.key];
            if (isDone) completedCount++;

            html += `
                <div class="namaj-card ${isDone ? 'completed' : ''}" onclick="app.toggleNamaj('${p.key}')">
                    <span class="namaj-icon">${p.icon}</span>
                    <div class="namaj-name">${p.name}</div>
                    <div class="namaj-time">${p.time}</div>
                    <div class="namaj-status-check">${isDone ? '✓' : ''}</div>
                </div>
            `;
        });

        grid.innerHTML = html;
        document.getElementById('namajBadge').innerText = `${completedCount}/5 Done`;
    }

    toggleNamaj(key) {
        this.state.namaj[key] = !this.state.namaj[key];
        this.saveState();
        this.renderNamajWidget();

        if (this.state.namaj[key]) {
            window.cuteAudio.playChime();
            this.showMascotDialogue(`MashAllah! ${key.toUpperCase()} namaj pora done! Allah tomak aro barakah dik. 🕌✨`);
        } else {
            window.cuteAudio.playPop();
        }

        // Check if all 5 completed
        const allDone = Object.values(this.state.namaj).every(v => v);
        if (allDone) {
            window.cuteAudio.playFanfare();
            this.triggerConfetti();
            this.showMascotDialogue("Alhamdulillah! Ajker 5 Waqt Namaj shob complete! Tumi sotti awesome! 🌟🎉");
        }
    }

    // Timers (Intern 1h, Report 1h, Practice 2h, Walk 30m)
    renderTimersWidget() {
        const grid = document.getElementById('timersGrid');
        if (!grid) return;

        const timerDefs = [
            { key: 'intern', title: '1 Hr Intern Work', icon: '💼', targetSec: 3600 },
            { key: 'report', title: '1 Hr Report / Study', icon: '📝', targetSec: 3600 },
            { key: 'practice', title: '2 Hr Coding Practice', icon: '💻', targetSec: 7200 },
            { key: 'walk', title: '30 Min Walk (Ada gonta)', icon: '🏃‍♀️', targetSec: 1800 }
        ];

        let html = '';
        timerDefs.forEach(t => {
            const data = this.state.timers[t.key] || { timeSpent: 0, targetSec: t.targetSec, running: false, done: false };
            const formatted = this.formatTime(data.timeSpent);
            const targetFormatted = this.formatTime(t.targetSec);
            const isDone = data.done || data.timeSpent >= t.targetSec;

            html += `
                <div class="timer-card ${isDone ? 'completed' : ''}">
                    <div>
                        <div class="timer-card-header">
                            <div class="timer-icon-bg">${t.icon}</div>
                            <div>
                                <div class="timer-title">${t.title}</div>
                                <div class="timer-target">Target: ${targetFormatted}</div>
                            </div>
                        </div>
                        <div class="timer-display" id="timerDisplay_${t.key}">${formatted}</div>
                    </div>
                    <div class="timer-controls">
                        ${!data.running ? `
                            <button class="btn-timer btn-timer-start" onclick="app.startTimer('${t.key}')">▶ Start</button>
                        ` : `
                            <button class="btn-timer btn-timer-pause" onclick="app.pauseTimer('${t.key}')">⏸ Pause</button>
                        `}
                        <button class="btn-timer ${isDone ? 'btn-timer-done' : 'btn-timer-reset'}" onclick="app.toggleTimerDone('${t.key}')">
                            ${isDone ? '✓ Done' : 'Complete'}
                        </button>
                    </div>
                </div>
            `;
        });

        grid.innerHTML = html;
    }

    formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hrs > 0) {
            return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    startTimer(key) {
        window.cuteAudio.playPop();
        if (this.activeTimers[key]) clearInterval(this.activeTimers[key]);

        this.state.timers[key].running = true;
        this.saveState();
        this.renderTimersWidget();

        this.activeTimers[key] = setInterval(() => {
            this.state.timers[key].timeSpent += 1;
            const target = this.state.timers[key].targetSec;
            
            const displayEl = document.getElementById(`timerDisplay_${key}`);
            if (displayEl) {
                displayEl.innerText = this.formatTime(this.state.timers[key].timeSpent);
            }

            if (this.state.timers[key].timeSpent >= target && !this.state.timers[key].done) {
                this.state.timers[key].done = true;
                this.pauseTimer(key);
                window.cuteAudio.playFanfare();
                this.triggerConfetti();
                this.showMascotDialogue(`Hurrah! ${key.toUpperCase()} session full complete hoye geche! Super proud of you! 🎉`);
            }
        }, 1000);
    }

    pauseTimer(key) {
        window.cuteAudio.playPop();
        if (this.activeTimers[key]) {
            clearInterval(this.activeTimers[key]);
            delete this.activeTimers[key];
        }
        this.state.timers[key].running = false;
        this.saveState();
        this.renderTimersWidget();
    }

    toggleTimerDone(key) {
        const isDone = !this.state.timers[key].done;
        this.state.timers[key].done = isDone;
        if (isDone && this.state.timers[key].timeSpent < this.state.timers[key].targetSec) {
            this.state.timers[key].timeSpent = this.state.timers[key].targetSec;
        }
        this.pauseTimer(key);
        if (isDone) {
            window.cuteAudio.playChime();
            this.showMascotDialogue(`Awesome! ${key.toUpperCase()} timer task mark done! ✨`);
        }
        this.renderTimersWidget();
    }

    // Daily Care, Diet & Housekeeping Checklist
    renderChecklistWidget() {
        const container = document.getElementById('checklistContainer');
        if (!container) return;

        const isChulDone = this.state.checklist.chulAchrano;
        const isRoomDone = this.state.checklist.roomGhuchano;
        const isNoTea = this.state.checklist.noTea;
        const isNoChoc = this.state.checklist.noChocolate;
        const isNoOvereat = this.state.checklist.noOvereating;
        const waterL = this.state.checklist.waterLitersLogged || 0;
        const fuskaCount = this.state.checklist.fuskaCountThisWeek || 0;
        const jobsCount = this.state.goals.jobApplicationsCount;

        container.innerHTML = `
            <div class="checklist-item ${isChulDone ? 'done' : ''}" onclick="app.toggleChecklistItem('chulAchrano')">
                <div class="checklist-left">
                    <div class="custom-checkbox">${isChulDone ? '✓' : ''}</div>
                    <span class="checklist-text">💇‍♀️ Chul Achrano & Haircare Routine</span>
                </div>
                <span class="badge-tag" style="background:var(--sky-100); color:var(--sky-700)">Glowy Skin</span>
            </div>

            <div class="checklist-item ${isRoomDone ? 'done' : ''}" onclick="app.toggleChecklistItem('roomGhuchano')">
                <div class="checklist-left">
                    <div class="custom-checkbox">${isRoomDone ? '✓' : ''}</div>
                    <span class="checklist-text">🧹 Room Ghuchano & Clean Sanctuary</span>
                </div>
                <span class="badge-tag" style="background:var(--sky-100); color:var(--sky-700)">Clean Space</span>
            </div>

            <div class="checklist-item ${isNoTea ? 'done' : ''}" onclick="app.toggleChecklistItem('noTea')">
                <div class="checklist-left">
                    <div class="custom-checkbox">${isNoTea ? '✓' : ''}</div>
                    <span class="checklist-text">☕ Avoided Tea Today ("Cha khbona")</span>
                </div>
                <span class="badge-tag" style="background:#ffedd5; color:#c2410c">Skin Diet</span>
            </div>

            <div class="checklist-item ${isNoChoc ? 'done' : ''}" onclick="app.toggleChecklistItem('noChocolate')">
                <div class="checklist-left">
                    <div class="custom-checkbox">${isNoChoc ? '✓' : ''}</div>
                    <span class="checklist-text">🍫 Avoided Chocolate Today ("Chocolate khbona")</span>
                </div>
                <span class="badge-tag" style="background:#ffedd5; color:#c2410c">Skin Diet</span>
            </div>

            <div class="checklist-item ${isNoOvereat ? 'done' : ''}" onclick="app.toggleChecklistItem('noOvereating')">
                <div class="checklist-left">
                    <div class="custom-checkbox">${isNoOvereat ? '✓' : ''}</div>
                    <span class="checklist-text">🍽️ Controlled Appetite ("Overeating krbona")</span>
                </div>
                <span class="badge-tag" style="background:#ffedd5; color:#c2410c">Healthy Body</span>
            </div>

            <div class="checklist-item">
                <div class="checklist-left">
                    <span class="checklist-text">💧 Daily Water for Glowy Skin (3 Liters Goal):</span>
                </div>
                <div class="counter-input-group">
                    <button class="counter-btn" onclick="event.stopPropagation(); app.updateWaterLiters(-0.5)">-</button>
                    <span class="counter-value">${waterL}L</span>
                    <button class="counter-btn" onclick="event.stopPropagation(); app.updateWaterLiters(0.5)">+</button>
                </div>
            </div>

            <div class="checklist-item" style="border-color:${fuskaCount > 1 ? '#f43f5e' : 'var(--sky-100)'}">
                <div class="checklist-left">
                    <span class="checklist-text">🍢 Fuska Eaten This Week (Max 1 time/week):</span>
                </div>
                <div class="counter-input-group">
                    <button class="counter-btn" onclick="event.stopPropagation(); app.updateFuskaCount(-1)">-</button>
                    <span class="counter-value" style="color:${fuskaCount > 1 ? '#f43f5e' : 'inherit'}">${fuskaCount}/1</span>
                    <button class="counter-btn" onclick="event.stopPropagation(); app.updateFuskaCount(1)">+</button>
                </div>
            </div>

            <div class="checklist-item">
                <div class="checklist-left">
                    <span class="checklist-text">📄 Job Applications Applied Today:</span>
                </div>
                <div class="counter-input-group">
                    <button class="counter-btn" onclick="event.stopPropagation(); app.updateJobApps(-1)">-</button>
                    <span class="counter-value">${jobsCount}</span>
                    <button class="counter-btn" onclick="event.stopPropagation(); app.updateJobApps(1)">+</button>
                </div>
            </div>
        `;
    }

    updateWaterLiters(delta) {
        this.state.checklist.waterLitersLogged = Math.max(0, Math.min(5, (this.state.checklist.waterLitersLogged || 0) + delta));
        this.saveState();
        this.renderChecklistWidget();
        this.renderDonutChart();
        window.cuteAudio.playPop();

        if (this.state.checklist.waterLitersLogged >= 3) {
            window.cuteAudio.playFanfare();
            this.showMascotDialogue("Yay! 3 Liters water complete today! Your skin will look super crystal clear & glowy! ✨💧");
        }
    }

    updateFuskaCount(delta) {
        const current = this.state.checklist.fuskaCountThisWeek || 0;
        this.state.checklist.fuskaCountThisWeek = Math.max(0, current + delta);
        this.saveState();
        this.renderChecklistWidget();
        window.cuteAudio.playPop();

        if (this.state.checklist.fuskaCountThisWeek > 1) {
            window.cuteAudio.playCatMeow();
            this.scoldUserForMissingTasks();
            this.showMascotDialogue("😾 Hey! Weekly 1-er beshi fuska khawa jabe na! Glowy skin & 50kg weight target fail hoye jabe! Control koro! 🍡");
        } else if (this.state.checklist.fuskaCountThisWeek === 1) {
            this.showMascotDialogue("Weekly 1-bar fuska quota done! Aro khabe na kintu this week! 🌸");
        }
    }


    toggleChecklistItem(key) {
        this.state.checklist[key] = !this.state.checklist[key];
        this.saveState();
        this.renderChecklistWidget();

        if (this.state.checklist[key]) {
            window.cuteAudio.playChime();
            const msg = key === 'chulAchrano' ? "Ajk sundor kore chul achrano & self care done! Looking radiant! ✨" : "Room ekdom ghuchano r porishkar! Mind ekhon fresh thakbe! 🧹✨";
            this.showMascotDialogue(msg);
        } else {
            window.cuteAudio.playPop();
        }
    }

    updateJobApps(delta) {
        this.state.goals.jobApplicationsCount = Math.max(0, this.state.goals.jobApplicationsCount + delta);
        this.saveState();
        this.renderChecklistWidget();
        window.cuteAudio.playPop();

        if (delta > 0) {
            this.showMascotDialogue(`Great job! Today total ${this.state.goals.jobApplicationsCount} job application complete! Dream job is coming soon! 💼🚀`);
        }
    }

    // Tech Learning Roadmap Cards
    renderTechWidget() {
        const grid = document.getElementById('techGrid');
        if (!grid) return;

        const techs = [
            { key: 'html', name: 'HTML5', icon: '🌐', tag: 'Structure' },
            { key: 'css', name: 'CSS3', icon: '🎨', tag: 'Styling' },
            { key: 'tailwind', name: 'Tailwind CSS', icon: '🌊', tag: 'Utility CSS' },
            { key: 'laravel', name: 'Laravel PHP', icon: '🔴', tag: 'Backend Framework' },
            { key: 'react', name: 'React.js', icon: '⚛️', tag: 'Frontend Library' },
            { key: 'nextjs', name: 'Next.js', icon: '▲', tag: 'Fullstack React' }
        ];

        let html = '';
        techs.forEach(t => {
            const isDone = this.state.techLearning[t.key];
            html += `
                <div class="tech-card ${isDone ? 'completed' : ''}" onclick="app.toggleTech('${t.key}')">
                    <span class="tech-icon">${t.icon}</span>
                    <div class="tech-name">${t.name}</div>
                    <div class="tech-tag">${t.tag}</div>
                    <div style="margin-top:8px; font-size:0.8rem; font-weight:700; color:var(--sky-600)">
                        ${isDone ? '✓ Practiced Today' : '+ Click to Practice'}
                    </div>
                </div>
            `;
        });

        grid.innerHTML = html;
    }

    toggleTech(key) {
        this.state.techLearning[key] = !this.state.techLearning[key];
        this.saveState();
        this.renderTechWidget();

        if (this.state.techLearning[key]) {
            window.cuteAudio.playChime();
            this.showMascotDialogue(`Awesome! Today ${key.toUpperCase()} coding practice completed! Daily coding mastery loading... 💻🔥`);
        } else {
            window.cuteAudio.playPop();
        }
    }

    // Personal Target Goals Widget
    renderGoalsWidget() {
        const container = document.getElementById('goalsContainer');
        if (!container) return;

        const targetW = this.state.goals.targetWeightKg;
        const currentW = this.state.goals.currentWeightKg;
        const ideas = this.state.goals.contentIdeasCount;
        const conf = this.state.goals.confidenceScore;

        container.innerHTML = `
            <div class="goal-item">
                <div class="goal-header">
                    <div class="goal-title">⚖️ Target Weight Target (50 kg)</div>
                    <div class="goal-val">${currentW} kg / ${targetW} kg</div>
                </div>
                <div style="font-size:0.84rem; color:var(--text-muted); margin-bottom:8px;">
                    Progressing towards healthy 50kg body goal with balanced diet & care!
                </div>
                <div style="display:flex; gap:10px;">
                    <input type="number" step="0.5" id="weightInput" value="${currentW}" style="width:100px; padding:6px 10px; border-radius:8px; border:1px solid var(--sky-300);" />
                    <button class="btn-icon-pill" onclick="app.saveWeight()">Update Weight</button>
                </div>
            </div>

            <div class="goal-item">
                <div class="goal-header">
                    <div class="goal-title">🎥 Content Creator Roadmap</div>
                    <div class="goal-val">${ideas} Ideas Logged</div>
                </div>
                <div class="counter-input-group" style="justify-content:flex-start; margin-top:6px;">
                    <button class="counter-btn" onclick="app.updateContentIdeas(-1)">-</button>
                    <span class="counter-value">${ideas}</span>
                    <button class="counter-btn" onclick="app.updateContentIdeas(1)">+</button>
                    <span style="font-size:0.85rem; color:var(--text-muted); margin-left:10px;">Daily content & video ideas</span>
                </div>
            </div>

            <div class="goal-item">
                <div class="goal-header">
                    <div class="goal-title">🧠 Self-Confidence & Financial Independence</div>
                    <div class="goal-val">${conf}% Peak Confidence</div>
                </div>
                <div class="progress-track" style="margin-top:6px; height:10px; background:var(--sky-100)">
                    <div class="progress-fill" style="width: ${conf}%; background: linear-gradient(90deg, #38bdf8, #0ea5e9);"></div>
                </div>
            </div>
        `;
    }

    saveWeight() {
        const val = parseFloat(document.getElementById('weightInput').value);
        if (!isNaN(val) && val > 0) {
            this.state.goals.currentWeightKg = val;
            this.saveState();
            this.renderGoalsWidget();
            window.cuteAudio.playChime();
            this.showMascotDialogue(`Weight updated to ${val} kg! Health goal 50kg focus ongoing! 🌸`);
        }
    }

    updateContentIdeas(delta) {
        this.state.goals.contentIdeasCount = Math.max(0, this.state.goals.contentIdeasCount + delta);
        this.saveState();
        this.renderGoalsWidget();
        window.cuteAudio.playPop();
        if (delta > 0) {
            this.showMascotDialogue("Nodun content idea add hoyeche! Content creator path-e tumi fire! 🎥✨");
        }
    }

    // Mochi Mascot Speech Dialogue
    showMascotDialogue(text) {
        const el = document.getElementById('mascotSpeechBubble');
        if (el) {
            el.innerText = text;
            el.style.animation = 'none';
            el.offsetHeight; // trigger reflow
            el.style.animation = 'popBubble 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
    }

    triggerMascotRandomTalk() {
        window.cuteAudio.playCatMeow();
        const randIndex = Math.floor(Math.random() * this.mascotQuotes.length);
        this.showMascotDialogue(this.mascotQuotes[randIndex]);
    }

    // 🌙 Night Reflection Modal System
    openNightReflectionModal() {
        window.cuteAudio.playPop();
        document.getElementById('nightReflectionModal').classList.add('active');
    }

    closeNightReflectionModal() {
        window.cuteAudio.playPop();
        document.getElementById('nightReflectionModal').classList.remove('active');
    }

    saveNightReflection() {
        const behaviorVal = document.querySelector('input[name="behaviorRadio"]:checked')?.value === 'yes';
        const dinnerVal = document.querySelector('input[name="dinnerRadio"]:checked')?.value === 'yes';

        this.state.reflections.badBehaviorAvoided = behaviorVal;
        this.state.reflections.dinnerSkipped = dinnerVal;
        this.state.reflections.lastSubmittedDate = new Date().toISOString().split('T')[0];

        this.saveState();
        this.closeNightReflectionModal();

        window.cuteAudio.playFanfare();
        this.triggerConfetti();

        let msg = "Ajk rater reflection complete! ";
        if (behaviorVal) msg += "Tumi ajk ragi ba baje behaviour koro ni, super gentle chile! ❤️ ";
        if (dinnerVal) msg += "Dinner skipped / light eating recorded! ";
        msg += "Ekhon khub shundor ghum dibe! Good night & Sweet dreams! 🌙✨";

        this.showMascotDialogue(msg);
    }

    checkNightReflectionTrigger() {
        const now = new Date();
        const hour = now.getHours();
        const todayStr = now.toISOString().split('T')[0];

        // If it's night (after 9 PM / 21:00) and hasn't been submitted today
        if (hour >= 21 && this.state.reflections.lastSubmittedDate !== todayStr) {
            setTimeout(() => {
                this.openNightReflectionModal();
            }, 1500);
        }
    }

    // Wallpaper Mode
    toggleWallpaperMode() {
        const isWall = document.body.classList.toggle('wallpaper-mode');
        this.state.settings.wallpaperMode = isWall;
        this.saveState();
        window.cuteAudio.playPop();
    }

    renderWallpaperState() {
        if (this.state.settings.wallpaperMode) {
            document.body.classList.add('wallpaper-mode');
        } else {
            document.body.classList.remove('wallpaper-mode');
        }
    }

    // Day counter manual advance
    advanceDay() {
        if (this.state.challenge.currentDay < 100) {
            this.state.challenge.currentDay += 1;
            this.saveState();
            this.renderChallengeBanner();
            window.cuteAudio.playFanfare();
            this.triggerConfetti();
            this.showMascotDialogue(`Congratulations! Day ${this.state.challenge.currentDay} started! Keep shining! 🚀✨`);
        }
    }

    // Confetti Effect
    triggerConfetti() {
        if (window.confetti) {
            window.confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#38bdf8', '#0ea5e9', '#ffedd5', '#f472b6']
            });
        }
    }

    bindEvents() {
        // Event listeners can be attached here if needed
    }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SkyRoutineApp();
});
