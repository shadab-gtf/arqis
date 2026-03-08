import React from "react";

export default function Tabs() {
  return (
    <div className="container pb-[30px] relative z-[33] pl-[80px]">
    <ul className="flex gap-[40px] justify-start">
      <li className="cursor-pointer">
        <a href="#"><span className="inline-block me-2  uppercase tracking-[1.1]">
          Entertainment Zone
        </span>
        <span className="h-[20px] w-[20px] border-[1px] rounded-[50%] inline-flex justify-center items-center">
          +
        </span>
        </a>
      </li>
      <li className="cursor-pointer">
       <a href="#"><span className="inline-block me-2  uppercase tracking-[1.1]">
          Food & Dining
        </span>
        <span className=" h-[20px] w-[20px] border-[1px] rounded-[50%] inline-flex justify-center items-center">
          +
        </span>
        </a> 
      </li>
      <li className="cursor-pointer">
         <a href="#">
        <span className="inline-block me-2  uppercase tracking-[1.1]">
          Comfort & Essentials
        </span>
        <span className=" h-[20px] w-[20px] border-[1px] rounded-[50%] inline-flex justify-center items-center">
          +
        </span>
        </a>
      </li>
      <li className="cursor-pointer">
        <a href="#">
        <span className="inline-block me-2  uppercase tracking-[1.1]">
          Convenience
        </span>
        <span className=" h-[20px] w-[20px] border-[1px] rounded-[50%] inline-flex justify-center items-center">
          +
        </span>
        </a>
      </li>
    </ul>
    </div>
  );
}
