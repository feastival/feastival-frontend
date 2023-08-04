import React from 'react';

interface SidebarProps {
  handleClick: (selection: string) => void;
  selected: string;
}

const BottomNavbar: React.FC<SidebarProps> = ({ handleClick, selected }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white shadow-lg">
      <div className="flex justify-center py-2">
        <div
          className={`p-2 px-7 hover:border-t-4 cursor-pointer hover:border-[#9747FF] ${
            selected === 'Events'
              ? 'font-bold border-t-4 border-[#9747FF] px-2'
              : ''
          }`}
        >
          <h2
            className={`text-lg text-center  `}
            onClick={() => handleClick('Events')}
          >
            Events
          </h2>
        </div>
        <div
          className={`p-2 px-7 hover:border-t-4 cursor-pointer hover:border-[#9747FF] ${
            selected === 'Artists'
              ? 'font-bold border-t-4 border-[#9747FF] px-2'
              : ''
          }`}
        >
          <h2
            className={`lg:text-lg text-center cursor-pointer `}
            onClick={() => handleClick('Artists')}
          >
            Artists
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
