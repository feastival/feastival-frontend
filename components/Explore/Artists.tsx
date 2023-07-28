import React from 'react';

export default function Artists() {
  const artists = [
    {
      name: 'NIKI',
      imageUrl1:
        'https://res.cloudinary.com/djudfrj8s/image/upload/v1690547059/wp7368797_fkmyhv.jpg',
    },
    {
      name: 'Tulus',
      imageUrl1:
        'https://res.cloudinary.com/djudfrj8s/image/upload/v1690554521/feastival/9fa29001b374bc2847c663eaafe6c416_uk21zd.jpg',
    },
    {
      name: 'Chvrches',
      imageUrl1:
        'https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg',
    },
    {
      name: 'Travis Scott',
      imageUrl1:
        'https://res.cloudinary.com/djudfrj8s/image/upload/v1690554442/feastival/travis_scott_wallpaper_desktop_by_simbler5_de24ofh-fullview_puv3ns.jpg',
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-40">
      {artists.map((artist) => (
        <a
          key={artist.name}
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat w-full sm:w-64 h-64 sm:h-80 shadow-xl transition-transform transform group-hover:scale-105 inset-0"
          style={{ backgroundImage: `url(${artist.imageUrl1})` }}
        >
          <div className="absolute inset-0 bg-black/25 transition-opacity group-hover:opacity-10"></div>

          <div className="relative flex flex-col justify-between p-2 sm:p-4 md:p-6 lg:p-8 h-full">
            <div className="text-white absolute bottom-2 left-2  transition-all duration-500 ease-in-out">
              <p className="text-xl sm:text-l font-semibold font-bebasNeue">
                {artist.name}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
