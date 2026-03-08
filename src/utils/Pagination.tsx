import React from 'react'
import Image from 'next/image'
import ScrollContext from '../context/ScrollContext'
import { useContext } from 'react'
export default function Pagination({ navVal }) {
  const { next, prev } = useContext(ScrollContext) as { next: () => void; prev: () => void };

  return (
    <div className='bg-[var(--primary-green-color)] border-[1px] border-[#ffffff4d] py-[35px]'>
      <div className='container text-center'>
        <span className='uppercase text-white text-[14px] tracking-[2.5]'>Next Page</span>
        <h4 className='uppercase text-white text-[20px] mt-[24px] mb-[5px] font-[400] tracking-[5]' >{navVal}</h4>
        <Image src={`/assets/icons/arrow-white.svg`} width={34} height={34} className='m-auto' onClick={() => next()} alt='Arrow White' />
      </div>
    </div>
  )
}
