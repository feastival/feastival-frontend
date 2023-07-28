import React from 'react';
import { Button } from '@/components/ui/button';

export default function ArtistRoute() {
  const events = [
    {
      date: '13 Agustus 2023',
      time: '07.00',
      event: 'Young, Live, and Free',
      artist: 'Chvrches',
      venue: 'Sentul Convention Center',
      location: 'Jakarta',
      category: 'Concert',
      organizer: 'Ismaya Live',
    },
  ];
  return (
    <div className="pt-32 bg-black">
      <div className="mx-auto">
        <main className="mt-10">
          <div className='w-full pb-10 bg-black'>
          <div className="md:w-[1440px] relative mx-auto mb-4 bg-black md:mb-0">
            <div className="px-4 lg:px-0">
              <h1 className="mb-5 text-[60px] font-semibold leading-tight text-center text-white font-bebasNeue">
                Chvrches: Here With Me
              </h1>
            </div>
            <img
              src="https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg"
              className="object-cover w-[1000px] rounded-2xl shadow-sm shadow-slate-500 lg:rounded mx-auto"
              />
          </div>
              </div>
              <div className='w-full pt-5 bg-white'>
          <div className="md:w-[1000px] md-px-0 px-2 w-full flex flex-inline justify-between mx-auto mb-6">
    <div className="text-5xl font-bebasNeue leading-[64px] text-[#2e2e2e] mt-px shrink-0">
      Event Detail
    </div>
    <Button className="bg-[#9747ff] hover:bg-purple-900 self-start flex flex-col justify-center h-12 px-6 mt-4 rounded-xl">
      <div className="whitespace-nowrap font-poppins leading-[24px] text-white">
        Remind This Event
      </div>
    </Button>
  </div>
         <div className="flex justify-center mt-10 font-poppins">  
            <div className="relative overflow-x-auto sm:rounded-lg font-poppins">
              <table className="w-full text-sm text-left dark:text-gray-400">
                <thead className="text-2xl font-bold ">
                  <tr>
                    <th scope="col" className="px-6">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Venue
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Organizer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={index} className="text-base bg-white">
                      <td className="px-6 py-2 ">{event.date}</td>
                      <td className="px-6 py-2 ">{event.time}</td>
                      <td className="px-6 py-2 ">{event.location}</td>
                      <td className="px-6 py-2 ">{event.venue}</td>
                      <td className="px-6 py-2 ">{event.category}</td>
                      <td className="px-6 py-2 ">{event.organizer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-[1000px] pb-10 md:pb-20 mt-12 w-full flex items-center justify-center mx-auto">
            <div className="items-start text-lg leading-relaxed text-gray-700 md:mx-auto justisfy-center">
              <p className="mx-auto leading-[32px] pr-0 md:pr-20">
                Advantage old had otherwise sincerity dependent additions. It in
                adapted natural hastily is justice. Six draw you him full not
                mean evil. Prepare garrets it expense windows shewing do an.s She
                projection advantages resolution son indulgence. Part sure on no
                long life am at ever. In songs above he as drawn to.
              </p>
            </div>
            <div className="m-auto mb-30 md:w-1/3">
              <div className="p-4">
                <p className="py-1 text-sm font-semibold text-gray-700">
                  Lineup
                </p>
                <div className="flex py-2">
                  <img
                    src="https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg"
                    className="object-cover w-12 h-12 mr-2 rounded-full"
                    />
                  <div>
                    <p className="py-1 text-sm font-semibold text-gray-700">
                      Chvrches
                    </p>
                    <p className="text-xs font-semibold text-gray-600">
                      {' '}
                      Band{' '}
                    </p>
                    <p className="py-1 text-sm font-semibold text-gray-700"></p>
                  </div>
                </div>
              </div>
            </div>

          </div>
                    </div>
        </main>
      </div>
    </div>
  );
}
