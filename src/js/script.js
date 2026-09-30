const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const splitCandidates = (value) =>
  (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const testImage = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(src);
    image.onerror = reject;
    image.src = src;
  });

async function resolveImageSource(image) {
  const candidates = splitCandidates(image.dataset.srcs);
  const fallback = image.dataset.fallback;

  for (const candidate of candidates) {
    try {
      const src = await testImage(candidate);
      image.src = src;
      return;
    } catch {
      continue;
    }
  }

  if (fallback) {
    image.src = fallback;
  }
}

function setupVideos() {
  document.querySelectorAll("video[data-video]").forEach((video) => {
    const sources = splitCandidates(video.dataset.videoSources);
    if (!sources.length) return;

    let index = 0;

    const applySource = () => {
      video.src = sources[index];
      video.load();
    };

    video.addEventListener("error", () => {
      index += 1;
      if (index < sources.length) {
        applySource();
      }
    });

    video.addEventListener(
      "loadeddata",
      () => {
        video.dataset.ready = "true";
        if (video.classList.contains("hero__video") && !prefersReducedMotion.matches) {
          video.play().catch(() => {});
        }
      },
      { once: true },
    );

    applySource();
  });

  const processVideo = document.querySelector(".process-media video");
  if (!processVideo || prefersReducedMotion.matches) return;

  const mediaObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        processVideo.play().catch(() => {});
      } else {
        processVideo.pause();
      }
    },
    { threshold: 0.35 },
  );

  mediaObserver.observe(processVideo);
}

function setupReveal() {
  const revealItems = document.querySelectorAll(".reveal");

  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.16,
    },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
    revealObserver.observe(item);
  });
}

function setupHeaderAndNavigation() {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const navLinks = [...document.querySelectorAll(".site-nav a")];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (menuToggle && nav && header) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
      header.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("is-menu-open", !isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        header.classList.remove("is-open");
        document.body.classList.remove("is-menu-open");
      });
    });
  }

  const hero = document.querySelector("#hero");
  if (header && hero && "IntersectionObserver" in window) {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        header.classList.toggle("is-scrolled", !entry.isIntersecting);
      },
      {
        rootMargin: "-72px 0px 0px 0px",
        threshold: 0.04,
      },
    );
    headerObserver.observe(hero);
  }

  if (!sections.length || !("IntersectionObserver" in window)) return;

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${entry.target.id}`,
          );
        });
      });
    },
    {
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0.01,
    },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

function setupBuildSequence() {
  const section = document.querySelector("[data-build-sequence]");
  if (!section) return;

  const pin = section.querySelector("[data-build-pin]");
  const video = section.querySelector("[data-build-video]");
  const cards = [...section.querySelectorAll("[data-build-card]")];

  if (!pin || !video || !cards.length) return;

  const setStaticState = () => {
    section.classList.add("is-static");
    cards.forEach((card) => {
      card.style.visibility = "visible";
      card.style.opacity = "1";
      card.style.transform = "none";
    });
  };

  if (prefersReducedMotion.matches || !window.gsap || !window.ScrollTrigger) {
    setStaticState();
    return;
  }

  const gsapInstance = window.gsap;
  const ScrollTriggerInstance = window.ScrollTrigger;
  gsapInstance.registerPlugin(ScrollTriggerInstance);

  let initialized = false;
  let timeline;
  let trigger;

  const getDuration = () =>
    Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;

  const seekVideo = (time) => {
    const duration = getDuration();
    if (!duration) return;

    const safeTime = gsapInstance.utils.clamp(0, duration, time);
    if (Math.abs(video.currentTime - safeTime) < 0.016) return;

    try {
      video.currentTime = safeTime;
    } catch {
      // Some browsers reject seeks while metadata is settling. The next refresh will resync.
    }
  };

  const syncVideoToProgress = (progress) => {
    const duration = getDuration();
    if (!duration) return;

    seekVideo(duration * (1 - gsapInstance.utils.clamp(0, 1, progress)));
  };

  const refreshAndSync = () => {
    if (!trigger) return;

    requestAnimationFrame(() => {
      ScrollTriggerInstance.refresh();
      syncVideoToProgress(trigger.progress);
    });
  };

  const buildTimeline = () => {
    if (initialized) return;

    const duration = getDuration();
    if (!duration) return;

    initialized = true;
    section.classList.remove("is-static");
    video.pause();
    seekVideo(duration);

    gsapInstance.set(cards, {
      autoAlpha: 0,
      y: 34,
    });

    timeline = gsapInstance.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "build-sequence",
        trigger: section,
        start: "center center",
        end: () => `+=${Math.max(window.innerHeight * 3, 2400)}`,
        pin,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: 1,
        onUpdate: (self) => syncVideoToProgress(self.progress),
        onLeave: () => seekVideo(0),
        onLeaveBack: () => seekVideo(getDuration()),
        onRefresh: (self) => {
          requestAnimationFrame(() => syncVideoToProgress(self.progress));
        },
        onScrubComplete: (self) => syncVideoToProgress(self.progress),
      },
    });

    cards.forEach((card, index) => {
      const starts = [0.03, 0.39, 0.74];
      const xFrom = card.classList.contains("build-step--right") ? 56 : -56;

      timeline
        .fromTo(
          card,
          { autoAlpha: 0, x: xFrom, y: 34 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.12,
            ease: "power2.out",
            immediateRender: false,
          },
          starts[index],
        )
        .to(
          card,
          {
            autoAlpha: 1,
            duration: 0.1,
          },
          starts[index] + 0.12,
        )
        .to(
          card,
          {
            autoAlpha: 0,
            x: xFrom * -0.28,
            y: -28,
            duration: 0.14,
            ease: "power2.in",
          },
          starts[index] + 0.26,
        );
    });

    timeline.to({}, { duration: 0.03 });

    trigger = timeline.scrollTrigger;
    refreshAndSync();

    window.addEventListener("load", refreshAndSync, { once: true });
    window.addEventListener("pageshow", refreshAndSync);
  };

  if (getDuration()) {
    buildTimeline();
    return;
  }

  video.addEventListener("loadedmetadata", buildTimeline, { once: true });
  video.addEventListener("durationchange", buildTimeline, { once: true });

  window.setTimeout(() => {
    if (!initialized && !getDuration()) {
      setStaticState();
    }
  }, 4500);
}

function setFieldError(field, message) {
  const row = field.closest(".form-row");
  const error = document.querySelector(`[data-error-for="${field.name}"]`);

  row?.classList.toggle("is-invalid", Boolean(message));
  field.setAttribute("aria-invalid", String(Boolean(message)));

  if (error) {
    error.textContent = message;
  }
}

function validateForm(form) {
  const fields = [...form.elements].filter((element) =>
    ["INPUT", "SELECT", "TEXTAREA"].includes(element.tagName),
  );
  let isValid = true;

  fields.forEach((field) => {
    let message = "";
    const value = field.value.trim();

    if (field.required && !value) {
      message = "Preencha este campo.";
    } else if (field.type === "email" && value && !field.validity.valid) {
      message = "Informe um e-mail válido.";
    }

    if (message) {
      isValid = false;
    }

    setFieldError(field, message);
  });

  return isValid;
}

function buildMailto(form) {
  const data = new FormData(form);
  const subject = encodeURIComponent("Solicitação de consulta - Studio Aura");
  const body = encodeURIComponent(
    [
      "Olá, Studio Aura.",
      "",
      `Nome: ${data.get("name")}`,
      `E-mail: ${data.get("email")}`,
      `Telefone: ${data.get("phone") || "Não informado"}`,
      `Tipo de projeto: ${data.get("project")}`,
      "",
      "Mensagem:",
      data.get("message"),
    ].join("\n"),
  );

  return `mailto:contato@studioaura.com.br?subject=${subject}&body=${body}`;
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = document.querySelector("[data-form-status]");
  const fields = [...form.elements].filter((element) =>
    ["INPUT", "SELECT", "TEXTAREA"].includes(element.tagName),
  );

  fields.forEach((field) => {
    field.addEventListener("input", () => setFieldError(field, ""));
    field.addEventListener("blur", () => {
      if (!field.value.trim()) return;
      validateForm(form);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status?.classList.remove("is-error");

    if (!validateForm(form)) {
      if (status) {
        status.textContent = "Revise os campos destacados antes de enviar.";
        status.classList.add("is-error");
      }
      return;
    }

    if (status) {
      status.textContent = "Mensagem validada. Abrindo seu aplicativo de e-mail para envio.";
    }

    window.location.href = buildMailto(form);
  });
}

function init() {
  document.querySelectorAll("img[data-srcs]").forEach(resolveImageSource);
  setupVideos();
  setupReveal();
  setupHeaderAndNavigation();
  setupBuildSequence();
  setupContactForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
