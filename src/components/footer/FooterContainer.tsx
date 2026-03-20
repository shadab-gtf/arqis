"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollContext from "@/context/ScrollContext";
import { useContext } from "react";
import AbsSec from "../common/absSec";
export default function FooterContainer() {
  const { gotoFn } = useContext(ScrollContext);
  return (
    <div className="container relative lg:h-[auto] mobile-footer cursor-pointer h-[auto]  md:h-screen lg:block flex justify-center flex-col  parallax mb-[10px]">
      <div className="lg:hidden block">
        <AbsSec abs_footer="abs_footer" />
      </div>
      <figure>
        <Image
          src={`/assets/arqis-black.webp`}
          alt="logo"
          className="m-auto"
          height={80}
          width={200}
          unoptimized
          onClick={() => gotoFn(0)}
        />
      </figure>
      <div className=" border-y-[#00000033] border-y-[1px] my-[20px] py-[20px]  lg:py-[60px]">
        <ul className="grid gap-[25px] lg:gap-[35px] grid-cols-2 lg:max-w-[50%] mx-[auto] cursor-pointer">
          <li className="col-span text-center">
            <button
              onClick={() => gotoFn(0)}
              className="uppercase cursor-pointer lg:text-[16px] text-[14px] tracking-[1.8] hover:opacity-70 transition-opacity"
            >
              Home
            </button>
          </li>
          <li className="col-span text-center">
            <button
              onClick={() => gotoFn(4)}
              className="uppercase cursor-pointer lg:text-[16px] text-[14px] tracking-[1.8] hover:opacity-70 transition-opacity"
            >
            Blogs
            </button>
          </li>
          <li className="col-span text-center">
            <button
              onClick={() => gotoFn(1)}
              className="uppercase cursor-pointer lg:text-[16px] text-[14px] tracking-[1.8] hover:opacity-70 transition-opacity"
            >
              About Us
            </button>
          </li>
          <li className="col-span text-center">
            <button
              onClick={() => gotoFn(5)}
              className="uppercase cursor-pointer lg:text-[16px] text-[14px] tracking-[1.8] hover:opacity-70 transition-opacity"
            >
              Careers
            </button>
          </li>
          <li className="col-span text-center">
            <button
              onClick={() => gotoFn(2)}
              className="uppercase cursor-pointer lg:text-[16px] text-[14px] tracking-[1.8] hover:opacity-70 transition-opacity"
            >
              Projects
            </button>
          </li>
          <li className="col-span text-center">
            <button
              onClick={() => gotoFn(6)}
              className="uppercase cursor-pointer lg:text-[16px] text-[14px] tracking-[1.8] hover:opacity-70 transition-opacity"
            >
            Our Team
            </button>
          </li>
          <li className="col-span text-center">
            <button
              onClick={() => gotoFn(3)}
              className="uppercase cursor-pointer lg:text-[16px] text-[14px] tracking-[1.8] hover:opacity-70 transition-opacity"
            >
              Media Centre
            </button>
          </li>
          <li className="col-span text-center">
            <button
              onClick={() => gotoFn(8)}
              className="uppercase cursor-pointer lg:text-[16px] text-[14px] tracking-[1.8] hover:opacity-70 transition-opacity"
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
      <ul className="flex justify-center lg:py-[0] py-[10px] gap-10">
        <li>
          <Link href={"https://www.instagram.com/arqisgroup/"}>
            <Image
              src={`/assets/icons/instagram.png`}
              alt=""
              height={16}
              width={16}
            />
          </Link>
        </li>
        <li>
          <Link href={"https://www.facebook.com/arqisgroup/"}>
            <Image
              src={`/assets/icons/facebook.png`}
              alt=""
              height={16}
              width={16}
            />
          </Link>
        </li>
        <li>
          <Link href={"https://www.youtube.com/@ArqisGroup"}>
            <Image
              src={`/assets/icons/youtube.png`}
              alt=""
              height={16}
              width={16}
            />
          </Link>
        </li>
        <li>
          <Link href={"https://www.linkedin.com/company/arqis-group/"}>
            <Image
              src={`/assets/icons/linkedin.png`}
              alt=""
              height={16}
              width={16}
            />
          </Link>
        </li>
      </ul>

      <p className="text-center uppercase  text-[14px] tracking-[2] text-[#1c653f] pt-[15px] font-medium">
        copyright Â© ARQIS GROUP 2025.
      </p>
      <p className="text-center uppercase  text-[12px] tracking-[2] lg:leading-[normal] leading-[2.1] mt-[3px] text-[#000000B2] ">
        all rights reserved | crafted by gtf technologies
      </p>
    </div>
  );
}
