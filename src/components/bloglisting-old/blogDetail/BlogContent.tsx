import React from "react";
import CommonHeading from "@/utils/CommonHeading";
import Paragraph from "@/utils/Paragraph";
import Image from "next/image";
import Link from "next/link";
export default function BlogContent({ data }: any) {
  return (
    <div>
     <CommonHeading
  customClass={"pb-[40px] text-[#FFD38F]"}
  heading={data?.heading}
/>

<span className="text-white">{data?.date}</span>
      <div className="">
        <Paragraph
          customClass="mt-5 text-[#fff] "
          paragraph={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of."
          }
        />
        <Paragraph
          customClass="mt-5 text-[#fff] "
          paragraph={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
          }
        />
        <Paragraph
          customClass="mt-5 text-[#fff] "
          paragraph={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
          }
        />
      </div>
    </div>
  );

  
}
