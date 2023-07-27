import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-[#070707] border-gray-200 z-50">
      <div className="bg-[#070707] flex flex-wrap items-center justify-between max-w-screen-xl md:w-[1440px] h-[100px] p-4 mx-auto">
        <h1 className="self-center h-8 mr-3 font-normal leading-normal text-white uppercase whitespace-nowrap md:text-3xl text-md font-bebasNeue">
          FEASTIVAL
        </h1>
        <div className="flex items-center md:order-2">
          <div className="relative hidden md:block w-[273px] h-[52px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block xl:w-full w-[100px] h-[50px] p-2 xl:pl-10 pl-3 text-sm text-white border border-gray-300 rounded-xl bg-[#272727] focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search here..."
            />
          </div>
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-60"
            onClick={toggleMenu}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
            <span className="sr-only">Open main menu</span>
          </button>
          <Button
            variant="outline"
            className="bg-purple-500 xl:ml-4 rounded-xl hover:bg-purple-900 xl:w-[199px] w-[50px] xl:h-[50px] h-[30px]"
          >
            <div className="mx-auto py-3.5 font-normal  justify-center items-center gap-2 inline-flex">
              <div className="flex items-center justify-center w-[20px] h-[20px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  id="profile"
                >
                  <path
                    fill="white"
                    d="M134 2009c-2.217 0-4.019-1.794-4.019-4s1.802-4 4.019-4 4.019 1.794 4.019 4-1.802 4-4.019 4m3.776.673a5.978 5.978 0 0 0 2.182-5.603c-.397-2.623-2.589-4.722-5.236-5.028-3.652-.423-6.75 2.407-6.75 5.958 0 1.89.88 3.574 2.252 4.673-3.372 1.261-5.834 4.222-6.22 8.218a1.012 1.012 0 0 0 1.004 1.109.99.99 0 0 0 .993-.891c.403-4.463 3.836-7.109 7.999-7.109s7.596 2.646 7.999 7.109a.99.99 0 0 0 .993.891c.596 0 1.06-.518 1.003-1.109-.385-3.996-2.847-6.957-6.22-8.218"
                    transform="translate(-124 -1999)"
                  />
                </svg>
              </div>
              <div className="hidden text-base font-normal leading-normal text-center text-white md:block font-poppins">
                Login / Register
              </div>
            </div>
          </Button>
        </div>
        <div
          className={`md:flex md:w-auto md:order-1 ${
            isMenuOpen ? '' : 'hidden'
          }`}
          id="navbar-search"
        >
          <ul className="flex flex-col p-2 mt-4 font-medium bg-black border border-gray-100 rounded-lg md:text-center md:items-center md:justify-center md:p-0 md:flex-row md:space-x-1 md:mt-0 md:border-0 dark:border-gray-700">
            <li className="relative mt-4 md:hidden">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </li>
            <li>
              <Link
                href="/"
                className="block px-4 py-2 text-white rounded md:hover:bg-transparent hover:bg-purple-500 hover:text-purple-500 font-poppins"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/explore"
                className="block px-4 py-2 text-white rounded md:hover:bg-transparent hover:bg-purple-500 hover:text-purple-500 font-poppins"
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                href="/ticket"
                className="block px-4 py-2 text-white rounded md:hover:bg-transparent hover:bg-purple-500 hover:text-purple-500 font-poppins"
              >
                Ticket
              </Link>
            </li>
            <li>
              <Link
                href="/community"
                className="block px-4 py-2 text-white rounded md:hover:bg-transparent hover:bg-purple-500 hover:text-purple-500 font-poppins"
              >
                Community
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block px-4 py-2 text-white rounded md:hover:bg-transparent hover:bg-purple-500 hover:text-purple-500 font-poppins"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
