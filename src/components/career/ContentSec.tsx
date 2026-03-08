import React from "react";
import Image from "next/image";
import CommonHeading from "@/utils/CommonHeading";
export default function ContentSec() {
  return (
    <div className=" m-auto h-[100%] flex flex-col justify-center">
      <div className="max-w-[80%]">
        <CommonHeading heading={`Join the Arc of Growth`} />
      </div>
      <figure className="mt-[30px]">
        <Image
          src={`/assets/career/career.jpg`}
          className="lg:h-[auto] h-[318px]"
          alt="career"
          width={450}
          height={340}
        />
      </figure>
    </div>
  );
}
