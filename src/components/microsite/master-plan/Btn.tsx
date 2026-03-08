import React from 'react'
import Image from 'next/image'

export default function Btn() {
  return (
        <ul className="flex gap-[60px] pt-[30px]">
        <li>
          <a
            href="#"
            className="uppercase text-[14px] tracking-[1.1] flex items-center gap-[15px] text-[var(--primary-green-color)]"
          >
            DOWNLOAD BROCHURE
            <figure className="h-[28px] w-[28px] rounded-[50%] bg-[var(--primary-green-color)]">
                 <Image
              src={`/assets/microsite/icons/right-arrow.svg`}
              alt="right arrow"
              className="h-[100%] w-[100%] p-[8px]"
              height={12}
              width={12}
            />
            </figure>
           
          </a>
        </li>
        <li>
          <a
            href="#"
            className="uppercase text-[14px] tracking-[1.1] flex items-center gap-[15px] text-[var(--primary-green-color)]"
          >
            master plan
              <figure className="h-[28px] w-[28px] rounded-[50%] bg-[var(--primary-green-color)]">
                 <Image
              src={`/assets/microsite/icons/right-arrow.svg`}
              alt="right arrow"
              className="h-[100%] w-[100%] p-[8px]"
              height={12}
              width={12}
            />
            </figure>
          </a>
        </li>
      </ul>
  )
}
