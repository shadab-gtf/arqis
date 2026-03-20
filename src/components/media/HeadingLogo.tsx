import React from "react";
import Image from "next/image";
import CommonHeading from "@/utils/CommonHeading";

export default function HeadingLogo() {
  const handleDownload = (src: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    link.click();
  };

  return (
    // <div className="grid grid-cols-1 lg:grid-cols-2 lg:mt-20 md:mt-16 mt-12 ">
    <div className="grid grid-cols-1 lg:grid-cols-2 mb-10">
      <div className="col-span-1 ">
        <div className="lg:w-[70%] fade-up lg:mb-0 mb-[35px] pt-[110px] lg:pt-0">
          <CommonHeading heading={`Media Centre`} customClass='!pb-[2px] font-inter !text-[14px] !uppercase !font-semibold'/>
          <h3 className="text-[30px] md:text-[36px] lg:text-[48px] text-[#FFD38F]  tt-light leading-[1] lg:leading-[1.3] mt-4">
            Headlines. Stories. <br />
            Impact.
          </h3>
        </div>
      </div>
      <div className="col-span-1">
        <div className="grid lg:grid-cols-2 items-start grid-cols-1 gap-[30px] ">
          <div
            className="col-span scale-in"
           
          >
            <div className="bg-[#1F5337] ">
              <Image
                src={`/assets/plainlogo.png`}
                alt="ARQIS Group"
                height={250}
                width={370}
                className="h-[170px] w-[260px] md:h-[220px] md:w-[320px] lg:h-[250px] lg:w-[370px] object-cover mx-auto"
              />
            </div>
            <ul className="flex justify-center gap-[10px] mt-[20px]">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDownload(
                      "/assets/media-center/arqis_white_1.png",
                      "arqis_white_1.png",
                    );
                  }}
                >
                  PNG
                </a>
              </li>
              |
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDownload(
                      "/assets/media-center/arqis_white_1.png",
                      "arqis_white_1.png",
                    );
                  }}
                >
                  JPG
                </a>
              </li>
              |
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDownload(
                      "/assets/media-center/arqis_white_1.png",
                      "arqis_white_1.png",
                    );
                  }}
                >
                  WEBP
                </a>
              </li>
            </ul>
          </div>
          <div
            className="col-span scale-in"
        
          >
            <div className="bg-[#fff]">
              <Image
                src={`/assets/media-center/arqis_black_1.png`}
                alt="ARQIS Group"
                height={250}
                width={370}
                className="h-[170px] w-[260px] md:h-[220px] md:w-[320px] lg:h-[250px] lg:w-[370px] object-cover mx-auto"
              />
            </div>
            <ul className="flex justify-center gap-[10px] mt-[20px]">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDownload(
                      "/assets/media-center/arqis_black_1.png",
                      "arqis_black_1.png",
                    );
                  }}
                >
                  PNG
                </a>
              </li>
              |
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDownload(
                      "/assets/media-center/arqis_black_1.png",
                      "arqis_black_1.png",
                    );
                  }}
                >
                  JPG
                </a>
              </li>
              |
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDownload(
                      "/assets/media-center/arqis_black_1.png",
                      "arqis_black_1.png",
                    );
                  }}
                >
                  WEBP
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
