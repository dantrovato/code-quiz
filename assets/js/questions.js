const maxSeconds = 30;
let timer = maxSeconds - 1;
let questionIdx = 0;
let currentQuestion;
let gameOver = false;
const form = document.querySelector("form");
let timerId;
const choices = document.querySelector("#choices"); // type: div
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
    question: "What if you cut one of them off?",
    answers: ["7", "Depends who kept the cut off finger"],
    correctAnswer: "Depends who kept the cut off finger",
  },

  {
    question: "Who's good at coming up with questions for this quiz?",
    answers: ["Dan", "Not Dan"],
    correctAnswer: "Not Dan",
  },
];

// Hides questions div and shows results
function showScore() {
  document.querySelector("#questions").classList.add("hide");
  document.querySelector("#end-screen").classList.remove("hide");
  timer = timer >= 0 ? timer : 0;
  document.querySelector("#time").textContent = timer;
  document.querySelector("#final-score").textContent = timer;
}

// Timer starts and it stops when maxSeconds (at the top) is reached
function startTimer() {
  const timeSpan = document.querySelector("#time"); // type: span, the bit on top right the displays the count to the page

  timerId = setInterval(() => {
    if (timer < 0) {
      clearInterval(timerId);
      gameOver = true;
      showScore();
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
    button.classList.add("answer");
    button.textContent = answer;
    p.appendChild(button);
    choices.appendChild(p);
  });
}

// Removed this function as it caused a bug where it took the 1st answer out of the dom after the user had clicked on a choice.
// The code seems to work fine without it. Below is the description of the original intention of the function
// After the user clicks on a new choice it clears the previous correct or wrong result display
// function clearAnswerResultDisplay() {
//   if (document.querySelector(".answer")) {
//     document.querySelector(".answer").remove();
//   }
// }

// The next two functions are similar and while I could have extracted the logic to a single, flexible function I felt
// that would have needlessly complicated the code
function displayCorrect(choices) {
  const answerResult = document.createElement("p");
  answerResult.classList.add("answer");
  answerResult.textContent = "Correct!";
  answerResult.classList.add("correct");
  choices.appendChild(answerResult);
  // clearAnswerResultDisplay();
}

// Same as above
function displayWrong(choices) {
  const answerResult = document.createElement("p");
  answerResult.classList.add("answer");
  answerResult.textContent = "Wrong!";
  answerResult.classList.add("wrong");
  choices.appendChild(answerResult);
  // clearAnswerResultDisplay();
}

// Once user has clicked on an answer buttons for the same question are disabled
function disableButtons() {
  document
    .querySelectorAll(".answer")
    .forEach((button) => button.setAttribute("disabled", true));
}

function allQuestionsAnswered(currentQuestion) {
  // when we get to questionIdx being > questions.length we return to avoid error being thrown
  if (currentQuestion === undefined) {
    clearInterval(timerId);
    showScore();
    return true;
  }
}

function evaluateAnswer(currentQuestion, event, choices) {
  if (currentQuestion.correctAnswer === event.target.textContent) {
    displayCorrect(choices);
  } else {
    timer -= 10;
    // If the answer is wrong the next two lines set the timer to current timer if it's > 0 and set it to 0 if it's < 0
    const timeSpan = document.querySelector("#time"); // type: span, the bit on top right the displays the count to the page
    timeSpan.textContent = timer > 0 ? timer : 0;

    displayWrong(choices);
  }

  questionIdx += 1;
}

function showNextQuestion() {
  if (gameOver) return;

  const questionDiv = document.querySelector("#questions"); // type: div, below is the structur of this div:
  //                                                       <div id="questions" class="hide">
  //                                                         <h2 id="question-title"></h2>
  //                                                         <div id="choices" class="choices"></div>
  //                                                       </div>

  const title = document.querySelector("#question-title"); // type: h2

  // questionsDiv begins life with a class of hide. This must be removed
  questionDiv.classList.remove("hide");

  currentQuestion = questions[questionIdx];

  if (allQuestionsAnswered(currentQuestion)) {
    // timer = 0;
    return;
  }

  // insert question into title
  title.textContent = currentQuestion.question;
  // clear previous choices if they exist
  choices.textContent = "";

  // insert answers into choices
  fillInChoices(currentQuestion, choices);
}

// Takes the final results and username and stores it in local storage
function persistData() {
  const initials = document.querySelector("#initials").value;
  if (Object.keys(localStorage).includes(initials)) {
    alert("Initials already exist");
    return;
  }

  localStorage.setItem(initials, timer);
}

// When quiz is over we persist the data in localStorage, then create a custom event and trigger the link to the high score page
form.addEventListener("submit", (event) => {
  event.preventDefault();
  persistData();
  const highScores = document.querySelector('a[href="highscores.html"]');

  const evt = new MouseEvent("click");
  highScores.dispatchEvent(evt);
  // diplayHighScores(event);
});

choices.addEventListener("click", (event) => {
  currentQuestion = questions[questionIdx];
  if (event.target.tagName !== "BUTTON") return;

  evaluateAnswer(currentQuestion, event, choices);
  disableButtons();
  setTimeout(showNextQuestion, 1000);
});

// Once the content has loaded this function runs all the main logic
document.addEventListener("DOMContentLoaded", (event) => {
  const start = document.querySelector("#start"); // type: button, value: Start Quiz, parent: div id="start-screen"

  start.addEventListener("click", (event) => {
    startTimer();
    hideStartButton();
    showNextQuestion();

    const intervalId = setInterval(() => {
      if (timer < 0) {
        clearInterval(intervalId);
      }
    }, 100);
  });
});
