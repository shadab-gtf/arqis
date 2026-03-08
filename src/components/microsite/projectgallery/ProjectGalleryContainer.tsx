import React from 'react'
import CommonHeading from '@/utils/CommonHeading'
import ProjectImage from './ProjectImage'

export default function ProjectGalleryContainer() {
  return (
    <div className='container'>
      <CommonHeading heading={`ONCE IN A LIFETIME EXPERIENCE`}/>
      <ProjectImage/>
    </div>
  )
}
