import MyProfile from '@/components/Explore/MyProfile';
import Sidebar from '@/components/Explore/Sidebar';
import React from 'react';

export default function ProfileRoute() {
  return (
    <div className="mt-32">
      <Sidebar />
      <MyProfile />
    </div>
  );
}
