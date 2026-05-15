// GLOBAL STATE
let progress = 0;
let xp = 0;
let breathingInterval = null;
let tasksXP = 0;
let tasksLevel = 1;



window.onload = () => {
  const nav = document.querySelector('.nav');
  nav.style.display = "none"; // hide nav on load
};

function showScreen(screenId, element) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  const nav = document.querySelector('.nav');

  if (screenId === 'start') {
    nav.style.display = "none";
  } else {
    nav.style.display = "flex";
  }

  if (element) {
document.querySelectorAll('.nav-item').forEach(navItem =>
  navItem.classList.remove('active-nav')
);
    element.classList.add('active-nav');
  }
}


//EXIT BUTTON
function exitApp() {
  alert("Thanks for visiting Checkpoint ☀️");
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

// ================= TASKS SCREEN PROGRESS =================

// ================= TASKS SCREEN PROGRESS =================



function completeTasksItem(btn) {

  if (btn.disabled) return;

  btn.innerText = "✔ Done";
  btn.style.background = "#A3D9A5";
  btn.disabled = true;

  // ADD XP
  tasksXP += 25;

  // UPDATE BAR
  document.getElementById("tasks-progress-fill").style.width =
    tasksXP + "%";

  // UPDATE TEXT
  document.getElementById("tasks-xp-text").innerText =
    `XP: ${tasksXP} / 100`;

  // FEEDBACK
  const feedback = document.getElementById("tasksFeedback");

  feedback.innerText = "Great job 🌿";

  // LEVEL UP
  if (tasksXP >= 100) {

    document.getElementById("levelPopup")
      .classList.add("active");

    tasksLevel++;

    document.getElementById("tasks-level-text")
      .innerText = `Level ${tasksLevel}`;

    setTimeout(() => {

      document.getElementById("levelPopup")
        .classList.remove("active");

      tasksXP = 0;

      document.getElementById("tasks-progress-fill")
        .style.width = "0%";

      document.getElementById("tasks-xp-text")
        .innerText = "XP: 0 / 100";

    }, 3000);
  }
}




// AFFIRMATIONS

const affirmations = [
  "You are doing your best ☀️",
  "Small steps matter 🌱",
  "Rest is productive 💛",
  "You’ve got this ✨",
  "You deserve kindness (especially from yourself) 🤍",
  "Progress is still progress, no matter how small 🌿",
  "It’s okay to take things slow ☀️",
  "You are enough exactly as you are 💫"
];


function newAffirmation() {
  const text = affirmations[Math.floor(Math.random() * affirmations.length)];

  // HOME SCREEN
  const homeText = document.getElementById("affirmation-text");
  if (homeText) {
    homeText.innerText = text;
  }

  // AFFIRMATIONS SCREEN (if present)
  const affirmScreenText = document.getElementById("affirmation-display");
  if (affirmScreenText) {
    affirmScreenText.innerText = text;
  }

  // OPTIONAL FEEDBACK
  const feedback = document.getElementById("affirmation-feedback");
  if (feedback) {
    feedback.innerText = "New affirmation ✨";
  }
}

// TASK SCREEN TABS
function switchTasksTab(button, tabId) {
  document.querySelectorAll('.tasks-tab').forEach(t => t.classList.remove('active'));
  button.classList.add('active');

  document.querySelectorAll('.tasks-group').forEach(g => g.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}







//CALLENDAR
let currentSelectedDay = null;

function selectDay(dayElement) {

  // remove old selected day
  document.querySelectorAll('.day').forEach(d =>
    d.classList.remove('selected')
  );

  dayElement.classList.add('selected');

  // save clicked day
  currentSelectedDay = dayElement;

  // show popup
  document.getElementById("dayPopup").classList.add("active");
}

function rateDay(rating) {

  const feedback = document.getElementById("day-feedback");

  // clear previous colour states
  currentSelectedDay.classList.remove(
    "low",
    "medium",
    "high"
  );

  if (rating === "1") {
    currentSelectedDay.classList.add("low");
    feedback.innerText = "You showed up — that’s enough 💛";
  }

  else if (rating === "2") {
    currentSelectedDay.classList.add("medium");
    feedback.innerText = "Nice effort today 🌿";
  }

  else if (rating === "3") {
    currentSelectedDay.classList.add("high");
    feedback.innerText = "Amazing job today ✨";
  }

  // hide popup
  document.getElementById("dayPopup")
    .classList.remove("active");
}



function rateDay(rating) {

  const feedback = document.getElementById("day-feedback");

  // remove old states
  currentSelectedDay.classList.remove(
    "low",
    "medium",
    "high"
  );

  if (rating === "1") {
    currentSelectedDay.classList.add("low");
    feedback.innerText = "You showed up — that’s enough 💛";
  }

  else if (rating === "2") {
    currentSelectedDay.classList.add("medium");
    feedback.innerText = "Nice effort today 🌿";
  }

  else if (rating === "3") {
    currentSelectedDay.classList.add("high");
    feedback.innerText = "Amazing job today ✨";
  }

  // MARK DAY AS COMPLETE
  currentSelectedDay.classList.add("completed");

  // hide rating popup
  document.getElementById("dayPopup")
    .classList.remove("active");

  // CHECK IF ENTIRE WEEK COMPLETE
  const completedDays =
    document.querySelectorAll('.day.completed');

  if (completedDays.length === 7) {

    // show reward popup
    document.getElementById("weekPopup")
      .classList.add("active");

    // hide after 3 seconds
    setTimeout(() => {

      document.getElementById("weekPopup")
        .classList.remove("active");

      // RESET WEEK
      document.querySelectorAll('.day').forEach(day => {

        day.classList.remove(
          "completed",
          "low",
          "medium",
          "high",
          "selected"
        );

      });

      feedback.innerText = "A fresh new week ☀️";

    }, 3000);
  }
}

function closeDayPopup() {

  document.getElementById("dayPopup")
    .classList.remove("active");

}


function favouriteTask(btn) {
  const taskText = btn.parentElement.parentElement.querySelector("p").innerText;
  const list = document.getElementById("favouritesList");

  if (list.querySelector('.empty')) {
    list.innerHTML = "";
  }

  const newFav = document.createElement("p");
  newFav.innerText = "⭐ " + taskText;

  list.appendChild(newFav);

  btn.innerText = "💖";
}



// SAVE AFFIRMATION
function saveAffirmation() {
  const text = document.getElementById("affirmation-display").innerText;
  const list = document.getElementById("savedList");
  const feedback = document.getElementById("affirmation-feedback");

  // Remove "empty" message
  if (list.querySelector('.empty')) {
    list.innerHTML = "";
  }

  const item = document.createElement("p");
  item.innerText = "✨ " + text;

  list.appendChild(item);

  feedback.innerText = "Saved 💛";
}

function addGoal() {

  const input = document.getElementById("goalInput");
  const date = document.getElementById("goalDate");
  const list = document.getElementById("goalsList");

  if (input.value.trim() === "") return;

  // remove empty message
  if (list.querySelector('.empty')) {
    list.innerHTML = "";
  }

  // CREATE GOAL CONTAINER
  const goalItem = document.createElement("div");
  goalItem.classList.add("goal-item");

  // GOAL TEXT
  const goalText = document.createElement("p");

  if (date.value) {
    goalText.innerText =
      `🌿 ${input.value} (by ${date.value})`;
  } else {
    goalText.innerText =
      `🌿 ${input.value}`;
  }

  // CHECK BUTTON
  const checkBtn = document.createElement("button");

  checkBtn.innerText = "✔";
  checkBtn.classList.add("goal-check-btn");

  // COMPLETE GOAL
  checkBtn.onclick = () => {

    goalText.style.textDecoration = "line-through";
    goalText.style.opacity = "0.6";

    checkBtn.innerText = "✓ Done";
    checkBtn.disabled = true;

    goalItem.classList.add("completed-goal");
  };

  // ADD TO ROW
// BUTTON CONTAINER
const actions = document.createElement("div");
actions.classList.add("goal-actions");

// DELETE BUTTON
const deleteBtn = document.createElement("button");

deleteBtn.innerText = "🗑";
deleteBtn.classList.add("goal-delete-btn");

deleteBtn.onclick = () => {
  goalItem.remove();

  // restore empty text if all removed
  if (list.children.length === 0) {
    list.innerHTML = `<p class="empty">Nothing here yet</p>`;
  }
};

// ADD BUTTONS
actions.appendChild(checkBtn);
actions.appendChild(deleteBtn);

// ADD TO GOAL
goalItem.appendChild(goalText);
goalItem.appendChild(actions);

  // ADD TO LIST
  list.appendChild(goalItem);

  // CLEAR INPUTS
  input.value = "";
  date.value = "";
}

function addGratitude() {
  const input = document.getElementById("gratitudeInput");
  const list = document.getElementById("gratitudeList");

  if (input.value.trim() === "") return;

  // remove empty message
  if (list.querySelector('.empty')) {
    list.innerHTML = "";
  }

  const item = document.createElement("p");
  item.innerText = "🌸 " + input.value;

  list.appendChild(item);

  input.value = "";
}

const gratitudePrompts = [
  "Something small that made you smile today...",
  "A person you're grateful for...",
  "A moment you enjoyed recently...",
  "Something you often take for granted..."
];

function setGratitudePlaceholder() {
  const input = document.getElementById("gratitudeInput");
  input.placeholder = gratitudePrompts[Math.floor(Math.random() * gratitudePrompts.length)];
}

window.onload = () => {
  document.querySelector('.nav').style.display = "none";
  setGratitudePlaceholder();
};






document.addEventListener("DOMContentLoaded", () => {

  // GLOBALS
  let breathingInterval;
  let timerInterval;
  let audio = new Audio();
  let restCount = 0;

window.startBreathingSession = function() {

  const soli = document.getElementById("soli-breathing");
  const text = document.getElementById("breathing-text");
  const timerDisplay = document.getElementById("timer-display");

  if (!soli || !text || !timerDisplay) return;

  let inhale = true;
  let time = 60;

  clearInterval(breathingInterval);
  clearInterval(timerInterval);

  // BREATH FUNCTION
  function updateBreathing() {

    if (inhale) {

      soli.src = "assets/images/breatheout.png";
      soli.style.transform = "scale(0.9)";
      text.innerText = "Breathe in... 🌿";

    } else {

      soli.src = "assets/images/breathein.png";
      soli.style.transform = "scale(1.1)";
      text.innerText = "Breathe out... 🌙";

    }

    inhale = !inhale;
  }

  // RUN IMMEDIATELY
  updateBreathing();

  // THEN LOOP
  breathingInterval = setInterval(updateBreathing, 4000);

  // TIMER
  timerInterval = setInterval(() => {

    let mins = Math.floor(time / 60);
    let secs = time % 60;

    timerDisplay.innerText =
      (mins < 10 ? "0" : "") + mins + ":" +
      (secs < 10 ? "0" : "") + secs;

    time--;

    if (time < 0) {

      clearInterval(breathingInterval);
      clearInterval(timerInterval);

      // RESET SOLI
      soli.src = "assets/images/mascot.png";
      soli.style.transform = "scale(1)";

      text.innerText = "Soli is proud of you 💛";

      restCount++;
      document.getElementById("rest-count").innerText = restCount;
    }

  }, 1000);

};
  window.playMusic = function() {
    const selected = document.getElementById("music-select").value;
    audio.src = selected;
    audio.loop = true;
    audio.play().catch(() => {});
  };

  window.stopMusic = function() {
    audio.pause();
    audio.currentTime = 0;
  };

});