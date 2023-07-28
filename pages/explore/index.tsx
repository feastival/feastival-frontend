// pages\explore\index.tsx
import Artists from '@/components/Explore/Artists';
import React, { useState } from 'react';
import Table from '@/components/Explore/Table';
import Head from 'next/head';
import Sidebar from '@/components/Explore/Sidebar';
import Card from '@/components/Card';

export default function ExploreRoute() {
  const [selected, setSelected] = useState('Event');

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
          <Card />
          <Table />
        </>
      ) : (
        <Artists />
      )}
    </div>
  );
}
