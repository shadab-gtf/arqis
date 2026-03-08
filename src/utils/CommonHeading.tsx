import React from 'react'

interface CommonHeadingProps {
  heading: string;
  customClass?: string;
}

export default function CommonHeading({ heading, customClass }: CommonHeadingProps) {
  return (
    <h2 className={`2xl:text-[35px] text-[28px] leading-[1.2] 2xl:leading-[1.6] tracking-[1.8] tt-light ${customClass} capitalize`}>{heading}</h2>
  )
}
