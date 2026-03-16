"use client";
// import "./globals.css";
import { useLayoutEffect, useState } from "react";
import { useParams } from "next/navigation";
import ScrollContext from "@/context/ScrollContext";
import CursorAnimation from "@/utils/Cursor";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import initScrollSmoother from "@/utils/GsapAnimations1";
export default function HorizontalLayout({ children }: { children: React.ReactNode }) {
  const [gotoFn, setgoTofn] = useState<any>(0);
  const [next, setnext] = useState<any>();
  const [prev, setPrev] = useState<any>();
  const pathname = useParams();

  // useLayoutEffect(() => {
  //   const { goTo ,next,prev} = InitScrollSmoother(pathname);
  //  setgoTofn(()=>goTo)
  //  setnext(()=>next)
  //  setPrev(()=>prev)
  // }, []);

  useLayoutEffect(() => {
    const { goTo, next, prev } = initScrollSmoother(pathname);
    setgoTofn(() => goTo);
    setnext(() => next);
    setPrev(() => prev);

    document.body.classList.add("active");
    document.body.classList.add("hero-active"); 
  }, []);
  return (
    <ScrollContext.Provider value={{ gotoFn, next, prev }}>
      <div className="">
        <CursorAnimation />
        {/* <AbsSec /> */}
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <Header />
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </ScrollContext.Provider>
  );
}
