import React from 'react'
import HeadingLogo from './HeadingLogo'
import NewsLogos from './NewsLogos'

export default function MediaContainer() {

  return (
    // <div className='media  lg:pt-25 md:pt-20 sm:pt-16 dark-section flex lg:flex-none flex-col items-center justify-center text-white relative lg:h-[100vh] lg:overflow-hidden h-full overflow-y-visible w-full'>
    <div className='media dark-section flex lg:flex-none flex-col items-center justify-center text-white relative lg:h-[100vh] lg:overflow-hidden h-full overflow-y-visible w-full'>
      <div className='absolute z-1  right-0 top-0 bottom-0 h-full w-full'
        style={{ background: "url(/assets/cover-bg.png) no-repeat", backgroundSize: "cover" }}
      />
      <div className='container 2xl:px-[45px]! relative z-2'>
        <HeadingLogo />
        <NewsLogos />
      </div>
    </div>
  )
}
