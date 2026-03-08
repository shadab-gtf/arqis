import React from "react";
import CommonHeading from "@/utils/CommonHeading";
import Paragraph from "@/utils/Paragraph";
import Image from "next/image";
import Link from "next/link";
export default function MediaContent() {
  return (
    <div>
      <CommonHeading
        customClass={"pb-[40px] lg:pt-0 pt-[40pxs] text-[#FFD38F]"}
        heading="Arqis Group affirms Luxury as the New Standard with the launch of its bold new campaign"
      />
      <span className="text-white">25-09-2025</span>
     <div className="">
      <figure className="my-[40px]">
          <Image src={`/assets/media-center/mediadetail/new_1.jpg`} alt="media detail"  width={687} height={ 468}/>
       
      </figure>
   <Link href="#" className="uppercase flex text-[#fff]">Read More <Image src="/assets/icons/right_arrow_white.svg" alt="arrow logo" className="ml-2" height={30} width={25}/></Link>
       <Paragraph
        customClass="mt-5 text-[#fff] "
        paragraph={
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
        }
      />
      </div>
    </div>  
  );
}
