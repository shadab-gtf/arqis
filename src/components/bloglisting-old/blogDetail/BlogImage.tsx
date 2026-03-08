import React from 'react'
import Image from 'next/image'
export default function BlogImage({selectedImage}) {
  return (
  <div className='text-center'>
      <Image src={selectedImage||''} alt='' className='w-[80%] m-auto'  height={187} width={180}/>
    </div>
  )
}
