import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Trending() {
  return (
    <div className="bg-[#070707] items-center justify-center w-full md:w-xl h-full p-4 mx-auto">
      <div className="relative w-full h-full mx-auto md:w-xl">
        <div className="flex flex-col items-center justify-center gap-3 pb-10 shadow">
          <Image
            className="mx-auto rounded-xl bg-zinc-300"
            width={1450}
            height={1000}
            src="https://res.cloudinary.com/djudfrj8s/image/upload/v1690508758/coldplay-a-sky-full-of-stars-rh2pn7xytifyaa7m_qxdeso.jpg"
            alt={''}
          />
          <div className="container grid items-center grid-cols-1 px-4 py-4 mx-auto md:grid-cols-2">
            <h2 className="text-5xl font-normal text-white uppercase text-10xl font-bebasNeue md:text-6xl">
              Coldplay Music of The Spheres World Tour 2023
            </h2>
            <div className="inline-flex flex-col gap-6 md:items-start md:justify-start">
              <div className="text-lg font-normal text-white">
                Coldplay have announced their hugely-anticipated return to Asia
                and Australia with a special run of stadium shows in November
                2023, as part of their record-breaking Music Of The Spheres
                World Tour.{' '}
              </div>
              <Link href="/event/05be1cad-148a-448a-9bc7-a48ae4b67ac4">
                <button className="px-6 py-3.5 bg-purple-500 rounded-xl justify-center items-center gap-2 inline-flex">
                  <div className="text-base font-normal leading-normal text-white">
                    Discover Event
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
