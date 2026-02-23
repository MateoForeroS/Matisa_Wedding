// =========================
// FILE: assets/js/app.js
// Música de fondo con MP3
// =========================

const audio = document.getElementById("bgAudio");
const btn = document.getElementById("musicBtn");

let isPlaying = false;

function setButtonState(pressed) {
  if (!btn) return;
  btn.setAttribute("aria-pressed", String(pressed));
  btn.textContent = pressed ? "Pausar música" : "Activar música";
}

async function playAudio() {
  if (!audio) return;

  try {
    audio.volume = 0.6;      // volumen inicial
    await audio.play();      // en móvil requiere interacción del usuario
    isPlaying = true;
    setButtonState(true);
  } catch (err) {
    // Si el navegador bloquea autoplay, se activará al primer toque
    isPlaying = false;
    setButtonState(false);
  }
}

function pauseAudio() {
  if (!audio) return;
  audio.pause();
  isPlaying = false;
  setButtonState(false);
}

async function toggleAudio() {
  if (!audio) return;

  if (!isPlaying) {
    await playAudio();
  } else {
    pauseAudio();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setButtonState(false);

  if (btn) btn.addEventListener("click", toggleAudio);

  // Mejor UX móvil: primer toque en cualquier parte intenta iniciar la música
  const oneTime = async () => {
    if (!isPlaying) await playAudio();
  };

  window.addEventListener("pointerdown", oneTime, { once: true });

  // Opcional: intenta precargar un poco
  if (audio) {
    audio.load();
  }
});
