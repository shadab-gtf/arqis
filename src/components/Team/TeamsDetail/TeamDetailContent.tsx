import React from "react";
import Image from "next/image";
import CommonHeading from "@/utils/CommonHeading";
import Paragraph from "@/utils/Paragraph";
export default function TeamDetailContent({onClose}) {

  return (
    <div>
      <div onClick={onClose} className="cross absolute cursor-pointer top-[80px] right-[100px]">
        <Image
          src={`/assets/icons/cross.svg`}
          alt="cross"
          height={40}
          width={40}
          className="cross"
        />
      </div>
      <div className="max-w-[80%]">
        <CommonHeading
          customClass={"pb-[40px] text-[#FFD38F]"}
          heading="Manish sharma Chairman & MD, Arqis Group"
        />
      </div>
      <Paragraph
        customClass={`text-white mb-[25px]`}
        paragraph={`Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of.`}
      />
      <Paragraph
        customClass={`text-white`}
        paragraph={` Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.`}
      />

      <Image
        src={`/assets/teams/teams_detail/sign.png`}
        alt="sign"
        className="mt-[30px]"
        height={141}
        width={211}
      />
    </div>
  );
}
