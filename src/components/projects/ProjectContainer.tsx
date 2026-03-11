"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import CommonHeading from "@/utils/CommonHeading";
import Redirect_Link from "@/utils/Redirect_txt";
import { MapPin } from "lucide-react";

type Project = {
  id: number;
  image: string;
  thumb: string;
  title: string;
  location: string;
  desc: string;
};

const projects: Project[] = [
  {
    id: 1,
    image: "/assets/projects/mall.jpg",
    thumb: "/assets/projects/mall.jpg",
    title: "Arqis Mall",
    location: "Sector 129, Noida",
    desc: "Our upcoming mall is designed to be a premier destination, offering a dynamic shopping and entertainment experience.",
  },
  {
    id: 2,
    image: "/assets/projects/vipnamah.jpg",
    thumb: "/assets/projects/vipnamah.jpg",
    title: "VVIP Namah",
    location: "Aditya World City, NH-24, GZB",
    desc: "VVIP Namah redefines luxury with meticulously crafted residences, offering unmatched elegance, comfort, and sophistication in a prime location, blending design with timeless appeal for a prestigious lifestyle.",
  },
  {
    id: 3,
    image: "/assets/projects/trident.jpg",
    thumb: "/assets/projects/trident.jpg",
    title: "Trident Embassy",
    location: "Sector 1, Bisrakh , Greater Noida",
    desc: "Trident Embassy offers luxurious residences with cutting-edge design and world-class amenities, blending elegance and convenience in a prime location for an exceptional living experience.",
  },
  {
    id: 4,
    image: "/assets/projects/rajbagh.jpg",
    thumb: "/assets/projects/rajbagh.jpg",
    title: "Raj Bagh",
    location: "GT Road Raj Bagh Ghaziabad",
    desc: "Our upcoming project at GT Road, Raj Bagh, Ghaziabad is set to become a landmark destination, offering a vibrant mix of shopping, dining, and entertainment.",
  },
];

export default function ProjectContainer() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const isAnimating = useRef(false);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const clampIndex = (index: number) => {
    return Math.max(0, Math.min(projects.length - 1, index));
  };

  const goToSlide = (index: number) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return;
    }

    const nextIndex = clampIndex(index);
    const slideWidth = viewport.offsetWidth;

    isAnimating.current = true;
    setActiveIndex(nextIndex);

    gsap.to(track, {
      x: -slideWidth * nextIndex,
      duration: 0.2,
      ease: "none",
      overwrite: "auto",
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    if (unlockTimerRef.current) {
      clearTimeout(unlockTimerRef.current);
    }

    unlockTimerRef.current = setTimeout(() => {
      isAnimating.current = false;
    }, 250);
  };

  useEffect(() => {
    const handleResize = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;

      if (!track || !viewport) {
        return;
      }

      gsap.set(track, { x: -viewport.offsetWidth * activeIndex });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex]);

  useEffect(() => {
    const activeSlide = slideRefs.current[activeIndex];

    if (!activeSlide) {
      return;
    }

    const image = activeSlide.querySelector(".project-card-image");
    const content = activeSlide.querySelector(".project-card-content");
    const title = activeSlide.querySelector(".project-card-title");
    const location = activeSlide.querySelector(".project-card-location");
    const description = activeSlide.querySelector(".project-card-description");
    const cta = activeSlide.querySelector(".project-card-cta");

    gsap.killTweensOf([image, content, title, location, description, cta]);

    gsap.fromTo(
      image,
      { scale: 1.06, autoAlpha: 0.7 },
      { scale: 1, autoAlpha: 1, duration: 0.9, ease: "power3.out" }
    );

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline.fromTo(
      content,
      { autoAlpha: 0.4 },
      { autoAlpha: 1, duration: 0.25 }
    );

    timeline.fromTo(
      [title, location, description, cta],
      { y: 28, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.1 },
      0
    );
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (unlockTimerRef.current) {
        clearTimeout(unlockTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="parallax relative projects_container dark-section h-full py-[80px]  mx-auto overflow-hidden">
      <div
        className="absolute z-1 inset-0 h-full w-full"
        style={{
          backgroundImage: "url(/assets/cover-bg.png)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <div className="container mx-auto relative  z-2">
        <div
         
          data-scroll="horizontal"
          className="scrollable-container overflow-hidden"
        >
          <div ref={trackRef} className="flex will-change-transform mt-8">
            {projects.map((project, index) => (
              <article
                key={project.id}
                ref={(element) => {
                  slideRefs.current[index] = element;
                }}
                className="project_card w-full shrink-0 text-white"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-[30px] items-center">
                  <div className="lg:col-span-3 overflow-hidden">
                    <Image
                      className="project-card-image h-[320px] md:h-[400px] w-full object-cover"
                      src={project.image}
                      width={1100}
                      height={400}
                      alt={project.title}
                      priority={project.id === 1}
                    />
                  </div>

                  <div className="project-card-content lg:col-span-1 flex min-h-[280px] flex-col justify-between">
                    <div>
                      <CommonHeading
                        heading={project.title}
                        customClass="project-card-title mb-0 !text-[32px] uppercase lg:!text-[40px] tt-light !tracking-[1px]"
                      />
                      <div className="project-card-location mt-4 flex items-center gap-3">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="block text-sm  font-light  tracking-[1px]">
                          {project.location}
                        </span>
                      </div>
                    </div>

                    <p className="project-card-description py-6  text-sm  font-light opacity-80">
                      {project.desc}
                    </p>

                    <Redirect_Link
                      customClass="project-card-cta flex"
                      text="Explore More"
                      link=""
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6" ref={viewportRef}>
          {projects.map((project, index) => (
            <button 
            
              key={project.id}
              type="button"
              onClick={() => goToSlide(index)}
              className={`group relative overflow-hidden transition-all duration-300 ${
                activeIndex === index ? "opacity-100" : "opacity-65 hover:opacity-90"
              }`}
            >
              <Image
                src={project.thumb}
                width={450}
                height={120}
                alt={`${project.title} thumbnail`}
                className="h-[110px] w-full object-cover lg:h-[120px]"
              />
              <div
                className={`absolute inset-0 border transition-colors duration-300 ${
                  activeIndex === index ? "border-none" : "border-none"
                }`}
              />
            
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
