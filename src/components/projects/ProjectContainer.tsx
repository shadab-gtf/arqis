"use client";
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";
import CommonHeading from "@/utils/CommonHeading";
import Redirect_Link from "@/utils/Redirect_txt";

gsap.registerPlugin(ScrollToPlugin);

const projects = [
  {
    id: 1,
    image: "/assets/projects/project.webp",
    thumb: "/assets/projects/project.webp",
    title: "Arqis Mall",
    location: "sector 129 Noida",
    desc: "Our upcoming mall is designed to be a premier destination, offering a dynamic shopping and entertainment experience."
  },
  {
    id: 2,
    image: "/assets/projects/project1.webp",
    thumb: "/assets/projects/project1.webp",
    title: "Arqis Heights",
    location: "sector 129 Noida",
    desc: "Our upcoming mall is designed to be a premier destination, offering a dynamic shopping and entertainment experience."

  },
  {
    id: 3,
    image: "/assets/projects/project2.webp",
    thumb: "/assets/projects/project2.webp",
    title: "Arqis Business Park",
    location: "sector 129 Noida",
    desc: "Our upcoming mall is designed to be a premier destination, offering a dynamic shopping and entertainment experience."
  },
];
export default function ProjectContainer() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth * 0.9;

      gsap.to(scrollRef.current, {
        scrollTo: { x: cardWidth * index },
        duration: 0.8,
        ease: "power2.out",
      });

      setActiveIndex(index);
    }
  };

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

    let newIndex =
      direction === "next"
        ? Math.min(activeIndex + 1, projects.length - 1)
        : Math.max(activeIndex - 1, 0);

    scrollToIndex(newIndex);
  };

  return (
    <div className="parallax relative projects_container dark-section h-[100%] py-[80px] mx-auto max-h-[100vh] overflow-hidden">
      <div className='absolute z-1 top-0 bottom-0 right-0 top-0 bottom-0 h-full w-full'
        style={{ background: "url(/assets/cover-bg.png) no-repeat" }}
      />
      <div className="max-w-[80%] mx-auto overflow-hidden">
        <div
          ref={scrollRef}
          data-scroll="horizontal"
          className="flex lg:h-[349px] items-center scrollable-container overflow-x-scroll snap-x snap-mandatory relative z-2"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project_card grow-0 shrink-0 basis-[100%] text-white pr-[20px]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-[30px] items-center">

                {/* IMAGE */}
                <div className="lg:col-span-3">
                  <Image
                    className="h-[349px] w-full object-cover"
                    src={project.image}
                    width={1200}
                    height={300}
                    alt="projectimage"
                  />
                </div>

                {/* CONTENT */}
                <div className="lg:col-span-1 flex flex-col justify-between">
                  <div className="">
                    <CommonHeading
                      heading={project.title}
                      customClass="mb-0"
                    />
                    <span className="block uppercase">{project.location}</span>
                  </div>
                  <p className="opacity-80 font-light py-8">{project.desc.slice(0, 100)}{project.desc.length > 100 ? '...' : ''}</p>

                  <Redirect_Link
                    customClass="flex"
                    text="Explore More"
                    link=""
                  />
                </div>

              </div>
            </div>
          ))}
        </div>


        <div className="flex gap-10 mt-8 justify-between relative z-2">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => scrollToIndex(index)}
              className={`cursor-pointer transition-all duration-300 w-[30%]
            ${activeIndex === index
                  ? "opacity-100"
                  : "opacity-70"
                }`}
            >
              <Image
                src={project.thumb}
                width={320}
                height={100}
                alt="thumbnail"
                className="object-cover w-[100%] h-[100px]"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end lg:flex hidden lg:absolute z-2 lg:pr-1 pr-[30px] right-[12%] !bottom-[70px] py-[30px] gap-[20px] items-center">
          <Image
            src="/assets/icons/arrow_right.png"
            alt="Previous slide"
            width={25}
            height={25}
            className="cursor-pointer arrow slide-arr"
            onClick={() => scroll("prev")}
          />
          <Image
            src="/assets/icons/arrow_left.png"
            alt="Next slide"
            width={25}
            height={25}
            className="cursor-pointer arrow slide-arr rotate-[90deg]"
            onClick={() => scroll("next")}
          />
        </div>
      </div>
    </div>
  );
}


