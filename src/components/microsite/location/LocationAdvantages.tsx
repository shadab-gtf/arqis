"use client"
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function MetroStationsUI() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const categories = [
    { icon: '/assets/microsite/icons/icon_4.png', label: 'METRO STATIONS', active: true },
    { icon: '/assets/microsite/icons/icon_3.png', label: 'SCHOOLS', active: false },
    { icon: '/assets/microsite/icons/icon_2.png', label: 'MALLS', active: false },
    { icon: '/assets/microsite/icons/icon_1.png', label: 'HOSPITALS', active: false },
     { icon: '/assets/microsite/icons/icon_4.png', label: 'METRO STATIONS', active: true },
    { icon: '/assets/microsite/icons/icon_3.png', label: 'SCHOOLS', active: false },
    { icon: '/assets/microsite/icons/icon_2.png', label: 'MALLS', active: false },
    { icon: '/assets/microsite/icons/icon_1.png', label: 'HOSPITALS', active: false }
  ];

  const stationsData = {
    0: [
      { name: 'Noida Sector 15 Metro Station', time: '8 Minutes' },
      { name: 'Mayur Vihar Phase 1 Metro Station', time: '15 Minutes' },
      { name: 'Akshardham Temple Metro Station', time: '20 Minutes' }
    ],
    1: [
      { name: 'Delhi Public School', time: '5 Minutes' },
      { name: 'Amity International School', time: '12 Minutes' },
      { name: 'Modern School', time: '18 Minutes' }
    ],
    2: [
      { name: 'DLF Mall of India', time: '10 Minutes' },
      { name: 'The Great India Place', time: '15 Minutes' },
      { name: 'Logix City Centre', time: '20 Minutes' }
    ],
    3: [
      { name: 'Fortis Hospital', time: '7 Minutes' },
      { name: 'Max Super Speciality Hospital', time: '12 Minutes' },
      { name: 'Apollo Hospital', time: '18 Minutes' }
    ],
      4: [
      { name: 'Noida Sector 15 Metro Station', time: '8 Minutes' },
      { name: 'Mayur Vihar Phase 1 Metro Station', time: '15 Minutes' },
      { name: 'Akshardham Temple Metro Station', time: '20 Minutes' }
    ],
    5: [
      { name: 'Delhi Public School', time: '5 Minutes' },
      { name: 'Amity International School', time: '12 Minutes' },
      { name: 'Modern School', time: '18 Minutes' }
    ],
    6: [
      { name: 'DLF Mall of India', time: '10 Minutes' },
      { name: 'The Great India Place', time: '15 Minutes' },
      { name: 'Logix City Centre', time: '20 Minutes' }
    ],
    7: [
      { name: 'Fortis Hospital', time: '7 Minutes' },
      { name: 'Max Super Speciality Hospital', time: '12 Minutes' },
      { name: 'Apollo Hospital', time: '18 Minutes' }
    ]
  };

  const stations = stationsData[activeCategory];

  const goToSlide = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(index);
    }
    setCurrentSlide(index);
    setActiveCategory(index);
  };

  return (
    <div className="min-h-screen s p-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-16">
          <div className="flex items-center justify-between">
            <button
              ref={prevRef}
              className="text-[#fff] transition-colors cursor-pointer z-10"
            >
             <Image src={`/assets/microsite/icons/right_arrow_3.svg`} alt='right' className='rotate-[180deg]' width={28} height={28}/>
            </button>

            <div className="flex-1 overflow-hidden mx-4">
              
              <Swiper
                ref={swiperRef}
                modules={[Navigation]}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                spaceBetween={0}
                slidesPerView={4}
                loop={true}
                onSlideChange={(swiper) => {
                  setCurrentSlide(swiper.realIndex);
                  setActiveCategory(swiper.realIndex % categories.length);
                }}
                className="mySwiper"
              >
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <SwiperSlide key={index}>
                      <button
                        onClick={() => goToSlide(index)}
                        className={`flex  btn_container cursor-pointer items-center justify-center ${categories.length-1!=index&&'border-r-[1px]'} border-dashed border-[#fff] gap-3 w-full px-6 py-4 transition-all duration-300 
                          ${
                          activeCategory === index
                            ? 'text-amber-200'
                            : 'text-[#fff]'
                        }`}
                      >
                        <Image src={Icon} alt='icon' className='mr-2' height={38} width={38}/>
                        <span className='text=-[#fff]'>
                          {category.label}
                        </span>
                      </button>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            <button
              ref={nextRef}
              className="text-[#fff] transition-colors cursor-pointer z-10"
            >
             <Image src={`/assets/microsite/icons/right_arrow_3.svg`} alt='right' width={28} height={28}/>
            </button>
          </div>
        </div>
        <div className="space-y-8">
          {stations.map((station, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-amber-100 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className=" font-light tracking-wide">{station.name}</h3>
              <div className="flex-1 mx-8 border-b border-dashed border-[#fff]" />
              <span className="font-light">{station.time}</span>
            </div>
          ))}
        </div>
      </div>

   
    </div>
  );
}