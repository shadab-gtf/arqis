"use client";

import React, { useRef } from "react";
import ContentSec from "./ContentSec";
import ExperienceContent from "./ExperienceContent";
import ScrollLayout from "@/utils/ScrollLayout";
import OurMission from "./OurMission";
import OurVission from "./OurVission";
import Redirect_Link from "@/utils/Redirect_txt";
import CommonHeading from "@/utils/CommonHeading";

type AboutProps = {
  mobVia?: number | boolean;
};

export default function About({ mobVia }: AboutProps) {
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <ScrollLayout
        leftContent={<ContentSec />}
        rightContent={<ExperienceContent mobVia={mobVia} />}
        // isShowDrag={true}
        scrollableRef={scrollableRef}
        isBgColor={true}
      />
      {!!mobVia && (
        <div className="px-5 pb-[64px] sm:px-6">
          <div className="custom-container">
            <OurMission mobVia={mobVia} />
            <OurVission mobVia={mobVia} />
            <Redirect_Link
              customClass="mt-10 text-black"
              text="explore about us"
              link=""
            />
          </div>
        </div>
      )}
    </>
  );
}
