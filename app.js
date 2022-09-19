const modalBg = document.querySelector(".modal-bg");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const video = document.querySelector("video");
const thumbnail = document.querySelector(".thumbnail");
const videoControls = document.getElementById("video-controls");

const playBackBtnContainer = document.querySelector("#play-btn");
const playbackBtns = document.querySelectorAll("#play-btn img");
const playBtn = document.querySelector(".play");
const playBackIcons = document.querySelectorAll(".playback-animation img");

const pipBtn = document.querySelector(".pip-btn");
const fullScreenBtn = document.querySelector(".fullscreen-btn");
const fullScreenIcons = document.querySelectorAll(".fullscreen-btn img");
const videoContainer = document.querySelector(".video-container");

const seek = document.querySelector(".seek");
const seekTooltip = document.querySelector(".seek-tooltip");

const progressBar = document.querySelector("#progress-bar");
const duration = document.getElementById("duration");

// volume controls
const volumeButton = document.getElementById("volume-button");
const volumeIcons = document.querySelectorAll(".volume-button use");
const volumeMute = document.querySelector(".volume-mute");
const volumeLow = document.querySelector(".volume-low");
const volumeHigh = document.querySelector(".volume-up");
const volume = document.getElementById("volume");

const playbackAnimation = document.getElementById("playback-animation");
const timeElapsed = document.getElementById("time-elapsed");

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
  setInterval(openModal, 75);
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

function initializeVideo() {
  const videoDuration = Math.round(video.duration);
  seek.setAttribute("max", videoDuration);
  progressBar.setAttribute("max", videoDuration);
  const time = formatTime(videoDuration);
  duration.innerText = `${time.minutes}:${time.seconds}`;
  duration.setAttribute("datetime", `${time.minutes}m ${time.seconds}`);
}

video.addEventListener("loadedmetadata", initializeVideo);

function updateTimeElapsed() {
  const time = formatTime(Math.round(video.currentTime));
  timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
  timeElapsed.setAttribute("datetime", `${time.minutes}m ${time.seconds}s`);
}
video.addEventListener("timeupdate", updateTimeElapsed);

function updateProgress() {
  seek.value = Math.floor(video.currentTime);
  progressBar.value = Math.floor(video.currentTime);
}
video.addEventListener("timeupdate", updateProgress);

function updateSeekTooltip(e) {
  const skipTo = Math.round(
    (e.offsetX / e.target.clientWidth) *
      parseInt(e.target.getAttribute("max"), 10)
  );
  seek.setAttribute("data-seek", skipTo);
  const t = formatTime(skipTo);
  seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
  const rect = video.getBoundingClientRect();
  seekTooltip.style.left = `${e.pageX - rect.left}px`;
}

seek.addEventListener("mousemove", updateSeekTooltip);

function skipAhead(e) {
  const skipTo = e.target.dataset.seek ? e.target.dataset.seek : e.target.value;
  video.currentTime = skipTo;
  progressBar.value = skipTo;
  seek.value = skipTo;
}
seek.addEventListener("input", skipAhead);

function updateVolume() {
  if (video.muted) {
    video.muted = false;
  }

  video.volume = volume.value;
}

volume.addEventListener("input", updateVolume);

function updateVolumeIcon() {
  volumeIcons.forEach((icon) => {
    icon.classList.add("hidden");
  });

  volumeButton.setAttribute("data-title", "Mute (m)");

  if (video.muted || video.volume === 0) {
    volumeMute.classList.remove("hide");
    volumeHigh.classList.add("hide");
    volumeLow.classList.add("hide");
    volumeButton.setAttribute("data-title", "Unmute (m)");
  } else if (video.volume > 0 && video.volume <= 0.5) {
    volumeLow.classList.remove("hide");
    volumeMute.classList.add("hide");
    volumeHigh.classList.add("hide");
  } else {
    volumeHigh.classList.remove("hide");
    volumeLow.classList.add("hide");
    volumeMute.classList.add("hide");
  }
}

video.addEventListener("volumechange", updateVolumeIcon);

function animatePlayback() {
  playBackIcons.forEach((icon) => icon.classList.toggle("hide"));
  playbackAnimation.animate(
    [
      {
        opacity: 1,
        transform: "scale(1)",
      },
      {
        opacity: 0,
        transform: "scale(1.3)",
      },
    ],
    {
      duration: 500,
    }
  );
}

video.addEventListener("click", animatePlayback);
