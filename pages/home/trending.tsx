import React from "react";
import Image from "next/image";

export default function Trending() {
  return (
    <div className="bg-[#070707] flex items-center justify-between w-full h-full p-4 mx-auto">
    <div className="w-[1440px] h-full relative mx-auto">
    <div className="w-[1440px] h-[814px] px-[69.95px] pb-[107px] shadow flex-col justify-start items-start gap-[55.19px] inline-flex">
    <Image className="w-[1300.09px] h-[400px] bg-zinc-300 rounded-lg" src={""} alt={""} />
    <div className="self-stretch justify-start items-start gap-[92px] inline-flex">
        <div className="w-[679.88px] text-white text-[60px] font-normal font-bebasNeue uppercase leading-[88px]">Coldplay Music of The Spheres World Tour 2023</div>
        <div className="w-[528.09px] h-[157px] flex-col justify-start items-start gap-6 inline-flex">
            <div className="self-stretch text-zinc-500 text-lg font-normal leading-[27px]">Coldplay have announced their hugely-anticipated return to Asia and Australia with a special run of stadium shows in November 2023, as part of their record-breaking Music Of The Spheres World Tour. </div>
            <div className="px-6 py-3.5 bg-purple-500 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-base font-normal leading-normal text-white">Discover Event</div>
            </div>
        </div>
    </div>
</div>
</div>
    </div>
  )
}