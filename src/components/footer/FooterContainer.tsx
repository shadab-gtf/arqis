"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollContext from '@/context/ScrollContext';
import { useContext } from "react";
import AbsSec from "../common/absSec";
export default function FooterContainer() {
  const {gotoFn}=useContext(ScrollContext)
  return (
    <div className="container relative lg:h-[auto] h-screen lg:block flex justify-center flex-col  parallax">
      <div className="lg:hidden block">
      <AbsSec abs_footer="abs_footer"/>
      </div>
      <figure>
        <Image
          src={`/assets/logo.png`}
          alt=""
          className="m-auto"
          height={80}
          width={200}
        />
      </figure>
      <div className="py_sm border-y-[#00000033] border-y-[1px] my-[50px] py-[30px]  lg:py-[60px]">
        <ul className="grid gap-[25px] lg:gap-[35px] grid-cols-2 lg:max-w-[50%] mx-[auto]">
          <li className="col-span text-center">
            <Link onClick={()=>gotoFn(0)} className="uppercase lg:text-[16px] text-[14px] tracking-[1.8]" href={"#"}>
              Home
            </Link>
          </li>
          <li className="col-span text-center">
            <Link  onClick={()=>gotoFn(3)} className="uppercase lg:text-[16px] text-[14px] tracking-[1.8]" href={"#"}>
              Our Team 
            </Link>
          </li>
          <li className="col-span text-center">
            <Link  onClick={()=>gotoFn(1)} className="uppercase lg:text-[16px] text-[14px] tracking-[1.8]" href={"#"}>
              Philosophy
            </Link>
          </li>
          <li className="col-span text-center">
            <Link onClick={()=>gotoFn(5)}   className="uppercase lg:text-[16px] text-[14px] tracking-[1.8]" href={"#"}>
              Careers
            </Link>
          </li>
          <li className="col-span text-center">
            <Link onClick={()=>gotoFn(2)} className="uppercase lg:text-[16px] text-[14px] tracking-[1.8]" href={"#"}>
              Projects
            </Link>
          </li>
          <li className="col-span text-center">
            <Link  onClick={()=>gotoFn(5)}  className="uppercase lg:text-[16px] text-[14px] tracking-[1.8]" href={"#"}>
              Media Centre
            </Link>
          </li>
        </ul>
      </div>
      <ul className="flex justify-center lg:py-[0] py-[30px] gap-10">
        <li>
          <Link href={"#"}>
            <Image
              src={`/assets/icons/instagram.png`}
              alt=""
              height={20}
              width={20}
            />
          </Link>
        </li>
        <li>
          <Link href={"#"}>
            <Image
              src={`/assets/icons/facebook.png`}
              alt=""
              height={20}
              width={20}
            />
          </Link>
        </li>
        <li>
          <Link href={"#"}>
            <Image
              src={`/assets/icons/youtube.png`}
              alt=""
              height={20}
              width={20}
            />
          </Link>
        </li>
        <li>
          <Link href={"#"}>
            <Image
              src={`/assets/icons/linkedin.png`}
              alt=""
              height={20}
              width={20}
            />
          </Link>
        </li>
      </ul>

      <p className="text-center uppercase  text-[14px] tracking-[2] text-[#000000B2] pt-[30px]">
        copyright © ARQIS GROUP 2025.
      </p>
      <p className="text-center uppercase  text-[14px] tracking-[2] lg:leading-[normal] leading-[2.1] mt-2 text-[#000000B2] ">
        all rights reserved | crafted by gtf technologies
      </p>
    </div>
  );
}
