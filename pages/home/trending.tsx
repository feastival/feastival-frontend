import React from "react";
import Image from "next/image";

export default function Trending() {
  return (
    <div className="bg-[#070707] flex items-center justify-between w-full h-full p-4 mx-auto">
    <div className="w-[1440px] h-full relative mx-auto">
    <div className="w-[1440px] px-[69.95px] pb-[107px] shadow flex-col justify-start items-start gap-[55.19px] inline-flex">
    <Image className="mx-auto rounded-xl bg-zinc-300" width={1450} height={1000} src="https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2023/05/11/poster-konser-coldplay-artikel-ke-1-2387481471.jpg" alt={""} />
    <div className="self-stretch justify-start items-start gap-[92px] inline-flex">
        <div className="w-[679.88px] text-white text-[60px] font-normal font-bebasNeue uppercase leading-[88px]">Coldplay Music of The Spheres World Tour 2023</div>
        <div className="w-[528.09px] h-[157px] flex-col justify-start items-start gap-6 inline-flex">
            <div className="self-stretch text-zinc-500 text-lg font-normal leading-[27px]">Coldplay have announced their hugely-anticipated return to Asia and Australia with a special run of stadium shows in November 2023, as part of their record-breaking Music Of The Spheres World Tour. </div>
            <button className="px-6 py-3.5 bg-purple-500 rounded-xl justify-center items-center gap-2 inline-flex">
                <div className="text-base font-normal leading-normal text-white">Discover Event</div>
            </button>
        </div>
    </div>
</div>
</div>
    </div>
  )
}