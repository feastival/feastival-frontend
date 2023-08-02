import { AppProps } from 'next/app';
import '../styles/globals.css';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());

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
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
};

export default App;
