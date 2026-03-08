"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Partner() {
  const [hoveredSlide, setHoveredSlide] = useState(null);

  const logosArr = [
    "/assets/microsite/partner/logo1.png",
    "/assets/microsite/partner/logo2.png",
    "/assets/microsite/partner/logo3.png",
    "/assets/microsite/partner/logo4.png",
    "/assets/microsite/partner/logo5.png",
    "/assets/microsite/partner/logo1.png",
    "/assets/microsite/partner/logo2.png",
    "/assets/microsite/partner/logo3.png",
    "/assets/microsite/partner/logo4.png",
    "/assets/microsite/partner/logo5.png",
  ];

  const handleMouseEnter = (index) => {
    setHoveredSlide(index);
  };

  return (
    <div className="">
      <div className="lg:block hidden fade-up news_container">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView="auto"
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1280: { slidesPerView: 5, spaceBetween: 30 },
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
                className={`flex justify-center items-center cursor-pointer fade-up py-[30px] relative ${
                  hoveredSlide === index ? "z-[99999]" : ""
                }`}
              >
                <Image
                  src={src}
                  alt={`Logo ${index + 1}`}
                  height={120}
                  width={120}
                  className={"w-[190px] object-contain z-10"}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="arrow_container !p-0 lg:flex hidden flex gap-5 mt-10 justify-center pb-[30px] fade-up">
        <div className="arrow_prev cursor-pointer">
          <Image
            src="/assets/icons/arrow_right.png"
            alt="Previous"
            width={25}
            height={25}
            className="arrow"
          />
        </div>
        <div className="arrow_next cursor-pointer">
          <Image
            src="/assets/icons/arrow_left.png"
            alt="Next"
            width={25}
            height={25}
            className="arrow"
          />
        </div>
      </div>
    </div>
  );
}
