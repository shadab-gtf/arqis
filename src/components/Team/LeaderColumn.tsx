// components/Team/LeaderColumn.tsx
import React from "react";
import Image from "next/image";
import CommonHeading from "@/utils/CommonHeading";
import { Minus, Plus } from "lucide-react";

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

interface LeaderColumnProps {
    members: Member[];
    activeId: string;
    onSelect: (id: string) => void;
}

export default function LeaderColumn({ members, activeId, onSelect }: LeaderColumnProps) {

    return (
        <div className="flex flex-col w-full">
            <CommonHeading
                heading="Vision Built. Purpose Led."
                customClass=""
            />
            <div className="flex flex-col gap-10">
                {members.map((member) => {
                    const isActive = member.id === activeId;
                    return (
                        <div key={member.id} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                            {/* Photo Frame */}
                            <div className="w-[180px] h-[180px] md:w-[200px] md:h-[200px]  flex-shrink-0 bg-white border border-[#113120]/15 overflow-hidden">
                                <div className="w-full h-full relative">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover object-top"
                                    />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex flex-col pt-2 sm:pt-0">
                                <h3 className="text-xl md:text-[24px] lg:text-[28px] 2xl:text-[25px] text-[#113120] tt-light tracking-[1px]">
                                    {member.name}
                                </h3>
                                <p className="text-[#113120] text-sm md:text-sm lg:text-base tracking-[1px] mt-1 mb-6">
                                    ({member.title})
                                </p>
                                <button
                                    onClick={() => onSelect(member.id)}
                                    className="cursor-dot flex items-center gap-3 text-base text-[#113120] font-normal tracking-widest hover:opacity-80 transition-opacity uppercase"
                                >
                                    VIEW DETAILS
                                    <span className="w-6 h-6 px-0.5 rounded-full bg-[#113120] text-white flex items-center justify-center text-lg leading-none shrink-0">
                                        {isActive ? <Minus /> : <Plus />}
                                    </span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}