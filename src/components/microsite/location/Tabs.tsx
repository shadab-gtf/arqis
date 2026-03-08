import React from "react";

export default function Tabs({ setSelectedTab, selectedTab, tabData }) {
  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
  };

  return (
    <ul className="flex justify-center pb-[60px]">
     <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick(1);
            }}
            className={`border-[1px] tracking-[2.9] me-8 uppercase hover-Effect text-[14px] text-[600] px-[40px] py-[12px] border-[#fff] ${
              selectedTab === 1
                ? "bg-[var(--secondary-color)] text-[#000]"
                : "text-[#fff]"
            }`}
          >
         location advantges
          </a>
        </li>
         <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick(2);
            }}
            className={`border-[1px] tracking-[2.9] uppercase hover-Effect text-[14px] text-[600] px-[40px] py-[12px] border-[#fff]  ${
              selectedTab === 2
                ? "bg-[var(--secondary-color)] text-[#000]"
                : "text-[#fff]"
            }`}
          >
          View map
          </a>
        </li>
    </ul>
  );
}