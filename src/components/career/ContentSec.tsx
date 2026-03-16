import React from "react";
import Image from "next/image";
import CommonHeading from "@/utils/CommonHeading";
import Paragraph from "@/utils/Paragraph";
export default function ContentSec() {
  return (
    <div className=" m-auto h-[100%] flex flex-col gap-10 justify-start">
      <div className="d"></div>
      <div className="lg:w-[80%] ">
        <CommonHeading heading={`Join Our Team: Build the Future with Us`} />

        <Paragraph
          customClass="lg:mt-10 md:mt-8 sm:mt-7 desktop-margin lg:mb-15 md:mb-10 sm:mb-8 text-[#113120] "
          paragraph="At Arqis, we’re seeking dynamic individuals passionate about shaping the future of real estate. Join our innovative team and help drive impactful change. Explore exciting career opportunities and make a difference in the world of real estate. Grow with us and unlock your full potential."
        />
      </div>
    </div>
  );
}
