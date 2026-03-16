'use client'

import CommonHeading from '@/utils/CommonHeading'
import Paragraph from '@/utils/Paragraph'
import React, { useEffect, useRef, useState } from 'react'

type CounterParts = {
  value: number
  suffix: string
}

function parseCounter(title: string): CounterParts {
  const match = title.match(/([\d,.]+)(.*)/)

  if (!match) {
    return { value: 0, suffix: title }
  }

  return {
    value: Number(match[1].replace(/,/g, '')),
    suffix: match[2] || '',
  }
}

function AnimatedCounter({ title }: { title: string }) {
  const ref = useRef<HTMLHeadingElement | null>(null)
  const [displayValue, setDisplayValue] = useState(0)
  const { value, suffix } = parseCounter(title)

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    let frameId = 0
    let hasAnimated = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) {
          return
        }

        hasAnimated = true
        const duration = 1800
        const start = performance.now()

        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const easedProgress = 1 - Math.pow(1 - progress, 3)

          setDisplayValue(Math.round(value * easedProgress))

          if (progress < 1) {
            frameId = window.requestAnimationFrame(animate)
          }
        }

        frameId = window.requestAnimationFrame(animate)
        observer.disconnect()
      },
      { threshold: 0.35 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frameId)
    }
  }, [value])

  return (
    <h4
      ref={ref}
      className='title tt-regular text-[26px] leading-none italic text-[#113120] sm:text-[30px] '
    >
      {displayValue.toLocaleString()}{suffix}
    </h4>
  )
}

export default function ContentSec() {
  const data = {
    heading: 'Building with purpose, trust, and vision.',
    desc: 'Arqis Group is a testament to the seamless fusion of nature and luxury. With a deep-rooted passion for sustainable development, the group creates spaces that breathe life into every corner, blending the elegance of modern architecture with the serenity of the natural world. Their projects offer not just homes, but vibrant communities that inspire well-being, connection, and a harmonious way of life.',
    listing: [
      {
        title: '40+',
        desc: 'Years Delivered with Excellence',
      },
      {
        title: '7',
        desc: 'Key Cities Covered',
      },
      {
        title: '100+',
        desc: 'Acres of Land Parcel',
      },
      {
        title: '20M+',
        desc: 'Total Area Delivered (in Sq.Ft.)',
      },
      {
        title: '10M+',
        desc: 'Upcoming (Sq.Ft.)',
      },
      {
        title: '10M+',
        desc: 'Under construction (in sq. ft.)',
      },
    ],
  }

  return (
    <div className='fade-up mr-auto flex w-full max-w-full flex-col justify-start'>
      <CommonHeading
        customClass='pb-4 pt-0 text-[#113120] lg:pb-[40px] lg:pr-24 2xl:pr-20'
        heading={data.heading}
      />
      <Paragraph
        customClass='!mb-0 text-base!  text-[#113120]'
        paragraph={data.desc}
      />
      <div className='flex-content grid grid-cols-2 gap-x-4 lg:gap-x-0 gap-y-6 pt-6 sm:grid-cols-3 lg:pt-8 lg:gap-y-6'>
        {data.listing.map((item, index) => (
          <div key={index} className='box text-center'>
            <AnimatedCounter title={item.title} />
            <p className='desc  mx-auto mt-2  '>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
