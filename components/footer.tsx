import React from "react";

export default function Footer() {
  return (
    <footer className="inset-x-0 bottom-0 border-gray-200 shadow">
      <div className="text-white bg-black border-t border-gray-200 shadow">
        <div className="container px-4 py-6 mx-auto sm:px-6 md:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex flex-col items-start justify-center gap-4">
              <div className="text-4xl font-normal leading-9 uppercase font-bebasNeue">
                feastival
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="text-lg font-medium leading-7">Contact</div>
                  <div className="text-base font-normal leading-normal text-neutral-400">
                    (021) 567-789-123
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-lg font-medium leading-7">Address</div>
                  <div className="text-base font-normal leading-normal text-neutral-400">
                    Jl. Pahlawan Indonesia
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5 xl:gap-12">
              <div className="flex flex-col gap-2">
                <div className="text-lg font-medium leading-7">Menu</div>
                <div className="flex flex-col gap-2">
                  <div className="text-base font-normal leading-normal text-neutral-400">
                    Home
                  </div>
                  <div className="text-base font-normal leading-normal text-neutral-400">
                    Tickets
                  </div>
                  <div className="text-base font-normal leading-normal text-neutral-400">
                    Careers
                  </div>
                  <div className="text-base font-normal leading-normal text-neutral-400">
                    Community
                  </div>
                  <div className="text-base font-normal leading-normal text-neutral-400">
                    About
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-lg font-medium leading-7">FAQ</div>
                <div className="flex flex-col gap-2">
                  <div className="text-base font-normal leading-normal text-neutral-400">
                    Payment
                  </div>
                  <div className="text-base font-normal leading-normal text-neutral-400">
                    Order
                  </div>
                  <div className="text-base font-normal leading-normal text-neutral-400">
                    How Trade Ticket
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-lg font-medium leading-7">Support</div>
                <div className="flex flex-col gap-4">
                  <div className="text-base font-normal leading-normal text-neutral-400">
                    Send Email
                  </div>
                  <div className="text-base font-normal leading-normal text-neutral-400">
                    Online chat
                  </div>
                  <div className="text-base font-normal leading-normal text-neutral-400">
                    Call center
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purple Footer */}
      <div className="bg-[#9747FF] text-gray-700">
        <div className="container px-4 py-2 mx-auto sm:px-6 md:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <span className="text-sm md:mr-6">
              © 2023{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                Feastival
              </a>
              . All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3">
              <li className="mr-4 hover:underline">
                <a href="#">About</a>
              </li>
              <li className="mr-4 hover:underline">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="mr-4 hover:underline">
                <a href="#">Licensing</a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
