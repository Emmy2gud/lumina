import React from 'react';

export default function ToolCard({ title, description, cta }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{description}</p>
            <div className="flex justify-end">
                <button className="px-4 py-2 bg-primary text-white rounded-md">{cta}</button>
            </div>
        </div>
    );
}
