import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function ArtistRoute() {
  const [artist, setArtist] = useState<any>();
  const router = useRouter();
  const { artistId } = router.query;

  const fetchArtist = async () => {
    if (artistId) {
      try {
        const response = await axios.get(`${API_URL}/artists/${artistId}`);
        setArtist(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchArtist();
  }, [artistId]);

  if (!artist) {
    return (
      <div className="flex justify-center items-center mt-44 mb-28">
        <ScaleLoader color="#a63be0" height={20} width={20} />
      </div>
    );
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
