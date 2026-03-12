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
    desc: "VVIP Namah redefines luxury with meticulously crafted residences, offering unmatched elegance.",
  },
  {
    id: 3,
    image: "/assets/projects/trident.jpg",
    thumb: "/assets/projects/trident.jpg",
    title: "Trident Embassy",
    location: "Sector 1, Bisrakh , Greater Noida",
    desc: "Trident Embassy offers luxurious residences with cutting-edge design and world-class amenities.",
  },
  {
    id: 4,
    image: "/assets/projects/rajbagh.jpg",
    thumb: "/assets/projects/rajbagh.jpg",
    title: "Raj Bagh",
    location: "GT Road Raj Bagh Ghaziabad",
    desc: "Our upcoming project at GT Road, Raj Bagh, Ghaziabad is set to become a landmark destination.",
  },
];

export default function ProjectContainer() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const clampIndex = (index: number) =>
    Math.max(0, Math.min(projects.length - 1, index));

  const goToSlide = (index: number) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) return;

    const nextIndex = clampIndex(index);
    const slideWidth = viewport.offsetWidth;

    setActiveIndex(nextIndex);

    gsap.to(track, {
      x: -slideWidth * nextIndex,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    const handleResize = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;

      if (!track || !viewport) return;

      gsap.set(track, { x: -viewport.offsetWidth * activeIndex });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  useEffect(() => {
    const activeSlide = slideRefs.current[activeIndex];
    if (!activeSlide) return;

    const image = activeSlide.querySelector(".project-card-image");
    const title = activeSlide.querySelector(".project-card-title");
    const location = activeSlide.querySelector(".project-card-location");
    const description = activeSlide.querySelector(".project-card-description");
    const cta = activeSlide.querySelector(".project-card-cta");

    gsap.killTweensOf([image, title, location, description, cta]);

    gsap.fromTo(
      image,
      { scale: 1.05, autoAlpha: 0.7 },
      { scale: 1, autoAlpha: 1, duration: 0.8 }
    );

    gsap.fromTo(
      [title, location, description, cta],
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 }
    );
  }, [activeIndex]);

  const visibleButtons = [
    (activeIndex + 1) % projects.length,
    (activeIndex + 2) % projects.length,
    (activeIndex + 3) % projects.length,
  ];

  return (
    <div className="relative py-[80px] overflow-hidden text-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/assets/cover-bg.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      <div className="container mx-auto relative z-10">
        {/* PROJECT CARDS */}
        <div className="overflow-hidden my-8">
          <div ref={trackRef} className="flex">
            {projects.map((project, index) => (
              <article
                key={project.id}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                className="w-full shrink-0"
              >
                <div className="grid  grid-cols-1 lg:grid-cols-[66%_34%] gap-6 lg:gap-[30px] items-center">
                  <Image
                    className="project-card-image h-[320px] md:h-[392px] lg:h-[495px] w-full object-cover"
                    src={project.image}
                    width={1200}
                    height={392}
                    alt={project.title}
                  />

                  <div className="flex flex-col justify-between min-h-[280px]">
                    <div>
                      <CommonHeading
                        heading={project.title}
                        customClass="project-card-title !text-[32px] lg:!text-[40px]"
                      />

                      <div className="project-card-location mt-4 flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{project.location}</span>
                      </div>
                    </div>

                    <p className="project-card-description py-6 opacity-80">
                      {project.desc}
                    </p>

                    <Redirect_Link
                      text="Explore More"
                      customClass="project-card-cta"
                      link=""
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* THUMBNAILS */}
        <div
          ref={viewportRef}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          {visibleButtons.map((index) => {
            const project = projects[index];

            return (
              <button
                key={project.id}
                onClick={() => goToSlide(index)}
                className="group overflow-hidden opacity-70 hover:opacity-100 transition"
              >
                <Image
                  src={project.thumb}
                  width={450}
                  height={200}
                  alt={project.title}
                  className="h-[110px] button-img lg:h-[200px] w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}