import React, { useState } from 'react';
import { MessageCircle, Zap } from 'lucide-react';

export default function QAInbox({ questions = [] }) {
    const [filter, setFilter] = useState('all');

    const filtered = questions.filter(q => filter === 'all' ? true : (filter === 'unanswered' ? !q.answer : !!q.answer));

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2"><MessageCircle className="w-5 h-5"/> Q&A / Discussions</h2>
                <div className="flex items-center gap-2">
                    <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded-md text-sm ${filter==='all' ? 'bg-primary text-white' : 'bg-gray-100'}`}>All</button>
                    <button onClick={() => setFilter('unanswered')} className={`px-3 py-1 rounded-md text-sm ${filter==='unanswered' ? 'bg-primary text-white' : 'bg-gray-100'}`}>Unanswered</button>
                    <button onClick={() => setFilter('answered')} className={`px-3 py-1 rounded-md text-sm ${filter==='answered' ? 'bg-primary text-white' : 'bg-gray-100'}`}>Answered</button>
                </div>
            </div>

            <div className="space-y-4">
                {filtered.map(q => (
                    <div key={q.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <div className="flex items-start gap-3">
                            <img src={q.user.avatar} alt={q.user.name} className="w-10 h-10 rounded-full object-cover" />
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold">{q.user.name}</div>
                                        <div className="text-xs text-gray-400">{q.time}</div>
                                    </div>
                                    <div className="text-sm text-gray-500">{q.course}</div>
                                </div>

                                <div className="mt-3 text-gray-700">{q.text}</div>

                                {q.answer ? (
                                    <div className="mt-4 bg-learnify-softPurple p-3 rounded-lg">
                                        <div className="text-sm text-gray-800">{q.answer.text}</div>
                                        <div className="text-xs text-gray-400 mt-2">Answered • {q.answer.time}</div>
                                    </div>
                                ) : (
                                    <div className="mt-4">
                                        <div className="flex items-center gap-2">
                                            <textarea className="flex-1 rounded-md border border-gray-200 p-2 text-sm resize-none" placeholder="Write your reply..." rows={2}></textarea>
                                            <button className="px-3 py-2 bg-gray-100 rounded-md text-sm">AI Suggest Answer <Zap className="w-4 h-4 inline-block ml-2"/></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
