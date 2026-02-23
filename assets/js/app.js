// =========================
// FILE: assets/js/app.js
// Música de fondo con MP3 (robusto)
// =========================

(() => {
  console.log("[MP3] app.js cargó OK");

  function $(sel) { return document.querySelector(sel); }

  const audio = $("#bgAudio");
  const btn = $("#musicBtn");

  if (!audio) {
    console.error("[MP3] No existe <audio id='bgAudio'> en el DOM");
    return;
  }
  if (!btn) {
    console.error("[MP3] No existe el botón #musicBtn");
    return;
  }

  let isPlaying = false;

  function setBtn(playing) {
    isPlaying = playing;
    btn.setAttribute("aria-pressed", String(playing));
    btn.textContent = playing ? "Pausar" : "Play";
  }

  async function tryPlay(from) {
    console.log(`[MP3] Intentando reproducir desde: ${from}`);
    try {
      audio.volume = 0.65;
      const p = audio.play();
      // En algunos navegadores play() retorna undefined
      if (p && typeof p.then === "function") await p;
      setBtn(true);
      console.log("[MP3] Reproduciendo ✅");
    } catch (err) {
      setBtn(false);
      console.warn("[MP3] Bloqueado por el navegador o no hay buffer.", err);
      // Si el archivo no carga, lo verás abajo en 'error'
    }
  }

  function pause() {
    audio.pause();
    setBtn(false);
    console.log("[MP3] Pausado ⏸️");
  }

  btn.addEventListener("click", async () => {
    if (!isPlaying) await tryPlay("click boton");
    else pause();
  });

  // Debug de carga del archivo
  audio.addEventListener("error", () => {
    const code = audio.error?.code;
    console.error("[MP3] Error cargando audio. code=", code);
    console.error("[MP3] Revisa que exista: assets/audio/cancion.mp3 (mismo nombre y minúsculas).");
  });

  audio.addEventListener("canplay", () => {
    console.log("[MP3] canplay ✅ (hay datos para reproducir)");
  });

  // UX móvil: primer toque en la página intenta iniciar (opcional)
  window.addEventListener("pointerdown", () => {
    if (!isPlaying) tryPlay("primer toque pagina");
  }, { once: true });

  // Estado inicial
  setBtn(false);
})();
