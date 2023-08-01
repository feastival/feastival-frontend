import { AppProps } from 'next/app';
import '../styles/globals.css';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import PopupForm from '@/components/form/PopupForm';
import ContentForm from '@/components/form/ContentForm';
import router from 'next/router';


const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </QueryClientProvider>
    </>
  );
};

export default App;
