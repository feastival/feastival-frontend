import React from "react";

export default function Home() {
  return (
    <div className="bg-black w-[1440px] h-[693px] relative">
      <div className="left-[98px] top-[188px] absolute text-white text-[88px] font-normal leading-[58px]">
        FIND AMAZING EVENT
        <br />
        NEAR YOU
      </div>
      <div className="w-[600px] h-[94px] left-[96px] top-[370px] absolute text-white text-xl font-normal">
        {
          "Dive into Feastival, your ultimate event guide. From concerts to sports events, we bring the world's happenings to your fingertips. Start exploring, start celebrating!"
        }
      </div>
      <img
        alt=""
        className="w-[533px] h-[693px] left-[837px] top-0 absolute rounded-[1px] shadow border border-black"
        src="https://via.placeholder.com/533x693"
      />
      <div className="w-[651px] h-[84px] left-[96px] top-[505px] absolute">
        <div className="w-[651px] h-[84px] left-0 top-0 absolute bg-white rounded-[20px] shadow border border-black" />
        <div className="w-[103px] h-11 left-[528px] top-[20px] absolute bg-purple-500 rounded-[10px]" />
        <div className="left-[555px] top-[32px] absolute text-white text-sm font-semibold">
          Search
        </div>
        <div className="w-[258px] h-11 left-[20px] top-[20px] absolute bg-stone-50 rounded-[10px]" />
        <div className="w-[210px] h-11 left-[298px] top-[20px] absolute bg-stone-50 rounded-[10px]" />
        <div className="left-[60px] top-[32px] absolute text-black text-sm font-medium">
          Search Event
        </div>
        <div className="w-5 h-5 left-[30px] top-[32px] absolute" />
        <div className="left-[342px] top-[32px] absolute text-black text-sm font-medium">
          Bandung
        </div>
        <div className="w-6 h-6 left-[308px] top-[30px] absolute">
          <div className="w-4 h-5 left-[4px] top-[2px] absolute"></div>
        </div>
        <div className="w-3 h-3 left-[412px] top-[48px] absolute origin-top-left -rotate-90" />
      </div>
      <div className="w-[1440px] h-[100px] left-0 top-0 absolute bg-zinc-950">
        <div className="left-[267px] top-[38px] absolute justify-center items-center gap-6 inline-flex">
          <div className="text-base font-normal leading-normal text-white">
            Home
          </div>
          <div className="text-base font-normal leading-normal text-white">
            Explore
          </div>
          <div className="text-base font-normal leading-normal text-white">
            Ticket
          </div>
          <div className="text-base font-normal leading-normal text-white">
            Community
          </div>
          <div className="text-base font-normal leading-normal text-white">
            About
          </div>
        </div>
        <div className="w-[488px] left-[882px] top-[24px] absolute justify-center items-center gap-4 inline-flex">
          <div className="grow shrink basis-0 h-[52px] pl-4 pr-6 py-3.5 bg-neutral-800 rounded-lg justify-start items-center gap-2 flex">
            <div className="flex items-center justify-center w-5 h-5">
              <div className="w-5 h-5 pl-px pr-[0.21px] pt-[0.21px] pb-px justify-center items-center inline-flex" />
            </div>
            <div className="text-base font-normal leading-normal text-white">
              Search here..
            </div>
          </div>
          <div className="px-6 py-3.5 bg-purple-500 rounded-lg justify-center items-center gap-2 flex">
            <div className="flex items-center justify-center w-5 h-5">
              <div className="w-5 h-5 px-[4.17px] pt-[1.67px] pb-[2.50px] justify-center items-center inline-flex" />
            </div>
            <div className="text-base font-normal leading-normal text-white">
              Login / Register
            </div>
          </div>
        </div>
        <div className="left-[70px] top-[38px] absolute text-white text-2xl font-normal uppercase leading-normal">
          FEASTIVAL
        </div>
      </div>
    </div>
  );
}
