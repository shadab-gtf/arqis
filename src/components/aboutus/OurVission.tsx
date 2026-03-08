import React from "react";
import Image from "next/image";
import CommonHeading from "@/utils/CommonHeading";
import Paragraph from "@/utils/Paragraph";
export default function OurMission({ mobVia }) {
  return (
    <div className="pt-[60px]">
      <CommonHeading
        customClass={`${mobVia ? "text-[#000]" : "text-[#FFD38F]"}`}
        heading="Our Vission "
      />
      <div className="m-[auto] my-[50px]">
        <Image
          src={"/assets/about/our_vission.png"}
          alt="experience"
          className="w-[100%] arrow"
          width={"643"}
          height={468}
        />
      </div>
      <div className="">
        <Paragraph
          customClass={`${mobVia ? "text-[#000]" : "text-[#fff]"}`}
          paragraph="To conceptualize and deliver world-class spaces that combine timeless design, curated experiences, and strong investment fundamentals — creating lasting value for investors, businesses, and communities."
        />
        <Paragraph
          customClass={`${mobVia ? "text-[#000]" : "text-[#fff]"}`}
          paragraph="We are committed to precision in execution, transparency in relationships, and excellence in every detail — from planning and development to delivery and long-term asset performance."
        />
        <Paragraph
          customClass={`${mobVia ? "text-[#000]" : "text-[#fff]"}`}
          paragraph="By prioritizing quality, sustainability, and customer-centric thinking, we strive to build spaces that not only meet evolving market needs but also foster thriving business environments and meaningful human experiences."
        />
      </div>
    </div>
  );
}
