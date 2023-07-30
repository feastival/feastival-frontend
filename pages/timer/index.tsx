import React from 'react';
import Countdown from '../../components/EventById/Countdown';

const times = ['2023-09-24T22:21:18.071Z'];

const Timer: React.FC = () => {
  return (
    <div className="container m-64 p-4 font-poppins">
      <h1 className="text-xl font-bold mb-4">kapan konser dimulai?</h1>
      {times.map((time, index) => (
        <div key={index} className="mb-4">
          <Countdown date={time} />
        </div>
      ))}
    </div>
  );
};

export default Timer;
