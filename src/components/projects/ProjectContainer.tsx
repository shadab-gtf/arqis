"use client";
import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";
import CommonHeading from "@/utils/CommonHeading";
import Redirect_Link from "@/utils/Redirect_txt";
import { MapPin } from "lucide-react";

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
    desc: "Our upcoming mall is designed to be a premier destination, offering a dynamic shopping and entertainment experience. "
  },
];
export default function ProjectContainer() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current && index >= 0 && index < projects.length) {
      const cardWidth = scrollRef.current.offsetWidth * 0.9;
      gsap.to(scrollRef.current, {
        scrollTo: { x: cardWidth * index - scrollRef.current.offsetWidth * 0.05 },
        duration: 1.2,
        ease: "power4.inOut",
        overwrite: "auto"
      });
      setActiveIndex(index);
    }
  };

  const isAnimating = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isAnimating.current) return;

      if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
        isAnimating.current = true;
        const direction = e.deltaY > 0 || e.deltaX > 0 ? 1 : -1;
        const newIndex = Math.max(0, Math.min(projects.length - 1, activeIndex + direction));

        scrollToIndex(newIndex);

        setTimeout(() => {
          isAnimating.current = false;
        }, 1200);
      }
    };

    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;

      const touchEndX = e.touches[0].clientX;
      const diffX = touchStartX - touchEndX;

      if (Math.abs(diffX) > 50) {
        isAnimating.current = true;
        const direction = diffX > 0 ? 1 : -1;
        const newIndex = Math.max(0, Math.min(projects.length - 1, activeIndex + direction));

        scrollToIndex(newIndex);

        setTimeout(() => {
          isAnimating.current = false;
        }, 1200);
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activeIndex]);

  return (
    <div className="parallax relative projects_container dark-section h-[100%] py-[80px] mx-auto max-h-[100vh] overflow-hidden">
      <div className='absolute z-1 inset-0 h-full w-full'
        style={{
          backgroundImage: "url(/assets/cover-bg.png)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <div className="container mx-auto overflow-hidden">
        <div
          ref={scrollRef}
          data-scroll="horizontal"
          className="flex lg:h-[450px] items-center scrollable-container overflow-x-auto relative z-2"
          style={{ scrollBehavior: 'smooth' }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project_card flex-shrink-0 w-full text-white pr-[20px]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-[30px] items-center">

                {/* IMAGE */}
                <div className="lg:col-span-3">
                  <Image
                    className="h-[388px] w-full object-cover"
                    src={project.image}
                    width={1100}
                    height={388}
                    alt="projectimage"
                  />
                </div>

                {/* CONTENT */}
                <div className="lg:col-span-1 flex flex-col justify-between">
                  <div className="">
                    <CommonHeading
                      heading={project.title}
                      customClass="mb-0 text-[52px]! tracking-[-2px]!"
                    />
                    <div className="flex items-center gap-4">
                      <MapPin className="w-6 h-6" />
                      <span className="block  font-normal text-xl">{project.location}</span>
                    </div>
                  </div>
                  <p className="opacity-80 font-light text-lg py-8">{project.desc.slice(0, 120)}{project.desc.length > 120 ? '...' : ''}</p>

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
              className={`cursor-pointer transition-all duration-300 
            ${activeIndex === index
                  ? "opacity-100"
                  : "opacity-70"
                }`}
            >
              <Image
                src={project.thumb}
                width={450}
                height={120}
                alt="thumbnail"
                className="object-cover w-[450px] h-[120px]"
              />
            </div>
          ))}
        </div>
        {/* arrow but not needed */}
      </div>
    </div>
  );
}

{/* <div className="flex justify-end lg:flex hidden lg:absolute z-2 lg:pr-1 pr-[30px] right-[12%] !bottom-[70px] py-[30px] gap-[20px] items-center">
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
</div> */}

