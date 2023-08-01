import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import { getCookie } from 'cookies-next';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Head from 'next/head';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import HeroEvent from '@/components/Event/HeroEvent';
import Countdown from '@/components/EventById/Countdown';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  artists: any[];
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
  const [destination, setDestination] = useState<[number, number] | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );

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
        const response = await axios.get(`${API_URL}/events/${eventId}`);
        setEvent(response.data);
        setArtists(response.data.artists);
        setLocation(response.data.location);
        setGenre(response.data.genre);
        setOrganizer(response.data.organizer);

        const MapboxGL = require('mapbox-gl');
        MapboxGL.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

        const address = `${response.data.location.venue}, ${response.data.location.address}, ${response.data.location.city}`;
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address,
        )}.json?access_token=${MapboxGL.accessToken}`;

        const locationResponse = await axios.get(url);
        const locationData = locationResponse.data;

        if (locationData.features && locationData.features.length > 0) {
          const coordinates: [number, number] = locationData.features[0].center;
          setDestination(coordinates);
        } else {
          console.error('No coordinates found for this address.');
        }
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && destination) {
      const MapboxGL = require('mapbox-gl');
      MapboxGL.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

      const MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');

      //  dapetin lokasi user
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation: [number, number] = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          setUserLocation(userLocation);

          const mapContainer = document.getElementById('map');
          if (mapContainer && !mapContainer.childNodes.length) {
            const map = new MapboxGL.Map({
              container: 'map',
              style: 'mapbox://styles/mapbox/streets-v11',
              center: userLocation,
              zoom: 12,
            });

            const directions = new MapboxDirections({
              accessToken: MapboxGL.accessToken,
              controls: {
                inputs: false,
                instructions: false,
                profileSwitcher: false,
              },
              profile: 'mapbox/driving',
            });

            map.addControl(directions, 'top-left');

            map.on('load', () => {
              directions.setOrigin(userLocation);
              directions.setDestination(destination);
            });
          }
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
  }, [destination]);

  useEffect(() => {
    if (userLocation && destination) {
      const calculateDistance = async () => {
        const MapboxGL = require('mapbox-gl');
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation[0]},${userLocation[1]};${destination[0]},${destination[1]}?access_token=${MapboxGL.accessToken}`;

        try {
          const response = await axios.get(url);
          const data = response.data;

          const distanceInKilometers = data.routes[0].distance / 1000;

          setDistance(distanceInKilometers);
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      };

      calculateDistance();
    }
  }, [userLocation, destination]);

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
    return <div>Loading...</div>;
  }

  const formattedTime = new Date(event.startedAt);
  const timer = String(event.startedAt);
  const formattedTimeFinished = new Date(event.finishedAt);

  const formatToIDR = (data: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(data);
  };

  return (
    <>
      {/* NEW */}
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
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
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* NANTI DI CUT SAMPAI SINI */}

              <div className="md:w-[1000px] pb-10 md:pb-20 mt-12 w-full flex items-center justify-center mx-auto">
                <div className="items-start text-lg leading-relaxed text-gray-700 md:mx-auto justisfy-center">
                  <p className="mx-auto leading-[32px] pr-0 md:pr-20">
                    {' '}
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
                        <p className="text-xs font-semibold text-gray-600"></p>
                        <p className="py-1 text-sm font-semibold text-gray-700"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {distance && (
                <p className=" text-center text-lg">
                  Jarak Anda ke lokasi konser: {distance.toFixed(2)} kilometer
                </p>
              )}
              <div className="flex flex-col items-center h-[50vh] w-full  bg-white">
                <div id="map" className="w-[500px] h-full my-auto pt-10" />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
