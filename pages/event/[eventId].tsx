import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import { getCookie } from 'cookies-next';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import HeroEvent from '@/components/Event/HeroEvent';
import Countdown from '@/components/EventById/Countdown';

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
  createdAt: string;
  updatedAt: string;
}

interface Role {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Organizer {
  id: string;
  username: string;
  email: string;
  role: Role;
}

interface EventId {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  startedAt: string;
  finishedAt: string | null;
  price: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  artists: any[]; // Update the type of 'artists' array according to its structure if available
  genre: string[];
  location: Location;
  organizer: Organizer;
}

export default function ArtistRouteById() {
  const router = useRouter();
  const { eventId } = router.query;
  const [event, setEvent] = useState<EventId | any>([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [artists, setArtists] = useState<any>();
  const [location, setLocation] = useState<Location>();
  const [genre, setGenre] = useState<string[]>([]);
  const [organizer, setOrganizer] = useState<Organizer>();
  const token = getCookie('token');
  const dateOptionsHour = {
    hour: '2-digit' as const,
    minute: '2-digit' as const,
    hour12: false,
  };
  const dateOptionsDay = {
    day: '2-digit' as const,
    month: 'long' as const,
    year: 'numeric' as const,
  };
  const dateOptions = {
    hour12: false,
    hour: '2-digit' as const,
    minute: '2-digit' as const,
    day: '2-digit' as const,
    month: 'long' as const,
    year: 'numeric' as const,
  };

  const fetchEvent = async () => {
    if (eventId) {
      try {
        // Fetch event data by its ID from the API using Axios
        const response = await axios.get(`${API_URL}/events/${eventId}`);
        setEvent(response.data);
        setArtists(response.data.artists);
        setLocation(response.data.location);
        setGenre(response.data.genre);
        setOrganizer(response.data.organizer);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    }
  };

  const handleSaveEvent = async (id: string | string[] | undefined) => {
    setSubmitLoading(true);
    try {
      await axios.post(
        `${API_URL}/user/me/track-event`,
        {
          eventId: id,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setSubmitLoading(false);
      alert('Save Event Success!!!');
      router.push('/profile');
    } catch (error) {
      alert('Please register or login first.');
      setSubmitLoading(false);
      router.push('/');
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  if (!event) {
    // If the event is not found or the data is still loading, you can handle the case accordingly (e.g., show a loading state or an error message).
    return <div>Loading...</div>;
  }

  const formattedTime = new Date(event.startedAt);
  const timer = String(event.startedAt);
  const formattedTimeFinished = new Date(event.finishedAt);

  // const formattedDate = (date: any) => {
  //   if (!date) return 'Sedang di update..';
  //   return format(date, 'dd MMMM yyyy, HH:mm');
  // };

  const formatToIDR = (data: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(data);
  };

  console.log(event);
  console.log(artists);
  console.log(location);
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
    <>
      <div className="pt-32 bg-black">
        <div className="mx-auto">
          <main className="mt-10">
            <HeroEvent
              name={event.name}
              artist={artists}
              image={event.imageUrl}
            />

            {/* NANTI DI CUT SAMPAI SINI */}

            <div className="w-full pt-5 bg-white">
              <div className="md:w-[1000px] md-px-0 px-2 w-full flex flex-inline justify-between mx-auto mb-6">
                <div className="text-5xl font-bebasNeue leading-[64px] text-[#2e2e2e] mt-px shrink-0">
                  Event Detail
                </div>
                <Button
                  onClick={() => handleSaveEvent(eventId)}
                  className="bg-[#9747ff] hover:bg-purple-900 self-start flex flex-col justify-center h-12 px-6 mt-4 rounded-xl"
                >
                  <div className="whitespace-nowrap font-poppins leading-[24px] text-white">
                    {submitLoading ? (
                      <ScaleLoader color="#d3dddb" height={4} width={4} />
                    ) : (
                      <span className="drop-shadow-lg">Track This Event</span>
                    )}
                  </div>
                </Button>
              </div>

              {/* TIMER */}
              <div className="flex flex-col justify-center items-center p-4 font-poppins">
                <h1 className="text-xl font-bold mb-4">
                  kapan konser dimulai?
                </h1>

                <Countdown date={timer} />
              </div>

              {/* NANTI DI CUT SAMPAI SINI */}
              <div className="flex justify-center mt-10 font-poppins">
                <div className="relative overflow-x-auto sm:rounded-lg font-poppins">
                  <table className="w-full text-sm text-left dark:text-gray-400">
                    <thead className="text-2xl font-bold text-center ">
                      <tr>
                        <th scope="col" className="px-6">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Location
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Venue
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Genre
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Organizer
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        key={event.id}
                        className="text-base text-center bg-white"
                      >
                        <td className="px-6 py-2 ">
                          {formattedTime
                            ? formattedTime.toLocaleString(
                                'en-gb',
                                dateOptionsDay,
                              )
                            : 'Sedang di update..'}
                        </td>
                        <td className="px-6 py-2 ">
                          {formattedTime
                            ? formattedTime.toLocaleString(
                                'id-ID',
                                dateOptionsHour,
                              )
                            : 'Sedang di update..'}
                        </td>
                        <td className="px-6 py-2 ">{location?.city}</td>
                        <td className="px-6 py-2 ">{location?.venue}</td>
                        <td className="px-6 py-2 ">
                          {genre ? genre.join(', ') : 'Sedang di update..'}
                        </td>
                        <td className="px-6 py-2 ">{organizer?.username}</td>
                      </tr>
                    </tbody>
                    <thead className="text-2xl font-bold text-center">
                      <tr>
                        <th scope="col" className="px-6">
                          Ticket Price
                        </th>

                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                          Started At
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Finished At
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        key={event.id}
                        className="text-base bg-white text-center"
                      >
                        <td className="px-6 py-2 ">
                          {formatToIDR(event.price)}
                        </td>
                        <td className="px-6 py-2 ">{event.status}</td>
                        {/* <td className="px-6 py-2 ">
                          {!formattedTime && formattedTime === null
                            ? 'sedang update...'
                            : formattedTime.toLocaleString(
                                'en-gb',
                                dateOptions,
                              )}
                        </td>
                        <td className="px-6 py-2 ">
                          {!formattedTimeFinished &&
                          formattedTimeFinished === null
                            ? 'sedang update...'
                            : formattedTimeFinished.toLocaleString(
                                'en-gb',
                                dateOptions,
                              )}
                        </td> */}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* NANTI DI CUT SAMPAI SINI */}
              <div className="md:w-[1000px] pb-10 md:pb-20 mt-12 w-full flex items-center justify-center mx-auto">
                <div className="items-start text-lg leading-relaxed text-gray-700 md:mx-auto justisfy-center">
                  <p className="mx-auto leading-[32px] pr-0 md:pr-20">
                    {event.description}
                  </p>
                </div>
                <div className="m-auto mb-30 md:w-1/3">
                  <div className="p-4">
                    <p className="py-1 text-sm font-semibold text-gray-700">
                      Lineup
                    </p>
                    <div className="flex py-2">
                      <img
                        src="https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg"
                        className="object-cover w-12 h-12 mr-2 rounded-full"
                      />
                      <div>
                        <p className="py-1 text-sm font-semibold text-gray-700">
                          {artists}
                        </p>
                        {/* <p className="text-xs font-semibold text-gray-600">
                          {' '}
                          Band{' '}
                        </p> */}
                        <p className="py-1 text-sm font-semibold text-gray-700"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
