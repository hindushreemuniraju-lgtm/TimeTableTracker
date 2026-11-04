/**
 * ChronoSprint AI Assistant Backend Handler
 * Compatible with Vercel Serverless Functions and Local Node.js Server
 * Powered by Google Gemini API (@google/genai & REST fallback)
 */

let GoogleGenAIClass = null;
try {
  const genaiPkg = require('@google/genai');
  GoogleGenAIClass = genaiPkg.GoogleGenAI;
} catch (e) {
  console.warn('[ChronoSprint AI] @google/genai package not found, will use REST API fallback:', e.message);
}

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const hasKey = Boolean(process.env.GEMINI_API_KEY);
    res.end(JSON.stringify({
      status: 'active',
      service: 'ChronoSprint Gemini AI Engine',
      geminiConfigured: hasKey,
      sdkLoaded: Boolean(GoogleGenAIClass)
    }));
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed. Use POST.' }));
    return;
  }

  // Parse Request Body
  let rawBody = '';
  try {
    for await (const chunk of req) {
      rawBody += chunk;
    }
  } catch (err) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Failed to read request stream' }));
    return;
  }

  let payload = {};
  try {
    payload = rawBody ? JSON.parse(rawBody) : {};
  } catch (err) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
    return;
  }

  const { message = '', history = [], context = {}, userKey = '' } = payload;
  const apiKey = process.env.GEMINI_API_KEY || userKey;

  if (!message.trim()) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Message cannot be empty.' }));
    return;
  }

  // System Prompt with Injected Real-Time Context
  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const tasksList = Array.isArray(context.tasks) ? context.tasks : [];
  const pendingTasks = tasksList.filter(t => !t.completed);
  const completedTasks = tasksList.filter(t => t.completed);
  const timetableBlocks = Array.isArray(context.timetable) ? context.timetable : [];
  const habitsList = Array.isArray(context.habits) ? context.habits : [];

  const contextDescription = `
CURRENT USER CONTEXT:
- Real-Time Date: ${todayStr}
- Current Local Time: ${new Date().toLocaleTimeString()}
- Total Tasks: ${tasksList.length}
- Pending Tasks (${pendingTasks.length}): ${JSON.stringify(pendingTasks.map(t => ({ id: t.id, title: t.title, priority: t.priority, date: t.date, time: t.startTime ? `${t.startTime}-${t.endTime}` : 'All-Day', category: t.category })))}
- Completed Tasks (${completedTasks.length}): ${JSON.stringify(completedTasks.map(t => t.title))}
- Timetable Schedule: ${JSON.stringify(timetableBlocks.map(b => ({ title: b.title, time: `${b.startTime}-${b.endTime}`, day: b.day, type: b.type })))}
- Tracked Habits: ${JSON.stringify(habitsList.map(h => ({ name: h.name, category: h.category, completedDays: h.days ? h.days.length : 0 })))}
`;

  const systemInstructions = `You are Astra, the personal AI Timetable & Productivity Assistant in the ChronoSprint app.
Your mission is to help the user manage their daily schedule, prioritize tasks, overcome procrastination, optimize their timetable, and maintain momentum.

GUIDELINES:
1. Be concise, highly actionable, empathetic, and professional.
2. Use markdown formatting with clear headings, bullet points, and bold text.
3. Refer specifically to the user's actual tasks, timetable, and habits from the context provided above.
4. If the user asks to CREATE, ADD, or SCHEDULE a task (e.g. "Add a task to submit report tomorrow at 3 PM" or "Create a task for LeetCode"), you must provide a helpful conversational answer AND at the very bottom include a machine-readable action block formatted exactly as:
\`\`\`action
{"type":"create_task","task":{"title":"...","date":"YYYY-MM-DD","startTime":"HH:MM","endTime":"HH:MM","priority":"High"|"Medium"|"Low","category":"Study"|"Work"|"Health"|"Personal"|"Project","description":"..."}}
\`\`\`
5. If the user asks for a timetable schedule or daily routine, structure their hours cleanly, and you can provide an action block for timetable creation:
\`\`\`action
{"type":"create_timetable_block","block":{"title":"...","day":"Today","startTime":"HH:MM","endTime":"HH:MM","type":"Study"|"Lecture"|"Work"|"Break"|"Fitness"}}
\`\`\`
6. Never invent fake data when the user asks what tasks are pending; look at their actual pending tasks in the context!
7. Do not perform any destructive actions (like deleting) without explicit user confirmation.
`;

  // Check if GEMINI API Key is available
  if (!apiKey) {
    // Intelligent Context-Aware Local Reasoning Engine
    const localResult = generateLocalContextualResponse(message, context, contextDescription);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      text: localResult.text,
      action: localResult.action,
      isFallback: true,
      notice: 'Gemini API Key is not configured on the server. Running in Astra Local Mode. To enable live Gemini 2.5 Flash, add GEMINI_API_KEY to your Vercel Environment Variables or in App Settings.'
    }));
    return;
  }

  // Attempt Live Gemini Call
  try {
    let rawReply = '';

    if (GoogleGenAIClass) {
      const ai = new GoogleGenAIClass({ apiKey });
      
      const contents = [
        {
          role: 'user',
          parts: [{ text: `${systemInstructions}\n\n${contextDescription}\n\nPlease acknowledge your role as Astra.` }]
        },
        {
          role: 'model',
          parts: [{ text: "Understood! I am Astra, your ChronoSprint AI companion, fully synchronized with your current timetable, task list, and habit matrix. How can I assist you right now?" }]
        }
      ];

      // Add recent conversation history
      if (Array.isArray(history)) {
        history.slice(-6).forEach(msg => {
          if (msg && msg.text) {
            contents.push({
              role: msg.role === 'user' ? 'user' : 'model',
              parts: [{ text: msg.text }]
            });
          }
        });
      }

      // Add user's current query
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      // Try gemini-2.5-flash or gemini-1.5-flash
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: contents
        });
        rawReply = response.text || '';
      } catch (sdkModelErr) {
        console.warn('[ChronoSprint AI] gemini-2.5-flash fallback to gemini-1.5-flash:', sdkModelErr.message);
        const response = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents: contents
        });
        rawReply = response.text || '';
      }
    } else {
      // Direct REST API Fallback
      rawReply = await callGeminiREST(apiKey, systemInstructions, contextDescription, history, message);
    }

    // Extract action block if present
    let action = null;
    let cleanText = rawReply;
    const actionMatch = rawReply.match(/```action\s*([\s\S]*?)\s*```/);
    if (actionMatch) {
      try {
        action = JSON.parse(actionMatch[1].trim());
        cleanText = rawReply.replace(/```action[\s\S]*?```/, '').trim();
      } catch (err) {
        console.warn('[ChronoSprint AI] Action JSON parsing failed:', err.message);
      }
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      text: cleanText,
      action: action,
      isLiveGemini: true
    }));

  } catch (apiErr) {
    console.error('[ChronoSprint AI] Gemini API call failed:', apiErr);
    // Provide intelligent fallback instead of crashing
    const localResult = generateLocalContextualResponse(message, context, contextDescription);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      text: localResult.text,
      action: localResult.action,
      isFallback: true,
      errorDetail: apiErr.message,
      notice: `Gemini API returned: "${apiErr.message}". Astra Local Engine provided the response below.`
    }));
  }
};

/**
 * Direct REST fallback for Google Gemini
 */
async function callGeminiREST(apiKey, systemInstructions, contextDescription, history, message) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const contents = [
    {
      role: 'user',
      parts: [{ text: `${systemInstructions}\n\n${contextDescription}` }]
    },
    {
      role: 'model',
      parts: [{ text: "Ready. I am Astra with your context loaded." }]
    }
  ];

  if (Array.isArray(history)) {
    history.slice(-6).forEach(h => {
      contents.push({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text || '' }]
      });
    });
  }

  contents.push({
    role: 'user',
    parts: [{ text: message }]
  });

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini REST error ${response.status}: ${errText}`);
  }

  const json = await response.json();
  return json.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

/**
 * Intelligent Local Contextual Engine (Used as resilient fallback or offline)
 */
function generateLocalContextualResponse(query, context, contextDesc) {
  const lower = query.toLowerCase();
  const tasks = Array.isArray(context.tasks) ? context.tasks : [];
  const pending = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);
  const timetable = Array.isArray(context.timetable) ? context.timetable : [];

  // 1. Pending Tasks Query
  if (lower.includes('pending') || lower.includes('what tasks') || lower.includes('to do') || lower.includes('my tasks')) {
    if (pending.length === 0) {
      return {
        text: `### 🎯 No Pending Tasks!\n\nYou currently have **0 pending tasks**. All scheduled items are completed or none have been added yet.\n\nWould you like me to schedule a new study session or project task for you? Just say *"Add task to solve 2 LeetCode Mediums today"*!`
      };
    }
    const taskListMd = pending.map((t, idx) => {
      const priorityEmoji = t.priority === 'High' ? '🔴' : (t.priority === 'Medium' ? '🟡' : '🟢');
      const timeStr = t.startTime ? ` (${t.startTime} - ${t.endTime || ''})` : '';
      return `${idx + 1}. **${t.title}** ${priorityEmoji} *[${t.priority} Priority]* • ${t.category}${timeStr} - Due: \`${t.date || 'Today'}\``;
    }).join('\n');

    return {
      text: `### 📋 Your Pending Tasks (${pending.length})\n\nHere are the tasks awaiting your focus:\n\n${taskListMd}\n\n💡 **Astra's Recommendation:** Start with your **High Priority** items first during your peak cognitive energy block.`
    };
  }

  // 2. Priority Recommendation ("Which task should I complete first?")
  if (lower.includes('first') || lower.includes('which task') || lower.includes('priority') || lower.includes('prioritize')) {
    if (pending.length === 0) {
      return {
        text: `You have no pending tasks right now! Your plate is clean. Tell me what subject or project you want to tackle next, and I'll create the task for you.`
      };
    }
    const highPri = pending.filter(t => t.priority === 'High');
    const target = highPri.length > 0 ? highPri[0] : pending[0];
    return {
      text: `### ⚡ Top Execution Priority\n\nYou should tackle **"${target.title}"** first.\n\n- **Category:** ${target.category}\n- **Priority:** ${target.priority}\n- **Due Date:** ${target.date || 'Today'}\n\n**Why this one?** According to the *Eat That Frog* principle, completing your highest friction priority first eliminates subconscious anxiety and sets a positive dopamine feedback loop for the remainder of your schedule.`
    };
  }

  // 3. Timetable / Schedule Request
  if (lower.includes('timetable') || lower.includes('schedule') || lower.includes('study plan') || lower.includes('routine')) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    return {
      text: `### 📅 High-Performance Study Timetable\n\nHere is an optimized ultradian rhythm schedule:\n\n- **07:30 - 09:30 AM:** 🧠 **Block 1: Deep Focus Crucible** (DSA, Core Engineering, or Complex Math)\n- **09:30 - 10:00 AM:** ☕ *Break: Sunlight, Hydration & Cardio Walk*\n- **10:00 - 12:00 PM:** 💻 **Block 2: Active Construction** (System Design, Coding Projects)\n- **12:00 - 01:30 PM:** 🥗 *Lunch & Cognitive Rest*\n- **02:00 - 04:00 PM:** 📚 **Block 3: College Coursework & Lecture Revision**\n- **04:30 - 05:30 PM:** 🎙️ **Block 4: Communication & Interview Drill**\n- **08:30 - 09:00 PM:** 🔁 *Spaced Retrieval Flashcards & Daily Matrix Audit*\n\nWould you like me to register this first deep focus session directly into your task list?`,
      action: {
        type: 'create_task',
        task: {
          title: 'Deep Focus: Algorithm & System Crucible',
          date: tomorrowStr,
          startTime: '07:30',
          endTime: '09:30',
          priority: 'High',
          category: 'Study',
          description: '2-hour uninterrupted cognitive focus session generated by Astra AI.'
        }
      }
    };
  }

  // 4. Productivity Review
  if (lower.includes('productive') || lower.includes('progress') || lower.includes('how did i do') || lower.includes('analytics')) {
    const total = tasks.length;
    const rate = total > 0 ? ((completed.length / total) * 100).toFixed(1) : 0;
    return {
      text: `### 📊 Productivity Diagnostic Report\n\n- **Total Tasks Tracked:** ${total}\n- **Completed Tasks:** ${completed.length}\n- **Pending Tasks:** ${pending.length}\n- **Completion Rate:** **${rate}%**\n\n${rate >= 70 ? '🔥 **Outstanding Momentum!** You are operating in the top quartile of habit compliance.' : '💡 **Momentum Opportunity:** Reduce your task batch sizes into 45-minute sprints to eliminate friction.'}`
    };
  }

  // 5. Add / Create Task Request
  if (/\b(add|create|schedule|set|remind me to)\s+(a\s+)?(new\s+)?task\b/i.test(lower) || lower.includes('add task') || lower.includes('create task') || lower.includes('schedule task')) {
    // Attempt extracting title
    let title = 'Study Session';
    const matchQuotes = query.match(/["']([^"']+)["']/);
    if (matchQuotes) {
      title = matchQuotes[1];
    } else {
      let cleaned = query.replace(/(?:add|create|schedule|set|remind me to)\s+(?:a\s+)?(?:new\s+)?task\s+(?:to\s+|for\s+)?/i, '').trim();
      // Remove trailing time expressions like "tomorrow at 5 PM" from title if present
      cleaned = cleaned.replace(/(?:tomorrow|today)?\s*(?:at\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)?).*$/i, '').trim();
      if (cleaned.length > 2) title = cleaned.slice(0, 50);
    }

    let targetDate = new Date().toISOString().split('T')[0];
    if (lower.includes('tomorrow')) {
      const tom = new Date();
      tom.setDate(tom.getDate() + 1);
      targetDate = tom.toISOString().split('T')[0];
    }

    let startTime = '09:00';
    let endTime = '10:30';
    const timeMatch = query.match(/at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    if (timeMatch) {
      let hr = parseInt(timeMatch[1]);
      const min = timeMatch[2] ? timeMatch[2].padStart(2, '0') : '00';
      const ampm = (timeMatch[3] || '').toLowerCase();
      if (ampm === 'pm' && hr < 12) hr += 12;
      if (ampm === 'am' && hr === 12) hr = 0;
      startTime = `${String(hr).padStart(2, '0')}:${min}`;
      let endHr = (hr + 1) % 24;
      endTime = `${String(endHr).padStart(2, '0')}:${min}`;
    }

    return {
      text: `### 📝 Task Proposal Ready\n\nI have prepared a new task based on your prompt:\n\n- **Title:** "${title.charAt(0).toUpperCase() + title.slice(1)}"\n- **Priority:** High\n- **Category:** Study\n- **Date:** ${targetDate}\n- **Time:** ${startTime} - ${endTime}\n\nClick the confirmation button below to add it directly to your task manager:`,
      action: {
        type: 'create_task',
        task: {
          title: title.charAt(0).toUpperCase() + title.slice(1),
          date: targetDate,
          startTime: startTime,
          endTime: endTime,
          priority: 'High',
          category: 'Study',
          description: 'Created via Astra AI conversational assistant.'
        }
      }
    };
  }

  // Universal Fallback
  return {
    text: `### 💡 Astra Intelligence Engine\n\nRegarding: *"${query}"*\n\n1. **Core Recommendation:** Break this down into a verifiable deliverable with a strict deadline.\n2. **Execution Strategy:** Connect this work directly to your **ChronoSprint Tasks** or **31-Day Habit Matrix**.\n\nAsk me:\n- *"What tasks are pending today?"*\n- *"Create a 5-hour study timetable for tomorrow"*\n- *"Add a task to practice System Design at 4 PM"*\n- *"Which task should I complete first?"*`
  };
}
