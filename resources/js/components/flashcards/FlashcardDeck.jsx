import { useState } from 'react';
import Flashcard from './Flashcard';


const FlashcardDeck = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  if (!flashcards.length) {
    return <div className="text-center py-8">No flashcards available</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl relative mb-8">
        <Flashcard flashcard={flashcards[currentIndex]} />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handlePrevious}
          className="px-6 py-2 bg-soft-purple text-white font-medium rounded-md hover:bg-primary hover:text-white transition-colors"
        >
          Previous
        </button>
        <span className="text-gray-600">
          {currentIndex + 1} / {flashcards.length}
        </span>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:opacity-90 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardDeck;
