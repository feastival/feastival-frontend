import React, { useEffect, useState, useCallback } from 'react';

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

  const formatTimeLeft = (timeLeft: TimeLeft) => {
    const intervals = ['days', 'hours', 'minutes', 'seconds'];
    let duration = '';

    intervals.forEach((interval, index) => {
      if (!timeLeft[interval]) {
        return;
      }

      if (index === 0 || !timeLeft[intervals[index - 1]]) {
        duration +=
          timeLeft[interval] +
          ' ' +
          (timeLeft[interval] === 1 ? interval.slice(0, -1) : interval) +
          ' ';
      }
    });

    return duration.trim();
  };

  const duration = formatTimeLeft(timeLeft);

  return duration ? <span>{duration}</span> : null;
};

export default Countdown;
