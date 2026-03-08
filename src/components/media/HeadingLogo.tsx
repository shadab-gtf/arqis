import React from "react";
import CommonHeading from "@/utils/CommonHeading";
import Image from "next/image";
export default function HeadingLogo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="col-span-1 my-auto">
        <div className="lg:w-[70%] fade-up lg:pt-0 !pt-[40px] lg:mb-0 mb-[40px]">
          <CommonHeading heading={`Across Pages and Places. Headlines. Stories. Impacts`} />
        </div>
      </div>
      <div className="col-span-1">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-[50px] lg:gap-[20px]">
          <div className="col-span scale-in">
            <div className="bg-[#11311f] ">
              <Image
                src={`/assets/media-center/arqis_white_1.png`}
                alt="ARQIS Group"
                height={120}
                width={300}
                className="h-[150px] object-cover"
              />
            </div>
            <ul className="flex justify-center gap-[10px] mt-[20px]">
              <li>
                <a href="#">PNG</a>
              </li>{" "}
              |
              <li>
                <a href="#">JPG</a>
              </li>{" "}
              |
              <li>
                <a href="#">WEBP</a>
              </li>
            </ul>
          </div>
          <div className="col-span scale-in">
            <div className="bg-[#fff]">
              <Image
                src={`/assets/media-center/arqis_black_1.png`}
                alt="ARQIS Group"
                height={120}
                width={300}
                className="h-[150px] object-cover"
              />
            </div>
            <ul className="flex justify-center gap-[10px] mt-[20px]">
              <li>
                <a href="#">PNG</a>
              </li>{" "}
              |
              <li>
                <a href="#">JPG</a>
              </li>{" "}
              |
              <li>
                <a href="#">WEBP</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
