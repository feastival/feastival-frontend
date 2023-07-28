import Artists from '@/components/Explore/Artists';
import React from 'react';

import Table from '@/components/Explore/Table';
import Head from 'next/head';
import Sidebar from '@/components/Explore/Sidebar';
import Card from '@/components/Card';

export default function ExploreRoute() {
  return (
    <div className="mt-32">
      <Head>
        <title>Explore</title>
      </Head>
      <h2 className="font-bold text-center text-xl">My Upcoming Event</h2>
      <Card events={[]} />
      <h2 className="font-bold text-center text-xl">
        My Recent Attended Event
      </h2>
      <Card events={[]} />
    </div>
  );
}
