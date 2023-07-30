import Head from 'next/head';
import React from 'react';

export default function AboutRoute() {
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
    </Head>
    <div className="pt-32">
      <div className="mx-auto">
        <h1 className="text-5xl font-bold text-center">
          {' '}
          Feastival: Celebrate the Flavorful Festival! 🎉
        </h1>
        <div className="flex flex-col items-center justify-center mt-8 mb-14">
          <img
            src="https://res.cloudinary.com/cloudinary-marketing/images/w_2000,h_1100/f_auto,q_auto/v1681925663/Web_Assets/blog/2bf11d06885a7a063c713080674c0ed0bb30e32f-1280x720-1_2801635da1/2bf11d06885a7a063c713080674c0ed0bb30e32f-1280x720-1_2801635da1-png?_i=AA"
            alt="artist-photo"
            className="w-full p-4 object-cover xl:w-[60rem] xl:h-[30rem] md:w-1/2  mb-5 md:mb-0 rounded-3xl"
          />
          <p className="w-full md:w-[60rem] md:pl-6 p-4 text-justify">
            Welcome to our Event Tracker platform, where simplicity and
            user-friendliness are at the heart of everything we do! Our mission
            is to provide you with an unparalleled experience, effortlessly
            guiding you to discover and be reminded of events that perfectly
            match your interests. Imagine a platform that understands your
            preferences and passions, effortlessly curating a personalized list
            of events tailored just for you. 
          </p>

          <p className="w-full md:w-[60rem] md:pl-6 p-4 text-justify">
            Gone are the days of spending hours
            searching through countless websites and social media platforms to
            find the events that truly excite you. With our Event Tracker, all
            you need to do is tell us your interests, and we`ll take care of the
            rest. Our sleek and intuitive interface ensures that navigating
            through the platform is a breeze.
          </p>
          <p className="w-full md:w-[60rem] md:pl-6 p-4 text-justify">
            No complicated menus or confusing
            options - just a straightforward and enjoyable experience from start
            to finish. Whether you`re a tech enthusiast, a foodie, a sports
            fanatic, an art lover, or anything in between, our platform will be
            your loyal companion in finding the events that resonate with your
            passions.
          </p>
          <img
            src="https://wallpaperaccess.com/full/1538619.jpg"
            alt="artist-photo"
            className="w-full p-4 object-cover xl:w-[60rem] xl:h-[30rem] md:w-1/2  mb-5 md:mb-0 rounded-3xl"
          />
        </div>
      </div>
    </div>
    </>
  );
}
