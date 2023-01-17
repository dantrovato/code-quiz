// Format highscores
// avoid duplication

function formatScore(score) {
  return score[0] + " - " + score[1];
}

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
  const sortedScores = scores.sort((a, b) => {
    return b[1] - a[1];
  });

  sortedScores.forEach((score) => {
    const li = document.createElement("li");
    li.textContent = formatScore(score);

    ol.appendChild(li);
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
