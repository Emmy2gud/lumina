import React from "react";

export default function EmptyStateNotifications() {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center mb-6 shadow-inner">
                <svg className="w-24 h-24 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22s8-4 8-10V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 8v4c0 6 8 10 8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
            </div>

            <h3 className="text-lg font-semibold text-gray-900">You're all caught up</h3>
            <p className="text-sm text-gray-500 mt-2 text-center max-w-xs">No new notifications right now. We'll let you know when something important happens.</p>
            <div className="mt-6">
                <button className="px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-primary/90 transition">Check activity</button>
            </div>
        </div>
    );
}
