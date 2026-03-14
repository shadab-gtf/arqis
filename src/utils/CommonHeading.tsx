import React from 'react'

interface CommonHeadingProps {
  heading: string;
  customClass?: string;
}

export default function CommonHeading({ heading, customClass }: CommonHeadingProps) {
  return (
    <h2 className={`lg:text-[36px] md:text-[26px] common-heading text-[22px] font-light leading-[1.2] lg:leading-[1.3] tracking-[1px] tt-light pb-[20px] pt-6  lg:pb-[40px]   capitalize ${customClass} capitalize`}>{heading}</h2>
  )
}
