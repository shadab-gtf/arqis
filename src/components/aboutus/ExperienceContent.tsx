import Image from "next/image";
import React from "react";
import CommonHeading from '@/utils/CommonHeading';
import Paragraph from '@/utils/Paragraph';
import OurMission from "./OurMission";
import OurVission from "./OurVission";
import Redirect_Link from '@/utils/Redirect_txt';
import MapSection from "./MapSection";
export default function ExperienceContent({ mobVia }) {
  return (
    <div className=" parallax px-6">
      {/* <CommonHeading
        customClass="text-[#FFD38F]"
        heading="Reshaping Real Estate with Clarity, Calm, and Conviction "
      /> */}
      <MapSection />
      <div className="pt-[100px] ">
        <CommonHeading
          customClass={`${mobVia ? "text-[#000]" : "text-[#FFD38F]"}`}
          heading="40+ Years of experience in development "
        />
        <div className="m-[auto]  my-[50px]">
          <Image
            src={"/assets/about/exp.png"}
            alt="experience"
            className="w-[100%] arrow"
            width={"643"}
            height={468}
          />
        </div>

        <div className="">
          <Paragraph
            customClass={`${mobVia ? "text-[#000]" : "text-[#fff]"}`}
            paragraph="With over four decades of experience, we are reshaping the landscape of urban living. Our commitment to excellence and innovation drives us to create projects that stand as true landmarks, blending quality and sophistication at every step." />
          <Paragraph
            customClass={`${mobVia ? "text-[#000]" : "text-[#fff]"}`}
            paragraph="Our diverse footprint spans key locations across India, where we continuously push the boundaries of design and construction. Dedicated to shaping the future, we remain focused on delivering spaces that inspire trust and elevate the living experience." />
        </div>
      </div>
      <>
        <OurMission mobVia={mobVia} />
        <OurVission mobVia={mobVia} />
        {/* <Redirect_Link customClass={`mt-[50px] change_icon_clr  text-white`} text={`explore about us`} link={``} /> */}
      </>
    </div>
  );
}
