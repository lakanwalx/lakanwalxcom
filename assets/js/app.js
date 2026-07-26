(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem("lakanwalx-theme");
  const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
  root.classList.toggle("dark", saved ? saved === "dark" : prefersDark);

  const updateThemeLabel = () => {
    document.querySelectorAll("[data-theme]").forEach(button => {
      const dark = root.classList.contains("dark");
      button.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      button.textContent = dark ? "☀" : "☾";
    });
  };
  updateThemeLabel();
  document.querySelectorAll("[data-theme]").forEach(button => button.addEventListener("click", () => {
    root.classList.toggle("dark");
    localStorage.setItem("lakanwalx-theme", root.classList.contains("dark") ? "dark" : "light");
    updateThemeLabel();
  }));

  const menu = document.querySelector("[data-menu]");
  const menuButton = document.querySelector("[data-menu-button]");
  menuButton?.addEventListener("click", () => {
    const open = menu.classList.toggle("hidden") === false;
    menuButton.setAttribute("aria-expanded", String(open));
  });

  const progress = document.querySelector("[data-progress]");
  const backTop = document.querySelector("[data-top]");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    backTop?.classList.toggle("opacity-0", scrollY < 500);
    backTop?.classList.toggle("pointer-events-none", scrollY < 500);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

  document.querySelectorAll("[data-count]").forEach(element => {
    const target = Number(element.dataset.count);
    const counterObserver = new IntersectionObserver(([entry], obs) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const tick = now => {
        const value = Math.min(1, (now - start) / 1000);
        element.textContent = `${Math.floor(target * value)}+`;
        if (value < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.disconnect();
    });
    counterObserver.observe(element);
  });

  const words = ["digital systems.", "financial insight.", "meaningful progress."];
  const typed = document.querySelector("[data-typed]");
  if (typed && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let word = 0, char = 0, deleting = false;
    const type = () => {
      const current = words[word];
      char += deleting ? -1 : 1;
      typed.textContent = current.slice(0, char);
      if (!deleting && char === current.length) { deleting = true; return setTimeout(type, 1500); }
      if (deleting && char === 0) { deleting = false; word = (word + 1) % words.length; }
      setTimeout(type, deleting ? 45 : 75);
    };
    type();
  }

  const search = document.querySelector("[data-search]");
  search?.addEventListener("input", event => {
    const term = event.target.value.toLowerCase();
    document.querySelectorAll("[data-article]").forEach(card => {
      card.hidden = !card.textContent.toLowerCase().includes(term);
    });
  });

  document.querySelector("[data-year]")?.replaceChildren(String(new Date().getFullYear()));
  document.querySelector("[data-loader]")?.classList.add("opacity-0", "pointer-events-none");
})();
