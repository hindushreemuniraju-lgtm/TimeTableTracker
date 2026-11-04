/**
 * ChronoSprint Pro - Master Application Logic Engine
 * AI Timetable, Real-Time Task Management, Calendar, 31-Day Habit Matrix & Gemini AI
 */

// ==========================================
// 1. DATA STORAGE KEYS & DEFAULT SEED DATA
// ==========================================
const STORAGE_KEY_V3 = 'CHRONOSPRINT_STATE_V3';
const API_CONFIG_KEY = 'CHRONOSPRINT_API_CONFIG';

// Sample Seed Tasks (Rich default data for instant productivity)
const defaultTasks = [
  {
    id: 'task-1',
    title: 'Algorithm Practice: 2 LeetCode Mediums on Trees',
    description: 'Binary Tree Level Order Traversal & Lowest Common Ancestor',
    category: 'Study',
    priority: 'High',
    date: new Date().toISOString().split('T')[0],
    startTime: '08:30',
    endTime: '10:00',
    deadline: '10:30',
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null
  },
  {
    id: 'task-2',
    title: 'System Design: Microservices Caching Architecture',
    description: 'Design Redis cluster caching strategy and write architectural diagram notes',
    category: 'Work',
    priority: 'High',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:30',
    endTime: '12:00',
    deadline: '13:00',
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null
  },
  {
    id: 'task-3',
    title: 'Review Lecture CheatNotes & Retention Flashcards',
    description: 'Julian Treasure Communication & System Architecture CheatNotes review',
    category: 'Study',
    priority: 'Medium',
    date: new Date().toISOString().split('T')[0],
    startTime: '14:00',
    endTime: '15:00',
    deadline: '16:00',
    completed: true,
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString()
  },
  {
    id: 'task-4',
    title: 'Cardio Workout & 10-Minute Breathwork Recharge',
    description: 'High-intensity interval cardio followed by physiological sigh recovery',
    category: 'Health',
    priority: 'Medium',
    date: new Date().toISOString().split('T')[0],
    startTime: '17:30',
    endTime: '18:30',
    deadline: '19:00',
    completed: true,
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString()
  },
  {
    id: 'task-5',
    title: 'Executive Communication & Presentation Rehearsal',
    description: 'Practice structured STAR framework answers for technical interviews',
    category: 'Work',
    priority: 'Medium',
    date: getOffsetDateString(1),
    startTime: '10:00',
    endTime: '11:00',
    deadline: '12:00',
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null
  },
  {
    id: 'task-6',
    title: 'Spaced Retrieval Flashcards & Daily Matrix Audit',
    description: 'Complete 31-day habit checklist and check off today\'s completed cells',
    category: 'Study',
    priority: 'Low',
    date: getOffsetDateString(1),
    startTime: '21:00',
    endTime: '21:30',
    deadline: '22:00',
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null
  }
];

// Sample Seed Timetable Blocks
const defaultTimetable = [
  { id: 'tt-1', title: 'Deep Work: Algorithm Crucible', day: 'Daily', startTime: '08:00', endTime: '10:00', type: 'Study', notes: 'LeetCode Tree & Graph problems' },
  { id: 'tt-2', title: 'Cognitive Reset & Sunlight Walk', day: 'Daily', startTime: '10:00', endTime: '10:30', type: 'Break', notes: 'Hydration and outdoor light' },
  { id: 'tt-3', title: 'System Design & Code Architecture', day: 'Daily', startTime: '10:30', endTime: '12:30', type: 'Work', notes: 'Distributed systems & databases' },
  { id: 'tt-4', title: 'Lunch & Cognitive Rest', day: 'Daily', startTime: '12:30', endTime: '14:00', type: 'Break', notes: 'Nutritious meal and offline relaxation' },
  { id: 'tt-5', title: 'College Lectures & Course Review', day: 'Daily', startTime: '14:00', endTime: '16:30', type: 'Lecture', notes: 'Core computer science subjects' },
  { id: 'tt-6', title: 'Interview Communication Drill', day: 'Daily', startTime: '17:00', endTime: '18:00', type: 'Study', notes: 'Verbal clarity & pitch practice' },
  { id: 'tt-7', title: 'Fitness & High-Intensity Cardio', day: 'Daily', startTime: '18:00', endTime: '19:15', type: 'Fitness', notes: 'Endurance & strength conditioning' },
  { id: 'tt-8', title: 'Nightly Flashcards & Matrix Audit', day: 'Daily', startTime: '21:00', endTime: '21:45', type: 'Study', notes: 'Spaced retrieval & tomorrow planning' }
];

// Preserved 31-Day Habit Seed Data
const defaultHabits = [
  { id: 1, name: "Solve 2 LeetCode Mediums", category: "Study", goal: 25, days: [1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23] },
  { id: 2, name: "Full-Stack Project Code (2 hrs)", category: "Skill", goal: 22, days: [1,2,3,5,6,8,9,10,12,13,15,16,17,19,20,22,23] },
  { id: 3, name: "Read System Design / Tech Paper", category: "Study", goal: 20, days: [1,2,4,5,8,9,11,12,15,16,18,19,22,23] },
  { id: 4, name: "Interview Communication Drill", category: "Skill", goal: 20, days: [2,3,4,5,9,10,11,12,16,17,18,19,23] },
  { id: 5, name: "Morning Cardio & Hydration", category: "Health", goal: 28, days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23] },
  { id: 6, name: "Zero Social Media Before 12 PM", category: "Mindset", goal: 25, days: [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,22,23] },
  { id: 7, name: "Daily Matrix Audit & Flashcards", category: "Mindset", goal: 30, days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23] }
];

// Preserved YouTube Masterclasses Seed Data
const defaultVideos = [
  {
    id: "vid-1",
    youtubeId: "xLETJpc_80A",
    title: "How to Speak So That People Want to Listen",
    channel: "TED / Julian Treasure",
    category: "Communication",
    duration: "9:58",
    cheatNotes: {
      synopsis: "Julian Treasure demonstrates the deadly sins of speaking (gossip, judging, negativity, complaining, excuses, exaggeration, dogmatism) and presents the HAIL framework to make your speech authoritative, warm, and compelling.",
      principles: [
        "HAIL Framework: Honesty (be clear & true), Authenticity (be yourself), Integrity (do what you say), Love (wish them well).",
        "Vocal Tool Box: Register (speak from chest for authority), Timbre (richness), Prosody (melody, avoid monotonic cadence), Pace (slow down for gravity), Silence (powerful pauses), Pitch & Volume.",
        "Warm-up Drills: Tongue trills, lip buzzes, and vocal sighs before high-stakes presentations."
      ],
      flashcards: [
        { q: "What does the HAIL framework stand for?", a: "Honesty, Authenticity, Integrity, and Love." },
        { q: "Which vocal register commands the most natural authority?", a: "The chest register (lower, resonant frequency)." },
        { q: "Why is a deliberate pause more effective than filler words ('um', 'like')?", a: "Silence commands room attention and builds suspense without diluting credibility." }
      ],
      drill: "Record a 60-second summary of your current project using your chest register and 2 deliberate pauses."
    }
  },
  {
    id: "vid-2",
    youtubeId: "vBdo3Gg_1ek",
    title: "System Design for Beginners Course",
    channel: "FreeCodeCamp",
    category: "SystemDesign",
    duration: "1:15:20",
    cheatNotes: {
      synopsis: "Comprehensive foundation of modern distributed system architecture: client-server model, DNS resolution, load balancing algorithms, vertical vs horizontal scaling, caching strategies, and database sharding.",
      principles: [
        "Horizontal vs Vertical: Scale horizontally (add commodity nodes) to eliminate single points of failure.",
        "Load Balancing: Round Robin, Weighted Round Robin, IP Hash, and Least Connections.",
        "Caching Strategies: Cache-Aside, Read-Through, Write-Through, Write-Behind (Async).",
        "CAP Theorem: In the presence of a network partition (P), a distributed system must choose between Consistency (C) and Availability (A)."
      ],
      flashcards: [
        { q: "What does the CAP Theorem state?", a: "A distributed system can guarantee at most two out of Consistency, Availability, and Partition Tolerance." },
        { q: "How does Cache-Aside pattern work?", a: "The application code queries cache first; if miss, fetches from DB, writes to cache, and returns." },
        { q: "What is database replication vs sharding?", a: "Replication copies identical data across read replicas; sharding horizontally partitions rows across different servers." }
      ],
      drill: "Draw an architectural diagram of a URL shortener (TinyURL) handling 10,000 requests per second with Redis and Postgres."
    }
  },
  {
    id: "vid-3",
    youtubeId: "aP_GvDJM-1U",
    title: "Graph Algorithms for Technical Interviews",
    channel: "freeCodeCamp / William Fiset",
    category: "Tech",
    duration: "2:12:00",
    cheatNotes: {
      synopsis: "Deep mastery of BFS, DFS, Dijkstra's algorithm, Bellman-Ford, Topological Sort, and Strongly Connected Components on Directed Acyclic Graphs (DAGs).",
      principles: [
        "BFS (Queue): Optimal for shortest path in unweighted graphs. Time: O(V + E).",
        "DFS (Stack/Recursion): Optimal for connected components, cycle detection, and maze backtracking.",
        "Dijkstra (Min-Heap / PriorityQueue): Shortest path in graphs with non-negative edge weights. Time: O((V + E) log V).",
        "Topological Sort (Kahn's Algorithm / In-degree count): Essential for build order, dependency resolution, and course prerequisites."
      ],
      flashcards: [
        { q: "When does Dijkstra's algorithm fail?", a: "When the graph contains edges with negative weights." },
        { q: "What data structure does Kahn's algorithm use for Topological Sort?", a: "An in-degree array and a Queue of 0-in-degree vertices." },
        { q: "What is the time complexity of BFS on an adjacency list?", a: "O(V + E) where V is vertices and E is edges." }
      ],
      drill: "Solve LeetCode #207 (Course Schedule) using Topological Sort and cycle detection."
    }
  },
  {
    id: "vid-4",
    youtubeId: "gXvB9aK-Ibg",
    title: "Optimize Your Dopamine & Drive for Focus",
    channel: "Andrew Huberman Lab",
    category: "Productivity",
    duration: "1:45:00",
    cheatNotes: {
      synopsis: "Neurobiology of dopamine baseline vs spikes, friction mastery, growth mindset, and dopamine detox schedules to sustain high energy during long learning sprints.",
      principles: [
        "Dopamine Baseline: Do not layer multiple high-dopamine stimuli (energy drinks + loud music + phone scrolling) before hard work.",
        "Effort as the Reward: Attach dopamine release to the friction of problem-solving itself rather than the outcome.",
        "Ultradian Rhythms: Human high-focus cognitive bouts naturally last 90 minutes followed by 20 minutes of mental downtime."
      ],
      flashcards: [
        { q: "What happens after a massive artificial dopamine spike?", a: "The dopamine baseline drops below where it was before, causing fatigue and lack of drive." },
        { q: "How long is a natural human ultradian focus cycle?", a: "Approximately 90 minutes." },
        { q: "What is the physiological sigh?", a: "Two quick deep inhales through the nose followed by a long extended exhale through the mouth to rapidly reset autonomic stress." }
      ],
      drill: "Execute a 90-minute study session without opening phone notifications or music with lyrics."
    }
  }
];

// Helper to get formatted offset date string
function getOffsetDateString(daysOffset) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
}

// ==========================================
// 2. RUNTIME APPLICATION STATE
// ==========================================
let tasks = [];
let timetable = [];
let habits = [];
let weeklyGoals = [];
let monthlyGoals = [];
let videos = [];
let savedVideos = [];
let unlockedVideos = {};
let customApiKey = '';

let currentView = 'dashboard';
let selectedCalendarDate = new Date().toISOString().split('T')[0];
let viewingCalendarMonth = new Date().getMonth();
let viewingCalendarYear = new Date().getFullYear();

let taskFilter = {
  search: '',
  status: 'all',
  priority: 'all',
  category: 'all',
  date: 'all'
};

let editingTaskId = null;
let pendingDeleteTaskId = null;
let editingTimetableId = null;
let activePlayingVideo = null;
let currentVideoFilter = 'All';
let currentVideoProgressPercent = 0;
let simulatedWatchTimer = null;
let mascotMood = 'idle';

// Chat History State
let chatHistory = [
  {
    role: 'assistant',
    text: `Hello! I am **Astra**, your AI Timetable & Productivity Assistant powered by Google Gemini. 🚀\n\nI am synchronized with your active tasks, timetable, and habit matrix. Ask me to create a daily timetable, prioritize your deliverables, or schedule tasks with 1-click confirmation!`
  }
];

// Charts State
let donutCharts = {};
let dailyTrendChartInstance = null;
let categoryBalanceChartInstance = null;

// ==========================================
// 3. AUDIO SYNTHESIS & SOUND EFFECTS ENGINE
// ==========================================
const soundFX = {
  ctx: null,
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },
  playTone(freq, duration, type = 'sine', gainVal = 0.08) {
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
    } catch (e) {}
  },
  checkSound() {
    this.playTone(587.33, 0.12, 'triangle', 0.08); // D5
    setTimeout(() => this.playTone(880, 0.16, 'triangle', 0.08), 70); // A5
  },
  successChime() {
    this.playTone(523.25, 0.12, 'sine', 0.1); // C5
    setTimeout(() => this.playTone(659.25, 0.12, 'sine', 0.1), 90); // E5
    setTimeout(() => this.playTone(783.99, 0.18, 'sine', 0.12), 180); // G5
    setTimeout(() => this.playTone(1046.50, 0.3, 'sine', 0.14), 270); // C6
  },
  unlockSound() {
    this.playTone(440, 0.15, 'triangle', 0.12);
    setTimeout(() => this.playTone(554.37, 0.15, 'triangle', 0.12), 90);
    setTimeout(() => this.playTone(659.25, 0.2, 'triangle', 0.14), 180);
    setTimeout(() => this.playTone(880.00, 0.4, 'triangle', 0.16), 270);
  }
};

// ==========================================
// 4. TOAST NOTIFICATION ENGINE
// ==========================================
let toastTimer = null;
function showToast(message, type = 'success') {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  const iconEl = document.getElementById('toastIcon');
  if (!toast || !msgEl) return;

  msgEl.innerText = message;
  if (type === 'error') {
    iconEl.innerHTML = '<i class="ph-bold ph-warning-circle text-rose-400"></i>';
  } else if (type === 'info') {
    iconEl.innerHTML = '<i class="ph-bold ph-info text-sky-400"></i>';
  } else {
    iconEl.innerHTML = '<i class="ph-bold ph-check-circle text-emerald-400"></i>';
  }

  toast.classList.remove('hidden');
  toast.classList.add('toast-show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('toast-show');
  }, 3200);
}

// ==========================================
// 5. APP PERSISTENCE & INITIALIZATION
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  try { loadAppData(); } catch (e) { console.error('loadAppData error:', e); }
  try { initRealtimeClock(); } catch (e) { console.error('initRealtimeClock error:', e); }
  try { renderDashboard(); } catch (e) { console.error('renderDashboard error:', e); }
  try { renderTimetable(); } catch (e) { console.error('renderTimetable error:', e); }
  try { renderTasksList(); } catch (e) { console.error('renderTasksList error:', e); }
  try { renderCalendar(); } catch (e) { console.error('renderCalendar error:', e); }
  try { renderChatMessages(); } catch (e) { console.error('renderChatMessages error:', e); }
  try { renderMatrixCalendarHeaders(); } catch (e) { console.error('renderMatrixCalendarHeaders error:', e); }
  try { renderMatrixTable(); } catch (e) { console.error('renderMatrixTable error:', e); }
  try { initDonutCharts(); } catch (e) { console.error('initDonutCharts error:', e); }
  try { initSecondaryCharts(); } catch (e) { console.error('initSecondaryCharts error:', e); }
  try { updateAllCalculationsAndCharts(); } catch (e) { console.error('updateAllCalculationsAndCharts error:', e); }
  try { renderVideosFeed(); } catch (e) { console.error('renderVideosFeed error:', e); }
  try { renderSavedVideosVault(); } catch (e) { console.error('renderSavedVideosVault error:', e); }
  try { runLoopholeAudit(); } catch (e) { console.error('runLoopholeAudit error:', e); }
  try { initMascot(); } catch (e) { console.error('initMascot error:', e); }
  try { initPWAInstallPrompt(); } catch (e) { console.error('initPWAInstallPrompt error:', e); }
});

function loadAppData() {
  // Load custom API key
  const apiStored = localStorage.getItem(API_CONFIG_KEY);
  if (apiStored) {
    try {
      const cfg = JSON.parse(apiStored);
      customApiKey = cfg.apiKey || '';
      const input = document.getElementById('settingsGeminiKeyInput');
      if (input) input.value = customApiKey;
    } catch (e) {}
  }

  const stored = localStorage.getItem(STORAGE_KEY_V3);
  if (stored) {
    try {
      const p = JSON.parse(stored);
      tasks = Array.isArray(p.tasks) && p.tasks.length ? p.tasks : defaultTasks;
      timetable = Array.isArray(p.timetable) && p.timetable.length ? p.timetable : defaultTimetable;
      habits = Array.isArray(p.habits) && p.habits.length ? p.habits : defaultHabits;
      videos = Array.isArray(p.videos) && p.videos.length ? p.videos : defaultVideos;
      savedVideos = Array.isArray(p.savedVideos) ? p.savedVideos : [defaultVideos[0].id, defaultVideos[2].id];
      unlockedVideos = p.unlockedVideos || {};
      return;
    } catch (e) {
      console.warn('Error reading stored state, using defaults', e);
    }
  }

  // Fallback defaults
  tasks = JSON.parse(JSON.stringify(defaultTasks));
  timetable = JSON.parse(JSON.stringify(defaultTimetable));
  habits = JSON.parse(JSON.stringify(defaultHabits));
  videos = JSON.parse(JSON.stringify(defaultVideos));
  savedVideos = [defaultVideos[0].id, defaultVideos[2].id];
  unlockedVideos = {};
}

function saveAppData() {
  try {
    localStorage.setItem(STORAGE_KEY_V3, JSON.stringify({
      tasks,
      timetable,
      habits,
      videos,
      savedVideos,
      unlockedVideos
    }));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

function loadSamplePresets() {
  if (confirm('Restore default high-performance tasks, timetable blocks, and habit matrix? Your personal changes will be reset to the template.')) {
    tasks = JSON.parse(JSON.stringify(defaultTasks));
    timetable = JSON.parse(JSON.stringify(defaultTimetable));
    habits = JSON.parse(JSON.stringify(defaultHabits));
    videos = JSON.parse(JSON.stringify(defaultVideos));
    savedVideos = [defaultVideos[0].id, defaultVideos[2].id];
    unlockedVideos = {};
    saveAppData();

    renderDashboard();
    renderTimetable();
    renderTasksList();
    renderCalendar();
    renderMatrixTable();
    updateAllCalculationsAndCharts();
    renderVideosFeed();
    renderSavedVideosVault();
    runLoopholeAudit();

    soundFX.successChime();
    showToast('High-performance template synchronized!');
    triggerMascotReaction('cheering', 'Template synchronized! Ready to conquer your schedule!');
  }
}

// ==========================================
// 6. REAL-TIME CLOCK & STATUS MONITOR
// ==========================================
function initRealtimeClock() {
  const clockEl = document.getElementById('realtimeClock');
  const dateBadgeEl = document.getElementById('headerTodayDate');
  const greetingEl = document.getElementById('dashLiveTimeGreeting');

  function update() {
    const now = new Date();
    if (clockEl) {
      clockEl.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    if (dateBadgeEl) {
      dateBadgeEl.innerText = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
    }

    const hour = now.getHours();
    let greeting = 'Good Day';
    if (hour >= 5 && hour < 12) greeting = 'Good Morning ☀️';
    else if (hour >= 12 && hour < 17) greeting = 'Good Afternoon 🌤️';
    else if (hour >= 17 && hour < 21) greeting = 'Good Evening 🌅';
    else greeting = 'Night Crucible 🌙';

    if (greetingEl) greetingEl.innerText = greeting;

    // Check currently ongoing activity in timetable
    checkActiveTimetableBlock(now);
  }

  update();
  setInterval(update, 1000);
}

// ==========================================
// 7. VIEW NAVIGATION CONTROLLER (PRECISION ROUTING)
// ==========================================
const VIEW_MAP = {
  dashboard: { viewId: 'viewDashboard', tabId: 'tabBtnDashboard', mobId: 'mobTabDashboard' },
  timetable: { viewId: 'viewTimetable', tabId: 'tabBtnTimetable', mobId: 'mobTabTimetable' },
  tasks: { viewId: 'viewTasks', tabId: 'tabBtnTasks', mobId: 'mobTabTasks' },
  calendar: { viewId: 'viewCalendar', tabId: 'tabBtnCalendar', mobId: 'mobTabCalendar' },
  ai: { viewId: 'viewAI', tabId: 'tabBtnAI', mobId: 'mobTabAI' },
  progress: { viewId: 'viewProgress', tabId: 'tabBtnProgress', mobId: 'mobTabProgress' },
  settings: { viewId: 'viewSettings', tabId: 'tabBtnSettings', mobId: 'mobTabSettings' }
};

function switchView(viewName) {
  if (!viewName) return;
  const key = String(viewName).toLowerCase().trim();
  const targetConfig = VIEW_MAP[key];
  if (!targetConfig) {
    console.warn('Unknown view name requested:', viewName);
    return;
  }
  currentView = key;

  // 1. Hide all view sections
  Object.values(VIEW_MAP).forEach(cfg => {
    const el = document.getElementById(cfg.viewId);
    if (el) el.classList.add('hidden');
  });

  // 2. Reset desktop tab button styles
  Object.values(VIEW_MAP).forEach(cfg => {
    const btn = document.getElementById(cfg.tabId);
    if (btn) {
      btn.className = "px-3.5 py-1.5 rounded-lg font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5";
    }
  });

  // 3. Reset mobile bottom navigation styles
  Object.values(VIEW_MAP).forEach(cfg => {
    const mob = document.getElementById(cfg.mobId);
    if (mob) {
      mob.classList.remove('text-indigo-400', 'font-bold');
      mob.classList.add('text-slate-400');
    }
  });

  // 4. Activate chosen view section
  const targetSection = document.getElementById(targetConfig.viewId);
  if (targetSection) targetSection.classList.remove('hidden');

  // 5. Highlight active desktop tab
  const targetTab = document.getElementById(targetConfig.tabId);
  if (targetTab) {
    targetTab.className = "px-3.5 py-1.5 rounded-lg font-semibold bg-indigo-600 text-white transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/30";
  }

  // 6. Highlight active mobile tab
  const targetMob = document.getElementById(targetConfig.mobId);
  if (targetMob) {
    targetMob.classList.remove('text-slate-400');
    targetMob.classList.add('text-indigo-400', 'font-bold');
  }

  soundFX.playTone(400, 0.05, 'sine', 0.03);

  // 7. Execute view-specific renderers
  if (key === 'dashboard') {
    renderDashboard();
  } else if (key === 'timetable') {
    renderTimetable();
  } else if (key === 'tasks') {
    renderTasksList();
  } else if (key === 'calendar') {
    renderCalendar();
  } else if (key === 'ai') {
    renderChatMessages();
    triggerMascotReaction('thinking', 'Astra AI ready. Ask any question or request a study schedule!');
  } else if (key === 'progress') {
    setTimeout(() => {
      renderMatrixCalendarHeaders();
      renderMatrixTable();
      updateAllCalculationsAndCharts();
      Object.values(donutCharts).forEach(c => c && typeof c.resize === 'function' && c.resize());
      if (dailyTrendChartInstance && typeof dailyTrendChartInstance.resize === 'function') dailyTrendChartInstance.resize();
    }, 60);
  } else if (key === 'settings') {
    renderVideosFeed();
    renderSavedVideosVault();
  }
}

// ==========================================
// 8. DASHBOARD CONTROLLER (PHASE 4)
// ==========================================
function renderDashboard() {
  const todayStr = new Date().toISOString().split('T')[0];
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;
  const overdue = tasks.filter(t => !t.completed && t.date < todayStr).length;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Stat Cards
  setElText('statTotalTasks', total);
  setElText('statCompletedTasks', completed);
  setElText('statPendingTasks', pending);
  setElText('statOverdueTasks', overdue);
  setElText('statCompletionRate', `${rate}%`);

  const bar = document.getElementById('statCompletionProgressBar');
  if (bar) bar.style.width = `${rate}%`;

  // Header quick stats
  setElText('headerPendingCount', pending);
  setElText('headerCompletedCount', completed);
  setElText('headerRatePct', `${rate}%`);
  setElText('navPendingTaskCount', pending);
  setElText('mobPendingBadge', pending);

  // Overdue card styling highlight
  const overdueCard = document.getElementById('cardOverdueStat');
  if (overdueCard) {
    if (overdue > 0) {
      overdueCard.className = "glass-panel p-4 rounded-2xl border border-rose-500/40 bg-rose-950/20 space-y-1 animate-pulse";
    } else {
      overdueCard.className = "glass-panel p-4 rounded-2xl border border-white/10 space-y-1";
    }
  }

  // Render Today's Schedule & Priorities List in Dashboard
  const todayTasks = tasks.filter(t => t.date === todayStr);
  const container = document.getElementById('dashTodayTasksList');
  if (container) {
    container.innerHTML = '';
    if (todayTasks.length === 0) {
      container.innerHTML = `
        <div class="p-6 text-center rounded-xl bg-brand-950/50 border border-white/5 space-y-2">
          <p class="text-xs text-slate-400">No tasks specifically scheduled for today.</p>
          <button onclick="openAddTaskModal('${todayStr}')" class="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs inline-flex items-center gap-1 shadow">
            <i class="ph-bold ph-plus"></i> Schedule First Task for Today
          </button>
        </div>
      `;
    } else {
      todayTasks.forEach(task => {
        container.appendChild(createTaskCardElement(task, true));
      });
    }
  }

  // Render Upcoming Deadlines List in Dashboard
  const deadlinesContainer = document.getElementById('dashUpcomingDeadlinesList');
  const deadlineCountBadge = document.getElementById('dashDeadlineCountBadge');
  if (deadlinesContainer) {
    deadlinesContainer.innerHTML = '';
    const pendingWithDeadlines = tasks
      .filter(t => !t.completed)
      .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
      .slice(0, 4);

    if (deadlineCountBadge) deadlineCountBadge.innerText = `${pendingWithDeadlines.length} tasks`;

    if (pendingWithDeadlines.length === 0) {
      deadlinesContainer.innerHTML = `
        <div class="p-4 text-center rounded-xl bg-brand-950/50 border border-white/5 text-xs text-slate-400">
          🎉 No upcoming deadlines! You are completely up to date.
        </div>
      `;
    } else {
      pendingWithDeadlines.forEach(task => {
        const isPastDue = task.date < todayStr;
        const item = document.createElement('div');
        item.className = `p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
          isPastDue ? 'bg-rose-950/30 border-rose-500/40 text-rose-200' : 'bg-brand-950/70 border-white/10 text-slate-200'
        }`;
        item.innerHTML = `
          <div class="space-y-0.5 min-w-0 pr-2">
            <div class="flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full ${task.priority === 'High' ? 'bg-rose-500' : (task.priority === 'Medium' ? 'bg-amber-400' : 'bg-emerald-400')}"></span>
              <h5 class="font-semibold text-white truncate text-xs">${task.title}</h5>
            </div>
            <p class="text-[10px] text-slate-400 flex items-center gap-1">
              <i class="ph-bold ph-calendar"></i> ${task.date} ${task.startTime ? '• ' + task.startTime : ''}
              ${isPastDue ? '<span class="text-rose-400 font-bold ml-1">OVERDUE</span>' : ''}
            </p>
          </div>
          <button onclick="toggleTask('${task.id}')" class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-600 hover:text-white border border-white/10 text-slate-300 font-mono text-[11px] transition-all flex items-center gap-1 flex-shrink-0">
            <i class="ph-bold ph-check"></i> Done
          </button>
        `;
        deadlinesContainer.appendChild(item);
      });
    }
  }
}

// ==========================================
// 9. COMPLETE TASK MANAGEMENT CONTROLLER (PHASE 2)
// ==========================================
function renderTasksList() {
  const container = document.getElementById('tasksListContainer');
  const countLabel = document.getElementById('taskFilteredCountLabel');
  if (!container) return;
  container.innerHTML = '';

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = getOffsetDateString(1);

  // Apply Search & Filters
  let filtered = tasks.filter(t => {
    // 1. Search Query
    if (taskFilter.search) {
      const q = taskFilter.search.toLowerCase();
      const matchTitle = (t.title || '').toLowerCase().includes(q);
      const matchDesc = (t.description || '').toLowerCase().includes(q);
      const matchCat = (t.category || '').toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCat) return false;
    }

    // 2. Status Filter
    if (taskFilter.status === 'pending' && t.completed) return false;
    if (taskFilter.status === 'completed' && !t.completed) return false;
    if (taskFilter.status === 'overdue' && (t.completed || t.date >= todayStr)) return false;

    // 3. Priority Filter
    if (taskFilter.priority !== 'all' && t.priority !== taskFilter.priority) return false;

    // 4. Category Filter
    if (taskFilter.category !== 'all' && t.category !== taskFilter.category) return false;

    // 5. Date Filter
    if (taskFilter.date === 'today' && t.date !== todayStr) return false;
    if (taskFilter.date === 'tomorrow' && t.date !== tomorrowStr) return false;
    if (taskFilter.date === 'upcoming' && t.date <= todayStr) return false;

    return true;
  });

  // Sort: Pending first, then High priority, then date
  const priorityWeight = { High: 3, Medium: 2, Low: 1 };
  filtered.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const priA = priorityWeight[a.priority] || 1;
    const priB = priorityWeight[b.priority] || 1;
    if (priA !== priB) return priB - priA;
    return (a.date || '').localeCompare(b.date || '');
  });

  if (countLabel) {
    countLabel.innerText = `Showing ${filtered.length} of ${tasks.length} tasks`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="glass-panel p-10 text-center rounded-2xl border border-white/10 space-y-3">
        <div class="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-400 mx-auto flex items-center justify-center text-2xl">
          <i class="ph-bold ph-tray"></i>
        </div>
        <h4 class="text-sm font-bold text-white">No tasks match your current filters</h4>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">Try resetting your search query or add a brand new task to your schedule.</p>
        <button onclick="openAddTaskModal()" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md inline-flex items-center gap-1.5">
          <i class="ph-bold ph-plus-circle"></i> Add New Task
        </button>
      </div>
    `;
    return;
  }

  filtered.forEach(task => {
    container.appendChild(createTaskCardElement(task, false));
  });
}

function createTaskCardElement(task, isCompact = false) {
  const todayStr = new Date().toISOString().split('T')[0];
  const isOverdue = !task.completed && task.date && task.date < todayStr;

  const card = document.createElement('div');
  card.className = `glass-panel rounded-2xl p-4 border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
    task.completed 
      ? 'opacity-65 border-white/5 bg-brand-950/40' 
      : (isOverdue ? 'border-rose-500/40 bg-rose-950/15' : 'border-white/10 hover:border-indigo-500/40')
  }`;

  const priorityClass = task.priority === 'High' 
    ? 'badge-priority-high' 
    : (task.priority === 'Medium' ? 'badge-priority-medium' : 'badge-priority-low');

  card.innerHTML = `
    <div class="flex items-start gap-3 flex-1 min-w-0">
      <!-- Complete Checkbox -->
      <button onclick="toggleTask('${task.id}')" title="${task.completed ? 'Mark Pending' : 'Mark Completed'}" 
        class="w-6 h-6 mt-0.5 rounded-lg border flex items-center justify-center transition-all ${
          task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/20 hover:border-indigo-400 bg-brand-950 text-transparent'
        }">
        <i class="ph-bold ph-check text-sm"></i>
      </button>

      <!-- Task Details -->
      <div class="space-y-1 flex-1 min-w-0">
        <div class="flex flex-wrap items-center gap-2">
          <!-- Priority Pill -->
          <span class="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${priorityClass}">
            ${task.priority}
          </span>
          <!-- Category Badge -->
          <span class="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
            ${task.category}
          </span>
          ${isOverdue ? '<span class="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">OVERDUE</span>' : ''}
        </div>

        <h4 class="text-sm font-semibold text-white ${task.completed ? 'line-through text-slate-400' : ''} break-words">
          ${task.title}
        </h4>

        ${task.description ? `<p class="text-xs text-slate-400 line-clamp-2">${task.description}</p>` : ''}

        <!-- Date & Time Info -->
        <div class="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400 pt-1">
          <span class="flex items-center gap-1">
            <i class="ph-bold ph-calendar text-indigo-400"></i> ${task.date || 'No Date'}
          </span>
          ${task.startTime ? `
            <span class="flex items-center gap-1">
              <i class="ph-bold ph-clock text-sky-400"></i> ${task.startTime}${task.endTime ? ' - ' + task.endTime : ''}
            </span>
          ` : ''}
          ${task.deadline ? `
            <span class="flex items-center gap-1 text-amber-300">
              <i class="ph-bold ph-alarm"></i> Deadline: ${task.deadline}
            </span>
          ` : ''}
        </div>
      </div>
    </div>

    <!-- Actions (Edit & Delete) -->
    <div class="flex items-center gap-1.5 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5 w-full sm:w-auto justify-end">
      <button onclick="openEditTaskModal('${task.id}')" title="Edit Task" class="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all text-xs">
        <i class="ph-bold ph-pencil-simple"></i>
      </button>
      <button onclick="openDeleteTaskModal('${task.id}')" title="Delete Task" class="p-2 rounded-xl bg-white/5 hover:bg-rose-950/40 border hover:border-rose-500/30 text-slate-400 hover:text-rose-400 transition-all text-xs">
        <i class="ph-bold ph-trash"></i>
      </button>
    </div>
  `;
  return card;
}

// Modal Handlers: Add & Edit Task
function openAddTaskModal(prefillDate) {
  editingTaskId = null;
  const modal = document.getElementById('taskModal');
  const titleEl = document.getElementById('taskModalTitle');
  if (titleEl) titleEl.innerHTML = '<i class="ph-bold ph-check-square-offset text-indigo-400"></i> Create New Task';

  document.getElementById('taskFormTitle').value = '';
  document.getElementById('taskFormCategory').value = 'Study';
  document.getElementById('taskFormPriority').value = 'Medium';
  document.getElementById('taskFormDate').value = prefillDate || new Date().toISOString().split('T')[0];
  document.getElementById('taskFormDeadline').value = '';
  document.getElementById('taskFormStartTime').value = '';
  document.getElementById('taskFormEndTime').value = '';
  document.getElementById('taskFormDescription').value = '';

  if (modal) modal.classList.remove('hidden');
}

function openEditTaskModal(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  editingTaskId = taskId;
  const modal = document.getElementById('taskModal');
  const titleEl = document.getElementById('taskModalTitle');
  if (titleEl) titleEl.innerHTML = '<i class="ph-bold ph-pencil text-indigo-400"></i> Edit Task';

  document.getElementById('taskFormTitle').value = task.title || '';
  document.getElementById('taskFormCategory').value = task.category || 'Study';
  document.getElementById('taskFormPriority').value = task.priority || 'Medium';
  document.getElementById('taskFormDate').value = task.date || new Date().toISOString().split('T')[0];
  document.getElementById('taskFormDeadline').value = task.deadline || '';
  document.getElementById('taskFormStartTime').value = task.startTime || '';
  document.getElementById('taskFormEndTime').value = task.endTime || '';
  document.getElementById('taskFormDescription').value = task.description || '';

  if (modal) modal.classList.remove('hidden');
}

function closeTaskModal() {
  const modal = document.getElementById('taskModal');
  if (modal) modal.classList.add('hidden');
  editingTaskId = null;
}

function handleSaveTask(e) {
  if (e) e.preventDefault();

  const title = document.getElementById('taskFormTitle').value.trim();
  const category = document.getElementById('taskFormCategory').value;
  const priority = document.getElementById('taskFormPriority').value;
  const date = document.getElementById('taskFormDate').value;
  const deadline = document.getElementById('taskFormDeadline').value;
  const startTime = document.getElementById('taskFormStartTime').value;
  const endTime = document.getElementById('taskFormEndTime').value;
  const description = document.getElementById('taskFormDescription').value.trim();

  if (!title) {
    alert('Please enter a task title.');
    return;
  }
  if (!date) {
    alert('Please select a scheduled date.');
    return;
  }

  if (editingTaskId) {
    // Edit existing task
    const taskIndex = tasks.findIndex(t => t.id === editingTaskId);
    if (taskIndex > -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        title,
        category,
        priority,
        date,
        deadline,
        startTime,
        endTime,
        description
      };
      showToast('Task updated successfully!');
    }
  } else {
    // Add new task
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      category,
      priority,
      date,
      deadline,
      startTime,
      endTime,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.unshift(newTask);
    showToast('New task added successfully!');
    soundFX.successChime();
    triggerMascotReaction('cheering', `Task "${title}" registered in your schedule!`);
  }

  saveAppData();
  closeTaskModal();
  renderDashboard();
  renderTasksList();
  renderCalendar();
}

function toggleTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  task.completed = !task.completed;
  task.completedAt = task.completed ? new Date().toISOString() : null;

  saveAppData();
  soundFX.checkSound();

  if (task.completed) {
    showToast(`Completed: "${task.title}"`);
    triggerMascotReaction('cheering', `Great job! "${task.title}" checked off!`);
    
    // Check if all today's tasks completed
    const todayStr = new Date().toISOString().split('T')[0];
    const todayPending = tasks.filter(t => t.date === todayStr && !t.completed);
    if (todayPending.length === 0 && typeof confetti === 'function') {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  } else {
    showToast(`Marked pending: "${task.title}"`, 'info');
  }

  renderDashboard();
  renderTasksList();
  renderCalendar();
}

// Modal Handlers: Delete Task
function openDeleteTaskModal(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  pendingDeleteTaskId = taskId;
  const modal = document.getElementById('deleteTaskModal');
  const titleEl = document.getElementById('deleteTaskModalTitle');
  if (titleEl) titleEl.innerText = `Are you sure you want to delete "${task.title}"?`;

  if (modal) modal.classList.remove('hidden');
}

function closeDeleteTaskModal() {
  const modal = document.getElementById('deleteTaskModal');
  if (modal) modal.classList.add('hidden');
  pendingDeleteTaskId = null;
}

function confirmDeleteTask() {
  if (!pendingDeleteTaskId) return;

  tasks = tasks.filter(t => t.id !== pendingDeleteTaskId);
  saveAppData();
  closeDeleteTaskModal();
  showToast('Task deleted successfully');

  renderDashboard();
  renderTasksList();
  renderCalendar();
}

// Search & Filter Handlers
function handleTaskSearch(query) {
  taskFilter.search = query;
  renderTasksList();
}

function setTaskFilter(type, value) {
  taskFilter[type] = value;

  // Update button active styles if date filter
  if (type === 'date') {
    const btns = ['All', 'Today', 'Tomorrow', 'Upcoming'];
    btns.forEach(b => {
      const el = document.getElementById(`btnDateFilter${b}`);
      if (el) {
        if (value.toLowerCase() === b.toLowerCase()) {
          el.className = "px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-semibold";
        } else {
          el.className = "px-2.5 py-1 rounded-lg bg-brand-900 text-slate-400 hover:text-white";
        }
      }
    });
  }

  renderTasksList();
}

// ==========================================
// 10. TIMETABLE CONTROLLER (PHASE 4)
// ==========================================
let currentTimetableDayFilter = 'All';

function renderTimetable() {
  const grid = document.getElementById('timetableBlocksGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const now = new Date();
  const currentDayName = now.toLocaleDateString('en-US', { weekday: 'long' });

  // Filter blocks
  let blocks = timetable.filter(b => {
    if (currentTimetableDayFilter === 'All') return true;
    if (currentTimetableDayFilter === 'Today') return b.day === 'Daily' || b.day === currentDayName;
    return b.day === currentTimetableDayFilter || b.day === 'Daily';
  });

  // Sort chronologically by start time
  blocks.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

  if (blocks.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full p-8 text-center rounded-2xl bg-brand-950/60 border border-white/10 space-y-2">
        <p class="text-xs text-slate-400">No timetable blocks registered for this day.</p>
        <button onclick="openAddTimetableModal()" class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-md inline-flex items-center gap-1.5">
          <i class="ph-bold ph-plus"></i> Add First Schedule Block
        </button>
      </div>
    `;
    return;
  }

  blocks.forEach(block => {
    const isLive = isBlockCurrentlyActive(block, now);

    const typeColors = {
      Study: { bg: 'bg-indigo-950/40', border: 'border-indigo-500/30', text: 'text-indigo-400', icon: 'ph-brain' },
      Work: { bg: 'bg-purple-950/40', border: 'border-purple-500/30', text: 'text-purple-400', icon: 'ph-code' },
      Lecture: { bg: 'bg-sky-950/40', border: 'border-sky-500/30', text: 'text-sky-400', icon: 'ph-chalkboard-teacher' },
      Break: { bg: 'bg-emerald-950/40', border: 'border-emerald-500/30', text: 'text-emerald-400', icon: 'ph-coffee' },
      Fitness: { bg: 'bg-amber-950/40', border: 'border-amber-500/30', text: 'text-amber-400', icon: 'ph-barbell' }
    };
    const tStyle = typeColors[block.type] || typeColors.Study;

    const card = document.createElement('div');
    card.className = `glass-panel rounded-2xl p-5 border transition-all flex flex-col justify-between ${
      isLive ? 'border-sky-400 bg-gradient-to-br from-brand-900 via-sky-950/30 to-brand-900 ring-2 ring-sky-400/50 shadow-xl' : 'border-white/10 hover:border-white/20'
    }`;

    card.innerHTML = `
      <div class="space-y-2">
        <div class="flex items-center justify-between text-xs font-mono">
          <span class="flex items-center gap-1.5 font-bold ${isLive ? 'text-sky-300' : 'text-slate-300'}">
            <i class="ph-bold ph-clock"></i> ${block.startTime} - ${block.endTime}
          </span>
          <div class="flex items-center gap-1.5">
            ${isLive ? '<span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-sky-500 text-white animate-pulse">LIVE NOW</span>' : ''}
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${tStyle.bg} border ${tStyle.border} ${tStyle.text}">
              ${block.type}
            </span>
          </div>
        </div>

        <h4 class="text-base font-bold text-white mt-1">${block.title}</h4>
        ${block.notes ? `<p class="text-xs text-slate-400 leading-relaxed">${block.notes}</p>` : ''}
      </div>

      <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
        <span class="font-mono text-[11px]">${block.day}</span>
        <div class="flex items-center gap-1">
          <button onclick="deleteTimetableBlock('${block.id}')" title="Delete block" class="p-1.5 rounded-lg hover:bg-rose-950/40 hover:text-rose-400 transition-all text-xs text-slate-500">
            <i class="ph-bold ph-trash"></i>
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function isBlockCurrentlyActive(block, dateObj) {
  if (!block.startTime || !block.endTime) return false;
  const currentDayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  if (block.day !== 'Daily' && block.day !== currentDayName) return false;

  const currentHHMM = dateObj.toTimeString().slice(0, 5);
  return currentHHMM >= block.startTime && currentHHMM <= block.endTime;
}

function checkActiveTimetableBlock(now) {
  const activeBlock = timetable.find(b => isBlockCurrentlyActive(b, now));

  const dashTitle = document.getElementById('liveActivityTitle');
  const ttLiveTitle = document.getElementById('timetableLiveTitle');
  const ttLiveTime = document.getElementById('timetableLiveTime');

  if (activeBlock) {
    const text = `${activeBlock.title} (${activeBlock.startTime} - ${activeBlock.endTime})`;
    if (dashTitle) dashTitle.innerText = text;
    if (ttLiveTitle) ttLiveTitle.innerText = activeBlock.title;
    if (ttLiveTime) ttLiveTime.innerText = `${activeBlock.startTime} - ${activeBlock.endTime}`;
  } else {
    if (dashTitle) dashTitle.innerText = 'Unscheduled Focus / Recovery Interval';
    if (ttLiveTitle) ttLiveTitle.innerText = 'No block active right now';
    if (ttLiveTime) ttLiveTime.innerText = 'Free Time';
  }
}

function filterTimetableByDay(day) {
  currentTimetableDayFilter = day;
  const tabs = ['All', 'Today', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  tabs.forEach(t => {
    const btn = document.getElementById(`ttDayTab${t}`);
    if (btn) {
      if (t === day) {
        btn.className = "px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-semibold transition-all shadow-md";
      } else {
        btn.className = "px-3.5 py-2 rounded-xl bg-brand-900 border border-white/10 text-slate-300 hover:text-white transition-all";
      }
    }
  });

  renderTimetable();
}

function openAddTimetableModal() {
  document.getElementById('ttFormTitle').value = '';
  document.getElementById('ttFormDay').value = 'Daily';
  document.getElementById('ttFormType').value = 'Study';
  document.getElementById('ttFormStartTime').value = '08:00';
  document.getElementById('ttFormEndTime').value = '10:00';
  document.getElementById('ttFormNotes').value = '';

  const modal = document.getElementById('timetableModal');
  if (modal) modal.classList.remove('hidden');
}

function closeTimetableModal() {
  const modal = document.getElementById('timetableModal');
  if (modal) modal.classList.add('hidden');
}

function handleSaveTimetable(e) {
  if (e) e.preventDefault();
  const title = document.getElementById('ttFormTitle').value.trim();
  const day = document.getElementById('ttFormDay').value;
  const type = document.getElementById('ttFormType').value;
  const startTime = document.getElementById('ttFormStartTime').value;
  const endTime = document.getElementById('ttFormEndTime').value;
  const notes = document.getElementById('ttFormNotes').value.trim();

  if (!title) {
    alert('Please enter a schedule title.');
    return;
  }
  if (!startTime || !endTime) {
    alert('Please provide start and end times.');
    return;
  }

  const newBlock = {
    id: `tt-${Date.now()}`,
    title,
    day,
    type,
    startTime,
    endTime,
    notes
  };

  timetable.push(newBlock);
  saveAppData();
  closeTimetableModal();
  renderTimetable();
  renderDashboard();
  soundFX.successChime();
  showToast('Schedule block added successfully!');
}

function deleteTimetableBlock(blockId) {
  if (confirm('Delete this timetable block?')) {
    timetable = timetable.filter(b => b.id !== blockId);
    saveAppData();
    renderTimetable();
    renderDashboard();
    showToast('Timetable block removed');
  }
}

// ==========================================
// 11. CALENDAR CONTROLLER (PHASE 4)
// ==========================================
function renderCalendar() {
  const grid = document.getElementById('calendarDaysGrid');
  const heading = document.getElementById('calendarMonthHeading');
  if (!grid) return;
  grid.innerHTML = '';

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (heading) {
    heading.innerText = `${monthNames[viewingCalendarMonth]} ${viewingCalendarYear}`;
  }

  const firstDayOfWeek = new Date(viewingCalendarYear, viewingCalendarMonth, 1).getDay();
  const daysInMonth = new Date(viewingCalendarYear, viewingCalendarMonth + 1, 0).getDate();
  const prevMonthDays = new Date(viewingCalendarYear, viewingCalendarMonth, 0).getDate();

  const todayStr = new Date().toISOString().split('T')[0];

  // 1. Previous Month Leading Days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const dNum = prevMonthDays - i;
    const cell = document.createElement('div');
    cell.className = "min-h-[70px] p-2 rounded-xl bg-brand-950/30 border border-white/5 opacity-30 select-none";
    cell.innerHTML = `<span class="text-xs font-mono text-slate-500">${dNum}</span>`;
    grid.appendChild(cell);
  }

  // 2. Current Month Active Days
  for (let d = 1; d <= daysInMonth; d++) {
    const monthPad = String(viewingCalendarMonth + 1).padStart(2, '0');
    const dayPad = String(d).padStart(2, '0');
    const dateStr = `${viewingCalendarYear}-${monthPad}-${dayPad}`;

    const isToday = dateStr === todayStr;
    const isSelected = dateStr === selectedCalendarDate;

    // Count tasks on this date
    const dayTasks = tasks.filter(t => t.date === dateStr);
    const pendingHigh = dayTasks.some(t => !t.completed && t.priority === 'High');
    const pendingMed = dayTasks.some(t => !t.completed && t.priority === 'Medium');
    const allDone = dayTasks.length > 0 && dayTasks.every(t => t.completed);

    const cell = document.createElement('div');
    cell.onclick = () => selectCalendarDate(dateStr);
    cell.className = `min-h-[72px] sm:min-h-[80px] p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
      isSelected 
        ? 'cal-cell-active' 
        : (isToday ? 'cal-cell-today bg-indigo-950/20' : 'bg-brand-950/70 border-white/10 hover:border-white/30')
    }`;

    cell.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono font-bold ${isToday ? 'text-indigo-300' : 'text-slate-300'}">${d}</span>
        ${isToday ? '<span class="text-[9px] font-mono px-1 rounded bg-indigo-500 text-white font-bold">TODAY</span>' : ''}
      </div>

      <!-- Task Dots & Counter -->
      <div class="space-y-1">
        ${dayTasks.length > 0 ? `
          <div class="flex items-center gap-1">
            ${pendingHigh ? '<span class="w-2 h-2 rounded-full bg-rose-500" title="High Priority Task"></span>' : ''}
            ${pendingMed ? '<span class="w-2 h-2 rounded-full bg-amber-400" title="Medium Priority Task"></span>' : ''}
            ${allDone ? '<span class="w-2 h-2 rounded-full bg-emerald-400" title="All Completed"></span>' : ''}
          </div>
          <span class="text-[10px] font-mono text-slate-400 truncate block">
            ${dayTasks.length} ${dayTasks.length === 1 ? 'task' : 'tasks'}
          </span>
        ` : ''}
      </div>
    `;

    grid.appendChild(cell);
  }

  // Render Inspector Panel for Selected Date
  renderCalendarSelectedDateTasks();
}

function selectCalendarDate(dateStr) {
  selectedCalendarDate = dateStr;
  renderCalendar();
  soundFX.playTone(480, 0.05, 'sine', 0.03);
}

function renderCalendarSelectedDateTasks() {
  const container = document.getElementById('selectedDateTasksList');
  const heading = document.getElementById('selectedDateInspectorHeading');
  if (!container) return;
  container.innerHTML = '';

  const dateObj = new Date(selectedCalendarDate + 'T00:00:00');
  const formattedHeading = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
  if (heading) heading.innerText = formattedHeading;

  const dayTasks = tasks.filter(t => t.date === selectedCalendarDate);

  if (dayTasks.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center rounded-xl bg-brand-950/60 border border-white/5 space-y-2">
        <p class="text-xs text-slate-400">No tasks scheduled for this day.</p>
        <button onclick="openAddTaskForSelectedDate()" class="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs inline-flex items-center gap-1">
          <i class="ph-bold ph-plus"></i> Add Task for this Day
        </button>
      </div>
    `;
    return;
  }

  dayTasks.forEach(task => {
    const item = document.createElement('div');
    item.className = `p-3 rounded-xl border flex items-center justify-between gap-2 text-xs transition-all ${
      task.completed ? 'bg-brand-950/40 border-white/5 opacity-70' : 'bg-brand-950 border-white/10'
    }`;

    item.innerHTML = `
      <div class="flex items-center gap-2.5 min-w-0">
        <button onclick="toggleTask('${task.id}')" class="w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
          task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/20 bg-brand-900 text-transparent'
        }">
          <i class="ph-bold ph-check text-xs"></i>
        </button>
        <div class="min-w-0">
          <h5 class="font-semibold text-white truncate text-xs ${task.completed ? 'line-through text-slate-400' : ''}">${task.title}</h5>
          <span class="text-[10px] text-slate-400">${task.startTime || 'All-Day'} • ${task.priority}</span>
        </div>
      </div>
      <button onclick="openEditTaskModal('${task.id}')" class="text-slate-500 hover:text-white p-1">
        <i class="ph-bold ph-pencil-simple text-xs"></i>
      </button>
    `;
    container.appendChild(item);
  });
}

function openAddTaskForSelectedDate() {
  openAddTaskModal(selectedCalendarDate);
}

function changeCalendarMonthOffset(offset) {
  viewingCalendarMonth += offset;
  if (viewingCalendarMonth < 0) {
    viewingCalendarMonth = 11;
    viewingCalendarYear--;
  } else if (viewingCalendarMonth > 11) {
    viewingCalendarMonth = 0;
    viewingCalendarYear++;
  }
  renderCalendar();
}

function jumpCalendarToCurrentMonth() {
  const now = new Date();
  viewingCalendarMonth = now.getMonth();
  viewingCalendarYear = now.getFullYear();
  selectedCalendarDate = now.toISOString().split('T')[0];
  renderCalendar();
}

// ==========================================
// 12. REAL GOOGLE GEMINI AI ASSISTANT (PHASE 3)
// ==========================================
function renderChatMessages() {
  const container = document.getElementById('chatMessagesContainer');
  if (!container) return;
  container.innerHTML = '';

  chatHistory.forEach((msg, idx) => {
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
        
        <!-- Action Confirmation Card if AI proposed creating task or schedule block -->
        ${!isUser && msg.action ? renderAiActionCard(msg.action, idx) : ''}
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

function renderAiActionCard(action, msgIndex) {
  if (!action) return '';

  if (action.type === 'create_task' && action.task) {
    const t = action.task;
    return `
      <div id="aiActionCard-${msgIndex}" class="mt-3 p-3.5 rounded-xl bg-indigo-950/70 border border-indigo-500/40 space-y-2">
        <div class="flex items-center justify-between text-xs font-mono text-indigo-300 font-bold">
          <span class="flex items-center gap-1"><i class="ph-bold ph-plus-circle"></i> Proposed Task Action</span>
          <span class="px-2 py-0.5 rounded bg-indigo-500/20 text-[10px]">${t.priority || 'Medium'} Priority</span>
        </div>
        <h5 class="text-xs font-bold text-white">${t.title}</h5>
        <div class="text-[11px] font-mono text-slate-300 flex flex-wrap gap-2">
          <span>Date: <strong>${t.date || 'Today'}</strong></span>
          ${t.startTime ? `<span>Time: <strong>${t.startTime}${t.endTime ? '-' + t.endTime : ''}</strong></span>` : ''}
          <span>Category: <strong>${t.category || 'Study'}</strong></span>
        </div>
        <div class="pt-1 flex items-center gap-2">
          <button onclick="confirmAndExecuteAiAction(${msgIndex})" class="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-md transition-all">
            <i class="ph-bold ph-check"></i> Confirm & Add to Tasks
          </button>
        </div>
      </div>
    `;
  }

  return '';
}

function confirmAndExecuteAiAction(msgIndex) {
  const msg = chatHistory[msgIndex];
  if (!msg || !msg.action || !msg.action.task) return;

  const t = msg.action.task;
  const newTask = {
    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    title: t.title || 'AI Scheduled Task',
    category: t.category || 'Study',
    priority: t.priority || 'Medium',
    date: t.date || new Date().toISOString().split('T')[0],
    startTime: t.startTime || '',
    endTime: t.endTime || '',
    deadline: t.deadline || '',
    description: t.description || 'Generated by Astra AI',
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null
  };

  tasks.unshift(newTask);
  saveAppData();

  soundFX.successChime();
  showToast(`Task "${newTask.title}" added to your schedule!`);

  // Update card UI to indicate executed
  const cardEl = document.getElementById(`aiActionCard-${msgIndex}`);
  if (cardEl) {
    cardEl.innerHTML = `
      <div class="flex items-center gap-2 text-xs font-bold text-emerald-400">
        <i class="ph-bold ph-check-circle text-base"></i> Added to your Tasks & Dashboard!
      </div>
    `;
  }

  msg.action = null; // Mark action resolved

  renderDashboard();
  renderTasksList();
  renderCalendar();
}

async function handleSendMessage(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('chatInput');
  const userText = input.value.trim();
  if (!userText) return;

  chatHistory.push({ role: 'user', text: userText });
  input.value = '';
  renderChatMessages();

  soundFX.playTone(480, 0.08, 'sine', 0.04);
  triggerMascotReaction('thinking', 'Astra is synthesizing your solution...');

  // Show thinking spinner
  const container = document.getElementById('chatMessagesContainer');
  const typingIndicator = document.createElement('div');
  typingIndicator.id = 'aiTypingIndicator';
  typingIndicator.className = 'flex gap-3 justify-start items-center text-xs text-purple-300 font-mono py-2';
  typingIndicator.innerHTML = `
    <div class="w-7 h-7 rounded-lg bg-purple-600/30 flex items-center justify-center animate-spin">
      <i class="ph-bold ph-arrows-clockwise text-sm"></i>
    </div>
    <span>Astra is analyzing tasks and connecting to Gemini API...</span>
  `;
  container.appendChild(typingIndicator);
  container.scrollTop = container.scrollHeight;

  // Call backend API /api/ai
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userText,
        history: chatHistory.slice(-8),
        context: {
          tasks: tasks,
          timetable: timetable,
          habits: habits
        },
        userKey: customApiKey
      })
    });

    const data = await response.json();
    const typing = document.getElementById('aiTypingIndicator');
    if (typing) typing.remove();

    if (data && data.text) {
      chatHistory.push({
        role: 'assistant',
        text: data.text,
        action: data.action || null
      });
      soundFX.successChime();
      triggerMascotReaction('cheering', 'Solution synthesized!');
    } else {
      chatHistory.push({
        role: 'assistant',
        text: 'I encountered an error receiving response from the AI engine. Please check your network or API key.'
      });
    }

  } catch (err) {
    console.error('AI Request failed:', err);
    const typing = document.getElementById('aiTypingIndicator');
    if (typing) typing.remove();

    chatHistory.push({
      role: 'assistant',
      text: `### ⚠️ Connection Notice\n\nCould not reach the server API endpoint (\`/api/ai\`). Check your internet connection or configure your API key in **Settings**.`
    });
  }

  renderChatMessages();
}

function sendQuickPrompt(promptText) {
  switchView('ai');
  const input = document.getElementById('chatInput');
  if (input) input.value = promptText;
  handleSendMessage();
}

function clearChatHistory() {
  if (confirm('Clear Astra chat conversation history?')) {
    chatHistory = [
      {
        role: 'assistant',
        text: `Conversation cleared. I am ready for your next question or schedule command!`
      }
    ];
    renderChatMessages();
    showToast('Chat history cleared');
  }
}

function parseMarkdownSimple(text) {
  if (!text) return '';
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // Headings
  html = html.replace(/^### (.*$)/gim, '<h4 class="text-sm font-bold text-purple-300 mt-2 mb-1">$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h3 class="text-base font-bold text-white mt-2 mb-1">$1</h3>');
  html = html.replace(/^# (.*$)/gim, '<h2 class="text-lg font-black text-white mt-2 mb-1">$1</h2>');
  // Unordered list items
  html = html.replace(/^\s*-\s+(.*$)/gim, '<li class="text-xs sm:text-sm text-slate-200 ml-4 list-disc">$1</li>');

  // Paragraph line breaks
  html = html.replace(/\n\n/g, '<br><br>');
  html = html.replace(/\n/g, '<br>');

  return html;
}

// ==========================================
// 13. PRESERVED 31-DAY HABIT MATRIX & CHARTS
// ==========================================
function getWeekInfo(day) {
  if (day <= 7) return { week: 1, class: 'w1-check' };
  if (day <= 14) return { week: 2, class: 'w2-check' };
  if (day <= 21) return { week: 3, class: 'w3-check' };
  if (day <= 28) return { week: 4, class: 'w4-check' };
  return { week: 5, class: 'w5-check' };
}

function renderMatrixCalendarHeaders() {
  const mSelect = document.getElementById('monthSelect');
  const ySelect = document.getElementById('yearSelect');
  const month = mSelect ? parseInt(mSelect.value) : 10;
  const year = ySelect ? parseInt(ySelect.value) : 2026;

  const daysNumRow = document.getElementById('daysNumberHeaderRow');
  const daysOfWeekRow = document.getElementById('daysOfWeekHeaderRow');
  if (!daysNumRow || !daysOfWeekRow) return;

  const realNow = new Date();
  const isCurrentMonth = (realNow.getMonth() === month && realNow.getFullYear() === year);
  const todayDay = isCurrentMonth ? realNow.getDate() : -1;

  const shortDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  let numHtml = '<th class="p-1.5 text-left pl-3 text-slate-400 font-normal">Day Number</th>';
  let weekHtml = '<th class="p-1.5 text-left pl-3 text-slate-400 font-normal">Day of Week</th>';

  for (let d = 1; d <= 31; d++) {
    const wInfo = getWeekInfo(d);
    const borderRight = (d === 7 || d === 14 || d === 21 || d === 28 || d === 31) 
      ? 'border-r-2 border-white/10' 
      : 'border-r border-white/5';
    
    const isToday = (d === todayDay);
    const dateObj = new Date(year, month, d);
    const dayOfWeekIdx = dateObj.getDay();
    const dayLetter = shortDays[dayOfWeekIdx];
    const dayFull = fullDays[dayOfWeekIdx];
    const isWeekend = (dayOfWeekIdx === 0 || dayOfWeekIdx === 6);

    const weekBgMap = {
      1: { bg: 'bg-amber-950/40', text: 'text-amber-300' },
      2: { bg: 'bg-sky-950/40', text: 'text-sky-300' },
      3: { bg: 'bg-rose-950/40', text: 'text-rose-300' },
      4: { bg: 'bg-emerald-950/40', text: 'text-emerald-300' },
      5: { bg: 'bg-purple-950/40', text: 'text-purple-300' }
    };
    const colorTheme = weekBgMap[wInfo.week];

    if (isToday) {
      numHtml += `<th class="w-8 py-1.5 bg-gradient-to-b from-indigo-600 to-purple-600 text-white font-black ring-2 ring-purple-400 ${borderRight}" title="TODAY: Day ${d}">${d}</th>`;
      weekHtml += `<th class="bg-indigo-600 text-white font-black ring-2 ring-purple-400 ${borderRight}" title="TODAY: ${dayFull}">${dayLetter}</th>`;
    } else {
      numHtml += `<th class="w-8 py-1.5 ${colorTheme.bg} ${colorTheme.text} ${borderRight}">${d}</th>`;
      const textColor = isWeekend ? 'text-amber-300 font-bold' : 'text-slate-400';
      weekHtml += `<th class="${textColor} ${borderRight}">${dayLetter}</th>`;
    }
  }

  numHtml += '<th class="bg-brand-950 text-amber-300 border-r border-white/10">31</th><th class="bg-brand-950 text-slate-300 border-r border-white/10">%</th><th class="bg-brand-950"></th>';
  weekHtml += '<th class="bg-brand-950 border-r border-white/10">-</th><th class="bg-brand-950 border-r border-white/10">-</th><th class="bg-brand-950"></th>';

  daysNumRow.innerHTML = numHtml;
  daysOfWeekRow.innerHTML = weekHtml;
}

function renderMatrixTable() {
  const tbody = document.getElementById('matrixTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  habits.forEach((habit, habitIdx) => {
    const tr = document.createElement('tr');
    tr.className = "hover:bg-white/5 transition-colors";

    const completedDaysCount = habit.days ? habit.days.length : 0;
    const goalTarget = habit.goal || 25;
    const progressPct = Math.min(100, Math.round((completedDaysCount / goalTarget) * 100));

    let html = `
      <td class="p-2 pl-3 font-semibold text-white border-r border-white/10 flex items-center justify-between min-w-[170px]">
        <span class="truncate" title="${habit.name}">${habit.name}</span>
        <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-400 border border-white/5">${habit.category}</span>
      </td>
    `;

    for (let d = 1; d <= 31; d++) {
      const isChecked = habit.days && habit.days.includes(d);
      const wInfo = getWeekInfo(d);
      const borderRight = (d === 7 || d === 14 || d === 21 || d === 28 || d === 31) 
        ? 'border-r-2 border-white/10' 
        : 'border-r border-white/5';

      html += `
        <td class="text-center p-1 ${borderRight}">
          <input type="checkbox" ${isChecked ? 'checked' : ''} 
            onchange="toggleCell(${habit.id}, ${d})" 
            class="cell-checkbox ${wInfo.class}"
            title="Day ${d}">
        </td>
      `;
    }

    html += `
      <td class="text-center font-mono font-bold text-amber-300 border-r border-white/10 bg-amber-950/10">
        <input type="number" min="1" max="31" value="${habit.goal || 25}" 
          onchange="updateHabitGoal(${habit.id}, this.value)" 
          class="w-12 text-center bg-transparent border-b border-transparent hover:border-white/20 focus:outline-none font-mono">
      </td>
      <td class="p-2 border-r border-white/10">
        <div class="flex items-center gap-2">
          <div class="flex-1 bg-brand-950 h-2.5 rounded overflow-hidden border border-white/10">
            <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-sm transition-all" style="width: ${progressPct}%"></div>
          </div>
          <span class="text-[10px] font-mono text-slate-300 w-7 text-right">${progressPct}%</span>
        </div>
      </td>
      <td class="text-center p-1">
        <button onclick="deleteHabit(${habit.id})" class="text-slate-500 hover:text-rose-400 p-1" title="Delete Habit">
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
  if (index > -1) {
    habit.days.splice(index, 1);
  } else {
    habit.days.push(day);
    habit.days.sort((a,b) => a-b);
  }

  saveAppData();
  renderMatrixTable();
  updateAllCalculationsAndCharts();
  soundFX.checkSound();
}

function updateHabitGoal(habitId, val) {
  const habit = habits.find(h => h.id === habitId);
  if (habit) {
    habit.goal = parseInt(val) || 25;
    saveAppData();
    renderMatrixTable();
    updateAllCalculationsAndCharts();
  }
}

function deleteHabit(habitId) {
  if (confirm('Delete this habit track from the matrix?')) {
    habits = habits.filter(h => h.id !== habitId);
    saveAppData();
    renderMatrixTable();
    updateAllCalculationsAndCharts();
    showToast('Habit deleted');
  }
}

function openAddHabitModal() {
  document.getElementById('habitInputName').value = '';
  document.getElementById('habitInputGoal').value = '25';
  const modal = document.getElementById('addHabitModal');
  if (modal) modal.classList.remove('hidden');
}

function closeAddHabitModal() {
  const modal = document.getElementById('addHabitModal');
  if (modal) modal.classList.add('hidden');
}

function handleCreateHabit(e) {
  if (e) e.preventDefault();
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
  renderMatrixTable();
  updateAllCalculationsAndCharts();
  soundFX.successChime();
  showToast(`Habit "${name}" added to Matrix!`);
}

function changeCalendarMonth() {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const m = parseInt(document.getElementById('monthSelect').value);
  const y = parseInt(document.getElementById('yearSelect').value);
  const banner = document.getElementById('matrixBannerTitle');
  if (banner) banner.innerText = `(${monthNames[m]}) ${y} Habit & Skill Matrix`;

  renderMatrixCalendarHeaders();
  renderMatrixTable();
  updateAllCalculationsAndCharts();
  runLoopholeAudit();
}

// Donut & Bar Charts
function initDonutCharts() {
  if (typeof Chart === 'undefined') return;
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
        plugins: { legend: { display: false }, tooltip: { enabled: false } }
      }
    });
  });
}

function updateDonutChart(key, done, remaining, accentColor) {
  const chart = donutCharts[key];
  if (!chart || typeof Chart === 'undefined') return;
  if (done === 0 && remaining === 0) remaining = 1;
  chart.data.datasets[0].data = [done, remaining];
  chart.data.datasets[0].backgroundColor = [accentColor, 'rgba(255,255,255,0.06)'];
  chart.update();
}

function initSecondaryCharts() {
  if (typeof Chart === 'undefined') return;
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
          backgroundColor: '#6366f1',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
          x: { grid: { display: false } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }
}

function updateAllCalculationsAndCharts() {
  const totalHabits = habits.length;
  if (totalHabits === 0) return;

  const wSpans = {
    w1: { start: 1, end: 7, color: '#f59e0b' },
    w2: { start: 8, end: 14, color: '#0284c7' },
    w3: { start: 15, end: 21, color: '#e11d48' },
    w4: { start: 22, end: 28, color: '#10b981' },
    w5: { start: 29, end: 31, color: '#9333ea' }
  };

  let grandTotalDone = 0;
  const dailyCounts = new Array(32).fill(0);

  habits.forEach(h => {
    if (h.days) {
      h.days.forEach(d => {
        if (d >= 1 && d <= 31) {
          dailyCounts[d]++;
          grandTotalDone++;
        }
      });
    }
  });

  // Update Week Donuts
  Object.keys(wSpans).forEach(key => {
    const span = wSpans[key];
    const daysInWeek = (span.end - span.start + 1);
    const target = daysInWeek * totalHabits;
    let done = 0;
    for (let d = span.start; d <= span.end; d++) done += dailyCounts[d];

    const pct = target > 0 ? Math.round((done / target) * 100) : 0;
    setElText(`${key}DonutCenterText`, `${pct}%`);
    setElText(`${key}RatioText`, `${done}/${target}`);
    updateDonutChart(key, done, Math.max(0, target - done), span.color);
  });

  // Total Month
  const grandTarget = 31 * totalHabits;
  const grandPct = grandTarget > 0 ? Math.round((grandTotalDone / grandTarget) * 100) : 0;
  setElText('totalMonthDonutCenterText', `${grandPct}%`);
  setElText('totalMonthRatioText', `${grandTotalDone}/${grandTarget}`);
  updateDonutChart('totalMonth', grandTotalDone, Math.max(0, grandTarget - grandTotalDone), '#818cf8');

  // Update Bar Chart
  if (dailyTrendChartInstance && typeof Chart !== 'undefined') {
    dailyTrendChartInstance.data.datasets[0].data = dailyCounts.slice(1);
    dailyTrendChartInstance.update();
  }
}

function runLoopholeAudit() {
  const container = document.getElementById('loopholeContainer');
  if (!container) return;
  container.innerHTML = '';

  const total = habits.length;
  if (total === 0) return;

  const card1 = document.createElement('div');
  card1.className = "p-3.5 rounded-xl bg-brand-950 border border-emerald-500/30 space-y-1";
  card1.innerHTML = `
    <div class="flex items-center justify-between text-xs font-bold text-emerald-400">
      <span>High Activation Consistency</span>
      <i class="ph-bold ph-check-circle"></i>
    </div>
    <p class="text-xs text-slate-300">Days 1 to 14 exhibit steady activation momentum. Maintain daily checklist discipline.</p>
  `;
  container.appendChild(card1);
}

// ==========================================
// 14. SETTINGS & STUDY VAULT CONTROLLER
// ==========================================
function toggleSettingsSubTab(subTab) {
  const configPanel = document.getElementById('settingsSubPanelConfig');
  const vaultPanel = document.getElementById('settingsSubPanelVault');
  const btnConfig = document.getElementById('btnSettingsSubTabConfig');
  const btnVault = document.getElementById('btnSettingsSubTabVault');

  if (subTab === 'config') {
    if (configPanel) configPanel.classList.remove('hidden');
    if (vaultPanel) vaultPanel.classList.add('hidden');
    if (btnConfig) btnConfig.className = "px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold transition-all";
    if (btnVault) btnVault.className = "px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white font-semibold transition-all";
  } else {
    if (configPanel) configPanel.classList.add('hidden');
    if (vaultPanel) vaultPanel.classList.remove('hidden');
    if (btnVault) btnVault.className = "px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold transition-all";
    if (btnConfig) btnConfig.className = "px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white font-semibold transition-all";
    renderVideosFeed();
    renderSavedVideosVault();
  }
}

function saveSettingsApiKey() {
  const input = document.getElementById('settingsGeminiKeyInput');
  if (input) {
    customApiKey = input.value.trim();
    localStorage.setItem(API_CONFIG_KEY, JSON.stringify({ apiKey: customApiKey }));
    showToast(customApiKey ? 'Gemini API Key saved for this session!' : 'Key cleared. Using server default.');
  }
}

async function testGeminiConnection() {
  const statusEl = document.getElementById('geminiConnectionStatus');
  if (statusEl) {
    statusEl.classList.remove('hidden');
    statusEl.innerText = 'Testing Gemini API connection...';
  }

  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Ping. Confirm you are Astra and ready.',
        userKey: customApiKey
      })
    });
    const data = await res.json();
    if (statusEl) {
      if (data.isLiveGemini) {
        statusEl.className = "text-xs font-mono text-emerald-400 mt-2";
        statusEl.innerText = '✓ Connected to Google Gemini 2.5/1.5 Flash successfully!';
      } else {
        statusEl.className = "text-xs font-mono text-amber-300 mt-2";
        statusEl.innerText = `ℹ️ ${data.notice || 'Connected in local mode.'}`;
      }
    }
  } catch (err) {
    if (statusEl) {
      statusEl.className = "text-xs font-mono text-rose-400 mt-2";
      statusEl.innerText = `⚠️ Connection error: ${err.message}`;
    }
  }
}

function exportDataJSON() {
  const backup = {
    version: '3.0',
    exportDate: new Date().toISOString(),
    tasks,
    timetable,
    habits,
    videos,
    savedVideos,
    unlockedVideos
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `chronosprint-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  showToast('Backup file downloaded!');
}

function importDataJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      if (parsed.tasks) tasks = parsed.tasks;
      if (parsed.timetable) timetable = parsed.timetable;
      if (parsed.habits) habits = parsed.habits;
      if (parsed.videos) videos = parsed.videos;
      if (parsed.savedVideos) savedVideos = parsed.savedVideos;
      if (parsed.unlockedVideos) unlockedVideos = parsed.unlockedVideos;

      saveAppData();
      renderDashboard();
      renderTimetable();
      renderTasksList();
      renderCalendar();
      renderMatrixTable();
      updateAllCalculationsAndCharts();
      showToast('Data imported successfully!');
      soundFX.successChime();
    } catch (err) {
      alert('Invalid backup JSON file.');
    }
  };
  reader.readAsText(file);
}

// Masterclasses & Vault Feed
function renderVideosFeed() {
  const container = document.getElementById('videosGridContainer');
  if (!container) return;
  container.innerHTML = '';

  const filtered = videos.filter(v => currentVideoFilter === 'All' || v.category === currentVideoFilter);

  filtered.forEach(video => {
    const isSaved = savedVideos.includes(video.id);
    const card = document.createElement('div');
    card.className = "glass-panel rounded-2xl overflow-hidden border border-white/10 space-y-3 p-4 flex flex-col justify-between";
    card.innerHTML = `
      <div>
        <div class="relative aspect-video rounded-xl bg-black/60 overflow-hidden mb-3">
          <img src="https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg" alt="${video.title}" class="w-full h-full object-cover">
          <span class="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/80 text-white font-bold">${video.duration || 'Video'}</span>
        </div>
        <span class="text-[10px] font-mono uppercase font-bold text-purple-400">${video.category}</span>
        <h4 class="text-xs font-bold text-white mt-0.5 line-clamp-2">${video.title}</h4>
        <p class="text-[11px] text-slate-400">${video.channel}</p>
      </div>
      <div class="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
        <a href="https://www.youtube.com/watch?v=${video.youtubeId}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1 shadow">
          <i class="ph-bold ph-play"></i> Watch
        </a>
        <button onclick="toggleSaveVideo('${video.id}')" class="p-1.5 rounded-lg border text-xs ${isSaved ? 'bg-sky-500 text-white border-sky-400' : 'bg-brand-900 border-white/10 text-slate-400'}">
          <i class="ph-bold ph-bookmark-simple"></i>
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderSavedVideosVault() {
  const container = document.getElementById('savedVaultGrid');
  if (!container) return;
  container.innerHTML = '';

  const vaultVideos = videos.filter(v => savedVideos.includes(v.id));
  if (vaultVideos.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-8 text-center rounded-2xl bg-brand-950/60 border border-white/10 text-xs text-slate-400">
        No masterclasses saved to your Vault yet. Click the bookmark icon on any video to add it.
      </div>
    `;
    return;
  }

  vaultVideos.forEach(video => {
    const card = document.createElement('div');
    card.className = "glass-panel rounded-2xl p-4 border border-white/10 flex flex-col justify-between space-y-3";
    card.innerHTML = `
      <div>
        <h4 class="text-xs font-bold text-white">${video.title}</h4>
        <p class="text-[11px] text-slate-400">${video.channel} • ${video.category}</p>
      </div>
      <div class="flex items-center justify-between text-xs pt-2 border-t border-white/5">
        <a href="https://www.youtube.com/watch?v=${video.youtubeId}" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:text-white flex items-center gap-1 font-semibold">
          <i class="ph-bold ph-arrow-square-out"></i> Open Lecture
        </a>
        <button onclick="toggleSaveVideo('${video.id}')" class="text-slate-400 hover:text-rose-400 text-xs">
          Remove
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterVideosByCategory(cat) {
  currentVideoFilter = cat;
  const pills = ['catAll', 'catTech', 'catSystemDesign', 'catCommunication', 'catProductivity'];
  pills.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.className = "px-3 py-1 rounded-lg bg-brand-900 border border-white/10 text-slate-300";
    }
  });

  const activePill = document.getElementById(`cat${cat}`);
  if (activePill) {
    activePill.className = "px-3 py-1 rounded-lg bg-indigo-600 text-white font-semibold";
  }

  renderVideosFeed();
}

function toggleSaveVideo(id) {
  const idx = savedVideos.indexOf(id);
  if (idx > -1) {
    savedVideos.splice(idx, 1);
    showToast('Removed from Saved Vault');
  } else {
    savedVideos.push(id);
    soundFX.checkSound();
    showToast('Saved to your Vault!');
  }
  saveAppData();
  renderVideosFeed();
  renderSavedVideosVault();
}

// Modals: API Key & Custom Video
function openApiKeyModal() {
  const input = document.getElementById('geminiApiKeyInput');
  if (input) input.value = customApiKey;
  const modal = document.getElementById('apiKeyModal');
  if (modal) modal.classList.remove('hidden');
}

function closeApiKeyModal() {
  const modal = document.getElementById('apiKeyModal');
  if (modal) modal.classList.add('hidden');
}

function saveApiKey(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('geminiApiKeyInput');
  customApiKey = input.value.trim();
  localStorage.setItem(API_CONFIG_KEY, JSON.stringify({ apiKey: customApiKey }));
  closeApiKeyModal();
  showToast(customApiKey ? 'Gemini API Key saved!' : 'Using server default key.');
}

function openAddVideoModal() {
  const modal = document.getElementById('addVideoModal');
  if (modal) modal.classList.remove('hidden');
}

function closeAddVideoModal() {
  const modal = document.getElementById('addVideoModal');
  if (modal) modal.classList.add('hidden');
}

function handleCreateCustomVideo(e) {
  if (e) e.preventDefault();
  const urlOrId = document.getElementById('customVideoUrl').value.trim();
  const title = document.getElementById('customVideoTitle').value.trim();
  const category = document.getElementById('customVideoCategory').value;
  const channel = document.getElementById('customVideoChannel').value.trim() || 'Custom Channel';

  let ytId = urlOrId;
  const match = urlOrId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match) ytId = match[1];

  if (!ytId || ytId.length < 5) {
    alert('Please provide a valid YouTube URL or video ID.');
    return;
  }

  videos.unshift({
    id: `custom-${Date.now()}`,
    youtubeId: ytId,
    title,
    channel,
    category,
    duration: 'Video'
  });

  saveAppData();
  closeAddVideoModal();
  renderVideosFeed();
  showToast('Masterclass added to feed!');
}

// ==========================================
// 15. MASCOT COMPANION (ASTRA)
// ==========================================
const mascotQuotes = [
  "Consistency is the only superpower that cannot be faked.",
  "Deep focus for 90 minutes beats 8 hours of distracted browsing.",
  "Check off your priority tasks early before willpower is drained!",
  "Small wins compound exponentially. Protect your momentum!",
  "Astra AI is standing by to help you schedule and optimize."
];

function initMascot() {
  const speechBubble = document.getElementById('mascotSpeechBubble');
  if (speechBubble) {
    speechBubble.innerText = mascotQuotes[Math.floor(Math.random() * mascotQuotes.length)];
  }

  setInterval(() => {
    if (mascotMood === 'idle' && speechBubble) {
      speechBubble.innerText = mascotQuotes[Math.floor(Math.random() * mascotQuotes.length)];
    }
  }, 25000);
}

function interactWithMascot() {
  soundFX.playTone(700, 0.1, 'triangle', 0.1);
  triggerMascotReaction('cheering', "I'm right here with you! Let's conquer today's timetable!");
}

function triggerMascotReaction(mood, dialogue) {
  mascotMood = mood;
  const speechBubble = document.getElementById('mascotSpeechBubble');
  const avatar = document.getElementById('mascotAvatarEl');

  if (speechBubble && dialogue) {
    speechBubble.innerText = dialogue;
  }

  if (avatar && mood === 'cheering') {
    avatar.classList.add('mascot-celebrate');
    avatar.classList.remove('mascot-avatar-float');
  }

  setTimeout(() => {
    mascotMood = 'idle';
    if (avatar) {
      avatar.classList.remove('mascot-celebrate');
      avatar.classList.add('mascot-avatar-float');
    }
  }, 4000);
}

// ==========================================
// 16. PWA INSTALL BANNER
// ==========================================
let deferredPrompt = null;
function initPWAInstallPrompt() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.log('[ChronoSprint] SW registered:', reg.scope);
    }).catch(err => {
      console.log('[ChronoSprint] SW error:', err);
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
        showToast('ChronoSprint installed!');
      }
      deferredPrompt = null;
    });
  } else {
    alert('To install ChronoSprint:\n\n- Chrome / Edge: Click the "Install App" button in the address bar.\n- Safari iOS: Tap Share -> "Add to Home Screen".');
  }
}

function closePwaBanner() {
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.classList.add('hidden');
}

function setElText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

// ==========================================
// 17. EXPLICIT GLOBAL WINDOW BINDINGS
// (Guarantees every interactive element & onclick functions seamlessly)
// ==========================================
if (typeof window !== 'undefined') {
  window.switchView = switchView;
  window.openAddTaskModal = openAddTaskModal;
  window.openEditTaskModal = openEditTaskModal;
  window.closeTaskModal = closeTaskModal;
  window.handleSaveTask = handleSaveTask;
  window.toggleTask = toggleTask;
  window.openDeleteTaskModal = openDeleteTaskModal;
  window.closeDeleteTaskModal = closeDeleteTaskModal;
  window.confirmDeleteTask = confirmDeleteTask;
  window.handleTaskSearch = handleTaskSearch;
  window.setTaskFilter = setTaskFilter;

  window.openAddTimetableModal = openAddTimetableModal;
  window.closeTimetableModal = closeTimetableModal;
  window.handleSaveTimetable = handleSaveTimetable;
  window.deleteTimetableBlock = deleteTimetableBlock;
  window.filterTimetableByDay = filterTimetableByDay;

  window.changeCalendarMonthOffset = changeCalendarMonthOffset;
  window.jumpCalendarToCurrentMonth = jumpCalendarToCurrentMonth;
  window.selectCalendarDate = selectCalendarDate;
  window.openAddTaskForSelectedDate = openAddTaskForSelectedDate;

  window.handleSendMessage = handleSendMessage;
  window.sendQuickPrompt = sendQuickPrompt;
  window.clearChatHistory = clearChatHistory;
  window.confirmAndExecuteAiAction = confirmAndExecuteAiAction;

  window.openAddHabitModal = openAddHabitModal;
  window.closeAddHabitModal = closeAddHabitModal;
  window.handleCreateHabit = handleCreateHabit;
  window.toggleCell = toggleCell;
  window.updateHabitGoal = updateHabitGoal;
  window.deleteHabit = deleteHabit;
  window.changeCalendarMonth = changeCalendarMonth;
  window.runLoopholeAudit = runLoopholeAudit;

  window.toggleSettingsSubTab = toggleSettingsSubTab;
  window.saveSettingsApiKey = saveSettingsApiKey;
  window.testGeminiConnection = testGeminiConnection;
  window.exportDataJSON = exportDataJSON;
  window.importDataJSON = importDataJSON;
  window.loadSamplePresets = loadSamplePresets;

  window.openAddVideoModal = openAddVideoModal;
  window.closeAddVideoModal = closeAddVideoModal;
  window.handleCreateCustomVideo = handleCreateCustomVideo;
  window.filterVideosByCategory = filterVideosByCategory;
  window.toggleSaveVideo = toggleSaveVideo;

  window.openApiKeyModal = openApiKeyModal;
  window.closeApiKeyModal = closeApiKeyModal;
  window.saveApiKey = saveApiKey;

  window.interactWithMascot = interactWithMascot;
  window.triggerPWAInstall = triggerPWAInstall;
  window.closePwaBanner = closePwaBanner;
}
