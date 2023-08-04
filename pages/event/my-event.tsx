import Card from '@/components/Card';

import { API_URL } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function MyEventRoute() {
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
        <div className="mt-40 flex flex-col justify-center items-center">
          <h2 className="font-bold text-3xl">My Upcoming Events 🎉</h2>

          <Card
            events={upcomingEvents}
            isErrorMyEvent={isError}
            isLoading={isLoading}
          />

          <h2 className="font-bold text-3xl mt-8">My Past Events 📝</h2>
          <Card
            events={pastEvents}
            isErrorMyEvent={isError}
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  );
}
