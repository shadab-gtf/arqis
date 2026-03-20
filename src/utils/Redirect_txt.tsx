import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

interface RedirectLinkProps {
  text: string;
  link: string;
  customClass?: string;
}

export default function Redirect_Link({ text, link, customClass }: RedirectLinkProps) {
  return (
    <Link href={link} className={`flex items-center btn-arr ${customClass} uppercase tracking-widest gap-[6px]`}>{text} <Image className='arrow_container' src='/assets/icons/right_arrow.svg' width={'25'} height={25} alt='right arrow' /></Link>
  )
}
