import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import SearchBar from './searchbar';

interface NavbarProps {
  handleLogin: (token: string) => void;
}

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = getCookie('token');
    setIsLoggedIn(!!token);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    deleteCookie('token');
    setIsLoggedIn(false);
    router.push('/auth/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  return (
    <div className="fixed top-0 w-full bg-[#070707] border-gray-200 z-30">
      <div className="bg-[#070707] flex flex-wrap items-center justify-between max-w-screen-xl xl:w-[1440px] xl:h-[100px] p-4 mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="self-center h-8 mr-3 font-normal leading-normal text-white uppercase whitespace-nowrap md:text-3xl text-md font-bebasNeue">
            FEASTIVAL
          </h1>
        </div>
        <ul className="flex-row hidden lg:flex">
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
              href="/about"
              className="block px-4 py-2 text-white rounded md:hover:bg-transparent hover:bg-purple-500 hover:text-purple-500 font-poppins"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/event/my-event"
              className="block px-4 py-2 text-white rounded md:hover:bg-transparent hover:bg-purple-500 hover:text-purple-500 font-poppins"
            >
              My Event
            </Link>
          </li>
        </ul>

        <div className="flex items-center md:order-2">
          {/* Search Bar (Visible only on large screens) */}
          <div className="block px-4">
            <SearchBar />
          </div>
          {/* Render Logout button if isLoggedIn is true, otherwise render Login / Register button */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout} // Add the logout function here (implement handleLogout)
              className="ml-4 text-lg gap-2 items-center justify-center lg:flex bg-red-500 text-white mx-auto font-poppins rounded-xl hover:bg-red-900 w-[150px] h-[50px] hidden"
            >
              <div className="w-8 h-8">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m17 16 4-4m0 0-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1"
                    stroke="#ffffff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="stroke-374151"
                  ></path>
                </svg>
              </div>
              Logout
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="ml-4 gap-2 items-center justify-center mx-auto lg:flex bg-purple-500 text-white font-poppins rounded-xl hover:bg-purple-900 w-[199px] h-[50px] hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="w-4 h-4 text-white"
              >
                <path
                  fill="white"
                  d="M134 2009c-2.217 0-4.019-1.794-4.019-4s1.802-4 4.019-4 4.019 1.794 4.019 4-1.802 4-4.019 4m3.776.673a5.978 5.978 0 0 0 2.182-5.603c-.397-2.623-2.589-4.722-5.236-5.028-3.652-.423-6.75 2.407-6.75 5.958 0 1.89.88 3.574 2.252 4.673-3.372 1.261-5.834 4.222-6.22 8.218a1.012 1.012 0 0 0 1.004 1.109.99.99 0 0 0 .993-.891c.403-4.463 3.836-7.109 7.999-7.109s7.596 2.646 7.999 7.109a.99.99 0 0 0 .993.891c.596 0 1.06-.518 1.003-1.109-.385-3.996-2.847-6.957-6.22-8.218"
                  transform="translate(-124 -1999)"
                />
              </svg>
              Login / Register
            </Link>
          )}
          {/* Hamburger Menu */}
          <div
            className={`lg:hidden cursor-pointer ${isMenuOpen}`}
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </div>
        </div>

        {/* Mobile and Tablet Navigation */}
        <div
          className={`fixed top-0 right-0 h-full w-full lg:hidden ${
            isMenuOpen ? 'block backdrop-blur-lg' : 'hidden'
          }`}
          onClick={closeMenu}
        >
          <ul
            className={`mx-auto absolute top-0 right-0 h-full bg-black text-white p-4 mt-0 space-y-2 font-medium text-center border-l border-gray-100 rounded-lg dark:border-gray-700`}
          >
            {/* Logo (visible on mobile menu) */}
            {/* Close Button */}
            <li className="flex justify-end">
              <button onClick={toggleMenu} className="text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
            <div className="flex items-center justify-center md:hidden">
              <h1 className="h-8 text-xl font-normal leading-normal text-white uppercase mb-7 font-bebasNeue">
                FEASTIVAL
              </h1>
            </div>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout} // Add the logout function here (implement handleLogout)
                  className="items-center justify-center w-12 h-12 gap-2 mx-auto text-white bg-red-500 rounded-full lg:flex font-poppins hover:bg-red-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="logout"
                  >
                    <path d="M12.59,13l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H3a1,1,0,0,0,0,2ZM12,2A10,10,0,0,0,3,7.55a1,1,0,0,0,1.8.9A8,8,0,1,1,12,20a7.93,7.93,0,0,1-7.16-4.45,1,1,0,0,0-1.8.9A10,10,0,1,0,12,2Z"></path>
                  </svg>
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center w-12 h-12 gap-2 mx-auto text-white bg-purple-500 rounded-full font-poppins hover:bg-purple-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    className="w-4 h-4 text-white"
                  >
                    <path
                      fill="white"
                      d="M134 2009c-2.217 0-4.019-1.794-4.019-4s1.802-4 4.019-4 4.019 1.794 4.019 4-1.802 4-4.019 4m3.776.673a5.978 5.978 0 0 0 2.182-5.603c-.397-2.623-2.589-4.722-5.236-5.028-3.652-.423-6.75 2.407-6.75 5.958 0 1.89.88 3.574 2.252 4.673-3.372 1.261-5.834 4.222-6.22 8.218a1.012 1.012 0 0 0 1.004 1.109.99.99 0 0 0 .993-.891c.403-4.463 3.836-7.109 7.999-7.109s7.596 2.646 7.999 7.109a.99.99 0 0 0 .993.891c.596 0 1.06-.518 1.003-1.109-.385-3.996-2.847-6.957-6.22-8.218"
                      transform="translate(-124 -1999)"
                    />
                  </svg>
                </Link>
              )}
            </li>
            <li>
              <Link
                onClick={closeMenu}
                href="/"
                className="block px-4 py-2 text-white rounded hover:bg-transparent hover:text-purple-500 font-poppins"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={closeMenu}
                href="/explore"
                className="block px-4 py-2 text-white rounded hover:bg-transparent hover:text-purple-500 font-poppins"
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                onClick={closeMenu}
                href="/about"
                className="block px-4 py-2 text-white rounded hover:bg-transparent hover:text-purple-500 font-poppins"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                onClick={closeMenu}
                href="/event/my-event"
                className="block px-4 py-2 text-white rounded hover:bg-transparent hover:text-purple-500 font-poppins"
              >
                My Event
              </Link>
            </li>
          </ul>

          {/* Desktop Navigation */}
        </div>
      </div>
    </div>
  );
}
