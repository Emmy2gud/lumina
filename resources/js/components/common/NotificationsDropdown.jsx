import React, { useState, useEffect, useRef, useCallback } from "react";
import { Bell, X } from "lucide-react";
import NotificationItem from "./NotificationItem";
import { Link, usePage } from "@inertiajs/react";

export default function NotificationsDropdown() {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [entered, setEntered] = useState(false);

    const containerRef = useRef(null);
    const sentinelRef = useRef(null);

    // Simple dummy loader for UI (no API calls). The real logic can be wired later.
    const fetchNotifications = useCallback((p = 1) => {
        setLoading(true);
        // simulate network delay
        setTimeout(() => {
            const mock = Array.from({ length: 10 }).map((_, i) => ({
                id: `m-${p}-${i}`,
                title: `New update ${p}-${i + 1}`,
                message: "This is a preview of the notification content.",
                time: `${i + p}m ago`,
                read: false,
            }));

            setNotifications((s) => (p === 1 ? mock : [...s, ...mock]));
            setHasMore(p < 5);
            setPage(p + 1);
            setUnreadCount((c) => c + mock.length);
            setLoading(false);
        }, 350);
    }, []);

    useEffect(() => {
        if (open) {
            fetchNotifications(1);
            // trigger enter animation next tick
            setEntered(false);
            const t = setTimeout(() => setEntered(true), 20);
            return () => clearTimeout(t);
        } else {
            setEntered(false);
        }
    }, [open, fetchNotifications]);

    // IntersectionObserver for infinite scroll
    useEffect(() => {
        if (!sentinelRef.current || !open) return;
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && hasMore && !loading) {
                    const next = page || (typeof page === "number" ? page : 2);
                    fetchNotifications(next);
                }
            });
        }, { root: containerRef.current, rootMargin: "200px" });

        obs.observe(sentinelRef.current);
        return () => obs.disconnect();
    }, [sentinelRef, hasMore, loading, page, fetchNotifications, open]);

    useEffect(() => {
        // recalc unread count
        setUnreadCount((notifications || []).filter((n) => !n.read).length);
    }, [notifications]);

    useEffect(() => {
        const closeOnOutside = (e) => {
            if (!containerRef.current) return;
            if (!containerRef.current.contains(e.target)) setOpen(false);
        };
        if (open) document.addEventListener("mousedown", closeOnOutside);
        return () => document.removeEventListener("mousedown", closeOnOutside);
    }, [open]);

    const markRead = (id) => {
        setNotifications((s) => s.map((n) => (n.id === id ? { ...n, read: true } : n)));
        setUnreadCount((c) => Math.max(0, c - 1));
        // Optimistic: call API
        fetch(`/api/notifications/${id}/read`, { method: "POST" }).catch(() => {});
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors relative"
                aria-expanded={open}
                aria-label="Notifications"
            >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-600 rounded-full">{unreadCount}</span>
                )}
            </button>

            {open && (
                <div
                    ref={containerRef}
                    className={"absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 origin-top-right transform transition-all duration-200 " +
                        (entered ? "scale-100 opacity-100" : "scale-95 opacity-0")}
                >
                    <div className="flex items-center justify-between p-3 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                        <div className="flex items-center gap-2">
                            <Link href="/notifications" className="text-xs text-gray-500 hover:underline">View all</Link>
                            <button onClick={() => setOpen(false)} className="p-1 rounded-md text-gray-500 hover:bg-gray-50"><X className="w-4 h-4"/></button>
                        </div>
                    </div>

                    <div className="max-h-80 overflow-y-auto p-3 space-y-2">
                        {notifications.length === 0 && !loading && (
                            <div className="py-6 text-center text-gray-500">No notifications</div>
                        )}

                        {notifications.map((n) => (
                            <NotificationItem key={n.id} item={n} onMarkRead={markRead} />
                        ))}

                        {loading && (
                            <div className="py-4 text-center text-sm text-gray-500">Loading...</div>
                        )}

                        <div ref={sentinelRef} />
                    </div>

                    <div className="p-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500">Showing newest notifications. Notifications expire after 30 days.</div>
                    </div>
                </div>
            )}
        </div>
    );
}
