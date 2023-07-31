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
  const { data: citiesData, error: citiesError } = useSWR('https://feastival-api.up.railway.app/events', fetcher);
  const citiesSet = new Set<string>();
  citiesData?.forEach((event: { location: { city: string } }) => citiesSet.add(event.location.city));
  const cities = Array.from(citiesSet);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { data: filteredEvents, error: eventsError } = useSWR(
    `https://feastival-api.up.railway.app/events?name=${searchQuery || ''}&location=${selectedCity || ''}`,
    fetcher
  );

  // Event handlers
  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query.toLowerCase()); // Convert ke lowercase sebelum menyimpan
  };

  const handleCityInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const city = event.target.value;
    setSelectedCity(city.toLowerCase()); // Convert ke lowercase sebelum menyimpan
  };

  return (
    <div className="items-center justify-center w-full p-4 mx-auto my-3 bg-white h-18 rounded-xl">
    <div className="flex items-center gap-3"> 
      <div className="relative flex-1"> 
        <i className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2 fas fa-search"></i>
        <Input
          className="w-full pl-10 text-base font-normal text-center border-0 shadow hover:border-collapse placeholder:text-slate-500 bg-stone-50 rounded-xl font-poppins" // Add pl-10 class to add padding-left for the icon
          placeholder="Search event"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      {/* City Input with Navigation Icon */}
      <div className="relative w-2/5"> {/* Add relative class for positioning the navigation icon */}
        <i className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2 fas fa-map-marker-alt"></i>
        <Input
          className="pl-10 text-base font-normal text-center border-0 shadow hover:border-collapse placeholder:text-slate-500 bg-stone-50 font-poppins rounded-xl" // Add pl-10 class to add padding-left for the icon
          placeholder="Select a city"
          value={selectedCity || ""}
          onChange={handleCityInputChange}
          list="city-suggestions" // Referencing the datalist id
        />
      </div>
    </div>
      {/* City suggestions */}
      {citiesData ? (
        <datalist id="city-suggestions">
           <option key="" value=""/>
          {cities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
      ) : null}
      {/* Autocomplete table */}
      {searchQuery !== '' && selectedCity !== '' && (
        <div>
          {eventsError ? (
            <p>Error fetching event data.</p>
          ) : filteredEvents ? (
            filteredEvents.length > 0 ? (
              <table className="w-full mt-2 font-poppins b">
                <thead>
                  <tr>
                    <th className=""></th>
                    <th className=""></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((event: EventData) => (
                    <tr key={event.id} className="text-center font-poppins">
                      <td key={event.id} className="p-2"><Link href="/event/${event.id}">{event.name}</Link></td>
                      <td className="p-2">{event.location.city}</td>
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








