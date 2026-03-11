import React from 'react'
import HeadingLogo from './HeadingLogo'
import NewsLogos from './NewsLogos'

export default function MediaContainer() {

  return (
    <div className='media lg:pt-25 md:pt-20 sm:pt-16 dark-section text-white relative h-[100vh] overflow-hidden w-full'>
      <div className='absolute z-1  right-0 top-0 bottom-0 h-full w-full'
        style={{ background: "url(/assets/cover-bg.png) no-repeat", backgroundSize: "cover" }}
      />
      <div className='container relative z-2'>
        <HeadingLogo />
        <NewsLogos />
      </div>
    </div>
  )
}
