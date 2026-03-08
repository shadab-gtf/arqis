import React from "react";
import CommonHeading from "../../utils/CommonHeading";
import Redirect_Link from "@/utils/Redirect_txt";
export default function ProjectContent() {
  return (
    <div className="flex flex-col h-[100%] justify-between">
      <CommonHeading
        heading="The Arc of Retail and Recreation"
        customClass="mb-5 lg:block hidden"
      />
      <p className="font-[400] tracking-[2px] text-[16px] lg:text-[25px] uppercase">
        Arqis Mall
      </p>
      <Redirect_Link customClass={`lg:flex hidden`} text="Explore More" link="" />
    </div>
  );
}
