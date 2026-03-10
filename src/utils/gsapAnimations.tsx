

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

export default function InitScrollSmoother(router: any) {
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
    effects: true,
    smoothTouch: 0.2,
  });

  const sections = gsap.utils.toArray<HTMLElement>(".horizontal-section .item");
  let currentIndex = 0;
  let isAnimating = false;
  const COOLDOWN_MS = 1000;
  const ANIM_DURATION = 2;
  const TOUCH_THRESH = 60;
  const DEBOUNCE_MS = 100;
  const inTL = new WeakMap();
  const outTL = new WeakMap();

  const isDarkSection = (section: HTMLElement) => {
    return (
      section.classList.contains("dark-bg") ||
      section.dataset.theme === "dark" ||
      section.classList.contains("bg-dark")
    );
  };

  const updateIconColors = (section: HTMLElement) => {
    const isDark = isDarkSection(section);
    const icons = section.querySelectorAll(".icon, .nav-icon, svg, img.icon");
    icons.forEach((icon) => {
      if (isDark) {
        icon.classList.add("icon-light");
        icon.classList.remove("icon-dark");
      } else {
        icon.classList.add("icon-dark");
        icon.classList.remove("icon-light");
      }
    });

    const navElements = document.querySelectorAll(
      ".nav-indicator, .scroll-hint, .progress-bar"
    );
    navElements.forEach((el) => {
      if (isDark) {
        el.classList.add("theme-light");
        el.classList.remove("theme-dark");
      } else {
        el.classList.add("theme-dark");
        el.classList.remove("theme-light");
      }
    });
  };

  const buildInTimeline = (section: HTMLElement) => {
    const tl = gsap.timeline({ paused: true });
    const fadeUps = section.querySelectorAll(".fade-up");
    const scales = section.querySelectorAll(".scale-in");
    const staggers = section.querySelectorAll(".stagger > *");
    const parallax = section.querySelectorAll(".parallax");
    const slideIns = section.querySelectorAll(".slide-in");
    const rotateIns = section.querySelectorAll(".rotate-in");
    const blurIns = section.querySelectorAll(".blur-in");

    if (fadeUps.length) {
      tl.from(fadeUps, {
        y: 80,
        opacity: 0,
        rotationX: -20,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.12,
        clearProps: "all",
      }, 0);
    }
    if (scales.length) {
      tl.from(scales, {
        scale: 0.8,
        opacity: 0,
        duration: 1.4,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.1,
      }, 0.2);
    }
    if (staggers.length) {
      tl.from(staggers, {
        opacity: 0,
        y: 40,
        x: -20,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
      }, 0.25);
    }
    if (parallax.length) {
      tl.from(parallax, {
        x: 120,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.15,
      }, 0.3);
    }
    if (slideIns.length) {
      tl.from(slideIns, {
        x: -100,
        opacity: 0,
        duration: 1.3,
        ease: "power3.out",
        stagger: 0.09,
      }, 0.2);
    }
    if (rotateIns.length) {
      tl.from(rotateIns, {
        rotation: -200,
        scale: 0.4,
        opacity: 0,
        duration: 1.4,
        ease: "back.out(1.7)",
        stagger: 0.12,
      }, 0.35);
    }
    if (blurIns.length) {
      tl.from(blurIns, {
        opacity: 0,
        filter: "blur(25px)",
        scale: 1.15,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.1,
        clearProps: "filter",
      }, 0.25);
    }
    return tl;
  };

  const buildOutTimeline = (section: HTMLElement) => {
    const tl = gsap.timeline({ paused: true });
    const allElements = section.querySelectorAll(
      ".fade-up, .scale-in, .parallax, .slide-in, .rotate-in, .blur-in"
    );
    if (allElements.length) {
      tl.to(allElements, {
        opacity: 0,
        y: 0,
        scale: 1,
        filter: "blur(8px)",
        duration: 0.7,
        ease: "power3.in",
        stagger: 0.025,
        clearProps: "filter",
      }, 0);
    }
    return tl;
  };

  const emit = (name: string, detail: any) => {
    window.dispatchEvent(new CustomEvent(name, { detail }));
  };

  sections.forEach((sec, i) => {
    inTL.set(sec, buildInTimeline(sec));
    outTL.set(sec, buildOutTimeline(sec));
    sec.classList.toggle("is-active", i === 0);
    if (i === 0) {
      inTL.get(sec).restart();
      updateIconColors(sec);
    }
  });

  const first = sections[0];
  emit("sliderstart", {
    index: 0,
    direction: "forward",
    footerTitle: first?.dataset.footerTitle || "Reshaping Real Estate",
    footerCta: first?.dataset.footerCta || "Start Journey",
  });

  const activateSection = (index) => {
    sections.forEach((sec, i) => {
      sec.classList.toggle("is-active", i === index);
      if (i === index) {
        const tl = inTL.get(sec);
        if (tl) tl.restart();
        updateIconColors(sec);
      }
    });
  };

  const scrollToBoundary = (container, direction) => {
    if (!container) return;
    const targetScroll = direction === "forward" ? container.scrollHeight - container.clientHeight : 0;
    gsap.to(container, {
      scrollTop: targetScroll,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const goToSection = async (index, scrollDirection = null) => {
    if (index < 0 || index >= sections.length || isAnimating) return;
    isAnimating = true;

    const activeSection = sections[currentIndex];
    const verticalScrollable = activeSection.querySelector(".scrollable-container");

    if (verticalScrollable && scrollDirection) {
      const atBoundary = isAtScrollBoundary(verticalScrollable as HTMLElement, scrollDirection === "forward" ? 1 : -1);
      if (!atBoundary) {
        scrollToBoundary(verticalScrollable as HTMLElement, scrollDirection);
        setTimeout(() => {
          isAnimating = false;
        }, 500);
        return;
      }
    }

    const next = sections[index];
    const prev = sections[currentIndex];
    const prevIndex = currentIndex;
    const dir = index > prevIndex ? "forward" : "backward";
    const sectionKeys = Object.keys(SLIDE_NAV);
    const nextSectionKey = sectionKeys[index];
    const nextRoute = SLIDE_NAV[nextSectionKey]?.route;

    document.documentElement.classList.add(
      dir === "forward" ? "sliding-forward" : "sliding-backward"
    );

    const exitTL = outTL.get(prev);
    if (exitTL) exitTL.restart();

    const parallaxElements = prev.querySelectorAll(".parallax-bg");
    if (parallaxElements.length) {
      gsap.to(parallaxElements, {
        x: dir === "forward" ? -150 : 150,
        scale: 1.2,
        opacity: 0.6,
        duration: ANIM_DURATION,
        ease: "power3.inOut",
      });
    }

    await gsap.to(sections, {
      xPercent: -100 * index,
      duration: ANIM_DURATION,
      ease: "power3.inOut",
      onStart: () => {
        document.documentElement.classList.add("is-sliding");
        document.documentElement.style.setProperty("--slide-progress", "0");
        updateIconColors(next);
      },
      onUpdate: function () {
        const progress = this.progress();
        document.documentElement.style.setProperty("--slide-progress", String(progress));
        gsap.set(prev, { opacity: 1 - progress * 0.4 });
        gsap.set(next, { opacity: 0.6 + progress * 0.4 });
      },
      onComplete: () => {
        currentIndex = index;
        activateSection(index);
        document.querySelector("body")?.classList?.remove("active");

        switch (index) {
          case 1:
          case 4:
          case 7:
            document.querySelector("body")?.classList?.add("active");
            break;
        }

        const navConfig = [
          { prev: "Reshaping Real Estate", next: "Start Journey", footer: "remove" },
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
          document.querySelector(".prev_title").textContent = navConfig[index].prev;
          document.querySelector(".next_title").textContent = navConfig[index].next;
          if (navConfig[index].footer === "remove") {
            document.querySelector("footer")?.classList?.remove("change_style");
          } else {
            document.querySelector("footer")?.classList?.add("change_style");
          }
        }

        const borderLines = document.querySelectorAll(".border_line");
        if (borderLines.length) {
          gsap.fromTo(
            borderLines,
            { width: "0%", opacity: 0, transformOrigin: "left center" },
            { width: "100%", opacity: 1, duration: 3, ease: "power2.inOut", stagger: 0.15 }
          );
        }

        const borderButtons = document.querySelectorAll(".border_button");
        if (borderButtons.length) {
          gsap.fromTo(
            borderButtons,
            { width: "0%", opacity: 0, transformOrigin: "center center" },
            { width: "100%", opacity: 1, duration: 3, ease: "power3.inOut", stagger: 0.2, delay: 1 }
          );
        }

        const navTitles = document.querySelectorAll(".prev_title, .next_title");
        gsap.fromTo(
          navTitles,
          { opacity: 0, scale: 0.9, filter: "blur(5px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out", stagger: 0.12, clearProps: "all" }
        );

        const footerElements = next.querySelectorAll(".footer-content");
        if (footerElements.length) {
          gsap.fromTo(
            footerElements,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 1, ease: "power3.out", stagger: 0.18, clearProps: "all" }
          );
        }

        const activeSectionContent = next.querySelectorAll(".section-content");
        if (activeSectionContent.length) {
          gsap.fromTo(
            activeSectionContent,
            { scale: 0.96, opacity: 0.8, y: 20 },
            { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.08, clearProps: "all" }
          );
        }

        const navIndicators = document.querySelectorAll(".nav-indicator, .progress-bar");
        if (navIndicators.length) {
          gsap.fromTo(
            navIndicators,
            { scaleX: 0.7, opacity: 0.5 },
            { scaleX: 1, opacity: 1, duration: 0.7, ease: "elastic.out(1, 0.5)", clearProps: "all" }
          );
        }

        const prevArrow = document.querySelector(".prev_arrow");
        const nextArrow = document.querySelector(".next_arrow");

        if (prevArrow) {
          gsap.fromTo(
            prevArrow,
            { x: dir === "forward" ? -30 : 30, opacity: 0, scale: 0.8, rotation: dir === "forward" ? -15 : 15 },
            { x: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)", clearProps: "all" }
          );
        }

        if (nextArrow) {
          gsap.fromTo(
            nextArrow,
            { x: dir === "forward" ? 30 : -30, opacity: 0, scale: 0.8, rotation: dir === "forward" ? 15 : -15 },
            { x: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)", clearProps: "all" }
          );
        }

        gsap.set(sections, { opacity: 1 });

        emit("slidechange", {
          index,
          direction: dir,
          footerTitle: next?.dataset.footerTitle || "",
          footerCta: next?.dataset.footerCta || "",
        });
        setTimeout(() => {
          isAnimating = false;
          document.documentElement.classList.remove("is-sliding", "sliding-forward", "sliding-backward");
        }, COOLDOWN_MS);
      },
    });

    gsap.fromTo(
      next,
      { scale: 1.08 },
      { scale: 1, duration: ANIM_DURATION * 1.1, ease: "power3.out" }
    );
  };

  const getScrollableParent = (element) => {
    let el = element;
    const maxDepth = 10;
    let depth = 0;

    while (el && el !== document.body && depth < maxDepth) {
      const style = window.getComputedStyle(el);
      const overflowY = style.overflowY;
      const hasScroll = el.scrollHeight > el.clientHeight + 5;

      if ((overflowY === "auto" || overflowY === "scroll") && hasScroll) {
        return el;
      }
      el = el.parentElement;
      depth++;
    }
    return null;
  };

  const isAtScrollBoundary = (el: HTMLElement, deltaY: number, isHorizontal = false) => {
    if (!el) return true;
    const tolerance = 10;
    if (isHorizontal) {
      const scrollLeft = el.scrollLeft;
      const scrollWidth = el.scrollWidth;
      const clientWidth = el.clientWidth;
      return deltaY > 0 ? scrollLeft + clientWidth >= scrollWidth - tolerance : scrollLeft <= tolerance;
    } else {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
      const clientHeight = el.clientHeight;
      return deltaY > 0 ? scrollTop + clientHeight >= scrollHeight - tolerance : scrollTop <= tolerance;
    }
  };

  const normalizeDelta = (e) => {
    const base = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
    return e.deltaY * base;
  };

  let accum = 0;
  let wheelRAF = 0;
  let lastWheelTime = 0;
  let lastInputTime = 0;

  const onWheel = (e) => {
    e.preventDefault();
    if (isAnimating) return;

    const now = Date.now();
    if (now - lastInputTime < 50) return;
    lastInputTime = now;
    lastWheelTime = now;

    const activeSection = sections[currentIndex];
    const verticalScrollable = window.innerWidth > 991 ? activeSection?.querySelector(".scrollable-container[data-scroll='vertical']") : activeSection?.querySelector(".mob_scroll[data-scroll='vertical']");
    const horizontalScrollable = activeSection?.querySelector(".scrollable-container[data-scroll='horizontal']");
    const scrollContainer = verticalScrollable || horizontalScrollable || getScrollableParent(e.targset);
    const delta = normalizeDelta(e);

    if (scrollContainer) {
      const isHorizontal = horizontalScrollable && scrollContainer === horizontalScrollable;
      if (isHorizontal) {
        const currentScroll = scrollContainer.scrollLeft;
        const scrollAmount = delta > 0 ? currentScroll + 200 : currentScroll - 200;
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const clampedScroll = Math.max(0, Math.min(scrollAmount, maxScroll));
        gsap.to(scrollContainer, {
          scrollTo: { x: clampedScroll },
          duration: 0.5,
          ease: "power2.out",
        });
        const atBoundary = isAtScrollBoundary(scrollContainer, delta, true);
        if (!atBoundary) {
          accum = 0;
          return;
        }
      } else {
        const currentScroll = scrollContainer.scrollTop;
        const scrollAmount = delta > 0 ? currentScroll + 200 : currentScroll - 200;
        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const clampedScroll = Math.max(0, Math.min(scrollAmount, maxScroll));
        gsap.to(scrollContainer, {
          scrollTo: { y: clampedScroll },
          duration: 0.5,
          ease: "power2.out",
        });
        const atBoundary = isAtScrollBoundary(scrollContainer, delta, false);
        if (!atBoundary) {
          accum = 0;
          return;
        }
      }
    }
    if (now - lastWheelTime < 50) {
      accum += delta;
    } else {
      accum = delta;
    }
    if (!wheelRAF) {
      wheelRAF = requestAnimationFrame(() => {
        if (Math.abs(accum) >= 50) {
          const dir = accum > 0 ? 1 : -1;
          goToSection(currentIndex + dir, dir > 0 ? "forward" : "backward");
          accum = 0;
        }
        wheelRAF = 0;
      });
    }
  };

  const onKey = (e) => {
    if (isAnimating) return;
    const now = Date.now();
    if (now - lastInputTime < DEBOUNCE_MS) return;
    lastInputTime = now;

    const activeEl = document.activeElement as HTMLElement | null;
    const isInput = activeEl?.tagName === "INPUT" || activeEl?.tagName === "TEXTAREA" || (activeEl as HTMLElement)?.isContentEditable;
    if (isInput) return;

    const activeSection = sections[currentIndex];
    const verticalScrollable = activeSection.querySelector(".scrollable-container");
    const scrollContainer = verticalScrollable || getScrollableParent(activeEl);

    if (scrollContainer && !isAtScrollBoundary(scrollContainer, e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1)) {
      return;
    }

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      goToSection(currentIndex + 1, "forward");
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      goToSection(currentIndex - 1, "backward");
    }
  };

  let touchStartY = 0;
  let touchStartX = 0;
  let touchTarget = null;
  let hasMoved = false;

  const onTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
    touchTarget = e.target;
    hasMoved = false;
  };

  const onTouchMove = (e) => {
    if (isAnimating) {
      e.preventDefault();
      return;
    }
    const now = Date.now();
    if (now - lastInputTime < DEBOUNCE_MS) {
      e.preventDefault();
      return;
    }
    lastInputTime = now;

    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    const isHorizontalGesture = Math.abs(dx) > Math.abs(dy) * 1.5;

    const activeSection = sections[currentIndex];
    const verticalScrollable = activeSection.querySelector(".scrollable-container");
    const scrollContainer = verticalScrollable || getScrollableParent(touchTarget);

    if (!isHorizontalGesture && scrollContainer) {
      const atBoundary = isAtScrollBoundary(scrollContainer, dy);
      if (!atBoundary) return;
    }

    if (Math.abs(dy) > TOUCH_THRESH && !hasMoved) {
      e.preventDefault();
      hasMoved = true;
      goToSection(currentIndex + (dy < 0 ? 1 : -1), dy < 0 ? "forward" : "backward");
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

  // Cleanup event listeners on unmount
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
    updateTheme: () => updateIconColors(sections[currentIndex]),
    getCurrentSection: () => sections[currentIndex],
    getSectionByIndex: (index) => sections[index],
    isAnimating: () => isAnimating,
    cleanup,
  };
};