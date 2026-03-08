"use client"
import React from "react";
import ScrollLayout from "@/utils/ScrollLayout";
import Form from "./Form";
import Contact from "./Contact";
import { useRef } from "react";
export default function ContactformContainer() {
  const scrollableRef = useRef(null);
  return (
    <ScrollLayout
      scrollableRef={scrollableRef}
      rightContent={<Form />}
      leftContent={<Contact />}
      isShowDrag={true}
    />
  );
}
