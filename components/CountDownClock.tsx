import React, { useState, useEffect } from 'react';
import { TIMEZONE } from '../constants';

const CountDownClock: React.FC = () => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('es-CO', {
        timeZone: TIMEZONE,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTimeString(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" font-christmas text-2xl text-christmas-red tracking-wider animate-pulse">
      Hora mágica:  {timeString}
    </div>
  );
};

export default CountDownClock;