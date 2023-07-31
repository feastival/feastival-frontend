import { useEffect, useState } from 'react';
import Image from 'next/image';

import axios from 'axios';
import { API_URL } from '@/lib/api';
import { Event } from '@/lib/eventsInterface';
import { useQuery } from '@tanstack/react-query';
import Card from '@/components/Card';

export default function Upcoming() {
  // const [events, setEvents] = useState<any>([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      return response.data;
    } catch (error) {
      alert(error);
    }
  };

  const {
    data: events,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  for (const index in events) {
    events[index].startedAt = new Date(events[index].startedAt);
  }

  return (
    <div className="flex items-center justify-between w-full h-full p-4 mx-auto bg-white">
      <div className="relative mx-auto">
        <h2 className="text-5xl font-normal text-black uppercase font-bebasNeue">
          UPCOMING EVENT in 2023
        </h2>
        <Card events={events} isLoading={isLoading} isError={isError} />
      </div>
    </div>
  );
}
