import React from "react";
import Image from "next/image";

export default function HomeBanner() {
  return (
    <div className="container">
      <div className="w-[80%] m-auto">
        <p className="text-center mb-3 tracking-[5px]">NEW LAUNCH</p>
        <div className="relative  m-[auto]">
          <Image
            src={`/assets/microsite/homebanner.jpg`}
            alt="homebanner"
            className="m-[auto] w-[100%]"
            height={400}
            width={400}
          />
          <h3 className="text-[45px] font-[400] absolute left-[50%] tracking-[3.8]  bottom-[80px] translate-x-[-50%]">
            ARQIS MALL
          </h3>
          <ul className="flex listing_container pt-[30px]">
            <li className="uppercase tracking-[2] font-[500]" >Noida Sector 62</li>
            <li className="uppercase tracking-[2] font-[500]">Retail Spaces</li>
            <li className="uppercase tracking-[2] font-[500]">On Request</li>
          </ul>
        </div>  
      </div>
    </div>
  );
}
