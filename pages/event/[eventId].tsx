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
import { DiscussionEmbed } from 'disqus-react';

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
  const [activeTab1, setActiveTab1] = useState('Event Detail');
  const [activeTab2, setActiveTab2] = useState('Discussion');

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
    console.log('activeTab2:', activeTab2);
    console.log('destination:', destination);
    if (
      activeTab2 === 'Map Detail' &&
      typeof window !== 'undefined' &&
      destination
    ) {
      const MapboxGL = require('mapbox-gl');
      MapboxGL.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

      const MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation: [number, number] = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          setUserLocation(userLocation);

          const mapContainer = document.getElementById('map');
          console.log('mapContainer:', mapContainer);
          if (mapContainer && !mapContainer.childNodes.length) {
            const map = new MapboxGL.Map({
              container: 'map',
              style: 'mapbox://styles/mapbox/streets-v11',
              center: userLocation,
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

              map.fitBounds([userLocation, destination], {
                padding: 50, // padding around the bounds
              });
            });
          }
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
  }, [destination, activeTab2]);

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

  const handleTab1Click = (tabName: string) => {
    setActiveTab1(tabName);
  };
  const handleTab2Click = (tabName: string) => {
    setActiveTab2(tabName);
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
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <section className="text-gray-600 body-font overflow-hidden mt-36 font-poppins">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full h-[300px] lg:h-[500px] object-cover object-center rounded">
              <img
                alt="Artist photo"
                className="w-full h-full object-cover"
                src={event.imageUrl}
              />
            </div>
            <div className="lg:w-full lg:pl-10 lg:py-6">
              <h2 className="text-sm title-font text-gray-500 tracking-widest mb-2">
                {event.status}
                {event.status === 'Upcoming' && (
                  <span>
                    {' '}
                    in <Countdown date={timer} />
                  </span>
                )}
              </h2>

              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {event.name}
              </h1>
              <div className="flex mb-4">
                <a
                  onClick={() => setActiveTab1('Event Detail')}
                  className={`flex-grow border-b-2 ${
                    activeTab1 === 'Event Detail'
                      ? 'text-indigo-500 border-indigo-500'
                      : 'text-gray-500 border-gray-300'
                  } py-2 text-lg px-1 cursor-pointer`}
                >
                  Event Detail
                </a>
                <a
                  onClick={() => setActiveTab1('Location')}
                  className={`flex-grow border-b-2 ${
                    activeTab1 === 'Location'
                      ? 'text-indigo-500 border-indigo-500'
                      : 'text-gray-500 border-gray-300'
                  } py-2 text-lg px-1 cursor-pointer`}
                >
                  Location
                </a>
                <a
                  onClick={() => setActiveTab1('Lineup')}
                  className={`flex-grow border-b-2 ${
                    activeTab1 === 'Lineup'
                      ? 'text-indigo-500 border-indigo-500'
                      : 'text-gray-500 border-gray-300'
                  } py-2 text-lg px-1 cursor-pointer`}
                >
                  Lineup
                </a>
              </div>

              {activeTab1 === 'Event Detail' && (
                <>
                  <p className="leading-relaxed mb-4"> {event.description}</p>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Date</span>
                    <span className="ml-auto text-gray-900">
                      {formattedTime
                        ? formattedTime.toLocaleString('en-gb', dateOptionsDay)
                        : 'Sedang di update..'}
                    </span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Time</span>
                    <span className="ml-auto text-gray-900">
                      {formattedTime
                        ? formattedTime.toLocaleString('id-ID', dateOptionsHour)
                        : 'Sedang di update..'}{' '}
                      WIB
                    </span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Starting At Price</span>
                    <span className="ml-auto text-gray-900">
                      {formatToIDR(event.price)}
                    </span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Organizer</span>
                    <span className="ml-auto text-gray-900">
                      {organizer?.username}
                    </span>
                  </div>
                </>
              )}
              {activeTab1 === 'Location' && (
                <>
                  <div className="flex  border-gray-200 py-2">
                    <span className="text-gray-500">Venue</span>
                    <span className="ml-auto text-gray-900">
                      {' '}
                      {location?.venue}
                    </span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Address</span>
                    <span
                      className="ml-auto text-gray-900 text-right"
                      style={{ maxWidth: '70%', overflowWrap: 'break-word' }}
                    >
                      {location?.address}
                    </span>
                  </div>

                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">City</span>
                    <span className="ml-auto text-gray-900">
                      {' '}
                      {location?.city}
                    </span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Province</span>
                    <span className="ml-auto text-gray-900">
                      {' '}
                      {location?.province}
                    </span>
                  </div>
                </>
              )}
              {activeTab1 === 'Lineup' && (
                <div>
                  {event &&
                    event.artists &&
                    event.artists
                      .slice(0, 3)
                      .map((artist: any, index: number) => (
                        <div
                          key={index}
                          className="mt-3 flex select-none flex-wrap items-center gap-1 "
                        >
                          <div className="mt-4 items-left px-2 flex items-center gap-4">
                            <p className="font-medium text">{artist}</p>
                          </div>
                        </div>
                      ))}
                </div>
              )}
              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => handleSaveEvent(eventId)}
                  className="bg-[#9747ff] hover:bg-purple-900 self-start flex flex-col justify-center h-12 px-3 mt-4 rounded-xl"
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
            </div>

            <div className="lg:col-span-3 ">
              <div className="border-b border-gray-300">
                <nav className="flex gap-4">
                  <button
                    onClick={() => handleTab2Click('Discussion')}
                    title=""
                    className={`border-b-2 py-4 text-sm font-medium ${
                      activeTab2 === 'Discussion'
                        ? 'border-purple-500 text-purple-500'
                        : 'border-transparent text-gray-600'
                    }`}
                  >
                    Discussion
                  </button>

                  <button
                    onClick={() => handleTab2Click('Map Detail')}
                    title=""
                    className={`border-b-2 py-4 text-sm font-medium ${
                      activeTab2 === 'Map Detail'
                        ? 'border-purple-500 text-purple-500'
                        : 'border-transparent text-gray-600'
                    }`}
                  >
                    Map Detail
                  </button>
                </nav>
              </div>

              {activeTab2 === 'Discussion' && (
                <div className="">
                  <div className="">
                    <div className="flow-root">
                      <DiscussionEmbed
                        shortname={
                          process.env.NEXT_PUBLIC_DISQUS_SHORTNAME || ''
                        }
                        config={{
                          url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/event/${eventId}`,
                          identifier: Array.isArray(eventId)
                            ? eventId.join('')
                            : eventId,
                          title: event.name,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab2 === 'Map Detail' && (
                <div className="">
                  <div className="">
                    <div className="flow-root">
                      <div className=" flex-row">
                        {distance && (
                          <p className=" flex text-center text-lg">
                            Jarak Anda ke lokasi konser: {distance.toFixed(2)}{' '}
                            kilometer
                          </p>
                        )}
                        <div className="flex flex-col items-center h-[50vh] w-full  bg-white">
                          <div
                            id="map"
                            className="w-[500px] h-full my-auto pt-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
