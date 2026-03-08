import React from 'react'
import Image from 'next/image'

export default function TeamImage() {
  return (
    <div>
      <Image src={`/assets/teams/teams_image.jpg`} alt='team-1' className='w-[400px] m-auto' height={583} width={500}/>
    </div>
  )
}
