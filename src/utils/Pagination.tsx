"use client";

import React, { useContext } from "react";
import Image from "next/image";
import ScrollContext from "../context/ScrollContext";

type PaginationProps = {
  navVal: string;
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
};

export default function Pagination({ navVal }: PaginationProps) {
  const { gotoFn, next } = useContext(ScrollContext) as ScrollContextValue;

  const handleNavigation = () => {
    const targetIndex = SECTION_INDEX_MAP[navVal];

    if (typeof targetIndex === "number" && gotoFn) {
      gotoFn(targetIndex);
      return;
    }

    next?.();
  };

  return (
    <button
      type="button"
      onClick={handleNavigation}
      className="w-full pagination cursor-pointer border-[1px] border-[#ffffff4d] bg-[var(--primary-green-color)] py-[20px]"
    >
      <div className="container text-center">
        <span className="uppercase next-text text-white text-[14px] tracking-[2.5]">
          Next Page
        </span>
        <h4 className="mt-[10px] mb-[10px] next-heading uppercase text-[20px] font-[400] tracking-[5] text-white">
          {navVal}
        </h4>
        <Image
          src="/assets/icons/arrow-white.svg"
          width={34}
          height={34}
          className="m-auto next-arrow"
          alt="Arrow White"
        />
      </div>
    </button>
  );
}
