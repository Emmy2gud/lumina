import React from 'react';
import { Box, MessageCircle, Sparkles, Cpu, BarChart2, TrendingUp, Settings, LogOut } from 'lucide-react';

export default function TeacherSidebar({ active, onSelect }) {
    const items = [
        { key: 'assignments', icon: Box, label: 'Assignments' },
        { key: 'qa', icon: MessageCircle, label: 'Q&A / Discussions' },
        { key: 'ai_tools_label', label: 'AI Tools', separator: true },
        { key: 'ai_assistant', icon: Sparkles, label: 'AI Teaching Assistant' },
        { key: 'ai_generator', icon: Cpu, label: 'AI Content Generator' },
        { key: 'insights_label', label: 'Insights', separator: true },
        { key: 'analytics', icon: BarChart2, label: 'Analytics' },
        { key: 'performance', icon: TrendingUp, label: 'Performance Insights' },
        { key: 'account_label', label: 'Account', separator: true },
        { key: 'settings', icon: Settings, label: 'Settings' },
        { key: 'logout', icon: LogOut, label: 'Logout' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-100 h-screen sticky top-0">
            <div className="p-4">
                <div className="mb-6 px-2">
                    <div className="text-sm font-semibold text-gray-500">MAIN</div>
                </div>

                <nav className="space-y-1">
                    {items.map((it) => (
                        it.separator ? (
                            <div key={it.key} className="mt-4 mb-1 px-2 text-xs text-gray-400 font-medium">{it.label}</div>
                        ) : (
                            <button
                                key={it.key}
                                onClick={() => onSelect(it.key)}
                                className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-gray-50 ${active === it.key ? 'bg-primary/10 ring-1 ring-primary text-primary' : 'text-gray-700'}`}
                            >
                                {it.icon && <it.icon className="w-5 h-5" />}
                                <span className="text-sm font-medium">{it.label}</span>
                            </button>
                        )
                    ))}
                </nav>

                <div className="mt-8 px-2">
                    <div className="text-xs text-gray-400">Tip</div>
                    <div className="mt-2 text-sm text-gray-600">Use AI tools to assist grading and content creation.</div>
                </div>
            </div>
        </aside>
    );
}
