import React from "react";
import Image from "next/image";
import Paragraph from "@/utils/Paragraph";
import CommonHeading from "@/utils/CommonHeading";
export default function OurMission({ mobVia }) {
  return (
    <div className="pt-[60px]">
      <CommonHeading
        customClass={`${mobVia ? "text-[#000]" : "text-[#FFD38F]"}`}
        heading="Our Mission "
      />
      <div className="m-[auto] my-[50px] ">
        <Image
          src={"/assets/about/our_mission.png"}
          alt="experience"
          className="w-[100%] arrow"
          width={"643"}
          height={468}
        />
      </div>

      <div className="">
        <Paragraph
          customClass={`${mobVia ? "text-[#000]" : "text-[#fff]"}`}
          paragraph="To become a leading creator of landmark destinations that transform skylines and redefine the future of urban luxury."/>
        <Paragraph
          customClass={`${mobVia ? "text-[#000]" : "text-[#fff]"}`}
          paragraph="We envision shaping environments where architecture, commerce, and lifestyle converge — creating vibrant ecosystems that inspire growth, elevate experiences, and contribute meaningfully to the cities we serve."/>
        <Paragraph
          customClass={`${mobVia ? "text-[#000]" : "text-[#fff]"}`}
          paragraph="Through thoughtful design and forward-thinking development, we aspire to set new standards of excellence, innovation, and enduring value in every project we undertake."/>
      </div>
    </div>
  );
}
