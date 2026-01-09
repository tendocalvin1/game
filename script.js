// ==============================
// QUIZ STATE
// ==============================
let currentQuestion = 1;
const totalQuestions = 5;
let selectedAnswer = null;
let score = 0;

// ==============================
// DOM ELEMENTS
// ==============================
const main = document.querySelector(".question-container");
const nextBtn = document.querySelector(".next-btn");

// ==============================
// UPDATE PROGRESS
// ==============================
function updateProgress() {
  const spans = main.querySelectorAll("span");
  spans[0].textContent = currentQuestion;
  spans[1].textContent = totalQuestions;
}

// ==============================
// HANDLE ANSWER SELECTION
// ==============================
function handleAnswerClick(event) {
  if (event.target.tagName !== "LI") return;

  document.querySelectorAll("ul li").forEach(li => {
    li.classList.remove("selected");
  });

  event.target.classList.add("selected");
  selectedAnswer = event.target;

  document.querySelector(".selected-answer").textContent =
    `You selected: ${event.target.textContent}`;
}

// ==============================
// SHOW FINAL RESULTS
// ==============================
function showResults() {
  main.innerHTML = `
    <h2>Quiz Completed 🎉</h2>
    <p>Your Score:</p>
    <h3>${score} / ${totalQuestions}</h3>
    <button class="restart-btn">Restart Quiz</button>
  `;

  document.querySelector(".restart-btn").addEventListener("click", () => {
    location.reload();
  });
}

// ==============================
// LOAD NEXT QUESTION
// ==============================
function loadNextQuestion() {
  // Check correctness
  if (selectedAnswer.dataset.correct === "true") {
    score++;
  }

  if (currentQuestion === totalQuestions) {
    showResults();
    return;
  }

  currentQuestion++;

  const template = document.querySelector(`#question-${currentQuestion}`);
  const clone = template.content.cloneNode(true);

  main.querySelector("p:not(.selected-answer)").remove();
  main.querySelector("ul").remove();

  main.insertBefore(clone, document.querySelector(".selected-answer"));

  selectedAnswer = null;
  document.querySelector(".selected-answer").textContent = "";

  updateProgress();
  main.querySelector("ul").addEventListener("click", handleAnswerClick);
}

// ==============================
// EVENT LISTENERS
// ==============================
main.querySelector("ul").addEventListener("click", handleAnswerClick);

nextBtn.addEventListener("click", () => {
  if (!selectedAnswer) {
    alert("Please select an answer.");
    return;
  }
  loadNextQuestion();
});

updateProgress();
