import React from 'react'
import ProjectContainer from '@/components/projects/ProjectContainer'
import CommonHeading from '@/utils/CommonHeading'
export default function projects() {
  return (
    <div className=''>
      <div className='container mobile-container  !pt-[40px] px-5 sm:px-8 lg:px-10 xl:px-0'>
        <CommonHeading heading={`Where Shopping Meets Lifestyle`} />
      </div>
      <ProjectContainer />

    </div>
  )
}
