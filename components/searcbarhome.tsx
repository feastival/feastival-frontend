import React, { useState, ChangeEvent } from 'react';
import useSWR from 'swr';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
interface EventData {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  startedAt: string;
  finishedAt: string;
  status: string;
  genre: string[];
  artists: string[];
  location: {
    venue: string;
    address: string;
    mapsURL: string;
    province: string;
    city: string;
    street: string;
    streetDetails: string;
    postalCode: string;
  };
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function SearchBarHome() {
  // State for filtering
  const { data: citiesData, error: citiesError } = useSWR(
    'https://feastival-api.up.railway.app/events',
    fetcher,
  );
  const citiesSet = new Set<string>();
  citiesData?.forEach((event: { location: { city: string } }) =>
    citiesSet.add(event.location.city),
  );
  const cities = Array.from(citiesSet);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { data: filteredEvents, error: eventsError } = useSWR(
    `https://feastival-api.up.railway.app/events?name=${
      searchQuery || ''
    }&location=${selectedCity || ''}`,
    fetcher,
  );

  // Event handlers
  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query.toLowerCase()); // Convert ke lowercase sebelum menyimpan
  };
  const handleCityInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value.toLowerCase();
    const matchingCity = cities.find(city => city.toLowerCase().startsWith(userInput));
    setSelectedCity(userInput.length >= 3 ? matchingCity || null : null);
  };





  return (
    <div className="items-center justify-center w-full p-4 my-3 bg-white lg:w-11/12 max-md:mx-auto md:items-start md:justify-items-start rounded-xl">
      <div className="relative items-center h-full gap-3 bg-white md:justify-items-start rounded-xl md:flex">
        <div className="relative w-full mb-5 md:w-1/2 lg:w-2/3 md:mb-0 md:flex-1">
          <i className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2 fas fa-search"></i>
          <Input
            className="w-full font-thin text-center border-0 shadow lg:font-normal xl:text-base hover:border-collapse placeholder:text-slate-500 bg-stone-50 rounded-xl font-poppins"
            placeholder="Search event"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>

        {/* City Input with Navigation Icon */}
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          {' '}
          {/* Add relative class for positioning the navigation icon */}
          <i className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2 fas fa-map-marker-alt"></i>
          <Input
            className="font-thin text-center border-0 shadow xl:text-base lg:font-normal hover:border-collapse placeholder:text-slate-500 bg-stone-50 font-poppins rounded-xl"
            placeholder="Select a city"
            value={selectedCity || ""}
            onChange={handleCityInputChange}
            list="city-suggestions" // Referencing the datalist id
          />
          {/* City suggestions */}
          {citiesData ? (
            <datalist id="city-suggestions">
              <option key="" value="" />
              {cities.map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
          ) : null}
        </div>
      </div>
      {/* Autocomplete table */}
      {searchQuery !== '' && selectedCity !== '' && (
        <div>
          {eventsError ? (
            <p>Error fetching event data.</p>
          ) : filteredEvents ? (
            filteredEvents.length > 0 ? (
              <table className="w-full mt-2 text-left font-poppins">
                <thead>
                  <tr>
                    <th className=""></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.slice(0, 3).map((event: EventData) => (
                    <tr key={event.id} className="text-left font-poppins">
                      <td key={event.id} className="p-2">
                        <Link
                          className="border-b-2 border-purple-500 hover:text-purple-500"
                          href={`/event/${event.id}`}
                        >
                          {event.name} <br />
                        </Link>
                        {event.location.city}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="mt-2 text-center">No matching events found.</p>
            )
          ) : (
            <p className="mt-2 text-center">Loading events...</p>
          )}
        </div>
      )}
    </div>
  );
}
