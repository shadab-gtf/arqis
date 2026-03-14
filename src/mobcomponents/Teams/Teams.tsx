import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import TeamCard from '@/components/Team/TeamCard';
import CommonHeading from '@/utils/CommonHeading';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import { EffectCards, Pagination } from 'swiper/modules';
import Image from 'next/image';

// Custom CSS for the progress bar and icons
const styles = `
  .custom-progress {
    width: 100%;
    height: 1px !important;
    background-color: #000;
    border-radius: 9999px;
    overflow: hidden;
    flex: 1;
    position: relative;
    touch-action: none; /* Prevent default touch behaviors like scrolling */
    cursor: url('/assets/icons/drag.svg') 15 15, auto; /* Custom cursor for desktop */
  }

  .swiper-pagination-progressbar.swiper-pagination-horizontal {
    overflow: inherit;
  }

  .swiper-pagination-progressbar-fill {
    background-color: #22c55e !important; /* Tailwind's bg-green-500 */
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  /* Style for the default drag icon on the progress bar */
  .drag-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    pointer-events: none; /* Prevent interference with interactions */
  }

  /* Style for the custom cursor during dragging */
  .custom-cursor {
    position: fixed;
    pointer-events: none;
    z-index: 1000;
    display: none; /* Hidden by default */
  }
`;

export default function App() {
  const swiperRef = useRef<any>(null); // Reference to Swiper instance
  const progressBarRef = useRef<HTMLDivElement>(null); // Reference to progress bar element
  const cursorRef = useRef<HTMLImageElement>(null); // Reference to custom cursor image
  const dragIconRef = useRef<HTMLImageElement>(null); // Reference to default drag icon

  useEffect(() => {
    const progressBar = progressBarRef.current;
    const cursor = cursorRef.current;
    const dragIcon = dragIconRef.current;
    if (!progressBar || !swiperRef.current || !cursor || !dragIcon) return;

    let isDragging = false;

    // Update drag icon position based on progress
    const updateDragIconPosition = () => {
      const totalSlides = swiperRef.current.slides.length;
      const progress = swiperRef.current.progress; // Swiper's progress (0 to 1)
      const progressBarWidth = progressBar.getBoundingClientRect().width;
      const iconWidth = 30; // Width of drag.svg
      const leftPosition = progress * (progressBarWidth - iconWidth); // Adjust for icon width
      dragIcon.style.left = `${leftPosition}px`;
    };

    // Handle interaction (mouse or touch)
    const handleInteraction = (e) => {
      e.preventDefault(); // Prevent default behavior (e.g., scrolling)
      const rect = progressBar.getBoundingClientRect();
      let clientX, clientY;

      // Handle both mouse and touch events
      if (e.type === 'touchstart' || e.type === 'touchmove') {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      // Calculate the click/touch position as a percentage of the progress bar width
      const offsetX = clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, offsetX / rect.width));

      // Calculate the target slide based on the percentage
      const totalSlides = swiperRef.current.slides.length;
      const targetSlide = Math.round(percentage * (totalSlides - 1));

      // Navigate to the target slide
      swiperRef.current.slideTo(targetSlide);

      // Update custom cursor position (for mobile)
      if (e.type === 'touchstart' || e.type === 'touchmove') {
        cursor.style.left = `${clientX - 15}px`; // Center 30x30 image
        cursor.style.top = `${clientY - 15}px`;
        cursor.style.display = 'block'; // Show cursor during drag
      }
    };

    // Mouse events
    const handleMouseDown = (e) => {
      isDragging = true;
      handleInteraction(e);
      progressBar.addEventListener('mousemove', handleInteraction);
    };

    const handleMouseUp = () => {
      isDragging = false;
      cursor.style.display = 'none'; // Hide cursor when not dragging
      progressBar.removeEventListener('mousemove', handleInteraction);
    };

    // Touch events
    const handleTouchStart = (e) => {
      isDragging = true;
      handleInteraction(e);
    };

    const handleTouchMove = (e) => {
      if (isDragging) {
        handleInteraction(e);
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
      cursor.style.display = 'none'; // Hide cursor when not dragging
    };

    // Update drag icon position on slide change
    swiperRef.current.on('progress', updateDragIconPosition);
    swiperRef.current.on('slideChange', updateDragIconPosition);

    // Add event listeners
    progressBar.addEventListener('click', handleInteraction);
    progressBar.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    progressBar.addEventListener('touchstart', handleTouchStart);
    progressBar.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    // Initial position of drag icon
    updateDragIconPosition();

    // Cleanup event listeners on component unmount
    return () => {
      progressBar.removeEventListener('click', handleInteraction);
      progressBar.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      progressBar.removeEventListener('touchstart', handleTouchStart);
      progressBar.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      if (swiperRef.current) {
        swiperRef.current.off('progress', updateDragIconPosition);
        swiperRef.current.off('slideChange', updateDragIconPosition);
      }
    };
  }, []);

  return (
    <div className="px-[30px] py-20">
      {/* Inject custom styles */}
      <style>{styles}</style>
      <div className="container relative mobile-heading-2 ">
        <CommonHeading heading="Driven By Passion, United by Purpose" />
        {/* <div className="flex items-center gap-4 mt-4 mb-20">
          
          <div className="relative flex-1">
            <div className="custom-progress mt-0" ref={progressBarRef}>
              <Image
                ref={dragIconRef}
                src="/assets/icons/drag.svg"
                height={30}
                width={30}
                alt="drag"
                className="drag-icon"
              />
            </div>
          </div>
          <span className="uppercase tracking-[1.4] text-[14px] block">
            Drag For More View
          </span>
          <Image
            ref={cursorRef}
            src="/assets/icons/drag.svg"
            height={30}
            width={30}
            alt="drag-cursor"
            className="custom-cursor"
          />
        </div> */}

        <Swiper
          effect="cards"
          grabCursor={true}
          modules={[EffectCards, Pagination]}
          className="mySwiper w-[80%] lg:mt-0 mt-[20px]"
          pagination={{
            type: 'progressbar',
            el: '.custom-progress',
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          <SwiperSlide className="!h-[450px] md:!h-[600px]">
            <TeamCard bg="bg-[#ecebda]" image="/assets/teams/teams_1.png" />
          </SwiperSlide>
          <SwiperSlide className="!h-[450px] md:!h-[600px]">
            <TeamCard bg="bg-[#90c9a3]" image="/assets/teams/teams_2.png" />
          </SwiperSlide>
          <SwiperSlide className="!h-[450px] md:!h-[600px]">
            <TeamCard bg="bg-[#b7d6bb]" image="/assets/teams/teams_3.png" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}