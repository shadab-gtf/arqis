import React from 'react'
import ScrollLayout from '@/utils/ScrollLayout'
import TeamImage from './TeamImage'
import TeamDetailContent from './TeamDetailContent'
import { useRef } from 'react'

interface TeamDetailProps {
  onClose: () => void;
  isOpen?: boolean;
  setOpenModal?: (val: boolean) => void;
}

export default function TeamDetailContainer({ onClose, isOpen, setOpenModal }: TeamDetailProps) {
  const scrollableRef = useRef<HTMLDivElement>(null);
  return (
    <ScrollLayout
      leftContent={<TeamImage />}
      rightContent={<TeamDetailContent onClose={onClose} />}
      isShowDrag={false}
      scrollableRef={scrollableRef}
    />
  )
}
