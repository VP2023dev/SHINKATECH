import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const isTouch = matchMedia("(pointer: coarse)").matches;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const state = {
  mouse: { x: innerWidth / 2, y: innerHeight / 2 },
};

function pad(value) {
  return String(Math.round(value)).padStart(2, "0");
}

function initLoader(onDone) {
  const loader = document.querySelector(".loader");
  const count = document.querySelector(".loader__count");
  const line = document.querySelector(".loader__line i");
  const kanji = document.querySelector(".loader__kanji");
  const word = document.querySelector(".loader__word");
  if (!loader || !count || !line || !kanji || !word) {
    onDone?.();
    return;
  }

  const proxy = { n: 0 };
  document.body.style.overflow = "hidden";

  const strokes = kanji.querySelectorAll("span");
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

  tl.from(strokes, { yPercent: 110, duration: 0.85, stagger: 0.18, ease: "expo.out" })
    .from(word, { y: 40, opacity: 0, letterSpacing: "0.8em", duration: 0.9 }, "-=0.45")
    .to(
      proxy,
      {
        n: 100,
        duration: reduceMotion ? 0.2 : 1.7,
        ease: "power3.inOut",
        onUpdate() {
          count.textContent = pad(proxy.n);
          line.style.width = `${proxy.n}%`;
        },
      },
      "-=0.35",
    )
    .to(".loader__flash", { opacity: 0.7, duration: 0.06 })
    .to(".loader__flash", { opacity: 0, duration: 0.28 })
    .to(kanji, { y: -50, opacity: 0, filter: "blur(8px)", duration: 0.55 }, "+=0.05")
    .to(word, { y: -24, opacity: 0, duration: 0.45 }, "<")
    .to(".loader__row", { opacity: 0, duration: 0.35 }, "<")
    .to(loader, {
      yPercent: -100,
      duration: 1.1,
      ease: "power4.inOut",
      onComplete() {
        loader.style.display = "none";
        document.body.style.overflow = "";
        revealPage();
        onDone?.();
      },
    });
}

function revealPage() {
  const title = new SplitType(".hero__title .line", { types: "chars" });
  const lead = new SplitType(".hero__lead", { types: "lines" });
  const last = title.chars?.[title.chars.length - 1];
  if (last) last.classList.add("char");

  gsap.set(
    [title.chars, lead.lines, ".hero__top", ".hero__actions", ".hero__scroll", ".nav", ".hero__title", ".hero__lead", ".hero__glow", ".hero__slash"],
    { opacity: 0 },
  );
  gsap.set(title.chars, { yPercent: 130, rotateX: 55, filter: "blur(10px)" });
  gsap.set(lead.lines, { y: 28 });

  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
  tl.to(".nav", { opacity: 1, y: 0, duration: 0.8 })
    .to(".hero__top", { opacity: 1, duration: 0.7 }, "-=0.4")
    .to(".hero__title", { opacity: 1, duration: 0.01 }, "<")
    .to(".hero__lead", { opacity: 1, duration: 0.01 }, "<")
    .to(".hero__slash", { opacity: 1, scale: 1, duration: 0.5 }, "<")
    .to(
      title.chars,
      {
        opacity: 1,
        yPercent: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 1.25,
        stagger: 0.07,
      },
      "-=0.4",
    )
    .to(".hero__glow", { opacity: 1, duration: 1.1 }, "-=0.9")
    .fromTo(
      last,
      { scale: 0.6, color: "#f3f3f1" },
      { scale: 1, color: "#e30613", duration: 0.7, ease: "back.out(2)" },
      "-=0.85",
    )
    .to(lead.lines, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, "-=0.55")
    .to(".hero__actions", { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
    .to(".hero__scroll", { opacity: 1, duration: 0.6 }, "-=0.4")
    .add(() => glitchTitle());

  gsap.fromTo(
    ".hero__kanji",
    { opacity: 0, rotate: -10, scale: 0.92 },
    { opacity: 1, rotate: 0, scale: 1, duration: 1.8, ease: "expo.out", delay: 0.25 },
  );

  const titleEl = document.querySelector(".hero__title");
  titleEl?.addEventListener("mouseenter", glitchTitle);
}

function glitchTitle() {
  const titleEl = document.querySelector(".hero__title");
  if (!titleEl || reduceMotion) return;
  titleEl.classList.remove("is-glitch");
  void titleEl.offsetWidth;
  titleEl.classList.add("is-glitch");
  window.setTimeout(() => titleEl.classList.remove("is-glitch"), 240);
}

function initPointer() {
  const root = document.documentElement;
  const onMove = (event) => {
    state.mouse.x = event.clientX;
    state.mouse.y = event.clientY;
    root.style.setProperty("--mx", `${event.clientX}px`);
    root.style.setProperty("--my", `${event.clientY}px`);
  };
  window.addEventListener("mousemove", onMove);
  return () => window.removeEventListener("mousemove", onMove);
}

function initParallax() {
  if (isTouch || reduceMotion) return () => {};

  const slash = document.querySelector(".hero__slash");
  const glow = document.querySelector(".hero__glow");
  const kanji = document.querySelector(".hero__kanji");

  const tick = () => {
    const x = (state.mouse.x / innerWidth - 0.5) * 2;
    const y = (state.mouse.y / innerHeight - 0.5) * 2;
    if (slash) gsap.to(slash, { x: x * 28, y: y * 16, duration: 0.9, ease: "power3.out", overwrite: "auto" });
    if (glow) gsap.to(glow, { x: x * 40, y: y * 24, duration: 1.1, ease: "power3.out", overwrite: "auto" });
    if (kanji) gsap.to(kanji, { x: x * -22, duration: 1.2, ease: "power3.out", overwrite: "auto" });
  };

  gsap.ticker.add(tick);
  return () => gsap.ticker.remove(tick);
}

function initCardTilt() {
  if (isTouch || reduceMotion) return;

  document.querySelectorAll(".card").forEach((card) => {
    if (card.closest(".carousel")) return;
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 10,
        rotateX: -y * 10,
        y: -10,
        transformPerspective: 900,
        duration: 0.4,
        ease: "power3.out",
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
    });
  });
}

function initMagnetic() {
  if (isTouch) return;

  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("mousemove", (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.32, y: y * 0.32, duration: 0.4, ease: "power3.out" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.75, ease: "elastic.out(1, 0.4)" });
    });
  });
}

function openMenu() {
  document.body.classList.add("menu-open");
  const menu = document.querySelector(".menu");
  menu?.classList.add("is-open");
  gsap.fromTo(".menu__bg", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power4.inOut" });
  gsap.fromTo(
    ".menu__list a",
    { y: 100, opacity: 0, rotateX: 20 },
    { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.08, ease: "expo.out", delay: 0.18 },
  );
  gsap.fromTo(".menu__foot, .menu__label", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.35 });
}

function closeMenu() {
  if (!document.body.classList.contains("menu-open")) return;
  gsap.to(".menu__bg", {
    clipPath: "inset(0 0 100% 0)",
    duration: 0.7,
    ease: "power4.inOut",
    onComplete() {
      document.body.classList.remove("menu-open");
      document.querySelector(".menu")?.classList.remove("is-open");
    },
  });
  gsap.to(".menu__list a", { opacity: 0, y: -24, duration: 0.3 });
}

function initLenis() {
  const lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
  });

  const onLenis = () => ScrollTrigger.update();
  lenis.on("scroll", onLenis);
  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  const links = document.querySelectorAll('a[href^="#"]');
  const onClick = (event) => {
    const id = event.currentTarget.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    closeMenu();
    lenis.scrollTo(target, { offset: -20 });
  };
  links.forEach((link) => link.addEventListener("click", onClick));

  return {
    lenis,
    destroy() {
      links.forEach((link) => link.removeEventListener("click", onClick));
      gsap.ticker.remove(tick);
      lenis.destroy();
    },
  };
}

function initNav() {
  let last = 0;
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  if (!nav || !toggle) return () => {};

  const trigger = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate(self) {
      const current = self.scroll();
      nav.classList.toggle("is-hidden", current > last && current > 80 && !document.body.classList.contains("menu-open"));
      last = current;
    },
  });

  const onToggle = () => {
    if (document.body.classList.contains("menu-open")) closeMenu();
    else openMenu();
  };

  toggle.addEventListener("click", onToggle);
  const menuLinks = document.querySelectorAll(".menu a");
  menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

  return () => {
    trigger.kill();
    toggle.removeEventListener("click", onToggle);
    menuLinks.forEach((link) => link.removeEventListener("click", closeMenu));
  };
}

function initScrollFx() {
  gsap.to(".progress__bar", {
    width: "100%",
    ease: "none",
    scrollTrigger: { scrub: 0.25 },
  });

  gsap.utils.toArray(".manifesto__title, .method__head h2, .cta__title, .services__head h2, .works__head h2").forEach((title) => {
    const split = new SplitType(title, { types: "lines, words" });
    gsap.from(split.words, {
      yPercent: 120,
      rotateX: 40,
      opacity: 0,
      stagger: 0.045,
      duration: 1.05,
      ease: "expo.out",
      scrollTrigger: { trigger: title, start: "top 82%" },
    });
  });

  gsap.from(".manifesto__lead", {
    y: 48,
    opacity: 0,
    duration: 1.1,
    ease: "expo.out",
    scrollTrigger: { trigger: ".manifesto__lead", start: "top 85%" },
  });

  gsap.from(".manifesto__focus article", {
    y: 36,
    opacity: 0,
    stagger: 0.12,
    duration: 0.9,
    ease: "expo.out",
    scrollTrigger: { trigger: ".manifesto__focus", start: "top 86%" },
  });

  gsap.utils.toArray(".method__list li").forEach((item, index) => {
    gsap.from(item, {
      x: index % 2 === 0 ? -56 : 56,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: { trigger: item, start: "top 88%" },
    });
    ScrollTrigger.create({
      trigger: item,
      start: "top 70%",
      onEnter: () => item.classList.add("is-in"),
    });
  });

  const kanjiMarks = document.querySelectorAll(".kanji-label span");
  gsap.to(kanjiMarks, {
    clipPath: "inset(0% 0 0 0)",
    duration: 0.7,
    stagger: 0.18,
    ease: "power4.inOut",
    scrollTrigger: { trigger: ".kanji-label", start: "top 88%" },
  });

  const footer = new SplitType(".footer__mark", { types: "chars" });
  gsap.from(footer.chars, {
    yPercent: 110,
    opacity: 0,
    stagger: 0.05,
    duration: 1.1,
    ease: "expo.out",
    scrollTrigger: { trigger: ".footer__mark", start: "top 90%" },
  });
  initFooterBreak(footer.chars);

  gsap.to(".cta__kanji", {
    yPercent: -28,
    rotate: 6,
    ease: "none",
    scrollTrigger: { trigger: ".cta", scrub: true },
  });

  gsap.to(".hero__kanji", {
    y: 90,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });

}

function initFooterBreak(chars) {
  const mark = document.querySelector(".footer__mark");
  if (!mark || !chars?.length || isTouch) return;

  const spread = () => {
    const mid = (chars.length - 1) / 2;
    chars.forEach((char, index) => {
      gsap.to(char, {
        x: (index - mid) * 22,
        y: index % 2 === 0 ? -10 : 10,
        duration: 0.55,
        ease: "expo.out",
      });
    });
  };
  const reset = () => {
    gsap.to(chars, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
  };

  mark.addEventListener("mouseenter", spread);
  mark.addEventListener("mouseleave", reset);
}

function initServices() {
  const section = document.querySelector(".services");
  if (!section) return;

  gsap.from(".card", {
    y: 64,
    opacity: 0,
    stagger: 0.08,
    duration: 1,
    ease: "expo.out",
    scrollTrigger: { trigger: section, start: "top 72%" },
  });
}

function initCanvas() {
  const canvas = document.querySelector(".hero__canvas");
  if (!canvas || reduceMotion) return () => {};

  const ctx = canvas.getContext("2d");
  const points = [];
  const gap = 68;
  let raf = 0;

  function resize() {
    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    points.length = 0;
    const cols = Math.ceil(canvas.offsetWidth / gap) + 1;
    const rows = Math.ceil(canvas.offsetHeight / gap) + 1;
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        points.push({ ox: x * gap, oy: y * gap, x: x * gap, y: y * gap });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    const mx = state.mouse.x;
    const my = state.mouse.y;

    points.forEach((point, index) => {
      const dx = point.ox - mx;
      const dy = point.oy - my;
      const dist = Math.hypot(dx, dy) || 1;
      const force = Math.min(110, 18000 / dist);
      point.x += (point.ox + (dx / dist) * force - point.x) * 0.14;
      point.y += (point.oy + (dy / dist) * force - point.y) * 0.14;

      const near = dist < 200;
      ctx.beginPath();
      ctx.arc(point.x, point.y, near ? 2.1 : 1, 0, Math.PI * 2);
      ctx.fillStyle = near ? "#e30613" : "rgba(243,243,241,0.16)";
      ctx.fill();

      const next = points[index + 1];
      if (next && Math.hypot(point.x - next.x, point.y - next.y) < 78 && near) {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(next.x, next.y);
        ctx.strokeStyle = "rgba(227,6,19,0.22)";
        ctx.stroke();
      }
    });

    raf = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
  };
}

function initMarquee() {
  const track = document.querySelector(".marquee__track");
  const group = document.querySelector(".marquee__group");
  if (!track || !group || reduceMotion) return () => {};

  let tween;

  const play = () => {
    tween?.kill();
    gsap.set(track, { x: 0 });
    const width = group.getBoundingClientRect().width;
    if (!width) return;
    tween = gsap.to(track, {
      x: -width,
      duration: width / 70,
      ease: "none",
      repeat: -1,
    });
  };

  play();
  window.addEventListener("resize", play);

  return () => {
    window.removeEventListener("resize", play);
    tween?.kill();
  };
}

function resetToTop(lenis) {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  lenis?.scrollTo(0, { immediate: true, force: true });
}

function findTarget(hash) {
  if (!hash || hash === "#") return null;
  try {
    return document.querySelector(hash);
  } catch {
    return null;
  }
}

export function startMotion() {
  if (isTouch) document.body.classList.add("is-touch");
  const initialTarget = findTarget(location.hash);
  resetToTop();

  const stopCursor = initPointer();
  initMagnetic();
  initCardTilt();
  const stopParallax = initParallax();
  const stopCanvas = initCanvas();
  const stopNav = initNav();
  const stopMarquee = initMarquee();

  let lenisApi;
  const onResize = () => ScrollTrigger.refresh();
  window.addEventListener("resize", onResize);

  if (!reduceMotion) {
    lenisApi = initLenis();
    resetToTop(lenisApi.lenis);
    lenisApi.lenis.stop();
    initScrollFx();
    initServices();
    initLoader(() => {
      resetToTop(lenisApi.lenis);
      lenisApi.lenis.start();
      if (initialTarget) {
        window.setTimeout(() => lenisApi.lenis.scrollTo(initialTarget, { offset: -20, duration: 1.6 }), 350);
      }
    });
  } else {
    const loader = document.querySelector(".loader");
    if (loader) loader.style.display = "none";
    revealPage();
    initialTarget?.scrollIntoView();
  }

  return () => {
    stopCursor?.();
    stopParallax?.();
    stopCanvas?.();
    stopNav?.();
    stopMarquee?.();
    lenisApi?.destroy();
    window.removeEventListener("resize", onResize);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    document.body.classList.remove("menu-open", "is-touch");
    document.body.style.overflow = "";
  };
}

let pageLenis = null;

export function getLenis() {
  return pageLenis;
}

export function startPageMotion() {
  if (isTouch) document.body.classList.add("is-touch");

  const stopCursor = initPointer();
  initMagnetic();
  const stopNav = initNav();
  let lenisApi;

  if (reduceMotion) {
    gsap.set(".nav, [data-intro]", { opacity: 1 });
  } else {
    lenisApi = initLenis();
    pageLenis = lenisApi.lenis;

    gsap.to(".progress__bar", {
      width: "100%",
      ease: "none",
      scrollTrigger: { scrub: 0.25 },
    });

    const title = new SplitType("[data-split]", { types: "chars" });
    gsap.set(title.chars, { yPercent: 120, opacity: 0, rotateX: 50 });

    gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .to(".nav", { opacity: 1, duration: 0.8 })
      .to("[data-intro]", { opacity: 1, duration: 0.01 }, "<")
      .from("[data-intro]", { y: 36, duration: 1, stagger: 0.08 }, "<")
      .to(title.chars, { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.05 }, "-=0.9");

    gsap.utils.toArray("[data-reveal]").forEach((el) => {
      gsap.from(el, {
        y: 56,
        opacity: 0,
        duration: 1.05,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  }

  const onResize = () => ScrollTrigger.refresh();
  window.addEventListener("resize", onResize);

  return () => {
    stopCursor?.();
    stopNav?.();
    lenisApi?.destroy();
    pageLenis = null;
    window.removeEventListener("resize", onResize);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    document.body.classList.remove("menu-open", "is-touch", "case-open");
    document.body.style.overflow = "";
  };
}
