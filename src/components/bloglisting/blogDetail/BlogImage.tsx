
"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
export default function BlogImage({ image, data }) {
  return (
    <div className='text-center'>
      <button
        onClick={() => window.location.replace("/#blogs")}
        className="flex mt-2 items-center justify-end cursor-pointer gap-2 tracking-[1px] uppercase pb-10"
      >
        <Image
          src={"/assets/icons/arrow_left.png"}
          alt="go to home page"
          width={20}
          height={20}
          className="rotate-[270deg]"
        />
        Go back
      </button>
      <Image
        src={image || '/assets/blog/img1-lg.webp'}
        alt='blog'
        className='w-[100%] m-auto mb-10'
        height={600}
        width={600}
      />
    </div>
  )
}
