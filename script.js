(() => {
  const audio = document.querySelector("#site-audio");
  const control = document.querySelector("#music-toggle");
  const label = document.querySelector("#music-label");
  if (!audio || !control || !label) return;

  const updateControl = () => {
    const playing = !audio.paused;
    const text = playing ? "Pause background music" : "Play background music";
    label.textContent = text;
    control.setAttribute("aria-label", text);
    control.setAttribute("aria-pressed", String(playing));
    control.classList.toggle("is-playing", playing);
  };

  audio.volume = 0.18;
  audio.addEventListener("play", updateControl);
  audio.addEventListener("pause", updateControl);
  control.addEventListener("click", async () => {
    if (audio.paused) {
      try { await audio.play(); } catch { updateControl(); }
    } else {
      audio.pause();
    }
  });

  document.addEventListener("click", event => {
    const link = event.target instanceof Element ? event.target.closest(".recording-link") : null;
    if (link && !audio.paused) audio.pause();
  });
  updateControl();
})();
