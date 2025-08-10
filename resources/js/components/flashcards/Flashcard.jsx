import { useState } from 'react';

const Flashcard = ({ flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="w-full h-80 perspective-1000 cursor-pointer"
      onClick={handleFlip}
    >
      <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-gradient-to-br from-soft-purple to-white rounded-xl shadow-lg p-8 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-center text-dark mb-2">Question</h3>
          <p className="text-center text-lg">{flashcard.question}</p>
          <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-400">
            Click to flip
          </div>
        </div>
        {/* Back of card */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-white rounded-xl shadow-lg border-2 border-soft-purple p-8 flex flex-col justify-center [transform:rotateY(180deg)]">
          <h3 className="text-xl font-semibold text-center text-dark mb-2">Answer</h3>
          <p className="text-center text-lg">{flashcard.answer}</p>
          <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-400">
            Click to flip back
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
