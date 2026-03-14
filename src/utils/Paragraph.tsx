import React from 'react'

export default function Paragraph({ paragraph, customClass }) {
  return (
    <p className={`${customClass} text-[14px] mobile-para font-light md:text-base lg:text-lg 2xl:text-[19px] leading-[1.5] lg:leading-[1.8] !tracking-[1px] mb-[20px]`}>{paragraph}</p>
  )
}
