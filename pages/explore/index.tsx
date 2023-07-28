// pages\explore\index.tsx
import Artists from '@/components/Explore/Artists';
import React, { useEffect, useState } from 'react';
import Table from '@/components/Explore/Table';
import Head from 'next/head';
import Sidebar from '@/components/Explore/Sidebar';
import Card from '@/components/Card';
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
        <title>Explore</title>
      </Head>
      <Sidebar handleClick={handleClick} />
      {selected === 'Event' ? (
        <>
          <Card events={[]} />
          <Table />
        </>
      ) : (
        <Artists />
      )}
    </div>
  );
}
