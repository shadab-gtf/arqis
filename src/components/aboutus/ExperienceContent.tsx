import Image from "next/image";
import React from "react";
import CommonHeading from "@/utils/CommonHeading";
import Paragraph from "@/utils/Paragraph";
import OurMission from "./OurMission";
import OurVission from "./OurVission";
import MapSection from "./MapSection";

type ExperienceContentProps = {
  mobVia?: number | boolean;
};

export default function ExperienceContent({
  mobVia,
}: ExperienceContentProps) {

  const headingColor = mobVia ? "text-[#000]" : "text-[#FFD38F]";
  const paragraphColor = mobVia ? "text-[#000]" : "text-[#fff]";

  return (
    <div className="parallax px-0 md:px-2 lg:px-6">
      <MapSection />
      <div className="pt-14 mobile-color md:pt-16 lg:pt-[100px]">
        <CommonHeading
          customClass={headingColor}
          heading="40+ Years of experience in development "
        />
        <div className="mx-auto my-8 md:my-10 lg:my-[50px]">
          <Image
            src="/assets/about/exp.png"
            alt="experience"
            className="w-full arrow"
            width={643}
            height={468}
          />
        </div>

        <div>
          <Paragraph
            customClass={paragraphColor}
            paragraph="With over four decades of experience, we are reshaping the landscape of urban living. Our commitment to excellence and innovation drives us to create projects that stand as true landmarks, blending quality and sophistication at every step."
          />
          <Paragraph
            customClass={paragraphColor}
            paragraph="Our diverse footprint spans key locations across India, where we continuously push the boundaries of design and construction. Dedicated to shaping the future, we remain focused on delivering spaces that inspire trust and elevate the living experience."
          />
        </div>
      </div>
      {!mobVia && (
        <>
          <OurMission mobVia={mobVia} />
          <OurVission mobVia={mobVia} />
        </>
      )}
    </div>
  );
}
