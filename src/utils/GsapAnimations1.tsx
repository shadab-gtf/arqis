import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ScrollSmoother from "gsap/dist/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

const SLIDE_NAV = {
  philosophy: { prev: "Philosophy", next: "Projects", route: "/philosophy" },
  projects: { prev: "Projects", next: "Media", route: "/projects" },
  media: { prev: "Media", next: "Blogs", route: "/blogs" },
  blogs: { prev: "Blogs", next: "Careers", route: "/career" },
  ourTeam: { prev: "Career", next: "Our Team", route: "/our-team" },
  career: { prev: "Our Team", next: "Contact", route: "/contact" },
  quickLink: { prev: "QuickLink", next: "The End", route: "/quick-link" },
};

export default function initScrollSmoother(router: any) {
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.8,
    effects: true,
    smoothTouch: 0.1,
  });

  const sections = gsap.utils.toArray<HTMLElement>(".horizontal-section .item");
  if (!sections.length) return { cleanup: () => { } };

  const getInitialIndex = () => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#blogs') return 4;
    }
    return 0;
  };

  let initialIndex = getInitialIndex();
  let currentIndex = 0;
  let isAnimating = false;
  const inTL = new WeakMap();
  const outTL = new WeakMap();

  const CONFIG = {
    WHEEL_THRESHOLD: 20,
    COOLDOWN_MS: 50,
    ANIM_DURATION: 2,
    TOUCH_THRESH: 50,
    DEBOUNCE_MS: 40,
    SCROLL_SPEED: 1,
  };

  const microsite = router?.microsite;

  const applyBodyStateForSection = (index: number) => {
    if (index === 0) {
      document.body.classList.add("hero-active");
      document.body.classList.remove("extra-active");
      return;
    }

    if (index === 2 || index === 3) {
      document.body.classList.add("extra-active");
      document.body.classList.remove("hero-active");
      return;
    }

    document.body.classList.remove("extra-active");
    document.body.classList.remove("hero-active");
  };

  const shouldDelayLogoReveal = (fromIndex: number, toIndex: number) =>
    fromIndex === 0 && toIndex === 1;

  const shouldHideLogoImmediately = (fromIndex: number, toIndex: number) =>
    fromIndex === 1 && toIndex === 0;

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
  emit("sliderstart", {
    index: 0,
    direction: "forward",
    footerTitle: first?.dataset.footerTitle || "Reshaping Real Estate",
    footerCta: first?.dataset.footerCta || "Start Journey",
  });

  if (initialIndex > 0) {
    setTimeout(() => {
      const originalDuration = CONFIG.ANIM_DURATION;
      CONFIG.ANIM_DURATION = 0.01;
      goToSection(initialIndex, "forward").then(() => {
        CONFIG.ANIM_DURATION = originalDuration;
      });
    }, 100);
  }

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
        setTimeout(() => (isAnimating = false), CONFIG.COOLDOWN_MS);
        return;
      }
    }

    if (shouldHideLogoImmediately(previousIndex, index)) {
      applyBodyStateForSection(index);
    } else if (!delayLogoRevealUntilComplete) {
      applyBodyStateForSection(index);
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
        updateTheme(next);
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

        if (delayLogoRevealUntilComplete) {
          applyBodyStateForSection(index);
        }

        // Fixed class toggles: Always apply based on current index for consistency
        // const activeIndices = microsite ? [1] : [1, 4, 7];

        const activeIndices = microsite ? [0] : [0, 1, 2, 3, 4, 5, 6, 7];
        const shouldActive = activeIndices.includes(index);
        document.body.classList.toggle("active", shouldActive);

        if (microsite) {
          document.body.classList.toggle("full-color", [4, 6, 8].includes(index));
        }

        // Make hover-Effect consistent with active indices (adjust if microsite needs different logic for index 7)
        const shouldHover = activeIndices.includes(index);
        document
          .querySelector("header")
          ?.classList.toggle("hover-Effect", shouldHover);
        document
          .querySelector(".span_1")
          ?.classList.toggle("hover-Effect", shouldHover);
        document
          .querySelector(".span_2")
          ?.classList.toggle("hover-Effect", shouldHover);
        document
          .querySelector(".span_3")
          ?.classList.toggle("hover-Effect", shouldHover);
        document
          .querySelector(".nextcontent")
          ?.classList.toggle("hover-Effect", shouldHover);

        const navConfig = microsite
          ? [
            { prev: "Arqis Mall", next: "Overview", footer: "remove" },
            { prev: "Overview", next: "Amenities", footer: "add" },
            { prev: "Amenities", next: "Highlights", footer: "add" },
            { prev: "Highlights", next: "Brand Partners", footer: "add" },
            { prev: "Brand Partners", next: "Floor Plan", footer: "add" },
            { prev: "Floor Plan", next: "Location", footer: "add" },
            { prev: "Location", next: "Gallery", footer: "add" },
            { prev: "Gallery", next: "Contact us", footer: "add" },
            { prev: "Contact us", next: "quick links", footer: "add" },
            { prev: "Quick Links", next: "The End", footer: "add" },
          ]
          : [
            { prev: "Reshaping Real Estate", next: "Start Journey", footer: "remove", },
            { prev: "Philosophy", next: "Projects", footer: "add" },
            { prev: "Projects", next: "Media", footer: "add" },
            { prev: "Media", next: "Blog", footer: "add" },
            { prev: "Blog", next: "Career", footer: "add" },
            { prev: "Careers", next: "Team", footer: "add" },
            { prev: "Team", next: "Contact", footer: "add" },
            { prev: "Contact", next: "Quick Links", footer: "add" },
            { prev: "Quick Links", next: "The End", footer: "add" },
          ];

        if (navConfig[index]) {
          document.querySelector(".prev_title").textContent =
            navConfig[index].prev;
          document.querySelector(".next_title").textContent =
            navConfig[index].next;
          document
            .querySelector("footer")
            ?.classList.toggle(
              "change_style",
              navConfig[index].footer === "add"
            );
        }

        emit("slidechange", {
          index,
          direction: dir,
          footerTitle: next?.dataset.footerTitle || "",
          footerCta: next?.dataset.footerCta || "",
        });

        // if (router && nextRoute) router.push(nextRoute);

        setTimeout(() => {
          isAnimating = false;
          document.documentElement.classList.remove(
            "is-sliding",
            `sliding-${dir}`
          );
        }, CONFIG.COOLDOWN_MS);
      },
    });

    // gsap.fromTo(next, { scale: 1.05 }, { scale: 1, duration: CONFIG.ANIM_DURATION, ease: "power3.out" });
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
    e.preventDefault();
    if (isAnimating) return;

    const now = Date.now();
    if (now - lastInputTime < CONFIG.DEBOUNCE_MS) return;
    lastInputTime = now;

    const delta =
      e.deltaY *
      (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1);
    const activeSection = sections[currentIndex];
    const isModalOpen = document.querySelector(".modal-container");
    const scrollContainer = isModalOpen
      ? isModalOpen.querySelector(".scrollable-container")
      : (activeSection.querySelector(".scrollable-container") || document.querySelector(".horizontal-section"));

    if (scrollContainer) {
      const isHorizontal = (scrollContainer as HTMLElement).dataset.scroll === "horizontal";
      if (!isAtScrollBoundary(scrollContainer, delta, isHorizontal)) {
        const scrollProp = isHorizontal ? "scrollLeft" : "scrollTop";
        const maxScroll = isHorizontal
          ? scrollContainer.scrollWidth - scrollContainer.clientWidth
          : scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const scrollAmount =
          scrollContainer[scrollProp] + (delta > 0 ? 150 : -150);
        gsap.to(scrollContainer, {
          [scrollProp]: Math.max(0, Math.min(scrollAmount, maxScroll)),
          duration: CONFIG.SCROLL_SPEED,
          ease: "power2.out",
        });
        accum = 0;
        return;
      }
    }

    accum += delta;
    if (Math.abs(accum) >= CONFIG.WHEEL_THRESHOLD && !isModalOpen) {
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
    const isModalOpen = document.querySelector(".modal-container");
    const scrollContainer = isModalOpen
      ? isModalOpen.querySelector(".scrollable-container")
      : activeSection.querySelector(".scrollable-container");
    if (
      scrollContainer &&
      !isAtScrollBoundary(
        scrollContainer,
        e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1
      )
    )
      return;

    if (isModalOpen) return;

    if (["ArrowRight", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      goToSection(currentIndex + 1, "forward");
    } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      goToSection(currentIndex - 1, "backward");
    }
  };

  let touchStartY = 0;
  let hasMoved = false;

  const onTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
    hasMoved = false;
  };

  const onTouchMove = (e) => {
    if (isAnimating) {
      e.preventDefault();
      return;
    }
    const now = Date.now();
    if (now - lastInputTime < CONFIG.DEBOUNCE_MS) return;
    lastInputTime = now;

    const dy = e.touches[0].clientY - touchStartY;
    const activeSection = sections[currentIndex];
    const isModalOpen = document.querySelector(".modal-container");
    const scrollContainer = isModalOpen
      ? isModalOpen.querySelector(".scrollable-container")
      : activeSection.querySelector(".scrollable-container");
    if (scrollContainer && !isAtScrollBoundary(scrollContainer, dy)) return;

    if (Math.abs(dy) > CONFIG.TOUCH_THRESH && !hasMoved && !isModalOpen) {
      e.preventDefault();
      hasMoved = true;
      goToSection(
        currentIndex + (dy < 0 ? 1 : -1),
        dy < 0 ? "forward" : "backward"
      );
    }
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("keydown", onKey, { passive: false });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });

  const cleanup = () => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
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