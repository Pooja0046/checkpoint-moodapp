// GLOBAL STATE
let progress = 0;
let xp = 0;
let breathingInterval = null;

// SCREEN SWITCH
function showScreen(screenId, element) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  // NAV ACTIVE
  if (element) {
    document.querySelectorAll('.nav span').forEach(nav => nav.classList.remove('active-nav'));
    element.classList.add('active-nav');
  }

  // HIDE NAV ON START
  const nav = document.getElementById("nav");
  nav.style.display = (screenId === "start") ? "none" : "flex";
}

// MOOD SELECT
function selectMood(btn) {
  document.querySelectorAll('.home-mood-buttons button')
    .forEach(b => b.style.background = "#ffffff80");

  btn.style.background = "#F9C968";
}

// HOME TASK COMPLETE
function completeTask(btn) {
  if (btn.innerText === "✔") return;

  btn.innerText = "✔";
  btn.style.background = "#A3D9A5";

  // UPDATE XP + PROGRESS
  xp += 20;
  progress += 20;

  document.getElementById("progress-fill").style.width = progress + "%";
  document.getElementById("xp-text").innerText = `XP: ${xp} / 100`;

  // SOLI REACTION
  const soli = document.getElementById("soli");
  const message = document.getElementById("soli-message");

  soli.classList.add("soli-happy");
  message.innerText = "Soli is proud of you 🥺☀️";

  setTimeout(() => {
    soli.classList.remove("soli-happy");
    message.innerText = "Let’s take it slow today ☀️";
  }, 2000);

  // LEVEL UP
  if (xp >= 100) {
    message.innerText = "LEVEL UP!! 🌟";
    xp = 0;
    progress = 0;

    document.getElementById("progress-fill").style.width = "0%";
    document.getElementById("xp-text").innerText = "XP: 0 / 100";
  }
}

// AFFIRMATIONS
const affirmations = [
  "You are doing your best ☀️",
  "Small steps matter 🌱",
  "Rest is productive 💛",
  "You’ve got this ✨"
];

function newAffirmation() {
  const text = affirmations[Math.floor(Math.random() * affirmations.length)];

  document.getElementById("affirmation-text").innerText = text;

  const alt = document.getElementById("affirmation-display");
  if (alt) alt.innerText = text;
}

// TASK SCREEN TABS
function switchTasksTab(button, tabId) {
  document.querySelectorAll('.tasks-tab').forEach(t => t.classList.remove('active'));
  button.classList.add('active');

  document.querySelectorAll('.tasks-group').forEach(g => g.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

// TASK COMPLETE (TASK SCREEN)
function completeTasksItem(btn) {
  if (btn.innerText.includes("✔")) return;

  btn.innerText = "✔ Done";
  btn.style.background = "#A3D9A5";
}

// BREATHING EXERCISE
function startBreathing() {
  const text = document.getElementById("breathing-text");

  if (breathingInterval) {
    clearInterval(breathingInterval);
  }

  let state = "inhale";

  breathingInterval = setInterval(() => {
    if (state === "inhale") {
      text.innerText = "Breathe in... 🌿";
      state = "hold";
    } else if (state === "hold") {
      text.innerText = "Hold... ☀️";
      state = "exhale";
    } else {
      text.innerText = "Breathe out... 🌙";
      state = "inhale";
    }
  }, 3000);
}