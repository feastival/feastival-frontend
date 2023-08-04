import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function ArtistRoute() {
  const router = useRouter();
  const { artistId } = router.query;

  const fetchArtist = async () => {
    const response = await axios.get(`${API_URL}/artists/${artistId}`);
    return response.data;
  };

  // pakai tanstack query untuk caching
  const {
    data: artist,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['artist'],
    queryFn: fetchArtist,
  });

  if (isLoading) {
    return (
      <ScaleLoader
        className="mt-32 flex justify-center items-center"
        color="#d3dddb"
        height={20}
        width={20}
      />
    );
  }

  if (isError) {
    return <p className="mt-48">Error Fetching Data...</p>;
  }

  return (
    <div className="pt-32">
      <div className="mx-auto">
        <h2 className="font-bold text-5xl text-center">{artist.name}</h2>
        <div className="flex flex-wrap justify-center items-center mb-14 mt-8">
          <img
            src={
              artist.imageUrl ||
              'https://res.cloudinary.com/djudfrj8s/image/upload/v1690547059/feastival/wp7368797_fkmyhv.jpg'
            }
            alt="artist-photo"
            className="w-full p-4 object-cover xl:w-[30rem] xl:h-[25rem] md:w-1/2 md:order-1 mb-5 md:mb-0 rounded-3xl"
          />
          <p className="w-full md:w-1/2 md:order-2 md:pl-6 p-4">
            {artist.description || 'updating..'}
          </p>
        </div>
      </div>
    </div>
  );
}
