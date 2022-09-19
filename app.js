const modalBg = document.querySelector(".modal-bg");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const video = document.querySelector("video");
const thumbnail = document.querySelector(".thumbnail");
const videoControls = document.getElementById("video-controls");

const playBackBtnContainer = document.querySelector("#play-btn");
const playbackBtns = document.querySelectorAll("#play-btn img");
const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");

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
