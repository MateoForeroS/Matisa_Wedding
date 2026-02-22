/* global YT */
let player = null;
let isReady = false;
let isPlayingAudio = false;

const VIDEO_ID = "62WV4tFEh0Q";

function setButtonState(pressed) {
  const btn = document.getElementById("musicBtn");
  if (!btn) return;
  btn.setAttribute("aria-pressed", String(pressed));
  btn.textContent = pressed ? "Pausar música" : "Activar música";
}

window.onYouTubeIframeAPIReady = function () {
  player = new YT.Player("ytPlayer", {
    videoId: VIDEO_ID,
    playerVars: {
      autoplay: 1,
      mute: 1,          // inicia en mute para que el autoplay no sea bloqueado
      controls: 0,
      playsinline: 1,
      loop: 1,
      playlist: VIDEO_ID, // necesario para loop
      modestbranding: 1,
      rel: 0
    },
    events: {
      onReady: () => {
        isReady = true;
        // intenta arrancar en mute (permitido)
        try {
          player.playVideo();
        } catch (e) {}
      }
    }
  });
};

function toggleMusic() {
  if (!isReady || !player) return;

  if (!isPlayingAudio) {
    // usuario interactuó: ahora sí se puede activar audio
    try {
      player.unMute();
      player.setVolume(60);
      player.playVideo();
      isPlayingAudio = true;
      setButtonState(true);
    } catch (e) {}
    return;
  }

  // si ya está sonando, pausamos
  try {
    player.pauseVideo();
    isPlayingAudio = false;
    setButtonState(false);
  } catch (e) {}
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("musicBtn");
  if (btn) btn.addEventListener("click", toggleMusic);

  // UX: primer clic en cualquier parte también activa música (opcional)
  const oneTime = () => {
    if (!isPlayingAudio) toggleMusic();
    window.removeEventListener("pointerdown", oneTime);
  };
  window.addEventListener("pointerdown", oneTime, { once: true });

  setButtonState(false);
});
