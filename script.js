// ==========================
// VARIABLES GLOBALES
// ==========================
const startQuizBtn = document.getElementById("startQuizBtn");
const quizSection = document.getElementById("quizSection");
const quizForm = document.getElementById("quizForm");
const resultSection = document.getElementById("resultSection");
const concentrationResult = document.getElementById("concentrationResult");
const memoryResult = document.getElementById("memoryResult");
const startTimerBtn = document.getElementById("startTimerBtn");
const timerSection = document.getElementById("timerSection");
const timeDisplay = document.getElementById("timeDisplay");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

let timer;
let timeLeft = 1500; // 25 minutes par défaut

// ==========================
// AFFICHAGE DU QUIZ
// ==========================
startQuizBtn.addEventListener("click", () => {
    quizSection.classList.remove("hidden");
    startQuizBtn.style.display = "none";
});

// ==========================
// TRAITEMENT DU QUIZ
// ==========================
quizForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const q1 = parseInt(document.querySelector("input[name='q1']:checked")?.value);
    const q2 = parseInt(document.querySelector("input[name='q2']:checked")?.value);

    if (!q1 || !q2) {
        alert("Veuillez répondre à toutes les questions.");
        return;
    }

    // Scores
    let concentration = q1;
    let memory = q2;

    // Analyse concentration
    let concentrationLevel = "";
    if (concentration === 1) {
        concentrationLevel = "Faible";
        timeLeft = 15 * 60;
    } else if (concentration === 2) {
        concentrationLevel = "Moyenne";
        timeLeft = 25 * 60;
    } else {
        concentrationLevel = "Élevée";
        timeLeft = 45 * 60;
    }

    // Analyse mémorisation
    let memoryLevel = "";
    if (memory === 1) memoryLevel = "Faible";
    else if (memory === 2) memoryLevel = "Moyenne";
    else memoryLevel = "Élevée";

    // Affichage résultats
    concentrationResult.textContent = `🧠 Concentration : ${concentrationLevel}`;
    memoryResult.textContent = `📘 Mémorisation : ${memoryLevel}`;

    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");

    updateDisplay();
});

// ==========================
// AFFICHAGE TIMER
// ==========================
startTimerBtn.addEventListener("click", () => {
    resultSection.classList.add("hidden");
    timerSection.classList.remove("hidden");
});

// ==========================
// TIMER FUNCTIONS
// ==========================
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

startBtn.addEventListener("click", () => {
    if (timer) return;

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            timer = null;
            alert("Session terminée 🎉 Prends une pause !");
        }
    }, 1000);
});

pauseBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
});

resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    updateDisplay();
});


// ==========================
// REDIRECTION VERS FEEDBACK
// ==========================
const feedbackBtn = document.getElementById("feedbackBtn");

if (feedbackBtn) {
    feedbackBtn.addEventListener("click", () => {
        window.location.href = "feedback.html";
    });
}
// ==========================
// AUTHENTIFICATION
// ==========================
const authBtn = document.getElementById("authBtn");

if (authBtn) {
    authBtn.addEventListener("click", () => {
        window.location.href = "Leubo.html";
    });
}
if (!isAuthenticated) {
    window.location.href = "Leubo.html";
}

// Exemple après connexion réussie
window.location.href = "dashboard.html";
