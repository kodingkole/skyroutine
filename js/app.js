/**
 * SkyRoutine 🐾 - Kiwi Edition App Engine v4
 */

class SkyRoutineApp {
    constructor() {
        this.STORAGE_KEY = 'sky_routine_app_data_v4';
        this.SYNC_CODE_KEY = 'sky_routine_sync_code_v1';
        this.SYNC_UPDATED_KEY = 'sky_routine_sync_updated_v1';
        
        // Initial default state
        this.defaultState = {
            challenge: {
                totalDays: 100,
                currentDay: 1,
                startDate: '2026-08-09'
            },

            goals: {
                startWeightKg: 66.0,
                targetWeightKg: 50.0,
                currentWeightKg: 66.0,
                weightHistory: [
                    { date: 'Start', weight: 66.0 }
                ],
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
            fasting: {
                targetHours: 16, // 16:8 or 12:12
                startTime: null,
                elapsedSec: 0,
                running: false,
                done: false,
                fastsCountThisWeek: 0,
                sessions: []
            },
            periodTracker: {
                lastPeriodStart: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0], // 7 days ago
                cycleLengthDays: 28
            },
            behaviourReset: {
                currentDay: 1,
                lastDate: this.getLocalDateStr(),
                history: [],
                tasks: {
                    outOfBed: false,
                    grooming: false,
                    focusTen: false,
                    helpfulWork: false,
                    respectfulWords: false,
                    pauseAndOwn: false,
                    boundaryWithoutFight: false,
                    repairAfterRude: false,
                    noComparison: false,
                    kindSelfTalk: false
                }
            },
            lifeRecovery: {
                startDate: this.getLocalDateStr(),
                lastDate: this.getLocalDateStr(),
                daysActive: 1,
                history: [],
                tasks: {
                    thesisBlock: false,
                    jobBlock: false,
                    contentBlock: false,
                    phoneBoundary: false
                }
            },
            autopilot: {
                lastDate: this.getLocalDateStr(),
                tasks: {
                    morningReset: false,
                    mindReset: false,
                    learnBlock: false,
                    buildBlock: false,
                    testBlock: false,
                    careerBlock: false,
                    bodyReset: false
                },
                weeklyAssessments: []
            },
            mindCare: {
                smallWins: 0,
                lastWinDate: null
            },
            classyReset: {
                currentDay: 1,
                lastDate: this.getLocalDateStr(),
                history: [],
                tasks: {
                    grooming: false,
                    polishedOutfit: false,
                    calmSpeech: false,
                    angerPause: false,
                    twoApplications: false,
                    skillPractice: false,
                    movement: false,
                    nightWins: false
                }
            },
            checklist: {
                chulAchrano: false,
                brushTeeth: false,
                faceWash: false,
                morningSkinCare: false,
                sunscreen: false,
                cleanOutfit: false,
                deodorant: false,
                lipCare: false,
                nightSkinCare: false,
                properShower: false,
                hairOil: false,
                shampooConditioner: false,
                roomGhuchano: false,
                noTea: true,
                noChocolate: true,
                noOvereating: true,
                noFastFood: true,
                noSoftDrink: true,
                noMilk: true,
                skipDinner: true,
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
            birthdays: [
                { id: '1', name: 'My Birthday 🎉', date: '09-12', type: 'Birthday', avatar: '👑', phone: '' },
                { id: '2', name: 'Sumi', date: '05-08', type: 'Birthday', avatar: '🌷', phone: '' },
                { id: '3', name: 'Khadija Apu', date: '07-23', type: 'Birthday', avatar: '🌸', phone: '' },
                { id: '4', name: 'Zayed Vai', date: '05-21', type: 'Birthday', avatar: '⭐', phone: '' },
                { id: '5', name: 'Shah (Soulmate)', date: '10-10', type: 'Birthday', avatar: '💍', phone: '' },
                { id: '6', name: 'Arafat', date: '09-25', type: 'Birthday', avatar: '✨', phone: '' },
                { id: '7', name: 'Arifa', date: '06-28', type: 'Birthday', avatar: '💖', phone: '' },
                { id: '8', name: 'Mohammad', date: '09-14', type: 'Birthday', avatar: '🎈', phone: '' },
                { id: '9', name: 'Safwan', date: '09-29', type: 'Birthday', avatar: '🎂', phone: '' },
                { id: '10', name: 'Shah & My Anniversary', date: '01-30', type: 'Anniversary', avatar: '❤️', phone: '' }
            ],

            quickNotes: [], // Array of one-day notes: { id, text, createdAt }
            contentScripts: [], // Array of content ideas/scripts: { id, text, isCompleted, createdAt }
            weather: {
                temp: '--',
                condition: 'Fetching weather...',
                icon: '🌤️',
                city: 'Dhaka'
            },
            reflections: {
                badBehaviorAvoided: true,
                dinnerSkipped: true,
                earlySleepPlan: true,
                glowySkinCareDone: true,
                lastSubmittedDate: null
            },

            historyLogs: [],
            activityLog: [],
            activeQuest: null,
            completedQuestsCount: 0,
            rewardsUnlocked: 0,
            settings: {
                showCompletedItems: false,
                wallpaperMode: false,
                hologramMode: false,
                voiceEnabled: true,
                selfWorthReminderIndex: 0,
                activeDashboardPage: 'today'
            }
        };

        this.state = this.loadState();
        this.activeTimers = {};


        this.fastingInterval = null;
        
        this.mascotQuotes = [
            "Shuvo Shokal! Kiwi fresh environment-e ajker 100-day challenge start! 🥝✨",
            "5 Waqt Namaj porle mon ekdom peaceful & serene thake. Shobgulo finished koro! 🕌",
            "1hr Intern kaj + 2hr Coding practice! HTML, CSS, Tailwind, Laravel, React, Next.js mastery loading! 💻🔥",
            "Ada gonta hatcho to? 3L Water complete koro jeno skin crystal glowy thake! 💧✨",
            "Target Weight 50kg + No Tea + No Chocolate = Radiant Skin & Super Confidence! 🌸",
            "Ajk kothao ragi ba baje behaviour korbo na, rate light dinner & early sleep! 🌙",
            "Friend-er Birthday / Anniversary thakle direct WhatsApp-e wish pathiye dao! 🎂🥳",
            "Intermittent Fasting & Period Self-Care track koro jeno body & mind 100% active thake! 💕",
            "Kiki the Kiwi Cat tomak shob shomoy cheer korbe! Tumi sotti unique & strong! 🐾❤️"
        ];

        this.initPWAInstallPrompt();
        this.init();
    }

    // 📲 PWA App Installation Handler
    initPWAInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredInstallPrompt = e;
        });
    }

    promptInstallApp() {
        if (this.deferredInstallPrompt) {
            this.deferredInstallPrompt.prompt();
            this.deferredInstallPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    this.showMascotDialogue("Yay! SkyRoutine App installed to your PC/Phone home screen with cute Kiwi Icon! 📲🥝✨");
                }
                this.deferredInstallPrompt = null;
            });
        } else {
            this.showMascotDialogue("To install on Chrome/Edge or Mobile: Click '⋮' or Share button in your browser & select 'Install App' or 'Add to Home Screen'! 📲🥝✨");
        }
    }


    getLocalDateStr(dateObj = new Date()) {
        const d = (dateObj instanceof Date && !isNaN(dateObj.getTime())) ? dateObj : new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    deepMerge(target, source) {
        if (!source || typeof source !== 'object') return JSON.parse(JSON.stringify(target));
        const result = Array.isArray(target) ? [...target] : { ...target };
        
        for (const key of Object.keys(target)) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                const targetVal = target[key];
                const sourceVal = source[key];

                if (Array.isArray(targetVal)) {
                    result[key] = Array.isArray(sourceVal) ? sourceVal : [...targetVal];
                } else if (targetVal !== null && typeof targetVal === 'object') {
                    result[key] = this.deepMerge(targetVal, sourceVal);
                } else {
                    result[key] = (sourceVal !== undefined && sourceVal !== null) ? sourceVal : targetVal;
                }
            }
        }
        for (const key of Object.keys(source)) {
            if (!Object.prototype.hasOwnProperty.call(target, key)) {
                result[key] = source[key];
            }
        }
        return result;
    }

    loadState() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                const todayStr = this.getLocalDateStr();
                const merged = this.deepMerge(this.defaultState, parsed);

                if (merged.lastActiveDate !== todayStr) {
                    if (merged.challenge && merged.challenge.currentDay < 100) {
                        merged.challenge.currentDay += 1;
                    }
                    merged.namaj = { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false };
                    if (merged.checklist) {
                        ['chulAchrano', 'brushTeeth', 'faceWash', 'morningSkinCare', 'sunscreen', 'cleanOutfit', 'deodorant', 'lipCare', 'nightSkinCare', 'properShower', 'roomGhuchano', 'skipDinner', 'noMilk', 'noFastfood', 'noSoftDrink'].forEach(key => { merged.checklist[key] = false; });
                        merged.checklist.waterLitersLogged = 0;
                    }
                    merged.techLearning = { html: false, css: false, tailwind: false, laravel: false, react: false, nextjs: false };
                    if (merged.timers) {
                        if (merged.timers.intern) { merged.timers.intern.timeSpent = 0; merged.timers.intern.done = false; merged.timers.intern.running = false; merged.timers.intern.missed = false; }
                        if (merged.timers.report) { merged.timers.report.timeSpent = 0; merged.timers.report.done = false; merged.timers.report.running = false; merged.timers.report.missed = false; }
                        if (merged.timers.practice) { merged.timers.practice.timeSpent = 0; merged.timers.practice.done = false; merged.timers.practice.running = false; merged.timers.practice.missed = false; }
                        if (merged.timers.walk) { merged.timers.walk.timeSpent = 0; merged.timers.walk.done = false; merged.timers.walk.running = false; merged.timers.walk.missed = false; }
                    }
                    merged.lastActiveDate = todayStr;
                }

                const reset = merged.behaviourReset;
                if (reset.lastDate !== todayStr) {
                    const doneCount = Object.values(reset.tasks || {}).filter(v => v === true).length;
                    reset.history.push({ date: reset.lastDate, done: doneCount, total: 6 });
                    reset.history = reset.history.slice(-30);
                    reset.currentDay = Math.min(30, (reset.currentDay || 1) + 1);
                    reset.lastDate = todayStr;
                    reset.tasks = {
                        outOfBed: false,
                        grooming: false,
                        focusTen: false,
                        helpfulWork: false,
                        respectfulWords: false,
                        pauseAndOwn: false,
                        boundaryWithoutFight: false,
                        repairAfterRude: false,
                        noComparison: false,
                        kindSelfTalk: false
                    };
                }

                const recovery = merged.lifeRecovery;
                if (recovery.lastDate !== todayStr) {
                    const recoveryDone = Object.values(recovery.tasks || {}).filter(v => v === true).length;
                    recovery.history.push({ date: recovery.lastDate, done: recoveryDone, total: 4 });
                    recovery.history = recovery.history.slice(-90);
                    recovery.daysActive = Math.min(90, (recovery.daysActive || 1) + 1);
                    recovery.lastDate = todayStr;
                    recovery.tasks = { thesisBlock: false, jobBlock: false, contentBlock: false, phoneBoundary: false };
                }

                const autopilot = merged.autopilot;
                if (autopilot.lastDate !== todayStr) {
                    autopilot.lastDate = todayStr;
                    autopilot.tasks = {
                        morningReset: false,
                        mindReset: false,
                        learnBlock: false,
                        buildBlock: false,
                        testBlock: false,
                        careerBlock: false,
                        bodyReset: false
                    };
                }

                const classy = merged.classyReset;
                if (classy.lastDate !== todayStr) {
                    const classyDone = Object.values(classy.tasks || {}).filter(v => v === true).length;
                    classy.history.push({ date: classy.lastDate, done: classyDone, total: 8 });
                    classy.history = classy.history.slice(-30);
                    classy.currentDay = Math.min(30, (classy.currentDay || 1) + 1);
                    classy.lastDate = todayStr;
                    classy.tasks = {
                        grooming: false,
                        polishedOutfit: false,
                        calmSpeech: false,
                        angerPause: false,
                        twoApplications: false,
                        skillPractice: false,
                        movement: false,
                        nightWins: false
                    };
                }
                
                // Force sync birthdays with default state to apply new updates
                merged.birthdays = this.defaultState.birthdays;

                // Fix for namaj being true from old storage
                if (!merged.namajFixApplied) {
                    merged.namaj = { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false };
                    merged.namajFixApplied = true;
                }

                // Initialize Secret Diary state
                if (!merged.secretDiary) {
                    merged.secretDiary = { unlocked: false, notes: [] };
                } else {
                    merged.secretDiary.unlocked = false; // Always lock on load
                }

                // Initialize Period state
                if (merged.periodTracker.isOnPeriod === undefined) {
                    const lastStart = new Date(merged.periodTracker.lastPeriodStart);
                    const diffDays = Math.floor((new Date() - lastStart) / 86400000);
                    merged.periodTracker.isOnPeriod = (diffDays >= 0 && diffDays <= 7);
                }
                
                // Force update weight state to 66kg start & clear legacy dummy points
                if (!merged.goals || !merged.goals.startWeightKg || merged.goals.startWeightKg !== 66.0) {
                    merged.goals = {
                        startWeightKg: 66.0,
                        targetWeightKg: 50.0,
                        currentWeightKg: 66.0,
                        weightHistory: [
                            { date: 'Start', weight: 66.0 }
                        ],
                        jobApplicationsCount: (merged.goals && merged.goals.jobApplicationsCount) || 0,
                        contentIdeasCount: (merged.goals && merged.goals.contentIdeasCount) || 0,
                        confidenceScore: (merged.goals && merged.goals.confidenceScore) || 85
                    };
                }

                return merged;
            }
        } catch (e) {
            console.error("Error loading state", e);
        }
        const state = this.deepMerge(this.defaultState, {});
        state.lastActiveDate = this.getLocalDateStr();
        return state;
    }


    saveState() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
            if (!this.applyingCloudState) {
                localStorage.setItem(this.SYNC_UPDATED_KEY, String(Date.now()));
                this.queueCloudSync();
            }
        } catch (e) {
            console.error("Error saving state", e);
        }
    }

    getSyncCode() {
        return localStorage.getItem(this.SYNC_CODE_KEY) || '';
    }

    updateSyncButton(status = '') {
        const button = document.getElementById('deviceSyncBtn');
        if (!button) return;
        const connected = Boolean(this.getSyncCode());
        button.innerHTML = `<span>${connected ? '☁️' : '☁️'}</span> ${status || (connected ? 'Sync Connected' : 'Device Sync')}`;
        button.classList.toggle('connected', connected);
    }

    async setupDeviceSync() {
        const current = this.getSyncCode();
        const entered = window.prompt('Laptop ও phone—দুই জায়গায় একই private sync code লিখুন (কমপক্ষে 8 letters/numbers):', current);
        if (entered === null) return;
        const code = entered.trim();
        if (!/^[A-Za-z0-9_-]{8,64}$/.test(code)) {
            window.alert('Sync code 8–64 characters হতে হবে; শুধু letters, numbers, _ অথবা - ব্যবহার করুন।');
            return;
        }
        localStorage.setItem(`${this.STORAGE_KEY}_before_sync_${Date.now()}`, JSON.stringify(this.state));
        localStorage.setItem(this.SYNC_CODE_KEY, code);
        this.updateSyncButton('Connecting…');
        await this.syncWithCloud(true);
    }

    queueCloudSync() {
        if (!this.getSyncCode() || this.applyingCloudState) return;
        clearTimeout(this.cloudSyncTimer);
        this.cloudSyncTimer = setTimeout(() => this.uploadCloudState(), 2500);
    }

    async uploadCloudState() {
        const code = this.getSyncCode();
        if (!code) return;
        const updatedAt = Number(localStorage.getItem(this.SYNC_UPDATED_KEY)) || Date.now();
        try {
            this.updateSyncButton('Syncing…');
            const response = await fetch(`/api/sync/${encodeURIComponent(code)}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ state: this.state, updatedAt })
            });
            if (!response.ok) throw new Error(`Sync upload failed (${response.status})`);
            this.updateSyncButton('Synced ✓');
        } catch (error) {
            console.error(error);
            this.updateSyncButton('Sync Offline');
        }
    }

    async syncWithCloud(firstConnect = false) {
        const code = this.getSyncCode();
        if (!code) { this.updateSyncButton(); return; }
        try {
            this.updateSyncButton('Checking…');
            const response = await fetch(`/api/sync/${encodeURIComponent(code)}`, { cache: 'no-store' });
            if (response.status === 404) {
                localStorage.setItem(this.SYNC_UPDATED_KEY, String(Date.now()));
                await this.uploadCloudState();
                return;
            }
            if (!response.ok) throw new Error(`Sync download failed (${response.status})`);
            const remote = await response.json();
            const localUpdatedAt = Number(localStorage.getItem(this.SYNC_UPDATED_KEY)) || 0;
            if (remote.state && (firstConnect || Number(remote.updatedAt) > localUpdatedAt)) {
                this.applyingCloudState = true;
                this.state = this.deepMerge(this.defaultState, remote.state);
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
                localStorage.setItem(this.SYNC_UPDATED_KEY, String(remote.updatedAt || Date.now()));
                this.renderAll();
                this.resumeFastingTimerIfNeeded();
                this.applyingCloudState = false;
            } else if (localUpdatedAt > Number(remote.updatedAt || 0)) {
                await this.uploadCloudState();
                return;
            }
            this.updateSyncButton('Synced ✓');
        } catch (error) {
            console.error(error);
            this.updateSyncButton('Sync Offline');
            if (firstConnect) window.alert('Sync server পাওয়া যায়নি। Appটি server/hosted URL দিয়ে খুলে আবার চেষ্টা করুন। আপনার local data নিরাপদ আছে।');
        }
    }

    initCloudSync() {
        this.updateSyncButton();
        if (this.getSyncCode()) this.syncWithCloud(false);
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.getSyncCode()) this.syncWithCloud(false);
        });
        window.addEventListener('online', () => this.syncWithCloud(false));
    }

    init() {
        try {
            this.renderAll();
            this.bindEvents();
            this.startLiveClock();
            this.fetchLiveWeather();
            this.cleanupExpiredNotes();
            this.checkNightReflectionTrigger();
            this.checkTodayBirthdays();
            this.resumeFastingTimerIfNeeded();
            this.initCloudSync();
            this.showMascotDialogue("Assalamu Alaikum! Fresh Kiwi environment-e ajker routine start koro! 🥝🐾");
        } catch (err) {
            console.error("Error during app initialization:", err);
        }
    }

    openSecretDiaryModal() {
        this.state.secretDiary.unlocked = false; // Auto lock when opening
        this.renderSecretDiaryModal();
        document.getElementById('secretDiaryModalOverlay').style.display = 'flex';
        window.cuteAudio.playPop();
    }

    closeSecretDiaryModal() {
        document.getElementById('secretDiaryModalOverlay').style.display = 'none';
        this.state.secretDiary.unlocked = false; // Auto lock when closing
        this.saveState();
        window.cuteAudio.playPop();
    }

    renderSecretDiaryModal() {
        const box = document.getElementById('secretDiaryModalBox');
        if (!box) return;

        if (!this.state.secretDiary.unlocked) {
            box.innerHTML = `
                <div class="modal-header" style="justify-content:center;">
                    <h2 class="modal-title" style="color:#831843;">🔒 Secret Diary Locked</h2>
                </div>
                <div class="modal-body" style="padding:20px;">
                    <p style="color:#be185d; font-weight:700; margin-bottom:16px;">Enter your 4-digit PIN to unlock.</p>
                    <input type="password" id="secretDiaryPin" placeholder="PIN" style="padding:12px; border:2px solid #fbcfe8; border-radius:8px; font-weight:800; text-align:center; letter-spacing:8px; width:140px; font-size:1.5rem;" maxlength="4" />
                    <button class="btn-primary-block" style="background:#be185d; margin-top:20px;" onclick="app.unlockSecretDiary()">Unlock 🔓</button>
                    <button class="btn-primary-block" style="background:#94a3b8; margin-top:10px;" onclick="app.closeSecretDiaryModal()">Close</button>
                </div>
            `;
        } else {
            const notes = this.state.secretDiary.notes || [];
            let notesHtml = '';
            notes.slice().reverse().forEach(note => {
                notesHtml += `
                    <div style="background:#fdf2f8; border:1px solid #fce7f3; border-radius:10px; padding:12px; margin-bottom:10px; text-align:left;">
                        <div style="font-size:0.75rem; color:#be185d; font-weight:800; margin-bottom:4px;">${note.date}</div>
                        <div style="font-size:0.9rem; color:#831843; font-weight:600; white-space:pre-wrap; line-height:1.4;">${note.text}</div>
                    </div>
                `;
            });
            box.innerHTML = `
                <div class="modal-header" style="justify-content:center; position:relative;">
                    <h2 class="modal-title" style="color:#831843;">💌 My Secret Love Diary</h2>
                    <button style="position:absolute; right:10px; top:10px; background:none; border:none; font-size:1.5rem; color:#831843; cursor:pointer;" onclick="app.closeSecretDiaryModal()">✖</button>
                </div>
                <div class="modal-body" style="padding:10px; text-align:left; max-height:300px; overflow-y:auto; margin-bottom:16px;">
                    ${notesHtml || '<p style="text-align:center; color:#94a3b8;">No notes yet. Write your first secret! 💕</p>'}
                </div>
                <div style="border-top:2px dashed #fce7f3; padding-top:16px;">
                    <textarea id="newSecretNote" placeholder="Write your secret thoughts here..." style="width:100%; height:100px; padding:12px; border-radius:10px; border:1.5px solid #fbcfe8; font-family:'Outfit'; font-weight:600; font-size:0.9rem; resize:none; margin-bottom:10px;"></textarea>
                    <button class="btn-primary-block" style="background:#be185d;" onclick="app.saveSecretNote()">Save Note 💌</button>
                </div>
            `;
        }
    }

    unlockSecretDiary() {
        const pin = document.getElementById('secretDiaryPin')?.value;
        if (pin === '1111') {
            this.state.secretDiary.unlocked = true;
            this.saveState();
            this.renderSecretDiaryModal();
            window.cuteAudio.playFanfare();
        } else {
            window.cuteAudio.playPop();
            this.showMascotDialogue("Incorrect PIN! This diary is super secret! 😾🔒");
        }
    }

    saveSecretNote() {
        const text = document.getElementById('newSecretNote')?.value.trim();
        if (text) {
            this.state.secretDiary.notes.push({
                text: text,
                date: new Date().toLocaleString()
            });
            this.saveState();
            this.renderSecretDiaryModal();
            window.cuteAudio.playChime();
            this.showMascotDialogue("Your secret thought has been safely locked in the Love Diary! 💌✨");
        }
    }

    renderAll() {
        this.renderChallengeBanner();
        this.renderSelfWorthReminder();
        this.renderTodayDashboard();
        this.renderActivityLogPage();
        this.renderOverallTransformationWidget();
        this.renderNamajWidget();
        this.renderTimersWidget();
        this.renderChecklistWidget();
        this.renderFastingWidget();
        this.renderPeriodWidget();
        this.renderLifeRecoveryWidget();
        this.renderContentIdeaWidget();
        this.renderTechWidget();
        this.renderSurpriseQuestWidget();
        this.renderQuickNotesWidget();
        this.renderGoalsWidget();
        this.renderBirthdaysWidget();
        this.renderDonutChart();
        this.renderWallpaperState();
        this.checkMyBirthday();
        this.startKikiFreeWalk();
        this.updateKikiOutfit();
        this.autoUpdateMascotMood();
        this.organizeTrackerCategories();
        this.applyDashboardPage();
    }

    organizeTrackerCategories() {
        const column = document.querySelector('.dashboard-grid .widget-column');
        if (!column) return;
        const cards = Array.from(column.querySelectorAll('.card-widget'));
        column.querySelectorAll('.generated-category-card').forEach(card => card.remove());
        const hiddenIds = ['classyResetContainer'];
        const visibleCards = cards.filter(card => {
            const hidden = hiddenIds.some(id => card.querySelector(`#${id}`));
            if (hidden) card.style.display = 'none';
            return !hidden;
        });
        const definitions = [
            { key: 'progress', icon: '💎', title: '1. I Am Important & My Goals', ids: ['progressChartCanvas'] },
            { key: 'care', icon: '🌿', title: '2. Self-care, Skin & Health', ids: ['fastingContainer', 'periodContainer', 'checklistContainer'] },
            { key: 'faith', icon: '🕌', title: '3. Namaj & Faith', ids: ['namajGrid'] },
            { key: 'academic', icon: '🎓', title: '4. Academic & Focus Time', ids: ['timersGrid'] },
            { key: 'coding', icon: '💻', title: '5. Study, Coding & Interview', ids: ['techGrid', 'lifeRecoveryContainer'] },
            { key: 'career', icon: '💼', title: '6. Job, Money & Goals', ids: ['goalsContainer'] },
            { key: 'mind', icon: '🧠', title: '7. Behaviour, Mind & Self-worth', ids: ['behaviourResetContainer', 'surpriseQuestContainer'] },
            { key: 'content', icon: '🎬', title: '8. Content & Notes', ids: ['quickNotesContainer', 'contentIdeaContainer'] },
            { key: 'personal', icon: '🎂', title: '9. Personal Events', ids: ['birthdaysContainer'] }
        ];
        const matched = new Set();
        const oldSections = Array.from(column.querySelectorAll('.tracker-category-section'));
        const sections = definitions.map(definition => {
            const section = document.createElement('section');
            section.className = `tracker-category-section tracker-category-${definition.key}`;
            section.innerHTML = `<div class="tracker-category-heading"><span>${definition.icon}</span><h2>${definition.title}</h2></div><div class="tracker-category-cards"></div>`;
            const holder = section.querySelector('.tracker-category-cards');
            visibleCards.forEach(card => {
                if (!matched.has(card) && definition.ids.some(id => card.querySelector(`#${id}`))) {
                    holder.appendChild(card);
                    matched.add(card);
                }
            });
            return section;
        });
        const personalHolder = sections[sections.length - 1].querySelector('.tracker-category-cards');
        visibleCards.filter(card => !matched.has(card)).forEach(card => personalHolder.appendChild(card));
        const careerHolder = sections.find(section => section.classList.contains('tracker-category-career'))?.querySelector('.tracker-category-cards');
        if (careerHolder) {
            const careerCard = document.createElement('div');
            careerCard.className = 'card-widget generated-category-card career-money-summary';
            careerCard.innerHTML = `<div class="widget-header"><h2 class="widget-title"><span>💼</span> Job & Financial Ladder</h2><span class="widget-badge">One Master Place</span></div>
                <div class="career-money-grid">
                    <div><b id="careerJobCount">${this.state.goals.jobApplicationsCount || 0}</b><span>Total applications</span><div class="mini-counter"><button onclick="app.updateJobApps(-1)">−</button><button onclick="app.updateJobApps(1)">+</button></div></div>
                    <div><b>৳20k–25k</b><span>General starting expectation</span></div>
                    <div><b>10% / 20%</b><span>Minimum / target saving</span></div>
                    <div><b>৳10,000</b><span>First emergency buffer</span></div>
                </div>
                <p class="category-reference-note">Order: first income → ৳10k buffer → 1 month expense → 3–6 months emergency fund → Dream Home Fund.</p>`;
            careerHolder.prepend(careerCard);
        }
        const progressHolder = sections.find(section => section.classList.contains('tracker-category-progress'))?.querySelector('.tracker-category-cards');
        if (progressHolder) {
            const goalMap = document.createElement('div');
            goalMap.className = 'card-widget generated-category-card master-goal-map';
            goalMap.innerHTML = `<div class="widget-header"><h2 class="widget-title"><span>🎯</span> My Goal Map</h2><span class="widget-badge">Goals—not repeated tasks</span></div>
                <div class="master-goal-grid">
                    <div><b>🎓 Academic</b><span>Correct report, complete graduation and face presentations honestly.</span></div>
                    <div><b>💻 Main Career</b><span>Become job-ready as a full-stack developer and prepare for interviews in 3 months.</span></div>
                    <div><b>💼 Income</b><span>Apply for suitable tech and general jobs; build independent monthly income.</span></div>
                    <div><b>🎬 Backup Income</b><span>Grow social-media pages consistently without making content the first priority.</span></div>
                    <div><b>🏡 Before 30</b><span>Build savings, emergency fund and a realistic 3-year Dream Home plan.</span></div>
                    <div><b>🌿 Health & Self-care</b><span>Reach a healthy sustainable weight, groom consistently and move daily.</span></div>
                    <div><b>🧠 Mind & Behaviour</b><span>Become calmer, confident and respectful; reduce avoidance, reels and overthinking.</span></div>
                    <div><b>🤝 Relationship</b><span>Keep healthy distance and boundaries—no fights, chasing or unrealistic expectations.</span></div>
                </div>`;
            progressHolder.prepend(goalMap);
        }
        const reminder = document.getElementById('selfWorthReminderContainer');
        if (progressHolder && reminder) progressHolder.prepend(reminder);
        oldSections.forEach(section => section.remove());
        sections.filter(section => section.querySelector('.card-widget')).forEach(section => column.appendChild(section));
    }

    // 🐾 Free-Walking Kiki Pet Engine (Walks around full screen!)
    getTodayPriorityTasks() {
        const week = Math.min(13, Math.ceil((this.state.lifeRecovery.daysActive || 1) / 7));
        const contentDay = [1, 3, 6].includes(new Date().getDay()); // Mon, Wed, Sat
        const namajDone = Object.values(this.state.namaj).filter(value => value === true).length;
        const namajComplete = this.state.periodTracker.isOnPeriod || namajDone === 5;
        const groups = [
            {
                title: '1. Must Do First', tone: 'must', tasks: [
                    { id: 'mind', icon: '🧠', title: '10-minute mind reset', detail: 'Breathing → desk clear → আজকের এক priority', done: this.state.autopilot.tasks.mindReset },
                    { id: 'namaj', icon: '🕌', title: this.state.periodTracker.isOnPeriod ? 'Namaj — Excused' : `Namaj tracker (${namajDone}/5)`, detail: this.state.periodTracker.isOnPeriod ? 'Period self-care; score penalty নেই' : 'প্রতিটি Waqt মূল tracker-এ complete করুন', done: namajComplete, link: true },
                    { id: 'focus', icon: week === 1 ? '🎓' : '💻', title: week === 1 ? 'Report correction — 2 × 25 min' : 'Current roadmap lesson — 45 min', detail: week === 1 ? 'একবারে feedback-এর একটি correction' : 'শুধু current week topic; নতুন topic নয়', done: this.state.autopilot.tasks.learnBlock }
                ]
            },
            {
                title: '2. Career Practice', tone: 'career', tasks: [
                    { id: 'build', icon: '⌨️', title: 'Build without copying — 45 min', detail: 'নিজের হাতে code/feature; tutorial বন্ধ', done: this.state.autopilot.tasks.buildBlock },
                    { id: 'test', icon: '🧪', title: 'Recall + interview — 20 min', detail: '5 questions, 1 small problem, aloud explanation', done: this.state.autopilot.tasks.testBlock }
                ]
            },
            {
                title: '3. Income', tone: 'income', tasks: [
                    { id: 'jobs', icon: '📨', title: '2 suitable job applications', detail: '1 tech + 1 general job', done: this.state.classyReset.tasks.twoApplications }
                ]
            },
            ...(contentDay ? [{
                title: '4. Content — Scheduled Today', tone: 'content', tasks: [
                    { id: 'content', icon: '🎬', title: 'One content step — 10 min', detail: 'Script, record, edit অথবা upload—শুধু next step', done: this.state.lifeRecovery.tasks.contentBlock }
                ]
            }] : []),
            {
                title: contentDay ? '5. Self-care & Behaviour' : '4. Self-care & Behaviour', tone: 'care', tasks: [
                    { id: 'grooming', icon: '🪞', title: 'Basic grooming', detail: 'Hygiene, tidy hair, clean outfit', done: this.state.checklist.properShower === true },
                    { id: 'calm', icon: '💛', title: 'Calm respectful behaviour', detail: 'রাগে 20-minute pause; harsh হলে repair', done: this.state.behaviourReset.tasks.respectfulWords },
                    { id: 'phone', icon: '📵', title: 'Phone-free focus boundary', detail: 'Must Do + Career শেষ হওয়ার আগে reels নয়', done: this.state.lifeRecovery.tasks.phoneBoundary },
                    { id: 'move', icon: '🚶', title: '10–20 minute movement', detail: 'Walk, private exercise অথবা housework', done: this.state.classyReset.tasks.movement }
                ]
            },
            {
                title: contentDay ? '6. Close the Day' : '5. Close the Day', tone: 'night', tasks: [
                    { id: 'night', icon: '🌙', title: 'Write 3 small wins', detail: 'তারপর rest; নতুন task যোগ নয়', done: this.state.classyReset.tasks.nightWins }
                ]
            }
        ];
        if (this.state.fasting.running || this.state.fasting.done || (this.state.fasting.elapsedSec || 0) > 0) {
            groups.find(group => group.tone === 'must')?.tasks.push({ id: 'fasting', icon: '🥗', title: 'Active fasting session', detail: `${this.state.fasting.targetHours || 16} hour target`, done: this.state.fasting.done, link: true });
        }
        const mustGroup = groups.find(group => group.tone === 'must');
        const careGroup = groups.find(group => group.tone === 'care');
        const namajTask = mustGroup.tasks.find(task => task.id === 'namaj');
        mustGroup.tasks = mustGroup.tasks.filter(task => task.id !== 'namaj');
        const selfCareTasks = careGroup.tasks.filter(task => ['grooming', 'move'].includes(task.id));
        const behaviourTasks = careGroup.tasks.filter(task => ['calm', 'phone'].includes(task.id));
        const orderedGroups = [
            { title: 'Self-care & Health', tone: 'care', tasks: selfCareTasks },
            { title: 'Namaj & Faith', tone: 'faith', tasks: [namajTask] },
            mustGroup,
            ...groups.filter(group => !['must', 'care'].includes(group.tone) && group.tone !== 'night'),
            { title: 'Behaviour & Boundaries', tone: 'behaviour', tasks: behaviourTasks },
            ...groups.filter(group => group.tone === 'night')
        ].filter(group => group.tasks.length);
        orderedGroups.forEach((group, index) => {
            group.title = `${index + 1}. ${group.title.replace(/^\d+\.\s*/, '')}`;
        });
        return orderedGroups;
    }

    renderTodayDashboard() {
        const container = document.getElementById('todayDashboardPage');
        if (!container) return;
        const groups = this.getTodayPriorityTasks();
        const allTasks = groups.flatMap(group => group.tasks);
        const done = allTasks.filter(task => task.done).length;
        const percent = Math.round((done / Math.max(1, allTasks.length)) * 100);
        container.innerHTML = `
            <div class="today-hero">
                <div><small>TODAY'S COMMAND CENTER</small><h1>আজ শুধু এই list—আর কিছু ভাবতে হবে না</h1><p>একই task একবারই আছে। উপর থেকে নিচে priority অনুযায়ী করুন।</p></div>
                <div class="today-score"><b>${percent}%</b><span>${done}/${allTasks.length} complete</span></div>
            </div>
            <div class="today-worth"><span>💎</span><div><small>REMEMBER WHO YOU ARE</small><b>আমি precious, important এবং intelligent। আমিও সফল হতে পারি—আমাকে অন্যের জীবন follow করতে হবে না।</b></div></div>
            <div class="today-progress"><i style="width:${percent}%"></i></div>
            ${percent === 100 ? '<div class="today-finished">🎉 আজকের সব task শেষ। এখন guilt-free rest করুন।</div>' : ''}
            <div class="today-groups">${groups.map(group => `<section class="today-group ${group.tone}">
                <h2>${group.title}</h2>
                ${group.tasks.map(task => `<button class="today-task ${task.done ? 'done' : ''}" onclick="app.toggleTodayTask('${task.id}')">
                    <span class="today-task-icon">${task.icon}</span><span><b>${task.title}</b><small>${task.detail}</small></span><i>${task.done ? '✓' : (task.link ? '→' : '')}</i>
                </button>`).join('')}
            </section>`).join('')}</div>
        `;
    }

    toggleTodayTask(id) {
        const actions = {
            mind: () => this.toggleAutopilot('mindReset'),
            focus: () => this.toggleAutopilot('learnBlock'),
            build: () => this.toggleAutopilot('buildBlock'),
            test: () => this.toggleAutopilot('testBlock'),
            jobs: () => this.toggleClassyReset('twoApplications'),
            content: () => this.toggleLifeRecovery('contentBlock'),
            grooming: () => this.toggleChecklistItem('properShower'),
            calm: () => this.toggleBehaviourReset('respectfulWords'),
            phone: () => this.toggleLifeRecovery('phoneBoundary'),
            move: () => this.toggleClassyReset('movement'),
            night: () => this.toggleClassyReset('nightWins')
        };
        if (id === 'namaj' || id === 'fasting') {
            this.switchDashboardPage('trackers');
            setTimeout(() => document.getElementById(id === 'namaj' ? 'namajGrid' : 'fastingContainer')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
            return;
        }
        if (actions[id]) actions[id]();
        this.renderTodayDashboard();
        this.renderActivityLogPage();
    }

    switchDashboardPage(page) {
        this.state.settings.activeDashboardPage = ['today', 'trackers', 'activity'].includes(page) ? page : 'today';
        this.saveState();
        if (page === 'today') this.renderTodayDashboard();
        if (page === 'activity') this.renderActivityLogPage();
        this.applyDashboardPage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    applyDashboardPage() {
        const page = this.state.settings.activeDashboardPage || 'today';
        const today = document.getElementById('todayDashboardPage');
        const activity = document.getElementById('activityLogPage');
        const trackerElements = [
            document.getElementById('overallTransformationContainer'),
            document.getElementById('specialEventBannerContainer'),
            document.querySelector('.dashboard-grid')
        ];
        [
            document.getElementById('classyResetContainer')?.closest('.card-widget')
        ].forEach(element => { if (element) element.style.display = 'none'; });
        if (today) today.style.display = page === 'today' ? 'block' : 'none';
        if (activity) activity.style.display = page === 'activity' ? 'block' : 'none';
        trackerElements.forEach(element => { if (element) element.style.display = page === 'trackers' ? '' : 'none'; });
        ['today', 'trackers', 'activity'].forEach(name => document.getElementById(`${name}ViewBtn`)?.classList.toggle('active', page === name));
    }

    renderActivityLogPage() {
        const container = document.getElementById('activityLogPage');
        if (!container) return;
        const logs = (this.state.activityLog || []).slice().reverse();
        const today = this.getLocalDateStr();
        const todayLogs = logs.filter(log => log.date === today);
        const categories = [...new Set(todayLogs.map(log => log.category))];
        container.innerHTML = `
            <div class="activity-page-header"><div><small>ACTIVITY LOG</small><h1>আপনার করা কাজের evidence</h1><p>নতুন task completion-এর date ও time এখানে automatically save হয়।</p></div><b>${todayLogs.length}<span>today</span></b></div>
            <div class="activity-page-summary">${categories.length ? categories.map(category => `<span>${category}: <b>${todayLogs.filter(log => log.category === category).length}</b></span>`).join('') : '<span>আজ এখনো activity নেই—Today Dashboard থেকে প্রথম task শুরু করুন।</span>'}</div>
            <div class="activity-page-list">${logs.length ? logs.slice(0, 100).map(log => `<article><time>${log.date}<small>${log.time}</small></time><span><b>${log.category}</b><small>${log.task}</small></span></article>`).join('') : '<div class="empty-activity">Activity tracking এখন থেকে শুরু হয়েছে।</div>'}</div>
        `;
    }

    renderSelfWorthReminder() {
        const container = document.getElementById('selfWorthReminderContainer');
        if (!container) return;
        const reminders = [
            'আমি precious, important এবং intelligent। আমার value প্রমাণ করার জন্য কারও approval দরকার নেই।',
            'আমিও শিখতে, কাজ করতে এবং successful হতে পারি—ছোট consistent action দিয়ে।',
            'আমাকে অন্যের life copy করতে হবে না। আমি নিজের unique পথে progress করতে পারি।',
            'একা থাকা ভয়ংকর নয়। আমি নিজের safe company হতে পারি এবং healthy connection-ও বেছে নিতে পারি।',
            'অন্যের opinion তথ্য হতে পারে, command নয়। আমার values অনুযায়ী সিদ্ধান্ত নেওয়ার অধিকার আমার আছে।',
            'একটি failure আমার identity নয়। ভুল থেকে next step নেওয়াই growth।',
            'আমি নিজেকে priority দিতে পারি—অন্যকে অসম্মান না করেও boundary রাখা যায়।',
            'আমার happiness গড়তে আমার choices গুরুত্বপূর্ণ; কিন্তু প্রতিটি কষ্টের জন্য নিজেকে blame করতে হবে না।'
        ];
        const index = Number(this.state.settings.selfWorthReminderIndex || 0) % reminders.length;
        container.innerHTML = `
            <span class="self-worth-icon">💎</span>
            <div><small>MY DAILY TRUTH</small><strong>${reminders[index]}</strong></div>
            <button onclick="app.nextSelfWorthReminder()">Next reminder →</button>
        `;
        if (!this.selfWorthReminderTimer) {
            this.selfWorthReminderTimer = setInterval(() => this.nextSelfWorthReminder(false), 30000);
        }
    }

    nextSelfWorthReminder(playSound = true) {
        this.state.settings.selfWorthReminderIndex = (Number(this.state.settings.selfWorthReminderIndex || 0) + 1) % 8;
        this.saveState();
        this.renderSelfWorthReminder();
        if (playSound) window.cuteAudio.playPop();
    }

    renderClassyResetWidget() {
        const container = document.getElementById('classyResetContainer');
        const badge = document.getElementById('classyResetBadge');
        if (!container) return;

        const reset = this.state.classyReset;
        const actions = [
            ['grooming', '🪞', '10-minute grooming', 'Face, teeth, tidy hair, moisturizer/sunscreen, deodorant ও lip balm'],
            ['polishedOutfit', '👗', 'Clean coordinated outfit', 'Clean/ironed পোশাক, tidy shoes; makeup ও expensive outfit optional'],
            ['calmSpeech', '🗣️', 'Classy communication', 'ধীরে কথা, অন্যের কথা শেষ হতে দেওয়া, gossip/oversharing কমানো'],
            ['angerPause', '🧘', 'STOP before reacting', 'রাগে reply নয়; 20-minute pause, breathing, তারপর respectful sentence'],
            ['twoApplications', '📨', '2 job applications', '1টি tech + 1টি suitable general job; random mass apply নয়'],
            ['skillPractice', '💻', 'Career evidence', 'Coding/interview practice complete করে ছোট evidence রাখুন'],
            ['movement', '🚶', 'Private movement', 'কমপক্ষে 10–20 মিনিট walk, room exercise বা housework'],
            ['nightWins', '🌙', '3 wins at night', 'আজকের তিনটি ছোট completed action লিখুন; appearance দিয়ে নিজেকে judge নয়']
        ];
        const done = actions.filter(action => reset.tasks[action[0]] === true).length;
        if (badge) badge.textContent = `Day ${reset.currentDay}/30 • ${done}/8`;

        container.innerHTML = `
            <div class="classy-principle"><b>Classy = clean + calm + capable + consistent.</b><span>Cosmetics optional; behaviour, competence ও financial independence হলো core glow-up.</span></div>
            <div class="classy-action-list">
                ${actions.map(action => {
                    const isDone = reset.tasks[action[0]] === true;
                    return `<button class="classy-action ${isDone ? 'done' : ''}" onclick="app.toggleClassyReset('${action[0]}')">
                        <span>${action[1]}</span><span><b>${action[2]}</b><small>${action[3]}</small></span><i>${isDone ? '✓' : ''}</i>
                    </button>`;
                }).join('')}
            </div>
            <button class="anger-help-btn" onclick="app.showAngerProtocol()">রাগ উঠেছে—এখন কী বলব?</button>
            <details class="classy-details">
                <summary>Two CV checklist</summary>
                <p><b>Tech CV:</b> contact + LinkedIn/GitHub → 2-line summary → real skills → 2–3 projects → education → experience. One page.</p>
                <p><b>General CV:</b> computer/Office skills → communication/typing → content-page analytics → education → admin/volunteer experience. One page. Circular না চাইলে photo optional.</p>
            </details>
            <details class="classy-details">
                <summary>Salary ও HR answer</summary>
                <p>Support/admin/data: ৳15k–25k • Social media: ৳20k–30k • Junior QA: ৳22k–40k • Junior dev: skill অনুযায়ী প্রায় ৳20k–35k+.</p>
                <p><b>বলুন:</b> “Role ও responsibilities অনুযায়ী আমার expectation ৳20,000–25,000; learning opportunity, hours ও benefits অনুযায়ী negotiable.” Job-এর জন্য fee নয়; unsafe workplace, unpaid long trial ও unclear hours red flag.</p>
            </details>
            <details class="classy-details">
                <summary>Low-cost grooming schedule</summary>
                <p><b>Daily:</b> hygiene, tidy hair, moisturizer/sunscreen, deodorant, clean outfit, lip balm/light lipstick if wanted.</p>
                <p><b>Occasional:</b> manageable haircut; eyebrow tidy প্রায় 3–4 সপ্তাহে প্রয়োজনমতো; upper-lip threading optional 2–4 সপ্তাহে. Irritation হলে stop. Regular facial bleach দরকার নেই.</p>
            </details>
        `;
    }

    toggleClassyReset(key) {
        const tasks = this.state.classyReset.tasks;
        if (!Object.prototype.hasOwnProperty.call(tasks, key)) return;
        tasks[key] = !tasks[key];
        if (tasks[key]) this.recordActivity('Confidence', key);
        this.saveState();
        this.renderClassyResetWidget();
        window.cuteAudio.playPop();
    }

    showAngerProtocol() {
        this.showMascotDialogue('STOP: এখন reply নয়। বলুন—“আমি এখন upset। ভুলভাবে কথা বলতে চাই না। ২০ মিনিট পরে calmly বলব।” Phone দূরে রেখে 4-in, 6-out breathing করুন।');
    }

    renderLifeRecoveryWidget() {
        const container = document.getElementById('lifeRecoveryContainer');
        const badge = document.getElementById('lifeRecoveryBadge');
        if (!container) return;

        const recovery = this.state.lifeRecovery;
        const week = Math.min(13, Math.ceil((recovery.daysActive || 1) / 7));
        const planRoadmap = [
            'Report corrections, final review ও submission',
            'HTML, responsive CSS এবং Git/GitHub',
            'JavaScript fundamentals: functions, arrays, objects, loops',
            'DOM, events, forms, fetch এবং async/await',
            'React components, props, state এবং forms',
            'React hooks, routing, API এবং frontend project',
            'PHP/OOP fundamentals এবং MySQL',
            'Laravel MVC, routing, controllers এবং validation',
            'Eloquent, migrations, auth এবং REST API',
            'React + Laravel full-stack integration',
            'Testing, security basics, README এবং deployment',
            'Technical revision, problem solving এবং mock interview',
            'CV, portfolio, applications এবং weak-topic repair'
        ];
        const planAssessments = this.state.autopilot.weeklyAssessments || [];
        const planLatest = planAssessments.length ? planAssessments[planAssessments.length - 1] : null;
        const planPrevious = planAssessments.length > 1 ? planAssessments[planAssessments.length - 2] : null;
        const planGrowth = planLatest && planPrevious ? planLatest.total - planPrevious.total : null;
        const planQuizGuide = week === 1
            ? 'Report-এর content/data, methodology, formatting, references এবং final proofread—৫টি audit item.'
            : week <= 4
                ? '<a href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Test_your_skills" target="_blank" rel="noopener">MDN Test Your Skills</a>'
                : week <= 6
                    ? '<a href="https://react.dev/learn" target="_blank" rel="noopener">React Learn Challenges</a>'
                    : '<a href="https://laravel.com/docs" target="_blank" rel="noopener">Laravel Docs + current feature test</a>';

        container.innerHTML = `
            <div class="recovery-priority"><strong>Week ${week} priority</strong><span>${planRoadmap[week - 1]}</span></div>
            ${week === 1 ? `<details class="recovery-details" open><summary>Report deadline checklist</summary><p>1. সব feedback এক list → 2. content/data/methodology → 3. formatting/references → 4. full proofread → 5. Mam review → 6. final submit.</p></details>` : ''}
            <details class="recovery-details" open>
                <summary>13-week roadmap — একমাত্র master copy</summary>
                <div class="master-roadmap">${planRoadmap.map((item, index) => `<div class="${index + 1 === week ? 'current' : ''}"><b>Week ${index + 1}</b><span>${item}</span></div>`).join('')}</div>
            </details>
            <details class="recovery-details weekly-exam">
                <summary>Sunday weekly exam — একমাত্র assessment</summary>
                <div class="quiz-location-guide"><strong>এই সপ্তাহের test</strong><span>${planQuizGuide}</span></div>
                <div class="exam-rubric"><span>নিজেকে marks নয়—প্রতিটি category-তে ৫টির মধ্যে কয়টি pass করেছেন লিখুন। App ×2 করবে.</span></div>
                <div class="exam-inputs">
                    <label>Quiz passed (0–5)<input id="examQuiz" type="number" min="0" max="5" value="0"></label>
                    <label>Code tests passed (0–5)<input id="examCode" type="number" min="0" max="5" value="0"></label>
                    <label>Explain points passed (0–5)<input id="examExplain" type="number" min="0" max="5" value="0"></label>
                    <label>Mock answers passed (0–5)<input id="examMock" type="number" min="0" max="5" value="0"></label>
                </div>
                <button class="recovery-unstuck-btn" onclick="app.saveWeeklyAssessment()">Save Weekly Score</button>
                <p><b>Latest:</b> ${planLatest ? `${planLatest.total}/40 (${planLatest.date})` : 'Not tested yet'} ${planGrowth === null ? '' : `• Change: ${planGrowth >= 0 ? '+' : ''}${planGrowth}`}</p>
            </details>
        `;
        return;
        const tasks = [
            week === 1
                ? { key: 'thesisBlock', icon: '🎓', title: 'Report Deadline — 25 min', text: 'Mam-এর feedback থেকে একটি correction শেষ করুন। সম্ভব হলে আজ 2–3টি block করুন।' }
                : { key: 'thesisBlock', icon: '💻', title: 'Full-Stack Build — 60 min', text: 'এই সপ্তাহের roadmap topic শিখে নিজের হাতে code করুন এবং GitHub-এ ছোট progress রাখুন।' },
            { key: 'jobBlock', icon: '💼', title: 'Job Basic — 25 min', text: 'একটি basic interview question লিখে answer practice করুন অথবা 1টি suitable job apply করুন।' },
            { key: 'contentBlock', icon: '🎬', title: 'Content — 10 min', text: 'Perfect video নয়: idea, 3-line script, record, edit বা upload—শুধু next step।' },
            { key: 'phoneBoundary', icon: '📵', title: 'One Phone-Free Block', text: 'একটি 25-minute block-এ phone অন্য জায়গায় রাখুন; block শেষে reels দেখলেও guilt নয়।' }
        ];
        const done = tasks.filter(task => recovery.tasks[task.key] === true).length;
        const autopilotSteps = [
            ['morningReset', '01', 'Morning reset', 'Phone নয় → bed ছাড়ুন → wash/groom → পানি → Namaj applicable হলে Namaj'],
            ['mindReset', '02', 'Mind clear — 10 min', '3 slow breaths → কাগজে আজকের এক priority লিখুন → desk clear করুন'],
            ['learnBlock', '03', week === 1 ? 'Report correction — 2×25 min' : 'Learn — 45 min', week === 1 ? 'Feedback checklist থেকে একবারে একটি ভুল ঠিক করুন' : 'শুধু current week topic official docs থেকে শিখুন; short notes লিখুন'],
            ['buildBlock', '04', 'Build without copying — 45 min', 'Tutorial বন্ধ করে memory থেকে feature/code লিখুন; stuck হলে আগে 15 min চেষ্টা'],
            ['testBlock', '05', 'Recall & interview — 20 min', 'না দেখে 5 প্রশ্ন answer + code explain aloud + 1 ছোট problem'],
            ['careerBlock', '06', 'Income lane — 25 min', 'একটি suitable job apply; সপ্তাহে 3 দিন এর পরে 10 min content step'],
            ['bodyReset', '07', 'Body + screen boundary', '20–30 min walk/housework; essential blocks-এর আগে reels/movie explanation নয়']
        ];
        const autoDone = autopilotSteps.filter(step => this.state.autopilot.tasks[step[0]] === true).length;
        const assessments = this.state.autopilot.weeklyAssessments || [];
        const latestAssessment = assessments.length ? assessments[assessments.length - 1] : null;
        const previousAssessment = assessments.length > 1 ? assessments[assessments.length - 2] : null;
        const growth = latestAssessment && previousAssessment ? latestAssessment.total - previousAssessment.total : null;
        const quizGuide = week === 1
            ? `<b>এই সপ্তাহের Report Audit:</b> ৫টি item check করুন—content/data, methodology, formatting, references, final proofread. প্রতিটি ঠিক থাকলে 2 marks; মোট 10.`
            : week <= 4
                ? `<b>HTML/CSS/JavaScript:</b> <a href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Test_your_skills" target="_blank" rel="noopener">MDN Test Your Skills খুলুন</a>. Current topic-এর 5টি task করুন; প্রতিটি correct = 2 marks.`
                : week <= 6
                    ? `<b>React:</b> <a href="https://react.dev/learn" target="_blank" rel="noopener">React Learn-এর current chapter</a>-এর Challenges করুন। 5টি challenge/task; প্রতিটি correct = 2 marks.`
                    : `<b>PHP/Laravel/Full-stack:</b> Current week topic থেকে notes ছাড়া 5টি question লিখে answer দিন এবং একটি small feature build করুন। প্রতিটি correct answer = 2 marks. Reference: <a href="https://laravel.com/docs" target="_blank" rel="noopener">Laravel Docs</a>.`;
        const weekFocus = [
            'REPORT DEADLINE: corrections list, daily 2–3 focus blocks, final check ও submission',
            'HTML semantic structure + CSS responsive layout + Git/GitHub basics',
            'JavaScript fundamentals: variables, functions, arrays, objects ও loops',
            'JavaScript DOM, events, forms, fetch, promises ও async/await',
            'React: components, props, state, events ও forms',
            'React: hooks, routing, API integration + frontend project',
            'PHP fundamentals + OOP basics + MySQL queries and relationships',
            'Laravel: MVC, routing, controllers, Blade ও validation',
            'Laravel: Eloquent, migrations, authentication ও REST API',
            'React + Laravel full-stack project integration',
            'Project polish: errors, security basics, testing, GitHub README ও deploy',
            'Interview: JS/PHP/SQL/web basics + daily problem solving + mock answers',
            'CV, portfolio, applications ও mock interviews; weak topics repair'
        ][week - 1];
        if (badge) badge.textContent = `Week ${week}/13 • Today ${done}/4`;

        container.innerHTML = `
            <div class="recovery-priority"><strong>এই সপ্তাহের focus</strong><span>${weekFocus}</span></div>
            <div class="recovery-order">Priority order: <b>Health → Graduation → Income → Content → Relationship decision</b></div>
            <section class="fresh-mind-panel">
                <div class="fresh-mind-copy">
                    <span>🌤️ Fresh Mind & Keep Going</span>
                    <strong>আপনার পুরো life আজ solve করতে হবে না। শুধু পরের ছোট step-টি করুন।</strong>
                    <small>Saved small wins: ${this.state.mindCare.smallWins || 0}</small>
                </div>
                <div class="fresh-mind-actions">
                    <button onclick="app.startFreshMindReset()">Mind hazy—3 min reset</button>
                    <button onclick="app.recordSmallWin()">আজ একটি small win করেছি ✓</button>
                </div>
            </section>
            <section class="autopilot-panel">
                <div class="autopilot-heading"><strong>আজকের Autopilot — ভাবতে হবে না, 01 থেকে শুরু</strong><span>${autoDone}/7</span></div>
                <div class="autopilot-list">
                    ${autopilotSteps.map(step => {
                        const isDone = this.state.autopilot.tasks[step[0]] === true;
                        return `<button class="autopilot-step ${isDone ? 'done' : ''}" onclick="app.toggleAutopilot('${step[0]}')">
                            <b>${step[1]}</b><span><strong>${step[2]}</strong><small>${step[3]}</small></span><i>${isDone ? '✓' : ''}</i>
                        </button>`;
                    }).join('')}
                </div>
                <p class="autopilot-rule"><b>Reels rule:</b> 01–05 শেষ না হলে reels/manga/movie explanation নয়। শেষ হলে সর্বোচ্চ 45 মিনিট timer দিয়ে guilt-free entertainment.</p>
            </section>
            ${week === 1 ? `
                <details class="recovery-details" open>
                    <summary>এই সপ্তাহের Report Correction Checklist</summary>
                    <p>□ Day 1: Mam-এর সব correction এক জায়গায় লিখুন<br>
                    □ Day 2–3: content, data ও methodology errors ঠিক করুন<br>
                    □ Day 4: formatting, references, tables ও figures check করুন<br>
                    □ Day 5: শুরু থেকে proofread এবং checklist মিলান<br>
                    □ Day 6: corrected draft Mam-কে দেখান<br>
                    □ Day 7: final correction করে submit করুন</p>
                    <p><b>Daily minimum:</b> 2 × 25-minute focus blocks. না বুঝলে avoid নয়—specific question নিয়ে Mam-এর কাছে যান।</p>
                </details>` : ''}
            <div class="recovery-task-list">
                ${tasks.map(task => {
                    const isDone = recovery.tasks[task.key] === true;
                    return `<button class="recovery-task ${isDone ? 'done' : ''}" onclick="app.toggleLifeRecovery('${task.key}')">
                        <span class="recovery-task-icon">${task.icon}</span>
                        <span><strong>${task.title}</strong><small>${task.text}</small></span>
                        <i>${isDone ? '✓' : ''}</i>
                    </button>`;
                }).join('')}
            </div>
            <button class="recovery-unstuck-btn" onclick="app.showUnstuckStep()">আমি freeze হয়ে গেছি—এখন কী করব?</button>
            <div class="relationship-boundary">
                <strong>2-Month Relationship Boundary</strong>
                <span>Fight নয়, lovey-dovey performance নয়, meet/expectation chase নয়। প্রয়োজনীয় কথায় calm ও polite থাকুন। Panic-এর message 30 মিনিট draft-এ রাখুন; 60 দিন শেষে words নয়—consistent action ও concrete plan দেখে সিদ্ধান্ত নিন।</span>
            </div>
            <details class="recovery-details">
                <summary>Full-stack শেখার exact order</summary>
                <p>HTML → CSS/responsive → Git/GitHub → JavaScript → DOM/API/async → React → PHP/OOP → MySQL → Laravel MVC/Eloquent/Auth/API → React-Laravel integration → deploy → interview practice.</p>
                <p><b>Daily:</b> 60 min শেখা + 60 min নিজের হাতে code + 20 min interview question. Tutorial copy নয়; প্রতি সপ্তাহে GitHub-এ working feature দিন।</p>
            </details>
            <details class="recovery-details">
                <summary>Income job + content backup</summary>
                <p><b>এখন apply:</b> customer/chat support, admin/office assistant, data entry/MIS, junior QA/manual testing, IT/support executive, social-media/content executive ও sales support.</p>
                <p><b>Content:</b> সপ্তাহে 3টি quality video; প্রথম 2 seconds-এ hook, clear audio/light, captions, এক niche এবং 10-video review cycle. দুই page-এ একই দিনে pressure নয়—যেটায় organic response ভালো, সেটাকে primary করুন.</p>
            </details>
            <details class="recovery-details">
                <summary>Bank, savings ও dream-house ladder</summary>
                <p>নিজের নামে low-fee savings account খুলুন। Income এলেই আগে save: minimum 10%, target 20%. ধাপ: ৳10,000 emergency buffer → 1 মাসের expense → 3–6 মাসের expense → তারপর separate Dream Home Fund. Income না আসা পর্যন্ত house price নয়—earning capacity build করাই goal.</p>
            </details>
            <details class="recovery-details weekly-exam" open>
                <summary>Sunday Weekly Exam & Growth Score</summary>
                <div class="quiz-location-guide"><strong>Quiz কোথায় দেবেন?</strong><span>${quizGuide}</span></div>
                <p><b>নিজেকে marks দেবেন না।</b> শুধু প্রতিটি category-তে ৫টির মধ্যে কয়টি সত্যি pass করেছেন লিখুন। App নিজে ×2 করে 40-এর score বানাবে।</p>
                <div class="exam-rubric">
                    <span><b>Quiz:</b> ৫টি প্রশ্নের কয়টি correct?</span>
                    <span><b>Code:</b> ৫টি requirement/test-এর কয়টি code pass করেছে?</span>
                    <span><b>Project explain:</b> purpose, stack, data flow, challenge, demo—এই ৫টির কয়টি notes ছাড়া explain করেছেন?</span>
                    <span><b>Mock interview:</b> ৫টি spoken question-এর কয়টির clear answer দিয়েছেন?</span>
                </div>
                <div class="exam-inputs">
                    <label>Quiz passed (0–5)<input id="examQuiz" type="number" min="0" max="5" value="0"></label>
                    <label>Code tests passed (0–5)<input id="examCode" type="number" min="0" max="5" value="0"></label>
                    <label>Explain points passed (0–5)<input id="examExplain" type="number" min="0" max="5" value="0"></label>
                    <label>Mock answers passed (0–5)<input id="examMock" type="number" min="0" max="5" value="0"></label>
                </div>
                <button class="recovery-unstuck-btn" onclick="app.saveWeeklyAssessment()">Save Weekly Score</button>
                <p><b>Latest:</b> ${latestAssessment ? `${latestAssessment.total}/40 (${latestAssessment.date})` : 'Not tested yet'} ${growth === null ? '' : `• Change: ${growth >= 0 ? '+' : ''}${growth}`}</p>
            </details>
            <p class="reset-note">আজ 2/4 হলেই recovery day সফল। Cousin-এর timeline আপনার deadline নয়।</p>
        `;
    }

    toggleLifeRecovery(key) {
        const tasks = this.state.lifeRecovery.tasks;
        if (!Object.prototype.hasOwnProperty.call(tasks, key)) return;
        tasks[key] = !tasks[key];
        if (tasks[key]) this.recordActivity('Career', key);
        this.saveState();
        this.renderLifeRecoveryWidget();
        window.cuteAudio.playPop();
        const done = Object.values(tasks).filter(v => v === true).length;
        if (done === 2) this.showMascotDialogue('Recovery day successful—আজকের minimum complete। 🧭');
        if (done === 4) {
            window.cuteAudio.playChime();
            this.showMascotDialogue('আজ চারটি life lane-এই ছোট progress হয়েছে। Perfect নয়—real progress! ✨');
        }
    }

    showUnstuckStep() {
        const recovery = this.state.lifeRecovery.tasks;
        let message = 'Phone silent করে অন্য জায়গায় রাখুন। তারপর report file শুধু খুলুন—আর কিছু নয়।';
        if (recovery.thesisBlock && !recovery.jobBlock) message = 'একটি basic question লিখুন: “Tell me about yourself.” 3 লাইনের answer বলুন।';
        else if (recovery.thesisBlock && recovery.jobBlock && !recovery.contentBlock) message = 'Content app খুলে শুধু 3-line script লিখুন। Upload এখনই জরুরি নয়।';
        else if (recovery.thesisBlock && recovery.jobBlock && recovery.contentBlock && !recovery.phoneBoundary) message = '25 মিনিটের timer দিন এবং phone room-এর বাইরে রাখুন।';
        else if (Object.values(recovery).every(v => v === true)) message = 'আজকের recovery work শেষ। Rest নিন—নতুন কাজ যোগ করার দরকার নেই।';
        this.showMascotDialogue(message);
    }

    startFreshMindReset() {
        const steps = [
            'Step 1/3 — পা মেঝেতে রাখুন। 4 seconds inhale, 6 seconds exhale—৫ বার করুন।',
            'Step 2/3 — বলুন: “আমি এখন overwhelmed; আমাকে পুরো life solve করতে হবে না।”',
            'Step 3/3 — Phone দূরে রেখে Autopilot-এর প্রথম অসম্পূর্ণ কাজটি শুধু 5 মিনিট করুন।'
        ];
        let index = 0;
        this.showMascotDialogue(steps[index]);
        const advance = () => {
            index += 1;
            if (index < steps.length) {
                this.showMascotDialogue(steps[index]);
                setTimeout(advance, 5000);
            } else {
                this.state.autopilot.tasks.mindReset = true;
                this.saveState();
                this.renderLifeRecoveryWidget();
            }
        };
        setTimeout(advance, 5000);
    }

    recordSmallWin() {
        const today = this.getLocalDateStr();
        if (this.state.mindCare.lastWinDate === today) {
            this.showMascotDialogue('আজকের small win already saved। এখন সেটাকে honour করে next ছোট step নিন। 🌱');
            return;
        }
        this.state.mindCare.smallWins = (this.state.mindCare.smallWins || 0) + 1;
        this.state.mindCare.lastWinDate = today;
        this.saveState();
        this.renderLifeRecoveryWidget();
        window.cuteAudio.playChime();
        this.showMascotDialogue('Small win saved। Motivation নয়—এই ছোট evidence-ই confidence তৈরি করে। ✨');
    }

    toggleAutopilot(key) {
        const tasks = this.state.autopilot.tasks;
        if (!Object.prototype.hasOwnProperty.call(tasks, key)) return;
        tasks[key] = !tasks[key];
        if (tasks[key]) this.recordActivity('Autopilot', key);
        this.saveState();
        this.renderLifeRecoveryWidget();
        window.cuteAudio.playPop();
    }

    saveWeeklyAssessment() {
        const ids = ['examQuiz', 'examCode', 'examExplain', 'examMock'];
        const passedCounts = ids.map(id => Math.max(0, Math.min(5, Number(document.getElementById(id)?.value) || 0)));
        const scores = passedCounts.map(count => count * 2);
        const assessment = {
            date: this.getLocalDateStr(),
            quiz: scores[0],
            code: scores[1],
            explain: scores[2],
            mock: scores[3],
            total: scores.reduce((sum, score) => sum + score, 0)
        };
        const list = this.state.autopilot.weeklyAssessments;
        const existing = list.findIndex(item => item.date === assessment.date);
        if (existing >= 0) list[existing] = assessment;
        else list.push(assessment);
        this.state.autopilot.weeklyAssessments = list.slice(-13);
        this.saveState();
        this.renderLifeRecoveryWidget();
        window.cuteAudio.playChime();
        this.showMascotDialogue(`Weekly evidence saved: ${assessment.total}/40. কম score shame নয়—next practice target। 📈`);
    }

    renderBehaviourResetWidget() {
        const container = document.getElementById('behaviourResetContainer');
        const badge = document.getElementById('behaviourResetBadge');
        if (!container) return;

        const reset = this.state.behaviourReset;
        const actions = [
            { key: 'respectfulWords', icon: '💛', title: 'Respectful words', text: 'আজ চিৎকার, অপমান বা কটু কথা নয়; ধীরে ও পরিষ্কারভাবে কথা বলুন।' },
            { key: 'pauseAndOwn', icon: '🧠', title: 'Pause before reacting', text: 'রাগ উঠলে STOP → ৩টি deep breath → ২০ মিনিট বিরতি → তারপর উত্তর।' },
            { key: 'boundaryWithoutFight', icon: '🛡️', title: 'Boundary without fighting', text: 'বলুন: “এখন কথা বললে ঝগড়া হবে, শান্ত হয়ে পরে বলব।”' },
            { key: 'repairAfterRude', icon: '🤝', title: 'Repair a mistake', text: 'Rude হলে specific sorry বলুন এবং কথাটি নরমভাবে আবার বলুন।' },
            { key: 'noComparison', icon: '🌱', title: 'No comparison today', text: 'অন্যের timeline নয়; নিজের আজকের একটি next step-এ ফিরে আসুন।' },
            { key: 'kindSelfTalk', icon: '💎', title: 'Kind self-talk', text: 'নিজেকে loser/ugly নয়—বলুন: “আমি শিখছি, আবার চেষ্টা করতে পারি।”' }
        ];
        const done = actions.filter(action => reset.tasks[action.key] === true).length;
        const percent = Math.round((done / actions.length) * 100);
        if (badge) badge.textContent = `Day ${reset.currentDay}/30 • ${done}/${actions.length}`;

        container.innerHTML = `
            <div class="reset-intro">
                <strong>আজ perfect হতে হবে না—শুধু pattern interrupt করুন।</strong>
                <span>৩টি complete = good day • ৬টি = strong behaviour day</span>
            </div>
            <div class="reset-progress-track"><div class="reset-progress-fill" style="width:${percent}%"></div></div>
            <div class="reset-action-list">
                ${actions.map(action => {
                    const isDone = reset.tasks[action.key] === true;
                    return `<button class="reset-action ${isDone ? 'done' : ''}" onclick="app.toggleBehaviourReset('${action.key}')">
                        <span class="reset-action-icon">${action.icon}</span>
                        <span class="reset-action-copy"><strong>${action.title}</strong><small>${action.text}</small></span>
                        <span class="reset-action-check">${isDone ? '✓' : ''}</span>
                    </button>`;
                }).join('')}
            </div>
            <div class="reset-rules">
                <strong>3 Reset Rules</strong>
                <span>① 5-minute rule: ছোট করে এখনই শুরু</span>
                <span>② Repair rule: rude হলে excuse নয়—sorry + softer sentence</span>
                <span>③ No-zero rule: bad day-তেও যেকোনো 1টি action</span>
            </div>
            <p class="reset-note">Missed day মানে failure নয়। পরের ঘণ্টা বা পরের action থেকেই আবার শুরু।</p>
        `;
    }

    toggleBehaviourReset(key) {
        const tasks = this.state.behaviourReset.tasks;
        if (!Object.prototype.hasOwnProperty.call(tasks, key)) return;
        tasks[key] = !tasks[key];
        if (tasks[key]) this.recordActivity('Behaviour', key);
        this.saveState();
        this.renderBehaviourResetWidget();
        window.cuteAudio.playPop();

        const done = Object.values(tasks).filter(v => v === true).length;
        if (done === 3) {
            this.showMascotDialogue('Good day achieved! ছোট actions-ই real change তৈরি করে। 🌱');
        } else if (done === 6) {
            window.cuteAudio.playChime();
            this.triggerConfetti();
            this.showMascotDialogue('Bonus day! আজ 6টি behaviour reset action-ই complete হয়েছে! ✨');
        }
    }

    startKikiFreeWalk() {
        if (this.kikiWalkTimer) return;

        this.kikiWalkTimer = setInterval(() => {
            const pet = document.getElementById('freeWalkingKikiPet');
            if (!pet) return;

            const maxX = window.innerWidth - 140;
            const maxY = window.innerHeight - 180;

            const randX = Math.max(20, Math.floor(Math.random() * maxX));
            const randY = Math.max(100, Math.floor(Math.random() * maxY));

            // Create sparkle trail at old position
            const trail = document.createElement('div');
            trail.className = 'kiki-sparkle-trail';
            trail.innerHTML = '✨🐾';
            trail.style.left = pet.style.left || '40px';
            trail.style.top = pet.style.top || '80%';
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 1200);

            pet.style.left = `${randX}px`;
            pet.style.top = `${randY}px`;
        }, 14000);
    }

    // 🏆 Overall 100-Day Transformation Analytics Dashboard Card
    renderOverallTransformationWidget() {
        const container = document.getElementById('overallTransformationContainer');
        if (!container) return;

        const currentDay = this.state.challenge.currentDay || 1;
        const dayProgress = Math.round((currentDay / 100) * 100);

        const startW = this.state.goals.startWeightKg || 66.0;
        const currentW = this.state.goals.currentWeightKg || 66.0;
        const targetW = 50.0;
        const lostW = Math.max(0, (startW - currentW));
        const totalToLose = Math.max(0.1, (startW - targetW));
        const weightProgress = Math.min(100, Math.round((lostW / totalToLose) * 100));

        const namajDone = Object.values(this.state.namaj).filter(v => v === true).length;
        const dailyRoutineProgress = this.state.periodTracker.isOnPeriod
            ? 100
            : Math.round((namajDone / 5) * 100);

        // Overall Master Score Combining All Pillars
        const overallScore = Math.min(100, Math.round(
            (dayProgress * 0.2) + (weightProgress * 0.4) + (dailyRoutineProgress * 0.4)
        ));

        // Dynamically Update Confidence Score based on real progress!
        this.state.goals.confidenceScore = Math.min(100, 70 + Math.round(overallScore * 0.3));

        container.innerHTML = `
            <div class="overall-transform-card">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
                    <div>
                        <div style="font-size:0.82rem; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:#a3e635;">
                            🏆 Overall 100-Day Life & Weight Transformation Dashboard
                        </div>
                        <div style="font-size:1.2rem; font-weight:800; margin-top:4px; color:white;">
                            Cumulative Overall Transformation Score
                        </div>
                        <div style="font-size:0.85rem; color:#94a3b8; margin-top:4px;">
                            Tracks overall 100-day journey, weight loss to 50kg, and daily routine consistency!
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:14px;">
                        <div class="overall-score-badge">${overallScore}%</div>
                        <span class="badge-tag" style="background:#84cc16; color:#0f172a; font-weight:800; font-size:0.85rem;">OVERALL MASTERY</span>
                    </div>
                </div>

                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:12px; margin-top:20px;">
                    <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:14px; padding:12px; text-align:center;">
                        <div style="font-size:1.4rem; font-weight:800; color:#a3e635;">${currentDay} / 100</div>
                        <div style="font-size:0.75rem; color:#94a3b8; font-weight:700;">Challenge Days</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:14px; padding:12px; text-align:center;">
                        <div style="font-size:1.4rem; font-weight:800; color:#38bdf8;">${weightProgress}%</div>
                        <div style="font-size:0.75rem; color:#94a3b8; font-weight:700;">Weight Goal (50kg)</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:14px; padding:12px; text-align:center;">
                        <div style="font-size:1.4rem; font-weight:800; color:#f472b6;">${this.state.goals.confidenceScore}%</div>
                        <div style="font-size:0.75rem; color:#94a3b8; font-weight:700;">Self-Confidence</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:14px; padding:12px; text-align:center;">
                        <div style="font-size:1.4rem; font-weight:800; color:#fbbf24;">${this.state.fasting.fastsCountThisWeek || 0}</div>
                        <div style="font-size:0.75rem; color:#94a3b8; font-weight:700;">Fasts Completed</div>
                    </div>
                </div>
            </div>
        `;
    }


    // 🎂 Special Event Checks (My Birthday & Safwan Birthday)
    checkMyBirthday() {
        const todayStr = this.getLocalDateStr();
        const monthDay = todayStr.slice(5); // e.g. "09-12"

        if (monthDay === '09-12') {
            setTimeout(() => {
                const modal = document.getElementById('birthdayModalOverlay');
                if (modal && !modal.classList.contains('active')) {
                    modal.classList.add('active');
                    window.cuteAudio.playFanfare();
                    this.triggerConfetti();
                    this.speakVoice("Happy Birthday to you! May all your dreams, glowy skin, 50kg goal, and fullstack developer career come true! 🎉🎂✨");
                }
            }, 800);
        }

        // Safwan's Birthday Alert
        if (monthDay === '09-29') {
            const bannerContainer = document.getElementById('specialEventBannerContainer');
            if (bannerContainer) {
                bannerContainer.innerHTML = `
                    <div style="background:linear-gradient(135deg, #fdf4ff, #fae8ff); border:2px solid #f0abfc; border-radius:18px; padding:16px 24px; display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; box-shadow:0 10px 25px rgba(232, 121, 249, 0.15);">
                        <div style="display:flex; gap:16px; align-items:center;">
                            <span style="font-size:2.5rem;">🎂🎉</span>
                            <div>
                                <h3 style="margin:0; font-weight:800; color:#86198f; font-size:1.3rem;">Happy Birthday, Safwan!</h3>
                                <p style="margin:4px 0 0; color:#a21caf; font-weight:600; font-size:0.95rem;">Don't forget to wish Safwan today and celebrate his special day!</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    }

    closeBirthdayModal() {
        const modal = document.getElementById('birthdayModalOverlay');
        if (modal) modal.classList.remove('active');
    }

    // 💬 Loving Gentle Reminder Engine
    triggerCuteScolding() {
        window.cuteAudio.playChime();

        const catContainer = document.getElementById('mascotCatContainer');
        const bubble = document.getElementById('mascotSpeechBubble');

        if (catContainer) {
            catContainer.style.transform = 'scale(1.15) rotate(-6deg)';
        }
        if (bubble) {
            bubble.style.background = '#fef9c3';
            bubble.style.color = '#713f12';
            bubble.style.borderColor = '#fde047';
        }

        const reminders = [
            "Hey sweetheart! Reminding you gently: Have you completed your Namaj & drunk 3L water today? You've got this! 🌸✨",
            "A friendly Kiwi reminder! Stay away from milk tea & fast food today for that glowing flawless skin! 🥝💖",
            "You are doing amazing! Take a 5-minute break, comb your hair, and keep shining on your 50kg journey! 🌟",
            "Time to practice coding! HTML, CSS & Laravel are waiting for your brilliant mind! 💻✨"
        ];
        const rand = reminders[Math.floor(Math.random() * reminders.length)];
        this.showMascotDialogue(rand);

        setTimeout(() => {
            if (catContainer) catContainer.style.transform = 'none';
            if (bubble) {
                bubble.style.background = '#ffffff';
                bubble.style.color = '#1e293b';
                bubble.style.borderColor = 'var(--kiwi-300)';
            }
        }, 4500);
    }

    // 🤖 Automatic Mascot Guidance Engine
    autoUpdateMascotMood() {
        const namajDone = Object.values(this.state.namaj).filter(v => v === true).length;
        const waterL = this.state.checklist.waterLitersLogged || 0;
        const noTea = this.state.checklist.noMilkTea;

        const isFullyDone = namajDone === 5 && waterL >= 3.0 && noTea;

        const catBody = document.getElementById('kiwiCatBody');
        const catContainer = document.getElementById('mascotCatContainer');
        const bubble = document.getElementById('mascotSpeechBubble');

        if (!isFullyDone) {
            if (catBody) catBody.style.background = 'linear-gradient(135deg, #a3e635 0%, #65a30d 100%)';
            if (catContainer) catContainer.style.filter = 'drop-shadow(0 0 16px rgba(132, 204, 22, 0.4))';
            if (bubble) {
                bubble.style.background = '#ffffff';
                bubble.style.color = '#1e293b';
                bubble.style.borderColor = 'var(--kiwi-300)';
            }
        } else {
            if (catBody) catBody.style.background = 'linear-gradient(135deg, #a3e635 0%, #65a30d 100%)';
            if (catContainer) catContainer.style.filter = 'drop-shadow(0 0 20px rgba(244, 114, 182, 0.6))';
            if (bubble) {
                bubble.style.background = '#f0fdf4';
                bubble.style.color = '#14532d';
                bubble.style.borderColor = '#84cc16';
                bubble.innerText = "YAY! Super proud of you! Daily tasks completed! Glowy skin & 50kg goal ongoing! 🌸✨";
            }
        }
    }


    // 🐱 Interactive Pet Kiki Cat Creature with Flower 🌸 & Chocolate 🍫 Gift Animation
    petKikiCat() {
        window.cuteAudio.playChime();
        this.triggerConfetti();

        const catContainer = document.getElementById('mascotCatContainer');
        const bubble = document.getElementById('mascotSpeechBubble');

        if (catContainer) {
            catContainer.style.transform = 'scale(1.25) rotate(10deg)';
            catContainer.style.filter = 'drop-shadow(0 0 20px rgba(244, 114, 182, 0.7))';
        }
        if (bubble) {
            bubble.style.background = 'linear-gradient(135deg, #fce7f3, #fbcfe8)';
            bubble.style.color = '#831843';
            bubble.style.borderColor = '#f472b6';
        }

        // Spawn floating Flower 🌸 & Chocolate 🍫 Gifts
        const petEl = document.getElementById('mascotCatContainer') || document.querySelector('.magical-kiwi-cat');
        const rect = petEl ? petEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2 };

        const gifts = ['🌸', '🍫', '💖', '🌺', '🍫'];
        gifts.forEach((item, i) => {
            setTimeout(() => {
                const giftEl = document.createElement('div');
                giftEl.className = 'floating-pet-gift';
                giftEl.innerText = item;
                giftEl.style.left = `${rect.left + 15 + (i * 20)}px`;
                giftEl.style.top = `${rect.top - 10}px`;
                document.body.appendChild(giftEl);
                setTimeout(() => giftEl.remove(), 1600);
            }, i * 140);
        });

        const dialogues = [
            "Awww! Thank you so much for the beautiful flower 🌸 and chocolate 🍫! I love you so much! 🐱💖",
            "Purrrrr~ Yum! Flower 🌸 and chocolate 🍫 gift for me! You are the sweetest! Let's reach 50kg & developer goal together! 🌸✨",
            "Meow! Receiving your flower 🌸 and chocolate 🍫 makes me super happy! Day 1 starts 9th August! 🌟"
        ];
        const rand = dialogues[Math.floor(Math.random() * dialogues.length)];
        this.showMascotDialogue(rand);

        setTimeout(() => {
            if (catContainer) {
                catContainer.style.transform = 'none';
                catContainer.style.filter = 'none';
            }
            if (bubble) {
                bubble.style.background = '#ffffff';
                bubble.style.color = '#1e293b';
                bubble.style.borderColor = 'var(--kiwi-300)';
            }
        }, 4000);
    }


    // 👗 Dynamic Outfit & Getup Engine (Weather, Mood & Time based!)
    updateKikiOutfit() {
        const hour = new Date().getHours();
        const weatherCond = (this.state.weather.condition || '').toLowerCase();
        
        const outfitEls = document.querySelectorAll('.kiki-accessory-container');
        outfitEls.forEach(container => {
            if (hour >= 21 || hour < 6) {
                container.innerHTML = '<span class="kiki-accessory kiki-sleep-cap">💤</span>'; // Night Sleep Cap
            } else if (weatherCond.includes('rain') || weatherCond.includes('cloud')) {
                container.innerHTML = '<span class="kiki-accessory kiki-umbrella">☂️</span>'; // Rainy Umbrella
            } else if (hour >= 6 && hour < 18) {
                container.innerHTML = '<span class="kiki-accessory kiki-sunglasses">🕶️</span>'; // Sunny Sunglasses
            } else {
                container.innerHTML = '<span class="kiki-accessory kiki-crown">👑</span>'; // Golden Crown
            }
        });
    }


    // 🏆 100-Day Challenge Banner (Day 1 starts 9th August 2026)
    renderChallengeBanner() {
        const start = new Date('2026-08-09');
        const now = new Date();
        const diffDays = Math.floor((now - start) / 86400000);
        
        let currentDay = Math.max(1, Math.min(100, diffDays + 1));
        if (now < start) {
            currentDay = 1; // Prior to Aug 9, Day 1 is starting tomorrow!
        }
        this.state.challenge.currentDay = currentDay;

        const total = this.state.challenge.totalDays;
        const remaining = total - currentDay;

        const dayElem = document.getElementById('challengeCurrentDay');
        const remElem = document.getElementById('challengeRemainingDays');
        const progElem = document.getElementById('challengeProgressBar');

        if (dayElem) dayElem.innerText = currentDay;
        if (remElem) remElem.innerText = remaining;
        if (progElem) progElem.style.width = `${(currentDay / total) * 100}%`;
    }

    // 🎁 AI Surprise Quest Engine
    renderSurpriseQuestWidget() {
        const container = document.getElementById('surpriseQuestContainer');
        if (!container) return;

        const quest = this.state.activeQuest;
        const rewards = this.state.rewardsUnlocked || 0;

        if (!quest) {
            container.innerHTML = `
                <div style="text-align:center; padding:18px; background:var(--kiwi-50); border:2px dashed var(--kiwi-300); border-radius:18px;">
                    <div style="font-size:2.2rem; margin-bottom:6px;">🎁</div>
                    <div style="font-weight:800; font-size:1.05rem; color:var(--kiwi-800);">No Active Quest Drawn Today</div>
                    <p style="font-size:0.84rem; color:var(--text-muted); margin:6px 0 14px 0;">Draw a spontaneous wholesome quest (Kindness, Mini-walk, Loved One Gift, or Tech concept)!</p>
                    <button class="btn-primary-block" style="width:auto; padding:10px 24px; display:inline-block;" onclick="app.drawSurpriseQuest()">
                        🎁 Draw Today's AI Surprise Quest!
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div style="background:linear-gradient(135deg, #ffffff 0%, #f7fee7 100%); border:2px solid var(--kiwi-400); border-radius:18px; padding:20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <div style="font-weight:800; font-size:1.1rem; color:var(--kiwi-800);">${quest.title}</div>
                    <span class="badge-tag" style="background:#f472b6; color:white;">SURPRISE QUEST</span>
                </div>
                <p style="font-size:0.92rem; color:var(--text-main); font-weight:600; margin-bottom:14px;">${quest.desc}</p>
                <div style="font-size:0.85rem; font-weight:700; color:#c2410c; background:#ffedd5; padding:8px 14px; border-radius:12px; margin-bottom:16px; display:inline-block;">
                    🏆 <strong>Reward on Completion:</strong> ${quest.reward}
                </div>

                <div style="display:flex; gap:10px;">
                    <button class="btn-primary-block" style="flex:2;" onclick="app.completeSurpriseQuest()">
                        ✓ Complete Quest & Claim Treat Voucher! 🎉
                    </button>
                    <button class="btn-icon-pill" style="flex:1; justify-content:center;" onclick="app.drawSurpriseQuest()">
                        🔄 New Quest
                    </button>
                </div>
            </div>
            ${rewards > 0 ? `
                <div style="margin-top:10px; font-size:0.85rem; font-weight:800; color:var(--kiwi-800); text-align:center;">
                    🎉 Unlocked Reward Vouchers: ${rewards} x (Fuska / Chocolate Treat Day Unlocked!)
                </div>
            ` : ''}
        `;
    }

    drawSurpriseQuest() {
        window.cuteAudio.playFanfare();
        this.triggerConfetti();

        const randIndex = Math.floor(Math.random() * this.questPool.length);
        this.state.activeQuest = this.questPool[randIndex];
        this.saveState();
        this.renderSurpriseQuestWidget();

        this.showMascotDialogue(`🎁 New AI Surprise Quest Drawn: "${this.state.activeQuest.title}"! Complete it to unlock your Fuska/Chocolate Treat Voucher! 🌟`);
    }

    completeSurpriseQuest() {
        if (!this.state.activeQuest) return;

        window.cuteAudio.playFanfare();
        this.triggerConfetti();

        this.state.rewardsUnlocked = (this.state.rewardsUnlocked || 0) + 1;
        this.state.completedQuestsCount = (this.state.completedQuestsCount || 0) + 1;
        this.state.activeQuest = null;

        this.saveState();
        this.renderSurpriseQuestWidget();

        this.showMascotDialogue("🎉 CONGRATULATIONS! Spontaneous Quest Completed! You unlocked 1 Fuska/Chocolate Treat Day Voucher! Super proud of you! ❤️🍫🍢");
    }

    // 🕒 Live Digital Clock & Real-time Task Cutoff
    startLiveClock() {
        const updateClock = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
            const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

            const clockEl = document.getElementById('liveClockTime');
            const dateEl = document.getElementById('liveClockDate');

            if (clockEl) clockEl.innerText = timeStr;
            if (dateEl) dateEl.innerText = dateStr;

            // Auto-Miss Namaj Real-Time Expiration Check
            const h = now.getHours();
            const m = now.getMinutes();
            const timeNum = h + m / 60; // decimal hours
            
            const cutoffs = {
                fajr: 6.5,       // 6:30 AM
                dhuhr: 16.0,     // 4:00 PM
                asr: 17.5,       // 5:30 PM
                maghrib: 19.5,   // 7:30 PM
                isha: 23.99      // 11:59 PM
            };

            let changed = false;
            for (let [namajKey, limit] of Object.entries(cutoffs)) {
                if (timeNum > limit && this.state.namaj[namajKey] === false) {
                    this.state.namaj[namajKey] = 'missed';
                    changed = true;
                }
            }
            if (changed) {
                this.saveState();
                this.renderNamajWidget();
                this.renderDonutChart();
            }
        };

        updateClock();
        setInterval(updateClock, 1000);
    }

    // 🌤️ Live Weather Forecast (Open-Meteo Free API)
    async fetchLiveWeather() {
        try {
            // Default location: Dhaka (23.8103, 90.4125)
            const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=23.8103&longitude=90.4125&current_weather=true');
            const data = await res.json();
            
            if (data && data.current_weather) {
                const temp = Math.round(data.current_weather.temperature);
                const code = data.current_weather.weathercode;
                
                let icon = '☀️';
                let cond = 'Sunny Sky';

                if (code >= 1 && code <= 3) { icon = '⛅'; cond = 'Partly Cloudy'; }
                else if (code >= 45 && code <= 48) { icon = '🌫️'; cond = 'Foggy'; }
                else if (code >= 51 && code <= 67) { icon = '🌧️'; cond = 'Rainy'; }
                else if (code >= 80 && code <= 82) { icon = '🌦️'; cond = 'Showers'; }
                else if (code >= 95) { icon = '⛈️'; cond = 'Thunderstorm'; }

                const weatherEl = document.getElementById('weatherDisplay');
                if (weatherEl) {
                    weatherEl.innerHTML = `
                        <span style="font-size:1.6rem; margin-right:6px;">${icon}</span>
                        <div>
                            <div style="font-weight:800; font-size:1.05rem; color:var(--kiwi-800);">${temp}°C • ${cond}</div>
                            <div style="font-size:0.75rem; color:var(--text-muted);">Dhaka, Bangladesh</div>
                        </div>
                    `;
                }
            }
        } catch (e) {
            console.log("Weather fetch fallback", e);
        }
    }

    // 📝 One-Day Quick Notes & Reminders
    renderQuickNotesWidget() {
        const container = document.getElementById('quickNotesContainer');
        if (!container) return;

        const notes = this.state.quickNotes || [];

        if (notes.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; color:var(--text-muted); padding:16px;">
                    <div style="font-size:1.8rem; margin-bottom:4px;">📝</div>
                    <div style="font-weight:700; font-size:0.92rem;">No Quick Notes Added For Today/Tomorrow</div>
                    <p style="font-size:0.78rem; margin-top:2px;">Add 1-day temporary notes or tomorrow's task reminders below!</p>
                </div>
            `;
            return;
        }

        let html = '';
        notes.forEach(n => {
            html += `
                <div class="checklist-item" style="background:#ffffff; border-color:var(--kiwi-200); margin-bottom:8px;">
                    <div class="checklist-left">
                        <span style="font-size:1.2rem;">📌</span>
                        <span class="checklist-text" style="font-size:0.92rem;">${n.text}</span>
                    </div>
                    <button class="btn-icon-pill" style="padding:4px 10px; font-size:0.78rem; background:var(--kiwi-100); color:var(--kiwi-800); border:none;" onclick="app.deleteQuickNote('${n.id}')">
                        ✓ Clear
                    </button>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    addQuickNote() {
        const input = document.getElementById('quickNoteInput');
        if (!input) return;

        const text = input.value.trim();
        if (!text) return;

        if (!this.state.quickNotes) this.state.quickNotes = [];

        this.state.quickNotes.push({
            id: Date.now().toString(),
            text: text,
            createdAt: new Date().toISOString()
        });

        input.value = '';
        this.saveState();
        this.renderQuickNotesWidget();
        window.cuteAudio.playChime();
        this.showMascotDialogue("One-Day note added! It will stay handy for today/tomorrow! 📝✨");
    }

    deleteQuickNote(id) {
        this.state.quickNotes = (this.state.quickNotes || []).filter(n => n.id !== id);
        this.saveState();
        this.renderQuickNotesWidget();
        window.cuteAudio.playPop();
    }

    cleanupExpiredNotes() {
        const oneDayMs = 24 * 60 * 60 * 1000;
        const now = Date.now();
        if (this.state.quickNotes) {
            this.state.quickNotes = this.state.quickNotes.filter(n => {
                const created = new Date(n.createdAt).getTime();
                return (now - created) < (oneDayMs * 2); // Auto clear notes older than ~24-48 hrs
            });
            this.saveState();
        }
    }


    // Challenge Progress Banner
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

    // 🕌 5 Waqt Namaj Widget with Individual Task Hiding
    renderNamajWidget() {
        const grid = document.getElementById('namajGrid');
        if (!grid) return;

        if (this.state.periodTracker.isOnPeriod) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align:center; padding:20px; background:#fdf2f8; border:2px dashed #fbcfe8; border-radius:18px;">
                    <div style="font-size:2.2rem; margin-bottom:4px;">🌸</div>
                    <div style="font-weight:800; font-size:1.1rem; color:#be185d;">Period Break: Namaj Excused</div>
                    <p style="font-size:0.84rem; color:#831843; margin-top:4px;">During your period, namaj is not required. Take rest and care for yourself!</p>
                </div>
            `;
            document.getElementById('namajBadge').innerText = `Excused 🌸`;
            return;
        }

        const prayers = [
            { key: 'fajr', name: 'Fajr', time: 'Bhor / Dawn', icon: '🌅' },
            { key: 'dhuhr', name: 'Dhuhr', time: 'Dupur / Noon', icon: '☀️' },
            { key: 'asr', name: 'Asr', time: 'Bikel / Afternoon', icon: '🌤️' },
            { key: 'maghrib', name: 'Maghrib', time: 'Sondhya / Evening', icon: '🌆' },
            { key: 'isha', name: 'Isha', time: 'Rat / Night', icon: '🌙' }
        ];

        const showCompleted = this.state.settings.showCompletedItems;
        let html = '';
        let completedCount = 0;

        prayers.forEach(p => {
            const val = this.state.namaj[p.key];
            const isDone = val === true;
            const isMissed = val === 'missed';
            if (isDone) completedCount++;

            const hideClass = ((isDone || isMissed) && !showCompleted) ? 'hide-completed' : '';

            html += `
                <div class="namaj-card task-anim-item ${isDone ? 'completed' : ''} ${isMissed ? 'missed' : ''} ${hideClass}" onclick="app.toggleNamaj('${p.key}')">
                    <span class="namaj-icon">${p.icon}</span>
                    <div class="namaj-name">${p.name}</div>
                    <div class="namaj-time">${p.time}</div>
                    <div class="namaj-status-check">${isDone ? '✓' : (isMissed ? '❌' : '')}</div>
                </div>
            `;
        });

        if (completedCount === 5 && !showCompleted) {
            html += `
                <div style="grid-column: 1 / -1; text-align:center; padding:20px; background:var(--kiwi-50); border:2px dashed var(--kiwi-300); border-radius:18px;">
                    <div style="font-size:2.2rem; margin-bottom:4px;">🎉🕌</div>
                    <div style="font-weight:800; font-size:1.1rem; color:var(--kiwi-800);">Alhamdulillah! All 5 Waqt Namaj Completed Today!</div>
                    <p style="font-size:0.84rem; color:var(--text-muted); margin-top:4px;">Every prayer completed & hidden cleanly for peaceful mind!</p>
                </div>
            `;
        }

        grid.innerHTML = html;
        document.getElementById('namajBadge').innerText = `${completedCount}/5 Done`;
    }

    toggleNamaj(key) {
        this.state.namaj[key] = !this.state.namaj[key];
        this.saveState();

        if (this.state.namaj[key] === true) {
            this.recordActivity('Namaj', key.toUpperCase());
            window.cuteAudio.playChime();
            this.showMascotDialogue(`MashAllah! ${key.toUpperCase()} namaj pora done! Cleanly recorded & completed! 🕌✨`);
        } else {
            window.cuteAudio.playPop();
        }

        this.renderNamajWidget();
        this.renderDonutChart();

        const allDone = Object.values(this.state.namaj).every(v => v === true);
        if (allDone) {
            window.cuteAudio.playFanfare();
            this.triggerConfetti();
            this.showMascotDialogue("Alhamdulillah! Ajker 5 Waqt Namaj shob completed! Tumi sotti unique & peaceful! 🌟🎉");
        }
    }
    // ⏱️ Work, Study & Practice Timers Widget
    renderTimersWidget() {
        const grid = document.getElementById('timersGrid');
        if (!grid) return;

        const showCompleted = this.state.settings.showCompletedItems;

        const timerDefs = [
            { key: 'intern', title: '1 Hr Intern Work', icon: '💼', targetSec: 3600 },
            { key: 'report', title: '1 Hr Report / Study', icon: '📝', targetSec: 3600 },
            { key: 'practice', title: '2 Hr Coding Practice', icon: '💻', targetSec: 7200 },
            { key: 'walk', title: '30 Min Walk (Ada gonta)', icon: '🏃‍♀️', targetSec: 1800 }
        ];

        let html = '';
        timerDefs.forEach(t => {
            const data = this.state.timers[t.key] || { timeSpent: 0, targetSec: t.targetSec, running: false, done: false, missed: false };
            
            // Backward timing logic
            let remaining = t.targetSec - data.timeSpent;
            let displayStr = '';
            let extraClass = '';
            
            if (remaining > 0) {
                displayStr = this.formatTime(remaining);
            } else {
                displayStr = "00:00 (Done!)";
                const extraTime = Math.abs(remaining);
                if (extraTime > 0) {
                    displayStr += ` <br><span style="font-size:1rem; color:var(--kiwi-600);">+ Extra: ${this.formatTime(extraTime)}</span>`;
                    extraClass = 'timer-display-extra';
                }
            }

            const targetFormatted = this.formatTime(t.targetSec);
            const isDone = data.done || data.timeSpent >= t.targetSec;
            const isMissed = data.missed === true;
            const hideClass = (isDone && !showCompleted) ? 'hide-completed' : '';

            html += `
                <div class="timer-card task-anim-item ${isDone ? 'completed' : ''} ${isMissed ? 'missed' : ''} ${hideClass}">
                    <div>
                        <div class="timer-card-header">
                            <div class="timer-icon-bg">${t.icon}</div>
                            <div>
                                <div class="timer-title">${t.title}</div>
                                <div class="timer-target">Target: ${targetFormatted}</div>
                            </div>
                        </div>
                        <div class="timer-display ${extraClass}" id="timerDisplay_${t.key}" style="line-height:1.2;">${displayStr}</div>
                    </div>
                    <div class="timer-controls">
                        ${!data.running ? `
                            <button class="btn-timer btn-timer-start" onclick="app.startTimer('${t.key}')">▶ Start</button>
                        ` : `
                            <button class="btn-timer btn-timer-pause" onclick="app.pauseTimer('${t.key}')">⏸ Pause</button>
                        `}
                        <button class="btn-timer ${isDone ? 'btn-timer-done' : 'btn-timer-reset'}" onclick="app.toggleTimerDone('${t.key}')">
                            ${isDone ? '✓ Completed' : 'Mark Done'}
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
            const spent = this.state.timers[key].timeSpent;
            
            let displayStr = '';
            if (spent < target) {
                displayStr = this.formatTime(target - spent);
            } else {
                displayStr = "00:00 (Done!)";
                const extraTime = spent - target;
                if (extraTime > 0) {
                    displayStr += ` <br><span style="font-size:1rem; color:var(--kiwi-600);">+ Extra: ${this.formatTime(extraTime)}</span>`;
                }
            }
            
            const displayEl = document.getElementById(`timerDisplay_${key}`);
            if (displayEl) {
                displayEl.innerHTML = displayStr;
            }

            if (spent === target && !this.state.timers[key].done) {
                this.state.timers[key].done = true;
                this.recordActivity('Timer', key);
                window.cuteAudio.playFanfare();
                this.triggerConfetti();
                this.showMascotDialogue(`Hurrah! ${key.toUpperCase()} session full completed! Task finished & clean! 🎉`);
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
        if (isDone) {
            this.state.timers[key].missed = false;
            if (this.state.timers[key].timeSpent < this.state.timers[key].targetSec) {
                this.state.timers[key].timeSpent = this.state.timers[key].targetSec;
            }
        }
        this.pauseTimer(key);
        if (isDone) {
            this.recordActivity('Timer', key);
            window.cuteAudio.playChime();
            this.showMascotDialogue(`Awesome! ${key.toUpperCase()} timer task mark done! ✨`);
        }
        this.renderTimersWidget();
        this.renderDonutChart();
    }

    toggleTimerMissed(key) {
        const isMissed = !this.state.timers[key].missed;
        this.state.timers[key].missed = isMissed;
        if (isMissed) {
            this.state.timers[key].done = false;
        }
        this.pauseTimer(key);
        window.cuteAudio.playPop();
        if (isMissed) {
            this.showMascotDialogue(`${key.toUpperCase()} session marked missed. Don't worry, try again tomorrow! 🌸`);
        }
        this.renderTimersWidget();
        this.renderDonutChart();
    }

    // 🥗 Intermittent Fasting Tracker (12hr / 16hr) with Weekly Fasting Counter
    renderFastingWidget() {
        const container = document.getElementById('fastingContainer');
        if (!container) return;

        const targetH = this.state.fasting.targetHours || 16;
        const targetSec = targetH * 3600;
        if (this.state.fasting.running && this.state.fasting.startTime) {
            this.state.fasting.elapsedSec = Math.max(0, Math.floor((Date.now() - this.state.fasting.startTime) / 1000));
        }
        const elapsedSec = this.state.fasting.elapsedSec || 0;
        const isRunning = this.state.fasting.running;
        const isDone = this.state.fasting.done || elapsedSec >= targetSec;
        const percent = Math.min(100, Math.round((elapsedSec / targetSec) * 100));
        const endingAt = isRunning && this.state.fasting.startTime
            ? new Date(this.state.fasting.startTime + (targetSec * 1000))
            : null;
        const endingText = isDone
            ? 'Fasting target reached'
            : endingAt
                ? `Ending time: ${endingAt.toLocaleDateString('en-BD', { day: 'numeric', month: 'short' })}, ${endingAt.toLocaleTimeString('en-BD', { hour: 'numeric', minute: '2-digit' })}`
                : 'Start fasting to see ending time';
        const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        const weeklyFasts = (this.state.fasting.sessions || [])
            .filter(session => session.completed && session.finishedAt >= sevenDaysAgo).length;

        // Render the last seven finished fasting attempts with their actual progress.
        const fastingSessions = this.state.fasting.sessions || [];
        const last7 = fastingSessions.slice(-7);
        let chartHtml = '';
        if (last7.length > 0) {
            chartHtml = `<div style="display:flex; align-items:flex-end; height:60px; gap:6px; margin-top:16px; padding-top:12px; border-top:1px solid var(--kiwi-200);">
                <div style="font-size:0.85rem; font-weight:800; color:var(--kiwi-800); align-self:center; margin-right:8px;">📊 Last 7 Fasts:</div>`;
            last7.forEach(session => {
                const sessionPercent = Math.max(0, Math.min(100, session.percent || 0));
                const h = `${Math.max(6, sessionPercent)}%`;
                const bg = sessionPercent >= 100 ? '#84cc16' : '#fcd34d';
                chartHtml += `
                    <div title="${sessionPercent}% of ${session.targetHours || targetH} hour target" style="display:flex; flex-direction:column; align-items:center; gap:4px;">
                        <div style="width:20px; height:40px; background:var(--kiwi-100); border-radius:4px; display:flex; align-items:flex-end; overflow:hidden;">
                            <div style="width:100%; height:${h}; background:${bg}; transition:height 0.3s ease;"></div>
                        </div>
                        <div style="font-size:0.65rem; color:var(--text-muted); font-weight:700;">${sessionPercent}%</div>
                    </div>
                `;
            });
            chartHtml += `</div>`;
        }

        container.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                <div style="font-weight:700; font-size:1rem; color:var(--text-main)">Fasting Mode Target:</div>
                <div style="display:flex; gap:8px; align-items:center;">
                    <button class="tab-btn ${targetH === 12 ? 'active' : ''}" onclick="app.setFastingTarget(12)">12 Hr Fast</button>
                    <button class="tab-btn ${targetH === 16 ? 'active' : ''}" onclick="app.setFastingTarget(16)">16 Hr Fast</button>
                    <span class="badge-tag" style="background:#ecfccb; color:#3f6212; font-weight:800;">
                        🥗 Fasted ${weeklyFasts} Times This Week
                    </span>
                </div>
            </div>

            <div class="fasting-display" id="fastingDisplay">
                ${elapsedSec >= targetSec ? '00:00:00 (Completed!)' : this.formatTime(targetSec - elapsedSec) + ' Left'}
            </div>
            <div class="fasting-ending-time">${endingText}</div>

            <div class="progress-track" style="margin-bottom:16px; background:var(--kiwi-100);">
                <div class="progress-fill" style="width: ${percent}%; background: linear-gradient(90deg, #84cc16, #65a30d);"></div>
            </div>

            <div class="timer-controls">
                ${!isRunning ? `
                    <button class="btn-timer btn-timer-start" onclick="app.startFasting()">▶ Start Fasting</button>
                ` : `
                    <div style="padding:10px 14px; font-weight:800; color:var(--kiwi-700); background:#fef9c3; border-radius:12px; font-size:0.9rem;">⏳ Fasting in progress...</div>
                `}
                <button class="btn-timer ${isDone ? 'btn-timer-done' : 'btn-timer-reset'}" onclick="app.completeFasting()">
                    ${isDone ? '✓ Fast Completed' : 'Finish Fasting'}
                </button>
            </div>
            ${chartHtml}
        `;
    }

    setFastingTarget(hours) {
        this.state.fasting.targetHours = hours;
        this.saveState();
        this.renderFastingWidget();
        window.cuteAudio.playPop();
    }

    startFasting() {
        const wasRunning = this.state.fasting.running;
        if (!wasRunning) window.cuteAudio.playPop();
        if (this.fastingInterval) clearInterval(this.fastingInterval);

        if (this.state.fasting.done) {
            this.state.fasting.elapsedSec = 0;
            this.state.fasting.done = false;
        }

        this.state.fasting.running = true;
        if (!this.state.fasting.startTime) {
            this.state.fasting.startTime = Date.now() - ((this.state.fasting.elapsedSec || 0) * 1000);
        }
        this.saveState();
        this.renderFastingWidget();

        const updateFastingTimer = () => {
            this.state.fasting.elapsedSec = Math.max(0, Math.floor((Date.now() - this.state.fasting.startTime) / 1000));
            const targetSec = (this.state.fasting.targetHours || 16) * 3600;

            const remaining = targetSec - this.state.fasting.elapsedSec;
            
            const el = document.getElementById('fastingDisplay');
            if (el) {
                if (remaining > 0) {
                    el.innerText = `${this.formatTime(remaining)} Left`;
                } else {
                    el.innerText = "00:00:00 (Completed!)";
                }
            }

            if (this.state.fasting.elapsedSec >= targetSec && !this.state.fasting.done) {
                this.state.fasting.done = true;
                this.pauseFasting(false);
                window.cuteAudio.playFanfare();
                this.triggerConfetti();
                this.showMascotDialogue(`Awesome! ${this.state.fasting.targetHours} Hours Intermittent Fasting Completed! 🥗✨`);
            }
        };

        updateFastingTimer();
        if (this.state.fasting.running) {
            this.fastingInterval = setInterval(updateFastingTimer, 1000);
        }
    }

    pauseFasting(playSound = true) {
        if (playSound) window.cuteAudio.playPop();
        if (this.state.fasting.running && this.state.fasting.startTime) {
            this.state.fasting.elapsedSec = Math.max(0, Math.floor((Date.now() - this.state.fasting.startTime) / 1000));
        }
        if (this.fastingInterval) {
            clearInterval(this.fastingInterval);
            this.fastingInterval = null;
        }
        this.state.fasting.running = false;
        this.state.fasting.startTime = null;
        this.saveState();
        this.renderFastingWidget();
    }

    completeFasting() {
        const fasting = this.state.fasting;
        const targetSec = (fasting.targetHours || 16) * 3600;
        const elapsedSec = Math.min(fasting.elapsedSec || 0, targetSec);
        const percent = Math.min(100, Math.round((elapsedSec / targetSec) * 100));
        const completed = elapsedSec >= targetSec || fasting.done;

        if (!fasting.sessions) fasting.sessions = [];
        if (elapsedSec > 0 || completed) {
            fasting.sessions.push({
                date: this.getLocalDateStr(),
                finishedAt: Date.now(),
                elapsedSec,
                targetHours: fasting.targetHours || 16,
                percent: completed ? 100 : percent,
                completed
            });
            fasting.sessions = fasting.sessions.slice(-30);
        }

        if (completed) {
            fasting.fastsCountThisWeek = (fasting.fastsCountThisWeek || 0) + 1;
            this.recordActivity('Fasting', `${fasting.targetHours || 16} hour fast`);
        }

        if (this.fastingInterval) {
            clearInterval(this.fastingInterval);
            this.fastingInterval = null;
        }
        fasting.startTime = null;
        fasting.elapsedSec = 0;
        fasting.running = false;
        fasting.done = false;
        this.saveState();
        this.renderFastingWidget();
        window.cuteAudio.playChime();
        this.showMascotDialogue(completed
            ? "Fasting completed & logged! Your next fast will start fresh. 🥗✨"
            : `Fasting ended at ${percent}% and your progress was logged. Your next fast will start from zero.`);
    }

    resumeFastingTimerIfNeeded() {
        if (this.state.fasting && this.state.fasting.running) {
            this.startFasting();
        }
    }

    // 🌸 Period & Menstrual Cycle Tracker
    renderPeriodWidget() {
        const container = document.getElementById('periodContainer');
        if (!container) return;

        const lastStart = new Date(this.state.periodTracker.lastPeriodStart || Date.now());
        const cycleDays = this.state.periodTracker.cycleLengthDays || 28;
        const today = new Date();

        const diffTime = Math.abs(today - lastStart);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        const currentCycleDay = (diffDays % cycleDays) + 1;
        const daysUntilNext = cycleDays - currentCycleDay;

        let phase = 'Follicular Phase';
        let tip = 'Glowy skin energy peak! Great time for coding, walk & skincare hydration! 🌸';

        if (currentCycleDay <= 5) {
            phase = 'Period Phase 🩸';
            tip = 'Rest well, drink warm water, avoid cold items & do light walking! 💖';
        } else if (currentCycleDay >= 12 && currentCycleDay <= 16) {
            phase = 'Ovulation Phase ✨';
            tip = 'Peak confidence & glowing radiance! Ideal time for content creation! 🎥';
        } else if (currentCycleDay > 16) {
            phase = 'Luteal Phase 🌿';
            tip = 'Keep diet light, avoid tea & chocolate, sleep early for fresh skin! 🌙';
        }

        container.innerHTML = `
            <div style="background:linear-gradient(135deg, #fff5f8 0%, #fdf2f8 100%); border:1.5px solid #fbcfe8; border-radius:18px; padding:20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <div style="font-weight:800; font-size:1.1rem; color:#be185d;">🌸 Period & Cycle Status</div>
                    <span class="period-phase-badge">${phase}</span>
                </div>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:14px 0;">
                    <div style="background:white; border-radius:14px; padding:12px 16px; text-align:center; border:1px solid #fbcfe8;">
                        <div style="font-family:'Outfit'; font-size:1.8rem; font-weight:800; color:#be185d;">Day ${currentCycleDay}</div>
                        <div style="font-size:0.78rem; color:var(--text-muted);">Current Cycle Day</div>
                    </div>
                    <div style="background:white; border-radius:14px; padding:12px 16px; text-align:center; border:1px solid #fbcfe8;">
                        <div style="font-family:'Outfit'; font-size:1.8rem; font-weight:800; color:#be185d;">${daysUntilNext} Days</div>
                        <div style="font-size:0.78rem; color:var(--text-muted);">Until Next Period</div>
                    </div>
                </div>

                <div style="font-size:0.86rem; color:#831843; font-weight:600; background:white; padding:12px 16px; border-radius:12px; border:1px solid #fbcfe8; margin-bottom:14px;">
                    💡 <strong>Self-Care Tip:</strong> ${tip}
                </div>

                <div style="display:flex; gap:10px; align-items:center;">
                    <label style="font-size:0.84rem; font-weight:700; color:#be185d;">Period Start Date:</label>
                    <input type="date" id="lastPeriodInput" value="${this.state.periodTracker.lastPeriodStart}" style="padding:6px 10px; border-radius:8px; border:1.5px solid #fbcfe8; font-weight:700;" />
                    <button class="btn-icon-pill" style="background:#be185d; color:white; border:none;" onclick="app.savePeriodDate()">Save</button>
                </div>
            </div>
        `;
    }

    savePeriodDate() {
        const val = document.getElementById('lastPeriodInput').value;
        if (val) {
            this.state.periodTracker.lastPeriodStart = val;
            this.saveState();
            this.renderPeriodWidget();
            window.cuteAudio.playChime();
            this.showMascotDialogue("Period cycle date updated! Skincare & self-care guidance synchronized! 🌸✨");
        }
    }

    // 💅 Daily Care, Glowy Skin Diet & Housekeeping Checklist
    // 💅 Daily Care, Glowy Skin Diet & Housekeeping Checklist with Dual Tick (✓) / Cross (❌) Buttons
    renderChecklistWidget() {
        const container = document.getElementById('checklistContainer');
        if (!container) return;

        const showCompleted = this.state.settings.showCompletedItems;

        const items = [
            { key: 'brushTeeth', text: '🪥 Brush Teeth (Morning + Night)', tag: 'Hygiene', bg: 'var(--kiwi-100)', color: 'var(--kiwi-800)' },
            { key: 'properShower', text: '🚿 Proper Shower', tag: 'Self Care', bg: 'var(--kiwi-100)', color: 'var(--kiwi-800)' },
            { key: 'faceWash', text: '🫧 Gentle Face Wash', tag: 'Skin Care', bg: '#fce7f3', color: '#9d174d' },
            { key: 'morningSkinCare', text: '🌅 Morning Moisturizer', tag: 'Skin Care', bg: '#fce7f3', color: '#9d174d' },
            { key: 'sunscreen', text: '☀️ Sunscreen (When Exposed to Daylight)', tag: 'Skin Care', bg: '#fce7f3', color: '#9d174d' },
            { key: 'nightSkinCare', text: '🌙 Night Cleanse + Moisturizer', tag: 'Skin Care', bg: '#fce7f3', color: '#9d174d' },
            { key: 'chulAchrano', text: '🪮 Comb / Tidy Hair', tag: 'Grooming', bg: '#fef9c3', color: '#854d0e' },
            { key: 'cleanOutfit', text: '👗 Clean Comfortable Outfit', tag: 'Grooming', bg: '#fef9c3', color: '#854d0e' },
            { key: 'deodorant', text: '🌸 Deodorant + Freshness', tag: 'Grooming', bg: '#fef9c3', color: '#854d0e' },
            { key: 'lipCare', text: '💄 Lip Balm / Lipstick (Optional)', tag: 'Grooming', bg: '#fef9c3', color: '#854d0e' },
            { key: 'hairOil', text: '🥥 Hair Oil (Weekly 1 Day)', tag: 'Haircare', bg: '#fef9c3', color: '#854d0e' },
            { key: 'shampooConditioner', text: '🧴 Shampoo & Conditioner (Weekly 2 Days)', tag: 'Haircare', bg: '#fef9c3', color: '#854d0e' },
            { key: 'roomGhuchano', text: '🧹 Ghor Clean Kra (Moyla Gulu)', tag: 'Housekeeping', bg: 'var(--kiwi-100)', color: 'var(--kiwi-800)' },
            { key: 'skipDinner', text: '🍽️ Follow Planned Fasting / Balanced Dinner', tag: 'Nutrition', bg: '#ffedd5', color: '#c2410c' },
            { key: 'noMilk', text: '🥛 No Milk', tag: 'Skin Diet', bg: '#ffedd5', color: '#c2410c' },
            { key: 'noFastfood', text: '🍔 Skip Fast Food', tag: 'Skin Diet', bg: '#ffedd5', color: '#c2410c' },
            { key: 'noSoftDrink', text: '🥤 Skip Soft Drink', tag: 'Skin Diet', bg: '#ffedd5', color: '#c2410c' }
        ];

        const waterL = this.state.checklist.waterLitersLogged || 0;
        const fuskaCount = this.state.checklist.fuskaCountThisWeek || 0;

        let html = '';

        items.forEach(item => {
            const val = this.state.checklist[item.key];
            const isDone = val === true;
            const isMissed = val === 'missed';
            const hideClass = (isDone && !showCompleted) ? 'hide-completed' : '';

            html += `
                <div class="checklist-item task-anim-item ${isDone ? 'done' : ''} ${isMissed ? 'missed' : ''} ${hideClass}" onclick="app.toggleChecklistItem('${item.key}')">
                    <div class="checklist-left">
                        <div class="custom-checkbox">${isDone ? '✓' : (isMissed ? '❌' : '')}</div>
                        <span class="checklist-text">${item.text}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span class="badge-tag" style="background:${item.bg}; color:${item.color}">${item.tag}</span>
                    </div>
                </div>
            `;
        });

        html += `
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

            <div class="checklist-item" style="border-color:${fuskaCount > 1 ? '#f43f5e' : 'var(--kiwi-100)'}">
                <div class="checklist-left">
                    <span class="checklist-text">🍢 Fuska Eaten This Week (Max 1 time/week):</span>
                </div>
                <div class="counter-input-group">
                    <button class="counter-btn" onclick="event.stopPropagation(); app.updateFuskaCount(-1)">-</button>
                    <span class="counter-value" style="color:${fuskaCount > 1 ? '#f43f5e' : 'inherit'}">${fuskaCount}/1</span>
                    <button class="counter-btn" onclick="event.stopPropagation(); app.updateFuskaCount(1)">+</button>
                </div>
            </div>

        `;

        container.innerHTML = html;
    }

    toggleChecklistItem(key) {
        this.state.checklist[key] = !this.state.checklist[key];
        this.saveState();
        this.renderChecklistWidget();
        this.renderDonutChart();

        if (this.state.checklist[key]) {
            this.recordActivity('Care', key);
            window.cuteAudio.playChime();
            this.showMascotDialogue("Wonderful! Habit checked & completed cleanly! ✨🌸");
        } else {
            window.cuteAudio.playPop();
        }
    }

    updateWaterLiters(delta) {
        this.state.checklist.waterLitersLogged = Math.max(0, Math.min(5, (this.state.checklist.waterLitersLogged || 0) + delta));
        this.saveState();
        this.renderChecklistWidget();
        this.renderDonutChart();
        window.cuteAudio.playPop();

        if (this.state.checklist.waterLitersLogged >= 3) {
            window.cuteAudio.playFanfare();
            this.showMascotDialogue("Yay! 3 Liters water complete today! Skin will glow like a star! ✨💧");
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
            this.showMascotDialogue("😾 Hey! Weekly 1-er beshi fuska khawa jabe na! Glowy skin & 50kg target fail hoye jabe! Control koro! 🍢");
        }
    }

    updateJobApps(delta) {
        this.state.goals.jobApplicationsCount = Math.max(0, this.state.goals.jobApplicationsCount + delta);
        this.saveState();
        this.renderChecklistWidget();
        const careerCount = document.getElementById('careerJobCount');
        if (careerCount) careerCount.textContent = this.state.goals.jobApplicationsCount;
        window.cuteAudio.playPop();

        if (delta > 0) {
            this.showMascotDialogue(`Great job! Total ${this.state.goals.jobApplicationsCount} job application complete! Dream job is coming soon! 💼🚀`);
        }
    }

    // 💻 Tech Skill Mastery Roadmap
    renderTechWidget() {
        const grid = document.getElementById('techGrid');
        if (!grid) return;

        const showCompleted = this.state.settings.showCompletedItems;

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
            const val = this.state.techLearning[t.key];
            const isDone = val === true;
            const isMissed = val === 'missed';
            // Disable auto-hide for Tech Mastery so you can see what you practiced
            const hideClass = '';

            html += `
                <div class="tech-card task-anim-item ${isDone ? 'completed' : ''} ${isMissed ? 'missed' : ''} ${hideClass}" onclick="app.toggleTech('${t.key}')">
                    <span class="tech-icon">${t.icon}</span>
                    <div class="tech-name">${t.name}</div>
                    <div class="tech-tag">${t.tag}</div>
                    <div style="margin-top:8px; font-size:0.8rem; font-weight:700; color:var(--kiwi-700)">
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
        this.renderDonutChart();

        if (this.state.techLearning[key]) {
            this.recordActivity('Tech', key.toUpperCase());
            window.cuteAudio.playChime();
            this.showMascotDialogue(`Awesome! ${key.toUpperCase()} coding practice finished & recorded! 💻🔥`);
        } else {
            window.cuteAudio.playPop();
        }
    }

    // 🎯 Personal Transformation Targets & Ultra-Modern Weight Loss Visualizer
    renderGoalsWidget() {
        const container = document.getElementById('goalsContainer');
        if (!container) return;

        const startW = this.state.goals.startWeightKg || 66.0;
        const targetW = this.state.goals.targetWeightKg || 50.0;
        const currentW = this.state.goals.currentWeightKg || 66.0;

        const totalToLose = Math.max(0.1, (startW - targetW)).toFixed(1);
        const weightLost = Math.max(0, (startW - currentW)).toFixed(1);
        const weightRemaining = Math.max(0, (currentW - targetW)).toFixed(1);
        const journeyPercent = Math.min(100, Math.max(0, Math.round((weightLost / totalToLose) * 100)));

        const ideas = this.state.goals.contentIdeasCount;
        const conf = this.state.goals.confidenceScore;

        container.innerHTML = `
            <!-- Modern High-End Weight HUD Grid Cards -->
            <div class="weight-hud-grid">
                <div class="weight-hud-card">
                    <div class="weight-hud-val">${startW} <span style="font-size:1rem;">kg</span></div>
                    <div class="weight-hud-label">Start Weight</div>
                </div>
                <div class="weight-hud-card" style="background:linear-gradient(135deg, #ecfccb, #d9f99d); border-color:#a3e635;">
                    <div class="weight-hud-val" style="color:#4d7c0f;">-${weightLost} <span style="font-size:1rem;">kg</span></div>
                    <div class="weight-hud-label" style="color:#3f6212;">Lost So Far 🎉</div>
                </div>
                <div class="weight-hud-card" style="background:#fefce8; border-color:#fde047;">
                    <div class="weight-hud-val" style="color:#854d0e;">${weightRemaining} <span style="font-size:1rem;">kg</span></div>
                    <div class="weight-hud-label" style="color:#713f12;">To Reach 50kg 🎯</div>
                </div>
            </div>

            <!-- Weight Journey Progress Track Bar -->
            <div style="background:var(--kiwi-50); border:1.5px solid var(--kiwi-200); border-radius:var(--radius-md); padding:16px 20px; margin-bottom:20px;">
                <div style="display:flex; justify-content:space-between; font-weight:800; font-size:0.92rem; color:var(--kiwi-800); margin-bottom:8px;">
                    <span>Weight Journey to 50kg Goal:</span>
                    <span>${journeyPercent}% Completed</span>
                </div>
                <div class="progress-track" style="height:14px; background:var(--kiwi-200);">
                    <div class="progress-fill" style="width: ${journeyPercent}%; background: linear-gradient(90deg, #84cc16, #65a30d);"></div>
                </div>
            </div>

            <!-- Sleek Weight Submission HUD Input -->
            <div class="goal-item" style="margin-bottom:20px;">
                <div class="goal-header">
                    <div class="goal-title">⚖️ Log Current Weight (Target: 50.0 kg)</div>
                    <div class="goal-val">${currentW} kg / 50.0 kg</div>
                </div>

                <div style="display:flex; gap:12px; align-items:flex-end; flex-wrap:wrap; margin-top:12px;">
                    <div>
                        <label style="font-size:0.78rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;">Start Weight (kg):</label>
                        <input type="number" step="0.5" id="startWeightInput" value="${startW}" style="width:110px; padding:8px 12px; border-radius:10px; border:1.5px solid var(--kiwi-300); font-weight:700; font-size:1rem;" />
                    </div>
                    <div>
                        <label style="font-size:0.78rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;">Current Weight (kg):</label>
                        <input type="number" step="0.5" id="weightInput" value="${currentW}" style="width:110px; padding:8px 12px; border-radius:10px; border:1.5px solid var(--kiwi-300); font-weight:700; font-size:1rem;" />
                    </div>
                    <button class="btn-icon-pill" style="background:var(--kiwi-600); color:white; border:none; padding:10px 22px; font-size:0.92rem;" onclick="app.submitWeight()">Submit Weight Log</button>
                    <button class="btn-icon-pill" style="background:var(--kiwi-100); color:var(--kiwi-800); border:none; padding:10px 14px; font-size:0.82rem;" onclick="app.resetWeightHistory()">🧹 Reset Weight Data</button>
                </div>
            </div>


            <!-- High-End Canvas Area Line Chart Wrapper -->
            <div class="weight-chart-wrapper">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                    <div style="font-weight:800; font-size:1.05rem; color:var(--kiwi-800);">📈 Weight Loss Trajectory (66kg ➔ 50kg Target)</div>
                    <span class="badge-tag" style="background:var(--kiwi-100); color:var(--kiwi-800);">Goal: 50 kg</span>
                </div>
                <div style="width:100%; height:200px; position:relative;">
                    <canvas id="weightChartCanvas" width="600" height="200" style="width:100%; height:200px; display:block;"></canvas>
                </div>
            </div>



            <div class="goal-item">
                <div class="goal-header">
                    <div class="goal-title">🧠 Self-Confidence & Financial Independence</div>
                    <div class="goal-val">${conf}% Peak Confidence</div>
                </div>
                <div class="progress-track" style="margin-top:6px; height:10px; background:var(--kiwi-100)">
                    <div class="progress-fill" style="width: ${conf}%; background: linear-gradient(90deg, #84cc16, #65a30d);"></div>
                </div>
            </div>
        `;

        setTimeout(() => this.renderWeightChart(), 60);
    }

    // 📈 Ultra-Modern Canvas 2D Gradient Smooth Bezier Area Chart
    renderWeightChart() {
        const canvas = document.getElementById('weightChartCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width = 600;
        const height = canvas.height = 200;

        let history = this.state.goals.weightHistory || [];
        if (history.length === 0) {
            history = [{ date: 'Start', weight: 66.0 }];
        }

        ctx.clearRect(0, 0, width, height);

        const paddingX = 50;
        const paddingY = 40;
        const graphWidth = width - (paddingX * 2);
        const graphHeight = height - (paddingY * 2);

        const weights = history.map(h => h.weight);
        weights.push(66.0);
        weights.push(50.0); // Include target 50kg

        const maxW = Math.max(...weights) + 2;
        const minW = Math.min(...weights) - 2;

        const getX = (idx) => {
            const divisor = history.length > 1 ? (history.length - 1) : 1;
            return paddingX + (idx / divisor) * graphWidth;
        };

        const getY = (w) => {
            return height - paddingY - (((w - minW) / (maxW - minW)) * graphHeight);
        };

        // 1. Draw Target 50kg Glowing Gold Line
        const targetY = getY(50.0);
        ctx.strokeStyle = '#f59e0b';
        ctx.setLineDash([6, 6]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(paddingX, targetY);
        ctx.lineTo(width - paddingX, targetY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#b45309';
        ctx.font = '700 0.78rem "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Target 50.0 kg Goal 🎯', width - paddingX - 110, targetY - 8);

        // 2. Draw Smooth Bezier Curved Area Gradient Fill
        if (history.length >= 1) {
            const points = history.map((h, idx) => ({
                x: getX(idx),
                y: getY(h.weight)
            }));

            // Area Gradient Fill under curve
            const areaGrad = ctx.createLinearGradient(0, paddingY, 0, height - paddingY);
            areaGrad.addColorStop(0, 'rgba(132, 204, 22, 0.35)');
            areaGrad.addColorStop(1, 'rgba(132, 204, 22, 0.01)');

            ctx.beginPath();
            ctx.moveTo(points[0].x, height - paddingY);
            ctx.lineTo(points[0].x, points[0].y);

            for (let i = 0; i < points.length - 1; i++) {
                const xc = (points[i].x + points[i + 1].x) / 2;
                const yc = (points[i].y + points[i + 1].y) / 2;
                ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
            }
            if (points.length > 1) {
                const last = points[points.length - 1];
                ctx.lineTo(last.x, last.y);
            }

            ctx.lineTo(points[points.length - 1].x, height - paddingY);
            ctx.closePath();
            ctx.fillStyle = areaGrad;
            ctx.fill();

            // 3. Draw Vibrant Glowing Curved Stroke Line
            ctx.beginPath();
            ctx.strokeStyle = '#65a30d';
            ctx.lineWidth = 4;

            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 0; i < points.length - 1; i++) {
                const xc = (points[i].x + points[i + 1].x) / 2;
                const yc = (points[i].y + points[i + 1].y) / 2;
                ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
            }
            if (points.length > 1) {
                const last = points[points.length - 1];
                ctx.lineTo(last.x, last.y);
            }
            ctx.stroke();

            // 4. Draw Glowing Data Point Pills & Badges
            points.forEach((pt, idx) => {
                const item = history[idx];

                // Outer Glow Circle
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, 8, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(132, 204, 22, 0.3)';
                ctx.fill();

                // Inner Circle
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = '#4d7c0f';
                ctx.fill();

                // Weight Value Badge Label Box
                const text = `${item.weight} kg`;
                ctx.font = '800 0.85rem "Outfit", sans-serif';
                const textWidth = ctx.measureText(text).width;

                ctx.fillStyle = '#3f6212';
                ctx.beginPath();
                ctx.roundRect(pt.x - (textWidth / 2) - 6, pt.y - 30, textWidth + 12, 20, 10);
                ctx.fill();

                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.fillText(text, pt.x, pt.y - 16);
            });
        }
    }

    // ==========================================
    // Modals
    // ==========================================

    openAnalyticsReportModal() {
        this.logCurrentDayToHistory();
        const body = document.getElementById('weeklyReportBody');
        const overlay = document.getElementById('weeklyReportModalOverlay');
        if (!body || !overlay) return;

        const logsByDate = new Map((this.state.historyLogs || []).map(log => [log.date, log]));
        const makeDays = count => {
            const days = [];
            for (let offset = count - 1; offset >= 0; offset--) {
                const date = new Date();
                date.setDate(date.getDate() - offset);
                const dateStr = this.getLocalDateStr(date);
                days.push({ date: dateStr, label: date.toLocaleDateString([], { month: 'short', day: 'numeric' }), log: logsByDate.get(dateStr) || null });
            }
            return days;
        };
        const days30 = makeDays(30);
        const days7 = days30.slice(-7);
        const average = days => Math.round(days.reduce((sum, item) => sum + (item.log?.percent || 0), 0) / days.length);
        const weeklyAvg = average(days7);
        const monthlyAvg = average(days30);
        const activeDays = days30.filter(item => item.log?.active).length;
        const sum = (key, days = days30) => days.reduce((total, item) => total + Number(item.log?.[key] || 0), 0);
        const studyMinutes = sum('studyMinutes');
        const fastingSessions = (this.state.fasting.sessions || []).filter(session => days30.some(day => day.date === session.date && session.completed)).length;
        const avgNamaj = (sum('namajDone') / 30).toFixed(1);
        const avgTech = (sum('techCount') / 30).toFixed(1);
        const avgCare = (sum('careDone') / 30).toFixed(1);
        const recentActivities = (this.state.activityLog || []).filter(item => days30.some(day => day.date === item.date)).slice(-60).reverse();
        const metricBars = [
            ['Namaj', Math.min(100, Math.round((sum('namajDone') / (30 * 5)) * 100)), `${avgNamaj}/5 daily avg`],
            ['Study/Coding', Math.min(100, Math.round(studyMinutes / (30 * 120) * 100)), `${studyMinutes} min total`],
            ['Fasting', Math.min(100, Math.round(fastingSessions / 8 * 100)), `${fastingSessions} completed`],
            ['Tech practice', Math.min(100, Math.round(sum('techCount') / (30 * 6) * 100)), `${avgTech}/6 daily avg`],
            ['Care & room', Math.min(100, Math.round(sum('careDone') / (30 * 2) * 100)), `${avgCare}/2 daily avg`],
            ['Behaviour reset', Math.min(100, Math.round(sum('behaviourDone') / (30 * 6) * 100)), `${sum('behaviourDone')} actions`],
            ['Career recovery', Math.min(100, Math.round(sum('careerDone') / (30 * 4) * 100)), `${sum('careerDone')} actions`]
        ];

        body.innerHTML = `
            <div class="analytics-summary">
                <div><b>${weeklyAvg}%</b><span>7-day average</span></div>
                <div><b>${monthlyAvg}%</b><span>30-day average</span></div>
                <div><b>${activeDays}/30</b><span>Active days</span></div>
                <div><b>${studyMinutes}m</b><span>Study + coding</span></div>
            </div>
            <section class="analytics-section">
                <h3>Daily Score — Last 30 Days</h3>
                <div class="daily-score-chart">
                    ${days30.map(item => `<div class="daily-score-column" title="${item.date}: ${item.log?.percent || 0}%">
                        <span>${item.log?.percent || 0}</span><i style="height:${Math.max(2, item.log?.percent || 0)}%"></i><small>${item.label}</small>
                    </div>`).join('')}
                </div>
            </section>
            <section class="analytics-section">
                <h3>Monthly Category Progress</h3>
                <div class="analytics-metrics">${metricBars.map(metric => `<div class="analytics-metric">
                    <div><b>${metric[0]}</b><span>${metric[2]} • ${metric[1]}%</span></div>
                    <div class="analytics-track"><i style="width:${metric[1]}%"></i></div>
                </div>`).join('')}</div>
            </section>
            <section class="analytics-section">
                <h3>Activity Calendar</h3>
                <div class="activity-calendar">${days30.map(item => `<span class="${item.log?.active ? 'active' : ''}" title="${item.date}">${item.label}<b>${item.log?.active ? '✓' : '—'}</b></span>`).join('')}</div>
            </section>
            <section class="analytics-section">
                <h3>Task Completion Timeline</h3>
                <div class="completion-timeline">${recentActivities.length ? recentActivities.map(item => `<div><time>${item.date} • ${item.time}</time><b>${item.category}</b><span>${item.task}</span></div>`).join('') : '<p>Completion time tracking এখন থেকে শুরু হয়েছে। একটি task complete করলে এখানে সময় দেখা যাবে।</p>'}</div>
            </section>
        `;
        overlay.classList.add('active');
        window.cuteAudio.playPop();
    }

    openWeeklyReportModal() {
        const body = document.getElementById('weeklyReportBody');
        
        let totalLogs = this.state.historyLogs.length;
        if (totalLogs === 0) {
            body.innerHTML = `<div style="padding:20px; text-align:center; color:var(--text-muted);">No history data found to generate a report. Keep progressing!</div>`;
            document.getElementById('weeklyReportModalOverlay').classList.add('active');
            return;
        }

        let sumScore = 0;
        let sumNamaj = 0;
        let sumWater = 0;

        const last7 = this.state.historyLogs.slice(-7);
        const last30 = this.state.historyLogs.slice(-30);

        const avgScore7 = Math.round(last7.reduce((acc, log) => acc + (log.percent || 0), 0) / last7.length);
        const avgScore30 = Math.round(last30.reduce((acc, log) => acc + (log.percent || 0), 0) / last30.length);
        const avgNamaj7 = (last7.reduce((acc, log) => acc + (log.namajDone || 0), 0) / last7.length).toFixed(1);

        body.innerHTML = `
            <div style="background:linear-gradient(135deg, #f0fdf4, #dcfce7); padding:20px; border-radius:18px; border:2px solid var(--kiwi-300); margin-bottom:16px;">
                <div style="font-size:1.05rem; font-weight:800; color:var(--kiwi-800); margin-bottom:10px;">📊 Weekly Average Score (Last 7 Days)</div>
                <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                    <div style="font-size:3.5rem; font-weight:900; color:var(--kiwi-600); line-height:1;">${avgScore7}%</div>
                    <div style="font-size:0.95rem; font-weight:700; color:var(--kiwi-800);">Avg. Namaj: ${avgNamaj7} / 5</div>
                </div>
                <div class="progress-track" style="margin-top:12px; height:12px; background:var(--kiwi-200);">
                    <div class="progress-fill" style="width: ${avgScore7}%; background: linear-gradient(90deg, #84cc16, #65a30d);"></div>
                </div>
            </div>

            <div style="background:var(--kiwi-50); padding:20px; border-radius:18px; border:1.5px solid var(--kiwi-200);">
                <div style="font-size:1.05rem; font-weight:800; color:var(--kiwi-800); margin-bottom:10px;">🗓️ Monthly Average Score (Last 30 Days)</div>
                <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                    <div style="font-size:2.8rem; font-weight:900; color:var(--kiwi-600); line-height:1;">${avgScore30}%</div>
                    <div style="font-size:0.9rem; font-weight:700; color:var(--text-muted);">Overall Consistency</div>
                </div>
                <div class="progress-track" style="margin-top:12px; height:10px; background:white;">
                    <div class="progress-fill" style="width: ${avgScore30}%; background: #a3e635;"></div>
                </div>
            </div>
            
            <div style="margin-top:16px; font-size:0.9rem; color:var(--text-main); font-weight:600; text-align:center;">
                Your performance is getting better! Keep focusing on your self-care and Namaj. 🌸✨
            </div>
        `;

        document.getElementById('weeklyReportModalOverlay').classList.add('active');
        window.cuteAudio.playFanfare();
    }

    closeWeeklyReportModal() {
        document.getElementById('weeklyReportModalOverlay').classList.remove('active');
        window.cuteAudio.playPop();
    }

    openAppGuideModal() {
        window.cuteAudio.playPop();
        const modal = document.getElementById('appGuideModalOverlay');
        if (modal) modal.classList.add('active');
    }

    closeAppGuideModal() {
        const modal = document.getElementById('appGuideModalOverlay');
        if (modal) modal.classList.remove('active');
    }

    // 📊 Master 100-Day Progress & Habit Analytics Report Generator

    openMasterProgressReportModal() {
        window.cuteAudio.playFanfare();
        this.triggerConfetti();

        const cl = this.state.checklist;
        const startW = this.state.goals.startWeightKg || 66.0;
        const currentW = this.state.goals.currentWeightKg || 66.0;
        const lostW = Math.max(0, (startW - currentW)).toFixed(1);
        const remW = Math.max(0, (currentW - 50.0)).toFixed(1);

        const currentDay = this.state.challenge.currentDay || 1;
        const fastsWeek = this.state.fasting.fastsCountThisWeek || 0;

        const body = document.getElementById('masterReportBody');
        if (body) {
            body.innerHTML = `
                <div style="background:linear-gradient(135deg, #ffffff 0%, #f7fee7 100%); border:2px solid var(--kiwi-300); border-radius:18px; padding:22px; text-align:left;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                        <h3 style="font-family:'Outfit', sans-serif; font-weight:800; font-size:1.3rem; color:var(--kiwi-800);">
                            📊 Master Transformation & Habit Analytics Report
                        </h3>
                        <span class="badge-tag" style="background:#84cc16; color:#0f172a; font-weight:800;">Day ${currentDay} of 100</span>
                    </div>

                    <!-- 1. Weight Loss Trajectory Section -->
                    <div style="background:white; border:1px solid var(--kiwi-200); border-radius:14px; padding:14px; margin-bottom:14px;">
                        <div style="font-weight:800; font-size:0.95rem; color:var(--kiwi-800); margin-bottom:6px;">⚖️ Weight Journey to 50kg Summary:</div>
                        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; text-align:center;">
                            <div style="background:var(--kiwi-50); padding:10px; border-radius:10px;">
                                <div style="font-weight:800; font-size:1.2rem; color:var(--kiwi-800);">${startW} kg</div>
                                <div style="font-size:0.75rem; color:var(--text-muted);">Start Weight</div>
                            </div>
                            <div style="background:#ecfccb; padding:10px; border-radius:10px;">
                                <div style="font-weight:800; font-size:1.2rem; color:#4d7c0f;">-${lostW} kg</div>
                                <div style="font-size:0.75rem; color:#3f6212;">Total Lost 🎉</div>
                            </div>
                            <div style="background:#fefce8; padding:10px; border-radius:10px;">
                                <div style="font-weight:800; font-size:1.2rem; color:#854d0e;">${remW} kg</div>
                                <div style="font-size:0.75rem; color:#713f12;">To Reach 50kg</div>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Bad Habit Discipline Section -->
                    <div style="background:white; border:1px solid var(--kiwi-200); border-radius:14px; padding:14px; margin-bottom:14px;">
                        <div style="font-weight:800; font-size:0.95rem; color:var(--kiwi-800); margin-bottom:8px;">🥗 Food & Drink Discipline Status:</div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:0.88rem; font-weight:700;">
                            <div style="color:${cl.noMilkTea ? '#65a30d' : '#e11d48'};">☕ Milk Tea: ${cl.noMilkTea ? '✓ Controlled / Avoided' : '❌ Consumed'}</div>
                            <div style="color:${cl.noFastFood ? '#65a30d' : '#e11d48'};">🍔 Fast Food: ${cl.noFastFood ? '✓ Controlled / Avoided' : '❌ Consumed'}</div>
                            <div style="color:${cl.noCoke ? '#65a30d' : '#e11d48'};">🥤 Coke & Drinks: ${cl.noCoke ? '✓ Controlled / Avoided' : '❌ Consumed'}</div>
                            <div style="color:${cl.noMilkshake ? '#65a30d' : '#e11d48'};">🥤 Milkshake: ${cl.noMilkshake ? '✓ Controlled / Avoided' : '❌ Consumed'}</div>
                            <div style="color:${cl.noHeavyRice3Times ? '#65a30d' : '#e11d48'};">🍚 Rice Intake: ${cl.noHeavyRice3Times ? '✓ Controlled (No 3-Bela Bhaat)' : '❌ Heavy 3-Bela'}</div>
                            <div style="color:#65a30d;">🍢 Fuska: Max 1/Week Limit Kept</div>
                        </div>
                    </div>

                    <!-- 3. Intermittent Fasting & Hydration Section -->
                    <div style="background:white; border:1px solid var(--kiwi-200); border-radius:14px; padding:14px;">
                        <div style="font-weight:800; font-size:0.95rem; color:var(--kiwi-800); margin-bottom:6px;">💧 Intermittent Fasting & Glowy Hydration:</div>
                        <div style="font-size:0.9rem; font-weight:700; color:var(--text-main);">
                            🥗 Fasting Completed: <strong>${fastsWeek} Times This Week</strong><br/>
                            💧 Water Logged Today: <strong>${cl.waterLitersLogged || 0} / 3.0 Liters</strong>
                        </div>
                    </div>
                </div>
            `;
        }

        const modal = document.getElementById('masterReportModalOverlay');
        if (modal) modal.classList.add('active');
    }

    closeMasterProgressReportModal() {
        const modal = document.getElementById('masterReportModalOverlay');
        if (modal) modal.classList.remove('active');
    }

    resetWeightHistory() {
        window.cuteAudio.playPop();
        this.state.goals.startWeightKg = 66.0;
        this.state.goals.currentWeightKg = 66.0;
        this.state.goals.weightHistory = [
            { date: 'Start', weight: 66.0 }
        ];
        this.saveState();
        this.renderGoalsWidget();
        this.showMascotDialogue("Weight data reset strictly to 66.0 kg! Zero dummy data! ⚖️✨");
    }


    submitWeight() {
        const startVal = parseFloat(document.getElementById('startWeightInput')?.value || 66.0);
        const val = parseFloat(document.getElementById('weightInput')?.value);
        
        if (!isNaN(val) && val > 0) {
            this.state.goals.startWeightKg = startVal;
            this.state.goals.currentWeightKg = val;

            if (!this.state.goals.weightHistory) this.state.goals.weightHistory = [];
            
            // Clean out legacy dummy points like 58, 56, 54
            this.state.goals.weightHistory = this.state.goals.weightHistory.filter(h => h.weight !== 58 && h.weight !== 56 && h.weight !== 54);

            this.state.goals.weightHistory.push({
                date: this.getLocalDateStr().slice(5),
                weight: val
            });

            this.saveState();
            this.renderGoalsWidget();
            window.cuteAudio.playFanfare();
            this.triggerConfetti();

            const lost = (startVal - val).toFixed(1);
            const remaining = (val - 50.0).toFixed(1);

            this.showMascotDialogue(`Awesome! Weight logged (${val} kg)! Total ${lost} kg lost so far! Only ${remaining} kg left to reach 50kg! 🎉✨`);
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

    // 🎂 Friends Birthday & Anniversary Tracker (Preconfigured specific dates)
    renderBirthdaysWidget() {
        const container = document.getElementById('birthdaysContainer');
        if (!container) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const currentYear = today.getFullYear();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const birthdays = (this.state.birthdays || []).map(b => {
            const [month, day] = b.date.split('-').map(Number);
            let nextDate = new Date(currentYear, month - 1, day);
            nextDate.setHours(0, 0, 0, 0);
            if (nextDate < today) nextDate = new Date(currentYear + 1, month - 1, day);
            const daysLeft = Math.round((nextDate - today) / 86400000);
            return { ...b, month, day, nextDate, daysLeft };
        }).sort((a, b) => a.nextDate - b.nextDate);
        const todayStr = this.getLocalDateStr().slice(5); // 'MM-DD'

        let html = '';
        birthdays.forEach(b => {
            const isToday = b.date === todayStr;
            const countdown = isToday ? 'আজ' : `আর ${b.daysLeft} দিন`;
            const readableDate = `${b.day} ${monthNames[b.month - 1]}`;

            html += `
                <div class="birthday-card" style="border-color:${isToday ? '#a3e635' : 'var(--kiwi-200)'}">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <span style="font-size:2rem;">${b.avatar || '🎂'}</span>
                        <div>
                            <div style="font-weight:700; font-size:1rem; color:var(--text-main)">
                                ${b.name} ${isToday ? '<span class="badge-tag" style="background:#f472b6; color:white">TODAY!</span>' : ''}
                            </div>
                            <div style="font-size:0.76rem; font-weight:800; color:${isToday ? '#be185d' : 'var(--kiwi-700)'};">${countdown}</div>
                            <div style="font-size:0.8rem; color:var(--text-muted);">${b.type}: <strong>${readableDate}</strong></div>
                        </div>
                    </div>
                    <button class="btn-whatsapp-wish" style="background:linear-gradient(135deg, #ec4899, #be185d);" onclick="app.showGiftIdea('${b.name}', '${b.type}')">
                        <span>🎁</span> Get Gift Idea
                    </button>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    checkTodayBirthdays() {
        const todayStr = this.getLocalDateStr().slice(5);
        const todayBirthdays = (this.state.birthdays || []).filter(b => b.date === todayStr);

        if (todayBirthdays.length > 0) {
            setTimeout(() => {
                window.cuteAudio.playFanfare();
                this.triggerConfetti();
                const names = todayBirthdays.map(b => b.name).join(', ');
                this.showMascotDialogue(`🎉 TODAY IS ${names}'s Special Day! Click "Get Gift Idea" to see what to gift them! 🎂✨`);
            }, 1000);
        }
    }

    showGiftIdea(name, type) {
        window.cuteAudio.playChime();
        let idea = "A personalized mug, a cute aesthetic journal, or a heartfelt handwritten letter! 💌";
        if (name.includes('Nephew') || name === 'Arafat' || name === 'Mohammad' || name === 'Safwan' || name === 'Arifa') {
            idea = "Educational toys, a cute dress, or a storybook would be perfect! 🧸👗";
        } else if (name.includes('Shah')) {
            idea = "A customized wallet, a matching couple watch, his favorite perfume, or planning a special surprise date! ❤️🎁";
        } else if (name.includes('Apu') || name.includes('Sumi')) {
            idea = "A nice skincare set, beautiful earrings, or her favorite makeup product! 💄✨";
        } else if (name.includes('Vai')) {
            idea = "A smart gadget, a classy shirt, or a premium watch! ⌚👕";
        } else if (type === 'Anniversary') {
            idea = "A customized photo frame of a beautiful memory, or a special dinner treat! 📸🍽️";
        }
        
        this.showMascotDialogue(`🎁 Gift Idea for ${name}: ${idea} Don't forget to wish them! 🎉`);
    }

    // Donut Progress Chart (Fresh Kiwi Colors)
    renderDonutChart() {
        const canvas = document.getElementById('progressChartCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width = 270;
        const height = canvas.height = 270;

        const namajDone = Object.values(this.state.namaj).filter(v => v === true).length;
        const timersDone = Object.values(this.state.timers).filter(t => t.done || t.timeSpent >= t.targetSec).length;
        const techDone = Object.values(this.state.techLearning).filter(Boolean).length;
        const careDone = (this.state.checklist.chulAchrano ? 1 : 0) + (this.state.checklist.roomGhuchano ? 1 : 0);

        const namajTotal = this.state.periodTracker.isOnPeriod ? 0 : 5;
        const totalItems = namajTotal + 4 + 6 + 2;
        const countedNamajDone = this.state.periodTracker.isOnPeriod ? 0 : namajDone;
        const completedTotal = countedNamajDone + timersDone + techDone + careDone;
        const percent = Math.round((completedTotal / totalItems) * 100);

        const data = [
            { label: this.state.periodTracker.isOnPeriod ? 'Namaj (Excused)' : 'Namaj', value: countedNamajDone, total: namajTotal, color: '#65a30d' },
            { label: 'Timers', value: timersDone, total: 4, color: '#f59e0b' },
            { label: 'Tech Practice', value: techDone, total: 6, color: '#84cc16' },
            { label: 'Care & Room', value: careDone, total: 2, color: '#a3e635' }
        ];

        ctx.clearRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = 90;
        const innerRadius = 60;

        let startAngle = -Math.PI / 2;

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

        const remainingAngle = ((totalItems - completedTotal) / totalItems) * (Math.PI * 2);
        if (remainingAngle > 0) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, startAngle, startAngle + remainingAngle);
            ctx.arc(centerX, centerY, innerRadius, startAngle + remainingAngle, startAngle, true);
            ctx.closePath();
            ctx.fillStyle = '#ecfccb';
            ctx.fill();
        }

        ctx.fillStyle = '#4d7c0f';
        ctx.font = '800 2.2rem "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${percent}%`, centerX, centerY - 6);

        ctx.fillStyle = '#64748b';
        ctx.font = '600 0.82rem "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Daily Routine Done', centerX, centerY + 24);

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

    toggleCompletedItemsVisibility() {
        this.state.settings.showCompletedItems = !this.state.settings.showCompletedItems;
        this.saveState();
        this.renderAll();
        window.cuteAudio.playPop();

        const completedCount =
            Object.values(this.state.namaj).filter(v => v === true).length +
            Object.values(this.state.timers).filter(t => t.done || t.timeSpent >= t.targetSec).length +
            Object.values(this.state.techLearning).filter(v => v === true).length +
            Object.values(this.state.checklist).filter(v => v === true).length;
        const btnText = this.state.settings.showCompletedItems
            ? `Hide Completed Tasks (${completedCount})`
            : `Show Completed Tasks (${completedCount})`;
        const btn = document.getElementById('toggleCompletedBtn');
        if (btn) btn.innerText = btnText;
        this.showMascotDialogue(this.state.settings.showCompletedItems
            ? (completedCount > 0 ? `${completedCount}টি completed item এখন দেখানো হচ্ছে।` : 'আজ এখনো কোনো completed item নেই। একটি task complete করে আবার দেখুন।')
            : 'Completed items আবার hide করা হয়েছে।');
    }

    // 🤖 2060 AI Voice Companion Engine (SpeechSynthesis API)
    speakVoice(text) {
        if (!this.state.settings.voiceEnabled) return;
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // stop previous speech
            const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, ''); // strip emojis for smooth voice
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.rate = 1.0;
            utterance.pitch = 1.2; // Cute slightly higher pitch voice
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    }

    // 🧠 2060 AI Bio-Energy HUD Score
    calculateBioEnergyScore() {
        const namajDone = Object.values(this.state.namaj).filter(v => v === true).length;
        const waterL = this.state.checklist.waterLitersLogged || 0;
        const noTea = this.state.checklist.noTea ? 10 : 0;
        const noChoc = this.state.checklist.noChocolate ? 10 : 0;
        const techDone = Object.values(this.state.techLearning).filter(Boolean).length;
        
        const namajPoints = this.state.periodTracker.isOnPeriod ? 30 : (namajDone * 6);
        let score = 50 + namajPoints + (Math.min(3, waterL) * 5) + noTea + noChoc + (techDone * 2);
        score = Math.min(100, Math.round(score));

        const scoreEl = document.getElementById('bioEnergyScoreText');
        const statusEl = document.getElementById('bioEnergyStatusText');

        if (scoreEl) scoreEl.innerText = `${score}%`;
        if (statusEl) {
            if (score >= 90) statusEl.innerText = '⚡ Quantum Peak Energy & Radiance';
            else if (score >= 70) statusEl.innerText = '🌟 High Vitality & Focused Mind';
            else statusEl.innerText = '💧 Hydrate & Complete Routine to Boost';
        }
    }

    // ⚡ 2060 Hologram Sci-Fi Mode Toggle
    toggleHologramMode() {
        const isHolo = document.body.classList.toggle('hologram-mode');
        this.state.settings.hologramMode = isHolo;
        this.saveState();
        window.cuteAudio.playFanfare();
        this.showMascotDialogue("⚡ 2060 Sci-Fi Hologram Matrix Mode Activated! 🌌");
    }

    // 🔮 2060 AI Future Simulator Modal
    openFutureSimulator() {
        window.cuteAudio.playFanfare();
        this.triggerConfetti();

        const currentDay = this.state.challenge.currentDay;
        const remaining = 100 - currentDay;
        const currentW = this.state.goals.currentWeightKg;
        const lost = (this.state.goals.startWeightKg - currentW).toFixed(1);

        const body = document.getElementById('futureSimulatorBody');
        if (body) {
            body.innerHTML = `
                <div style="background:var(--kiwi-50); border:2px solid var(--kiwi-300); border-radius:18px; padding:20px; text-align:left;">
                    <div style="font-family:'Outfit'; font-weight:800; font-size:1.3rem; color:var(--kiwi-800); margin-bottom:12px;">
                        🔮 Day 100 Quantum AI Prediction Simulation
                    </div>

                    <div style="display:flex; flex-direction:column; gap:10px; font-weight:700; font-size:0.95rem;">
                        <div style="background:white; padding:12px; border-radius:12px; border:1px solid var(--kiwi-200);">
                            🎯 <strong>Target Weight:</strong> 50.0 kg <span style="color:#65a30d;">(100% Achieved! Tone & Healthy 🎉)</span>
                        </div>
                        <div style="background:white; padding:12px; border-radius:12px; border:1px solid var(--kiwi-200);">
                            💼 <strong>Career Status:</strong> Senior Fullstack Developer <span style="color:#65a30d;">(Mastered HTML, CSS, Tailwind, Laravel, React, Next.js)</span>
                        </div>
                        <div style="background:white; padding:12px; border-radius:12px; border:1px solid var(--kiwi-200);">
                            ✨ <strong>Skin Radiance Index:</strong> 99.8% Crystal Glow <span style="color:#65a30d;">(No Tea/Chocolate + 3L Water)</span>
                        </div>
                        <div style="background:white; padding:12px; border-radius:12px; border:1px solid var(--kiwi-200);">
                            🧠 <strong>Financial & Mental Independence:</strong> 100% Peak Self-Confidence
                        </div>
                    </div>

                    <p style="font-size:0.85rem; color:var(--text-muted); margin-top:14px;">
                        <em>AI Prediction calculated based on your ${currentDay}-day consistency. Keep going! In ${remaining} days, your dream life is waiting!</em>
                    </p>
                </div>
            `;
        }

        const modal = document.getElementById('futureSimulatorModalOverlay');
        if (modal) modal.classList.add('active');
        this.speakVoice("Welcome to year 2060 simulation! In 100 days your dream life, 50kg weight, and fullstack developer career will be 100 percent achieved!");
    }

    closeFutureSimulator() {
        window.cuteAudio.playPop();
        const modal = document.getElementById('futureSimulatorModalOverlay');
        if (modal) modal.classList.remove('active');
    }

    showMascotDialogue(text) {
        const el = document.getElementById('mascotSpeechBubble');
        if (el) {
            el.innerText = text;
            el.style.animation = 'none';
            el.offsetHeight;
            el.style.animation = 'popBubble 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
    }

    triggerMascotRandomTalk() {
        window.cuteAudio.playCatMeow();
        const randIndex = Math.floor(Math.random() * this.mascotQuotes.length);
        this.showMascotDialogue(this.mascotQuotes[randIndex]);
    }

    scoldUserForMissingTasks() {
        window.cuteAudio.playCatMeow();
        
        const bubble = document.getElementById('mascotSpeechBubble');
        if (bubble) {
            bubble.classList.add('scolding');
            setTimeout(() => bubble.classList.remove('scolding'), 1500);
        }

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
        this.state.reflections.lastSubmittedDate = this.getLocalDateStr();

        this.saveState();
        this.closeNightReflectionModal();

        window.cuteAudio.playFanfare();
        this.triggerConfetti();

        let msg = "Ajk rater reflection completed! ";
        if (behaviorVal) msg += "Tumi gentle & calm chile! ❤️ ";
        if (dinnerVal) msg += "Dinner skipped / light eating logged! ";
        msg += "Good night & sweet dreams! 🌙✨";

        this.showMascotDialogue(msg);
    }

    checkNightReflectionTrigger() {
        const now = new Date();
        const hour = now.getHours();
        const todayStr = this.getLocalDateStr();

        if (hour >= 21 && this.state.reflections.lastSubmittedDate !== todayStr) {
            setTimeout(() => {
                this.openNightReflectionModal();
            }, 1500);
        }
    }

    openHistoryModal() {
        window.cuteAudio.playPop();
        this.renderHistoryModal();
        document.getElementById('historyModalOverlay').classList.add('active');
    }

    closeHistoryModal() {
        window.cuteAudio.playPop();
        document.getElementById('historyModalOverlay').classList.remove('active');
    }

    renderHistoryModal() {
        const body = document.getElementById('historyModalBody');
        if (!body) return;

        const history = this.state.historyLogs || [];
        if (history.length === 0) {
            body.innerHTML = `
                <div style="text-align:center; color:var(--text-muted); padding:30px 10px;">
                    <div style="font-size:3rem; margin-bottom:10px;">📜</div>
                    <div style="font-weight:700; font-size:1.1rem;">No History Logged Yet</div>
                    <p style="font-size:0.88rem; margin-top:6px;">As you complete days, past progress will record here!</p>
                </div>
            `;
            return;
        }

        let html = '';
        history.slice().reverse().forEach(log => {
            html += `
                <div style="background:var(--kiwi-50); border:1.5px solid var(--kiwi-200); border-radius:14px; padding:14px 18px; margin-bottom:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                        <span style="font-family:'Outfit'; font-weight:800; font-size:1.1rem; color:var(--kiwi-800)">Day ${log.day} (${log.date})</span>
                        <span style="background:var(--kiwi-600); color:white; font-size:0.78rem; font-weight:800; padding:4px 10px; border-radius:20px;">${log.percent}% Done</span>
                    </div>
                    <div style="font-size:0.86rem; color:var(--text-main); display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-top:8px;">
                        <div>🕌 Namaj: <strong>${log.namajDone}/5</strong></div>
                        <div>⚖️ Weight: <strong>${log.weight} kg</strong></div>
                        <div>💧 Water: <strong>${log.water || 0}L</strong></div>
                        <div>💻 Tech: <strong>${log.techCount || 0} practiced</strong></div>
                    </div>
                </div>
            `;
        });

        body.innerHTML = html;
    }

    recordActivity(category, task) {
        if (!this.state.activityLog) this.state.activityLog = [];
        const now = new Date();
        this.state.activityLog.push({
            date: this.getLocalDateStr(now),
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: now.getTime(),
            category,
            task
        });
        this.state.activityLog = this.state.activityLog.slice(-500);
        this.logCurrentDayToHistory();
    }

    logCurrentDayToHistory() {
        if (!this.state.historyLogs) this.state.historyLogs = [];
        
        const namajDone = Object.values(this.state.namaj).filter(v => v === true).length;
        const techDone = Object.values(this.state.techLearning).filter(Boolean).length;
        const namajTotal = this.state.periodTracker.isOnPeriod ? 0 : 5;
        const totalItems = namajTotal + 4 + 6 + 2;
        const timersDone = Object.values(this.state.timers).filter(t => t.done || t.timeSpent >= t.targetSec).length;
        const careDone = (this.state.checklist.chulAchrano ? 1 : 0) + (this.state.checklist.roomGhuchano ? 1 : 0);
        const countedNamajDone = this.state.periodTracker.isOnPeriod ? 0 : namajDone;
        const percent = Math.round(((countedNamajDone + timersDone + techDone + careDone) / totalItems) * 100);

        // Fasting Calculation (1 = Fully completed, 0.5 = Half/Some progress, 0 = None)
        const targetH = this.state.fasting.targetHours || 16;
        const targetSec = targetH * 3600;
        const elapsedSec = this.state.fasting.elapsedSec || 0;
        let fastStatus = 0;
        if (this.state.fasting.done || elapsedSec >= targetSec) fastStatus = 1;
        else if (elapsedSec > 0) fastStatus = 0.5;

        const logEntry = {
            day: this.state.challenge.currentDay,
            date: this.getLocalDateStr(),
            percent: percent,
            namajDone: namajDone,
            weight: this.state.goals.currentWeightKg,
            water: this.state.checklist.waterLitersLogged || 0,
            techCount: techDone,
            fastStatus: fastStatus,
            fastingHours: Number(((this.state.fasting.elapsedSec || 0) / 3600).toFixed(1)),
            timerMinutes: Object.fromEntries(Object.entries(this.state.timers).map(([key, timer]) => [key, Math.round((timer.timeSpent || 0) / 60)])),
            studyMinutes: Math.round((((this.state.timers.report?.timeSpent || 0) + (this.state.timers.practice?.timeSpent || 0)) / 60)),
            careDone,
            behaviourDone: Object.values(this.state.behaviourReset.tasks || {}).filter(v => v === true).length,
            careerDone: Object.values(this.state.lifeRecovery.tasks || {}).filter(v => v === true).length,
            classyDone: Object.values(this.state.classyReset.tasks || {}).filter(v => v === true).length,
            active: true,
            updatedAt: Date.now()
        };

        const existingIdx = this.state.historyLogs.findIndex(h => h.date === logEntry.date);
        if (existingIdx >= 0) {
            this.state.historyLogs[existingIdx] = logEntry;
        } else {
            this.state.historyLogs.push(logEntry);
        }
        this.saveState();
    }

    advanceDay() {
        this.logCurrentDayToHistory();
        if (this.state.challenge.currentDay < 100) {
            this.state.challenge.currentDay += 1;
            this.saveState();
            this.renderChallengeBanner();
            window.cuteAudio.playFanfare();
            this.triggerConfetti();
            this.showMascotDialogue(`Congratulations! Day ${this.state.challenge.currentDay} started! Keep shining! 🚀✨`);
        }
    }

    toggleWallpaperMode() {
        const isWall = document.body.classList.toggle('wallpaper-mode');
        this.state.settings.wallpaperMode = isWall;
        this.saveState();
        window.cuteAudio.playPop();
    }

    renderWallpaperState() {
        const exitButton = document.getElementById('exitWallpaperBtn');
        if (this.state.settings.wallpaperMode) {
            document.body.classList.add('wallpaper-mode');
            if (exitButton) exitButton.style.display = 'block';
        } else {
            document.body.classList.remove('wallpaper-mode');
            if (exitButton) exitButton.style.display = 'none';
        }
    }

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

    // 🌸 Period Tracker Widget
    renderPeriodWidget() {
        const container = document.getElementById('periodContainer');
        if (!container) return;

        const cycleLength = this.state.periodTracker.cycleLengthDays || 28;
        const lastStart = new Date(this.state.periodTracker.lastPeriodStart);
        const today = new Date();
        const diffDays = Math.floor((today - lastStart) / 86400000);
        const daysToNext = cycleLength - diffDays;

        let alertHtml = '';
        if (daysToNext <= 3 && daysToNext >= 0) {
            alertHtml = `
                <div style="background:#fce7f3; color:#831843; border:2px solid #f472b6; padding:10px 14px; border-radius:12px; margin-bottom:14px; font-weight:700; font-size:0.9rem;">
                    🌸 Gentle Reminder: Your next period is expected in ${daysToNext} day(s). Take care!
                </div>
            `;
        } else if (daysToNext < 0) {
            alertHtml = `
                <div style="background:#fee2e2; color:#7f1d1d; border:2px solid #f87171; padding:10px 14px; border-radius:12px; margin-bottom:14px; font-weight:700; font-size:0.9rem;">
                    🌸 Your period might have started. Update the date if so!
                </div>
            `;
        }

        container.innerHTML = `
            ${alertHtml}
            <div style="background:var(--kiwi-50); padding:16px; border-radius:14px; border:1.5px solid var(--kiwi-200);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                    <span style="font-weight:700; color:var(--text-main); font-size:0.9rem;">Start Date:</span>
                    <input type="date" value="${this.state.periodTracker.lastPeriodStart}" onchange="app.updatePeriodDate(this.value)" style="padding:6px 10px; border:1px solid var(--kiwi-300); border-radius:8px; font-family:'Outfit'; font-weight:600;" />
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <span style="font-weight:700; color:var(--text-main); font-size:0.9rem;">Cycle Length:</span>
                    <span style="font-weight:800; color:var(--kiwi-800);">${cycleLength} Days</span>
                </div>
                <button class="btn-primary-block" style="background:#ec4899; box-shadow:0 6px 16px rgba(236, 72, 153, 0.3);" onclick="app.finishPeriod()">
                    🌸 Mark Period Finished (Clean)
                </button>
            </div>
        `;
    }

    updatePeriodDate(val) {
        if (!val) return;
        this.state.periodTracker.lastPeriodStart = val;
        this.state.periodTracker.isOnPeriod = true;
        this.saveState();
        this.renderPeriodWidget();
        this.renderNamajWidget();
        window.cuteAudio.playPop();
    }

    finishPeriod() {
        this.state.periodTracker.isOnPeriod = false;
        this.saveState();
        this.renderPeriodWidget();
        this.renderNamajWidget();
        window.cuteAudio.playChime();
        this.triggerConfetti();
        this.showMascotDialogue("Alhamdulillah! Period finished and marked clean! Ready to pray and slay! 🌸✨");
    }

    // 📝 Content Idea & Script Tracker
    renderContentIdeaWidget() {
        const container = document.getElementById('contentIdeaContainer');
        if (!container) return;

        const scripts = this.state.contentScripts || [];

        let listHtml = '';
        if (scripts.length > 0) {
            scripts.forEach(s => {
                listHtml += `
                    <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:12px; padding:12px; margin-bottom:10px;">
                        <div style="font-size:0.9rem; font-weight:600; color:#334155; margin-bottom:8px; white-space:pre-wrap;">${s.text}</div>
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:0.75rem; color:#94a3b8; font-weight:700;">${new Date(s.createdAt).toLocaleDateString()}</span>
                            ${s.isCompleted ? 
                                `<span style="color:#10b981; font-weight:800; font-size:0.85rem;">✓ Completed</span>` 
                                : 
                                `<div style="display:flex; gap:8px;">
                                    <button class="btn-icon-pill" style="padding:4px 10px; font-size:0.75rem; background:#ecfccb; color:#3f6212; border:none;" onclick="app.completeContentScript('${s.id}')">✓ Mark Done</button>
                                    <button class="btn-icon-pill" style="padding:4px 10px; font-size:0.75rem; background:#fee2e2; color:#991b1b; border:none;" onclick="app.deleteContentScript('${s.id}')">❌ Delete</button>
                                </div>`
                            }
                        </div>
                    </div>
                `;
            });
        } else {
            listHtml = `<div style="text-align:center; padding:10px; color:var(--text-muted); font-size:0.85rem; font-weight:600;">No scripts written yet! Start drafting your next viral idea! ✨</div>`;
        }

        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:10px;">
                <textarea id="newScriptInput" rows="4" placeholder="Draft your content idea or video script here..." style="padding:12px; border-radius:12px; border:2px solid var(--kiwi-300); font-family:'Outfit'; font-weight:500; font-size:0.95rem; resize:vertical;"></textarea>
                <button class="btn-primary-block" onclick="app.addContentScript()">
                    ✍️ Save Script Draft
                </button>
            </div>
            <div style="margin-top:20px;">
                <h4 style="margin:0 0 10px 0; font-size:0.95rem; color:var(--kiwi-800);">Saved Scripts</h4>
                ${listHtml}
            </div>
        `;
    }

    addContentScript() {
        const input = document.getElementById('newScriptInput');
        const text = input ? input.value.trim() : '';
        if (!text) return;

        if (!this.state.contentScripts) this.state.contentScripts = [];
        
        this.state.contentScripts.unshift({
            id: 'script_' + Date.now(),
            text: text,
            isCompleted: false,
            createdAt: new Date().toISOString()
        });

        this.saveState();
        this.renderContentIdeaWidget();
        window.cuteAudio.playPop();
        this.showMascotDialogue("Awesome idea! Script saved! You're going to create something great! 🚀✨");
    }

    completeContentScript(id) {
        const script = this.state.contentScripts.find(s => s.id === id);
        if (script) {
            script.isCompleted = true;
            this.state.goals.contentIdeasCount = (this.state.goals.contentIdeasCount || 0) + 1;
            this.saveState();
            this.renderContentIdeaWidget();
            this.renderGoalsWidget();
            window.cuteAudio.playChime();
            this.triggerConfetti();
            this.showMascotDialogue("Woohoo! Content published and completed! Proud of your creativity! 🎉💻");
        }
    }

    deleteContentScript(id) {
        this.state.contentScripts = this.state.contentScripts.filter(s => s.id !== id);
        this.saveState();
        this.renderContentIdeaWidget();
        window.cuteAudio.playPop();
    }

    triggerConfetti() {
        if (window.confetti) {
            window.confetti({
                particleCount: 90,
                spread: 75,
                origin: { y: 0.6 },
                colors: ['#a3e635', '#84cc16', '#ffedd5', '#f472b6']
            });
        }
    }

    bindEvents() {
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && document.body.classList.contains('wallpaper-mode')) {
                this.toggleWallpaperMode();
            }
        });
    }

    openWeeklyReportModal() {
        const body = document.getElementById('weeklyReportBody');
        if (!body) return;
        
        let totalLogs = this.state.historyLogs ? this.state.historyLogs.length : 0;
        if (totalLogs === 0) {
            body.innerHTML = `<div style="padding:20px; text-align:center; color:var(--text-muted);">No history data found to generate a report. Keep progressing!</div>`;
            document.getElementById('weeklyReportModalOverlay').classList.add('active');
            return;
        }

        const last7 = this.state.historyLogs.slice(-7);
        const last30 = this.state.historyLogs.slice(-30);

        const avgScore7 = Math.round(last7.reduce((acc, log) => acc + (log.percent || 0), 0) / last7.length);
        const avgScore30 = Math.round(last30.reduce((acc, log) => acc + (log.percent || 0), 0) / last30.length);
        const avgNamaj7 = (last7.reduce((acc, log) => acc + (log.namajDone || 0), 0) / last7.length).toFixed(1);

        body.innerHTML = `
            <div style="background:linear-gradient(135deg, #f0fdf4, #dcfce7); padding:20px; border-radius:18px; border:2px solid var(--kiwi-300); margin-bottom:16px;">
                <div style="font-size:1.05rem; font-weight:800; color:var(--kiwi-800); margin-bottom:10px;">📊 Weekly Average Score (Last 7 Days)</div>
                <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                    <div style="font-size:3.5rem; font-weight:900; color:var(--kiwi-600); line-height:1;">${avgScore7}%</div>
                    <div style="font-size:0.95rem; font-weight:700; color:var(--kiwi-800);">Avg. Namaj: ${avgNamaj7} / 5</div>
                </div>
                <div class="progress-track" style="margin-top:12px; height:12px; background:var(--kiwi-200);">
                    <div class="progress-fill" style="width: ${avgScore7}%; background: linear-gradient(90deg, #84cc16, #65a30d);"></div>
                </div>
            </div>

            <div style="background:var(--kiwi-50); padding:20px; border-radius:18px; border:1.5px solid var(--kiwi-200);">
                <div style="font-size:1.05rem; font-weight:800; color:var(--kiwi-800); margin-bottom:10px;">🗓️ Monthly Average Score (Last 30 Days)</div>
                <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                    <div style="font-size:2.8rem; font-weight:900; color:var(--kiwi-600); line-height:1;">${avgScore30}%</div>
                    <div style="font-size:0.9rem; font-weight:700; color:var(--text-muted);">Overall Consistency</div>
                </div>
                <div class="progress-track" style="margin-top:12px; height:10px; background:white;">
                    <div class="progress-fill" style="width: ${avgScore30}%; background: #a3e635;"></div>
                </div>
            </div>
            
            <div style="margin-top:16px; font-size:0.9rem; color:var(--text-main); font-weight:600; text-align:center;">
                Your performance is getting better! Keep focusing on your self-care and Namaj. 🌸✨
            </div>
        `;

        document.getElementById('weeklyReportModalOverlay').classList.add('active');
        window.cuteAudio.playFanfare();
    }

    closeWeeklyReportModal() {
        document.getElementById('weeklyReportModalOverlay').classList.remove('active');
        window.cuteAudio.playPop();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new SkyRoutineApp();
});
