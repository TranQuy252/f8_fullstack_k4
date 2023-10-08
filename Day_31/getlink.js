let countdown = 10;
let isTabActive = true;
const fameDuration = 1000;

function clickToGetLink() {
  window.location.href = "https://fullstack.edu.vn/";
}

function startCountdown() {
  const countdownDisplay = document.querySelector("#getlink-display");
  const getLinkButton = document.querySelector(".get-link-button");

  let lastFrameTime = performance.now();

  function updateCountdown(currentTime) {
    if (isTabActive) {
      const elapsed = currentTime - lastFrameTime;
      if (elapsed >= fameDuration) {
        lastFrameTime = currentTime;
        if (countdown > 0) {
          countdown--;
          countdownDisplay.textContent = `${countdown}`;
        } else {
          countdownDisplay.textContent = `0`;
          getLinkButton.removeAttribute("disabled");
        }
      }
      requestAnimationFrame(updateCountdown);
    }
  }
  updateCountdown(lastFrameTime);
}

const getLinkButton2 = document.getElementById("get-link-button");
let isGetLinkClicked = false;

getLinkButton2.addEventListener("click", () => {
  if (!isGetLinkClicked) {
    isGetLinkClicked = true;
    clickToGetLink();
  } else {
    getLinkButton2.classList.add("disable-cursor");
  }
});

startCountdown();