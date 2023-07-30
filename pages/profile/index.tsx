import Artists from '@/components/Explore/Artists';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Card from '@/components/Card';
import { Event } from '@/lib/eventsInterface';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function ExploreRoute() {
  const [events, setEvents] = useState<any>([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const token = getCookie('token');
  const router = useRouter();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data.events);
    } catch (error) {
      alert('Please register or login first.');
      router.push('/');
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
    setSubmitLoading(true);
    try {
      // Make the API call to delete the event
      await axios.delete(`${API_URL}/user/me/track-event/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmitLoading(false);
      alert(`Successfully deleted!!`);
      fetchEvents();
    } catch (error) {
      alert(error);
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  console.log(events);
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
      <h2 className="text-xl font-bold text-center">My Upcoming Event</h2>
      <Card
        events={events}
        isProfilePage={true}
        handleDeleteEvent={handleDeleteEvent}
        submitLoading={submitLoading}
      />
      <h2 className="text-xl font-bold text-center">
        My Recent Attended Event
      </h2>
      <Card events={[]} />
    </div>
  );
}
