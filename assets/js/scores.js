// Final step in the quiz
function diplayHighScores() {
  // make sorted array of key value pairs
  const scores = [];
  for (const name in localStorage) {
    if (Object.hasOwnProperty.call(localStorage, name)) {
      const score = localStorage[name];
      scores.push([name, Number(score)]);
    }
  }

  const ol = document.querySelector("#highscores");

  scores.forEach((score) => {
    const li = document.createElement("li");
    li.textContent = score;

    ol.appendChild(li);
    console.log(ol);
  });
}

function addClearHighScoresListener() {
  const clearScores = document.querySelector("#clear");
  clearScores.addEventListener("click", () => {
    localStorage.clear();
    document.querySelectorAll("li").forEach((li) => li.remove());
  });
}

document.addEventListener("DOMContentLoaded", () => {
  diplayHighScores();
  addClearHighScoresListener();
});
