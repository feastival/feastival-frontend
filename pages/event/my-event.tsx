import Card from '@/components/Card';

import { API_URL } from '@/lib/api';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { useState } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function MyEventRoute() {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState<Map<string, boolean>>(
    new Map(),
  );

  const queryClient = useQueryClient();
  const token = getCookie('token');

  const fetchUserEvents = async () => {
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
    data: userEvents,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['userEvents'],
    queryFn: fetchUserEvents,
  });

  const handleUntrackEvent = async (eventId: string) => {
    // Update the loading state for the card with the specified eventId to true
    setCardLoading((prevLoading) => new Map(prevLoading).set(eventId, true));
    try {
      // Make the API call to delete the event
      await axios.delete(`${API_URL}/user/me/track-event/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Reset the loading state for the card with the specified eventId to false
      queryClient.invalidateQueries();
      setCardLoading((prevLoading) => new Map(prevLoading).set(eventId, false));
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
      console.log(error);
      // Reset the loading state for the card with the specified eventId to false
      setCardLoading((prevLoading) => new Map(prevLoading).set(eventId, false));
    }
  };

  // Convert 'startedAt' and 'finishedAt' to Date objects
  if (userEvents) {
    for (const index in userEvents) {
      userEvents[index].startedAt = new Date(userEvents[index].startedAt);
      userEvents[index].finishedAt = new Date(userEvents[index].finishedAt);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-44 mb-36">
        <ScaleLoader color="#a63be0" height={20} width={20} />
      </div>
    );
  }

  if (!token || !Array.isArray(userEvents) || userEvents.length === 0) {
    return (
      <h2 className="font-bold text-center text-4xl mt-52 mb-56 ">
        You have no tracked event`s
      </h2>
    );
  }

  // Filter past events based on 'finishedAt' date
  const currentDate = new Date();
  const pastEvents = userEvents.filter(
    (event) => event.finishedAt < currentDate,
  );

  // Filter upcoming events based on 'finishedAt' date
  const upcomingEvents = userEvents.filter(
    (event) => event.finishedAt >= currentDate,
  );

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center mt-20   mb-20">
          <ScaleLoader color="#a63be0" height={20} width={20} />
        </div>
      ) : (
        <div className="mt-40 mb-9 flex flex-col justify-center items-center">
          <h2 className="font-bold text-3xl">My Upcoming Events 🎉</h2>

          <Card
            events={upcomingEvents}
            isErrorMyEvent={isError}
            isLoading={isLoading}
            isMyEventPage={true}
            handleUntrackEvent={handleUntrackEvent}
            submitLoading={cardLoading}
          />

          <h2 className="font-bold text-3xl mt-8">My Past Events 📝</h2>
          <Card
            events={pastEvents}
            isErrorMyEvent={isError}
            isLoading={isLoading}
            isMyEventPage={true}
            handleUntrackEvent={handleUntrackEvent}
            submitLoading={cardLoading}
          />
        </div>
      )}
    </>
  );
}
