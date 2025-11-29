import React from "react";
import { Clock, Bell } from "lucide-react";

export default function NotificationItem({ item, onMarkRead }) {
    return (
        <div className={`flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition ${item.read ? "opacity-70" : "bg-white"}`}>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <Bell className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">{item.title}</h4>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.time}</span>
                    </span>
                </div>
                <p className="text-xs text-gray-600 mt-1  leading-3">{item.message}</p>
                <div className="mt-2">
                    {!item.read && (
                        <button
                            onClick={() => onMarkRead(item.id)}
                            className="text-xs text-primary font-medium hover:underline"
                        >
                            Mark as read
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
