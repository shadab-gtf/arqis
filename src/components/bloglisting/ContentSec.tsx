import CommonHeading from "@/utils/CommonHeading";
import Paragraph from "@/utils/Paragraph";
import React from "react";
const data = {
  heading: "Insights & Updates: Explore Our Latest Blogs",
  desc: "Stay informed and inspired with our latest blog posts. From industry trends to expert insights, our blog covers a wide range of topics that matter to you. Whether you're looking for real estate tips, market updates, or lifestyle inspiration, our content is crafted to keep you ahead of the curve. Dive in and discover more!",
};
export default function ContentSec() {
  return (
    <div className="fade-up m-auto h-[100%] flex flex-col gap-30 justify-center">
      <div className="d"></div>
      <div className="lg:w-[80%] ">
        <CommonHeading customClass={""} heading={data.heading} />
        <Paragraph
          customClass="lg:mt-10 lg:text-lg!  md:mt-8 sm:mt-7 lg:mb-15 md:mb-10 sm:mb-8 text-[#113120]  "
          paragraph={data.desc}
        />
      </div>
    </div>
  );
}
