import React, { useContext } from "react";
import Image from "next/image";
import ScrollContext from "@/context/ScrollContext";
import { ArrowRight, MoveRight } from "lucide-react";

export default function LogoSection() {
  const { next } = useContext(ScrollContext);

  const handleNext = () => {
    next?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNext();
    }
  };

  return (
    <div className="container flex h-[90vh] pb-10 sm:pb-0 sm:h-full flex-col justify-between lg:px-0 lg:py-0 md:px-0 md:py-0  max-[480px]:px-6 max-[480px]:pt-2 max-[480px]:pb-8">
      {/* Logo / main visual area */}
      <figure className="mt-auto flex justify-center max-[480px]:flex-1 max-[480px]:items-center">
        <Image
          src="/assets/arqis-black.svg"
          className="logo-section no-view mx-auto w-[75%] object-contain max-[480px]:w-[82%] max-[480px]:max-w-[300px] lg:w-[40%]"
          width={300}
          height={300}
          alt="Reshaping Real Estate"
        />
      </figure>

      {/* Bottom section: title + divider + CTA */}
      <div className="z-[3] m-auto flex w-[90%] max-w-[52%] flex-col flex-wrap items-center gap-5 lg:max-w-[90%] lg:flex-row lg:items-end lg:justify-between max-[480px]:mx-0 max-[480px]:mb-0 max-[480px]:w-full max-[480px]:max-w-none max-[480px]:gap-4">

        {/* "THE ARC OF REAL ESTATE" — mobile shows this copy */}
        <h2
          className="prev_title parallax cursor-pointer text-center font-[200] uppercase leading-[1.6] pointer-events-auto text-[30px] lg:basis-[25%] lg:text-start lg:text-[40px] lg:leading-[1.1] max-[480px]:max-w-[260px] max-[480px]:text-[32px] max-[480px]:leading-[1.08] max-[480px]:tracking-[0.4px]"

        >
          {/* Desktop keeps "Reshaping Real Estate", mobile shows "THE ARC OF\nREAL ESTATE" */}
          <span className="hidden max-[480px]:block max-[480px]:leading-[1.2] max-[480px]:tracking-[5%] max-[480px]:text-[32px] max-[480px]:text-black max-[480px]:font-normal">
            THE ARC OF<br />REAL ESTATE
          </span>
          <span className="max-[480px]:hidden">
            Reshaping Real Estate
          </span>
        </h2>

        {/* Divider line */}
        <div className="border_line mobile-line parallax h-[20px] w-[0.8px] shrink-0 grow-0 basis-[50px] bg-[#000000] lg:mb-[20px] lg:h-[1px] lg:w-auto lg:flex-1 lg:basis-[auto] max-[480px]:h-[28px]" />

        {/* START JOURNEY CTA */}
        <div
          onClick={handleNext}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          className="next_text hidden md:flex  flex-wrap items-center justify-center gap-3 pointer-events-auto lg:justify-start max-[480px]:gap-2"
        >
          <h2
            className="next_title nextcontent parallax cursor-pointer text-center text-[18px] font-[300] uppercase tracking-[2px] lg:tracking-[normal] max-[480px]:text-[16px] max-[480px]:tracking-[1.6px]"

          >
            Start Journey
          </h2>
          <Image
            src="/assets/right_arrow.svg"
            className="nextcontent parallax ml-3 select-none max-[480px]:ml-1 max-[480px]:h-[18px] max-[480px]:w-[18px]"
            width={25}
            height={25}
            alt="arrow"
            draggable={false}
          />
        </div>
        <div
          onClick={handleNext}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          className="next_text flex md:hidden  flex-col  items-center  gap-2  pointer-events-auto lg:justify-start max-[480px]:gap-2"
        >
          <h2
            className="next_title nextcontent parallax cursor-pointer text-center text-[18px] font-[300] uppercase tracking-[2px] lg:tracking-[normal] max-[480px]:text-[16px] max-[480px]:tracking-[1.6px]"

          >
            Start Journey
          </h2>
          {/* <Image
            src="/assets/icons/right-arrow-black.svg"
            className="nextcontent parallax ml-3 select-none max-[480px]:ml-1 max-[480px]:h-[18px] max-[480px]:w-[18px]"
            width={25}
            height={25}
            alt="arrow"
            
          /> */}
          <MoveRight className="ml-3 select-none cursor-pointer max-[480px]:ml-1 max-[480px]:h-[18px] max-[480px]:w-[33px]" size={33} />
        </div>
      </div>
    </div>
  );
}