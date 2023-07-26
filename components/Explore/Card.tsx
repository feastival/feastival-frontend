import Head from "next/head";
import Image from 'next/image';

export default function Card() {
  const events = [
    {
      name: "Chvrches",
      date: "13 Agustus 2023",
      venue: "Sentul Convention Center",
      location: "Bogor",
      imageUrl1:
        "https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg",
    },
    {
      name: "Chvrches",
      date: "13 Agustus 2023",
      venue: "Sentul Convention Center",
      location: "Bogor",
      imageUrl1:
        "https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg",
    },
    {
      name: "Chvrches",
      date: "13 Agustus 2023",
      venue: "Sentul Convention Center",
      location: "Bogor",
      imageUrl1:
        "https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg",
    },
  ];

  return (
    <>
      <Head>
        <title>Event Cards</title>
      </Head>

      <main className="py-6 flex items-center justify-center flex-wrap">
        {events.map((event, index) => (
          <a href="#" key={index} className="group block">
            <div className="overflow-hidden bg-white shadow-md rounded m-3 w-72 h-96">
              <div className="relative h-3/4">
                <img
                  src={event.imageUrl1}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-100"
                />
              </div>

              <div className="relative bg-white h-1/4 p-3 flex flex-col justify-between">
                <div className="grid grid-cols-2 items-start font-bold">
                  <p className="text-sm text-gray-700">{event.name}</p>
                  <p className="text-sm text-gray-700 text-right">
                    {event.location}
                  </p>
                </div>

                <div className="grid grid-cols-2 items-start">
                  <p className="text-gray-900 tracking-wide">{event.date}</p>
                  <p className="text-xs uppercase tracking-wide text-right">
                    {event.venue}
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </main>
    </>
  );
}
