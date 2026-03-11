import React from 'react'

export default function Paragraph({paragraph,customClass}) {
  return (
    <p className={`${customClass} text-[14px] md:text-[15px] lg:text-lg leading-[1.5] lg:leading-[1.8] !tracking-[0.4px] mb-[20px]`}>{paragraph}</p>
  )
}
