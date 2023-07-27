import React from 'react';

export default function Artists() {
  const artists = [
    {
      name: 'Noah',
      location:
        'Band asal Bandung yang sudah malang melintang di dunia musik uhuy spontan',
      imageUrl1:
        'https://res.cloudinary.com/djudfrj8s/image/upload/v1688050157/week-20/867115_lwbetr.jpg',
    },
    {
      name: 'Paramore',
      location: 'Band asal Amerika',
      imageUrl1:
        'https://res.cloudinary.com/djudfrj8s/image/upload/v1688050157/week-20/867115_lwbetr.jpg',
    },
    {
      name: 'Coldplay',
      location: 'Band asal Amerika',
      imageUrl1:
        'https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg',
    },
    {
      name: 'Sal Priadi',
      location: 'Penyanyi asal Jakarta',
      imageUrl1:
        'https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 max-w-3xl mx-auto">
      {artists.map((artist, index) => (
        <article
          key={index}
          className="flex max-w-xs flex-col rounded-xl bg-white px-1 shadow md:max-w-md md:flex-row md:items-center"
        >
          <div className="shrink-0 my-1 md:mr-2 md:max-w-xs">
            <img
              className="rounded-xl object-cover w-full h-16"
              src={artist.imageUrl1}
              alt={artist.name}
            />
          </div>
          <div className="py-1 sm:py-2">
            <a
              href="#"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              {artist.name}
            </a>
            <p className="mb-1 text-gray-500 text-xs">{artist.location}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
