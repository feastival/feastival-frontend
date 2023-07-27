import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#070707] flex items-center justify-between w-full h-full p-4 mx-auto">
      <div className="w-[1440px] h-[693px] relative mx-auto">
    <div className="left-[98px] top-[188px] absolute text-white text-[60px] font-bebasNeue font-normal leading-[58px]">FIND AMAZING EVENT<br/>NEAR YOU</div>
    <div className="w-[600px] h-[94px] left-[96px] top-[370px] absolute text-white text-xl font-normal">{"Dive into Feastival, your ultimate event guide. From concerts to sports events, we bring the world's happenings to your fingertips. Start exploring, start celebrating!"}</div>
    <Image className="w-[533px] h-[693px] left-[837px] top-0 absolute rounded-[1px] shadow border border-black" alt="" src="https://via.placeholder.com/533x693" width={693} height={533}/>
    <div className="w-[651px] h-[84px] left-[96px] top-[505px] absolute">
        <div className="w-[651px] h-[84px] left-0 top-0 absolute bg-white rounded-[20px] shadow border border-black" />
        <div className="w-[103px] h-11 left-[528px] top-[20px] absolute bg-purple-500 rounded-[10px]" />
        <div className="left-[555px] top-[32px] absolute text-white text-sm font-semibold">Search</div>
        <div className="w-[258px] h-11 left-[20px] top-[20px] absolute bg-stone-50 rounded-[10px]" />
        <div className="w-[210px] h-11 left-[298px] top-[20px] absolute bg-stone-50 rounded-[10px]" />
        <div className="left-[60px] top-[32px] absolute text-black text-sm font-medium">Search Event</div>
        <div className="w-5 h-5 left-[30px] top-[32px] absolute" />
        <div className="left-[342px] top-[32px] absolute text-black text-sm font-medium">Bandung</div>
        <div className="w-6 h-6 left-[308px] top-[30px] absolute">
            <div className="w-4 h-5 left-[4px] top-[2px] absolute">
            </div>
        </div>
    </div>
</div>
    </div>
  )
}

