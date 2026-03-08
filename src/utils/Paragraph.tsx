import React from 'react'

export default function Paragraph({paragraph,customClass}) {
  return (
    <p className={`${customClass} text-[14px] 2xl:text-[16px] leading-[1.5] 2xl:leading-[1.8] !tracking-[0.4px] mb-[20px]`}>{paragraph}</p>
  )
}
