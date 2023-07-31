import React from 'react';

export default function VideoSection() {
  return (
    <div className="items-center justify-center w-full h-full p-4 bg-white">
      <div className="flex-col items-center justify-start gap-4 mx-auto">
        <h2 className="self-stretch text-center text-black text-5xl md:6xl font-normal uppercase font-bebasNeue leading-[64px] mb-5">
          white shoes and the couples company
        </h2>
        <div className="self-stretch text-center text-neutral-500 text-lg font-normal leading-[27px] mb-5">
          White Shoes And The Couples Company pada gelaran Sychronize Fest 2018.
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto my-4 bg-zinc-300 rounded-xl">
  <div className="relative w-full" style={{ paddingBottom: '50%' }}>
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src="https://www.youtube.com/embed/cej8-8z2b6M"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  </div>
      </div>
    </div>
  );
}
