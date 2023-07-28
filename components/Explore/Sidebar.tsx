import React from 'react';

interface SidebarProps {
  handleClick: (selection: string) => void;
  selected: string;
}

const Sidebar: React.FC<SidebarProps> = ({ handleClick, selected }) => {
  return (
    <div>
      <div className="relative">
        <div className="w-14 lg:w-52">
          <div className="p-2">
            <h2
              className={`text-lg  text-center cursor-pointer hover:border-r-4 hover:border-[#9747FF] ${
                selected === 'Event' ? 'font-bold' : ''
              }`}
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
              className={`lg:text-lg text-center cursor-pointer hover:border-r-4 hover:border-[#9747FF] ${
                selected === 'Artist' ? 'font-bold' : ''
              }`}
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
