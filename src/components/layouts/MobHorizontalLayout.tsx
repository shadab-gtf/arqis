"use client";
// import "./globals.css";
import Header from "@/components/common/header";
import AbsSec from "@/components/common/absSec";
import Footer from "@/components/common/footer";
import { useLayoutEffect, useState } from "react";
import { useParams } from "next/navigation";
import initScrollSmoother from "@/utils/mobileGsapAnimation";
import ScrollContext from "@/context/ScrollContext";

export default function MobHorizontalLayout({ children }: { children: React.ReactNode }) {
  const [gotoFn, setgoTofn] = useState<any>(0);
  const [next, setnext] = useState<any>();
  const [prev, setPrev] = useState<any>();

  const pathname = useParams();

  useLayoutEffect(() => {
    const { goTo, next, prev } = initScrollSmoother(pathname);
    setgoTofn(() => goTo)
    setnext(() => next)
    setPrev(() => prev)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollContext.Provider value={{ gotoFn, next, prev }}>
      <div className="">
        <AbsSec abs_footer={false} />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <Header />
            {children}
            {/* <Footer /> */}
            {/* <FooterContainer/> */}
          </div>
        </div>
      </div>
    </ScrollContext.Provider>
  );
}
