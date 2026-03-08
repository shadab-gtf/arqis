import React from "react";
import ContentSec from "./ContentSec";
import ExperienceContent from "./ExperienceContent";
import ScrollLayout from "@/utils/ScrollLayout";
import { useRef } from "react";
import OurMission from "./OurMission";
import OurVission from "./OurVission";
import Redirect_Link from "@/utils/Redirect_txt";

export default function About({ mobVia }) {
  const scrollableRef = useRef(null);

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
        <div className="custom-container  !pb-[80px]">
          <OurMission mobVia={mobVia} />
          <OurVission mobVia={mobVia} />
          <Redirect_Link
            customClass={`mt-[50px]   text-black `}
            text={`explore about us`}
            link={``}
          />
        </div>
      )}
    </>
  );
}
