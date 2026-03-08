import Image from "next/image";
import React from "react";

export default function MapSection() {
    return (

        <div className="m-[auto]">
            <Image
                src={"/assets/about/map.png"}
                alt="experience"
                className="w-[100%] arrow"
                width={"643"}
                height={468}
            />
        </div>

    )
}