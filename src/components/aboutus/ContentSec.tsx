import CommonHeading from '@/utils/CommonHeading'
import Paragraph from '@/utils/Paragraph'
import React from 'react'
export default function ContentSec() {
  const data = {
    heading: "Building with purpose, trust, and vision.",
    desc: "Arqis Group is a testament to the seamless fusion of nature and luxury. With a deep-rooted passion for sustainable development, the group creates spaces that breathe life into every corner, blending the elegance of modern architecture with the serenity of the natural world. Their projects offer not just homes, but vibrant communities that inspire well-being, connection, and a harmonious way of life.",
    listing: [
      {
        title: "40+",
        desc: "Years Delivered with Excellence"
      },
      {
        title: "7",
        desc: "Key Cities Covered"
      },
      {
        title: "100+",
        desc: "Acres of Land Parcel"
      },
      {
        title: "20M+",
        desc: "Total Area Delivered (in  Sq.Ft )"
      },
      {
        title: "10M+",
        desc: "Upcoming ( Sq.Ft )"
      },
      {
        title: "10M+",
        desc: "Under construction (in sq. ft.)"
      },
    ]
  }
  return (
    <div className='fade-up mr-auto max-w-[100%] flex flex-col justify-start '>
      <CommonHeading customClass={'pb-[20px] 2xl:pb-[40px] pr-20 text-[#113120]'} heading={data.heading} />
      <Paragraph customClass='lg:mt-0 !mb-0 text-[#113120] ' paragraph={data.desc} />
      <div className='flex-content flex flex-wrap justify-between 2xl:pt-8 pt-5 gap-y-4 2xl:gap-y-6'>
        {
          data?.listing?.map((item, index) => <div key={index}
            className='box lg:w-[33%] text-center'>
            <h4 className='title italic text-[#113120] tt-regular text-2xl 2xl:text-[28px]'>{item.title}</h4>
            <p className='desc text-[11px] 2xl:text-[13px]'>{item.desc}</p>
          </div>)
        }
      </div>
    </div>
  )
}
