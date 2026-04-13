// SCREEN SWITCH
function showScreen(screenId, element) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  document.querySelectorAll('.nav span').forEach(nav => nav.classList.remove('active-nav'));
  element.classList.add('active-nav');
}

// MOOD SELECT
function selectMood(btn) {
  document.querySelectorAll('.moods button').forEach(b => b.style.background = "#ffffff80");
  btn.style.background = "#F9C968";
}

// COMPLETE TASK
function completeTask(btn) {
  btn.innerText = "✔";
  btn.style.background = "#A3D9A5";
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

// TASK TABS
function switchTab(button, tabId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  button.classList.add('active');

  document.querySelectorAll('.task-group').forEach(g => g.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}