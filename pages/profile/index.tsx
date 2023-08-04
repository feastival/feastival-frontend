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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [events, setEvents] = useState<any>([]);
  //const [user, setUser] = useState<any>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [eventDetail, setEventDetail] = useState<any>();
  const token = getCookie('token');
  const router = useRouter();

  const fetchUserMe = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsername(response.data.username);
      setEmail(response.data.email);
      setImageUrl(response.data.imageUrl);
      setEvents(response.data.trackedEvents);
    } catch (error) {
      alert('Please register or login first.');
      router.push('/');
    }
  };

  // const handleDeleteEvent = async (eventId: string) => {
  //   setSubmitLoading(true);
  //   try {
  //     // Make the API call to delete the event
  //     await axios.delete(`${API_URL}/user/me/track-event/${eventId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setSubmitLoading(false);
  //     alert(`Successfully deleted!!`);
  //     fetchEvents();
  //   } catch (error) {
  //     alert(error);
  //     setSubmitLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchUserMe();
  }, []);

  // Check if 'events' is defined and not empty
  if (events && events.length > 0) {
    for (const index in events) {
      // Access each event and update the 'startedAt' property
      events[index].startedAt = new Date(events[index].startedAt);
    }
  }

  if (!username) {
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

  console.log(imageUrl);
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
        <title>Profile</title>
      </Head>
      {/* <h2 className="text-xl font-bold text-center">My Upcoming Event</h2>
      <Card
        events={events}
        isProfilePage={true}
        handleDeleteEvent={handleDeleteEvent}
        submitLoading={submitLoading}
      />
      <h2 className="text-xl font-bold text-center">
        My Recent Attended Event
      </h2> */}
      <div className="flex flex-col items-center">
        <Avatar className="h-[15rem] border w-auto">
          <AvatarImage
            src={imageUrl ? imageUrl : 'https://github.com/shadcn.png'}
          />
        </Avatar>
        <div className="flex p-2 flex-col">
          <h2 className="text-gray-900 text-3xl title-font font-medium mb-2">
            {username}{' '}
          </h2>
          <EditButton
            username={username}
            email={email}
            imageUrl={imageUrl}
            setUsername={setUsername}
            setEmail={setEmail}
            setImageUrl={setImageUrl}
          />
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
