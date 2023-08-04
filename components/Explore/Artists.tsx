import Link from 'next/link';
import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

interface ArtistData {
  id: string;
  name: string;
  imageUrl: string;
}

interface ArtistsProps {
  artists: ArtistData[];
  isLoading: boolean;
  isError: boolean;
}

export default function Artists({ artists, isLoading, isError }: ArtistsProps) {
  if (isLoading) {
    return <ScaleLoader color="#a63be0" height={4} width={4} />;
  }

  if (isError) {
    return <p>Error Fetching Data...</p>;
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-40 p-3 sm:p-0 sm:max-w-[74rem]">
      {artists.map((artist) => (
        <Link
          key={artist.id}
          href={`/artist/${artist.id}`}
          // target="_blank"
          // rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat w-full sm:w-64 h-64 sm:h-80 shadow-xl transition-transform transform group-hover:scale-105 inset-0"
          style={{
            backgroundImage: `url(${
              artist.imageUrl ||
              'https://www.exscribe.com/wp-content/uploads/2021/08/placeholder-image-person-jpg.jpg'
            })`,
          }}
          passHref
        >
          <div className="absolute inset-0 bg-black/25 transition-opacity group-hover:opacity-10"></div>

          <div className="relative flex flex-col justify-between p-2 sm:p-4 md:p-6 lg:p-8 h-full">
            <div className="text-white absolute bottom-2 left-2  transition-all duration-500 ease-in-out">
              <p className="text-xl sm:text-l font-semibold font-bebasNeue">
                {artist.name}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
