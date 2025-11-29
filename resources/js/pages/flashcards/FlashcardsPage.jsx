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

      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="container mx-auto px-4 py-24 max-w-6xl">
          <div className="mb-16 text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-600 bg-clip-text text-transparent">AI-Powered Flashcards</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Generate and study flashcards to reinforce your learning. Our AI assistant will help you create effective flashcards for any topic.
            </p>
          </div>

          <AIFlashcardGenerator onAddFlashcard={addFlashcard} />

          <div className="mt-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-10">Your Flashcard Collection</h2>
            {flashcards.length > 0 ? (
              <FlashcardDeck flashcards={flashcards} />
            ) : (
              <div className="text-center py-16 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-gray-200">
                <p className="text-gray-500 text-lg font-light">No flashcards yet. Generate some using the AI assistant above!</p>
              </div>
            )}
          </div>
        </div>
      </div>

    );
};

export default FlashcardsPage;
