var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector("span");

var progressBarWidth = progressBar.clientWidth;

var isDrag = false;
var initialClientX = 0;
var current = 0;
var currentWidth = 0;
var handleChange = function (width) {
  var value = (width * 100) / progressBarWidth;
  if (value < 0) {
    value = 0;
  }
  if (value > 100) {
    value = 100;
  }
  progress.style.width = `${value}%`;
  currentWidth = width;
};

progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    handleChange(e.offsetX);
    isDrag = true;
    initialClientX = e.clientX;
    current = e.offsetX;
  }
});

progressBar.addEventListener("mousemove", function (e) {
  var mouseX = e.clientX - this.getBoundingClientRect().left;
  var percent = (mouseX / this.clientWidth) * 100;
  var time = (percent * audio.duration) / 100;
  currentTimeEl.innerText = getTime(time);
});

progressSpan.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  isDrag = true;
  initialClientX = e.clientX;
});

document.addEventListener("mouseup", function () {
  isDrag = false;
  current = currentWidth;

  audio.currentTime = (currentWidth * audio.duration) / progressBarWidth;
});

document.addEventListener("mousemove", function (e) {
  if (isDrag) {
    var moveWidth = e.clientX - initialClientX;
    handleChange(current + moveWidth);
  }
});

// Xây dựng player trình phát nhạc

var audio = new Audio("./mp3/nhac.mp3");

var playBtn = document.querySelector(".play-btn");
var currentTimeEl = progressBar.previousElementSibling;
var durationEl = progressBar.nextElementSibling;

var getTime = function (seconds) {
  //Tính số phút
  var mins = Math.floor(seconds / 60);

  // Tính số giây còn lại
  seconds = Math.floor(seconds - mins * 60);
  return `${mins < 10 ? "0" + mins : mins}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

audio.addEventListener("loadeddata", function () {
  durationEl.innerHTML = getTime(audio.duration);
});

var pauseIcon = `<i class="fa-solid fa-pause"></i>`;
var playIcon = `<i class="fa-solid fa-play"></i>`;
playBtn.addEventListener("click", function () {
  console.log(audio.paused);
  if (audio.paused) {
    audio.play();
    this.innerHTML = pauseIcon;
  } else {
    audio.pause();
    this.innerHTML = playIcon;
  }
});

audio.addEventListener("timeupdate", function () {
  //   console.log(audio.currentTime);
  currentTimeEl.innerText = getTime(audio.currentTime);

  progressBar.setAttribute("data-time", getTime(audio.currentTime));

  var value = (audio.currentTime * 100) / audio.duration;
  progress.style.width = `${value}%`;
});

currentTimeEl.addEventListener("mouseover", function () {
  this.innerText = getTime(audio.currentTime);
});

currentTimeEl.addEventListener("mouseout", function () {
  this.innerText = getTime(audio.currentTime);
});

audio.addEventListener("ended", function () {
  audio.currentTime = 0;
  currentTimeEl.innerText = "00:00";
  progress.style.width = "0%";
  playBtn.innerHTML = playIcon;
});