"use client";
import React, { useContext } from "react";
import Image from "next/image";
import ScrollContext from "@/context/ScrollContext";
import { MoveRight } from "lucide-react";

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
    <div className="container relative h-[100vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-[-1]"
      >
        <source src="/assets/mobilehero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      < div
        onClick={handleNext}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        className="next_text flex md:hidden absolute bottom-[55px] flex-col items-center gap-2 pointer-events-auto lg:justify-start max-[480px]:gap-2"
      >
        <h2 className=" text-white  cursor-pointer text-center text-[22px] font-[400] tracking-[2px] lg:tracking-[normal] max-[480px]:text-[22px] max-[480px]:tracking-[1.6px] pb-2">
          Reshaping Real Estate
        </h2>
        <h2 className=" text-white parallax cursor-pointer text-center text-[18px] font-[300] uppercase tracking-[2px] lg:tracking-[normal] max-[480px]:text-[16px] max-[480px]:tracking-[1.6px]">
          Start Journey 
          <Image alt="Arrow White" loading="lazy" width="34" height="34" decoding="async" data-nimg="1" className="m-auto next-arrow" src="/assets/icons/arrow-white.svg" />
        </h2>
      </div>
    </div >
  );
}