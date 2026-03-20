"use client";
import ProjectContainer from "@/mobcomponents/projects/projects";
import MediaContainer from "@/components/media/MediaContainer";
import BlogContainer from "@/components/bloglisting/BlogContainer";
import CareerContainer from "@/components/career/CareerContainer";
import ContactformContainer from "@/components/contactform/ContactformContainer";
import TeamContainer from "@/mobcomponents/Teams/Teams";
import LogoSection from "@/mobcomponents/home/LogoSection";
import Pagination from "@/utils/Pagination";
import FooterContainer from "@/components/footer/FooterContainer";
import MobHorizontalLayout from "./MobHorizontalLayout";
import About from "@/components/aboutus/About";
import TeamMobileContainer from "@/mobcomponents/Teams/Teams";

export default function MobileLayout() {
  return (
    <MobHorizontalLayout>
      <div className="flex h-[100dvh] overflow-hidden  horizontal-section">
        <div className="basis-[100%] item grow-0 shrink-0 h-full">
          <LogoSection />
        </div>
        <div data-scroll="vertical"
          className="basis-[100%] overflow-y-scroll overflow-x-hidden mob_scroll   item grow-0 shrink-0 h-full"
        >
          <About  />
          <Pagination navVal={"Projects"} />
          <FooterContainer />
        </div>
        <div className="basis-[100%]  item grow-0 mob_scroll  overflow-y-scroll overflow-x-hidden  shrink-0 h-full">
          <ProjectContainer />
          <Pagination navVal={"Our Team"} />
          <FooterContainer />
        </div>
        <div className="basis-[100%]  item grow-0 overflow-y-scroll overflow-x-hidden  shrink-0 h-full  items-center">
          <TeamMobileContainer />
          <Pagination navVal={"Career"} />
          <FooterContainer />
        </div>
        <div className="basis-[100%]  overflow-y-scroll overflow-x-hidden mob_scroll item grow-0 shrink-0 h-full">
          <CareerContainer />
          <Pagination navVal={"Media"} />
          <FooterContainer />
        </div>
        <div className="basis-[100%]  overflow-y-scroll overflow-x-hidden mob_scroll item grow-0 shrink-0 h-full  items-center">
          <MediaContainer />
          <Pagination navVal={"Blogs"} />
          <FooterContainer />
        </div>
        <div className="basis-[100%] item  overflow-y-scroll overflow-x-hidden mob_scroll  grow-0 shrink-0 h-full">
          <BlogContainer mobVia={true} />
          <Pagination navVal={"Contact"} />
          <FooterContainer />
        </div>
        <div className="basis-[100%]  overflow-y-scroll overflow-x-hidden  mob_scroll item grow-0 shrink-0 h-full">
          <ContactformContainer />
          <FooterContainer />
        </div>
      </div>
    </MobHorizontalLayout>
  );
}
