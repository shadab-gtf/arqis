import React from 'react'
import Image from 'next/image'
export default function MediaLogo({selectedImage}) {
  return (
    <div className='text-center'>
      <Image src={selectedImage||''} alt=''  height={200} width={180}/>
    </div>
  )
}
