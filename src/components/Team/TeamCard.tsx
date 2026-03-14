import React from "react";
import Image from "next/image";
import { useState } from "react";
import Modals from "@/utils/Modals";
interface TeamCardProps {
  image: string;
  onClick?: () => void;
  bg?: string;
}

export default function TeamCard({ image, onClick, bg }: TeamCardProps) {

  return (
    <>
      <div className="col-span fade-up" onClick={onClick}>
        <div className={`h-[100%] cursor-pointer teams_card ${bg ? bg : 'bg-[#c6f5dc]'} lg:bg-[#c6f5dc52] pt-[20px] md:pt-[80px] relative overflow-hidden `}>
          <p className="uppercase text-center max-w-[70%] mx-[auto] text-[20px]">
            Director Manish sharma
          </p>
          <Image src={image} alt="" className="h-[390px] md:h-[400px] m-[auto] object-cover mt-[20px] lg:mt-[50px]" height={200} width={300} />
        </div>
      </div>
    </>
  );
}
