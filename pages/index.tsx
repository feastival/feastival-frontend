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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
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
