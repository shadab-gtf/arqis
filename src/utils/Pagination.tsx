"use client";

import React, { useContext } from "react";
import Image from "next/image";
import ScrollContext from "../context/ScrollContext";

type PaginationProps = {
  navVal: string;
};

const CURRENT_PAGE_MAP: Record<string, string> = {
  Projects: "About",
  "Our Team": "Projects",
  Career: "Our Team",
  Media: "Career",
  Blogs: "Media",
  Contact: "Blogs",
};

const SECTION_INDEX_MAP: Record<string, number> = {
  Projects: 2,
  "Our Team": 3,
  Career: 4,
  Media: 5,
  Blogs: 6,
  Contact: 7,
};

type ScrollContextValue = {
  gotoFn?: (index: number) => void;
  next?: () => void;
  prev?: () => void;
};

export default function Pagination({ navVal }: PaginationProps) {
  const { gotoFn, next, prev } = useContext(ScrollContext) as ScrollContextValue;

  const handleNavigation = () => {
    const targetIndex = SECTION_INDEX_MAP[navVal];

    if (typeof targetIndex === "number" && gotoFn) {
      gotoFn(targetIndex);
      return;
    }

    next?.();
  };
const handleNext = () => {
  const targetIndex = SECTION_INDEX_MAP[navVal];

  if (typeof targetIndex === "number" && gotoFn) {
    gotoFn(targetIndex);
  } else {
    next?.();
  }
};

const handlePrev = () => {
  prev?.();
};
  return (
     <div className="w-full grid grid-cols-3">
        <button
      type="button"
      onClick={handlePrev}
      className="w-full cursor-pointer border-[1px] border-r-0 border-[#ffffff4d] bg-[var(--primary-green-color)] py-[20px]"
    >
      <div className="container text-center">
        <span className="uppercase text-white text-[14px] tracking-[2.5]">
          Previous
        </span>
        <Image
          src="/assets/icons/arrow-white.svg"
          width={34}
          height={34}
          className="m-auto rotate-180"
          alt="Prev Arrow"
        />
      </div>
    </button>
        <button
      type="button"
      className="w-full cursor-pointer border-[1px] border-r-0 border-l-0 border-[#ffffff4d] bg-[var(--primary-green-color)] py-[20px]"
    >
      <div className="container text-center">
        <span className="uppercase text-white text-[14px] tracking-[2.5]">
          {CURRENT_PAGE_MAP[navVal] }
        </span>
       
      </div>
    </button>
     <button
      type="button"
      onClick={handleNavigation}
      className="w-full pagination cursor-pointer border-l-0 border-[1px] border-[#ffffff4d] bg-[var(--primary-green-color)] py-[20px]"
    >
      <div className="container text-center">
        <span className="uppercase next-text text-white text-[14px] tracking-[2.5]">
          Next
        </span>
       
        <Image
          src="/assets/icons/arrow-white.svg"
          width={34}
          height={34}
          className="m-auto next-arrow"
          alt="Arrow White"
        />
      </div>
    </button>
    </div>
   
  );
}
