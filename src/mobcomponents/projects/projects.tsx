import React from 'react'
import ProjectContainer from '@/components/projects/ProjectContainer'
import CommonHeading from '@/utils/CommonHeading'
export default function projects() {
  return (
    <div className=''>
      <div className='container mobile-container  !pt-[70px] px-5 sm:px-8 lg:px-10 xl:px-0'>
        <CommonHeading heading={`Our Projects`} customClass='!pb-[2px] font-inter !text-[14px] !uppercase !font-semibold'/>
        <CommonHeading heading={`Where Shopping Meets Lifestyle`} customClass='!pt-[12px] mt-2'/>
      </div>
      <ProjectContainer />

    </div>
  )
}
