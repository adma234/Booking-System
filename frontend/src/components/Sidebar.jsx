import React from 'react';

const Sidebar = () => {
    const topics = [
        { day: 'Day 1', topic: 'Topic 1' },
        { day: 'Day 2', topic: 'Topic 2' },
        { day: 'Day 3', topic: 'Topic 3' },
        { day: 'Day 4', topic: 'Topic 4' },
        { day: 'Day 5', topic: 'Topic 5' },
        { day: 'Day 6', topic: 'Topic 6' },
        { day: 'Day 7', topic: 'Topic 7' },
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col h-full">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Monthly Schedule</h2>
            <div className="text-sm text-gray-500 mb-6 font-medium bg-gray-100 p-2 rounded">
                09:00 hrs – 06:00 hrs
            </div>

            <div className="flex-1 overflow-y-auto">
                <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Topics</h3>
                <ul className="space-y-3">
                    {topics.map((t, i) => (
                        <li key={i} className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded cursor-pointer transition">
                            <span className="font-medium text-gray-700">{t.day}</span>
                            <span className="text-gray-500">{t.topic}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100 text-xs text-center text-gray-400">
                Scheduled Class System
            </div>
        </div>
    );
};

export default Sidebar;
