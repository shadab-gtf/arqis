import React from "react";
import HorizontalLayout from "@/components/layouts/HorizontalLayout";
import HomeBanner from "@/components/microsite/HomeBanner";
import About from "@/components/microsite/About";
import BrandContainer from "@/components/microsite/brands/BrandContainer";
import HightlightsContainer from "@/components/microsite/highlights/HightlightsContainer";
import MasterPlanContainer from "@/components/microsite/master-plan/MasterPlanContainer";
import LocationContainer from "@/components/microsite/location/LocationContainer";
import ContactformContainer from "@/components/contactform/ContactformContainer";
import FooterContainer from "@/components/footer/FooterContainer";
import ProjectGalleryContainer from "@/components/microsite/projectgallery/ProjectGalleryContainer";
import AmenitiesContainer from "@/components/microsite/amenities/amenitiesContainer";
import Image from "next/image";
export default function page() {
  return (
    <HorizontalLayout>
      <div className="flex h-[100vh]  overflow-x-scroll justify-stretch horizontal-section">
        <div className="basis-[100%] flex items-center  overflow-hidden  item grow-0 shrink-0 h-full">
          <HomeBanner />
        </div>
        <div className="basis-[100%] flex items-center  item grow-0 shrink-0 h-full">
          <About />
        </div>
        <div className="basis-[100%] flex items-center  item grow-0 shrink-0 h-full">
          <AmenitiesContainer />
        </div>
        <div className="basis-[100%] flex items-center item grow-0 shrink-0 h-full">
          <BrandContainer />
        </div>
        <div className="basis-[100%] bg-[var(--primary-green-color)] overflow-hidden  flex   item grow-0 shrink-0 h-full">
          <Image
            src="/assets/green-leaf.png"
            className={`w-[40%] absolute  leaf_icon z-[999] lg:w-[20%]  left-0 lg:top-0 top-[0px]`}
            alt="logo"
            width={288}
            height={208}
          />
          <HightlightsContainer />
        </div>
        <div className="basis-[100%] overflow-hidden flex items-center item grow-0 shrink-0 h-full">
          <MasterPlanContainer />
        </div>
        <div className="basis-[100%] overflow-hidden  bg-[var(--primary-green-color)]  flex  item grow-0 shrink-0 h-full">
          <LocationContainer />
        </div>
        <div className="basis-[100%] overflow-hidden items-center flex item grow-0 shrink-0 h-full">
          <ProjectGalleryContainer />
        </div>

        <div className="basis-[100%] overflow-hidden   flex  item grow-0 shrink-0 h-full">
          <ContactformContainer />
        </div>

        <div className="basis-[100%] overflow-hidden flex items-center item grow-0 shrink-0 h-full">
          <FooterContainer />
        </div>
      </div>
    </HorizontalLayout>
  );
}
