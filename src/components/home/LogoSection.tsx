import React from 'react'
import Image from 'next/image'
export default function LogoSection() {
  return (
    <div className='container'>
    <figure className='m-auto flex  justify-center  h-[100vh]'>
        <Image src='/assets/logo.png' className='w-[25%] no-view   logo-section object-contain' width={300} height={300} alt='Reshaping Real Estate'/>
    </figure>
    </div>
  )
}
