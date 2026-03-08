import React, { useContext } from "react";
import Image from "next/image";
import ScrollContext from "@/context/ScrollContext";

export default function LogoSection() {
  const { next, prev } = useContext(ScrollContext)

  return (
    <div className="container flex flex-col  justify-between   h-[100%]">
      <figure className="mt-auto">
        <Image
          src="/assets/logo.png"
          className="w-[75%] lg:w-[40%] no-view mx-[auto]  logo-section object-contain"
          width={300}
          height={300}
          alt="Reshaping Real Estate"
        />
      </figure>

      <div className="flex-wrap z-[3]  lg:max-w-[90%] m-[auto] max-w-[52%] w-[90%] flex lg:flex-row flex-col gap-5 items-center lg:items-end lg:justify-between bottom-10">
        <h2 className="uppercase  parallax   lg:text-start text-center cursor-pointer prev_title lg:basis-[25%] font-[200] text-[30px] lg:text-[40px] lg:leading-[1.1] leading-[1.6] pointer-events-auto">
          Reshaping Real Estate
        </h2>
        <div className="border_line grow-0 shrink-0 lg:basis-[auto] basis-[50px] parallax lg:flex-1 flex-[auto] lg:w-[auto] w-[0.8px] h-[20px] mb-0 lg:mb-[20px] lg:h-[1px]" />
        <div className="flex flex-wrap lg:justify-start justify-center   next_text gap-3 mb-0 lg:mb-[10px] items-center pointer-events-auto">
          <h2 onClick={next} className="uppercase cursor-pointer font-[300] lg:tracking-[normal] tracking-[1.4] nextcontent text-center parallax next_title text-[18px] tracking-[2px]">
            Start Journey
          </h2>
          <Image
            onClick={next}
            src="/assets/right_arrow.svg"
            className="ml-3 nextcontent parallax select-none"
            width="25"
            height="25"
            alt="arrow"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}
