import Artists from '@/components/Explore/Artists';
import React from 'react';
import Card from '../../components/Card';
import Table from '@/components/Explore/Table';
import Metadata from '@/components/Artist/Metadata';
import Head from 'next/head';

export default function ArtistRoute() {
  return (
    <div className="mt-32">
      <Head>
        <title>Artist</title>
      </Head>
      <Metadata />
    </div>
  );
}
