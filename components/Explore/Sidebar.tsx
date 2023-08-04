import React from 'react';

interface SidebarProps {
  handleClick: (selection: string) => void;
  selected: string;
}

const Sidebar: React.FC<SidebarProps> = ({ handleClick, selected }) => {
  return (
    <>
      <div className="">
        <div className="">
          <div className="p-2">
            <h2
              className={`text-lg  text-center cursor-pointer hover:border-r-4 hover:border-[#9747FF] ${
                selected === 'Events'
                  ? 'font-bold border-r-4 border-[#9747FF] px-2'
                  : ''
              }`}
              onClick={() => handleClick('Events')}
            >
              Events
            </h2>
          </div>
        </div>
      </div>
      <div className=" mt-10 ">
        <div className="">
          <div className="p-2">
            <h2
              className={`lg:text-lg text-center cursor-pointer hover:border-r-4 hover:border-[#9747FF] ${
                selected === 'Artists'
                  ? 'font-bold border-r-4 border-[#9747FF] px-2'
                  : ''
              }`}
              onClick={() => handleClick('Artists')}
            >
              Artists
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
