"use client";
import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { useParams } from "next/navigation";
import ScrollContext from "@/context/ScrollContext";

const DESKTOP_NAV = [
  { title: "Reshaping Real Estate", cta: "Start Journey" },
  { title: "About Us", cta: "Projects" },
  { title: "Projects", cta: "Media" },
  { title: "Media", cta: "Blog" },
  { title: "Blog", cta: "Career" },
  { title: "Careers", cta: "Team" },
  { title: "Team", cta: "Contact" },
  { title: "Contact", cta: "Quick Links" },
  { title: "Quick Links", cta: "The End" },
];

const MICROSITE_NAV = [
  { title: "Arqis Mall", cta: "Overview" },
  { title: "Overview", cta: "Amenities" },
  { title: "Amenities", cta: "Highlights" },
  { title: "Highlights", cta: "Brand Partners" },
  { title: "Brand Partners", cta: "Floor Plan" },
  { title: "Floor Plan", cta: "Location" },
  { title: "Location", cta: "Gallery" },
  { title: "Gallery", cta: "Contact us" },
  { title: "Contact us", cta: "quick links" },
  { title: "Quick Links", cta: "The End" },
];

const getDesktopLineColors = (index: number) => {
  if ([1, 4, 5, 6, 7].includes(index)) {
    return { left: "#113120", right: "#FFFFFF" };
  }

  if ([2, 3].includes(index)) {
    return { left: "#FFFFFF", right: "#FFFFFF" };
  }

  if (index === 8) {
    return { left: "#113120", right: "#113120" };
  }

  return { left: "#FFFFFF", right: "#FFFFFF" };
};

const Footer = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { next, prev } = useContext(ScrollContext);
  const params = useParams();
  const microsite = params?.microsite;
  const isMicrosite = !!microsite;
  const navConfig = isMicrosite ? MICROSITE_NAV : DESKTOP_NAV;
  const activeNav = navConfig[currentIndex] ?? navConfig[0];
  const lineColors = isMicrosite ? null : getDesktopLineColors(currentIndex);
  const showChangeStyle = isMicrosite || currentIndex > 0;
  const isLogoSection = !isMicrosite && currentIndex === 0;
  const titleClassName = isLogoSection
    ? "capitalize whitespace-nowrap parallax lg:text-start text-center cursor-pointer prev_title lg:basis-[25%] shrink-0 font-[200] text-[30px] lg:text-[30px] tracking-[1px] leading-[1.4] pointer-events-auto"
    : "uppercase parallax lg:text-start text-center cursor-pointer prev_title shrink-0 font-[400] text-[18px] lg:text-[18px] lg:leading-[1.4] leading-[1.6] lg:tracking-[4px] pointer-events-auto";

  useEffect(() => {
    setIsClient(true);

    const handleSlideChange = (event: Event) => {
      const detail = (event as CustomEvent<{ index?: number }>).detail;
      if (typeof detail?.index === "number") {
        setCurrentIndex(detail.index);
      }
    };

    window.addEventListener("slidechange", handleSlideChange);
    window.addEventListener("sliderstart", handleSlideChange);

    return () => {
      window.removeEventListener("slidechange", handleSlideChange);
      window.removeEventListener("sliderstart", handleSlideChange);
    };
  }, []);

  if (!isClient) return null;
  const portalEl = typeof document !== "undefined" ? document.getElementById("footer-portal") : null;
  if (!portalEl) return null;
  return ReactDOM.createPortal(
    <>
      <footer
        className={`fixed z-[3] large-desktop w-full px-17 lg:px-16 left-1/2 -translate-x-1/2 flex lg:flex-row flex-col gap-5 lg:gap-0 items-center lg:items-center bottom-5 lg:bottom-10 ${showChangeStyle ? "change_style" : ""}`}
      >
        <div className="flex w-full lg:w-1/2 min-w-0 items-center justify-center lg:justify-start gap-4 lg:gap-10">
          <h2 onClick={() => prev?.()} className={titleClassName}>
            {activeNav.title}
          </h2>
          <div
            className="border_line parallax flex-1 min-w-0 lg:h-[1px] h-[0.8px]"
            style={lineColors ? { backgroundColor: lineColors.left } : undefined}
          />
        </div>
        <div
          className="flex w-full lg:w-1/2 min-w-0 items-center justify-center lg:justify-end gap-4 lg:gap-10"
        >
          <div
            className="border_line parallax flex-1 min-w-0 lg:h-[1px] h-[0.8px]"
            style={lineColors ? { backgroundColor: lineColors.right } : undefined}
          />
          <div onClick={() => next?.()} className="flex flex-nowrap justify-center lg:justify-end next_text gap-3 items-center pointer-events-auto shrink-0">
            <h2 className="uppercase cursor-pointer font-[300] lg:tracking-[normal] tracking-[1.4] nextcontent text-center parallax next_title text-[18px] whitespace-nowrap">
              {activeNav.cta}
            </h2>
            <Image
              src="/assets/right_arrow.svg"
              className="ml-3 nextcontent parallax select-none"
              width={25}
              height={25}
              alt="arrow"
              draggable="false"
            />
          </div>
        </div>
      </footer>
    </>,
    portalEl
  );
};

export default Footer;
