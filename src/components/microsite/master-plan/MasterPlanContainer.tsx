import React from "react";
import CommonHeading from "@/utils/CommonHeading";
import FloorPlanTable from "./FloorPlanTable";
import Btn from "./Btn";
export default function MasterPlanContainer() {
  return (
    <div className="container ">
      <CommonHeading heading={`Explore Our FLoor Plans`} />
      <FloorPlanTable />
      <Btn />
    </div>
  );
}
