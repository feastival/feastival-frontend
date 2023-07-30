import Artists from '@/components/Explore/Artists';
import React, { useEffect, useState } from 'react';
import Table from '@/components/Explore/Table';
import Head from 'next/head';
import Sidebar from '@/components/Explore/Sidebar';
import Card from '@/components/Card';
import Card2 from '@/components/Card2';
import { API_URL } from '@/lib/api';
import axios from 'axios';
import { Event } from '@/lib/eventsInterface';

export default function ExploreRoute() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selected, setSelected] = useState('Event');
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      setEvents(response.data);
    } catch (error) {
      alert(error);
    }
  };

  for (const index in events) {
    events[index].startedAt = new Date(events[index].startedAt);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleClick = (selection: string) => {
    setSelected(selection);
  };

  return (
    <div className="mt-32">
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
      <Sidebar handleClick={handleClick} selected={selected} />
      {selected === 'Event' ? (
        <>
          <Card events={events} />
          <Card2 />
        </>
      ) : (
        <Artists />
      )}
    </div>
  );
}
