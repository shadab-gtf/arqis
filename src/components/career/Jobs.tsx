import React from "react";
import JobCards from "./JobCards";
import JobForm from "./JobForm";
export default function Jobs() {
  return (
    <div className="">
      <div className="job_cards  lg:pb-0 pb-[50px] lg:border-none border-b-[1px] border-[#fff]">
        <JobCards />
        <JobCards />
        <JobCards />
        <JobCards />
      </div>
      <JobForm />
    </div>
  );
}
