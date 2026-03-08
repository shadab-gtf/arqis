'use client'
import ScrollLayout from '@/utils/ScrollLayout';
import React, { useRef } from 'react'
import BlogImage from './BlogImage';
import BlogContent from './BlogContent';

export default function BlogDetailContainer({ data }) {
    const scrollableRef = useRef(null);
    return (
        <div className='blog-detail'>
            <ScrollLayout
                leftContent={<BlogImage />}
                rightContent={<BlogContent />}
                isShowDrag={true}
                scrollableRef={scrollableRef}
                isBgColor={true}
                draggableAlign={true}
            />
        </div>
    )
}
