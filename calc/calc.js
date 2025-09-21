//Breathing 
const circle = document.querySelector('.progressCircle');
const circleTimeDisplay = document.getElementById('circleTime');
const breathText = document.getElementById('breathText');
const startBtn = document.getElementById('breathStart');
const stopBtn = document.getElementById('breathStop');
const resetBtn = document.getElementById('breathReset');

const circumference = 2 * Math.PI * 90;
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

let circleInterval;
let running = false;
let step = 0;

const phases = [
  { name: 'INHALE', duration: 2, color: '#ff9800' },
  { name: 'HOLD', duration: 2, color: '#f32121' },
  { name: 'EXHALE', duration: 2, color: '#4caf50' },
];

let phaseStartTime;

function updateCircle(elapsed, total) {
  const offset = circumference - (elapsed / total) * circumference;
  circle.style.strokeDashoffset = offset;
}

function updateCircleDisplay(elapsed, total, text) {
  const remaining = Math.ceil(total - elapsed);
  circleTimeDisplay.textContent = `${remaining < 10 ? '0'+remaining : remaining}s`;
  breathText.textContent = text;
}

function tick() {
  const now = Date.now();
  const elapsed = (now - phaseStartTime) / 1000;
  const currentPhase = phases[step];

  if (elapsed >= currentPhase.duration) {
    step++;
    if (step >= phases.length) {
      // one breathing cycle
      incrementBreathSessions();
      clearInterval(circleInterval);
      running = false;
      circle.style.strokeDashoffset = circumference;
      circleTimeDisplay.textContent = '00:00';
      breathText.textContent = 'GREAT!';
      circle.style.stroke = phases[0].color;
      return;
    }
    phaseStartTime = Date.now();
    return;
  }

  updateCircle(elapsed, currentPhase.duration);
  updateCircleDisplay(elapsed, currentPhase.duration, currentPhase.name);
  circle.style.stroke = currentPhase.color;
}

startBtn.onclick = () => {
  if (!running) {
    step = 0;
    phaseStartTime = Date.now();
    circle.style.strokeDashoffset = circumference;
    circle.style.stroke = phases[0].color;
    running = true;
    circleInterval = setInterval(tick, 50);
  }
};

stopBtn.onclick = () => {
  clearInterval(circleInterval);
  running = false;
};

resetBtn.onclick = () => {
  clearInterval(circleInterval);
  running = false;
  step = 0;
  circle.style.strokeDashoffset = circumference;
  circle.style.stroke = phases[0].color;
  circleTimeDisplay.textContent = '00:00';
  breathText.textContent = 'GREAT!';
};

//Music Player
const audio = document.getElementById('audio');
const nowPlaying = document.getElementById('cmusic');


const tracks = [
  { name: 'FOREST AMBIENT', file: 'forest.mp3' },
  { name: 'PIANO AMBIENT', file: 'piano.mp3' },
  { name: 'STUDY AMBIENT', file: 'study.mp3' }
];


let currentTrack = 0;

function loadTrack(index) {
  audio.src = tracks[index].file;
  nowPlaying.textContent = `Now Playing: ${tracks[index].name}`;
}

document.getElementById('play').onclick = () => audio.play();
document.getElementById('stop').onclick = () => {
  audio.pause();
  audio.currentTime = 0;
};
document.getElementById('prev').onclick = () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  audio.play();
};
document.getElementById('next').onclick = () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  audio.play();
};


loadTrack(currentTrack);
const progressBar = document.getElementById('progressBar');
const volumeBar = document.getElementById('volumeBar');

// music bar
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
  }
});


progressBar.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  }
});

// Volume 
volumeBar.addEventListener('input', () => {
  audio.volume = volumeBar.value;
});


// Timer 
let timer;
let time = 300; 
const timeDisplay = document.getElementById('timeDisplay');

// Inputs 
const hrsInput = document.getElementById('hinput');
const minInput = document.getElementById('minput');

function updateTimerDisplay() {
  const h = Math.floor(time / 3600).toString().padStart(2, '0');
  const m = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
  const s = (time % 60).toString().padStart(2, '0');
  timeDisplay.textContent = `${h}:${m}:${s}`;
}

// Start Button
document.getElementById('start').onclick = () => {
  clearInterval(timer);

  let hrs = parseInt(hrsInput.value) || 0;
  let mins = parseInt(minInput.value) || 0;
  time = hrs * 3600 + mins * 60 || time;

  updateTimerDisplay();

  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      incrementTimerSessions();
      alert('Session completed!');
      time = 1800; 
      updateTimerDisplay();
    }
  }, 1000);
};

// Pause Button
document.getElementById('pause').onclick = () => clearInterval(timer);

// Reset Button
document.getElementById('reset').onclick = () => {
  clearInterval(timer);
  time = 1800;
  updateTimerDisplay();
};


updateTimerDisplay();

// Tracking 
document.getElementById('breathSessions').textContent =
  localStorage.getItem('breathSessions') || '0';
document.getElementById('timerSessions').textContent =
  localStorage.getItem('timerSessions') || '0';

function incrementBreathSessions() {
  let count = parseInt(localStorage.getItem('breathSessions') || '0');
  count++;
  localStorage.setItem('breathSessions', count);
  document.getElementById('breathSessions').textContent = count;
}

function incrementTimerSessions() {
  let count = parseInt(localStorage.getItem('timerSessions') || '0');
  count++;
  localStorage.setItem('timerSessions', count);
  document.getElementById('timerSessions').textContent = count;
}
