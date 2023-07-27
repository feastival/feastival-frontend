import React from 'react';

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
    <div className="mt-32 ">
      <div className="max-w-screen-lg mx-auto ">
        <main className="mt-10">
          <div className="mb-4 md:mb-0 w-full mx-auto relative ">
            <div className="px-4 lg:px-0">
              <h1 className="text-4xl font-semibold text-black leading-tight text-center mb-5">
                Chvrches: Here With Me
              </h1>
            </div>

            <img
              src="https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg"
              className="w-full object-cover lg:rounded"
            />
          </div>
          <h1>EVENT DETAIL</h1>
          <div className="flex mt-10 justify-center font-poppins">
            <div className="relative overflow-x-auto sm:rounded-lg font-poppins">
              <table className="w-full text-sm text-left  dark:text-gray-400">
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
                    <tr key={index} className="bg-white text-base">
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
          <div className="flex flex-col lg:flex-row lg:space-x-12">
            <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
              <p className="pb-6">
                Advantage old had otherwise sincerity dependent additions. It in
                adapted natural hastily is justice. Six draw you him full not
                mean evil. Prepare garrets it expense windows shewing do an. She
                projection advantages resolution son indulgence. Part sure on no
                long life am at ever. In songs above he as drawn to.
              </p>
            </div>

            <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
              <div className="p-4">
                <p className="font-semibold text-gray-700 text-sm py-1">
                  Lineup
                </p>
                <div className="flex py-2">
                  <img
                    src="https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg"
                    className="h-10 w-10 rounded-full mr-2 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-700 text-sm py-1">
                      Chvrches
                    </p>
                    <p className="font-semibold text-gray-700 text-sm py-1"></p>
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
