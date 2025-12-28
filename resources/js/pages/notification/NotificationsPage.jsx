import React, { useEffect, useState, useRef, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NotificationItem from "../../components/common/NotificationItem";
import EmptyStateNotifications from "../../components/common/EmptyStateNotifications";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("all");
    // use a simple array for selection so it's easier to understand for beginners
    const [selected, setSelected] = useState([]);
    const [entered, setEntered] = useState(false);
    const containerRef = useRef(null);

    const load = useCallback((p = 1) => {
        setLoading(true);
        setTimeout(() => {
            const mock = Array.from({ length: 12 }).map((_, i) => ({
                id: `page-${p}-${i}`,
                title: `Notification ${p}-${i + 1}`,
                message: "This is a detailed notification preview for the notifications page.",
                time: `${p + i}m ago`,
                read: false,
            }));
            setNotifications((s) => (p === 1 ? mock : [...s, ...mock]));
            setHasMore(p < 5);
            setPage(p + 1);
            setLoading(false);
        }, 350);
    }, []);

    useEffect(() => {
        load(1);

        const t = setTimeout(() => setEntered(true), 300);
        return () => clearTimeout(t);
    }, [load]);

    // Infinite scroll handled via react-infinite-scroll-component

    const markRead = (id) => {
        setNotifications((s) => s.map((n) => (n.id === id ? { ...n, read: true } : n)));
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    // filtered notifications used by selection and rendering
    const notificationsFiltered = notifications.filter((n) => (filter === 'all' ? true : !n.read));

    // Toggle selection for a single notification
    const toggleSelect = (id) => {
        setSelected((prev) => {
            if (prev.includes(id)) return prev.filter((x) => x !== id);
            return [...prev, id];
        });
    };

    // Select all visible (filtered) notifications
    const selectAllVisible = () => {
        const visible = notificationsFiltered.map((n) => n.id);
        setSelected(visible);
    };

    // Clear selection
    const clearSelection = () => setSelected([]);

    // Mark selected notifications as read
    const bulkMarkRead = () => {
        setNotifications((s) => s.map((n) => (selected.includes(n.id) ? { ...n, read: true } : n)));
        clearSelection();
    };

    // Delete selected notifications from the list
    const bulkClear = () => {
        setNotifications((s) => s.filter((n) => !selected.includes(n.id)));
        clearSelection();
    };

    return (
        <div className="container mt-10 mx-auto  px-4 md:px-8 py-8">
            <div className=" mx-auto bg-surface-primary rounded-2xl shadow p-6">
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2">

                        <div className="">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-text-primary">Notifications</h1>
                                    <p className="text-sm text-gray-500 mt-1">All your notifications in one place.</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="text-sm text-text-secondary">
                                        <span className="font-semibold text-text-primary">{notifications.filter(n => !n.read).length}</span>
                                        <span className="ml-1">unread</span>
                                    </div>
                                    <button onClick={() => { setNotifications((s) => s.map(n => ({ ...n, read: true }))); }} className="text-sm bg-surface-tertiary font-semibold px-3 py-1 rounded-md hover:bg-gray-200  shadow-sm">Mark all read</button>
                                    <button onClick={() => setNotifications([])} className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded-md font-semibold hover:bg-red-100  shadow-sm">Clear all</button>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded-md text-sm ${filter === 'all' ? 'bg-primary text-white' : 'bg-surface-tertiary text-text-secondary'}`}>All</button>
                                    <button onClick={() => setFilter('unread')} className={`px-3 py-1 rounded-md text-sm ${filter === 'unread' ? 'bg-primary text-white' : 'bg-surface-tertiary text-text-secondary'}`}>Unread</button>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button onClick={selectAllVisible} className="text-sm text-white hover:underline bg-violet-600 px-4 py-2 rounded-full">Select all</button>
                                    <button onClick={clearSelection} className="text-sm text-violet-600 hover:underline border border-violet-600 px-4 py-2 rounded-full">Clear</button>
                                    {selected.length > 0 && (
                                        <>
                                            <button onClick={bulkMarkRead} className="text-sm bg-primary text-white px-3 py-1 rounded-md">Mark read</button>
                                            <button onClick={bulkClear} className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded-md">Delete</button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div ref={containerRef} className="mt-6">
                                {notifications.length === 0 && !loading ? (
                                    <EmptyStateNotifications />
                                ) : (
                                    <InfiniteScroll
                                        dataLength={notificationsFiltered.length}
                                        next={() => load(page)}
                                        hasMore={hasMore}
                                        loader={<div className="py-6 text-center text-gray-500">Loading more...</div>}
                                        scrollThreshold={0.9}
                                    >
                                        <div className="space-y-3">
                                            {notificationsFiltered.map((n, i) => (
                                                <div key={n.id} className={`flex items-start gap-3 p-3 rounded-lg border border-gray-100 bg-surface-primary ${entered ? 'shadow-sm opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} transition-all duration-300`} style={{ transitionDelay: `${i * 25}ms` }}>
                                                    <input type="checkbox" checked={selected.includes(n.id)} onChange={() => toggleSelect(n.id)} className="mt-1" />
                                                    <div className="flex-1">
                                                        <NotificationItem item={n} onMarkRead={markRead} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </InfiniteScroll>
                                )}
                            </div>
                        </div>
                    </div>

                    <aside className="col-span-1">
                        <div className="sticky top-24 bg-surface-primary p-4 rounded-lg border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-semibold text-text-primary">Filters</h3>
                            <div className="mt-3 flex flex-col gap-2">
                                <button onClick={() => setFilter('all')} className={`text-left shadow-sm px-3 py-2 rounded-md ${filter === 'all' ? 'bg-primary/10 text-primary' : 'bg-surface-secondary'}`}>All notifications</button>
                                <button onClick={() => setFilter('unread')} className={`text-left shadow-sm px-3 py-2 rounded-md ${filter === 'unread' ? 'bg-primary/10 text-primary' : 'bg-surface-secondary'}`}>Only unread</button>
                            </div>

                            <div className="mt-4">
                                <h4 className="text-sm font-medium">Quick actions</h4>
                                <div className="mt-2 flex flex-col gap-2">
                                    <button onClick={() => { setNotifications((s) => s.map(n => ({ ...n, read: true }))); }} className="w-full text-sm bg-surface-tertiary px-3 py-2 rounded-md shadow-sm">Mark all read</button>
                                    <button onClick={() => setNotifications([])} className="w-full text-sm bg-red-50 text-red-600 px-3 py-2 rounded-md shadow-sm">Clear all</button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}










