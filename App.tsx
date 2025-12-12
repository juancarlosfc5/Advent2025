import React, { useState } from 'react';
import { cardsData as data } from './data/cards';
import { CardData } from './types';
import Snowfall from './components/Snowfall';
import CountDownClock from './components/CountDownClock';
import Card from './components/Card';
import Modal from './components/Modal';

// Helper to determine bento grid spans based on index
// Creates a visually interesting mosaic
const getBentoClasses = (index: number): string => {
  // Pattern: 0=Big, 4=Wide, 10=Big, 15=Wide, 24=Big (Last one)
  const classes = [
    'col-span-2 row-span-2', // 1
    'col-span-1 row-span-1', // 2
    'col-span-1 row-span-1', // 3
    'col-span-2 row-span-1', // 4 (Wide)
    'col-span-2 row-span-1', // 5 (Wide)
    'col-span-1 row-span-1', // 6
    'col-span-1 row-span-1', // 7
    'col-span-1 row-span-1', // 8
    'col-span-1 row-span-1', // 9
    'col-span-2 row-span-1', // 10 (Wide)
    'col-span-2 row-span-2', // 11 (Big)
    'col-span-1 row-span-1', // 12
    'col-span-1 row-span-1', // 13
    'col-span-2 row-span-1', // 14 (Wide)
    'col-span-2 row-span-1', // 15 (Wide)
    'col-span-1 row-span-1', // 16
    'col-span-1 row-span-1', // 17
    'col-span-1 row-span-1', // 18
    'col-span-1 row-span-1', // 19
    'col-span-1 row-span-1', // 20
    'col-span-1 row-span-1', // 21
    'col-span-1 row-span-1', // 22
    'col-span-1 row-span-1', // 23
    'col-span-2 row-span-1', // 24 (Wide)
    'col-span-2 row-span-2 md:col-span-4 lg:col-span-4 bg-christmas-gold', // 25 (Final)
  ];
  return classes[index] || 'col-span-1 row-span-1';
};

const App: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  return (
    <div className="min-h-screen bg-christmas-darkRed flex flex-col lg:flex-row relative">
      <Snowfall />
      
      {/* Left Column - Fixed Info */}
      <aside className="w-full lg:w-1/3 xl:w-1/4 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center items-center p-6 z-20 text-center border-b lg:border-b-0 lg:border-r border-christmas-red bg-christmas-darkRed shadow-xl">
        <div className="space-y-6 max-w-md mx-auto">
          <div className="text-6xl animate-bounce-slow"><br/>🎄</div>
          
          <h1 className="font-christmas text-4xl lg:text-5xl font-bold text-white leading-tight">
            CALENDARIO DE ADVIENTO 2025
          </h1>
          
          <div className="h-1 w-20 bg-christmas-gold mx-auto rounded-full"></div>
          
          <h2 className="text-xl font-bold text-christmas-gold uppercase tracking-widest">
            25 días para recordar nuestro amor
          </h2>

          <div className="prose prose-invert text-christmas-cream/90 text-lg">
            <p>
              Un regalo hecho a la antigüita:<br/>
              <strong>24 canciones</strong> que marcaron nuestra historia<br/>
              + <strong>1 sorpresa especial</strong> en Navidad.
            </p>
            <p className="mt-4 text-base-gold italic opacity-80">
              Cada día, desde el 1 hasta el 25 de diciembre, se desbloqueará una nueva canción, un pedacito de nosotros.
            </p>
            <p className="mt-4 font-christmas text-2xl text-christmas-gold bg-christmas-cream px-4 py-2 rounded-lg inline-block transform rotate-2">
              <CountDownClock />
            </p>
            <p className="mt-4">
              Porque nuestro amor también se celebra con detalles. ❤️
            </p>
          </div>
        </div>
      </aside>

      {/* Right Column - Bento Grid */}
      <main className="w-full lg:w-2/3 xl:w-3/4 p-4 md:p-8 z-20 overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {data.cards.map((card, index) => (
            <Card 
              key={card.id} 
              data={card} 
              onClick={setSelectedCard}
              className={getBentoClasses(index)}
            />
          ))}
        </div>
        
        <footer className="mt-12 text-center text-white/50 text-sm pb-4">
          Hecho con ❤️ para el amor de mi vida
        </footer>
      </main>

      {/* Modal */}
      {selectedCard && (
        <Modal 
          card={selectedCard} 
          onClose={() => setSelectedCard(null)} 
        />
      )}
    </div>
  );
};

export default App;