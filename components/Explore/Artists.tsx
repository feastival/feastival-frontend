import React from 'react';

export default function Artists() {
  const artists = [
    {
      name: "Noah",
      location: "Band asal Bandung",
      imageUrl1:
        "https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg",
    },
    {
      name: "Paramore",
      location: "Band asal Amerika",
      imageUrl1:
        "https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg",
    },
    {
      name: "Coldplay",
      location: "Band asal Amerika",
      imageUrl1:
        "https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg",
    },
    {
      name: "Sal Priadi",
      location: "Penyanyi asal Jakarta",
      imageUrl1:
        "https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg",
    },
  ];

  return (
    <div>
      <h2 className="text-center xl:mr-[40%]">ARTISTS</h2>
      <div className="container flex justify-center mx-auto mt-10">
        <div className="flex flex-col col-span-2 md:flex-row md:space-x-4">
          {/* <!-- First row: Two boxes side by side --> */}
          <div className="flex items-center border border-black rounded-xl pr-24">
            <img
              src={artists[0].imageUrl1}
              alt="Image"
              className=" h-28 mr-4 rounded-xl"
            />
            <div className="text-left">
              <p className="">{artists[0].name}</p>
              <p className="">{artists[0].location}</p>
            </div>
          </div>
          <div className="flex items-center border border-black   rounded-xl pr-24">
            <img
              src={artists[0].imageUrl1}
              alt="Image"
              className=" h-28 mr-4 rounded-xl"
            />
            <div className="text-left">
              <p className="">{artists[1].name}</p>
              <p className="">{artists[1].location}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex justify-center mx-auto mt-10">
        <div className="flex flex-col col-span-2 md:flex-row md:space-x-4">
          {/* <!-- First row: Two boxes side by side --> */}
          <div className="flex items-center border border-black   rounded-xl pr-24">
            <img
              src={artists[0].imageUrl1}
              alt="Image"
              className=" h-28 mr-4 rounded-xl"
            />
            <div className="text-left">
              <p className="">{artists[2].name}</p>
              <p className="">{artists[2].location}</p>
            </div>
          </div>
          <div className="flex items-center border border-black  rounded-xl pr-24">
            <img
              src={artists[0].imageUrl1}
              alt="Image"
              className=" h-28 mr-4 rounded-xl"
            />
            <div className="text-left">
              <p className="">{artists[3].name}</p>
              <p className="">{artists[3].location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
