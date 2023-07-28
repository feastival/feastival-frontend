import { Event } from '@/lib/eventsInterface';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  events: Event[]; // Updated to accept the events prop
  isProfilePage?: boolean; // New prop to indicate if user is on the profile page
  handleDeleteEvent?: (eventId: string) => void;
}

export default function Card({
  events,
  isProfilePage,
  handleDeleteEvent,
}: CardProps) {
  const dateOptions = {
    hour12: false,
    day: '2-digit' as const,
    month: 'long' as const,
    year: 'numeric' as const,
  };

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
          <div key={event.id}>
            <Link href={`/event/${event.id}`} passHref className="block group">
              <div className="w-64 m-3 overflow-hidden bg-white rounded group-hover:opacity-75 h-96">
                <div className="relative h-3/4">
                  <Image
                    src={
                      event.imageUrl ||
                      'https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg'
                    }
                    alt=""
                    className="absolute inset-0 object-cover w-full h-full opacity-100"
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
            </Link>
            {isProfilePage && handleDeleteEvent && (
              <button
                onClick={() => handleDeleteEvent(event.id)}
                className="px-4 py-2 mt-2 font-bold text-white bg-red-500 rounded"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </main>
    </>
  );
}
