// GLOBAL STATE
let progress = 0;
let xp = 0;
let breathingInterval = null;



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
    document.querySelectorAll('.nav span').forEach(navItem =>
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

// TASK COMPLETE (TASK SCREEN)
let tasksCompleted = 0;

function completeTasksItem(btn) {
  btn.innerText = "✔ Done";
  btn.style.background = "#A3D9A5";
  btn.disabled = true;

  tasksCompleted++;

  // Update progress
  const progress = document.getElementById("tasksProgress");
  const totalTasks = document.querySelectorAll('.tasks-card').length;
  const percent = (tasksCompleted / totalTasks) * 100;
  progress.style.width = percent + "%";

  // Soli feedback
  const feedback = document.getElementById("tasksFeedback");

  if (tasksCompleted === 1) {
    feedback.innerText = "Nice start 🥺";
  } else if (tasksCompleted === totalTasks) {
    feedback.innerText = "You're smashing it ☀️";
  } else {
    feedback.innerText = "Keep going 🌿";
  }
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




function selectDay(dayElement) {
  // remove previous selection highlight
  document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
  dayElement.classList.add('selected');

  const rating = prompt("How helpful was today?\n1 = 😴 Low\n2 = 🙂 Okay\n3 = 🌟 Great");

  const feedback = document.getElementById("day-feedback");

  if (rating === "1") {
    dayElement.classList.add("low");
    feedback.innerText = "You showed up — that’s enough 💛";
  } 
  else if (rating === "2") {
    dayElement.classList.add("medium");
    feedback.innerText = "Nice effort today 🌿";
  } 
  else if (rating === "3") {
    dayElement.classList.add("high");
    feedback.innerText = "Amazing job today ✨";
  } 
  else {
    feedback.innerText = "No rating selected 🙂";
  }
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

  const goalItem = document.createElement("p");

  if (date.value) {
    goalItem.innerText = `🌿 ${input.value} (by ${date.value})`;
  } else {
    goalItem.innerText = `🌿 ${input.value}`;
  }

  list.appendChild(goalItem);

  // clear inputs
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

    if (!soli || !text || !timerDisplay) return; // prevents crashes

    let inhale = true;
    let time = 60;

    clearInterval(breathingInterval);
    clearInterval(timerInterval);

    breathingInterval = setInterval(() => {
      if (inhale) {
        soli.src = "assets/images/solibreathingin.png";
        soli.style.transform = "scale(0.9)";
        text.innerText = "Breathe out...";
      } else {
        soli.src = "assets/images/solibreathingout.png";
        soli.style.transform = "scale(1.2)";
        text.innerText = "Breathe in...";
      }
      inhale = !inhale;
    }, 4000);

    soli.style.transform = "scale(1)";
soli.src = "assets/images/solibreathingin.png";

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