import React from 'react';

interface HeroEventProps {
  name?: string;
  artist?: string;
  image?: string;
}

export default function HeroEvent({ name, artist, image }: HeroEventProps) {
  return (
    <div className="w-full pb-10 bg-black">
      <div className="md:w-[1440px] relative mx-auto mb-4 bg-black md:mb-0">
        <div className="px-4 lg:px-0">
          <h1 className="mb-5 text-[60px] font-semibold leading-tight text-center text-white font-bebasNeue">
            {name}
          </h1>
          <h1 className="mb-5 text-[60px] font-semibold leading-tight text-center text-white font-bebasNeue">
            {artist}
          </h1>
        </div>
        <img
          src={
            image ||
            'https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg'
          }
          className="object-cover w-[1000px] rounded-2xl shadow-sm shadow-slate-500 lg:rounded mx-auto"
        />
      </div>
    </div>
  );
}
