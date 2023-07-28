import { API_URL } from '@/lib/api';
import { Event } from '@/lib/eventsInterface';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Card() {
  const [events, setEvents] = useState<Event[]>([]);
  const dateOptions = {
    hour12: false,
    day: '2-digit' as const,
    month: 'long' as const,
    year: 'numeric' as const,
  };
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      setEvents(response.data);
    } catch (error) {
      alert(error);
    }
  };

  for (const index in events) {
    events[index].startedAt = new Date(events[index].startedAt);
  }

  useEffect(() => {
    fetchEvents();
  }, []);
  // const events = [
  //   {
  //     name: 'Chvrches',
  //     date: '13 Agustus 2023',
  //     venue: 'Sentul Convention Center',
  //     location: 'Bogor',
  //     imageUrl1:
  //       'https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg',
  //   },
  //   {
  //     name: 'Chvrches',
  //     date: '13 Agustus 2023',
  //     venue: 'Sentul ',
  //     location: 'Bogor',
  //     imageUrl1:
  //       'https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg',
  //   },
  //   {
  //     name: 'Chvrches',
  //     date: '13 Agustus 2023',
  //     venue: 'Sentul Convention Center',
  //     location: 'bogor',
  //     imageUrl1:
  //       'https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg',
  //   },
  // ];

  return (
    <>
      <main className="flex flex-wrap items-center justify-center py-6">
        {events.map((event) => (
          <a href="#" key={event.id} className="block group">
            <div className="w-64 m-3 overflow-hidden bg-white rounded group-hover:opacity-75 h-96">
              <div className="relative h-3/4">
                <Image
                  src="https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-100"
                  width={2850}
                  height={1603}
                />
              </div>

              <div className="flex justify-between mt-4">
                <div>
                  <h3 className="overflow-hidden text-lg font-bold text-black font-bebasNeue overflow-ellipsis">
                    {event.name}
                  </h3>
                  <p className="mt-1 overflow-hidden text-sm text-gray-500 overflow-ellipsis">
                    {event.startedAt.toLocaleString('id-ID', dateOptions)}
                  </p>
                </div>

                <div className="text-right">
                  <h3 className="overflow-hidden text-lg font-bold text-black font-bebasNeue overflow-ellipsis">
                    {event.location}
                  </h3>
                  <p className="mt-1 overflow-hidden text-sm text-gray-500 overflow-ellipsis">
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
