// Final step in the quiz
function diplayHighScores() {
  event.preventDefault();
  const li = document.createElement("li");
  const ol = document.querySelector("ol");
  li.textContent = localStorage.getItem("safdz");
  ol.appendChild(li);
  console.log(localStorage.getItem("safdz")); ////////////////////////////////////////////////////////////////////////////
  // retrieve the high scores from local storage and put them in an array
  // sort array by the highest score
  // loop over array and at each iteration create a li element and appent onto ol element

  // create eventListener for clear highscores
}

function addClearHighScoresListener() {
  const clearScores = document.querySelector("#clear");
  clearScores.addEventListener("click", () => localStorage.clear());
}

document.addEventListener("DOMContentLoaded", () => {
  diplayHighScores();
  addClearHighScoresListener();
});
