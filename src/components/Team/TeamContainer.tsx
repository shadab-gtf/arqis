"use client"
import React, { useState, useRef } from "react";
import ScrollLayout from "@/utils/ScrollLayout";
import LeaderColumn from "@/components/Team/LeaderColumn";
import TeamDetails from "@/components/Team/TeamDetails";
import { teamData } from "@/data/teamData";

export default function TeamContainer() {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(teamData[0].id);

  const activeMember = teamData.find(m => m.id === activeId) || teamData[0];

  return (
    <ScrollLayout
      scrollableRef={scrollableRef}
      leftContent={
        <LeaderColumn
          members={teamData}
          activeId={activeId}
          onSelect={setActiveId}
        />
      }
      rightContent={
        <TeamDetails
          key={activeMember.id}
          member={activeMember}
          scrollContainerRef={scrollableRef}
        />
      }
      isShowDrag={false}
    />
  );
}
