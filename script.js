(() => {
  const content = window.SITE_CONTENT || {};
  const timeline = document.querySelector("#timeline-items");
  if (timeline) {
    (content.timeline || []).forEach((item, index) => {
      const node = document.createElement("article");
      node.className = "timeline-item";
      node.innerHTML = `<span class="timeline-date"></span><h3></h3><p></p>`;
      node.querySelector(".timeline-date").textContent = item.date;
      node.querySelector("h3").textContent = item.title;
      node.querySelector("p").textContent = item.detail;
      node.dataset.position = String(index + 1);
      timeline.append(node);
    });
  }
  const email = (content.email || "").trim();
  const contactLink = document.querySelector("#contact-link");
  if (contactLink && email) {
    contactLink.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Enquiry for Murat Ferhat Yegül")}`;
    contactLink.removeAttribute("aria-disabled");
    document.querySelector("#contact-note").textContent = email;
  } else if (contactLink) {
    contactLink.addEventListener("click", event => event.preventDefault());
    contactLink.setAttribute("aria-disabled", "true");
  }
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealItems = document.querySelectorAll(".section, .painting-panel");
    document.body.classList.add("motion-ready");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealItems.forEach(item => observer.observe(item));
  }
  const audio = document.querySelector("#site-audio");
  const musicToggle = document.querySelector("#music-toggle");
  const musicLabel = document.querySelector("#music-label");
  const updateMusicControl = () => {
    const playing = !audio.paused;
    const needsSound = audio.muted;
    musicToggle.setAttribute("aria-pressed", String(playing && !needsSound));
    musicToggle.setAttribute("aria-label", playing ? (needsSound ? "Enable background music" : "Pause background music") : "Play background music");
    musicLabel.textContent = playing ? (needsSound ? "Enable background music" : "Pause background music") : "Play background music";
    musicToggle.classList.toggle("is-playing", playing);
  };
  audio.volume = 0.18;
  audio.addEventListener("play", updateMusicControl);
  audio.addEventListener("pause", updateMusicControl);
  audio.addEventListener("volumechange", updateMusicControl);
  audio.addEventListener("error", () => { musicLabel.textContent = "Music file unavailable"; });
  const enableSound = async () => {
    if (!audio.muted) return;
    audio.muted = false;
    try {
      if (audio.paused) await audio.play();
      updateMusicControl();
    } catch {
      audio.muted = true;
      musicLabel.textContent = "Tap to enable music";
    }
  };
  const enableOnFirstInteraction = event => {
    if (!event.isTrusted) return;
    if (musicToggle.contains(event.target)) return;
    enableSound();
    window.removeEventListener("pointerdown", enableOnFirstInteraction, true);
    window.removeEventListener("keydown", enableOnFirstInteraction, true);
  };
  window.addEventListener("pointerdown", enableOnFirstInteraction, true);
  window.addEventListener("keydown", enableOnFirstInteraction, true);
  musicToggle.addEventListener("click", async () => {
    if (audio.muted) {
      await enableSound();
    } else if (audio.paused) {
      try { await audio.play(); } catch { musicLabel.textContent = "Tap to enable music"; }
    } else {
      audio.pause();
    }
  });
  // Muted autoplay is permitted by most browsers; the first visitor gesture enables audible playback.
  audio.play().catch(() => { musicLabel.textContent = "Tap to start music"; });
})();
