import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, ChangeEvent, useRef, useEffect } from 'react';
import useSWR from 'swr';
import { Input } from './ui/input';
import Modal from 'react-modal';
import { Button } from './ui/button';
interface EventData {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  startedAt: string;
  finishedAt: string;
  status: string;
  genre: string[];
  artists: {
    id: string;
    name: string;
  }[];
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

const SearchBar = () => {
  const [query, setQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch artists data
  const { data: artistsData, error: artistsError } = useSWR(
    isOpen && query
      ? `https://feastival-api.up.railway.app/artists?q=${query}`
      : null,
    fetcher,
  );

  // Fetch events data
  const { data: eventsData, error: eventsError } = useSWR(
    isOpen && query
      ? `https://feastival-api.up.railway.app/events?name=${query}`
      : null,
    fetcher,
  );

  // Function to handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query.toLowerCase());
  };

  // Function to handle open and close of the search bar
  const toggleSearchBar = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    updateModalStatus(newIsOpen);

    const currentQuery = { ...router.query };
    if (!newIsOpen) {
      delete currentQuery.search;
    } else {
      currentQuery.search = 'true';
    }

    router.push({ pathname: router.pathname, query: currentQuery });
  };
  // Function to update modal status in localStorage
  const updateModalStatus = (status: boolean) => {
    localStorage.setItem('modalOpen', status.toString());
  };

  // Function to get modal status from localStorage
  const getModalStatus = () => {
    const status = localStorage.getItem('modalOpen');
    return status === 'true';
  };

  // Check and set modal status on mount
  useEffect(() => {
    const modalStatus = getModalStatus();
    setIsOpen(modalStatus);
  }, []);

  return (
    <div ref={searchContainerRef} className="relative">
      {' '}
      <Input
        type="text"
        id="search-navbar-mobile"
        className="block md:w-full font-poppins z-40 py-6 my-2 pl-10 pr-3 text-sm text-white border border-gray-300 rounded-xl bg-[#272727] focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search here..."
        onClick={toggleSearchBar}
        readOnly
      />
      {/* Search icon */}
      <i className="absolute text-gray-400 transform -translate-y-1/2 cursor-pointer left-3 top-1/2 fas fa-search"></i>
      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center pt-20 backdrop-blur-lg">
          <div className="fixed z-50 w-2/3 mx-auto transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 backdrop-blur-md">
            <Button
              onClick={toggleSearchBar}
              className="text-white rounded-full shadow font-poppins hover:bg-black h-7 w-7"
            >
              ❌
            </Button>
            <div className="relative w-92">
              <i className="absolute text-gray-400 transform -translate-y-1/2 cursor-pointer bg left-3 top-1/2 fas fa-search"></i>
              <Input
                type="text"
                id="search-navbar-mobile"
                className="block font-poppins w-full py-6 my-4 pl-10 pr-3 text-sm text-white border border-gray-300 rounded-xl bg-[#272727] focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search here..."
                value={query}
                onChange={handleInputChange}
              />
            </div>
            <div className="z-50 w-full p-4 text-white bg-black shadow-lg opacity-80 font-poppins rounded-xl">
              {/* Render artistsData and eventsData here in a table format */}
              {artistsData && (
                <div>
                  <h3>Artists:</h3>
                  <ul>
                    {artistsData.slice(0, 3).map((artist: EventData) => (
                      <li
                        className="border-b-2 border-purple-500 hover:text-purple-500"
                        key={artist.id}
                      >
                        <Link
                          onClick={toggleSearchBar}
                          href={`/artist/${artist.id}`}
                        >
                          {artist.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {eventsData && (
                <div>
                  <h3>Events:</h3>
                  <ul>
                    {eventsData.slice(0, 3).map((event: EventData) => (
                      <li
                        className="border-b-2 border-purple-500 hover:text-purple-500"
                        key={event.id}
                      >
                        <Link
                          onClick={toggleSearchBar}
                          href={`/event/${event.id}`}
                        >
                          {event.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {artistsError && <div>Error loading artists data.</div>}
              {eventsError && <div>Error loading events data.</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
