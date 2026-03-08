"use client"
import React from 'react'
import ContentSec from './ContentSec'
import Jobs from './Jobs'
import ScrollLayout from '@/utils/ScrollLayout'
import { useRef } from 'react'
export default function CareerContainer() {
        const scrollableRef = useRef(null);
  
  return (
   <ScrollLayout
      leftContent={<ContentSec />}
      rightContent={<Jobs />}
      scrollableRef={scrollableRef}
      isShowDrag={true}
    />
  )
}

