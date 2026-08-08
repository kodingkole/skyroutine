/**
 * SkyRoutine 🐾 - Kiwi Edition App Engine v4
 */

class SkyRoutineApp {
    constructor() {
        this.STORAGE_KEY = 'sky_routine_app_data_v4';
        
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
                fastsCountThisWeek: 0
            },
            periodTracker: {
                lastPeriodStart: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0], // 7 days ago
                cycleLengthDays: 28
            },
            checklist: {
                chulAchrano: false,
                roomGhuchano: false,
                dinnerSkipped: false,
                noTea: true,
                noMilkTea: true,
                noFastFood: true,
                noCoke: true,
                noMilkshake: true,
                noHeavyRice3Times: true,
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
            birthdays: [
                { id: '1', name: 'My Birthday 🎉', date: '09-12', type: 'Birthday', avatar: '👑', phone: '8801700000000' },
                { id: '2', name: 'Mohammad (Nephew)', date: '09-14', type: 'Birthday', avatar: '🎈', phone: '8801700000000' },
                { id: '3', name: 'Arafat', date: '09-25', type: 'Birthday', avatar: '✨', phone: '8801700000000' },
                { id: '4', name: 'Khadija Apu', date: '07-23', type: 'Birthday', avatar: '🌸', phone: '8801700000000' },
                { id: '5', name: 'Arifa', date: '06-28', type: 'Birthday', avatar: '💖', phone: '8801700000000' },
                { id: '6', name: 'Zayed Vai', date: '05-21', type: 'Birthday', avatar: '⭐', phone: '8801800000000' },
                { id: '7', name: 'Sumi', date: '05-08', type: 'Birthday', avatar: '🌷', phone: '8801900000000' },
                { id: '8', name: "Ma, Baba & Khadija Apu's Anniversary", date: '11-21', type: 'Anniversary', avatar: '💍', phone: '8801700000000' }
            ],

            quickNotes: [], // Array of one-day notes: { id, text, createdAt }
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
            activeQuest: null,
            completedQuestsCount: 0,
            rewardsUnlocked: 0,
            settings: {
                showCompletedItems: false,
                wallpaperMode: false,
                hologramMode: false,
                voiceEnabled: true
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


    loadState() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                const todayStr = new Date().toISOString().split('T')[0];
                if (parsed.lastActiveDate !== todayStr) {
                    if (parsed.challenge && parsed.challenge.currentDay < 100) {
                        parsed.challenge.currentDay += 1;
                    }
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
                
                // Force update weight state to 66kg start & clear legacy dummy points
                if (!parsed.goals || !parsed.goals.startWeightKg || parsed.goals.startWeightKg !== 66.0) {
                    parsed.goals = {
                        startWeightKg: 66.0,
                        targetWeightKg: 50.0,
                        currentWeightKg: 66.0,
                        weightHistory: [
                            { date: 'Start', weight: 66.0 }
                        ],
                        jobApplicationsCount: (parsed.goals && parsed.goals.jobApplicationsCount) || 0,
                        contentIdeasCount: (parsed.goals && parsed.goals.contentIdeasCount) || 0,
                        confidenceScore: (parsed.goals && parsed.goals.confidenceScore) || 85
                    };
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
        this.startLiveClock();
        this.fetchLiveWeather();
        this.cleanupExpiredNotes();
        this.checkNightReflectionTrigger();
        this.checkTodayBirthdays();
        this.resumeFastingTimerIfNeeded();
        this.showMascotDialogue("Assalamu Alaikum! Fresh Kiwi environment-e ajker routine start koro! 🥝🐾");
    }

    renderAll() {
        this.renderChallengeBanner();
        this.renderOverallTransformationWidget();
        this.renderNamajWidget();
        this.renderTimersWidget();
        this.renderChecklistWidget();
        this.renderFastingWidget();
        this.renderPeriodWidget();
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
    }

    // 🤖 100% Automatic Mascot Mood Engine (Angry Red when tasks incomplete, Happy Green/Pink when complete!)
    autoUpdateMascotMood() {
        const namajDone = Object.values(this.state.namaj).filter(Boolean).length;
        const waterL = this.state.checklist.waterLitersLogged || 0;
        const noTea = this.state.checklist.noMilkTea;

        const isFullyDone = namajDone === 5 && waterL >= 3.0 && noTea;

        const catBody = document.getElementById('kiwiCatBody');
        const catContainer = document.getElementById('mascotCatContainer');
        const bubble = document.getElementById('mascotSpeechBubble');

        if (!isFullyDone) {
            // AUTOMATIC ANGRY RED MODE 😾
            if (catBody) catBody.style.background = 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)';
            if (catContainer) catContainer.style.filter = 'drop-shadow(0 0 16px rgba(244, 63, 94, 0.6))';
            if (bubble) {
                bubble.style.background = '#ffe4e6';
                bubble.style.color = '#881337';
                bubble.style.borderColor = '#f43f5e';
                bubble.innerText = "Ei! Tomar ajker Namaj, Water 3L ba Tasks ekhono baki! Taratari complete koro! 😾";
            }
        } else {
            // AUTOMATIC HAPPY PRAISE MODE 😸
            if (catBody) catBody.style.background = 'linear-gradient(135deg, #a3e635 0%, #65a30d 100%)';
            if (catContainer) catContainer.style.filter = 'drop-shadow(0 0 16px rgba(132, 204, 22, 0.6))';
            if (bubble) {
                bubble.style.background = '#f0fdf4';
                bubble.style.color = '#14532d';
                bubble.style.borderColor = '#84cc16';
                bubble.innerText = "YAY! Super proud of you! Daily tasks completed! Glowy skin & 50kg goal ongoing! 🌸✨";
            }
        }
    }



    // 🐾 Free-Walking Kiki Pet Engine (Walks around full screen!)
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

        const namajDone = Object.values(this.state.namaj).filter(Boolean).length;
        const dailyRoutineProgress = Math.round((namajDone / 5) * 100);

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


    // 🎂 12 September Birthday Check & Spectacular Animation Modal
    checkMyBirthday() {
        const todayStr = new Date().toISOString().split('T')[0];
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
    }

    closeBirthdayModal() {
        const modal = document.getElementById('birthdayModalOverlay');
        if (modal) modal.classList.remove('active');
    }

    // 📢 Cute Scolding Engine ("Boka Dibe")
    triggerCuteScolding() {
        window.cuteAudio.playWarning();

        // 😾 Make Kiki visually angry!
        const catBody = document.getElementById('kiwiCatBody');
        const catContainer = document.getElementById('mascotCatContainer');
        const bubble = document.getElementById('mascotSpeechBubble');

        if (catContainer) {
            catContainer.style.transform = 'scale(1.2) rotate(-15deg)';
            catContainer.style.filter = 'drop-shadow(0 0 20px rgba(244, 63, 94, 0.7))';
        }
        if (catBody) {
            catBody.style.background = 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)'; // Angry Red Glow!
        }
        if (bubble) {
            bubble.style.background = 'linear-gradient(135deg, #ffe4e6, #fecdd3)';
            bubble.style.color = '#881337';
            bubble.style.borderColor = '#f43f5e';
        }

        const scolds = [
            "Ei! Fajr/Namaj porecho? Water 3L kheyecho? 😾 Ajke skin glow na korle amar boka khabe! Taratari finish koro!",
            "Khabar skip kora jabe na, kintu dudh cha & fast food avoid koro! 😾 Fasting & coding focus thik rakho!",
            "Chul achrano hoise? Room ghuchano hoise? 😾 Amon alsemi korle 50kg weight hobe kivabe! Utho, utho!",
            "Coding timer chalu koro! Html, CSS, Laravel sikhba na? 😾 Kiki sob dekhche, dustami bondho!"
        ];
        const rand = scolds[Math.floor(Math.random() * scolds.length)];
        this.showMascotDialogue(rand);

        // Reset Angry state after 4 seconds
        setTimeout(() => {
            if (catContainer) {
                catContainer.style.transform = 'none';
                catContainer.style.filter = 'none';
            }
            if (catBody) {
                catBody.style.background = 'linear-gradient(135deg, #a3e635 0%, #65a30d 100%)';
            }
            if (bubble) {
                bubble.style.background = '#ffffff';
                bubble.style.color = '#1e293b';
                bubble.style.borderColor = 'var(--kiwi-300)';
            }
        }, 4000);
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

    // 🕒 Live Digital Clock
    startLiveClock() {
        const updateClock = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
            const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

            const clockEl = document.getElementById('liveClockTime');
            const dateEl = document.getElementById('liveClockDate');

            if (clockEl) clockEl.innerText = timeStr;
            if (dateEl) dateEl.innerText = dateStr;
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
            const isDone = this.state.namaj[p.key];
            if (isDone) completedCount++;

            const hideClass = (isDone && !showCompleted) ? 'hide-completed' : '';

            html += `
                <div class="namaj-card task-anim-item ${isDone ? 'completed' : ''} ${hideClass}" onclick="app.toggleNamaj('${p.key}')">
                    <span class="namaj-icon">${p.icon}</span>
                    <div class="namaj-name">${p.name}</div>
                    <div class="namaj-time">${p.time}</div>
                    <div class="namaj-status-check">${isDone ? '✓' : ''}</div>
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

        if (this.state.namaj[key]) {
            window.cuteAudio.playChime();
            this.showMascotDialogue(`MashAllah! ${key.toUpperCase()} namaj pora done! Cleanly recorded & completed! 🕌✨`);
        } else {
            window.cuteAudio.playPop();
        }

        this.renderNamajWidget();
        this.renderDonutChart();

        const allDone = Object.values(this.state.namaj).every(v => v);
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
            const data = this.state.timers[t.key] || { timeSpent: 0, targetSec: t.targetSec, running: false, done: false };
            const formatted = this.formatTime(data.timeSpent);
            const targetFormatted = this.formatTime(t.targetSec);
            const isDone = data.done || data.timeSpent >= t.targetSec;
            const hideClass = (isDone && !showCompleted) ? 'hide-completed' : '';

            html += `
                <div class="timer-card task-anim-item ${isDone ? 'completed' : ''} ${hideClass}">
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
        if (isDone && this.state.timers[key].timeSpent < this.state.timers[key].targetSec) {
            this.state.timers[key].timeSpent = this.state.timers[key].targetSec;
        }
        this.pauseTimer(key);
        if (isDone) {
            window.cuteAudio.playChime();
            this.showMascotDialogue(`Awesome! ${key.toUpperCase()} timer task mark done! ✨`);
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
        const elapsedSec = this.state.fasting.elapsedSec || 0;
        const isRunning = this.state.fasting.running;
        const isDone = this.state.fasting.done || elapsedSec >= targetSec;
        const percent = Math.min(100, Math.round((elapsedSec / targetSec) * 100));
        const weeklyFasts = this.state.fasting.fastsCountThisWeek || 0;

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
                ${this.formatTime(elapsedSec)} / ${targetH}:00:00
            </div>

            <div class="progress-track" style="margin-bottom:16px; background:var(--kiwi-100);">
                <div class="progress-fill" style="width: ${percent}%; background: linear-gradient(90deg, #84cc16, #65a30d);"></div>
            </div>

            <div class="timer-controls">
                ${!isRunning ? `
                    <button class="btn-timer btn-timer-start" onclick="app.startFasting()">▶ Start Fasting</button>
                ` : `
                    <button class="btn-timer btn-timer-pause" onclick="app.pauseFasting()">⏸ Pause Fast</button>
                `}
                <button class="btn-timer ${isDone ? 'btn-timer-done' : 'btn-timer-reset'}" onclick="app.completeFasting()">
                    ${isDone ? '✓ Fast Completed' : 'Complete Fast'}
                </button>
            </div>
        `;
    }

    setFastingTarget(hours) {
        this.state.fasting.targetHours = hours;
        this.saveState();
        this.renderFastingWidget();
        window.cuteAudio.playPop();
    }

    startFasting() {
        window.cuteAudio.playPop();
        if (this.fastingInterval) clearInterval(this.fastingInterval);

        this.state.fasting.running = true;
        this.state.fasting.startTime = Date.now();
        this.saveState();
        this.renderFastingWidget();

        this.fastingInterval = setInterval(() => {
            this.state.fasting.elapsedSec += 1;
            const targetSec = (this.state.fasting.targetHours || 16) * 3600;

            const el = document.getElementById('fastingDisplay');
            if (el) {
                el.innerText = `${this.formatTime(this.state.fasting.elapsedSec)} / ${this.state.fasting.targetHours}:00:00`;
            }

            if (this.state.fasting.elapsedSec >= targetSec && !this.state.fasting.done) {
                this.state.fasting.done = true;
                this.pauseFasting();
                window.cuteAudio.playFanfare();
                this.triggerConfetti();
                this.showMascotDialogue(`Awesome! ${this.state.fasting.targetHours} Hours Intermittent Fasting Completed! 🥗✨`);
            }
        }, 1000);
    }

    pauseFasting() {
        window.cuteAudio.playPop();
        if (this.fastingInterval) {
            clearInterval(this.fastingInterval);
            this.fastingInterval = null;
        }
        this.state.fasting.running = false;
        this.saveState();
        this.renderFastingWidget();
    }

    completeFasting() {
        this.state.fasting.done = true;
        this.pauseFasting();
        window.cuteAudio.playChime();
        this.showMascotDialogue("Fasting completed & logged! Glowing skin & healthy body ongoing! 🥗✨");
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
                    <label style="font-size:0.84rem; font-weight:700; color:#be185d;">Last Period Date:</label>
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
    renderChecklistWidget() {
        const container = document.getElementById('checklistContainer');
        if (!container) return;

        const showCompleted = this.state.settings.showCompletedItems;

        const isChulDone = this.state.checklist.chulAchrano;
        const isRoomDone = this.state.checklist.roomGhuchano;
        const isNoTea = this.state.checklist.noTea;
        const isNoChoc = this.state.checklist.noChocolate;
        const isNoOvereat = this.state.checklist.noOvereating;
        const waterL = this.state.checklist.waterLitersLogged || 0;
        const fuskaCount = this.state.checklist.fuskaCountThisWeek || 0;
        const jobsCount = this.state.goals.jobApplicationsCount;

        container.innerHTML = `
            <div class="checklist-item task-anim-item ${isChulDone ? 'done' : ''} ${isChulDone && !showCompleted ? 'hide-completed' : ''}" onclick="app.toggleChecklistItem('chulAchrano')">
                <div class="checklist-left">
                    <div class="custom-checkbox">${isChulDone ? '✓' : ''}</div>
                    <span class="checklist-text">💇‍♀️ Chul Achrano & Haircare Routine</span>
                </div>
                <span class="badge-tag" style="background:var(--kiwi-100); color:var(--kiwi-800)">Glowy Skin</span>
            </div>

            <div class="checklist-item task-anim-item ${isRoomDone ? 'done' : ''} ${isRoomDone && !showCompleted ? 'hide-completed' : ''}" onclick="app.toggleChecklistItem('roomGhuchano')">
                <div class="checklist-left">
                    <div class="custom-checkbox">${isRoomDone ? '✓' : ''}</div>
                    <span class="checklist-text">🧹 Room Ghuchano & Clean Sanctuary</span>
                </div>
                <span class="badge-tag" style="background:var(--kiwi-100); color:var(--kiwi-800)">Clean Space</span>
            </div>

            <div class="checklist-item task-anim-item ${isNoTea ? 'done' : ''} ${isNoTea && !showCompleted ? 'hide-completed' : ''}" onclick="app.toggleChecklistItem('noTea')">
                <div class="checklist-left">
                    <div class="custom-checkbox">${isNoTea ? '✓' : ''}</div>
                    <span class="checklist-text">☕ Avoided Tea Today ("Cha khbona")</span>
                </div>
                <span class="badge-tag" style="background:#ffedd5; color:#c2410c">Skin Diet</span>
            </div>

            <div class="checklist-item task-anim-item ${isNoChoc ? 'done' : ''} ${isNoChoc && !showCompleted ? 'hide-completed' : ''}" onclick="app.toggleChecklistItem('noChocolate')">
                <div class="checklist-left">
                    <div class="custom-checkbox">${isNoChoc ? '✓' : ''}</div>
                    <span class="checklist-text">🍫 Avoided Chocolate Today ("Chocolate khbona")</span>
                </div>
                <span class="badge-tag" style="background:#ffedd5; color:#c2410c">Skin Diet</span>
            </div>

            <div class="checklist-item task-anim-item ${isNoOvereat ? 'done' : ''} ${isNoOvereat && !showCompleted ? 'hide-completed' : ''}" onclick="app.toggleChecklistItem('noOvereating')">
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

    toggleChecklistItem(key) {
        this.state.checklist[key] = !this.state.checklist[key];
        this.saveState();
        this.renderChecklistWidget();
        this.renderDonutChart();

        if (this.state.checklist[key]) {
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
            const isDone = this.state.techLearning[t.key];
            const hideClass = (isDone && !showCompleted) ? 'hide-completed' : '';

            html += `
                <div class="tech-card task-anim-item ${isDone ? 'completed' : ''} ${hideClass}" onclick="app.toggleTech('${t.key}')">
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

            <div class="goal-item" style="margin-top:20px;">
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
                date: new Date().toISOString().split('T')[0].slice(5),
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

        const birthdays = this.state.birthdays || [];
        const todayStr = new Date().toISOString().split('T')[0].slice(5); // 'MM-DD'

        let html = '';
        birthdays.forEach(b => {
            const isToday = b.date === todayStr;
            let wishMsg = `Happy ${b.type} ${b.name}! 🥳🎉 Wishing you a wonderful year filled with happiness, health & success! 🎂✨`;
            if (b.type === 'Anniversary') {
                wishMsg = `Happy Marriage Anniversary! 💍✨ Wishing Ma, Baba & Khadija Apu endless love, joy & happiness together! 💖🌸`;
            }
            const wishText = encodeURIComponent(wishMsg);
            const waUrl = `https://api.whatsapp.com/send?phone=${b.phone}&text=${wishText}`;

            html += `
                <div class="birthday-card" style="border-color:${isToday ? '#a3e635' : 'var(--kiwi-200)'}">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <span style="font-size:2rem;">${b.avatar || '🎂'}</span>
                        <div>
                            <div style="font-weight:700; font-size:1rem; color:var(--text-main)">
                                ${b.name} ${isToday ? '<span class="badge-tag" style="background:#f472b6; color:white">TODAY!</span>' : ''}
                            </div>
                            <div style="font-size:0.8rem; color:var(--text-muted);">${b.type}: <strong>${b.date}</strong></div>
                        </div>
                    </div>
                    <a href="${waUrl}" target="_blank" class="btn-whatsapp-wish">
                        <span>💬</span> Wish on WhatsApp
                    </a>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    checkTodayBirthdays() {
        const todayStr = new Date().toISOString().split('T')[0].slice(5);
        const todayBirthdays = (this.state.birthdays || []).filter(b => b.date === todayStr);

        if (todayBirthdays.length > 0) {
            setTimeout(() => {
                window.cuteAudio.playFanfare();
                this.triggerConfetti();
                const names = todayBirthdays.map(b => b.name).join(', ');
                this.showMascotDialogue(`🎉 TODAY IS ${names}'s Special Day! Click "Wish on WhatsApp" to send direct wishes! 🎂✨`);
            }, 1000);
        }
    }

    // Donut Progress Chart (Fresh Kiwi Colors)
    renderDonutChart() {
        const canvas = document.getElementById('progressChartCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width = 270;
        const height = canvas.height = 270;

        const namajDone = Object.values(this.state.namaj).filter(Boolean).length;
        const timersDone = Object.values(this.state.timers).filter(t => t.done || t.timeSpent >= t.targetSec).length;
        const techDone = Object.values(this.state.techLearning).filter(Boolean).length;
        const careDone = (this.state.checklist.chulAchrano ? 1 : 0) + (this.state.checklist.roomGhuchano ? 1 : 0);

        const totalItems = 5 + 4 + 6 + 2;
        const completedTotal = namajDone + timersDone + techDone + careDone;
        const percent = Math.round((completedTotal / totalItems) * 100);

        const data = [
            { label: 'Namaj', value: namajDone, total: 5, color: '#65a30d' },
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

        const btnText = this.state.settings.showCompletedItems ? "Hide Completed Tasks" : "Show Completed Tasks";
        const btn = document.getElementById('toggleCompletedBtn');
        if (btn) btn.innerText = btnText;
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
        const namajDone = Object.values(this.state.namaj).filter(Boolean).length;
        const waterL = this.state.checklist.waterLitersLogged || 0;
        const noTea = this.state.checklist.noTea ? 10 : 0;
        const noChoc = this.state.checklist.noChocolate ? 10 : 0;
        const techDone = Object.values(this.state.techLearning).filter(Boolean).length;
        
        let score = 50 + (namajDone * 6) + (Math.min(3, waterL) * 5) + noTea + noChoc + (techDone * 2);
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
        this.state.reflections.lastSubmittedDate = new Date().toISOString().split('T')[0];

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
        const todayStr = now.toISOString().split('T')[0];

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

    logCurrentDayToHistory() {
        if (!this.state.historyLogs) this.state.historyLogs = [];
        
        const namajDone = Object.values(this.state.namaj).filter(Boolean).length;
        const techDone = Object.values(this.state.techLearning).filter(Boolean).length;
        const totalItems = 5 + 4 + 6 + 2;
        const timersDone = Object.values(this.state.timers).filter(t => t.done || t.timeSpent >= t.targetSec).length;
        const careDone = (this.state.checklist.chulAchrano ? 1 : 0) + (this.state.checklist.roomGhuchano ? 1 : 0);
        const percent = Math.round(((namajDone + timersDone + techDone + careDone) / totalItems) * 100);

        const logEntry = {
            day: this.state.challenge.currentDay,
            date: new Date().toISOString().split('T')[0],
            percent: percent,
            namajDone: namajDone,
            weight: this.state.goals.currentWeightKg,
            water: this.state.checklist.waterLitersLogged || 0,
            techCount: techDone
        };

        const existingIdx = this.state.historyLogs.findIndex(h => h.day === logEntry.day);
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
        if (this.state.settings.wallpaperMode) {
            document.body.classList.add('wallpaper-mode');
        } else {
            document.body.classList.remove('wallpaper-mode');
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

    bindEvents() {}
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new SkyRoutineApp();
});
