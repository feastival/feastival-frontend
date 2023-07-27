import Artists from '@/components/Explore/Artists';
import React from 'react';
import Card from '../../components/Card';
import Table from '@/components/Explore/Table';
import Head from 'next/head';

export default function ExploreRoute() {
  return (
    <div className="mt-32">
      <Head>
        <title>Explore</title>
      </Head>
      <Card />
      <Artists />
      <Table />
    </div>
  );
}
