import React from 'react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Event } from '@/lib/eventsInterface';
import { API_URL } from '@/lib/api';

export default function ArtistRoute() {
  const router = useRouter();
  const { eventId } = router.query;

  const events = [
    {
      date: '13 Agustus 2023',
      time: '07.00',
      event: 'Young, Live, and Free',
      artist: 'Chvrches',
      venue: 'Sentul Convention Center',
      location: 'Jakarta',
      category: 'Concert',
      organizer: 'Ismaya Live',
    },
  ];
  return (
    <div className="pt-32">
      <div className="mx-auto">
        <h2 className="font-bold text-5xl text-center">NIKI</h2>
        <div className="flex flex-wrap justify-center items-center mb-14 mt-8">
          <img
            src="https://res.cloudinary.com/djudfrj8s/image/upload/v1690547059/feastival/wp7368797_fkmyhv.jpg"
            alt="artist-photo"
            className="w-full p-4 object-cover xl:w-[30rem] xl:h-[25rem] md:w-1/2 md:order-1 mb-5 md:mb-0 rounded-3xl"
          />
          <p className="w-full md:w-1/2 md:order-2 md:pl-6 p-4">
            Nicole Zefanya (born 24 January 1999), known professionally as NIKI,
            is an Indonesian singer, songwriter, and record producer. She is
            currently based in the United States and signed with the record
            label 88rising. At 15, she was the opening act for Taylor Swift's
            The Red Tour in Jakarta after winning a competition arranged by
            Swift and the ice cream brand Wall's, called Ride to Fame. Zefanya
            maintained a YouTube channel throughout her teenage years, on which
            she uploaded original songs and covers, which were eventually
            released on Spotify under the name Nicole Zefanya. In 2017, Zefanya
            moved to Nashville, Tennessee to study music at Lipscomb University.
            She released two singles, "See U Never" and "I Like U" under the
            American mass media company 88rising as an artist under their label.
            She released the song "Vintage" in May 2018 as the first single for
            her debut extended play, Zephyr. On April 24, 2019, Zefanya released
            a visualizer of her single titled "lowkey" from her album Nicole,
            which would become one of 88rising's most popular videos uploaded on
            its Youtube channel. In September 2020, Zefanya released her debut
            album, Moonchild. In December 2020, Zefanya released "Hallway
            Weather", a holiday single. On 12 August 2022, Zefanya's second
            album, Nicole, was released.
          </p>
        </div>
      </div>
    </div>
  );
}
