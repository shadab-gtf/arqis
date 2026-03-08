"use client";
import React from "react";
import { useState } from "react";
import Tabs from "./Tabs";
import IconItem from "./IconItems";

export default function HightlightsContainer() {
  const [selectedTab, setSelectedTab] = useState(1);
  const content = {
    1: {
      label: "HIGHLIGHTS",
      items: [
        {
          src: `/assets/microsite/hightlight/h_icon_1.png`,
          caption: "Showroom Space at Lower Ground, Ground, First Floor",
        },
        {
          src: `/assets/microsite/hightlight/h_icon_2.png`,
          caption: "Club House & Amenities at 13th floor",
        },
        {
          src: `/assets/microsite/hightlight/h_icon_3.png`,
          caption: "100% Power Backup For Common Areas With Silent DG Set.",
        },
        {
          src: `/assets/microsite/hightlight/h_icon_4.png`,
          caption: "Building Managed by Professional Agency with 24 hours Security",
        },
        {
          src: `/assets/microsite/hightlight/h_icon_5.png`,
          caption: "Earthquake Resistant Structure",
        },
        {
          src: `/assets/microsite/hightlight/h_icon_6.png`,
          caption: "Rain Water Harvesting System",
        },
      ],
    },
    2: {
      label: "SPECIFICATION",
      items: [
        {
          src: `/assets/microsite/specification/s_icon_1.png`,
          heading: "Walls & Paint",
          caption: "The building features a modern elevation with glass, ACP, paint, an imposing entrance lobby, and sleek MS railings.",
        },
        {
          src: `/assets/microsite/specification/s_icon_2.png`,
          heading: "Astu-compliant & Wi-Fi",
          caption: "The interiors include designer tiles, granite or stone floors, MS railings, broadband Wi-Fi, Vastu-friendly design, an elegant reception lobby with electronic security.",
        },
        {
          src: `/assets/microsite/specification/s_icon_3.png`,
          heading: "Well-lit & lighting",
          caption: "The lighting includes advanced fixtures with energy-efficient lamps, ensuring ample light and ventilation for offices, with power connections distributed to all saleable areas.",
        },
        {
          src: `/assets/microsite/specification/s_icon_4.png`,
          heading: "Toilets Feature Premium",
          caption: "The building features a modern elevation with glass, ACP, paint, an imposing entrance lobby, and sleek MS railings.",
        },
        {
          src: `/assets/microsite/specification/s_icon_5.png`,
          heading: "Security & Facilities",
          caption: "The interiors include designer tiles, granite or stone floors, MS railings, broadband Wi-Fi, Vastu-friendly design, an elegant reception lobby with electronic security.",
        },
        {
          src: `/assets/microsite/specification/s_icon_6.png`,
          heading: "Mall Lift",
          caption: "The lighting includes advanced fixtures with energy-efficient lamps, ensuring ample light and ventilation for offices, with power connections distributed to all saleable areas.",
        },
        {
          src: `/assets/microsite/specification/s_icon_1.png`,
          heading: "Walls & Paint",
          caption: "The building features a modern elevation with glass, ACP, paint, an imposing entrance lobby, and sleek MS railings.",
        },
        {
          src: `/assets/microsite/specification/s_icon_2.png`,
          heading: "Astu-compliant & Wi-Fi",
          caption: "The interiors include designer tiles, granite or stone floors, MS railings, broadband Wi-Fi, Vastu-friendly design, an elegant reception lobby with electronic security.",
        },
        {
          src: `/assets/microsite/specification/s_icon_3.png`,
          heading: "Well-lit & lighting",
          caption: "The lighting includes advanced fixtures with energy-efficient lamps, ensuring ample light and ventilation for offices, with power connections distributed to all saleable areas.",
        },
        {
          src: `/assets/microsite/specification/s_icon_4.png`,
          heading: "Toilets Feature Premium",
          caption: "The building features a modern elevation with glass, ACP, paint, an imposing entrance lobby, and sleek MS railings.",
        },
        {
          src: `/assets/microsite/specification/s_icon_5.png`,
          heading: "Security & Facilities",
          caption: "The interiors include designer tiles, granite or stone floors, MS railings, broadband Wi-Fi, Vastu-friendly design, an elegant reception lobby with electronic security.",
        },
        {
          src: `/assets/microsite/specification/s_icon_6.png`,
          heading: "Mall Lift",
          caption: "The lighting includes advanced fixtures with energy-efficient lamps, ensuring ample light and ventilation for offices, with power connections distributed to all saleable areas.",
        },
      ],
    },
  };
  const tabData = Object.entries(content).map(([id, data]) => ({
    id: parseInt(id),
    label: data.label,
  }));
  const currentItems = content[selectedTab]?.items || [];
  return (
    <div className="container dark-section !pt-[150px] ">
      <Tabs
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
        tabData={tabData}
      />
      <IconItem items={currentItems} selectedTab={selectedTab} />
    </div>
  );
}
