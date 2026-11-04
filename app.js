/**
 * ChronoSprint Mastery & Habit Matrix - Core Application Engine
 * Real-time Habit Matrix, AI Timetable Synthesizer, Dynamic YouTube Recommendations,
 * Watch Later Vault, and Gated Lecture CheatNotes System.
 */

// ==========================================
// 1. DATA STATE & PRESETS
// ==========================================
const STORAGE_KEY = 'CHRONO_SPRINT_APP_V2';
const API_CONFIG_KEY = 'CHRONO_SPRINT_API_CONFIG';

// Default High-Impact Habit Matrix Data (Matches 31-day spreadsheet)
const defaultHabits = [
  { id: 1, name: 'Drink 16fl oz of Water upon waking', category: 'Health', goal: 30, days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] },
  { id: 2, name: 'Solve 2 LeetCode Mediums (Trees/Graphs)', category: 'Study', goal: 26, days: [1,2,3,4,5,8,9,10,11,12,15,16,17,18,19] },
  { id: 3, name: 'Read System Design & OS Memory Mgmt', category: 'Study', goal: 20, days: [1,2,3,4,8,9,10,15,16,17] },
  { id: 4, name: 'Core Project Git Commits & Unit Tests', category: 'Skill', goal: 24, days: [1,2,3,4,5,8,9,10,11,15,16,18,19] },
  { id: 5, name: 'Play Tennis or 45m Gym Workout', category: 'Health', goal: 16, days: [1,3,5,8,10,12,15,17,19] },
  { id: 6, name: 'Anki Flashcard Spaced Repetition (50 cards)', category: 'Study', goal: 28, days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] },
  { id: 7, name: 'Zero Screen Time 30m before Sleep', category: 'Mindset', goal: 25, days: [1,2,3,4,8,9,10,11,15,16,17,18] },
  { id: 8, name: 'Evening Loophole Retrospective Journal', category: 'Mindset', goal: 28, days: [1,2,3,4,5,8,9,10,11,12,15,16,17,18,19] },
  { id: 9, name: 'Technical Article / Research Paper Reading', category: 'Skill', goal: 15, days: [2,4,9,11,16,18] },
  { id: 10, name: '30-minute Posture & Mobility Stretching', category: 'Health', goal: 20, days: [1,2,3,4,5,8,9,10,15,16] }
];

let weeklyGoals = [
  { id: 1, title: 'Complete 15 LC Graph Problems', current: 12, target: 15, status: 'On Track' },
  { id: 2, title: 'Finish OS Concurrency & Deadlock Chapter', current: 4, target: 5, status: 'On Track' },
  { id: 3, title: 'Deploy Microservices Auth on AWS', current: 2, target: 3, status: 'Behind' },
];

let monthlyGoals = [
  { id: 101, title: 'Solve 60 DSA LeetCode Medium/Hard', current: 42, target: 60, status: 'On Track' },
  { id: 102, title: 'Complete 120 Deep Work Focus Hours', current: 85, target: 120, status: 'On Track' },
  { id: 103, title: 'Achieve > 80% Habit Matrix Compliance', current: 65, target: 100, status: 'Behind' },
];

// Curated YouTube Masterclass Recommendations Catalog
const defaultVideos = [
  {
    id: 'yt-1',
    youtubeId: 'xLETJpc_80A',
    title: 'How to Speak So That People Want to Listen',
    channel: 'TED / Julian Treasure',
    category: 'Communication',
    duration: '9:58',
    fieldBadge: 'Soft Skills & Voice',
    description: 'Master the 7 deadly sins of speaking and learn the HAIL framework (Honesty, Authenticity, Integrity, Love) to command rooms and interviews.',
    cheatNotes: {
      synopsis: 'Julian Treasure reveals how the human voice is the most powerful sound on earth. He deconstructs the negative habits that cause people to tune you out and gives a 4-part toolkit for high-impact resonance.',
      principles: [
        'Avoid the 7 Deadly Sins: Gossip, Judging, Negativity, Complaining, Excuses, Exaggeration, Dogmatism.',
        'Adopt the HAIL Compass: Honesty (be clear and straight), Authenticity (be yourself), Integrity (be your word), Love (wish them well).',
        'Voice Toolbox: Register (speak from the chest for authority), Timbre (rich and warm), Prosody (avoid monotone and rising up-talk), Pace (strategic silence creates tension), Pitch & Volume.'
      ],
      flashcards: [
        { q: 'What does the acronym HAIL stand for?', a: 'Honesty, Authenticity, Integrity, and Love.' },
        { q: 'Where should your speaking vocal register resonate from to convey deep gravitas?', a: 'From the chest (lower register), not the throat or nose.' },
        { q: 'Why is deliberate silence more powerful than filler words (um, ah)?', a: 'Silence creates suspense, gives listeners time to digest, and signals confidence.' }
      ],
      drill: 'Conduct a 2-minute vocal warm-up (lip trills, tongue sirens, chest resonance hum) before your next stand-up or interview.'
    }
  },
  {
    id: 'yt-2',
    youtubeId: '094y1Z2wpJg',
    title: 'Graph Data Structure & Algorithms Masterclass',
    channel: 'freeCodeCamp / William Fiset',
    category: 'Tech',
    duration: '15:20',
    fieldBadge: 'DSA & Coding',
    description: 'Essential graph algorithms: BFS, DFS, Dijkstra, Bellman-Ford, and Topological Sort with asymptotic complexity breakdowns.',
    cheatNotes: {
      synopsis: 'Complete mental blueprint of Graph Theory for technical interviews. Covers adjacency lists vs matrices, traversal algorithms, and shortest-path variants.',
      principles: [
        'Adjacency List is optimal for sparse graphs: O(V + E) space. Adjacency Matrix is best for dense graphs: O(V²) space.',
        'BFS uses a Queue: guaranteed shortest path in unweighted graphs. Time: O(V + E).',
        'DFS uses a Stack (or recursion): optimal for topological sorting, cycle detection, and maze solving. Time: O(V + E).',
        'Dijkstra Algorithm: greedy shortest path with non-negative weights using Min-Heap. Time: O((V + E) log V).'
      ],
      flashcards: [
        { q: 'When can Dijkstra algorithm fail on a directed graph?', a: 'When negative edge weights are present (use Bellman-Ford instead).' },
        { q: 'What is the time complexity of Topological Sort using Kahn algorithm?', a: 'O(V + E) using in-degree array and a queue.' },
        { q: 'Which graph traversal is optimal for finding connected components?', a: 'Both DFS and BFS visit all reachable nodes in O(V + E).' }
      ],
      drill: 'Solve LeetCode #207 (Course Schedule) using Kahn Algorithm Topological Sort.'
    }
  },
  {
    id: 'yt-3',
    youtubeId: 'i_LwzRVP7bg',
    title: 'System Design Interview: How to Design a Scalable Architecture',
    channel: 'ByteByteGo / Alex Xu',
    category: 'SystemDesign',
    duration: '12:45',
    fieldBadge: 'Architecture & Cloud',
    description: 'Step-by-step framework to scale an application from 1 to 10 million users: Load Balancers, Caching, DB Sharding, and CDNs.',
    cheatNotes: {
      synopsis: 'Alex Xu teaches the industry-standard 4-step framework for system design: Scoping requirements, High-level design, Deep dive into bottlenecks, and Scaling trade-offs.',
      principles: [
        'Tier 1: Vertical Scaling (Bigger machine) has hard limits. Horizontal scaling (More machines) requires Stateless servers.',
        'Tier 2: Caching strategy: Cache-aside vs Write-through. Use Redis for session state and hot data reads.',
        'Tier 3: Database scaling: Read replicas for read-heavy loads; Horizontal sharding (hash-based) for writes.',
        'Tier 4: Decoupling: Use message queues (Kafka, SQS) to buffer spikes and process asynchronous tasks.'
      ],
      flashcards: [
        { q: 'What is the CAP Theorem trade-off during network partition?', a: 'A distributed system must choose between Consistency (all nodes see latest data) or Availability (every request receives a response).' },
        { q: 'Why place a CDN in front of static and media assets?', a: 'Pushes content to edge servers geographically close to users, cutting latency to under 30ms.' },
        { q: 'What is the difference between Cache-Aside and Write-Through?', a: 'Cache-Aside reads cache first and queries DB on miss; Write-Through updates cache and DB synchronously on every write.' }
      ],
      drill: 'Draw the high-level architecture diagram for a URL Shortener (Bitly) on paper in under 10 minutes.'
    }
  },
  {
    id: 'yt-4',
    youtubeId: 'a7WA4hM2L6E',
    title: 'How to Build Unshakeable Focus & Dopamine Control',
    channel: 'Huberman Lab / Dr. Andrew Huberman',
    category: 'Productivity',
    duration: '14:10',
    fieldBadge: 'Neuroscience & Habit',
    description: 'Science of dopamine friction, ultradian 90-minute focus cycles, and physiological sighs to instantly extinguish study burnout.',
    cheatNotes: {
      synopsis: 'Neurobiologist Andrew Huberman unpacks how dopamine peaks and troughs dictate motivation, and how to harness friction to build sustained cognitive endurance.',
      principles: [
        'Ultradian Rhythm: Human brain operates in 90-minute optimal focus bouts. Expect 5-10 minutes of friction before entering flow.',
        'Dopamine Baseline: Do not layer multiple high-dopamine stimuli (energy drinks + loud music + social media) or baseline crashes afterward.',
        'Physiological Sigh: Two quick inhales through the nose followed by a long exhale through the mouth drops heart rate in under 15 seconds.',
        'Visual Focus: Tunneling your visual field to a 10cm circle on your screen triggers acetylcholine release, tightening mental concentration.'
      ],
      flashcards: [
        { q: 'How long is the biological ultradian focus cycle for cognitive work?', a: 'Approximately 90 minutes, followed by a mandatory 20-minute mental reset.' },
        { q: 'What breathing technique rapidly activates the parasympathetic nervous system during study stress?', a: 'The Physiological Sigh (double inhale through nose, extended exhale through mouth).' },
        { q: 'What happens to motivation when you attach dopamine to the reward instead of the friction of learning?', a: 'Motivation drops over time. You must learn to enjoy the friction itself.' }
      ],
      drill: 'Execute one strict 90-minute distraction-free study block today with your phone in another room.'
    }
  },
  {
    id: 'yt-5',
    youtubeId: 'BHY0FxzoKZE',
    title: 'Think Fast, Talk Smart: Communication Techniques',
    channel: 'Stanford Graduate School of Business',
    category: 'Communication',
    duration: '18:35',
    fieldBadge: 'Impromptu Speaking',
    description: 'Matt Abrahams shares frameworks (What? So What? Now What?) to manage anxiety and speak with clarity on the spot.',
    cheatNotes: {
      synopsis: 'Stanford lecturer Matt Abrahams demonstrates how to conquer spontaneous speaking anxiety and structure clear, memorable communication under pressure.',
      principles: [
        'Dare to be dull: Trying to be brilliant induces performance freeze. Focus on making a connection, not perfection.',
        'Structure is your safety net: Use the "What? So What? Now What?" framework for answers, meetings, and emails.',
        'Reframing anxiety: View public speaking as a conversation, not a performance or test.',
        'Listening first: Spontaneous mastery requires full active listening without mentally formulating your response while the other person is still speaking.'
      ],
      flashcards: [
        { q: 'What is the "What? So What? Now What?" framework?', a: 'What (define the topic/fact), So What (explain why it matters/relevance), Now What (outline next steps/action).' },
        { q: 'How should you reframe physiological symptoms of nervousness (racing heart)?', a: 'Reframe it as excitement and energy preparing you to deliver your message.' },
        { q: 'What is the biggest enemy of spontaneous communication?', a: 'Trying to be perfect or perform brilliantly instead of just being present and authentic.' }
      ],
      drill: 'Answer a friend or colleague question using "What? So What? Now What?" structure today.'
    }
  },
  {
    id: 'yt-6',
    youtubeId: 'e-ORhEE9VVg',
    title: 'Generative AI & LLM Systems from Scratch',
    channel: 'Andrej Karpathy',
    category: 'Tech',
    duration: '16:40',
    fieldBadge: 'AI & Deep Learning',
    description: 'Deconstruct Self-Attention, Transformer heads, token embeddings, and how Large Language Models generate human-grade reasoning.',
    cheatNotes: {
      synopsis: 'Former Tesla AI Director and OpenAI co-founder Andrej Karpathy explains the fundamental mechanics of Transformers and next-token prediction.',
      principles: [
        'Transformers treat text as discrete token IDs mapped to dense vector embeddings.',
        'Self-Attention Mechanism: Q (Query), K (Key), V (Value). Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) * V.',
        'Multi-Head Attention allows the model to simultaneously attend to information from different representation subspaces.',
        'Pre-training compresses internet text; Fine-tuning and RLHF align model responses to human preferences and instructions.'
      ],
      flashcards: [
        { q: 'What is the formula for scaled dot-product attention?', a: 'softmax((Q * K^T) / sqrt(d_k)) * V' },
        { q: 'Why do we divide by sqrt(d_k) in the attention formula?', a: 'To prevent the dot products from growing excessively large for large dimensions, which would push softmax into regions with tiny gradients.' },
        { q: 'What is the fundamental objective of autoregressive language models?', a: 'To predict the probability distribution of the next token given preceding context tokens.' }
      ],
      drill: 'Explain self-attention out loud to yourself using an analogy of looking up a book in a library.'
    }
  }
];

// App State
let habits = [];
let videos = [];
let savedVideos = [];
let currentActiveView = 'matrix';
let donutCharts = {};
let dailyTrendChartInstance = null;
let categoryBalanceChartInstance = null;

// Video Player & CheatNotes Gated Lock State
let activePlayingVideo = null;
let currentVideoProgressPercent = 0;
let unlockedVideos = {};
let customApiKey = '';

// Mascot Mood State
let mascotMood = 'idle'; // idle | thinking | cheering | focus

// ==========================================
// 2. AUDIO SYNTHESIS & SOUND EFFECTS ENGINE
// ==========================================
const soundFX = {
  ctx: null,
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },
  playTone(freq, duration, type = 'sine', gainVal = 0.1) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio not supported or blocked
    }
  },
  checkSound() {
    this.playTone(587.33, 0.12, 'triangle', 0.08); // D5
    setTimeout(() => this.playTone(880, 0.18, 'triangle', 0.08), 80); // A5
  },
  successChime() {
    this.playTone(523.25, 0.15, 'sine', 0.12); // C5
    setTimeout(() => this.playTone(659.25, 0.15, 'sine', 0.12), 100); // E5
    setTimeout(() => this.playTone(783.99, 0.25, 'sine', 0.15), 200); // G5
    setTimeout(() => this.playTone(1046.50, 0.4, 'sine', 0.18), 300); // C6
  },
  unlockSound() {
    this.playTone(440, 0.15, 'triangle', 0.15);
    setTimeout(() => this.playTone(554.37, 0.15, 'triangle', 0.15), 100);
    setTimeout(() => this.playTone(659.25, 0.2, 'triangle', 0.18), 200);
    setTimeout(() => this.playTone(830.61, 0.25, 'triangle', 0.2), 300);
    setTimeout(() => this.playTone(1108.73, 0.5, 'triangle', 0.22), 400);
  }
};

// ==========================================
// 3. PERSISTENCE & INITIALIZATION
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  loadAppData();
  renderMatrixTable();
  initDonutCharts();
  initSecondaryCharts();
  updateAllCalculationsAndCharts();
  renderVideosFeed();
  renderSavedVideosVault();
  runLoopholeAudit();
  generateTimetable();
  initMascot();
  initRealtimeClock();
  initPWAInstallPrompt();
});

function loadAppData() {
  // Load API config
  const apiStored = localStorage.getItem(API_CONFIG_KEY);
  if (apiStored) {
    try {
      const cfg = JSON.parse(apiStored);
      customApiKey = cfg.apiKey || '';
    } catch (e) {}
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      habits = parsed.habits && parsed.habits.length ? parsed.habits : defaultHabits;
      weeklyGoals = parsed.weeklyGoals || weeklyGoals;
      monthlyGoals = parsed.monthlyGoals || monthlyGoals;
      videos = parsed.videos && parsed.videos.length ? parsed.videos : defaultVideos;
      savedVideos = parsed.savedVideos || [];
      unlockedVideos = parsed.unlockedVideos || {};
      return;
    } catch (e) {
      console.error('Error loading saved state', e);
    }
  }

  // Fallback defaults
  habits = JSON.parse(JSON.stringify(defaultHabits));
  videos = JSON.parse(JSON.stringify(defaultVideos));
  savedVideos = [defaultVideos[0].id, defaultVideos[2].id]; // Sample saved
  unlockedVideos = {};
}

function saveAppData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    habits,
    weeklyGoals,
    monthlyGoals,
    videos,
    savedVideos,
    unlockedVideos
  }));
}

function loadSamplePresets() {
  habits = JSON.parse(JSON.stringify(defaultHabits));
  videos = JSON.parse(JSON.stringify(defaultVideos));
  saveAppData();
  renderMatrixTable();
  updateAllCalculationsAndCharts();
  renderVideosFeed();
  renderSavedVideosVault();
  runLoopholeAudit();
  soundFX.checkSound();
  triggerMascotReaction('cheering', 'High-performance template synchronized!');
}

// ==========================================
// 4. REAL-TIME CLOCK & STATUS MONITOR
// ==========================================
function initRealtimeClock() {
  const clockEl = document.getElementById('realtimeClock');
  const dayBadgeEl = document.getElementById('currentDayBadge');

  function update() {
    const now = new Date();
    if (clockEl) {
      clockEl.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    if (dayBadgeEl) {
      const day = now.getDate();
      dayBadgeEl.innerText = `Today: Day ${day}`;
    }
  }

  update();
  setInterval(update, 1000);
}

// ==========================================
// 5. VIEW NAVIGATION CONTROLLER
// ==========================================
function switchView(viewName) {
  currentActiveView = viewName;
  const viewSections = ['viewMatrix', 'viewAI', 'viewVideos', 'viewPlayer', 'viewVault', 'viewGoals'];
  const tabButtons = ['tabBtnMatrix', 'tabBtnAI', 'tabBtnVideos', 'tabBtnPlayer', 'tabBtnVault', 'tabBtnGoals'];
  const mobileButtons = ['mobTabMatrix', 'mobTabAI', 'mobTabVideos', 'mobTabPlayer', 'mobTabVault'];

  viewSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  tabButtons.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.className = "px-3.5 py-1.5 rounded-lg font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5";
    }
  });

  mobileButtons.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('text-purple-400', 'font-bold');
      el.classList.add('text-slate-400');
    }
  });

  // Activate chosen view
  const targetSection = document.getElementById(`view${capitalize(viewName)}`);
  if (targetSection) targetSection.classList.remove('hidden');

  const targetTab = document.getElementById(`tabBtn${capitalize(viewName)}`);
  if (targetTab) {
    targetTab.className = "px-3.5 py-1.5 rounded-lg font-semibold bg-indigo-600 text-white transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/30";
  }

  const targetMob = document.getElementById(`mobTab${capitalize(viewName)}`);
  if (targetMob) {
    targetMob.classList.remove('text-slate-400');
    targetMob.classList.add('text-purple-400', 'font-bold');
  }

  soundFX.playTone(400, 0.05, 'sine', 0.04);

  // Resize charts if opening matrix
  if (viewName === 'matrix') {
    setTimeout(() => {
      Object.values(donutCharts).forEach(c => c && c.resize());
      if (dailyTrendChartInstance) dailyTrendChartInstance.resize();
      if (categoryBalanceChartInstance) categoryBalanceChartInstance.resize();
    }, 60);
  } else if (viewName === 'ai') {
    runLoopholeAudit();
    triggerMascotReaction('thinking', 'Astra AI ready. Ask me any question or request a custom schedule!');
  } else if (viewName === 'vault') {
    renderSavedVideosVault();
  } else if (viewName === 'videos') {
    renderVideosFeed();
  } else if (viewName === 'goals') {
    renderGoals();
  }
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ==========================================
// 6. ANIMATED MASCOT COMPANION (ASTRA)
// ==========================================
const mascotQuotes = [
  "Consistency is the only superpower that cannot be faked.",
  "Deep focus for 90 minutes beats 8 hours of distracted browsing.",
  "Check off your priority habits early before willpower is drained!",
  "Every completed lecture unlocks CheatNotes for permanent memory.",
  "Small wins compound exponentially. Protect your momentum!",
  "Loophole Doctor is constantly scanning your weekly patterns."
];

function initMascot() {
  const speechBubble = document.getElementById('mascotSpeechBubble');
  if (speechBubble) {
    speechBubble.innerText = mascotQuotes[Math.floor(Math.random() * mascotQuotes.length)];
  }

  // Periodic random wisdom
  setInterval(() => {
    if (mascotMood === 'idle' && speechBubble) {
      speechBubble.innerText = mascotQuotes[Math.floor(Math.random() * mascotQuotes.length)];
    }
  }, 22000);
}

function triggerMascotReaction(mood, text = null) {
  mascotMood = mood;
  const avatar = document.getElementById('mascotAvatarEl');
  const speechBubble = document.getElementById('mascotSpeechBubble');
  const eyes = document.querySelectorAll('.mascot-eye');

  if (speechBubble && text) {
    speechBubble.innerText = text;
    speechBubble.classList.remove('speech-bubble');
    void speechBubble.offsetWidth; // trigger reflow
    speechBubble.classList.add('speech-bubble');
  }

  if (avatar) {
    avatar.classList.remove('mascot-celebrate', 'mascot-avatar-float');
    if (mood === 'cheering') {
      avatar.classList.add('mascot-celebrate');
      if (window.confetti) {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.85, x: 0.85 }
        });
      }
    } else {
      avatar.classList.add('mascot-avatar-float');
    }
  }

  setTimeout(() => {
    mascotMood = 'idle';
    if (avatar) {
      avatar.classList.remove('mascot-celebrate');
      avatar.classList.add('mascot-avatar-float');
    }
  }, 4000);
}

function interactWithMascot() {
  soundFX.playTone(700, 0.1, 'triangle', 0.1);
  triggerMascotReaction('cheering', "I'm right here with you! Let's conquer today's matrix!");
}

// ==========================================
// 7. MATRIX SPREADSHEET TABLE LOGIC
// ==========================================
function getWeekInfo(day) {
  if (day <= 7) return { week: 1, class: 'w1-check' };
  if (day <= 14) return { week: 2, class: 'w2-check' };
  if (day <= 21) return { week: 3, class: 'w3-check' };
  if (day <= 28) return { week: 4, class: 'w4-check' };
  return { week: 5, class: 'w5-check' };
}

function renderMatrixTable() {
  const tbody = document.getElementById('matrixTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const todayDate = new Date().getDate();

  habits.forEach((habit) => {
    const tr = document.createElement('tr');
    tr.className = "hover:bg-white/[0.03] transition-colors border-b border-white/5";

    const completedCount = habit.days ? habit.days.length : 0;
    const progressPct = Math.min(100, Math.round((completedCount / (habit.goal || 30)) * 100));

    const catBadge = {
      'Study': 'text-sky-400 bg-sky-950/60 border-sky-800/40',
      'Skill': 'text-purple-400 bg-purple-950/60 border-purple-800/40',
      'Health': 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40',
      'Mindset': 'text-amber-400 bg-amber-950/60 border-amber-800/40'
    }[habit.category] || 'text-slate-400 bg-slate-900 border-white/10';

    let html = `
      <td class="p-2.5 pl-3 border-r border-white/10">
        <div class="flex items-center justify-between gap-2">
          <span class="font-medium text-slate-100 truncate block max-w-[190px]" title="${habit.name}">${habit.name}</span>
          <span class="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${catBadge}">${habit.category || 'Task'}</span>
        </div>
      </td>
    `;

    // 31 days checkboxes
    for (let d = 1; d <= 31; d++) {
      const wInfo = getWeekInfo(d);
      const isChecked = habit.days && habit.days.includes(d);
      const isToday = (d === todayDate);
      const borderRight = (d === 7 || d === 14 || d === 21 || d === 28 || d === 31) 
        ? 'border-r-2 border-white/10' 
        : 'border-r border-white/5';
      const todayBg = isToday ? 'bg-indigo-500/10' : '';

      html += `
        <td class="text-center p-1 ${borderRight} ${todayBg}">
          <input type="checkbox" ${isChecked ? 'checked' : ''} 
            onchange="toggleCell(${habit.id}, ${d})" 
            class="cell-checkbox ${wInfo.class}">
        </td>
      `;
    }

    // Goal Column
    html += `
      <td class="text-center font-mono font-bold text-amber-300 border-r border-white/10 bg-amber-950/10">
        <input type="number" min="1" max="31" value="${habit.goal || 25}" 
          onchange="updateHabitGoal(${habit.id}, this.value)" 
          class="w-12 text-center bg-transparent border-b border-transparent hover:border-white/20 focus:outline-none font-mono">
      </td>
    `;

    // Progress Column
    html += `
      <td class="p-2 border-r border-white/10">
        <div class="flex items-center gap-2">
          <div class="flex-1 bg-brand-950 h-3 rounded overflow-hidden border border-white/10 p-0.5">
            <div class="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-sky-400 rounded-sm transition-all duration-300" style="width: ${progressPct}%"></div>
          </div>
          <span class="text-[10px] font-mono text-slate-300 w-8 text-right">${progressPct}%</span>
        </div>
      </td>
    `;

    // Action Column
    html += `
      <td class="text-center p-1">
        <button onclick="deleteHabit(${habit.id})" class="text-slate-500 hover:text-rose-400 p-1 transition-colors" title="Delete Habit">
          <i class="ph-bold ph-trash"></i>
        </button>
      </td>
    `;

    tr.innerHTML = html;
    tbody.appendChild(tr);
  });
}

function toggleCell(habitId, day) {
  const habit = habits.find(h => h.id === habitId);
  if (!habit) return;

  if (!habit.days) habit.days = [];
  const index = habit.days.indexOf(day);
  const isAdding = (index === -1);

  if (!isAdding) {
    habit.days.splice(index, 1);
  } else {
    habit.days.push(day);
    habit.days.sort((a,b) => a-b);
  }

  saveAppData();
  renderMatrixTable();
  updateAllCalculationsAndCharts();
  runLoopholeAudit();

  if (isAdding) {
    soundFX.checkSound();
    triggerMascotReaction('cheering', `Checked Day ${day}! +1 Habit streak!`);
  } else {
    soundFX.playTone(280, 0.08, 'sine', 0.06);
  }
}

function updateHabitGoal(habitId, newGoal) {
  const habit = habits.find(h => h.id === habitId);
  if (habit) {
    habit.goal = parseInt(newGoal) || 20;
    saveAppData();
    renderMatrixTable();
    updateAllCalculationsAndCharts();
  }
}

function deleteHabit(habitId) {
  if (confirm('Are you sure you want to delete this habit from your matrix?')) {
    habits = habits.filter(h => h.id !== habitId);
    saveAppData();
    renderMatrixTable();
    updateAllCalculationsAndCharts();
    runLoopholeAudit();
    soundFX.playTone(200, 0.1, 'sawtooth', 0.05);
  }
}

function changeCalendarMonth() {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const m = parseInt(document.getElementById('monthSelect').value);
  const y = document.getElementById('yearSelect').value;
  const banner = document.getElementById('matrixBannerTitle');
  if (banner) banner.innerText = `(${monthNames[m]}) ${y} Habit & Skill Mastery Tracker`;
}

// Modal Handlers
function openAddHabitModal() {
  document.getElementById('addHabitModal').classList.remove('hidden');
}
function closeAddHabitModal() {
  document.getElementById('addHabitModal').classList.add('hidden');
}
function handleCreateHabit(e) {
  e.preventDefault();
  const name = document.getElementById('habitInputName').value.trim();
  const category = document.getElementById('habitInputCategory').value;
  const goal = parseInt(document.getElementById('habitInputGoal').value) || 25;

  if (!name) return;

  habits.push({
    id: Date.now(),
    name,
    category,
    goal,
    days: []
  });

  saveAppData();
  closeAddHabitModal();
  document.getElementById('habitInputName').value = '';
  renderMatrixTable();
  updateAllCalculationsAndCharts();
  runLoopholeAudit();
  soundFX.successChime();
  triggerMascotReaction('cheering', `Added new habit: "${name}"!`);
}

// Calculations & Donut Charts
function updateAllCalculationsAndCharts() {
  const totalHabitsCount = habits.length;
  const dailyDone = new Array(32).fill(0);

  habits.forEach(h => {
    if (h.days) {
      h.days.forEach(d => {
        if (d >= 1 && d <= 31) dailyDone[d]++;
      });
    }
  });

  const completedRow = document.getElementById('dailyCompletedRow');
  const incompleteRow = document.getElementById('dailyIncompleteRow');
  if (completedRow) completedRow.innerHTML = '';
  if (incompleteRow) incompleteRow.innerHTML = '';

  let grandDoneSum = 0;
  let grandIncompleteSum = 0;

  for (let d = 1; d <= 31; d++) {
    const done = dailyDone[d];
    const incomplete = Math.max(0, totalHabitsCount - done);
    grandDoneSum += done;
    grandIncompleteSum += incomplete;

    const border = (d === 7 || d === 14 || d === 21 || d === 28 || d === 31) ? 'border-r-2 border-white/10' : 'border-r border-white/5';
    if (completedRow) completedRow.innerHTML += `<div class="py-1 ${border}">${done}</div>`;
    if (incompleteRow) incompleteRow.innerHTML += `<div class="py-1 ${border}">${incomplete}</div>`;
  }

  const grandDoneEl = document.getElementById('grandTotalCompleted');
  const grandIncompEl = document.getElementById('grandTotalIncomplete');
  if (grandDoneEl) grandDoneEl.innerText = grandDoneSum;
  if (grandIncompEl) grandIncompEl.innerText = grandIncompleteSum;

  // Weekly Sums
  const w1Done = sumDays(dailyDone, 1, 7);
  const w2Done = sumDays(dailyDone, 8, 14);
  const w3Done = sumDays(dailyDone, 15, 21);
  const w4Done = sumDays(dailyDone, 22, 28);
  const w5Done = sumDays(dailyDone, 29, 31);

  const w1Max = totalHabitsCount * 7;
  const w2Max = totalHabitsCount * 7;
  const w3Max = totalHabitsCount * 7;
  const w4Max = totalHabitsCount * 7;
  const w5Max = totalHabitsCount * 3;
  const grandMax = totalHabitsCount * 31;

  setElText('w1CompletedSum', w1Done);
  setElText('w1IncompleteSum', Math.max(0, w1Max - w1Done));
  setElText('w2CompletedSum', w2Done);
  setElText('w2IncompleteSum', Math.max(0, w2Max - w2Done));
  setElText('w3CompletedSum', w3Done);
  setElText('w3IncompleteSum', Math.max(0, w3Max - w3Done));
  setElText('w4CompletedSum', w4Done);
  setElText('w4IncompleteSum', Math.max(0, w4Max - w4Done));
  setElText('w5CompletedSum', w5Done);
  setElText('w5IncompleteSum', Math.max(0, w5Max - w5Done));

  const w1Pct = w1Max > 0 ? (w1Done / w1Max) * 100 : 0;
  const w2Pct = w2Max > 0 ? (w2Done / w2Max) * 100 : 0;
  const w3Pct = w3Max > 0 ? (w3Done / w3Max) * 100 : 0;
  const w4Pct = w4Max > 0 ? (w4Done / w4Max) * 100 : 0;
  const w5Pct = w5Max > 0 ? (w5Done / w5Max) * 100 : 0;
  const grandPct = grandMax > 0 ? (grandDoneSum / grandMax) * 100 : 0;

  setElText('w1PercentageLabel', `${w1Pct.toFixed(2)}%`);
  setElText('w2PercentageLabel', `${w2Pct.toFixed(2)}%`);
  setElText('w3PercentageLabel', `${w3Pct.toFixed(2)}%`);
  setElText('w4PercentageLabel', `${w4Pct.toFixed(2)}%`);
  setElText('w5PercentageLabel', `${w5Pct.toFixed(2)}%`);
  setElText('totalMonthPercentageLabel', `${grandPct.toFixed(2)}%`);

  const totalGoalTarget = habits.reduce((acc, h) => acc + (h.goal || 25), 0);
  setElText('headerTotalGoal', totalGoalTarget);
  setElText('headerTotalDone', grandDoneSum);
  setElText('headerTotalPct', `${grandPct.toFixed(1)}%`);

  updateDonutChart('w1', w1Done, Math.max(0, w1Max - w1Done), '#f59e0b');
  updateDonutChart('w2', w2Done, Math.max(0, w2Max - w2Done), '#0284c7');
  updateDonutChart('w3', w3Done, Math.max(0, w3Max - w3Done), '#e11d48');
  updateDonutChart('w4', w4Done, Math.max(0, w4Max - w4Done), '#10b981');
  updateDonutChart('w5', w5Done, Math.max(0, w5Max - w5Done), '#9333ea');
  updateDonutChart('totalMonth', grandDoneSum, Math.max(0, grandMax - grandDoneSum), '#8b5cf6');

  if (dailyTrendChartInstance) {
    dailyTrendChartInstance.data.datasets[0].data = dailyDone.slice(1, 32);
    dailyTrendChartInstance.update();
  }

  updateCategoryBalanceChart();
}

function sumDays(arr, start, end) {
  let sum = 0;
  for (let i = start; i <= end; i++) sum += arr[i] || 0;
  return sum;
}

function setElText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

function initDonutCharts() {
  const keys = ['w1', 'w2', 'w3', 'w4', 'w5', 'totalMonth'];
  keys.forEach(k => {
    const canvas = document.getElementById(`${k}DonutChart`);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    donutCharts[k] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [1, 9],
          backgroundColor: ['#6366f1', 'rgba(255,255,255,0.06)'],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });
  });
}

function updateDonutChart(key, done, remaining, accentColor) {
  const chart = donutCharts[key];
  if (!chart) return;
  if (done === 0 && remaining === 0) remaining = 1;

  chart.data.datasets[0].data = [done, remaining];
  chart.data.datasets[0].backgroundColor = [accentColor, 'rgba(255,255,255,0.06)'];
  chart.update();
}

function initSecondaryCharts() {
  const bEl = document.getElementById('dailyTrendBarChart');
  if (bEl) {
    const bCtx = bEl.getContext('2d');
    const labels = Array.from({ length: 31 }, (_, i) => `D${i + 1}`);
    dailyTrendChartInstance = new Chart(bCtx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Completed Habits',
          data: new Array(31).fill(0),
          backgroundColor: (ctx) => {
            const d = ctx.dataIndex + 1;
            if (d <= 7) return 'rgba(245, 158, 11, 0.85)';
            if (d <= 14) return 'rgba(2, 132, 199, 0.85)';
            if (d <= 21) return 'rgba(225, 29, 72, 0.85)';
            if (d <= 28) return 'rgba(16, 185, 129, 0.85)';
            return 'rgba(147, 51, 234, 0.85)';
          },
          borderRadius: 4,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#64748b', font: { size: 10 } }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#94a3b8', font: { size: 9, family: 'JetBrains Mono' } }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  const cEl = document.getElementById('categoryBalanceChart');
  if (cEl) {
    const cCtx = cEl.getContext('2d');
    categoryBalanceChartInstance = new Chart(cCtx, {
      type: 'polarArea',
      data: {
        labels: ['Study', 'Skill', 'Health', 'Mindset'],
        datasets: [{
          data: [4, 3, 2, 1],
          backgroundColor: [
            'rgba(2, 132, 199, 0.75)',
            'rgba(147, 51, 234, 0.75)',
            'rgba(16, 185, 129, 0.75)',
            'rgba(245, 158, 11, 0.75)'
          ],
          borderWidth: 1,
          borderColor: '#0b0f24'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            ticks: { display: false },
            grid: { color: 'rgba(255,255,255,0.05)' }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#94a3b8', font: { size: 10, family: 'Inter' } }
          }
        }
      }
    });
  }
}

function updateCategoryBalanceChart() {
  if (!categoryBalanceChartInstance) return;
  const catCounts = { Study: 0, Skill: 0, Health: 0, Mindset: 0 };
  habits.forEach(h => {
    const cat = h.category || 'Study';
    if (catCounts[cat] !== undefined) catCounts[cat]++;
  });

  categoryBalanceChartInstance.data.datasets[0].data = [
    catCounts.Study,
    catCounts.Skill,
    catCounts.Health,
    catCounts.Mindset
  ];
  categoryBalanceChartInstance.update();
}

// ==========================================
// 8. MATRIX LOOPHOLE DOCTOR ALGORITHM
// ==========================================
function runLoopholeAudit() {
  const container = document.getElementById('loopholeContainer');
  if (!container) return;
  container.innerHTML = '';

  const weekends = [6, 7, 13, 14, 20, 21, 27, 28];
  let weekendDone = 0;
  let weekendTotal = weekends.length * habits.length;
  let weekdayDone = 0;
  let weekdayTotal = (31 - weekends.length) * habits.length;

  habits.forEach(h => {
    if (h.days) {
      h.days.forEach(d => {
        if (weekends.includes(d)) weekendDone++;
        else weekdayDone++;
      });
    }
  });

  const weekendRate = weekendTotal > 0 ? (weekendDone / weekendTotal) * 100 : 0;
  const weekdayRate = weekdayTotal > 0 ? (weekdayDone / weekdayTotal) * 100 : 0;

  // 1. Weekend Diagnostic Card
  const isWeekendSlump = weekendRate < (weekdayRate - 12);
  const card1 = document.createElement('div');
  card1.className = `p-4 rounded-xl border ${isWeekendSlump ? 'bg-rose-950/20 border-rose-500/30' : 'bg-emerald-950/20 border-emerald-500/30'}`;
  card1.innerHTML = `
    <div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider ${isWeekendSlump ? 'text-rose-400' : 'text-emerald-400'}">
      <span>${isWeekendSlump ? 'High Friction Loophole' : 'Weekend Resilience'}</span>
      <i class="ph-bold ${isWeekendSlump ? 'ph-warning' : 'ph-shield-check'} text-base"></i>
    </div>
    <h4 class="text-sm font-bold text-white mt-2">${isWeekendSlump ? 'Weekend Friction Valley Detected' : 'Solid Saturday-Sunday Consistency'}</h4>
    <p class="text-xs text-slate-300 mt-1 leading-relaxed">
      ${isWeekendSlump 
        ? `Your completion rate drops to <strong>${weekendRate.toFixed(1)}% on weekends</strong> compared to ${weekdayRate.toFixed(1)}% on weekdays. Shift demanding LeetCode problem sets to 08:30 AM before leisure plans commence.` 
        : `Consistent pacing detected: maintaining a strong ${weekendRate.toFixed(1)}% pace across Saturday and Sunday sessions.`}
    </p>
  `;
  container.appendChild(card1);

  // 2. Identify Lagging Habit
  let lowestHabit = null;
  let lowestRatio = 1.0;
  habits.forEach(h => {
    const ratio = (h.days ? h.days.length : 0) / (h.goal || 25);
    if (ratio < lowestRatio) {
      lowestRatio = ratio;
      lowestHabit = h;
    }
  });

  const card2 = document.createElement('div');
  card2.className = "p-4 rounded-xl border bg-amber-950/20 border-amber-500/30";
  card2.innerHTML = `
    <div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-400">
      <span>Vulnerable Keystone Habit</span>
      <i class="ph-bold ph-hourglass-high text-base"></i>
    </div>
    <h4 class="text-sm font-bold text-white mt-2">${lowestHabit ? lowestHabit.name : 'All Habits Performing Well'}</h4>
    <p class="text-xs text-slate-300 mt-1 leading-relaxed">
      ${lowestHabit 
        ? `Achieved only <strong>${Math.round(lowestRatio * 100)}% of monthly target</strong>. Loophole solution: Implement <em>Habit Stacking</em>—execute this immediately after your highest-compliance routine.` 
        : 'All habits currently exceed baseline compliance.'}
    </p>
  `;
  container.appendChild(card2);

  // 3. Cognitive Momentum Anchor
  const card3 = document.createElement('div');
  card3.className = "p-4 rounded-xl border bg-sky-950/20 border-sky-500/30";
  card3.innerHTML = `
    <div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-sky-400">
      <span>Optimal Focus Window</span>
      <i class="ph-bold ph-lightning text-base"></i>
    </div>
    <h4 class="text-sm font-bold text-white mt-2">Week 1 & 2 Execution Velocity</h4>
    <p class="text-xs text-slate-300 mt-1 leading-relaxed">
      Days 1 to 14 exhibit the highest activation energy. Pre-schedule system design mock interviews and challenging algorithms during this cycle to maximize retention.
    </p>
  `;
  container.appendChild(card3);
}

// ==========================================
// 9. AI CHATGPT-GRADE COMPANION & TIMETABLE
// ==========================================
let chatHistory = [
  {
    role: 'assistant',
    text: `Hello! I am **Astra**, your AI Chrono-Sprint Guide. 🚀\n\nI can answer **any technical, academic, or life questions**, analyze your habit loopholes, or **synthesize an ultra-efficient study timetable** tailored to your daily schedule.\n\nTry asking me:\n- *"Create a 5-hour timetable for a college student doing LeetCode & System Design"*\n- *"Explain Dijkstra's algorithm simply with an analogy"*\n- *"How do I fix my weekend habit drop-off?"*\n- *"Give me 3 communication habits to sound confident in interviews"*`
  }
];

function renderChatMessages() {
  const container = document.getElementById('chatMessagesContainer');
  if (!container) return;
  container.innerHTML = '';

  chatHistory.forEach(msg => {
    const isUser = msg.role === 'user';
    const div = document.createElement('div');
    div.className = `flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`;

    const formattedText = parseMarkdownSimple(msg.text);

    div.innerHTML = `
      ${!isUser ? `
        <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white shadow-md shadow-purple-500/30">
          <i class="ph-bold ph-sparkle text-base"></i>
        </div>
      ` : ''}

      <div class="max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 ${isUser ? 'bg-indigo-600 text-white rounded-tr-none' : 'glass-panel-elevated text-slate-200 border border-white/10 rounded-tl-none'}">
        <div class="ai-prose text-xs sm:text-sm leading-relaxed">${formattedText}</div>
        ${!isUser && msg.timetableData ? `
          <div class="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2">
            <button onclick="injectAITasksToMatrixCustom(${JSON.stringify(msg.timetableData).replace(/"/g, '&quot;')})" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1 shadow-md">
              <i class="ph-bold ph-plus-circle"></i> Apply Timetable to My Habit Matrix
            </button>
          </div>
        ` : ''}
      </div>

      ${isUser ? `
        <div class="w-8 h-8 rounded-xl bg-slate-700 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs shadow-md">
          U
        </div>
      ` : ''}
    `;

    container.appendChild(div);
  });

  container.scrollTop = container.scrollHeight;
}

function parseMarkdownSimple(text) {
  if (!text) return '';
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Inline code
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');
  // Lists
  html = html.replace(/^\s*-\s+(.*)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  // Paragraphs
  html = html.split('\n\n').map(p => {
    if (p.startsWith('<ul>') || p.startsWith('<pre>')) return p;
    return `<p>${p.replace(/\n/g, '<br>')}</p>`;
  }).join('');

  return html;
}

async function handleSendMessage(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('chatInput');
  const userText = input.value.trim();
  if (!userText) return;

  chatHistory.push({ role: 'user', text: userText });
  input.value = '';
  renderChatMessages();

  soundFX.playTone(480, 0.08, 'sine', 0.05);
  triggerMascotReaction('thinking', 'Astra is synthesizing your solution...');

  // Show thinking indicator
  const container = document.getElementById('chatMessagesContainer');
  const typingIndicator = document.createElement('div');
  typingIndicator.id = 'aiTypingIndicator';
  typingIndicator.className = 'flex gap-3 justify-start items-center text-xs text-purple-300 font-mono py-2';
  typingIndicator.innerHTML = `
    <div class="w-7 h-7 rounded-lg bg-purple-600/30 flex items-center justify-center animate-spin">
      <i class="ph-bold ph-arrows-clockwise text-sm"></i>
    </div>
    <span>Astra is processing and synthesizing response...</span>
  `;
  container.appendChild(typingIndicator);
  container.scrollTop = container.scrollHeight;

  // Synthesize response (either via custom Gemini API or built-in comprehensive brain)
  setTimeout(async () => {
    const typing = document.getElementById('aiTypingIndicator');
    if (typing) typing.remove();

    const responseObj = await generateAIResponse(userText);
    chatHistory.push(responseObj);
    renderChatMessages();
    soundFX.successChime();
    triggerMascotReaction('cheering', 'Solution ready! Let me know what you think.');
  }, 900);
}

// Built-in intelligent ChatGPT-level synthesis engine + external Gemini API support
async function generateAIResponse(query) {
  const lower = query.toLowerCase();

  // If user has provided a custom Gemini API key
  if (customApiKey && customApiKey.startsWith('AIza')) {
    try {
      const res = await callGeminiAPI(query, customApiKey);
      if (res) return { role: 'assistant', text: res };
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local engine', err);
    }
  }

  // Detect Timetable Request
  if (lower.includes('timetable') || lower.includes('schedule') || lower.includes('routine') || lower.includes('daily life') || lower.includes('plan my day')) {
    let hours = 5;
    if (lower.includes('3 hour') || lower.includes('3h') || lower.includes('part-time')) hours = 3;
    if (lower.includes('8 hour') || lower.includes('8h') || lower.includes('full-time') || lower.includes('bootcamp')) hours = 8;

    let skill = "Data Structures & System Design";
    if (lower.includes('web') || lower.includes('full stack')) skill = "Full-Stack Web Engineering";
    if (lower.includes('ai') || lower.includes('machine learning')) skill = "Machine Learning & Math";
    if (lower.includes('communication') || lower.includes('interview')) skill = "Communication & Mock Interviews";

    const blocks = buildTimetableBlocks(hours, 'morning', skill);
    const scheduleText = blocks.map(b => `- **${b.time}** [${b.badge}]: ${b.title}`).join('\n');

    return {
      role: 'assistant',
      text: `### 🎯 Custom High-Yield Ultradian Timetable for ${skill} (${hours} Hours/Day)\n\nI have structured your routine based on neurobiology: 90-minute ultradian deep-work blocks aligned with your highest cognitive energy, with deliberate recovery periods to prevent mental exhaustion.\n\n${scheduleText}\n\n**💡 Loophole Safeguard:**\n- Never skip the 30-minute recovery walks; passive diffuse-mode thinking is when the brain consolidates algorithms.\n- Review your Anki flashcards before sleep for maximum neuroplastic retention.\n\n*Click below to directly push these blocks into your 31-day Habit Matrix:*`,
      timetableData: blocks
    };
  }

  // Technical explanation: Graphs / Dijkstra
  if (lower.includes('graph') || lower.includes('dijkstra') || lower.includes('bfs') || lower.includes('dfs')) {
    return {
      role: 'assistant',
      text: `### 🧭 Graph Mastery: Dijkstra & Traversal Mental Models\n\n**1. The Real-World Analogy:**\nThink of a graph as a road network where cities are **Nodes (Vertices)** and highways are **Edges**. If highways have toll costs or travel times, they are **Weighted Edges**.\n\n**2. When to Use Which Algorithm:**\n- **BFS (Breadth-First Search):** Guaranteed shortest path on *unweighted* graphs (e.g. finding the fewest degrees of separation on LinkedIn). Uses a **Queue (FIFO)**. Time: O(V + E).\n- **DFS (Depth-First Search):** Explores as deep as possible before backtracking. Best for topological ordering, maze solving, and cycle detection. Uses a **Stack (LIFO)**. Time: O(V + E).\n- **Dijkstra's Algorithm:** Finds the shortest path with *positive edge weights*. It greedily expands the node with the lowest known cumulative distance using a **Min-Heap (Priority Queue)**. Time: O((V + E) log V).\n\n**⚠️ Common Loophole:**\nDijkstra fails if negative weights exist because once a node is visited, it assumes the shortest distance is finalized. For negative edge weights, always pick **Bellman-Ford** (O(V * E)).`
    };
  }

  // Communication & Interview Skills
  if (lower.includes('communication') || lower.includes('speaking') || lower.includes('interview') || lower.includes('confidence') || lower.includes('social')) {
    return {
      role: 'assistant',
      text: `### 🎙️ The Executive Communication Blueprint\n\nTo stand out in high-stakes technical interviews and leadership discussions, practice these three battle-tested frameworks:\n\n1. **The HAIL Foundation (Julian Treasure):**\n   - **Honesty:** Be clear and direct; do not hide ambiguity.\n   - **Authenticity:** Stand in your own skin; do not try to emulate a robotic persona.\n   - **Integrity:** Deliver what you promised, whether code or commitments.\n   - **Love:** Wish your audience well—this instantly converts adversarial anxiety into collaboration.\n\n2. **The "What? So What? Now What?" Instant Structure:**\n   - *What:* State the fact or technical decision (e.g. "We chose Redis over Memcached").\n   - *So What:* Explain the impact (e.g. "Because we required native pub/sub and geospatial queries").\n   - *Now What:* Propose the next action (e.g. "Let's benchmark the latency across cluster replicas today").\n\n3. **Eliminate Up-talk and Filler Words:**\n   - Replace "like", "you know", and "um" with a deliberate 1-second pause. Silence commands attention and projects authority.`
    };
  }

  // General Habit Loophole diagnosis
  if (lower.includes('loophole') || lower.includes('weekend') || lower.includes('habit') || lower.includes('procrastinat')) {
    return {
      role: 'assistant',
      text: `### 🔬 Scientific Cure for Habit Loopholes & Weekend Drops\n\nMost habit trackers fail because they treat every day identically. Here is how top performers safeguard their streak:\n\n1. **The 'Never Miss Twice' Law:**\n   Missing one day is an accident; missing two days is the start of a new, negative habit. If an unexpected emergency ruins Friday, ensure Saturday morning has at least a 10-minute micro-session.\n\n2. **Implementation Intentions (If-Then Planning):**\n   Instead of *"I will study LeetCode tomorrow"*, write:\n   *"IF it is 08:30 AM on Saturday, THEN I will sit at my desk with coffee and solve 1 Medium problem before touching my phone."*\n\n3. **Habit Stacking:**\n   Attach your hardest task right after your easiest, non-negotiable habit (e.g. *Drinking 16oz of water -> immediately open Anki flashcards*).`
    };
  }

  // Universal fallback for any general question
  return {
    role: 'assistant',
    text: `### 💡 Analysis on: "${query}"\n\nGreat question! To answer this thoroughly:\n\n- **Core Insight:** Successful execution always boils down to breaking complex concepts into modular, verifiable steps. Whether you are building distributed systems, training machine learning models, or engineering your personal daily schedule, isolate the highest-leverage 20% that produces 80% of the results.\n- **Actionable Takeaway:** Connect this knowledge directly to an active deliverable in your **ChronoSprint Matrix** or check out the recommended masterclasses in the **Skill Growth & Videos tab** to watch a full breakdown with unlocked CheatNotes.\n\nNeed me to structure this into a daily step-by-step roadmap or timetable? Just ask!`
  };
}

async function callGeminiAPI(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: `You are Astra, the world-class AI study companion and timetable planner for ChronoSprint. Answer clearly, formatted in markdown with bullet points and bolding:\n\n${prompt}` }]
      }]
    })
  });

  const data = await response.json();
  if (data && data.candidates && data.candidates[0].content.parts[0].text) {
    return data.candidates[0].content.parts[0].text;
  }
  return null;
}

function sendQuickPrompt(promptText) {
  document.getElementById('chatInput').value = promptText;
  handleSendMessage();
}

// Timetable Builder & Matrix Injection
function buildTimetableBlocks(hours, chronotype, skill) {
  if (hours === 3) {
    return [
      { time: chronotype === 'night' ? '08:00 - 09:30 PM' : '07:30 - 09:00 AM', title: `Deep Focus: ${skill} Crucible Problems`, category: 'Study', badge: 'High Cognitive' },
      { time: chronotype === 'night' ? '09:30 - 09:45 PM' : '09:00 - 09:15 AM', title: 'Brain Reset & Sunlight/Hydration', category: 'Health', badge: 'Recovery' },
      { time: chronotype === 'night' ? '09:45 - 11:00 PM' : '09:15 - 10:30 AM', title: `Active Build: ${skill} Project Code & Git`, category: 'Skill', badge: 'Engineering' }
    ];
  } else if (hours === 5) {
    return [
      { time: chronotype === 'night' ? '06:00 - 08:00 PM' : '07:00 - 09:00 AM', title: `Block 1: ${skill} Algorithm Mastery`, category: 'Study', badge: 'Crucible Focus' },
      { time: chronotype === 'night' ? '08:00 - 08:30 PM' : '09:00 - 09:30 AM', title: 'Cardio Walk & Physiological Sigh Breathing', category: 'Health', badge: 'Recharge' },
      { time: chronotype === 'night' ? '08:30 - 10:30 PM' : '09:30 - 11:30 AM', title: 'Block 2: End-to-End System Architecture', category: 'Skill', badge: 'Architecture' },
      { time: chronotype === 'night' ? '10:30 - 11:30 PM' : '04:00 - 05:00 PM', title: 'Block 3: Spaced Retrieval Anki & Retrospective', category: 'Mindset', badge: 'Consolidation' }
    ];
  } else {
    return [
      { time: '08:00 - 10:30 AM', title: `Morning Crucible: ${skill} Hard Algorithm Challenges`, category: 'Study', badge: 'Peak Neuro' },
      { time: '10:30 - 11:00 AM', title: 'Active Physical Recovery & Nutrition', category: 'Health', badge: 'Vitality' },
      { time: '11:00 - 01:30 PM', title: 'Full-Stack Architecture & Production Code commits', category: 'Skill', badge: 'Intense Build' },
      { time: '02:30 - 04:30 PM', title: 'System Design Mock / OS Internals Deep Dive', category: 'Study', badge: 'Theoretical' },
      { time: '09:00 - 09:45 PM', title: 'Spaced Retrieval Flashcards & Matrix Audit', category: 'Mindset', badge: 'Recall' }
    ];
  }
}

let generatedTimetableData = [];

function generateTimetable() {
  const skill = document.getElementById('aiInputSkill') ? document.getElementById('aiInputSkill').value.trim() : 'Data Structures & System Design';
  const hours = parseInt(document.getElementById('aiInputHours').value) || 5;
  const chronotype = document.getElementById('aiInputChronotype').value;

  generatedTimetableData = buildTimetableBlocks(hours, chronotype, skill);

  const container = document.getElementById('aiScheduleDisplay');
  if (!container) return;
  container.innerHTML = '';

  generatedTimetableData.forEach((b, idx) => {
    const card = document.createElement('div');
    card.className = "p-4 rounded-xl bg-brand-950 border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between";
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between text-[11px] font-mono text-purple-300 mb-2">
          <span class="flex items-center gap-1"><i class="ph-bold ph-clock"></i> ${b.time}</span>
          <span class="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px]">${b.badge}</span>
        </div>
        <h5 class="text-sm font-semibold text-white mt-1">${b.title}</h5>
      </div>
      <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
        <span>${b.category}</span>
        <span class="font-mono text-indigo-400">Session #${idx + 1}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function injectAITasksToMatrix() {
  injectAITasksToMatrixCustom(generatedTimetableData);
}

function injectAITasksToMatrixCustom(tasks) {
  if (!tasks || !tasks.length) return;
  let addedCount = 0;

  tasks.forEach(item => {
    const exists = habits.some(h => h.name === item.title);
    if (!exists) {
      habits.unshift({
        id: Date.now() + Math.floor(Math.random() * 10000),
        name: item.title,
        category: item.category,
        goal: 25,
        days: []
      });
      addedCount++;
    }
  });

  saveAppData();
  switchView('matrix');
  renderMatrixTable();
  updateAllCalculationsAndCharts();
  runLoopholeAudit();
  soundFX.successChime();

  triggerMascotReaction('cheering', `Injected ${addedCount} timetable blocks directly into your Matrix!`);
}

// API Key Modal
function openApiKeyModal() {
  const input = document.getElementById('geminiApiKeyInput');
  if (input) input.value = customApiKey;
  document.getElementById('apiKeyModal').classList.remove('hidden');
}
function closeApiKeyModal() {
  document.getElementById('apiKeyModal').classList.add('hidden');
}
function saveApiKey(e) {
  e.preventDefault();
  const input = document.getElementById('geminiApiKeyInput');
  customApiKey = input.value.trim();
  localStorage.setItem(API_CONFIG_KEY, JSON.stringify({ apiKey: customApiKey }));
  closeApiKeyModal();
  soundFX.checkSound();
  triggerMascotReaction('cheering', customApiKey ? 'Gemini API Key saved! Live AI connection enabled.' : 'Switched to Astra built-in AI engine.');
}

// ==========================================
// 10. YOUTUBE SKILL RECOMMENDATIONS & VAULT
// ==========================================
let currentVideoFilter = 'All';

function renderVideosFeed() {
  const container = document.getElementById('videosGridContainer');
  if (!container) return;
  container.innerHTML = '';

  const filtered = videos.filter(v => {
    if (currentVideoFilter === 'All') return true;
    return v.category === currentVideoFilter;
  });

  filtered.forEach(video => {
    const isSaved = savedVideos.includes(video.id);
    const isUnlocked = unlockedVideos[video.id];

    const card = document.createElement('div');
    card.className = "glass-panel-elevated rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between hover:border-purple-500/40 transition-all group";

    card.innerHTML = `
      <div>
        <!-- Video Thumbnail with Play Trigger -->
        <div class="relative aspect-video bg-black/60 overflow-hidden cursor-pointer" onclick="openLecturePlayer('${video.id}')">
          <img src="https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg" alt="${video.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex items-center justify-center">
            <div class="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <i class="ph-fill ph-play text-xl ml-1"></i>
            </div>
          </div>
          <span class="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[11px] text-white">${video.duration}</span>
          <span class="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-[10px] font-bold text-purple-300 backdrop-blur-md">${video.fieldBadge}</span>
        </div>

        <!-- Video Info -->
        <div class="p-4 space-y-2">
          <div class="flex items-start justify-between gap-2">
            <h4 class="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-purple-300 transition-colors">${video.title}</h4>
            <button onclick="toggleSaveVideo('${video.id}')" class="p-1.5 rounded-lg border ${isSaved ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'} transition-all" title="${isSaved ? 'Remove from Saved Vault' : 'Save to Watch Later Vault'}">
              <i class="ph-bold ${isSaved ? 'ph-bookmark-simple-fill' : 'ph-bookmark-simple'} text-base"></i>
            </button>
          </div>
          <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">${video.description}</p>
          <div class="text-[11px] font-mono text-slate-500 flex items-center gap-1">
            <i class="ph-bold ph-user"></i> ${video.channel}
          </div>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="p-4 pt-0">
        <div class="pt-3 border-t border-white/10 flex items-center justify-between">
          <span class="text-[11px] flex items-center gap-1 ${isUnlocked ? 'text-emerald-400 font-semibold' : 'text-slate-400'}">
            <i class="ph-bold ${isUnlocked ? 'ph-lock-key-open text-emerald-400' : 'ph-lock-key text-amber-400'}"></i>
            ${isUnlocked ? 'CheatNotes Unlocked' : 'CheatNotes Gated'}
          </span>
          <button onclick="openLecturePlayer('${video.id}')" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md">
            <span>Watch & Learn</span>
            <i class="ph-bold ph-arrow-right"></i>
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  updateVaultBadge();
}

function filterVideosByCategory(cat) {
  currentVideoFilter = cat;
  const pills = ['catAll', 'catTech', 'catSystemDesign', 'catCommunication', 'catProductivity'];
  pills.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.className = "px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all";
    }
  });

  const activePill = document.getElementById(`cat${cat}`);
  if (activePill) {
    activePill.className = "px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white border border-indigo-400 shadow-md transition-all";
  }

  renderVideosFeed();
}

function shuffleVideoRecommendations() {
  videos.sort(() => Math.random() - 0.5);
  renderVideosFeed();
  soundFX.checkSound();
  triggerMascotReaction('thinking', 'Rotated fresh skill masterclasses for you!');
}

function toggleSaveVideo(videoId) {
  const index = savedVideos.indexOf(videoId);
  if (index > -1) {
    savedVideos.splice(index, 1);
    soundFX.playTone(300, 0.08, 'sine', 0.05);
    triggerMascotReaction('idle', 'Removed video from your Saved Vault.');
  } else {
    savedVideos.push(videoId);
    soundFX.checkSound();
    triggerMascotReaction('cheering', 'Video saved to your Watch Later Vault!');
  }
  saveAppData();
  renderVideosFeed();
  renderSavedVideosVault();
}

function updateVaultBadge() {
  const badge = document.getElementById('vaultCountBadge');
  const mobBadge = document.getElementById('mobVaultCountBadge');
  const count = savedVideos.length;
  if (badge) badge.innerText = count;
  if (mobBadge) mobBadge.innerText = count;
}

// Watch Later Vault Drawer
function renderSavedVideosVault() {
  const container = document.getElementById('savedVaultGrid');
  if (!container) return;
  container.innerHTML = '';

  const savedList = videos.filter(v => savedVideos.includes(v.id));

  if (savedList.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-400 space-y-3">
        <div class="w-16 h-16 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-3xl text-slate-500">
          <i class="ph-bold ph-bookmark-simple"></i>
        </div>
        <h4 class="text-base font-bold text-white">Your Saved Lecture Vault is Empty</h4>
        <p class="text-xs max-w-sm mx-auto text-slate-400">Bookmark any high-yield lecture or tutorial in the Skill Growth tab to access it here anytime.</p>
        <button onclick="switchView('videos')" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:brightness-110">
          Browse Masterclasses
        </button>
      </div>
    `;
    return;
  }

  savedList.forEach(video => {
    const isUnlocked = unlockedVideos[video.id];
    const card = document.createElement('div');
    card.className = "glass-panel-elevated rounded-2xl p-4 border border-white/10 flex flex-col justify-between hover:border-purple-500/40 transition-all";
    card.innerHTML = `
      <div>
        <div class="relative aspect-video rounded-xl overflow-hidden cursor-pointer" onclick="openLecturePlayer('${video.id}')">
          <img src="https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg" alt="${video.title}" class="w-full h-full object-cover">
          <span class="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white">${video.duration}</span>
        </div>
        <h4 class="text-sm font-bold text-white mt-3 line-clamp-2">${video.title}</h4>
        <span class="text-[10px] font-mono text-purple-300">${video.channel}</span>
      </div>
      <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
        <button onclick="toggleSaveVideo('${video.id}')" class="text-rose-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1">
          <i class="ph-bold ph-trash"></i> Remove
        </button>
        <button onclick="openLecturePlayer('${video.id}')" class="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-semibold flex items-center gap-1">
          <i class="ph-bold ph-play"></i> Watch Now
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Add Custom YouTube Video
function openAddVideoModal() {
  document.getElementById('addVideoModal').classList.remove('hidden');
}
function closeAddVideoModal() {
  document.getElementById('addVideoModal').classList.add('hidden');
}
function handleCreateCustomVideo(e) {
  e.preventDefault();
  const urlOrId = document.getElementById('customVideoUrl').value.trim();
  const title = document.getElementById('customVideoTitle').value.trim();
  const category = document.getElementById('customVideoCategory').value;
  const channel = document.getElementById('customVideoChannel').value.trim() || 'Custom Channel';

  // Extract ID from full youtube URL or direct ID
  let ytId = urlOrId;
  const match = urlOrId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match) ytId = match[1];

  if (!ytId || ytId.length < 5) {
    alert('Please provide a valid YouTube video URL or ID.');
    return;
  }

  const newVid = {
    id: `custom-${Date.now()}`,
    youtubeId: ytId,
    title: title || 'Custom Masterclass Lecture',
    channel: channel,
    category: category,
    duration: 'Custom',
    fieldBadge: `${category} Focus`,
    description: 'User-added custom masterclass lecture. Complete 100% to generate AI CheatNotes and flashcards.',
    cheatNotes: {
      synopsis: `Personal lecture notes for "${title}". Complete watching to reinforce key neural pathways.`,
      principles: [
        'Apply active recall immediately after viewing the lecture.',
        'Convert core formulas and insights into concrete code snippets or flashcards.',
        'Schedule a 24-hour review in your ChronoSprint Habit Matrix.'
      ],
      flashcards: [
        { q: `What was the primary thesis of "${title}"?`, a: 'The core conceptual takeaway articulated by the lecturer.' },
        { q: 'How will you apply this lesson into your weekly deliverables?', a: 'By implementing the pattern in a project or practicing mock drills.' }
      ],
      drill: 'Create 1 project commit or solve 1 related problem within 2 hours of this lecture.'
    }
  };

  videos.unshift(newVid);
  saveAppData();
  closeAddVideoModal();
  renderVideosFeed();
  soundFX.successChime();
  triggerMascotReaction('cheering', `Added custom video: "${title}"!`);
}

// ==========================================
// 11. VIDEO PLAYER & GATED CHEATNOTES ENGINE
// ==========================================
let simulatedWatchTimer = null;

function openLecturePlayer(videoId) {
  const video = videos.find(v => v.id === videoId);
  if (!video) return;

  activePlayingVideo = video;
  switchView('player');

  const playerFrame = document.getElementById('youtubeIframePlayer');
  if (playerFrame) {
    playerFrame.src = `https://www.youtube.com/embed/${video.youtubeId}?enablejsapi=1&autoplay=1`;
  }

  setElText('playerVideoTitle', video.title);
  setElText('playerVideoChannel', video.channel);
  setElText('playerVideoCategory', video.category);

  // Check if unlocked already
  const isUnlocked = !!unlockedVideos[video.id];
  currentVideoProgressPercent = isUnlocked ? 100 : 0;
  updatePlayerLockUI(isUnlocked);

  // Auto-progress simulation as user stays on player
  if (simulatedWatchTimer) clearInterval(simulatedWatchTimer);
  if (!isUnlocked) {
    simulatedWatchTimer = setInterval(() => {
      if (currentActiveView === 'player' && currentVideoProgressPercent < 100) {
        currentVideoProgressPercent = Math.min(100, currentVideoProgressPercent + 5);
        updateWatchProgressMeter();
        if (currentVideoProgressPercent >= 100) {
          unlockVideoCheatNotes();
        }
      }
    }, 4000);
  }
}

function updateWatchProgressMeter() {
  const bar = document.getElementById('videoProgressBar');
  const label = document.getElementById('videoProgressPercentLabel');
  if (bar) bar.style.width = `${currentVideoProgressPercent}%`;
  if (label) label.innerText = `${currentVideoProgressPercent}%`;
}

function fastForwardWatchProgress() {
  currentVideoProgressPercent = 100;
  updateWatchProgressMeter();
  unlockVideoCheatNotes();
  soundFX.unlockSound();
}

function unlockVideoCheatNotes() {
  if (!activePlayingVideo) return;
  unlockedVideos[activePlayingVideo.id] = true;
  saveAppData();
  updatePlayerLockUI(true);
  soundFX.unlockSound();
  triggerMascotReaction('cheering', `🎉 100% Watched! CheatNotes & Retention Flashcards Unlocked!`);

  if (window.confetti) {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function updatePlayerLockUI(isUnlocked) {
  const lockedBox = document.getElementById('cheatNotesLockedView');
  const unlockedBox = document.getElementById('cheatNotesUnlockedView');
  updateWatchProgressMeter();

  if (isUnlocked) {
    if (lockedBox) lockedBox.classList.add('hidden');
    if (unlockedBox) unlockedBox.classList.remove('hidden');
    renderCheatNotesContent();
  } else {
    if (lockedBox) lockedBox.classList.remove('hidden');
    if (unlockedBox) unlockedBox.classList.add('hidden');
  }
}

function renderCheatNotesContent() {
  if (!activePlayingVideo || !activePlayingVideo.cheatNotes) return;
  const cn = activePlayingVideo.cheatNotes;

  setElText('cheatNotesSynopsis', cn.synopsis);

  const principlesList = document.getElementById('cheatNotesPrinciplesList');
  if (principlesList) {
    principlesList.innerHTML = '';
    cn.principles.forEach(p => {
      principlesList.innerHTML += `<li class="flex items-start gap-2"><i class="ph-bold ph-check text-emerald-400 mt-1 flex-shrink-0"></i><span>${p}</span></li>`;
    });
  }

  const flashcardsCont = document.getElementById('cheatNotesFlashcardsContainer');
  if (flashcardsCont) {
    flashcardsCont.innerHTML = '';
    cn.flashcards.forEach((fc, idx) => {
      flashcardsCont.innerHTML += `
        <div class="glass-panel p-3.5 rounded-xl border border-white/10 space-y-1.5">
          <div class="text-[11px] font-mono text-purple-300 font-bold">Flashcard #${idx + 1}</div>
          <p class="text-xs font-semibold text-white">Q: ${fc.q}</p>
          <p class="text-xs text-slate-300 pt-1 border-t border-white/5"><strong>A:</strong> ${fc.a}</p>
        </div>
      `;
    });
  }

  setElText('cheatNotesDrill', cn.drill);
}

function copyCheatNotes() {
  if (!activePlayingVideo || !activePlayingVideo.cheatNotes) return;
  const cn = activePlayingVideo.cheatNotes;
  const text = `# CheatNotes: ${activePlayingVideo.title}\nSource: ${activePlayingVideo.channel}\n\n## Synopsis\n${cn.synopsis}\n\n## Core Principles\n${cn.principles.map(p => `- ${p}`).join('\n')}\n\n## Retention Flashcards\n${cn.flashcards.map(f => `Q: ${f.q}\nA: ${f.a}\n`).join('\n')}\n\n## Action Drill\n${cn.drill}`;

  navigator.clipboard.writeText(text).then(() => {
    soundFX.checkSound();
    triggerMascotReaction('cheering', 'CheatNotes copied to clipboard!');
  });
}

function downloadCheatNotesMarkdown() {
  if (!activePlayingVideo || !activePlayingVideo.cheatNotes) return;
  const cn = activePlayingVideo.cheatNotes;
  const content = `# ChronoSprint Lecture CheatNotes: ${activePlayingVideo.title}\nChannel: ${activePlayingVideo.channel}\nDate: ${new Date().toLocaleDateString()}\n\n## Synopsis\n${cn.synopsis}\n\n## Core Principles\n${cn.principles.map(p => `- ${p}`).join('\n')}\n\n## Active Recall Flashcards\n${cn.flashcards.map(f => `### Q: ${f.q}\n**A:** ${f.a}\n`).join('\n')}\n\n## Practical Drill\n${cn.drill}\n`;

  const blob = new Blob([content], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `CheatNotes-${activePlayingVideo.youtubeId}.md`;
  a.click();
  soundFX.checkSound();
}

function addLectureToMatrixHabits() {
  if (!activePlayingVideo) return;
  const habitTitle = `Review CheatNotes: ${activePlayingVideo.title.slice(0, 32)}...`;

  const exists = habits.some(h => h.name === habitTitle);
  if (!exists) {
    habits.unshift({
      id: Date.now(),
      name: habitTitle,
      category: activePlayingVideo.category === 'Tech' ? 'Study' : 'Skill',
      goal: 15,
      days: []
    });
    saveAppData();
    soundFX.successChime();
    triggerMascotReaction('cheering', 'Added lecture revision habit to Matrix!');
    switchView('matrix');
    renderMatrixTable();
    updateAllCalculationsAndCharts();
  } else {
    alert('This revision task is already present in your Matrix.');
  }
}

// ==========================================
// 12. GOALS & SPRINTS
// ==========================================
function openAddGoalModal() {
  document.getElementById('addGoalModal').classList.remove('hidden');
}
function closeAddGoalModal() {
  document.getElementById('addGoalModal').classList.add('hidden');
}
function handleCreateGoal(e) {
  e.preventDefault();
  const title = document.getElementById('goalInputTitle').value.trim();
  const type = document.getElementById('goalInputType').value;
  const target = parseInt(document.getElementById('goalInputTarget').value) || 10;

  if (!title) return;

  const newGoal = {
    id: Date.now(),
    title,
    current: 0,
    target,
    status: 'On Track'
  };

  if (type === 'weekly') {
    weeklyGoals.push(newGoal);
  } else {
    monthlyGoals.push(newGoal);
  }

  saveAppData();
  closeAddGoalModal();
  document.getElementById('goalInputTitle').value = '';
  renderGoals();
  soundFX.successChime();
}

function renderGoals() {
  const wCont = document.getElementById('weeklyGoalsList');
  const mCont = document.getElementById('monthlyGoalsList');
  if (!wCont || !mCont) return;
  wCont.innerHTML = '';
  mCont.innerHTML = '';

  const makeCard = (g, isMonthly) => {
    const pct = Math.min(100, Math.round((g.current / g.target) * 100));
    const statusBadge = {
      'On Track': 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40',
      'Behind': 'text-rose-400 bg-rose-950/60 border-rose-800/40',
      'Completed': 'text-purple-400 bg-purple-950/60 border-purple-800/40'
    }[g.status] || 'text-slate-400 bg-slate-900';

    const card = document.createElement('div');
    card.className = "glass-panel-elevated rounded-xl p-4 border border-white/10 flex flex-col justify-between";
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${statusBadge}">${g.status}</span>
          <span class="text-xs font-mono text-slate-400">${g.current} / ${g.target} (${pct}%)</span>
        </div>
        <h4 class="text-sm font-semibold text-white mt-2">${g.title}</h4>
      </div>
      <div class="mt-4">
        <div class="w-full bg-brand-950 h-2 rounded-full overflow-hidden border border-white/5">
          <div class="h-full bg-gradient-to-r ${isMonthly ? 'from-purple-600 to-indigo-400' : 'from-emerald-500 to-teal-400'}" style="width: ${pct}%"></div>
        </div>
        <div class="flex justify-between items-center mt-3 pt-2 border-t border-white/5 text-xs">
          <button onclick="incrementGoal(${g.id}, ${isMonthly})" class="text-purple-300 hover:text-white font-medium flex items-center gap-1">
            <i class="ph-bold ph-plus"></i> Increment (+1)
          </button>
          <button onclick="removeGoal(${g.id}, ${isMonthly})" class="text-slate-500 hover:text-rose-400">
            <i class="ph-bold ph-trash"></i>
          </button>
        </div>
      </div>
    `;
    return card;
  };

  weeklyGoals.forEach(g => wCont.appendChild(makeCard(g, false)));
  monthlyGoals.forEach(g => mCont.appendChild(makeCard(g, true)));
}

function incrementGoal(id, isMonthly) {
  const list = isMonthly ? monthlyGoals : weeklyGoals;
  const target = list.find(g => g.id === id);
  if (target) {
    target.current = Math.min(target.target, target.current + 1);
    if (target.current >= target.target) target.status = 'Completed';
    saveAppData();
    renderGoals();
    soundFX.checkSound();
    triggerMascotReaction('cheering', `Progress registered for: "${target.title}"!`);
  }
}

function removeGoal(id, isMonthly) {
  if (confirm('Delete this goal target?')) {
    if (isMonthly) {
      monthlyGoals = monthlyGoals.filter(g => g.id !== id);
    } else {
      weeklyGoals = weeklyGoals.filter(g => g.id !== id);
    }
    saveAppData();
    renderGoals();
  }
}

// ==========================================
// 13. PWA INSTALL BANNER & PROMPT
// ==========================================
let deferredPrompt = null;

function initPWAInstallPrompt() {
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.log('[ChronoSprint] Service Worker registered with scope:', reg.scope);
    }).catch(err => {
      console.log('[ChronoSprint] SW registration failed:', err);
    });
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const btn = document.getElementById('installAppBtn');
    const banner = document.getElementById('pwaInstallBanner');
    if (btn) btn.classList.remove('hidden');
    if (banner) banner.classList.remove('hidden');
  });
}

function triggerPWAInstall() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        triggerMascotReaction('cheering', 'ChronoSprint installed as an App on your device!');
      }
      deferredPrompt = null;
      const btn = document.getElementById('installAppBtn');
      const banner = document.getElementById('pwaInstallBanner');
      if (btn) btn.classList.add('hidden');
      if (banner) banner.classList.add('hidden');
    });
  } else {
    alert('To install ChronoSprint on your device:\n\n- Chrome / Edge: Click the "Install App" icon in the address bar.\n- Safari iOS: Tap Share -> "Add to Home Screen".');
  }
}

function closePwaBanner() {
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.classList.add('hidden');
}
