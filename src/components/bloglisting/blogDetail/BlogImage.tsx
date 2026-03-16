
"use client"
import React from 'react'
import Image from 'next/image'
import ScrollContext from "@/context/ScrollContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function BlogImage({ image, data }) {
  const scrollContext = useContext(ScrollContext);
  const gotoFn = scrollContext?.gotoFn;
  const router = useRouter();

  const handleBack = () => {
    // When the blog detail is rendered inside the scrollable homepage layout, prefer its smooth scroll helper.
    if (gotoFn) {
      gotoFn(4);
      return;
    }

    // Fallback for standalone render: navigate home and jump to the blog section.
    router.push("/#blog-listing");
  };

  return (
    <div className='text-center'>
      <button onClick={handleBack}
        className="flex items-center justify-end gap-2 tracking-[1px] uppercase pb-10"
        title='go back'
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
        className='w-[100%] m-auto mb-20'
        height={600}
        width={600}
      />
    </div>
  )
}
