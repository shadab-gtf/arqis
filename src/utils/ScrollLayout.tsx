"use client"
import React, { useRef, useEffect } from 'react';
import DragComponent from './DragComponent';

interface ScrollLayoutProps {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  isShowDrag?: boolean;
  scrollableRef?: React.RefObject<HTMLDivElement | null>;
  centerDragVia?: any;
  isPattern?: string;
  draggableAlign?: any;
  isBgColor?: boolean;
}

const ScrollLayout = ({
  leftContent,
  rightContent,
  isShowDrag,
  scrollableRef,
  centerDragVia,
  isPattern = "",
  draggableAlign
}: ScrollLayoutProps) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollable = scrollableRef?.current;
      if (scrollable) {
        const scrollPosition = scrollable.scrollTop;
        scrollable.style.backgroundPositionY = `${scrollPosition * 1}px`;
      }
    };

    const scrollable = scrollableRef?.current;
    scrollable?.addEventListener('scroll', handleScroll);
    return () => {
      scrollable?.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="grid grid-cols-1 relative  lg:pt-0 pt-[40px] md:grid-cols-2 overflow-y-hidden w-[100%]">
      <div className={isPattern + `col-span-1 fade-up my-auto h-screen bg-[#FFF1DF]/20 px-10 2xl:px-16 py-20 2xl:py-30`}>
        <div className={`custom-container `}>
          {leftContent}
          {isShowDrag && <DragComponent draggableAlign={draggableAlign} centerDragVia={centerDragVia} scrollableRef={scrollableRef} />}
        </div>
      </div>
      <div className='absolute z-1 top-0 bottom-0 right-0 h-full w-[50%]'
        style={{ background: "url(/assets/cover-half.png)" }}
      />
      <div ref={scrollableRef} data-scroll='vertical' className="col-span-1  lg:pb-0 pb-[60px]  2xl:pt-14 pt-[90px] px-10 relative  z-3 dark-section scrollable-container lg:max-h-screen parallax lg:h-screen  lg:overflow-y-scroll overflow-hidden">
        <div className='2xl:py-0'>
          {rightContent}
        </div>
        <div className='h-[100px]' />
        {/* <div className='overlay_gradient lg:block hidden h-[200px] bottom-0 right-0 sticky w-[100%]' /> */}
      </div>
    </div>
  );
};

export default ScrollLayout;