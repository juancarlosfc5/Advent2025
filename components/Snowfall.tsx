import React, { useEffect, useState } from 'react';

const Snowfall: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<number[]>([]);

  useEffect(() => {
    // Generate 50 snowflakes
    setSnowflakes(Array.from({ length: 50 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
      {snowflakes.map((i) => {
        const left = Math.random() * 100;
        const animationDuration = 5 + Math.random() * 10;
        const animationDelay = Math.random() * 5;
        const opacity = 0.3 + Math.random() * 0.7;
        const size = 5 + Math.random() * 5;

        return (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-80"
            style={{
              left: `${left}%`,
              top: `-10px`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              animation: `fall ${animationDuration}s linear infinite`,
              animationDelay: `-${animationDelay}s`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) translateX(0px); }
          100% { transform: translateY(110vh) translateX(20px); }
        }
      `}</style>
    </div>
  );
};

export default Snowfall;