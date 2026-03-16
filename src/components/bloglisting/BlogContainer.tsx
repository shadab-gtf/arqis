import ScrollLayout from '@/utils/ScrollLayout'
import React, { useRef } from 'react'
import ContentSec from './ContentSec'
import ListingSec from './ListingSec'

const blogList = [
  {
    image: "/assets/blog/img1.webp",
    heading: "Sustainable Living Trends in Contemporary Flats Across Noida",
    date: "1/31/2025",
    slug: "1"
  },
  {
    image: "/assets/blog/img2.webp",
    heading: "Sustainable Living Trends in Contemporary Flats Across Noida",
    date: "1/31/2025",
    slug: "2"
  },
  {
    image: "/assets/blog/img1.webp",
    heading: "Sustainable Living Trends in Contemporary Flats Across Noida",
    date: "1/31/2025",
    slug: "2"
  },
];

export default function BlogContainer({ mobVia }) {
  const scrollableRef = useRef(null);

  return (
    <section   className='w-full'>
      <ScrollLayout
        leftContent={<ContentSec />}
        rightContent={<ListingSec blogList={blogList} mobVia={mobVia} />}
        isShowDrag={true}
        scrollableRef={scrollableRef}
        isBgColor={true}
      />
    </section>
  )
}


// import React, { useState, useRef } from "react";
// import CommonHeading from "@/utils/CommonHeading";
// import BlogCard from "./BlogCard";
// import Modals from "@/utils/Modals";
// import BlogContent from "./blogDetail/BlogContent";
// import BlogImage from "./blogDetail/BlogImage";
// const blogData = [
//   {
//     image: "/assets/blog/blog_1.jpg",
//     heading: "How Modern Flats in Noida Are Adopting Sustainable Living?",
//   },
//   {
//     image: "/assets/blog/blog_1.jpg",
//     heading: "Top Tips for First-Time Home Buyers in 2025",
//   },
//   {
//     image: "/assets/blog/blog_1.jpg",
//     heading: "The Future of Urban Living: Smart Homes",
//   },
// ];

// export default function BlogContainer() {
//   const [hoveredSlide, setHoveredSlide] = useState(null);

//   const scrollableRef = useRef(null);

//   const close = () => setHoveredSlide(null);

//   return (
//     <div className="container   lg:pb-0 pb-[60px] lg:pt-0 !pt-[40px] parallax">
//       <CommonHeading customClass="fade-up" heading="The Arqis Edit" />
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-20 mt-[35px] lg:pb-0 pb-[60px]">
//         {blogData.map((blog, index) => (
//           <div key={index} className="col-span-1 cursor-pointer">
//             <BlogCard
//               image={blog.image}
//               heading={blog.heading}
//               index={index}
//               setHoveredSlide={setHoveredSlide}
//             />
//           </div>
//         ))}
//          <ul className="lg:hidden flex justify-end gap-2">
//         <li>
//           <a href="">1 |</a>
//         </li>
//         <li>
//           <a href="">2 |</a>
//         </li>
//         <li>
//           <a href="">3 |</a>
//         </li>
//         <li>
//           <a href="">4 </a>
//         </li>
//       </ul>
//       </div>
//       <Modals
//         scrollableRef={scrollableRef}
//         SelectedLogo={
//           <BlogImage selectedImage={blogData[hoveredSlide]?.image} />
//         }
//         MediaContent={<BlogContent />}
//         hoveredSlide={hoveredSlide}
//         onClose={close}
//         centerDragVia={true}
//       />
//     </div>
//   );
// }
