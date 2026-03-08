"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";
import ProjectImage from "./ProjectImage";
import ProjectContent from "./projectContent";
import Redirect_Link from "@/utils/Redirect_txt";

gsap.registerPlugin(ScrollToPlugin);

const projects = [
  { id: 1, image: <ProjectImage />, content: <ProjectContent /> },
  { id: 2, image: <ProjectImage />, content: <ProjectContent /> },
  { id: 3, image: <ProjectImage />, content: <ProjectContent /> },
];

export default function ProjectContainer() {
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
    <div className="parallax relative projects_container h-[100%] py-[60px] mx-auto">
      <div
        ref={scrollRef}
        data-scroll="horizontal"
        className="flex pl-[15px] lg:pl-[80px]   items-center scrollable-container overflow-x-scroll h-full snap-x snap-mandatory"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="grid  project_card grid-col-1 lg:grid-cols-4 grow-0 shrink-0 basis-[90%] lg:basis-[80%] pr-[50px] gap-[10px] lg:gap-10"
          >
            <div className="col-span lg:col-span-3">{project.image}</div>
            <div className="col-span lg:col-span-1">{project.content}</div>
          </div>
        ))}
      </div>
      <div className="container">
        <Redirect_Link
          customClass={`mt-[50px]  lg:hidden flex text-black `}
          text={`Explore  Project`}
          link={``}
        />
      </div>
      <div className="flex justify-end lg:flex hidden lg:absolute lg:pr-0 pr-[30px] right-[72px] !bottom-[70px] py-[30px] gap-[20px] items-center">
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
  );
}
