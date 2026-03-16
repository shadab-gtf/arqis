import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface SubMember {
  id: string;
  name: string;
  title: string;
  image: string;
}

interface Member {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  subMembers?: SubMember[];
}

interface TeamDetailsProps {
  member: Member;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function TeamDetails({
  member,
  scrollContainerRef,
}: TeamDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuredSubMember = member.subMembers?.find(
    (sub) => sub.id === "sahil",
  );
  const regularSubMembers =
    member.subMembers?.filter((sub) => sub.id !== "sahil") ?? [];

  // Reset the detail view whenever the selected member changes.
  useEffect(() => {
    const scrollDetailsToTop = () => {
      const detailsContainer = containerRef.current;
      const scrollContainer = scrollContainerRef?.current;

      if (scrollContainer && detailsContainer) {
        const nextTop =
          scrollContainer.scrollTop +
          detailsContainer.getBoundingClientRect().top -
          scrollContainer.getBoundingClientRect().top;

        scrollContainer.scrollTo({
          top: Math.max(nextTop, 0),
          behavior: "smooth",
        });
        return;
      }

      if (detailsContainer) {
        const nextTop =
          detailsContainer.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: Math.max(nextTop, 0),
          behavior: "smooth",
        });
      }
    };

    setIsExpanded(false);
    if (contentRef.current) {
      gsap.set(contentRef.current, { height: 0, opacity: 0 });
    }

    scrollDetailsToTop();

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );
    }
  }, [member.id, scrollContainerRef]);

  // Animate read more / read less
  useEffect(() => {
    if (!contentRef.current) return;

    if (isExpanded) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.6,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.6,
        ease: "power3.inOut",
      });
    }
  }, [isExpanded]);

  if (!member) return null;

  const paragraphs = member.bio.split("\n\n").filter((p) => p.trim() !== "");

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-full text-white pt-10 px-4 md:px-0 max-w-2xl opacity-0"
    >
      <div className="text-sm md:text-[15px] leading-[1.8] tracking-wide text-[#E8E8E8]">
        {/* Always show the first paragraph, apply line-clamp when NOT expanded */}
        <p
          className={`transition-all duration-300 ${!isExpanded ? "line-clamp-10" : ""}`}
        >
          {paragraphs[0]}
        </p>

        {/* For the rest, expand them smoothly */}
        {paragraphs.length > 1 && (
          <div
            ref={contentRef}
            className="overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            <div className="flex flex-col gap-5 pt-5">
              {paragraphs.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex cursor-dot items-center gap-2 mt-8 cursor-pointer! uppercase tracking-[2px] text-sm hover:opacity-80 transition-opacity mb-16 font-medium"
      >
        READ {isExpanded ? "LESS" : "MORE"}
        <svg
          className={`w-4 h-4 transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeWidth={1.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>



      {/* Submembers */}
      {regularSubMembers.length > 0 && (
        <div className="flex flex-col gap-4 w-full max-w-md mt-4">
          {regularSubMembers.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center gap-5 bg-white/15 border border-white/10 rounded-xl px-5 md:px-6 py-4 backdrop-blur-[4px] transition-transform hover:-translate-y-1 duration-300"
            >
              <div className="w-[60px] h-[60px] md:w-[75px] md:h-[75px] rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={sub.image}
                  alt={sub.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col">
                <h4 className="text-lg md:text-xl text-white tracking-wide tt-light">
                  {sub.name}
                </h4>
                <p className="text-sm md:text-[15px] text-[#FFF1DF] mt-0.5 tracking-wide">
                  ({sub.title})
                </p>
              </div>
            </div>
          ))}
        </div>

      )}
      {featuredSubMember && (
        <div className="bg-white/15 w-full max-w-md mt-4 border border-white/10 rounded-xl px-5 md:px-6 py-4 backdrop-blur-[4px] transition-transform hover:-translate-y-1 duration-300">
          <h3 className=" text-lg md:text-xl max-w-3xs text-[#FFF1DF] tracking-wide tt-light">
            Meet The Guiding Force Behind Our Success And Vision.
          </h3>
          <div className="mt-2 flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-5">
            <div className="relative w-[60px] h-[60px] md:w-[75px] md:h-[75px] rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={featuredSubMember.image}
                alt={featuredSubMember.name}
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="text-lg md:text-xl text-white tracking-wide tt-light">
                {featuredSubMember.name}
              </h4>
              <p className="text-sm md:text-[15px] text-[#FFF1DF] mt-0.5 tracking-wide">
                {featuredSubMember.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
