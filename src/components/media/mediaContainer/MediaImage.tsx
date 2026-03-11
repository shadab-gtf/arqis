import React from "react";
import Image from "next/image";

interface MediaLogoProps {
  selectedImage: string;
}

const logoSizeMap: Record<string, string> = {
  "logo_1.png": "w-[110px] md:w-[120px] lg:w-[130px]",
  "logo_2.png": "w-[130px] md:w-[150px] lg:w-[170px]",
  "logo_3.png": "w-[130px] md:w-[150px] lg:w-[170px]",
  "logo_4.png": "w-[120px] md:w-[150px] lg:w-[170px]",
};

export default function MediaLogo({ selectedImage }: MediaLogoProps) {
  const imageName = selectedImage?.split("/").pop() || "";
  const logoSizeClass =
    logoSizeMap[imageName] || "w-[170px] md:w-[190px] lg:w-[180px]";

  return (
    <div className="flex min-h-[calc(100vh-400px)] flex-col text-[#fbf2e6]">
      <div className="flex flex-1 items-center justify-end " style={{ marginRight: "100px" }}>
        <Image
          src={selectedImage || ""}
          alt="Selected media logo"
          width={170}
          height={180}
          className={`h-auto mx-auto  ${logoSizeClass} object-contain`}
        />
      </div>
    </div>
  );
}
