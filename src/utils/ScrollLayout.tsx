"use client"
import React, { useEffect } from 'react';
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
  containerClassName?: string;
  leftContentClassName?: string;
}

const ScrollLayout = ({
  leftContent,
  rightContent,
  isShowDrag,
  scrollableRef,
  centerDragVia,
  isPattern = "",
  draggableAlign,
  containerClassName = "",
  leftContentClassName = ""
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
    <div className={`grid grid-cols-1 relative w-full overflow-hidden pt-[40px] md:grid-cols-2 md:pt-0 ${containerClassName}`}>
      <div className={isPattern + ` col-span-1 relative z-10 fade-up my-auto mobile-background bg-[#FFF1DF] px-5 py-12 sm:px-8 sm:py-16 md:h-screen lg:px-2 lg:py-24 large-desktop`}>
        <div className={`custom-container ${leftContentClassName}`}>
          {leftContent}
          {isShowDrag && <DragComponent draggableAlign={draggableAlign} centerDragVia={centerDragVia} scrollableRef={scrollableRef} />}
        </div>
      </div>
      <div
        className='absolute top-0 right-0 bottom-0 z-1 block h-full w-full md:w-[50%] brightness brightness-[0.8]'
        style={{ background: "url(/assets/cover-half.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      />
      <div
        ref={scrollableRef}
        data-scroll='vertical'
        className="col-span-1 relative z-3 scrollable-container dark-section parallax overflow-visible px-5 pb-12 pt-12 sm:px-8 sm:pt-16 md:h-screen md:max-h-screen md:overflow-x-hidden md:overflow-y-scroll lg:px-10 lg:pb-0 lg:pt-14"
      >
        <div className='lg:py-0'>
          {rightContent}
        </div>
        <div className='h-12 md:h-[100px]' />
        {/* <div className='overlay_gradient lg:block hidden h-[200px] bottom-0 right-0 sticky w-[100%]' /> */}
      </div>
    </div>
  );
};

export default ScrollLayout;
