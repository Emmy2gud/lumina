import React from 'react';
import ToolCard from './ToolCard';

export default function AIToolsPage() {
    const tools = [
        { key: 'quiz', title: 'Quiz Generator', description: 'Create quizzes from lesson content automatically.', cta: 'Generate Quiz' },
        { key: 'rewriter', title: 'Lesson Rewriter', description: 'Rewrite lessons into simpler language or different levels.', cta: 'Rewrite Lesson' },
        { key: 'idea', title: 'Assignment Idea Generator', description: 'Get creative assignment prompts aligned to learning outcomes.', cta: 'Generate Ideas' },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">AI Tools</h2>
                <div className="text-sm text-gray-500">Boost your teaching with AI-assisted tools</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tools.map(t => (
                    <ToolCard key={t.key} title={t.title} description={t.description} cta={t.cta} />
                ))}
            </div>
        </div>
    );
}
