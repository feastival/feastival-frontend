import React, { useState } from 'react';
import Image from 'next/image';
import SearchBarHome from '@/components/searcbarhome';

export default function Home() {
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <div className="bg-black">
      <div className="container grid items-center grid-cols-1 gap-5 px-4 mx-auto pt-36 xl:py-0 md:grid-cols-2">
        {/* Column 1: Text Content and Search Bar */}
        <div className="md:text-left">
          <h1
            className="mb-4 text-5xl font-semibold text-center text-white md:text-left md:text-6xl font-bebasNeue"
            style={{ lineHeight: '1.5' }}
          >
            FIND AMAZING EVENT
            <br />
            NEAR YOU
          </h1>
          <p className="text-xl font-normal text-left text-white font-poppins md:w-2/3">
            {"Dive into Feastival, your ultimate event guide. From concerts to sports events, we bring the world's happenings to your fingertips. Start exploring, start celebrating!"}
          </p>
          <SearchBarHome />
        </div>

        {/* Column 2: Image */}
        <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
          <div className="absolute top-0 left-0 w-11/12 mt-20 opacity-50"></div>
          <div className="relative overflow-hidden group">
            <Image
              className="object-cover w-full h-full"
              alt=""
              src="https://res.cloudinary.com/djudfrj8s/image/upload/v1690507784/867104_resize_2_eszosn.png"
              width={693}
              height={533}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
