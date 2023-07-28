import Artists from '@/components/Explore/Artists';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Card from '@/components/Card';
import { Event } from '@/lib/eventsInterface';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import { getCookie } from 'cookies-next';

export default function ExploreRoute() {
  const [events, setEvents] = useState<any>([]);
  const token = getCookie('token');

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data.events);
    } catch (error) {
      alert(error);
    }
  };

  // Check if 'events' is defined and not empty
  if (events && events.length > 0) {
    for (const index in events) {
      // Access each event and update the 'startedAt' property
      events[index].startedAt = new Date(events[index].startedAt);
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    try {
      // Make the API call to delete the event
      await axios.delete(`${API_URL}/user/me/track-event/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`Successfully deleted!!`);
      fetchEvents();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  console.log(events);
  return (
    <div className="mt-32">
      <Head>
        <title>Explore</title>
      </Head>
      <h2 className="font-bold text-center text-xl">My Upcoming Event</h2>
      <Card
        events={events}
        isProfilePage={true}
        handleDeleteEvent={handleDeleteEvent}
      />
      <h2 className="font-bold text-center text-xl">
        My Recent Attended Event
      </h2>
      <Card events={[]} />
    </div>
  );
}
