import React from "react";
import Image from "next/image";

export default function Hero() {
    return (
        <div className={`h-[100vh] w-[100vw] dark-section`}
        >
            <video
                autoPlay
                muted
                loop
                className=" h-full object-cover w-full left-0"
            >
                <source src="./assets/hero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* <Image
                src="/assets/green-leaf.png"
                className={`${abs_footer == 'abs_footer' ? 'w-[60%]' : 'w-[40%]'} absolute w-[40%] leaf_icon z-[999] lg:w-[20%]  left-0 lg:top-0 top-[0px]`}
                alt="logo"
                width={288} height={208}
            /> */}
        </div>
    );
}
