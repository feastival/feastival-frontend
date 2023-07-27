import React from "react";

export default function VideoSection() {
  return (
    <div className="items-center justify-center w-full h-full p-4 bg-white">
      <div className="w-[542px] flex-col justify-start items-center gap-4 mx-auto">
        <div className="self-stretch text-center text-black text-[64px] font-normal uppercase font-bebasNeue leading-[64px]">
          the white shoes and couples company
        </div>
        <div className="self-stretch text-center text-neutral-500 text-lg font-normal leading-[27px]">
          Kolaborasi The White Shoes And Couples Company bersama Together Whatever Session.
        </div>
      </div>
      <div className="w-[1300px] h-[633px] bg-zinc-300 rounded-xl mx-auto my-4">
      <iframe width="1300" height="633" src="https://www.youtube.com/embed/QVaQhJxHJuQ" title="YouTube video player" frameBorder="2" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
    </div>
  );
}

