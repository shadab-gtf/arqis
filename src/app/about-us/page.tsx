import React from 'react'
import HorizontalLayout from "@/components/layouts/HorizontalLayout";

export default function page() {
    return (
        <HorizontalLayout>
            <div className="flex h-[100vh]  overflow-x-scroll justify-stretch horizontal-section">
                <div className="bg-gray-300 basis-[100%] flex items-center  overflow-hidden  item grow-0 shrink-0 h-full">
                    <div className=''></div>
                </div>
                <div className="bg-gray-600 basis-[100%] flex items-center  overflow-hidden  item grow-0 shrink-0 h-full">
                    <div className=''></div>
                </div>
                <div className="bg-gray-300 basis-[100%] flex items-center  overflow-hidden  item grow-0 shrink-0 h-full">
                    <div className=''></div>
                </div>
                <div className="bg-gray-600 basis-[100%] flex items-center  overflow-hidden  item grow-0 shrink-0 h-full">
                    <div className=''></div>
                </div>
                <div className="bg-gray-300 basis-[100%] flex items-center  overflow-hidden  item grow-0 shrink-0 h-full">
                    <div className=''></div>
                </div>
            </div>
        </HorizontalLayout>
    )
}
