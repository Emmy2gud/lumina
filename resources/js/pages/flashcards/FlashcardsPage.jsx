import { useState, useEffect } from 'react';
import AIFlashcardGenerator from '../../components/flashcards/AIFlashcardGenerator ';
import FlashcardDeck from '../../components/flashcards/FlashcardDeck';



const FlashcardsPage = () => {
  const [flashcards, setFlashcards] = useState([
    { id: 1, question: "What is React?", answer: "A JavaScript library for building user interfaces." },
    { id: 2, question: "What is JSX?", answer: "A syntax extension for JavaScript that looks similar to HTML and allows us to write HTML in React." },
    { id: 3, question: "What is a React Component?", answer: "A reusable piece of code that returns React elements describing what should appear on the screen." },
  ]);

  const addFlashcard = (newFlashcard) => {
    setFlashcards([...flashcards, { ...newFlashcard, id: Date.now() }]);
  };

  return (

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-learnify-dark mb-4">AI-Powered Flashcards</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Generate and study flashcards to reinforce your learning. Our AI assistant will help you create effective flashcards for any topic.
          </p>
        </div>

        <AIFlashcardGenerator onAddFlashcard={addFlashcard} />

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-dark mb-8">Your Flashcard Collection</h2>
          {flashcards.length > 0 ? (
            <FlashcardDeck flashcards={flashcards} />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No flashcards yet. Generate some using the AI assistant above!</p>
            </div>
          )}
        </div>
      </div>

  );
};

export default FlashcardsPage;
