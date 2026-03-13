"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function MapSection() {
  const [showLocation, setShowLocation] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setShowLocation((prev) => !prev)}
      className="relative mx-auto block aspect-[29/33] w-full max-w-[320px] overflow-hidden sm:max-w-[420px] md:max-w-[500px] lg:max-w-[580px] xl:max-w-[640px] 2xl:max-w-[700px]"
    >
      <Image
        src="/assets/about/withpin.png"
        alt="experience"
        width={580}
        height={660}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ease-out ${
          showLocation ? "opacity-0" : "opacity-100"
        }`}
        sizes="(max-width: 640px) 320px, (max-width: 768px) 420px, (max-width: 1024px) 500px, (max-width: 1280px) 580px, (max-width: 1536px) 640px, 700px"
        priority
      />
      <Image
        src="/assets/about/withlocation.png"
        alt="experience location"
        width={580}
        height={660}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ease-out ${
          showLocation ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 640px) 320px, (max-width: 768px) 420px, (max-width: 1024px) 500px, (max-width: 1280px) 580px, (max-width: 1536px) 640px, 700px"
        priority
      />
    </button>
  );
}
