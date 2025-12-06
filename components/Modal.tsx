import React, { useState, useEffect } from 'react';
import { CardData } from '../types';

interface ModalProps {
  card: CardData;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ card, onClose }) => {
  const [showHint, setShowHint] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative w-full max-w-2xl bg-christmas-cream text-gray-800 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Image */}
        <div className="h-48 w-full bg-christmas-darkRed overflow-hidden relative group">
             {!imgError ? (
                <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-cover opacity-90"
                    onError={() => setImgError(true)}
                />
             ) : (
                // Beautiful fallback header
                <div className="w-full h-full bg-gradient-to-r from-christmas-darkRed to-christmas-red flex items-center justify-center">
                    <div className="text-white opacity-20 flex gap-4">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                    </div>
                </div>
             )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                 <h2 className="text-2xl md:text-3xl font-christmas text-white font-bold drop-shadow-md">
                    Día {card.id}
                 </h2>
            </div>
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors z-10"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
            
            <a 
                href={card.spotifyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-xl md:text-2xl font-bold text-christmas-darkRed mb-4 hover:underline"
            >
                <span>{card.title}</span>
                <svg className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
            </a>

            <div className="mb-6 relative pl-6 border-l-4 border-christmas-gold italic text-gray-600 bg-gray-50 p-4 rounded-r-lg">
                "{card.lyricSnippet}"
            </div>

            <div className="prose prose-stone max-w-none text-gray-800 mb-8 leading-relaxed text-lg">
                {card.text}
            </div>

            <div className="flex flex-col items-center border-t pt-6">
                {!showHint ? (
                    <button 
                        onClick={() => setShowHint(true)}
                        className="bg-christmas-green hover:bg-christmas-red text-white font-christmas text-xl px-8 py-2 rounded-full shadow-lg transform transition hover:scale-105"
                    >
                        Ver pista 🎁
                    </button>
                ) : (
                    <div className="animate-fade-in text-center">
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest block mb-1">Pista</span>
                        <p className="text-xl font-christmas text-christmas-darkRed">{card.hint}</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;