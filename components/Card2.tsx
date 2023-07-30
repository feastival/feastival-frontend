import React from 'react';

type Event = {
  Lineup: string;
  LineupImg: string;
  event: string;
  price: string;
  date: string;
  location: string;
  organizer: string;
  OrganizerImg: string;
};

const events: Event[] = [
  {
    Lineup: 'Chvrches',
    LineupImg:
      'https://res.cloudinary.com/djudfrj8s/image/upload/v1690506223/feastival/867104_xnbla7.jpg',
    event: 'Luxury Disease Asia Tour 2023',
    price: 'Rp. 200.000',
    date: '13 Agustus 2023',
    location: 'Jakarta',
    organizer: 'Ismaya Live',
    OrganizerImg:
      'https://res.cloudinary.com/djudfrj8s/image/upload/v1690582770/feastival/1489174_zy8q3l.webp',
  },
  {
    Lineup: 'Niki, Vierratale, Sheila On 7, Rich Brian',
    LineupImg:
      'https://res.cloudinary.com/djudfrj8s/image/upload/v1690547059/feastival/wp7368797_fkmyhv.jpg',
    event: 'We The Fest 2024',
    price: 'Rp. 500.000',
    date: '16 Desember 2024',
    location: 'Bali',
    organizer: 'Ismaya Live',
    OrganizerImg:
      'https://res.cloudinary.com/djudfrj8s/image/upload/v1690582770/feastival/1489174_zy8q3l.webp',
  },
  {
    Lineup: 'Chvrches',
    LineupImg:
      'https://res.cloudinary.com/djudfrj8s/image/upload/v1690506223/feastival/867104_xnbla7.jpg',
    event: 'ONE OK ROCK Luxury Disease Asia Tour 2023',
    price: 'Rp. 200.000',
    date: '13 Agustus 2023',
    location: 'Jakarta',
    organizer: 'Ismaya Live',
    OrganizerImg:
      'https://res.cloudinary.com/djudfrj8s/image/upload/v1690582770/feastival/1489174_zy8q3l.webp',
  },
  {
    Lineup: 'Niki, Vierratale, Sheila On 7, Rich Brian',
    LineupImg:
      'https://res.cloudinary.com/djudfrj8s/image/upload/v1690547059/feastival/wp7368797_fkmyhv.jpg',
    event: 'We The Fest 2024',
    price: 'Rp. 500.000',
    date: '16 Desember 2024',
    location: 'Bali',
    organizer: 'Ismaya Live',
    OrganizerImg:
      'https://res.cloudinary.com/djudfrj8s/image/upload/v1690582770/feastival/1489174_zy8q3l.webp',
  },
  {
    Lineup: 'Chvrches',
    LineupImg:
      'https://res.cloudinary.com/djudfrj8s/image/upload/v1690506223/feastival/867104_xnbla7.jpg',
    event: 'ONE OK ROCK Luxury Disease Asia Tour 2023',
    price: 'Rp. 200.000',
    date: '13 Agustus 2023',
    location: 'Jakarta',
    organizer: 'Ismaya Live',
    OrganizerImg:
      'https://res.cloudinary.com/djudfrj8s/image/upload/v1690582770/feastival/1489174_zy8q3l.webp',
  },
  {
    Lineup: 'Niki, Vierratale, Sheila On 7, Rich Brian',
    LineupImg:
      'https://res.cloudinary.com/djudfrj8s/image/upload/v1690547059/feastival/wp7368797_fkmyhv.jpg',
    event: 'We The Fest 2024',
    price: 'Rp. 500.000',
    date: '25 september 2024',
    location: 'Bali',
    organizer: 'Ismaya Live',
    OrganizerImg:
      'https://res.cloudinary.com/djudfrj8s/image/upload/v1690582770/feastival/1489174_zy8q3l.webp',
  },
];
const EventCard: React.FC = () => (
  <section className="container mx-auto p-10 md:p-20 antialiased grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
    {events.map((event, i) => (
      <article
        key={i}
        className="bg-white shadow-xl rounded-lg overflow-hidden cursor-pointer transform duration-500 hover:-translate-y-1"
      >
        <div className="flex flex-col bg-white shadow-xl rounded-lg overflow-hidden">
          <div
            className="bg-cover bg-center h-48 p-4"
            style={{ backgroundImage: `url(${event.LineupImg})` }}
          >
            <div className="flex justify-end">
              {/* You need to add an SVG here */}
            </div>
          </div>
          <div className="p-4 py-5 overflow-y-auto">
            <p className="uppercase tracking-wide text-sm font-semibold text-gray-700">
              {event.Lineup.split(', ').slice(0, 3).join(' • ')}
            </p>
            <p className="text-lg font-bold text-black-900 mt-1.5 mb-1.5 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {event.event}
            </p>

            <p className="text-gray-700 text-sm">{event.price}</p>
          </div>
          <div className="flex py-3 px-2 border-t border-gray-200 text-gray-700 justify-around">
            <div className="flex-1 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-calendar4"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z" />
              </svg>
              <p className="pl-2 text-sm whitespace-nowrap">{event.date}</p>
            </div>
            <div className=''>
            <div className="flex-1 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-map-pin"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <p className=" text-sm pl-2 whitespace-nowrap">{event.location}</p>
            </div>
            </div>
    
          </div>

          <div className="px-4 pt-3 pb-4 border-t border-gray-200 bg-gray-100">
            <div className="text-xs uppercase font-bold text-gray-600 tracking-wide ">
              Organizer
            </div>
            <div className="flex items-center pt-2">
              <div
                className="bg-cover bg-center w-5 h-5 rounded-full mr-3"
                style={{ backgroundImage: `url(${event.OrganizerImg})` }}
              ></div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {event.organizer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    ))}
  </section>
);

export default EventCard;
