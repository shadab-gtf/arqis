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
      <div>
  {data?.content?.map((para: string, index: number) => (
    <Paragraph
      key={index}
      customClass="mt-5 text-[#fff]"
      paragraph={para}
    />
  ))}
</div>
    </div>
  );


}
