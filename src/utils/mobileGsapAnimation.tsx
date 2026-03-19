import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const SLIDE_NAV = {
  home: { prev: "Reshaping Real Estate", next: "Start Journey", route: "/" },
  philosophy: { prev: "Philosophy", next: "Projects", route: "/philosophy" },
  projects: { prev: "Projects", next: "Our Team", route: "/projects" },
  ourTeam: { prev: "Our Team", next: "Careers", route: "/our-team" },
  career: { prev: "Careers", next: "Media", route: "/career" },
  media: { prev: "Media", next: "Blogs", route: "/media" },
  blogs: { prev: "Blogs", next: "Contact", route: "/blogs" },
  contact: { prev: "Contact", next: "Quick Links", route: "/contact" },
  quickLink: { prev: "Quick Links", next: "The End", route: "/quick-link" },
};

export default function initScrollSmoother(router: any) {
  const canPushRoute = typeof router?.push === "function";

  const sections = gsap.utils.toArray<HTMLElement>(".horizontal-section .item");
  if (!sections.length) return { cleanup: () => {} };

  const getInitialIndex = () => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash === "#blogs") return 6;
    }
    return 0;
  };

  const initialIndex = getInitialIndex();
  let currentIndex = 0;
  let isAnimating = false;

  const CONFIG = {
    ANIM_DURATION: 1.1,
  };

  const applyLogoVisibilityForSection = (index: number) => {
    document.body.classList.remove("extra-active");
    document.body.classList.toggle("hero-active", index === 0);
  };

  const shouldDelayLogoReveal = (fromIndex: number, toIndex: number) =>
    fromIndex === 0 && toIndex === 1;

  const shouldHideLogoImmediately = (fromIndex: number, toIndex: number) =>
    fromIndex === 1 && toIndex === 0;

  const isDarkSection = (section: HTMLElement) =>
    section?.dataset.theme === "dark" ||
    section?.classList.contains("dark-bg") ||
    section?.classList.contains("bg-dark");

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

  const inTL = new WeakMap();
  const outTL = new WeakMap();

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

  const goToSection = async (index: number, scrollDirection: string | null = null) => {
    if (index < 0 || index >= sections.length || isAnimating) return;
    isAnimating = true;
    const previousIndex = currentIndex;
    const delayLogoRevealUntilComplete = shouldDelayLogoReveal(
      previousIndex,
      index
    );

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
    const nextRoute = SLIDE_NAV[nextSectionKey as keyof typeof SLIDE_NAV]?.route;

    document.documentElement.classList.add(`sliding-${dir}`);
    outTL.get(prev)?.play();

    const scrollContainer = document.querySelector(".horizontal-section");
    const maxScroll =
      (scrollContainer as HTMLElement).scrollWidth -
      (scrollContainer as HTMLElement).clientWidth;
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
          String(this.progress())
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
          const prevTitle = document.querySelector(".prev_title");
          const nextTitle = document.querySelector(".next_title");
          if (prevTitle) prevTitle.textContent = navConfig[index].prev;
          if (nextTitle) nextTitle.textContent = navConfig[index].next;
        }

        emit("slidechange", {
          index,
          direction: dir,
          footerTitle: next?.dataset.footerTitle || "",
          footerCta: next?.dataset.footerCta || "",
        });

        if (canPushRoute && nextRoute) {
          router.push(nextRoute);
        }

        setTimeout(() => {
          isAnimating = false;
          document.documentElement.classList.remove(
            "is-sliding",
            `sliding-${dir}`
          );
        }, 100);
      },
    });
  };

  if (initialIndex > 0) {
    setTimeout(() => {
      const originalDuration = CONFIG.ANIM_DURATION;
      CONFIG.ANIM_DURATION = 0.01;
      goToSection(initialIndex, "forward").then(() => {
        CONFIG.ANIM_DURATION = originalDuration;
      });
    }, 100);
  }

  const cleanup = () => {
    gsap.killTweensOf(sections);
  };

  return {
    goTo: goToSection,
    next: () => goToSection(currentIndex + 1, "forward"),
    prev: () => goToSection(currentIndex - 1, "backward"),
    getCurrentIndex: () => currentIndex,
    getSectionsCount: () => sections.length,
    updateTheme: () => updateTheme(sections[currentIndex]),
    getCurrentSection: () => sections[currentIndex],
    getSectionByIndex: (index: number) => sections[index],
    isAnimating: () => isAnimating,
    cleanup,
  };
}
