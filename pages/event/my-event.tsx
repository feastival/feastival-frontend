import Card from '@/components/Card';

import { API_URL } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import React from 'react';

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

  for (const index in userEvents) {
    userEvents[index].startedAt = new Date(userEvents[index].startedAt);
  }

  if (!token || !Array.isArray(userEvents) || userEvents.length === 0) {
    return (
      <h2 className="font-bold text-center text-4xl mt-52 mb-56 ">
        You have no tracked event`s
      </h2>
    );
  }

  return (
    <div className="mt-40 flex flex-col justify-center items-center">
      <h2 className="font-bold text-4xl">My Upcoming Events 🎉</h2>

      <Card
        events={userEvents}
        isErrorMyEvent={isError}
        isLoading={isLoading}
      />
    </div>
  );
}
