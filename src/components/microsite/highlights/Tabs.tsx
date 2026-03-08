import React from "react";

export default function Tabs({ setSelectedTab, selectedTab, tabData }) {
  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
  };

  return (
    <ul className="flex justify-center pb-[60px]">
      {tabData.map((tab, index) => (
        <li key={tab.id}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick(tab.id);
            }}
            className={`border-[1px] tracking-[2.9] hover-Effect text-[14px] text-[600] px-[40px] py-[12px] border-[#fff] ${
              index < tabData.length - 1 ? "me-10" : ""
            } ${
              selectedTab === tab.id
                ? "bg-[var(--secondary-color)] text-[#000]"
                : "text-[#fff]"
            }`}
          >
            {tab.label}
          </a>
        </li>
      ))}
    </ul>
  );
}