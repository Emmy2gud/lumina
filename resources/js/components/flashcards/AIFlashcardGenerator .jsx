import { useState } from 'react';

const AIFlashcardGenerator = ({ onAddFlashcard }) => {
  const [topic, setTopic] = useState('');
  const [numCards, setNumCards] = useState(3);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);

    // Simulate AI generating flashcards
    setTimeout(() => {
      // This would normally be where you call an AI API
      // For now we'll generate simple placeholder flashcards
      const generatedCards = generatePlaceholderCards(topic, numCards);

      // Add each generated card
      generatedCards.forEach(card => {
        onAddFlashcard(card);
      });

      setLoading(false);
      setTopic('');
    }, 1500);
  };

  const generatePlaceholderCards = (topic, count) => {
    const cards = [];
    const topicLower = topic.toLowerCase();

    for (let i = 0; i < count; i++) {
      switch (i % 3) {
        case 0:
          cards.push({
            question: `What is ${topicLower}?`,
            answer: `${topic} is a fundamental concept in learning that involves understanding key principles and applications.`
          });
          break;
        case 1:
          cards.push({
            question: `What are the benefits of ${topicLower}?`,
            answer: `${topic} provides several benefits including improved understanding, better retention, and practical applications.`
          });
          break;
        case 2:
          cards.push({
            question: `How is ${topicLower} used in practice?`,
            answer: `${topic} is applied in various scenarios to solve problems and improve outcomes through systematic approaches.`
          });
          break;
      }
    }

    return cards;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-xl font-semibold mb-4 text-dark">Generate AI Flashcards</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
            What topic would you like flashcards for?
          </label>
          <input
            id="topic"
            type="file"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            placeholder="Enter a topic (e.g., React Hooks, Photosynthesis)"
            required
          />
        </div>

        <div>
          <label htmlFor="numCards" className="block text-sm font-medium text-gray-700 mb-1">
            Number of flashcards
          </label>
          <select
            id="numCards"
            value={numCards}
            onChange={(e) => setNumCards(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="1">1 card</option>
            <option value="3">3 cards</option>
            <option value="5">5 cards</option>
            <option value="10">10 cards</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || !topic.trim()}
          className={`w-full py-3 px-4 rounded-md font-medium text-white
            ${loading || !topic.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:opacity-90'}`}
        >
          {loading ? 'Generating...' : 'Generate Flashcards'}
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-500">
        <p>Our AI will create high-quality flashcards to help you study this topic efficiently.</p>
      </div>
    </div>
  );
};

export default AIFlashcardGenerator;
