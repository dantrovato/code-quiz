const maxSeconds = 3;

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

document.addEventListener("DOMContentLoaded", (event) => {
  const start = document.querySelector("#start"); // type: button, value: Start Quiz, parent: div id="start-screen"
  start.addEventListener("click", (event) => {
    startTimer();
  });
});
