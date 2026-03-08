"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";

gsap.registerPlugin(ScrollToPlugin);

const projects = [
  { id: 1, image: "/assets/microsite/amenities/amenities_1.webp", content: "Food & Dining" },
  { id: 2, image: "/assets/microsite/amenities/amenities_2.webp", content: "Entertainment Zone" },
  { id: 3, image: "/assets/microsite/amenities/amenities_1.webp", content: "Food & Dining " },
  { id: 4, image: "/assets/microsite/amenities/amenities_2.webp", content: "Entertainment Zone" },
  { id: 5, image: "/assets/microsite/amenities/amenities_1.webp", content: "Food & Dining " },
  { id: 6, image: "/assets/microsite/amenities/amenities_2.webp", content: "Entertainment Zone" },
];

export default function AmenitiesSec() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.9;
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll =
        direction === "next"
          ? currentScroll + scrollAmount
          : currentScroll - scrollAmount;

      gsap.to(scrollRef.current, {
        scrollTo: { x: targetScroll, autoKill: true },
        duration: 0.8,
        ease: "power2.out",
      });
    }
  };

  return (
    <div className="parallax relative projects_container pt-[40px]  mx-auto">
      <div
        ref={scrollRef}
        data-scroll="horizontal"
        className="flex    items-center scrollable-container  pl-[80px] overflow-x-scroll  snap-x snap-mandatory"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="  project_card  grow-0 shrink-0 basis-[60%] lg:basis-[50%] pr-[50px] gap-[10px] lg:gap-10"
          >
            <div className="relative">
              <Image
                src={project.image}
                alt=""
                className="w-full"
                height={500}
                width={500}
              />
              <div className="absolute w-[100%] z-[5] px-[25px] py-[20px] bottom-0">
                <a href="#" className="flex items-center justify-between">
                  <span className="inline-block me-2 text-[#fff] tracking-[3] text-[32px] font-[200] tracking-[1.1]">
                    {project.content}
                  </span>
                  <span className="h-[20px] w-[20px] border-[1px] bo  rder-[#fff] text-[#fff] rounded-[50%] inline-flex justify-center items-center">
                    +
                  </span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container">
        <div className="flex justify-start lg:flex hidden lg:pr-0 pr-[30px] pt-[30px] gap-[20px] items-center">
          <Image
            src="/assets/icons/arrow_right.png"
            alt="Previous slide"
            width={25}
            height={25}
            className="cursor-pointer arrow"
            onClick={() => scroll("prev")}
          />
          <Image
            src="/assets/icons/arrow_left.png"
            alt="Next slide"
            width={25}
            height={25}
            className="cursor-pointer arrow"
            onClick={() => scroll("next")}
          />
        </div>
      </div>
    </div>
  );
}
