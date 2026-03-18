import React from "react";
import CommonHeading from "@/utils/CommonHeading";
import Image from "next/image";

export default function contact() {
  return (
    <div className="custom-container m-auto h-[100%] flex flex-col gap-10 mt-20! justify-center">
      <CommonHeading customClass={`text-[#113120] uppercase`} heading={`Get in touch`} />
      <ul className="">
        <li className="mb-[30px]">
          <a className="uppercase inline-flex gap-[20px]" href="mailto:mkt@ARQIS GROUP.in">
            <Image
              src={`/assets/icons/mail.svg`}
              alt="youtube"
              height={30}
              width={30}
            />
            info@arqisgroup.com
          </a>
        </li>
        {/* <li className="mb-[30px]">
          <a className="uppercase inline-flex gap-[20px]" href="+91999999999">
            <Image
              src={`/assets/icons/telephone.svg`}
              alt="telephone"
              height={30}
              width={30}
            />
            +91999999999
          </a>
        </li> */}
        <li className="mb-[30px]">
          <a className="uppercase inline-flex gap-[20px]" href="#">
            <Image
              src={`/assets/icons/location.svg`}
              alt="telephone"
              height={30}
              width={30}
            />  
            Gulshan Sector 129 Noida
          </a>
        </li>
      </ul>
    </div>
  );
}
