import React, { useState, useEffect } from 'react';

const PixelClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pixel-art text-4xl font-bold text-green-500 mb-4 animate-float">
      {time.toLocaleTimeString()}
    </div>
  );
};

export default PixelClock;

