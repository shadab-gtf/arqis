import React, { useContext, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { Link } from "next-transition-router";
import ScrollContext from "@/context/ScrollContext";

const Header = () => {
  const [isClient, setIsClient] = useState(false);
  const { gotoFn } = useContext(ScrollContext);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = (e: Event) => {
      //  do it for mobile device only 
      if (window.innerWidth >= 1024) {
        setIsVisible(true);
        return;
      }

      const target = e.target as HTMLElement;
      if (
        target.classList &&
        (target.classList.contains("mob_scroll") ||
          target.getAttribute("data-scroll") === "vertical")
      ) {
        const currentScrollY = target.scrollTop;
        if (Math.abs(currentScrollY - lastScrollY.current) < 5) return;

        if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [isClient]);

  if (!isClient) return null;

  return ReactDOM.createPortal(
    <>
      <header className="w-full lg:block hidden large-desktop py-2 mobile-device lg:py-[30px] z-[9999] fixed left-0 top-0 ">
        <div className="container  xl:ml-16! 2xl:ml-0!">
          <div className="flex cursor-pointer mobile-header justify-between items-center">
            <Link className="logo hidden lg:block relative h-[75px] w-[229px]" onClick={() => gotoFn(0)} href={"#"}>
              <Image
                src="/assets/arqis-black.webp"
                className="logo-black hide-logo-from-hero h-[75px] w-full"
                width={229}
                height={60}
                quality={100}
                alt="logo"
              // sizes="(max-width: 640px) 120px, (max-width: 768px) 85px, 239px"
              />
              <Image
                src="/assets/arqis-white.webp"
                className="logo-white hide-logo-from-hero h-[75px] w-full"
                width={229}
                height={80}
                quality={100}
                alt="logo"
              // sizes="(max-width: 640px) 120px, (max-width: 768px) 85px, 239px"
              />
            </Link>
            <div className="flex cursor-pointer items-center gap-10 ">
              {/* <Image src='/assets/sound.svg' className='icon span_3 arrow cursor-pointer ' width={'25'} height={25} alt="logo" /> */}
              <div className="flex cursor-pointer  items-center gap-2">
                <span className="uppercase text cursor-pointer span_1  tracking-[2px]">
                  Menu
                </span>
                <span className="border-[50%] cursor-pointer span_2  h-[18px] w-[18px] rounded-full block bg-[#000] circle-pointer"></span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header>
        <div
          className={`w-full fixed top-0 z-[999] mobile-header-bg flex items-center justify-between py-2 px-4 lg:hidden transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <Image
            src="/assets/arqis-black.webp"
            className="logo-black h-[45px] "
            width={118}
            height={45}
            quality={100}
            alt="logo"
            onClick={() => gotoFn(0)}
          />
          <div className="flex cursor-pointer items-center gap-10 hero-act">
            {/* <Image src='/assets/sound.svg' className='icon span_3 arrow cursor-pointer ' width={'25'} height={25} alt="logo" /> */}
            <div className="flex cursor-pointer  items-center gap-2">
              <span className="uppercase text cursor-pointer span_1  tracking-[2px]">
                Menu
              </span>
              <span className="border-[50%] cursor-pointer span_2  h-[18px] w-[18px] rounded-full block bg-[#000] circle-pointer circ"></span>
            </div>
          </div>
        </div>
      </header>
    </>,
    document.getElementById("header-portal"),
  );
};

export default Header;