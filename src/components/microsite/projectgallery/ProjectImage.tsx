"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";
import DragComponent from "@/utils/DragComponent";
gsap.registerPlugin(ScrollToPlugin);

const projects = [
  {
    id: 1,
    image: "/assets/microsite/projectgallery/gallery_1.jpg",
    content: "",
  },
  {
    id: 2,
    image: "/assets/microsite/projectgallery/gallery_2.jpg",
    content: "",
  },
  {
    id: 3,
    image: "/assets/microsite/projectgallery/gallery_1.jpg",
    content: "",
  },
  {
    id: 4,
    image: "/assets/microsite/projectgallery/gallery_2.jpg",
    content: "",
  },
  {
    id: 5,
    image: "/assets/microsite/projectgallery/gallery_1.jpg",
    content: "",
  },
  {
    id: 6,
    image: "/assets/microsite/projectgallery/gallery_2.jpg",
    content: "",
  },
];

export default function ProjectImage() {
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
        className="flex  fadeEffect   items-center scrollable-container overflow-x-scroll  snap-x snap-mandatory"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="  project_card grow-0 shrink-0 basis-[60%] lg:basis-[40%] pr-[50px] gap-[10px] lg:gap-10"
          >
            <Image
              src={project.image}
              alt=""
              className="w-full"
              height={500}
              width={500}
            />
            <div className="absolute">{project.content}</div>
          </div>
        ))}
      </div>
      <div className="">
        <div className="flex gallery_project_st justify-between">
          <div className="flex grow-1 shrink-1  items-center gap-[10px] mt-[50px]">
            <p className="uppercase text-[#113120] tracking-[1.3]">
              Scroll to explore
            </p>
            <div className="basis-[30%]">
            <DragComponent scrollableRef={scrollRef} hideDragtxt={true} axis={'x'}/>
            </div>
            <span className="uppercase text-[#113120] tracking-[1.3]">
              15 PHOTOS
            </span>
          </div>
          <div className="flex justify-start z-[99] lg:flex hidden lg:pr-0 pr-[30px] pt-[30px] gap-[20px] items-center">
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
    </div>
  );
}
