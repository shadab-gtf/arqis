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
}

export default function TeamDetails({ member }: TeamDetailsProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Animate details entry on member change
    useEffect(() => {
        setIsExpanded(false);
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            );
        }
    }, [member.id]);

    // Animate read more / read less
    useEffect(() => {
        if (!contentRef.current) return;

        if (isExpanded) {
            gsap.to(contentRef.current, {
                height: "auto",
                opacity: 1,
                duration: 0.6,
                ease: "power3.inOut"
            });
        } else {
            gsap.to(contentRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.6,
                ease: "power3.inOut"
            });
        }
    }, [isExpanded]);

    if (!member) return null;

    const paragraphs = member.bio.split('\n\n').filter(p => p.trim() !== '');

    return (
        <div ref={containerRef} className="flex flex-col w-full text-white pt-10 px-4 md:px-0 max-w-2xl opacity-0">
            <div className="text-sm md:text-[15px] leading-[1.8] tracking-wide text-[#E8E8E8]">
                {/* Always show the first paragraph, apply line-clamp when NOT expanded */}
                <p className={`transition-all duration-300 ${!isExpanded ? 'line-clamp-10' : ''}`}>
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
                className="flex items-center gap-2 mt-8 cursor-pointer! uppercase tracking-[2px] text-sm hover:opacity-80 transition-opacity mb-16 font-medium"
            >
                READ {isExpanded ? 'LESS' : 'MORE'}
                <svg className={`w-4 h-4 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Submembers */}
            {member.subMembers && member.subMembers.length > 0 && (
                <div className="flex flex-col gap-4 w-full mt-4">
                    {member.subMembers.map((sub) => (
                        <div key={sub.id} className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-xl px-5 md:px-6 py-4 backdrop-blur-md transition-transform hover:-translate-y-1 duration-300">
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
                                <p className="text-sm md:text-[15px] text-white/70 mt-0.5 tracking-wide">
                                    ({sub.title})
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}