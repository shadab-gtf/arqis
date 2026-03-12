import React from 'react'

interface CommonHeadingProps {
  heading: string;
  customClass?: string;
}

export default function CommonHeading({ heading, customClass }: CommonHeadingProps) {
  return (
    <h2 className={`lg:text-[38px] md:text-[36px] text-[28px] leading-[1.2] lg:leading-[1.3] tracking-[1.8] tt-light ${customClass} capitalize`}>{heading}</h2>
  )
}
