"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import CommonHeading from "@/utils/CommonHeading";
import Redirect_Link from "@/utils/Redirect_txt";
import { MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

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
    image: "/assets/projects/arqis-mall.jpg",
    thumb: "/assets/projects/arqis-mall.jpg",
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
      duration: 0.5,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    const handleResize = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;

      if (!track || !viewport) return;

      gsap.set(track, {
        x: -viewport.offsetWidth * activeIndex,
      });
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
      { scale: 1, autoAlpha: 1, duration: 0.8 },
    );

    gsap.fromTo(
      [title, location, description, cta],
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 },
    );
  }, [activeIndex]);

  const visibleButtons = [
    (activeIndex + 1) % projects.length,
    (activeIndex + 2) % projects.length,
    (activeIndex + 3) % projects.length,
  ];

  return (
    <div className="relative large-desktop overflow-hidden text-black md:text-white pb-10 md:pb-0">
      {/* Background (Desktop Only) */}
      <div
        className="absolute inset-0 bg-cover bg-center hidden md:block"
        style={{
          backgroundImage: "url(/assets/cover-bg.png)",
        }}
      />

      <div className="container px-5 sm:px-8 lg:px-10 xl:px-0 flex flex-col xl:gap-5 lg:gap-8 md:gap-6 justify-center mx-auto relative z-10 md:min-h-screen mt-6 md:mt-0">

        {/* MAIN SLIDER (DESKTOP) */}
        <div className="overflow-hidden hidden md:block" ref={viewportRef}>
          <div ref={trackRef} className="flex">
            {projects.map((project, index) => (
              <article
                key={project.id}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                className="w-full shrink-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-[28px] items-stretch">
                  {/* IMAGE */}
                  <div className="w-full h-full overflow-hidden ">
                    <Image
                      className="project-card-image w-full  h-[340px] object-cover"
                      src={project.image}
                      width={1200}
                      height={340}
                      alt={project.title}
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-col justify-center gap-6 h-full">
                    <div>
                      <CommonHeading
                        heading={project.title}
                        customClass="project-card-title text-[24px] sm:text-[2rem] md:text-[3.5rem]! pb-4!"
                      />

                      <div className="project-card-location flex items-center gap-2">
                        <MapPin size={20} />
                        <span className="font-normal text-base sm:text-lg lg:text-lg tracking-wide text-center uppercase">
                          {project.location}
                        </span>
                      </div>
                    </div>

                    <p className="project-card-description font-light text-base sm:text-lg lg:text-lg  opacity-80">
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

        {/* THUMBNAILS (DESKTOP) */}
       {/* THUMBNAILS (DESKTOP) */}
<div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
  {visibleButtons.map((index) => {
    const project = projects[index];

    return (
      <button
        key={project.id}
        onClick={() => goToSlide(index)}
        className="group relative overflow-hidden opacity-90 hover:opacity-100 transition duration-300"
      >
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-white text-lg font-medium tracking-wider px-4 text-center uppercase">
            {project.title}
          </span>
        </div>

        {/* Thumbnail Image */}
        <Image
          src={project.thumb}
          width={430}
          height={230}
          alt={project.title}
          className="button-img w-full h-[230px] object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Optional: Dark gradient overlay that is always there to improve text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    );
  })}
</div>

        {/* MOBILE SLIDER */}
        <div className="block md:hidden pb-[40px] w-full mt-4 mobile-projects-swiper">
          <Swiper
            spaceBetween={15}
            slidesPerView={1.15}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            className="w-full !pb-[40px]"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={`mob-${project.id}`}>
                <div className="flex flex-col gap-5">
                  <Image
                    className="w-full h-[380px] object-cover"
                    src={project.image}
                    width={500}
                    height={500}
                    alt={project.title}
                  />
                  <div className="flex flex-col justify-between py-2 gap-[40px]">
                    <h3 className="uppercase text-[16px] tracking-[2px] text-black font-medium">
                      {project.title}
                    </h3>
                    <Redirect_Link
                      text="Explore Project"
                      customClass="project-card-cta !text-black text-[14px] uppercase tracking-widest"
                      link=""
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </div>
  );
}
