import { API_URL } from '@/lib/api';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

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

interface CardProps {
  events: Event[]; // Updated to accept the events prop
  isProfilePage?: boolean; // New prop to indicate if user is on the profile page
  submitLoading?: boolean;
  handleDeleteEvent?: (eventId: string) => void;
  isLoading?: boolean;
  isError?: boolean;
  isErrorMyEvent?: boolean;
  isLoadingMyEvent?: boolean;
}

const EventCard: React.FC<CardProps> = ({
  events,
  isLoading,
  isError,
  isErrorMyEvent,
  isLoadingMyEvent,
}) => {
  const [loveButton, setLoveButton] = useState(false);
  const [isLoveProcessing, setLoveProcessing] = useState(false);
  const [currentUserEvent, setCurrentUserEvent] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const router = useRouter();
  const token = getCookie('token');

  const dateOptions = {
    hour12: false,
    day: '2-digit' as const,
    month: 'long' as const,
    year: 'numeric' as const,
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.trackedEvents;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: userTrackedEvents,
    isError: errorFetchUserTrackedEvents,
    isLoading: loadingFetchUserTrackedEvents,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchCurrentUser,
  });

  const handleLoveClick = async (eventId: string, event: React.MouseEvent) => {
    event.preventDefault();

    try {
      // Check if the event is already loved by the user
      const isLoved = currentUserEvent.includes(eventId);
      if (isLoved) {
        // Untrack the event
        await axios.delete(`${API_URL}/user/me/track-event/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        queryClient.invalidateQueries();
        toast.success('Untrack Event Successfully 📝', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        // Track the event
        await axios.post(
          `${API_URL}/user/me/track-event`,
          { eventId },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        queryClient.invalidateQueries();
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
      }
      // // Fetch the updated user tracked events after the API call
      // const updatedUserTrackedEvents = await fetchCurrentUser();

      // // Update the currentUserEvent state with the updated user tracked events
      // for (const index in updatedUserTrackedEvents) {
      //   const event = updatedUserTrackedEvents[index];
      //   currentUserEvent.push(event.id);
      // }

      // Toggle the love button state
      setLoveButton((prevLoveButton) => !prevLoveButton);
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
    }
  };

  useEffect(() => {
    if (userTrackedEvents) {
      const trackedEventIds = userTrackedEvents.map((event: any) => event.id);
      setCurrentUserEvent(trackedEventIds);
    }
  }, [userTrackedEvents]);

  const formatToIDR = (data: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(data);
  };

  if (isError) {
    return <p>Error occurred while fetching data.</p>;
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-10 mb-20">
        <ScaleLoader color="#d3dddb" height={20} width={20} />
      </div>
    );
  }

  if (isErrorMyEvent) {
    return <p>Error occurred while fetching data.</p>;
  }
  if (isLoadingMyEvent) {
    return (
      <div className="flex items-center justify-center mt-28">
        <ScaleLoader color="#d3dddb" height={20} width={20} />
      </div>
    );
  }

  // console.log(currentUserEvent);
  // console.log(events.artists);

  return (
    <section className="container grid grid-cols-1 gap-6 p-5 mx-auto antialiased sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
      {events.map((event) => (
        <Link key={event.id} href={`/event/${event.id}`} passHref>
          <article className="overflow-hidden duration-500 transform bg-white rounded-lg shadow-xl cursor-pointer hover:-translate-y-1">
            <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-xl">
              <div
                className="h-48 p-4 bg-center bg-cover"
                style={{ backgroundImage: `url(${event.imageUrl})` }}
              >
                <div
                  onClick={(preventLoading) => {
                    handleLoveClick(event.id, preventLoading);
                    return false;
                  }}
                  className={`flex justify-end ${
                    currentUserEvent.includes(event.id)
                      ? 'text-red-500'
                      : 'text-white'
                  }  group`}
                >
                  {/* {isLoveProcessing ? (
                    <ScaleLoader color="#d3dddb" height={16} width={2} />
                  ) : (
                    <>
                      {' '} */}
                  <svg
                    className="absolute w-6 h-6 ml-2 place-items-end group-hover:animate-ping "
                    xmlns="http://www.w3.org/2000/svg"
                    fill={currentUserEvent.includes(event.id) ? 'red' : 'none'}
                    viewBox="0 0 24 24"
                    stroke={
                      currentUserEvent.includes(event.id)
                        ? 'red'
                        : 'currentColor'
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <svg
                    className="relative w-6 h-6 ml-2 place-items-end"
                    xmlns="http://www.w3.org/2000/svg"
                    fill={currentUserEvent.includes(event.id) ? 'red' : 'none'}
                    viewBox="0 0 24 24"
                    stroke={
                      currentUserEvent.includes(event.id)
                        ? 'red'
                        : 'currentColor'
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>

                  {/* </>
                  )} */}
                </div>
              </div>
              <div className="p-4 py-5 overflow-y-auto">
                <p className="overflow-hidden text-sm tracking-wide text-gray-700 font-regular overflow-ellipsis whitespace-nowrap">
                  {event.artists ? (
                    event.artists
                      .slice(0, 3)
                      .map((artist: any) => artist.name)
                      .join(' • ')
                  ) : (
                    <></>
                  )}
                </p>
                <p className="text-lg font-bold text-black-900 mt-1.5 mb-1.5 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {event.name}
                </p>

                <p className="text-sm text-gray-700">
                  {formatToIDR(event.price)}
                </p>
              </div>
              <div className="flex justify-around px-2 py-3 text-gray-700 border-t border-gray-200">
                <div className="inline-flex items-center flex-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-calendar4"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z" />
                  </svg>
                  <p className="pl-2 text-sm whitespace-nowrap">
                    {event.startedAt.toLocaleString('en-gb', dateOptions)}
                  </p>
                </div>
                <div className="">
                  <div className="inline-flex items-center flex-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-map-pin"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <p className="pl-1 text-sm whitespace-nowrap">
                      {event.location ? event.location.city : <></>}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-4 pt-3 pb-4 bg-gray-100 border-t border-gray-200">
                <div className="text-xs font-semibold tracking-wide text-gray-600 ">
                  Organizer
                </div>
                <div className="flex items-center pt-2">
                  <div
                    className="w-5 h-5 mr-3 bg-center bg-cover rounded-full"
                    style={{ backgroundImage: `url(${event.imageUrl})` }}
                  ></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {event.organizer ? event.organizer.username : <></>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </section>
  );
};

export default EventCard;
