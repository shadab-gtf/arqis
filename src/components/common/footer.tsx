"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useContext } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import ScrollContext from "@/context/ScrollContext";
const Footer = () => {
  const [isClient, setIsClient] = useState(false);
  const { next, prev } = useContext(ScrollContext);
  const footerRef = useRef(null);
  const arrowRef = useRef(null);
  const titleRef = useRef(null);
  const ctaRef = useRef(null);
  const lineRef = useRef(null);
  const params = useParams();
  const microsite = params?.microsite;
  const isMicrosite = !!microsite;
  const title = isMicrosite ? "Arqis Mall" : "Reshaping Real Estate";
  const cta = isMicrosite ? "Overview" : "Start Journey";

  useEffect(() => setIsClient(true), []);
  if (!isClient) return null;
  const portalEl = typeof document !== "undefined" ? document.getElementById("footer-portal") : null;
  if (!portalEl) return null;
  return ReactDOM.createPortal(
    <>
      <footer
        ref={footerRef}
        className={`fixed flex-wrap z-[3] w-full px-17 2xl:px-16 left-1/2 -translate-x-1/2 flex lg:flex-row flex-col gap-5 items-center lg:items-end lg:justify-between bottom-5 2xl:bottom-10 ${isMicrosite ? "change_style" : ""}`}
      >
        <h2
          ref={titleRef}
          onClick={() => prev()}
          className="uppercase parallax lg:text-start text-center cursor-pointer prev_title lg:basis-[25%] font-[200] text-[30px] lg:text-[40px] lg:leading-[1.1] leading-[1.6] pointer-events-auto"
        >
          {title}
        </h2>
        <div
          ref={lineRef}
          className="border_line grow-0 shrink-0 lg:basis-[auto] basis-[50px] parallax lg:flex-1 flex-[auto] lg:w-[auto] w-[0.8px] h-[20px] mb-0 lg:mb-[20px] lg:h-[1px]"
        />
        <div onClick={() => next()} className="flex flex-wrap lg:justify-start justify-center next_text gap-3 mb-0 lg:mb-[10px] items-center pointer-events-auto">
          <h2 className="uppercase cursor-pointer font-[300] lg:tracking-[normal] tracking-[1.4] nextcontent text-center parallax next_title text-[18px] " ref={ctaRef}>
            {cta}
          </h2>
          <Image
            ref={arrowRef}
            src="/assets/right_arrow.svg"
            className="ml-3 nextcontent parallax select-none"
            width="25"
            height="25"
            alt="arrow"
            draggable="false"
          />
        </div>
      </footer>
    </>,
    portalEl
  );
};

export default Footer;