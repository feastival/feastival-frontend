import Navbar from '@/components/navbar';
import { NextPage } from 'next';
import Head from 'next/head';
import Home from './home/index';
import Trending from './home/trending';
import Upcoming from './home/upcoming';
import VideoSection from './home/video';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Feastival</title>
        <meta
          name="description"
          content="FIND AMAZING EVENT
NEAR YOU"
        />
      </Head>
      <Home />
      <Trending />
      <Upcoming />
      <VideoSection />
    </>
  );
};

export default Index;
