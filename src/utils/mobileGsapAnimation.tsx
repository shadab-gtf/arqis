import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ScrollSmoother from "gsap/dist/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

const SLIDE_NAV = {
  philosophy: { prev: "Philosophy", next: "Projects", route: "/philosophy" },
  projects: { prev: "Projects", next: "Our Team", route: "/projects" },
  ourTeam: { prev: "Our Team", next: "Careers", route: "/our-team" },
  career: { prev: "Careers", next: "Media", route: "/career" },
  media: { prev: "Media", next: "Blogs", route: "/media" },
  blogs: { prev: "Blogs", next: "Contact", route: "/blogs" },
  quickLink: { prev: "QuickLink", next: "The End", route: "/quick-link" },
};

export default function initScrollSmoother(router: any) {
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.8,
    effects: true,
    smoothTouch: false,
  });

  const sections = gsap.utils.toArray<HTMLElement>(".horizontal-section .item");
  if (!sections.length) return { cleanup: () => { } };

  let currentIndex = 0;
  let isAnimating = false;
  const inTL = new WeakMap();
  const outTL = new WeakMap();

  const applyLogoVisibilityForSection = (index: number) => {
    document.body.classList.remove("extra-active");
    document.body.classList.toggle("hero-active", index === 0);
  };

  const shouldDelayLogoReveal = (fromIndex: number, toIndex: number) =>
    fromIndex === 0 && toIndex === 1;

  const shouldHideLogoImmediately = (fromIndex: number, toIndex: number) =>
    fromIndex === 1 && toIndex === 0;

  const CONFIG = {
    COOLDOWN_MS: 100,
    ANIM_DURATION: 1.1,
    TOUCH_THRESH: 100,
    DEBOUNCE_MS: 120,
    SCROLL_SPEED: 0.4,
  };

  const isDarkSection = (section: HTMLElement) =>
    section?.dataset.theme === "dark" ||
    section?.classList.contains("dark-bg") || section?.classList.contains("bg-dark");

  const updateTheme = (section: HTMLElement) => {
    if (!section) return;
    const isDark = isDarkSection(section);
    const elements = {
      icons: section.querySelectorAll(".icon, .nav-icon, svg, img.icon"),
      nav: document.querySelectorAll(
        ".nav-indicator, .scroll-hint, .progress-bar"
      ),
    };

    elements.icons.forEach((icon) => {
      icon.classList.toggle("icon-light", isDark);
      icon.classList.toggle("icon-dark", !isDark);
    });

    elements.nav.forEach((el) => {
      el.classList.toggle("theme-light", isDark);
      el.classList.toggle("theme-dark", !isDark);
    });
  };

  const buildInTimeline = (section: HTMLElement) => {
    const tl = gsap.timeline({ paused: true });
    return tl;
  };

  const buildOutTimeline = (section: HTMLElement) => {
    const tl = gsap.timeline({ paused: true });
    return tl;
  };

  const emit = (name: string, detail: any) =>
    window.dispatchEvent(new CustomEvent(name, { detail }));

  sections.forEach((sec, i) => {
    inTL.set(sec, buildInTimeline(sec));
    outTL.set(sec, buildOutTimeline(sec));
    sec.classList.toggle("is-active", i === 0);
    if (i === 0) {
      inTL.get(sec)?.play();
      updateTheme(sec);
    }
  });

  const first = sections[0];
  applyLogoVisibilityForSection(currentIndex);
  emit("sliderstart", {
    index: 0,
    direction: "forward",
    footerTitle: first?.dataset.footerTitle || "Reshaping Real Estate",
    footerCta: first?.dataset.footerCta || "Start Journey",
  });

  const scrollToBoundary = (container, direction) => {
    if (!container) return;
    const targetScroll =
      direction === "forward"
        ? container.scrollHeight - container.clientHeight
        : 0;
    gsap.to(container, {
      scrollTop: targetScroll,
      duration: CONFIG.SCROLL_SPEED,
      ease: "power2.out",
      onComplete: () =>
        setTimeout(() => (isAnimating = false), CONFIG.COOLDOWN_MS),
    });
  };

  const goToSection = async (index, scrollDirection = null) => {
    if (index < 0 || index >= sections.length || isAnimating) return;
    isAnimating = true;
    const previousIndex = currentIndex;
    const delayLogoRevealUntilComplete = shouldDelayLogoReveal(
      previousIndex,
      index
    );

    const activeSection = sections[currentIndex];
    const verticalScrollable = activeSection.querySelector(
      ".scrollable-container"
    );
    if (verticalScrollable && scrollDirection) {
      const atBoundary = isAtScrollBoundary(
        verticalScrollable,
        scrollDirection === "forward" ? 1 : -1
      );
      if (!atBoundary) {
        scrollToBoundary(verticalScrollable, scrollDirection);
        return;
      }
    }

    if (shouldHideLogoImmediately(previousIndex, index)) {
      applyLogoVisibilityForSection(index);
    } else if (!delayLogoRevealUntilComplete) {
      applyLogoVisibilityForSection(index);
    }

    const next = sections[index];
    const prev = sections[currentIndex];
    const dir = index > currentIndex ? "forward" : "backward";
    const sectionKeys = Object.keys(SLIDE_NAV);
    const nextSectionKey = sectionKeys[index];
    const nextRoute = SLIDE_NAV[nextSectionKey]?.route;

    document.documentElement.classList.add(`sliding-${dir}`);
    outTL.get(prev)?.play();

    const scrollContainer = document.querySelector(".horizontal-section");
    const maxScroll = (scrollContainer as HTMLElement).scrollWidth - (scrollContainer as HTMLElement).clientWidth;
    const targetScroll = (index / (sections.length - 1)) * maxScroll;

    await gsap.to(scrollContainer, {
      scrollTo: { x: targetScroll },
      duration: CONFIG.ANIM_DURATION,
      ease: "power3.inOut",
      onStart: () => {
        document.documentElement.classList.add("is-sliding");
      },
      onUpdate: function () {
        document.documentElement.style.setProperty(
          "--slide-progress",
          this.progress()
        );
      },
      onComplete: () => {
        currentIndex = index;
        sections.forEach((sec, i) =>
          sec.classList.toggle("is-active", i === index)
        );
        inTL.get(next)?.play();
        updateTheme(next);

        if (delayLogoRevealUntilComplete) {
          applyLogoVisibilityForSection(index);
        }

        const navConfig = [
          {
            prev: "Reshaping Real Estate",
            next: "Start Journey",
            footer: "remove",
          },
          { prev: "Philosophy", next: "Projects", footer: "add" },
          { prev: "Projects", next: "Our Team", footer: "add" },
          { prev: "Our Team", next: "Careers", footer: "add" },
          { prev: "Careers", next: "Media", footer: "add" },
          { prev: "Media", next: "Blogs", footer: "add" },
          { prev: "Blogs", next: "Contact", footer: "add" },
          { prev: "Contact", next: "Quick Links", footer: "add" },
          { prev: "Quick Links", next: "The End", footer: "add" },
        ];

        if (navConfig[index]) {
          document.querySelector(".prev_title").textContent =
            navConfig[index].prev;
          document.querySelector(".next_title").textContent =
            navConfig[index].next;
        }

        emit("slidechange", {
          index,
          direction: dir,
          footerTitle: next?.dataset.footerTitle || "",
          footerCta: next?.dataset.footerCta || "",
        });

        if (router && nextRoute) router.push(nextRoute);

        setTimeout(() => {
          isAnimating = false;
          document.documentElement.classList.remove(
            "is-sliding",
            `sliding-${dir}`
          );
        }, CONFIG.COOLDOWN_MS);
      },
    });
  };

  const isAtScrollBoundary = (el, deltaY, isHorizontal = false) => {
    if (!el) return true;
    const tolerance = 5;
    const {
      scrollLeft,
      scrollTop,
      scrollWidth,
      scrollHeight,
      clientWidth,
      clientHeight,
    } = el;
    if (isHorizontal)
      return deltaY > 0
        ? scrollLeft + clientWidth >= scrollWidth - tolerance
        : scrollLeft <= tolerance;
    return deltaY > 0
      ? scrollTop + clientHeight >= scrollHeight - tolerance
      : scrollTop <= tolerance;
  };

  let accum = 0;
  let lastInputTime = 0;

  const onWheel = (e) => {
    if (isAnimating) return;

    const now = Date.now();
    if (now - lastInputTime < CONFIG.DEBOUNCE_MS) return;
    lastInputTime = now;

    const delta =
      e.deltaY *
      (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1);
    const activeSection = sections[currentIndex];
    let scrollContainer = activeSection.querySelector(".overflow-y-scroll");
    if (!scrollContainer) {
      scrollContainer = activeSection.querySelector(".mob_scroll");
    }
    const isHorizontal =
      (scrollContainer as HTMLElement)?.dataset.scroll === "horizontal" || false;

    if (
      scrollContainer &&
      e.target.closest(".overflow-y-scroll, .mob_scroll") &&
      !isAtScrollBoundary(scrollContainer, delta, isHorizontal)
    ) {
      return;
    }
    e.preventDefault();
    const wheelThreshold = scrollContainer
      ? (scrollContainer as HTMLElement).clientHeight
      : window.innerHeight / 2;
    accum += delta;
    if (Math.abs(accum) >= wheelThreshold) {
      goToSection(
        currentIndex + (accum > 0 ? 1 : -1),
        accum > 0 ? "forward" : "backward"
      );
      accum = 0;
    }
  };

  const onKey = (e) => {
    if (
      isAnimating ||
      ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName || "")
    )
      return;
    const now = Date.now();
    if (now - lastInputTime < CONFIG.DEBOUNCE_MS) return;
    lastInputTime = now;

    const activeSection = sections[currentIndex];
    const scrollContainer = activeSection.querySelector(
      ".scrollable-container"
    );
    if (
      scrollContainer &&
      !isAtScrollBoundary(
        scrollContainer,
        e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1
      )
    )
      return;

    if (["ArrowRight", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      goToSection(currentIndex + 1, "forward");
    } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      goToSection(currentIndex - 1, "backward");
    }
  };

  let touchStartY = 0;
  let touchStartX = 0;
  let hasMoved = false;

  const onTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
    hasMoved = false;
  };

  const onTouchMove = (e) => {
    if (isAnimating) return;

    const now = Date.now();
    if (now - lastInputTime < CONFIG.DEBOUNCE_MS) return;
    lastInputTime = now;

    const dy = e.touches[0].clientY - touchStartY;
    const dx = e.touches[0].clientX - touchStartX;
    const isVerticalSwipe =
      Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > CONFIG.TOUCH_THRESH;

    const activeSection = sections[currentIndex];
    const scrollContainer = activeSection.querySelector(
      ".scrollable-container"
    );

    if (
      scrollContainer &&
      Math.abs(dy) > 10 &&
      !isAtScrollBoundary(scrollContainer, dy)
    ) {
      return;
    }

    if (isVerticalSwipe && !hasMoved) {
      e.preventDefault();
      hasMoved = true;
      goToSection(
        currentIndex + (dy < 0 ? 1 : -1),
        dy < 0 ? "forward" : "backward"
      );
    }
  };

  const onTouchEnd = () => {
    hasMoved = false;
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("keydown", onKey, { passive: false });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("touchend", onTouchEnd, { passive: true });

  const cleanup = () => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
    gsap.killTweensOf(sections);
    smoother.kill();
  };

  return {
    goTo: goToSection,
    next: () => goToSection(currentIndex + 1, "forward"),
    prev: () => goToSection(currentIndex - 1, "backward"),
    getCurrentIndex: () => currentIndex,
    getSectionsCount: () => sections.length,
    updateTheme: () => updateTheme(sections[currentIndex]),
    getCurrentSection: () => sections[currentIndex],
    getSectionByIndex: (index) => sections[index],
    isAnimating: () => isAnimating,
    cleanup,
  };
}
