import Artists from '@/components/Explore/Artists';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { Event } from '@/lib/eventsInterface';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Card2 from '@/components/Card';

export default function ExploreRoute() {
  const [events, setEvents] = useState<any>([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [eventRelation, setEventRelation] = useState<any>();
  const token = getCookie('token');
  const router = useRouter();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data.trackedEvents);
    } catch (error) {
      alert('Please register or login first.');
      router.push('/');
    }
  };

  const fetchEventById = async () => {
    if (events) {
      try {
        // Fetch event data by its ID from the API using Axios
        const response = await axios.get(`${API_URL}/events/${events.id}`);
        setEventRelation(response);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
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
    fetchEventById();
  }, []);

  console.log(events);
  console.log(eventRelation);
  return (
    <div className="mt-32">
      {/* <Head>
        <title>Explore</title>
      </Head>
      <h2 className="font-bold text-center text-xl">My Upcoming Event</h2>
      <Card2
        events={events}
        isProfilePage={true}
        handleDeleteEvent={handleDeleteEvent}
        submitLoading={submitLoading}
      />
      <h2 className="font-bold text-center text-xl">
        My Recent Attended Event
      </h2>
      <Card2 events={[]} /> */}
    </div>
  );
}
