import Artists from '@/components/Explore/Artists';
import React, { useEffect, useState } from 'react';
import Table from '@/components/Explore/Table';
import Head from 'next/head';
import Sidebar from '@/components/Explore/Sidebar';

import { API_URL } from '@/lib/api';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Card from '@/components/Card';
import ScaleLoader from 'react-spinners/ScaleLoader';
// import { Event } from '@/lib/eventsInterface';

interface Location {
  id: string;
  venue: string;
  address: string | null;
  mapsURL: string | null;
  province: string | null;
  city: string;
  street: string | null;
  streetDetails: string | null;
  postalCode: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface Organizer {
  id: string;
  username: string;
  email: string;
  role: {
    id: string;
    name: string;
  };
}

interface Event {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  startedAt: Date; // This should ideally be a Date type, if possible, for better handling of dates.
  finishedAt: Date; // This should ideally be a Date type, if possible, for better handling of dates.
  price: number;
  status: string;
  genre: string[];
  artists: string[];
  location: Location;
  organizer: Organizer;
}

export default function ExploreRoute() {
  // const [events, setEvents] = useState<Event[]>([]);
  const [selected, setSelected] = useState('Events');

  // pakai axios untuk fetch
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${API_URL}/artists`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // pakai tanstack query untuk caching
  const {
    data: events,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const {
    data: artists,
    isError: artistErrorPage,
    isLoading: artistLoadingPage,
  } = useQuery({
    queryKey: ['artists'],
    queryFn: fetchArtists,
  });

  for (const index in events) {
    events[index].startedAt = new Date(events[index].startedAt);
  }

  const handleClick = (selection: string) => {
    setSelected(selection);
  };

  return (
    <div className="mt-32 flex justify-evenly">
      {isLoading ? (
        <div className="flex items-center justify-center mt-20   mb-28">
          <ScaleLoader color="#a63be0" height={20} width={20} />
        </div>
      ) : (
        <>
          {' '}
          <Head>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
              integrity="sha512-..."
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
            <title>Explore</title>
          </Head>
          <div className="flex flex-col xl:basis-96">
            <Sidebar handleClick={handleClick} selected={selected} />
          </div>
          {selected === 'Events' ? (
            <div className="">
              <Card events={events} isLoading={isLoading} isError={isError} />
            </div>
          ) : (
            <Artists
              artists={artists}
              isLoading={artistLoadingPage}
              isError={artistErrorPage}
            />
          )}
        </>
      )}
    </div>
  );
}
