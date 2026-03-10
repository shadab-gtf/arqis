import React from "react";
import Image from "next/image";

export default function HeadingLogo() {
  const handleDownload = (src: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="col-span-1 ">
        <div className="lg:w-[70%] fade-up  lg:mb-0 mb-[40px]">
          <h3 className="2xl:text-[32px] text-[28px] text-[#FFD38F] leading-[1.2] 2xl:leading-[1.6] tracking-[1.8] tt-light">
            Headlines. Stories. <br />Impact.
          </h3>
        </div>
      </div>
      <div className="col-span-1">
        <div className="grid lg:grid-cols-2 items-start grid-cols-1 gap-[50px] lg:gap-[20px]">
          <div className="col-span scale-in" onClick={() => handleDownload("/assets/media-center/arqis_white_1.png", "arqis_white_1.png")}>
            <div className="bg-[#1F5337]">
              <Image
                src={`/assets/plainlogo.png`}
                alt="ARQIS Group"
                height={230}
                width={320}
                className="h-[230px] object-cover"
              />
            </div>
            <ul className="flex justify-center gap-[10px] mt-[20px]">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleDownload("/assets/media-center/arqis_white_1.png", "arqis_white_1.png"); }}>PNG</a>
              </li>
              |
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleDownload("/assets/media-center/arqis_white_1.png", "arqis_white_1.png"); }}>JPG</a>
              </li>
              |
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleDownload("/assets/media-center/arqis_white_1.png", "arqis_white_1.png"); }}>WEBP</a>
              </li>
            </ul>
          </div>
          <div className="col-span scale-in" onClick={() => handleDownload("/assets/media-center/arqis_black_1.png", "arqis_black_1.png")}>
            <div className="bg-[#fff]">
              <Image
                src={`/assets/media-center/arqis_black_1.png`}
                alt="ARQIS Group"
                height={230}
                width={320}
                className="h-[230px] object-cover"
              />
            </div>
            <ul className="flex justify-center gap-[10px] mt-[20px]">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleDownload("/assets/media-center/arqis_black_1.png", "arqis_black_1.png"); }}>PNG</a>
              </li>
              |
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleDownload("/assets/media-center/arqis_black_1.png", "arqis_black_1.png"); }}>JPG</a>
              </li>
              |
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleDownload("/assets/media-center/arqis_black_1.png", "arqis_black_1.png"); }}>WEBP</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}