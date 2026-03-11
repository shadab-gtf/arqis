"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import ScrollLayout from "./ScrollLayout";
import Image from "next/image";
import { gsap } from "gsap";

interface ModalProps {
  MediaContent: React.ReactNode;
  scrollableRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  SelectedLogo: React.ReactNode;
  hoveredSlide: any;
  centerDragVia?: any;
  animation?: string;
}

export default function Modals({
  MediaContent,
  scrollableRef,
  onClose,
  SelectedLogo,
  hoveredSlide,
  centerDragVia,
  animation
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef(null);
  const isClosing = useRef(false);

  useEffect(() => {
    setMounted(true);

    if (hoveredSlide != null && modalRef.current && !isClosing.current) {
      if (animation === 'opacity') {
        gsap.fromTo(
          modalRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          }
        );
      } else {
        gsap.fromTo(
          modalRef.current,
          {
            scale: 0.95,
            x: '100%',
          },
          {
            scale: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
          }
        );
      }

      return () => { };
    }
  }, [hoveredSlide, animation]);

  const handleClose = () => {
    if (modalRef.current && !isClosing.current) {
      isClosing.current = true;
      if (animation === 'opacity') {
        gsap.to(modalRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power3.in",
          onComplete: () => {
            isClosing.current = false;
            onClose();
          },
        });
      } else {
        gsap.to(modalRef.current, {
          x: '100%',
          duration: 1,
          ease: "power3.in",
          onComplete: () => {
            isClosing.current = false;
            onClose();
          },
        });
      }
    }
  };

  if (!mounted || hoveredSlide == null) return null;

  return createPortal(
    <div
      ref={modalRef}
      className="modal-container fixed bg-[#f7efe1f5] top-0 left-0 h-full w-full z-[999]"
    >
      <div
        onClick={handleClose}
        className="cross absolute cursor-pointer top-[20px] right-[20px] z-[99999]"
      >
        <Image
          src={`/assets/icons/cross.svg`}
          alt="cross"
          className="cross"
          height={40}
          width={40}
        />
      </div>
      <ScrollLayout
        leftContent={SelectedLogo}
        rightContent={MediaContent}
        scrollableRef={scrollableRef}
        isShowDrag={true}
        centerDragVia={centerDragVia}
        containerClassName="pt-0"
        leftContentClassName="ml-20!"
      />
    </div>,
    document.body
  );
}
