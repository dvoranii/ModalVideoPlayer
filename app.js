const modalBg = document.querySelector(".modal-bg");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const video = document.querySelector("video");
const thumbnail = document.querySelector(".thumbnail");
const videoControls = document.getElementById("video-controls");

const playBackBtnContainer = document.querySelector("#play-btn");
const playbackBtns = document.querySelectorAll("#play-btn img");
const playBtn = document.querySelector(".play");
// const pauseBtn = document.querySelector(".pause");

const pipBtn = document.querySelector(".pip-btn");
// const fullscreenOpen = document.querySelector(".fullscreen");
// const fullscreenExitBtn = document.querySelector(".fullscreen-exit");
const fullScreenBtn = document.querySelector(".fullscreen-btn");
const fullScreenIcons = document.querySelectorAll(".fullscreen-btn img");
const videoContainer = document.querySelector(".video-container");

const videoWorks = !!document.createElement("video").canPlayType;
if (videoWorks) {
  video.controls = false;
  videoControls.classList.remove("hidden");
}

function openModal() {
  modal.classList.remove("hide");
}

thumbnail.addEventListener("click", function (e) {
  e.preventDefault();
  modalBg.classList.remove("hide");
  setInterval(openModal, 50);
  video.play();
  console.log(video.currentTime);
});

function closeModal() {
  modalBg.classList.add("hide");
  modal.classList.add("hide");
  video.currentTime = 0;
}

close.addEventListener("click", closeModal);

function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
}

video.addEventListener("click", togglePlay);

function updatePlayBtn() {
  playbackBtns.forEach((btn) => btn.classList.toggle("hide"));
}

video.addEventListener("click", updatePlayBtn);
playBackBtnContainer.addEventListener("click", function () {
  updatePlayBtn();
  togglePlay();
});

function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (document.webkitFullscreenElement) {
    // Need this to support Safari
    document.webkitExitFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    // Need this to support Safari
    videoContainer.webkitRequestFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
}

function updateFullScreenBtn() {
  fullScreenIcons.forEach((icon) => icon.classList.toggle("hide"));
  if (document.fullscreenElement) {
    fullScreenBtn.setAttribute("data-title", "Exit full screen (f)");
  } else {
    fullScreenBtn.setAttribute("data-title", "Full screen (f)");
  }
}

fullScreenBtn.addEventListener("click", function () {
  toggleFullScreen();
  updateFullScreenBtn();
});

// look into refactoring this
function formatTime(seconds) {
  const result = new Date(seconds * 1000).toISOString().substr(11, 8);

  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
}
