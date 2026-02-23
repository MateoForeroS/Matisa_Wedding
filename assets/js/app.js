// =========================
// FILE: assets/js/app.js
// Música de fondo con MP3
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bgAudio");
  const btn = document.getElementById("musicBtn");

  if (!audio || !btn) {
    console.warn("No se encontró #bgAudio o #musicBtn");
    return;
  }

  let isPlaying = false;

  function setButtonState(pressed) {
    btn.setAttribute("aria-pressed", String(pressed));
    btn.textContent = pressed ? "Pausar" : "Play";
  }

  async function playAudio() {
    try {
      audio.volume = 0.65;
      await audio.play();
      isPlaying = true;
      setButtonState(true);
    } catch (err) {
      // Autoplay suele bloquearse si no hubo interacción
      console.warn("Bloqueado por el navegador, toca/clic para iniciar.", err);
      isPlaying = false;
      setButtonState(false);
    }
  }

  function pauseAudio() {
    audio.pause();
    isPlaying = false;
    setButtonState(false);
  }

  btn.addEventListener("click", async () => {
    if (!isPlaying) await playAudio();
    else pauseAudio();
  });

  // UX móvil: primer toque en cualquier parte intenta iniciar
  const oneTime = async () => {
    if (!isPlaying) await playAudio();
    window.removeEventListener("pointerdown", oneTime);
  };
  window.addEventListener("pointerdown", oneTime, { passive: true });

  // Pre-carga
  audio.load();
  setButtonState(false);
});
