import { Event } from '@/lib/eventsInterface';
import Image from 'next/image';
import Link from 'next/link';
import ScaleLoader from 'react-spinners/ScaleLoader';

interface CardProps {
  events: Event[]; // Updated to accept the events prop
  isProfilePage?: boolean; // New prop to indicate if user is on the profile page
  submitLoading?: boolean;
  handleDeleteEvent?: (eventId: string) => void;
}

export default function Card({
  events,
  isProfilePage,
  handleDeleteEvent,
  submitLoading,
}: CardProps) {
  const dateOptions = {
    hour12: false,
    day: '2-digit' as const,
    month: 'long' as const,
    year: 'numeric' as const,
  };

  return (
    <>
      <main className="flex flex-wrap items-center justify-center py-6">
        {events.map((event) => (
          <div key={event.id}>
            <Link href={`/event/${event.id}`} passHref className="block group">
              <div className="w-64 m-3 overflow-hidden bg-white rounded group-hover:opacity-75 h-96">
                <div className="relative h-3/4">
                  <img
                    src={
                      event.imageUrl ||
                      'https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg'
                    }
                    alt="artist/event"
                    className="absolute inset-0 object-cover w-full h-full opacity-100"
                    width={2850}
                    height={1603}
                  />
                </div>

                <div className="mt-4">
                  <h3 className="overflow-hidden text-lg font-bold text-black font-bebasNeue overflow-ellipsis text">
                    {event.name}
                  </h3>
                  <div className="flex justify-between mt-1 overflow-hidden text-sm text-gray-500 overflow-ellipsis">
                    <p>{event.location}</p>
                    <p>
                      {event.startedAt.toLocaleString('id-ID', dateOptions)}
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
                {submitLoading ? (
                  <ScaleLoader color="#d3dddb" height={4} width={4} />
                ) : (
                  <span className="drop-shadow-lg">Delete</span>
                )}
              </button>
            )}
          </div>
        ))}
      </main>
    </>
  );
}
