import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useCallback } from 'react';
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
import { toast } from 'react-toastify';
import Image from 'next/image';

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
  const [trackedEvents, setTrackedEvents] = useState<EventId[]>([]);

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

  const fetchEvent = useCallback(async () => {
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
  }, [eventId]);
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrackedEvents(response.data.trackedEvents);
    } catch (error) {
      setTrackedEvents([]);
    }
  };
  useEffect(() => {
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
      setTrackedEvents([...trackedEvents, event]);
      toast.success('Event Successfully Tracked! 😎', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

      //router.push('/event/my-event'); // stay at this page
    } catch (error) {
      toast.error(
        'Make sure you have register and login first before tracking an event ✨.',
        {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        },
      );
      setSubmitLoading(false);
      router.push(`/event/${eventId}`);
    }
  };

  const handleUntrackEvent = async () => {
    setSubmitLoading(true);
    try {
      await axios.delete(`${API_URL}/user/me/track-event/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmitLoading(false);
      const updatedTrackedEvents = trackedEvents.filter(
        (event) => event.id !== eventId,
      );
      setTrackedEvents(updatedTrackedEvents);
      toast.info('Event has been removed from tracked list! 👋', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (error) {
      toast.error('Oops! Something went wrong, please try again later. 🙏', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setSubmitLoading(false);
      router.push(`/event/${eventId}`);
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
  }, [fetchEvent]);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

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
      {event && artists ? (
        <section className="text-gray-600 body-font overflow-hidden mt-32 font-poppins">
          <div className="container px-5 py-14 mx-auto">
            <div className="lg:w-4/5 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="w-full h-[300px] lg:h-[500px] object-cover object-center rounded">
                <Image
                  alt="Artist photo"
                  className="object-cover w-full h-full"
                  src={event.imageUrl}
                  width={500}
                  height={500}
                />
              </div>
              <div className="lg:w-full lg:pl-10 lg:py-6">
                <h2 className="mb-2 text-sm tracking-widest text-gray-500 title-font">
                  {event.status}
                  {event.status === 'Upcoming' && (
                    <span>
                      {' '}
                      in <Countdown date={timer} />
                    </span>
                  )}
                </h2>
                <div className="flex flex-row lg:flex-col flex-wrap justify-between">
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-2">
                    {event.name}
                  </h1>

                  <div className="mb-2">
                    {!trackedEvents.some(
                      (trackedEvent) => trackedEvent.id === eventId,
                    ) ? (
                      <Button
                        onClick={() => handleSaveEvent(eventId)}
                        className="bg-[#9747ff] hover:bg-purple-900 self-start flex flex-col justify-center h-12 px-3 rounded-xl"
                      >
                        <div className="whitespace-nowrap font-poppins leading-[24px] text-white">
                          {submitLoading ? (
                            <ScaleLoader color="#d3dddb" height={4} width={4} />
                          ) : (
                            <span className="drop-shadow-lg flex group">
                              Track This Event{' '}
                              <svg
                                className="relative w-6 h-6 ml-2 place-items-end group-hover:animate-ping "
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleUntrackEvent()}
                        className="bg-[#9b0000] hover:bg-[#700202] self-start flex flex-col justify-center h-12 px-3 rounded-xl"
                      >
                        <div className="whitespace-nowrap font-poppins leading-[24px] text-white">
                          {submitLoading ? (
                            <ScaleLoader color="#d3dddb" height={4} width={4} />
                          ) : (
                            <span className="drop-shadow-lg">
                              Untrack This Event
                            </span>
                          )}
                        </div>
                      </Button>
                    )}
                  </div>
                </div>
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
                    <p className="mb-4 leading-relaxed"> {event.description}</p>
                    <div className="flex py-2 border-t border-gray-200">
                      <span className="text-gray-500">Date</span>
                      <span className="ml-auto text-gray-900">
                        {formattedTime
                          ? formattedTime.toLocaleString(
                              'en-gb',
                              dateOptionsDay,
                            )
                          : 'Sedang di update..'}
                      </span>
                    </div>
                    <div className="flex py-2 border-t border-gray-200">
                      <span className="text-gray-500">Time</span>
                      <span className="ml-auto text-gray-900">
                        {formattedTime
                          ? formattedTime.toLocaleString(
                              'id-ID',
                              dateOptionsHour,
                            )
                          : 'Sedang di update..'}{' '}
                        WIB
                      </span>
                    </div>
                    <div className="flex py-2 border-t border-gray-200">
                      <span className="text-gray-500">Starting At Price</span>
                      <span className="ml-auto text-gray-900">
                        {formatToIDR(event.price)}
                      </span>
                    </div>
                    <div className="flex py-2 border-t border-gray-200">
                      <span className="text-gray-500">Organizer</span>
                      <span className="ml-auto text-gray-900">
                        {organizer?.username}
                      </span>
                    </div>
                  </>
                )}
                {activeTab1 === 'Location' && (
                  <>
                    <div className="flex py-2 border-gray-200">
                      <span className="text-gray-500">Venue</span>
                      <span className="ml-auto text-gray-900">
                        {' '}
                        {location?.venue}
                      </span>
                    </div>
                    <div className="flex py-2 border-t border-gray-200">
                      <span className="text-gray-500">Address</span>
                      <span
                        className="ml-auto text-right text-gray-900"
                        style={{ maxWidth: '70%', overflowWrap: 'break-word' }}
                      >
                        {location?.address}
                      </span>
                    </div>

                    <div className="flex py-2 border-t border-gray-200">
                      <span className="text-gray-500">City</span>
                      <span className="ml-auto text-gray-900">
                        {' '}
                        {location?.city}
                      </span>
                    </div>
                    <div className="flex py-2 border-t border-gray-200">
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
                        .slice(0, 4)
                        .map((artist: any, index: number) => (
                          <div
                            key={index}
                            className="flex flex-wrap items-center gap-1 mt-3 select-none "
                          >
                            <div className="flex items-center gap-4 px-2 mt-4 items-left">
                              <Image
                                src={
                                  artist.imageUrl
                                    ? artist.imageUrl
                                    : 'https://www.exscribe.com/wp-content/uploads/2021/08/placeholder-image-person-jpg.jpg'
                                }
                                alt={artist.name}
                                className="object-cover w-12 h-12 rounded-full"
                                width={50}
                                height={50}
                              />
                              <p
                                className="font-medium cursor-pointer text"
                                onClick={() =>
                                  router.push(`/artist/${artist.id}`)
                                }
                              >
                                {artist.name}
                              </p>
                            </div>
                          </div>
                        ))}
                  </div>
                )}
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
                  <div className="mt-3">
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
                        <div className="flex-row ">
                          {distance && (
                            <p className="flex text-lg justify-center mt-2 text-center ">
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
      ) : (
        <div className="flex items-center justify-center mt-64 mb-36">
          <ScaleLoader color="#a63be0" height={20} width={20} />
        </div>
      )}
    </>
  );
}
