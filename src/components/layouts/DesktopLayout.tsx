"use client";
import LogoSection from "@/components/home/LogoSection";
import HorizontalLayout from "./HorizontalLayout";
import About from "@/components/aboutus/About";
import ProjectContainer from "@/components/projects/ProjectContainer";
import TeamContainer from "@/components/Team/TeamContainer";
import MediaContainer from "@/components/media/MediaContainer";
import BlogContainer from "@/components/bloglisting/BlogContainer";
import FooterContainer from "@/components/footer/FooterContainer";
import CareerContainer from "@/components/career/CareerContainer";
import ContactformContainer from "@/components/contactform/ContactformContainer"
import Hero from "@/components/home/Hero";
export default function DesktopLayout() {
  return (

    <HorizontalLayout>
      <div className="flex h-[100vh] overflow-x-scroll horizontal-section">
        <div className="basis-[100%] item grow-0 shrink-0 h-full">
          <Hero />
        </div>
        <div className="basis-[100%] item grow-0 shrink-0 h-full">
          <About mobVia={0} />
        </div>
        <div className="basis-[100%] item grow-0 shrink-0 h-full">
          <ProjectContainer />
        </div>
        <div className="basis-[100%] item grow-0 shrink-0 h-full flex items-center">
          <MediaContainer />
        </div>
        <div className="basis-[100%] item grow-0 shrink-0 h-full flex items-center">
          <BlogContainer mobVia={0} />
        </div>
        <div className="basis-[100%] item grow-0 shrink-0 h-full">
          <CareerContainer />
        </div>
        <div className="basis-[100%] item grow-0 shrink-0 h-full flex items-center">
          <TeamContainer />
        </div>
        <div className="basis-[100%] item grow-0 shrink-0 h-full">
          <ContactformContainer />
        </div>
        <div className="basis-[100%] item grow-0 shrink-0 h-full flex items-center">
          <FooterContainer />
        </div>
      </div>
    </HorizontalLayout>
  );
}