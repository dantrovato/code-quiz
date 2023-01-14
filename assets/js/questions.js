// Move questionIdx += 1; out of choices.addEventListener and into showNextQuestion() as it was getting called twice.

const maxSeconds = 3;
let timer = maxSeconds - 1;
let questionIdx = 0;
const questions = [
  {
    question: "Who'd win in a fight between Javascript and Ruby?",
    answers: ["Javascript", "Ruby", "They'd draw", "It's a stupid question"],
    correctAnswer: "It's a stupid question",
  },
  {
    question: "How many fingers does Bart Simpson have?",
    answers: ["3", "10", "8", "16"],
    correctAnswer: "8",
  },
  {
    question: "Who's good at coming up with questions for this quiz?",
    answers: ["Dan", "Andrew", "Dane", "defo not Dan"],
    correctAnswer: "defo not Dan",
  },
];

// Timer starts and it stops when maxSeconds (at the top) is reached
function startTimer() {
  const timeSpan = document.querySelector("#time"); // type: span, the bit on top right the displays the count to the page

  const timerId = setInterval(() => {
    if (timer < 0) {
      clearInterval(timerId);
      return;
    }
    timeSpan.textContent = timer;
    timer -= 1;
  }, 1000);
}

// Hides the intro div with Start Quiz button and intro text
function hideStartButton() {
  const startScreen = document.querySelector("#start-screen"); // type: div, Coding Quiz Challenge container
  startScreen.setAttribute("hidden", true);
}

// Populates the 'choices' div with the choices for the current question
function fillInChoices(q, choices) {
  q.answers.forEach((answer) => {
    const p = document.createElement("p");
    const button = document.createElement("button");
    button.textContent = answer;
    p.appendChild(button);
    choices.appendChild(p);
  });
}

// After the user clicks on a new choice it clears the previous correct or wrong result display
function clearAnswerResultDisplay() {
  if (document.querySelector(".answer")) {
    document.querySelector(".answer").remove();
  }
}

// The next two functions are similar and while I could have extracted the logic to a single, flexible function I felt
// that would have needlessly complicated the code
function displayCorrect(choices) {
  clearAnswerResultDisplay();
  const answerResult = document.createElement("p");
  answerResult.classList.add("answer");
  answerResult.textContent = "Correct!";
  answerResult.classList.add("correct");
  choices.appendChild(answerResult);
}

// Same as above
function displayWrong(choices) {
  clearAnswerResultDisplay();
  const answerResult = document.createElement("p");
  answerResult.classList.add("answer");
  answerResult.textContent = "Wrong!";
  answerResult.classList.add("wrong");
  choices.appendChild(answerResult);
}

// Once user has clicked on an answer buttons for the same question are disabled
function disableButtons() {
  document
    .querySelectorAll("button")
    .forEach((button) => button.setAttribute("disabled", true));
}

function evaluateAnswer(q, event, choices) {
  if (q.correctAnswer === event.target.textContent) {
    displayCorrect(choices);
  } else {
    timer -= 10;
    displayWrong(choices);
  }
}

function allQuestionsAnswered(q) {
  // when we get to questionIdx being > questions.length we return to avoid error being thrown
  if (q === undefined) {
    return true;
  }
}

// After either all questions are answered or timer has run out...
function loadResults() {
  console.log("line 108");
}

function showNextQuestion() {
  const questionDiv = document.querySelector("#questions"); // type: div, below is the structur of this div:
  //                                                       <div id="questions" class="hide">
  //                                                         <h2 id="question-title"></h2>
  //                                                         <div id="choices" class="choices"></div>
  //                                                       </div>

  const title = document.querySelector("#question-title"); // type: h2
  const choices = document.querySelector("#choices"); // type: div

  // questionsDiv begins life with a class of hide. This must be removed
  questionDiv.classList.remove("hide");
  let q = questions[questionIdx];

  if (allQuestionsAnswered(q)) return;

  // insert question into title
  title.textContent = q.question;
  // clear previous choices if they exist
  choices.textContent = "";

  // insert answers into choices
  fillInChoices(q, choices);
  questionIdx += 1;

  choices.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") return;
    evaluateAnswer(q, event, choices);
    disableButtons();

    setTimeout(showNextQuestion, 1000);
  });
}

// Once the content has loaded this function runs all the main logic
document.addEventListener("DOMContentLoaded", (event) => {
  const start = document.querySelector("#start"); // type: button, value: Start Quiz, parent: div id="start-screen"

  start.addEventListener("click", (event) => {
    startTimer();
    hideStartButton();
    showNextQuestion();
    loadResults();
  });
});
