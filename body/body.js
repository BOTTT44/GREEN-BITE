const workouts = {
  arms: {
    none: [
      { name: "Push-ups", steps: ["Start in plank position", "Lower chest to floor", "Push back up to start"] },
      { name: "Tricep Dips", steps: ["Sit on edge of chair", "Lower body by bending elbows", "Push back up"] },
      { name: "Plank Shoulder Taps", steps: ["Hold plank", "Tap right hand to left shoulder", "Switch sides"] }
    ],
    dumbbells: [
      { name: "Bicep Curls", steps: ["Stand straight holding dumbbells", "Curl weights upward", "Lower slowly"] },
      { name: "Overhead Press", steps: ["Hold dumbbells at shoulders", "Press overhead", "Lower back to shoulders"] },
      { name: "Lateral Raises", steps: ["Hold dumbbells at sides", "Raise arms to shoulder height", "Lower slowly"] }
    ]
  },
  legs: {
    none: [
      { name: "Squats", steps: ["Stand with feet shoulder-width apart", "Lower hips back and down", "Stand back up"] },
      { name: "Lunges", steps: ["Step forward with one leg", "Lower until knees at 90°", "Push back to start"] },
      { name: "Calf Raises", steps: ["Stand straight", "Lift heels off floor", "Lower slowly"] }
    ],
    barbell: [
      { name: "Barbell Squats", steps: ["Rack barbell on shoulders", "Lower into squat", "Push back up"] },
      { name: "Romanian Deadlift", steps: ["Hold barbell at thighs", "Hinge hips back", "Return to standing"] },
      { name: "Barbell Lunges", steps: ["Step forward holding barbell on shoulders", "Lower down", "Return"] }
    ]
  },
  abs: {
    none: [
      { name: "Crunches", steps: ["Lie on your back", "Lift shoulders toward knees", "Lower slowly"] },
      { name: "Leg Raises", steps: ["Lie flat", "Lift legs upward", "Lower without touching floor"] },
      { name: "Plank", steps: ["Hold plank position", "Keep core tight", "Maintain straight line"] }
    ],
    abwheel: [
      { name: "Ab Wheel Rollout", steps: ["Kneel on floor", "Roll wheel forward", "Pull back to start"] },
      { name: "Knee Rollouts", steps: ["Start on knees", "Roll wheel forward", "Return to start"] },
      { name: "Standing Rollouts", steps: ["Stand with wheel on floor", "Roll forward", "Return to start"] }
    ]
  }
};


// Elements
const bodypart = document.getElementById("bodypart");
const equipment = document.getElementById("equipment");
const generateBtn = document.getElementById("generate");
const planDiv = document.getElementById("plan");
const exerciseName = document.getElementById("exerciseName");
const timeDisplay = document.getElementById("timeDisplay");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const beep = document.getElementById("beep");


let time = 30;
let running = false;
let timer = null;
// Reset equipment dropdown
function resetEquipment() {
  equipment.innerHTML = '<option value="">-- Select --</option>';
  equipment.disabled = true;
}

// unlock equipment based on body part
bodypart.onchange = () => {
  resetEquipment();

  const bp = bodypart.value;
  if (!bp) return;

  const eqOptions = Object.keys(workouts[bp]); 

  eqOptions.forEach(eq => {
    const opt = document.createElement("option");
    opt.value = eq;
    opt.textContent = eq.charAt(0).toUpperCase() + eq.slice(1);
    equipment.appendChild(opt);
  });

  equipment.disabled = false;
};


resetEquipment();


// Generate workout plan
generateBtn.onclick = () => {
  const bp = bodypart.value;
  const eq = equipment.value;

  if (!bp || !eq) {
  planDiv.textContent = "";
  const workoutImg = document.getElementById("stepimg");
  workoutImg.src = "./img/error.png"; 

  const stepsDiv = document.getElementById("steps");
  stepsDiv.innerHTML = "<p>Please select both BODY part and EQUIPMENT.</p>";
  return;
}


  if (!workouts[bp] || !workouts[bp][eq]) {
    planDiv.textContent = "No workouts found for that selection.";
    document.getElementById("steps").innerHTML = "";
    return;
  }

  const list = workouts[bp][eq];
  const randomExercise = list[Math.floor(Math.random() * list.length)];

  // Show exercise name
  planDiv.textContent = `Your workout: ${randomExercise.name} (30s)`;
  exerciseName.textContent = randomExercise.name;
  time = 30;
  updateTimerDisplay();

  // Set image
const workoutImg = document.getElementById("stepimg");

if (eq === "dumbbells") {
  workoutImg.src = "../body/img/dumbbell.jpg";
} else if (eq === "barbell") {
  workoutImg.src = "../body/img/barbell.jpg";
} else if (eq === "abwheel") {
  workoutImg.src = "../body/img/abwheel.jpg";
} else {
  workoutImg.src = "../body/img/place.jpg"; 
}


  // Show steps
  const stepsDiv = document.getElementById("steps");
  stepsDiv.innerHTML = "<h3>Steps:</h3><ol>" + 
    randomExercise.steps.map(step => `<li>${step}</li>`).join("") + 
    "</ol>";
};


// Timer 
function updateTimerDisplay() {
  const m = String(Math.floor(time / 60)).padStart(2, "0");
  const s = String(time % 60).padStart(2, "0");
  timeDisplay.textContent = `${m}:${s}`;
}

startBtn.onclick = () => {
  if (running || !exerciseName.textContent || exerciseName.textContent === "No exercise yet") return;
  running = true;
  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      running = false;
      beep.play();
      alert("Exercise complete!");
    }
  }, 1000);
};

pauseBtn.onclick = () => {
  clearInterval(timer);
  running = false;
};

resetBtn.onclick = () => {
  clearInterval(timer);
  running = false;
  time = 30;
  updateTimerDisplay();
};

updateTimerDisplay();

