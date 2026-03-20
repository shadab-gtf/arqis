import Image from 'next/image'
import React, { } from 'react'
import Link from 'next/link';


export default function ListingSec({ blogList, mobVia }: { blogList: any; mobVia?: any }) {

    return (
        <>
            <div className='lg:pt-16 pt-[40px]  lg:pb-0 grid gap-y-10 md:gap-y-44 max-w-full md:max-w-[65%] justify-end mx-auto' id="blog-listing">
                {blogList.map((item: any, index: number) => <div
                    key={index}
                    className='p-4 bg-[#fff1df]'
                >
                    <div className='img-div overflow-hidden'>
                        <Image
                            src={item.image}
                            alt={item.heading}
                            width={300}
                            height={300}
                            className='w-full object-cover'
                        />
                    </div>
                    <div className='footer '>
                        <h3 className='capitalize py-4 lg:text-[17px] text-[16px] tracking-[1px]'>{item.heading}</h3>
                        <div className='flex items-center text-[12px] lg:text-[14px] tracking-[1px] opacity-50'>
                            <span className='block'>{item.date} | Blog </span>
                            <b className='block pl-px'>{index + 1}</b>
                        </div>
                        <Link
                            href={`/blog/${item.slug}`}
                            className='flex items-center pt-8 pb-2 uppercase read-more tracking-[1px] gap-2'
                            onClick={() => {
                                if (typeof window !== "undefined") {
                                    window.sessionStorage.setItem("lastSection", "4");
                                }
                            }}
                        >read more
                            <Image
                                className='arrow_container'
                                src='/assets/icons/right_arrow.svg'
                                width={'25'}
                                height={25}
                                alt='right arrow' />
                        </Link>
                    </div>
                </div>)}
            </div>

        </>
    )
}
