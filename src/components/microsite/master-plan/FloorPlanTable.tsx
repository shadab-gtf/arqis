"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HEADER_ROW = (
  <div className="flex pb-[10px] border-b border-[#00000057]">
    <div className="basis-[25%] tracking-[1.4px] text-[14px] font-[300]">SPACE</div>
    <div className="basis-[25%] tracking-[1.4px] text-[14px] font-[300] ">AREA (M2)</div>
    <div className="basis-[25%] tracking-[1.4px] text-[14px] font-[300] ">AVAILABILITY</div>
    <div className="basis-[25%] tracking-[1.4px] text-[14px] font-[300]">FLOOR PLAN</div>
  </div>
);

const VIEW_BUTTON = (
  <a
    href="#"
    className="bg-[var(--primary-green-color)] px-[25px] py-[10px] text-white text-[12px] rounded-[30px]"
  >
    VIEW FLOOR PLAN
  </a>
);

const DATA = [
  { space: "OFFICE", area: "147.01", availability: "AVAILABLE" },
  { space: "RETAIL", area: "122.09", availability: "AVAILABLE" },
  { space: "LOUNGE", area: "98.25", availability: "SOLD OUT" },
  { space: "CAFETERIA", area: "134.67", availability: "AVAILABLE" },
];

const Row = ({ space, area, availability }) => (
  <div className="flex py-[28px] border-b border-[#00000057]">
    <div className="basis-[25%] tracking-[1.4px] text-[14px] font-[300]">{space}</div>
    <div className="basis-[25%] tracking-[1.4px] text-[14px] font-[300]">{area}</div>
    <div className="basis-[25%] tracking-[1.4px] text-[14px] font-[300]">{availability}</div>
    <div className="basis-[25%] tracking-[1.4px] text-[14px] font-[300]">{VIEW_BUTTON}</div>
  </div>
);

export default function FloorPlanTable() {
  const slidesData = [];
  for (let i = 0; i < DATA.length; i += 2) {
    slidesData.push(DATA.slice(i, i + 2));
  }

  return (
    <div className="">
      <Swiper
        direction="horizontal"
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          prevEl: ".arrow_prev",
          nextEl: ".arrow_next",
        }}
        pagination={{ clickable: true }}
        className="mySwiper"
        modules={[Pagination, Navigation]}
      >
        {slidesData.map((slideItems, index) => (
          <SwiperSlide key={index}>
            <div className="pt-[90px]">
              {HEADER_ROW}
              {slideItems.map((item, itemIndex) => (
                <Row
                  key={itemIndex}
                  space={item.space}
                  area={item.area}
                  availability={item.availability}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="arrow_container !p-0 hidden lg:flex gap-5 mt-10 justify-end pb-[30px] fade-up">
        <div className="arrow_prev cursor-pointer">
          <Image
            src="/assets/icons/arrow_right.png"
            alt="Previous slide"
            width={25}
            height={25}
            className="arrow"
          />
        </div>
        <div className="arrow_next cursor-pointer">
          <Image
            src="/assets/icons/arrow_left.png"
            alt="Next slide"
            width={25}
            height={25}
            className="arrow"
          />
        </div>
      </div>
    </div>
  );
}