import React from "react";
import Image from "next/image";
import CommonHeading from "@/utils/CommonHeading";
import Paragraph from "@/utils/Paragraph";

type OurVissionProps = {
  mobVia?: number | boolean;
};

export default function OurVission({ mobVia }: OurVissionProps) {
  return (
    <div className="pt-6 md:pt-[60px]">
      <CommonHeading
        customClass={`${mobVia ? "text-[#000]" : "text-[#FFD38F]"}`}
        heading="Our Vission "
      />
      <div className="mx-auto my-4 mb-8 md:my-[50px]">
        <Image
          src="/assets/about/our_vission.png"
          alt="experience"
          className="w-full arrow"
          width={643}
          height={468}
        />
      </div>
      <div>
        <Paragraph
          customClass={`${mobVia ? "text-[#000]" : "text-[#fff]"}`}
          paragraph="To conceptualize and deliver world-class spaces that combine timeless design, curated experiences, and strong investment fundamentals, creating lasting value for investors, businesses, and communities."
        />
        <Paragraph
          customClass={`${mobVia ? "text-[#000]" : "text-[#fff]"}`}
          paragraph="We are committed to precision in execution, transparency in relationships, and excellence in every detail, from planning and development to delivery and long-term asset performance."
        />
        <Paragraph
          customClass={`${mobVia ? "text-[#000]" : "text-[#fff]"}`}
          paragraph="By prioritizing quality, sustainability, and customer-centric thinking, we strive to build spaces that not only meet evolving market needs but also foster thriving business environments and meaningful human experiences."
        />
      </div>
    </div>
  );
}
