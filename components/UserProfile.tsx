import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from './ui/avatar';
import EditButtonUser from './EditButtonUser';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { API_URL } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function UserProfile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [events, setEvents] = useState<any>([]);
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
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: userProfile,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserMe,
  });

  useEffect(() => {
    fetchUserMe();
  }, []);

  if (isLoading) {
    return (
      <div className="mb-10">
        <ScaleLoader color="#a63be0" height={13} width={13} />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col mb-10 items-center ">
        <Avatar className="h-[15rem] border w-auto">
          <AvatarImage
            src={userProfile.imageUrl || 'https://github.com/shadcn.png'}
            className="object-cover"
          />
        </Avatar>
        <div className="flex p-2 flex-col">
          <h2 className="text-gray-900 text-3xl text-center title-font font-medium mb-2">
            {userProfile.username}{' '}
          </h2>
        </div>

        <EditButtonUser
          username={username}
          email={email}
          imageUrl={imageUrl}
          setUsername={setUsername}
          setEmail={setEmail}
          setImageUrl={setImageUrl}
        />
      </div>
    </>
  );
}
