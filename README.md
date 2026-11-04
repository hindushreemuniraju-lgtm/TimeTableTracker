# 🚀 ChronoSprint Mastery & Habit Matrix (App v2.0)

> **Real-Time 31-Day Habit & Skill Optimizer • ChatGPT-Grade AI Timetable Synthesizer • Interactive Animated Mascot Companion • Dynamic YouTube Skill Recommendations • Watch Later Vault • Gated Lecture CheatNotes & Flashcards**

---

## 🌟 Overview & Architecture

ChronoSprint is a **standalone Progressive Web Application (PWA)** engineered for high-performance students, software engineers, and professionals. Unlike standard static websites, ChronoSprint functions as an **installable desktop and mobile application** with offline caching, native haptics/audio chimes, and persistent real-time reactive state.

---

## ⚡ Core Features

### 1. 📊 Spreadsheet-Precision 31-Day Habit Matrix & Donut Trajectory
- **31-Day Matrix**: Authentic spreadsheet layout partitioned across 5 distinct week color zones:
  - **Week 1 (Days 1–7)**: Amber sprint foundation
  - **Week 2 (Days 8–14)**: Sky blue momentum phase
  - **Week 3 (Days 15–21)**: Rose endurance crucible
  - **Week 4 (Days 22–28)**: Emerald consistency lock
  - **Week 5 (Days 29–31)**: Purple cycle mastery
- **Real-Time Donut Charts**: 6 synchronous donut charts (Week 1–5 + Total Monthly Achievement) that re-calculate instantaneously on every checkmark change.
- **Daily Bar Trend & Domain Polar Chart**: Visualizing daily completion trajectory and domain balance across Study, Skill, Health, and Mindset.

### 2. 🤖 Astra AI • ChatGPT-Grade Assistant & Timetable Synthesizer
- **Conversational Intelligence**: Ask any question regarding Data Structures & Algorithms, System Design, Executive Communication, or Neuroscience.
- **Ultradian Timetable Generator**: Provide your daily hours (3h, 5h, or 8h), chronotype (Morning Lark vs Night Owl), and field, and Astra synthesizes a biologically optimized 90-minute deep work schedule.
- **1-Click Matrix Injection**: Push generated study time blocks directly into your active 31-day Habit Matrix with a single click.
- **Dual Engine**: Features built-in instant local intelligence plus an optional **Gemini API Key** integration modal for real-time live LLM streaming.

### 3. 👾 Interactive Animated Mascot Companion ("Astra")
- **Expressive Character Avatar**: Interactive animated SVG cyberpunk guide with floating animations, natural blinking eyes, audio-reactive pulses, and celebratory reactions.
- **Dynamic Motivational Dialogue**: Proactively gives guidance, reminds you of sleep hygiene, and celebrates your habit streaks.
- **Confetti & Tactile Feedback**: Triggers full-screen celebratory confetti bursts (`canvas-confetti`) and synthesized Web Audio chimes upon milestone achievements.

### 4. 📺 Dynamic YouTube Masterclasses & Skill Feed
- **Curated Field Recommendations**: Constantly updated masterclasses across:
  - *DSA & Coding*: Striver, NeetCode, William Fiset.
  - *System Design*: Alex Xu (ByteByteGo), Gaurav Sen.
  - *Executive Communication & Soft Skills*: Julian Treasure (TED), Matt Abrahams (Stanford GSB).
  - *Productivity & Focus*: Dr. Andrew Huberman (Dopamine & Ultradian Focus).
- **Dynamic Feed Rotation**: Shuffle and rotate fresh recommendations with category filtering.
- **Add Custom YouTube URLs**: Paste any YouTube link to track any custom lecture inside your study routine.

### 5. 🔒 Gated Lecture Studio & Mastery CheatNotes
- **Full Video Completion Gate**: To combat superficial skimming and guarantee memory retention, high-yield CheatNotes remain locked until the lecture is completed (100% watched).
- **Instant Test Bypass**: For demo, grading, and review, a 1-click test unlock button is available.
- **High-Yield CheatNotes Content**:
  - Executive 30-second synopsis
  - Core principles & architectural mental models
  - Active recall Anki-style flashcards (Q&A)
  - 24-hour practical drill
  - 1-Click "Copy Markdown", "Download .md", and "Add Revision Habit to Matrix" actions.

### 6. 🗄️ Saved Vault (Watch Later Queue)
- Dedicated bookmark vault to save lectures and tutorials for later.
- Track watch progress, launch video sessions, and manage your study queue.

### 7. 📱 True Native App Experience (PWA)
- **Installable Standalone App**: Configured with `manifest.json`, high-resolution vector app icons (`icon-192.svg`, `icon-512.svg`), and service worker (`sw.js`).
- **No Browser Chrome**: When installed on Windows, macOS, Android, or iOS, it runs in fullscreen standalone mode without browser URL bars.
- **Mobile Bottom Navigation Bar**: Fluid native app feel on mobile screens.

---

## 🛠️ Getting Started & Local Execution

### Option A: Direct Launch (Zero Installation Required)
Simply open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Safari, Brave, or Firefox).

### Option B: Node.js Production Server
```bash
# Start the lightweight zero-dependency server
npm start
```
Then visit: `http://localhost:3000`

---

## 🚢 Deployment Guide

ChronoSprint is ready to deploy to any cloud provider or static host:

### 1. Vercel
```bash
npx vercel
```
Or connect your Git repository to [Vercel](https://vercel.com) — zero configuration needed!

### 2. Netlify
Drag and drop this directory into [Netlify Drop](https://app.netlify.com/drop) or link via Git.

### 3. GitHub Pages
1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/chronosprint-app.git
   git branch -M main
   git push -u origin main
   ```
2. In your GitHub repository settings, go to **Pages** -> Select the `main` branch -> Save!

---

## 📜 Git Version History
- Initialized clean Git tracking with atomic commits.
- Structured with modular clean architecture (`index.html`, `styles.css`, `app.js`, `sw.js`, `manifest.json`, `server.js`).

---
*Built with ❤️ for deep cognitive mastery.*
