const maxSeconds = 3;
const questions = [
  {
    question: "Who'd win in a fight between Javascript and Ruby?",
    answers: ["Javascript", "Ruby", "They'd draw", "It's a stupid question"],
    correctAnswer: "It's a stupid question",
  },
  {
    question: "Who came up with the best questions for this quiz?",
    answers: ["Dan", "Andrew", "Dane", "Just not Dan"],
    correctAnswer: "Just not Dan",
  },
];

// Timer starts and it stops when maxSeconds (at the top) is reached
function startTimer() {
  let timer = 1;
  const timerId = setInterval(() => {
    if (timer > maxSeconds) {
      clearInterval(timerId);
      return;
    }
    console.log(timer);
    timer += 1;
  }, 1000);
}

// Hides the intro div with Start Quiz button and intro text
function hideStartButton() {
  const startScreen = document.querySelector("#start-screen"); // type: div, Coding Quiz Challenge container
  startScreen.setAttribute("hidden", true);
}

function showQuestion() {
  //                                                       <div id="questions" class="hide">
  //                                                         <h2 id="question-title"></h2>
  //                                                         <div id="choices" class="choices"></div>
  //                                                       </div>
  // questionsDiv begins life with a class of hide. This must be removed
  const questionDiv = document.querySelector("#questions"); // type: div
  const title = document.querySelector("#question-title"); // type: h2
  const choices = document.querySelector("#choices"); // type: div
  questionDiv.classList.remove("hide");
  questions.forEach((q) => {
    title.textContent = "fava";
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  const start = document.querySelector("#start"); // type: button, value: Start Quiz, parent: div id="start-screen"

  start.addEventListener("click", (event) => {
    startTimer();
    hideStartButton();
    showQuestion();
  });
});
