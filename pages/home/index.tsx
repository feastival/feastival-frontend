import React, { useState } from 'react';
import Image from 'next/image';

const citiesInIndonesia = [
  'Jakarta',
  'Surabaya',
  'Bandung',
  'Medan',
  'Semarang',
  'Makassar',
  'Palembang',
  'Tangerang',
  'Depok',
  'Batam',
];

export default function Home() {
  const [selectedCity, setSelectedCity] = useState('');

  const handleChange = (event: any) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="bg-[#070707] md:flex items-center justify-center w-full h-screen mx-auto">
      <div className="md:w-[1440px] w-full h-[693px] mx-auto md:relative">
        <div className="left-[98px] top-[188px] absolute text-white text-[60px] font-bebasNeue font-normal leading-[58px]">
          FIND AMAZING EVENT
          <br />
          NEAR YOU
        </div>
        <div className="md:w-[600px] w-full h-[94px] left-[96px] top-[370px] absolute text-white text-xl font-normal">
          {
            "Dive into Feastival, your ultimate event guide. From concerts to sports events, we bring the world's happenings to your fingertips. Start exploring, start celebrating!"
          }
        </div>
        <Image
          className="md:w-[533px] md:h-[693px] left-[837px] top-0 absolute rounded-[1px] shadow border border-black"
          alt=""
          src="https://res.cloudinary.com/djudfrj8s/image/upload/v1690507784/867104_resize_2_eszosn.png"
          width={693}
          height={533}
        />
        <div className="w-[651px] h-[84px] left-[96px] top-[505px] absolute">
          <div className="w-[651px] h-[84px] left-0 top-0 absolute bg-white rounded-[20px] shadow border border-black" />
          <div className="w-[103px] h-11 left-[528px] top-[20px] absolute bg-purple-500 rounded-[10px]" />
          <button className="left-[555px] top-[32px] absolute text-white text-sm font-semibold">
            Search
          </button>
          <div className="w-[258px] h-11 left-[20px] top-[20px] absolute bg-white rounded-[10px]" />
          <div className="w-[210px] h-11 left-[298px] top-[20px] absolute bg-white rounded-[10px]" />
          <div className="left-[60px] top-[32px] absolute text-black text-sm font-medium">
            Search Event
          </div>
          <div className="w-5 h-5 left-[30px] top-[32px] absolute">
            <select
              id="city"
              name="city"
              value={selectedCity}
              onChange={handleChange}
              className="w-[100px] left-[298px] absolute text-black font-poppins font-medium text-sm rounded-md"
            >
              <option value="">Bandung</option>
              {citiesInIndonesia.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="w-6 h-6 left-[308px] top-[30px] absolute">
              <div className="w-4 h-5 left-[4px] top-[2px] absolute"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
