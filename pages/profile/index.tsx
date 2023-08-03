import Artists from '@/components/Explore/Artists';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { Event } from '@/lib/eventsInterface';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Card from '@/components/Card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Upcoming from '@/components/Profile/Upcoming';
import EditButton from '@/components/Profile/EditButton';
import { ClockLoader } from 'react-spinners';

export default function ExploreRoute() {
  const [events, setEvents] = useState<any>([]);
  const [user, setUser] = useState<any>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [eventDetail, setEventDetail] = useState<any>();
  const token = getCookie('token');
  const router = useRouter();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);

      // Create an array to store the detailed event information
      const detailedEvents = [];

      for (const event of response.data.trackedEvents) {
        const detailedEvent = await fetchEventById(event.id);
        if (detailedEvent) {
          detailedEvents.push(detailedEvent);
        }
      }

      // Now set the detailed events array to the state
      setEvents(detailedEvents);
    } catch (error) {
      alert('Please register or login first.');
      router.push('/');
    }
  };

  // const fetchEventById = async () => {
  //   if (events) {
  //     try {
  //       // Fetch event data by its ID from the API using Axios
  //       const response = await axios.get(`${API_URL}/events/${events.id}`);
  //       setEventDetail(response.data);
  //     } catch (error) {
  //       console.error('Error fetching event data:', error);
  //     }
  //   }
  // };

  const fetchEventById = async (eventId: any) => {
    try {
      // Fetch event data by its ID from the API using Axios
      const response = await axios.get(`${API_URL}/events/${eventId}`);
      return response.data; // Return the event data to be used later
    } catch (error) {
      console.error('Error fetching event data:', error);
      return null; // Handle the error appropriately, e.g., show an error message
    }
  };

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
    // fetchEventById();
  }, []);

  // Check if 'events' is defined and not empty
  if (events && events.length > 0) {
    for (const index in events) {
      // Access each event and update the 'startedAt' property
      events[index].startedAt = new Date(events[index].startedAt);
    }
  }

  if (!user) {
    return (
      <div className="mt-60 flex items-center justify-center text-center mb-40">
        {' '}
        <ClockLoader
          color="#9747FF"
          size={50}
          className="text-center items-center"
        />
      </div>
    );
  }

  console.log(events);
  return (
    <div className="mt-32">
      {/* <Head>
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
      </h2> */}
      <div className="flex justify-center ">
        <Avatar className="h-[15rem] border  w-auto">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div className="flex mt-14 p-2 flex-col">
          <h2 className=" text-lg ">Username: {user.username} </h2>
          <h2 className="text-lg  mb-2">Email: {user.email} </h2>
          <EditButton />
        </div>
      </div>
      <h2 className="pl-4 mt-12 mb-5 font-bold text-3xl">
        My Upcoming Event 🎉
      </h2>
      <Upcoming events={events} />
      {/* <h2>My Recent Attended</h2> */}
    </div>
  );
}
