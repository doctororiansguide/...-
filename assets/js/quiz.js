// quiz.js - Simple MDCAT-style Quiz for Doctorians Guide

// Array of questions (you can add many more later)
const quizData = [
    {
        question: "Which organelle is known as the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
        correct: 1,  // index of correct option (0-based)
        explanation: "Mitochondria produce ATP through cellular respiration, hence called the powerhouse."
    },
    {
        question: "What is the atomic number of Carbon?",
        options: ["6", "8", "12", "14"],
        correct: 0,
        explanation: "Carbon has 6 protons, so its atomic number is 6."
    },
    {
        question: "The SI unit of force is:",
        options: ["Joule", "Watt", "Newton", "Pascal"],
        correct: 2,
        explanation: "Force is measured in Newtons (N)."
    },
    {
        question: "Choose the correct sentence:",
        options: [
            "He go to school everyday.",
            "He goes to school every day.",
            "He going to school every day.",
            "He gone to school everyday."
        ],
        correct: 1,
        explanation: "Correct form is third person singular present tense: goes + every day (two words)."
    },
    {
        question: "In humans, the normal pH of blood is approximately:",
        options: ["6.8–7.0", "7.35–7.45", "7.8–8.0", "5.5–6.5"],
        correct: 1,
        explanation: "Blood pH is slightly alkaline, maintained between 7.35 and 7.45."
    },
    {
        question: "Which gas is evolved when dilute HCl reacts with zinc?",
        options: ["Oxygen", "Hydrogen", "Carbon dioxide", "Nitrogen"],
        correct: 1,
        explanation: "Zn + 2HCl → ZnCl₂ + H₂ (hydrogen gas is released)."
    },
    {
        question: "The focal length of a plane mirror is:",
        options: ["Zero", "Infinity", "Positive", "Negative"],
        correct: 1,
        explanation: "Plane mirrors have infinite focal length (parallel rays never meet)."
    },
    {
        question: "Synonym of 'Vivid':",
        options: ["Dull", "Bright", "Vague", "Weak"],
        correct: 1,
        explanation: "Vivid means strikingly bright or intense."
    }
];

// Quiz state variables
let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(quizData.length).fill(null); // track selections

// DOM elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const resultEl = document.getElementById("result");
const quizEl = document.getElementById("quiz");

// Load current question
function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = `${currentQuestion + 1}. ${q.question}`;

    optionsEl.innerHTML = "";

    q.options.forEach((option, index) => {
        const div = document.createElement("div");
        div.className = "form-check mb-2";

        const input = document.createElement("input");
        input.className = "form-check-input";
        input.type = "radio";
        input.name = "answer";
        input.id = `opt${index}`;
        input.value = index;
        if (userAnswers[currentQuestion] === index) input.checked = true;

        const label = document.createElement("label");
        label.className = "form-check-label";
        label.htmlFor = `opt${index}`;
        label.textContent = option;

        div.appendChild(input);
        div.appendChild(label);
        optionsEl.appendChild(div);
    });

    // Show/hide buttons
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.style.display = currentQuestion === quizData.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = currentQuestion === quizData.length - 1 ? "inline-block" : "none";

    // Show feedback if already answered
    showFeedback();
}

// Show correct/incorrect feedback after answer
function showFeedback() {
    if (userAnswers[currentQuestion] === null) {
        optionsEl.querySelectorAll(".form-check-label").forEach(label => {
            label.classList.remove("text-success", "text-danger", "fw-bold");
        });
        return;
    }

    const selected = userAnswers[currentQuestion];
    const correct = quizData[currentQuestion].correct;

    optionsEl.querySelectorAll(".form-check").forEach((div, idx) => {
        const label = div.querySelector("label");
        label.classList.remove("text-success", "text-danger", "fw-bold");

        if (idx === correct) {
            label.classList.add("text-success", "fw-bold");
        }
        if (idx === selected && selected !== correct) {
            label.classList.add("text-danger");
        }
    });
}

// Get selected answer
function getSelected() {
    const selected = document.querySelector('input[name="answer"]:checked');
    return selected ? parseInt(selected.value) : null;
}

// Next question
nextBtn.addEventListener("click", () => {
    const selected = getSelected();
    if (selected === null) {
        alert("Please select an option!");
        return;
    }

    userAnswers[currentQuestion] = selected;
    if (selected === quizData[currentQuestion].correct) score++;

    currentQuestion++;
    loadQuestion();
});

// Previous question
prevBtn.addEventListener("click", () => {
    const selected = getSelected();
    if (selected !== null) {
        userAnswers[currentQuestion] = selected;
    }
    currentQuestion--;
    loadQuestion();
});

// Submit / Show result
submitBtn.addEventListener("click", () => {
    const selected = getSelected();
    if (selected === null) {
        alert("Please select an option!");
        return;
    }

    userAnswers[currentQuestion] = selected;
    if (selected === quizData[currentQuestion].correct) score++;

    // Hide quiz, show result
    quizEl.style.display = "none";
    resultEl.style.display = "block";

    const percentage = Math.round((score / quizData.length) * 100);
    resultEl.innerHTML = `
        <h3 class="text-center mb-4">Quiz Complete!</h3>
        <div class="alert alert-info text-center fs-4">
            Your Score: ${score} out of \( {quizData.length} ( \){percentage}%)
        </div>
        <p class="text-center">Keep practicing — you're doing great!</p>
        <div class="d-grid">
            <button class="btn btn-primary btn-lg" onclick="location.reload()">Restart Quiz</button>
        </div>
    `;
});

// Initialize
loadQuestion();
