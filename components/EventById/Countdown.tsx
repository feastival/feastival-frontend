import React, { useEffect, useState, useCallback } from 'react';

interface CountdownProps {
  date: string;
}

interface TimeLeft {
  [key: string]: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  months: number;
}

const Countdown: React.FC<CountdownProps> = ({ date }) => {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    let targetDate = new Date(date);
    let currentDate = new Date();

    let timeLeft: TimeLeft = {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (targetDate > currentDate) {
      // Calculate difference in years
      let yearsDifference =
        targetDate.getFullYear() - currentDate.getFullYear();
      timeLeft.years = yearsDifference;

      // Calculate difference in months
      timeLeft.months = yearsDifference * 12;
      timeLeft.months -= currentDate.getMonth();
      timeLeft.months += targetDate.getMonth();
      if (targetDate.getDate() < currentDate.getDate()) {
        timeLeft.months--;
      }

      // Calculate difference in weeks and days
      let copyCurrentDate = new Date(currentDate.getTime());
      if (targetDate.getDate() < currentDate.getDate()) {
        copyCurrentDate.setMonth(copyCurrentDate.getMonth() + 1);
      }
      copyCurrentDate.setMonth(copyCurrentDate.getMonth() + timeLeft.months);
      timeLeft.days = Math.floor(
        (targetDate.getTime() - copyCurrentDate.getTime()) /
          (1000 * 60 * 60 * 24),
      );
      timeLeft.weeks = Math.floor(timeLeft.days / 7);
      timeLeft.days %= 7;

      // Calculate difference in hours, minutes, and seconds
      timeLeft.hours = Math.floor(
        ((targetDate.getTime() - copyCurrentDate.getTime()) /
          (1000 * 60 * 60)) %
          24,
      );
      timeLeft.minutes = Math.floor(
        ((targetDate.getTime() - copyCurrentDate.getTime()) / (1000 * 60)) % 60,
      );
      timeLeft.seconds = Math.floor(
        ((targetDate.getTime() - copyCurrentDate.getTime()) / 1000) % 60,
      );
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
    const intervals = [
      'years',
      'months',
      'weeks',
      'days',
      'hours',
      'minutes',
      'seconds',
    ];
    let duration = '';

    for (let i = 0; i < intervals.length; i++) {
      const interval = intervals[i];
      if (timeLeft[interval]) {
        duration = `${timeLeft[interval]} ${
          timeLeft[interval] === 1 ? interval.slice(0, -1) : interval
        }`;
        break;
      }
    }

    return duration;
  };

  const duration = formatTimeLeft(timeLeft);

  return duration ? <span>{duration}</span> : null;
};

export default Countdown;
