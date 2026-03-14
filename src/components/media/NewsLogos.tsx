"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Modals from "@/utils/Modals";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MediaContent from "./mediaContainer/MediaContent";
import MediaLogo from "./mediaContainer/MediaImage";

export default function NewsLogos() {
  const scrollableRef = useRef(null);
  const [hoveredSlide, setHoveredSlide] = useState(null);

  const logosArr = [
    "/assets/media-center/news/logo_1.png",
    "/assets/media-center/news/logo_2.png",
    "/assets/media-center/news/logo_4.png",
    "/assets/media-center/news/logo_1.png",
    "/assets/media-center/news/logo_3.png",
    "/assets/media-center/news/logo_2.png",
    "/assets/media-center/news/logo_4.png",
    "/assets/media-center/news/logo_3.png",
    "/assets/media-center/news/logo_2.png",
    "/assets/media-center/news/logo_4.png",
    "/assets/media-center/news/logo_3.png",

  ];

  const handleMouseEnter = (index) => {
    setHoveredSlide(index);
  };

  const handleClose = () => {
    setHoveredSlide(null);
  };

  return (
    <div className="lg:pb-0 hidden pb-[30px] lg:pt-[30px]">
      {/* Navigation Arrows */}
      <div className="arrow_container  flex gap-5 justify-start pb-[30px] fade-up">
        <div className="arrow_prev cursor-pointer">
          <Image
            src="/assets/icons/arrow_right.png"
            alt="Previous"
            width={25}
            height={25}
            className="arrow slide-arr"
          />
        </div>
        <div className="arrow slide-arr_next cursor-pointer">
          <Image
            src="/assets/icons/arrow_left.png"
            alt="Next"
            width={25}
            height={25}
            className="arrow slide-arr rotate-90"
          />
        </div>
      </div>

      {/* Swiper Carousel */}
      <div className="bg-[#fff]  lg:block hidden fade-up news_container">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView="auto"
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1280: { slidesPerView: 4, spaceBetween: 30 },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          navigation={{
            prevEl: ".arrow_prev",
            nextEl: ".arrow_next",
          }}
          className="mySwiper"
        >
          {logosArr.map((src, index) => (
            <SwiperSlide key={index} onClick={() => handleMouseEnter(index)}>
              <div
                className={`flex justify-center items-center cursor-pointer h-[120px] sm:h-[140px] md:h-[150px] lg:h-[160px] relative ${hoveredSlide === index ? "z-[99999]" : ""
                  }`}
              >
                <Image
                  src={src}
                  alt={`Logo ${index + 1}`}
                  height={110}
                  width={100}
                  className={
                    src.includes("logo_1.png")
                      ? "w-[100px] object-cover z-10"
                      : src.includes("logo_2.png")
                        ? "w-[200px] m-[auto] object-contain z-10"
                        : "w-[50%] object-cover z-10"
                  }
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Static Images Outside Swiper Loop */}
      <div className="static-logos-container border-t-[1px] border-[#000]  py-[50px] lg:hidden  mt-[50px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-[30px] md:gap-y-[60px] lg:gap-4 fade-up">
        {logosArr.map((src, index) => (
          <div
            key={`static-${index}`}
            className="flex items-center cursor-pointer "
            onClick={() => handleMouseEnter(index)}
          >
            <Image
              src={src}
              alt={`Static Logo ${index + 1}`}
              height={60}
              width={60}
              className={
                src.includes("logo_1.png")
                  ? "w-[60px] object-contain"
                  : src.includes("logo_2.png")
                    ? "w-[60px] m-[auto] object-contain"
                    : "w-[60%] object-contain"
              }
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modals
        scrollableRef={scrollableRef}
        SelectedLogo={<MediaLogo selectedImage={logosArr[hoveredSlide]} />}
        MediaContent={<MediaContent />}
        hoveredSlide={hoveredSlide}
        animation="opacity"
        onClose={handleClose}
      />
    </div>
  );
}