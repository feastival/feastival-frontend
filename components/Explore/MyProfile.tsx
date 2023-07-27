import React from 'react';
import Image from 'next/image';

export default function MyProfile() {
  const events = [
    {
      name: 'Chvrches',
      date: '13 Agustus 2023',
      venue: 'Sentul Convention Center',
      location: 'Bogor',
      imageUrl1:
        'https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg',
    },
    {
      name: 'Chvrches',
      date: '13 Agustus 2023',
      venue: 'Sentul ',
      location: 'Bogor',
      imageUrl1:
        'https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg',
    },
    {
      name: 'Chvrches',
      date: '13 Agustus 2023',
      venue: 'Sentul Convention Center',
      location: 'bogor',
      imageUrl1:
        'https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg',
    },
    {
      name: 'Chvrches',
      date: '13 Agustus 2023',
      venue: 'Sentul Convention Center',
      location: 'Bogor',
      imageUrl1:
        'https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg',
    },
    {
      name: 'Chvrches',
      date: '13 Agustus 2023',
      venue: 'Sentul ',
      location: 'Bogor',
      imageUrl1:
        'https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg',
    },
    {
      name: 'Chvrches',
      date: '13 Agustus 2023',
      venue: 'Sentul Convention Center',
      location: 'bogor',
      imageUrl1:
        'https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg',
    },
  ];
  return (
    <>
      <main className="py-6 flex items-center justify-center flex-wrap">
        <div className="flex flex-col w-full">
          <h2 className="font-bold text-3xl mb-3">My Upcoming Event</h2>
          {/* Additional content for the ARTISTS card can be added here */}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <a href="#" key={index} className="group block">
              <div className="overflow-hidden bg-white group-hover:opacity-75 rounded m-3 h-96">
                <div className="relative h-3/4">
                  <Image
                    src={event.imageUrl1}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-100"
                    width={2850}
                    height={1603}
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-black font-bold font-bebasNeue text-lg overflow-hidden overflow-ellipsis">
                      {event.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 overflow-hidden overflow-ellipsis">
                      {event.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-black font-bold font-bebasNeue text-lg overflow-hidden overflow-ellipsis">
                      {event.location}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 overflow-hidden overflow-ellipsis">
                      {event.venue}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
      <main className="py-6 flex items-center justify-center flex-wrap">
        <div className="flex flex-col w-full">
          <h2 className="font-bold text-3xl mb-3">My Recent Attented Event</h2>
          {/* Additional content for the ARTISTS card can be added here */}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <a href="#" key={index} className="group block">
              <div className="overflow-hidden bg-white group-hover:opacity-75 rounded m-3 h-96">
                <div className="relative h-3/4">
                  <Image
                    src={event.imageUrl1}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-100"
                    width={2850}
                    height={1603}
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-black font-bold font-bebasNeue text-lg overflow-hidden overflow-ellipsis">
                      {event.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 overflow-hidden overflow-ellipsis">
                      {event.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-black font-bold font-bebasNeue text-lg overflow-hidden overflow-ellipsis">
                      {event.location}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 overflow-hidden overflow-ellipsis">
                      {event.venue}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
