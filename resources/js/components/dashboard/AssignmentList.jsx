import React from 'react';
import { Plus } from 'lucide-react';

export default function AssignmentList({ assignments = [] }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Assignments</h2>
                <button className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                    <Plus className="w-4 h-4" /> Create Assignment
                </button>
            </div>

            <div className="grid gap-4">
                {assignments.map((a) => (
                    <div key={a.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-lg font-semibold">{a.title}</div>
                                <div className="text-sm text-gray-500">{a.course}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-500">Due {a.due}</div>
                                <div className="text-sm text-gray-700 font-medium">{a.submissions} submissions</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
