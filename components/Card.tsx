import React, { useState } from 'react';
import { CardData } from '../types';
import { isCardUnlocked } from '../utils/timeUtils';

interface CardProps {
  data: CardData;
  onClick: (card: CardData) => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ data, onClick, className = '' }) => {
  const unlocked = isCardUnlocked(data.id);
  const [imgError, setImgError] = useState(false);

  return (
    <div 
        className={`relative group rounded-xl overflow-hidden shadow-lg transition-all duration-500 ${unlocked ? 'cursor-pointer hover:shadow-2xl hover:scale-[1.02]' : 'cursor-not-allowed opacity-80'} ${className}`}
        onClick={() => unlocked && onClick(data)}
    >
        {/* Background Image / Color */}
        <div className="absolute inset-0 bg-gray-800">
             {!imgError ? (
                 <img 
                    src={data.image} 
                    alt={`Día ${data.id}`} 
                    className={`w-full h-full object-cover transition-transform duration-700 ${unlocked ? 'group-hover:scale-110' : 'grayscale blur-sm'}`}
                    onError={() => setImgError(true)}
                 />
             ) : (
                 // Attractive fallback pattern
                 <div className="w-full h-full bg-gradient-to-br from-christmas-green to-christmas-darkRed flex items-center justify-center opacity-80">
                    <span className="text-4xl opacity-20 text-white">❄️</span>
                 </div>
             )}
             
             {/* Gradient overlay for text readability */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 transition-colors duration-300`}>
            
            {/* Number */}
            <span className={`font-christmas font-bold text-white drop-shadow-lg transition-all duration-300 ${unlocked ? 'text-4xl md:text-6xl group-hover:scale-110' : 'text-3xl opacity-50'}`}>
                {data.id}
            </span>

            {/* Locked Icon */}
            {!unlocked && (
                <div className="mt-2 text-christmas-gold animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
            )}
            
            {/* Hover text for unlocked */}
            {unlocked && (
                 <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-white font-christmas text-lg tracking-wider border-b border-white pb-1">Abrir</span>
                 </div>
            )}
        </div>
    </div>
  );
};

export default Card;