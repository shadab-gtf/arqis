import React from "react";
import Tabs from "./tabs";
import AmenitiesSec from "./amenitiesSec";
export default function amenitiesContainer() {
  return (
    <div className="w-[100%]">
      <Tabs />
      <AmenitiesSec/>  
    </div>
  );
}
