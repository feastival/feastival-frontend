// components\Explore\Sidebar.tsx
import React from 'react';

interface SidebarProps {
  handleClick: (selection: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleClick }) => {
  return (
    <div>
      <div className="relative">
        <div className="w-14 lg:w-52">
          <div className="p-2">
            <h2
              className="text-lg  text-center hover:border-r-4 hover:border-[#9747FF] cursor-pointer"
              onClick={() => handleClick('Event')}
            >
              Event
            </h2>
          </div>
        </div>
      </div>
      <div className="relative mt-10">
        <div className="w-14 lg:w-52 ">
          <div className="p-2">
            <h2
              className="lg:text-lg text-center hover:border-r-4 hover:border-[#9747FF] cursor-pointer lg:hover:border-r-4 lg:hover:border-[#9747FF]"
              onClick={() => handleClick('Artist')}
            >
              Artist
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
