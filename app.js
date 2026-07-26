(() => {
  const root = document.documentElement;
  if (!document.querySelector("[data-top]")) {
    const button = document.createElement("button");
    button.dataset.top = "";
    button.className = "pointer-events-none fixed bottom-5 right-5 z-40 grid size-11 place-items-center rounded-full bg-white text-ink opacity-0 shadow-xl transition-all hover:-translate-y-1";
    button.setAttribute("aria-label", "Back to top");
    button.textContent = "↑";
    button.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
    document.body.append(button);
  }
  if (!document.querySelector("[data-cursor-glow]")) {
    const glow = document.createElement("div");
    glow.dataset.cursorGlow = "";
    glow.className = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.prepend(glow);
  }

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
  menu?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    menu.classList.add("hidden");
    menuButton?.setAttribute("aria-expanded", "false");
  }));
  addEventListener("keydown", event => {
    if (event.key === "Escape" && menu && !menu.classList.contains("hidden")) {
      menu.classList.add("hidden");
      menuButton?.setAttribute("aria-expanded", "false");
      menuButton?.focus();
    }
  });

  const backTop = document.querySelector("[data-top]");
  const onScroll = () => {
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

  const cursorGlow = document.querySelector("[data-cursor-glow]");
  if (cursorGlow && matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addEventListener("pointermove", event => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
      cursorGlow.classList.add("is-active");
    }, { passive: true });
    document.documentElement.addEventListener("mouseleave", () => cursorGlow.classList.remove("is-active"));
  }

  document.querySelectorAll("[data-year]").forEach(element => element.replaceChildren(String(new Date().getFullYear())));
  requestAnimationFrame(() => document.querySelector("[data-loader]")?.classList.add("opacity-0", "pointer-events-none"));
})();
