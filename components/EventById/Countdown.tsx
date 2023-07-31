import React, { useEffect, useRef, useState, useCallback } from 'react';

interface CountdownProps {
  date: string;
}

interface TimeLeft {
  [key: string]: number | undefined;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const Countdown: React.FC<CountdownProps> = ({ date }) => {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    let year = new Date(date);
    let difference = +year - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [date]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="flex font-poppins">
      <div className="flex gap-3 sm:gap-1 flex-row bg-black h-36 rounded-2xl overflow-hidden pt-5 pr-3 sm:pt-0 sm:pr-0">
        {Object.keys(timeLeft).map((key) => (
          <div key={key} className="flex flex-col bg-black p-8 sm:w-32 w-16">
            <div className="h-16 sm:h-20 bg-[#2A303C]">
              <div className="h-[60px] flex justify-center bg-black sm:text-3xl text-xl text-white">
                {timeLeft[key]}
              </div>
            </div>
            <div className="flex justify-center">
              <span className="text-lg sm:text-2xl text-center text-white">
                {timeLeft[key] === 1 ? key.slice(0, -1) : key}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;
