"use client";
import React from "react";
import ScrollLayout from "@/utils/ScrollLayout";
import ContentSec from "./about/ContentSec";
import RightStat from "./about/RightStat";
import { useRef } from "react";
export default function About() {
  const scrollableRef = useRef(null);

  return (
    <ScrollLayout
      leftContent={<ContentSec />}
      rightContent={<RightStat />}
      scrollableRef={scrollableRef}
      isShowDrag={true}
    />
  );
}
