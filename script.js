// Configuration
const WORK_TIME = 25 * 60; // 25 minutes in seconds

// State
let timeLeft = WORK_TIME;
let timerId = null;
let isRunning = false;

// DOM Elements
const timeDisplay = document.getElementById("time-display");
const statusText = document.getElementById("status-text");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

// Formatting 00:00
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

// Update UI
function updateDisplay() {
  timeDisplay.textContent = formatTime(timeLeft);
  document.title = `${formatTime(timeLeft)} - FocusFlow`;
}

// Timer Logic
function startTimer() {
  if (isRunning) return;

  isRunning = true;
  statusText.textContent = "Focusing...";
  statusText.style.color = "var(--success)";

  startBtn.disabled = true;
  startBtn.style.display = "none";
  pauseBtn.disabled = false;
  pauseBtn.style.display = "inline-flex";

  timerId = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft === 0) {
      clearInterval(timerId);
      isRunning = false;
      statusText.textContent = "Session Complete!";
      startBtn.disabled = false;
      startBtn.style.display = "inline-flex";
      pauseBtn.style.display = "none";
      // Optional: Sound alert could go here
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;

  clearInterval(timerId);
  isRunning = false;
  statusText.textContent = "Paused";
  statusText.style.color = "var(--text-secondary)";

  startBtn.disabled = false;
  startBtn.style.display = "inline-flex";
  startBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
          <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
        </svg> Resume`;

  pauseBtn.disabled = true;
  pauseBtn.style.display = "none";
}

function resetTimer() {
  clearInterval(timerId);
  isRunning = false;
  timeLeft = WORK_TIME;

  statusText.textContent = "Ready to focus?";
  statusText.style.color = "var(--text-secondary)";

  startBtn.disabled = false;
  startBtn.style.display = "inline-flex";
  startBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
          <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
        </svg> Start`;

  pauseBtn.disabled = true;
  pauseBtn.style.display = "none";

  updateDisplay();
}

// Event Listeners
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Initial call
updateDisplay();
