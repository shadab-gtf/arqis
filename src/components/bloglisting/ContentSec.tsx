import CommonHeading from '@/utils/CommonHeading'
import Paragraph from '@/utils/Paragraph'
import React from 'react'
const data = {
    heading: "Insights & Updates: Explore Our Latest Blogs",
    desc: "Stay informed and inspired with our latest blog posts. From industry trends to expert insights, our blog covers a wide range of topics that matter to you. Whether you're looking for real estate tips, market updates, or lifestyle inspiration, our content is crafted to keep you ahead of the curve. Dive in and discover more!",
}
export default function ContentSec() {
    return (
        <div className='fade-up mr-auto max-w-[100%] flex flex-col justify-start pt-15 2xl:pt-12 lg:pr-30'>
            <CommonHeading customClass={'pb-[45px] 2xl:pb-[40px] pr-10 text-[#113120]'} heading={data.heading} />
            <Paragraph customClass='lg:mt-0 !mb-0 text-[#113120] ' paragraph={data.desc} />
        </div>
    )
}

