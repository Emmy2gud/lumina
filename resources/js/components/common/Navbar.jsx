import { useState, useEffect, useCallback } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import {
    Menu,
    X,
    Search,
    User,
    ChevronLeft,
    ChevronRight,
    ShoppingBag,
    Bell,
    Heart,
    Clock,
    BookOpen,
    GraduationCap,
    LogOut,
} from "lucide-react";

import useEmblaCarousel from "embla-carousel-react";
import NotificationsDropdown from "./NotificationsDropdown";
import { Badge } from "@mui/material";

const Navbar = () => {
    const { auth, categories, cartCount, cart } = usePage().props;
    const [emblaRef, emblaApi] = useEmblaCarousel({
        dragFree: true,
        containScroll: "trimSnaps"
    });
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const [showCategories, setShowCategories] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Enhanced scroll behavior
            setIsScrolled(currentScrollY > 20);

            // Hide categories on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowCategories(false);
            } else if (currentScrollY < lastScrollY) {
                setShowCategories(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const navItems = [
        { title: "Home", path: "/", icon: BookOpen },
        { title: "Explore", path: "/explore", icon: Search },
        { title: "Become a Tutor", path: "/tutor", icon: GraduationCap },
    ];

    const cartTotal = Object.values(cart || {}).reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-white shadow-md py-0"
                        : "bg-white/95 backdrop-blur-sm "
                }`}
            >
                <div className="border-b border-gray-200">
                    <div className="container mx-auto px-4 md:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <Link
                                href="/"
                                className="flex items-center gap-2 group flex-shrink-0"
                            >
                                <div className="relative">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-primary shadow-lg group-hover:shadow-xl transition-shadow duration-300" />
                                    <div className="absolute inset-0 rounded-xl bg-white/20 group-hover:bg-white/30 transition-colors" />
                                </div>
                                <span className="text-2xl font-bold text-gradient bg-clip-text ">
                                    Lumina
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center gap-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.path}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ml-4 ${
                                            isActive(item.path)
                                                ? "bg-purple-50 text-purple-600 font-semibold"
                                                : "text-gray-700 font-medium hover:bg-gray-50 hover:text-purple-600 "
                                        }`}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.title}
                                    </Link>
                                ))}
                            </div>

                            {/* Enhanced Search Bar */}
                            <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-8">
                                <div className={`relative w-full transition-all duration-300 ${
                                    searchFocused ? 'scale-105' : ''
                                }`}>
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="search"
                                        placeholder="Search for courses, subjects, or instructors..."
                                        className="w-full h-12 pl-12 pr-4 rounded-full border-2 border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-200"
                                        onFocus={() => setSearchFocused(true)}
                                        onBlur={() => setSearchFocused(false)}
                                    />
                                </div>
                            </div>

                            {/* Right side actions */}
                            <div className="hidden lg:flex items-center gap-2">
                                {auth.user ? (
                                    <>
                                        <NotificationsDropdown />

                                        {/* Cart with Tooltip */}
                                        <div className="relative group">
                                            <Link
                                                href="/cart"
                                                className="relative flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                <ShoppingBag className="w-5 h-5 text-gray-700" />
                                                {cartCount > 0 && (
                                                    <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold bg-purple-600 text-white rounded-full">
                                                        {cartCount}
                                                    </span>
                                                )}
                                            </Link>

                                            {/* Enhanced Cart Tooltip */}
                                            {cartCount > 0 && (
                                                <div className="invisible group-hover:visible absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                                    <div className="p-4">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <h3 className="text-lg font-bold text-gray-900">
                                                                Your Cart
                                                            </h3>
                                                            <span className="text-sm text-gray-500">
                                                                {cartCount} {cartCount === 1 ? 'item' : 'items'}
                                                            </span>
                                                        </div>

                                                        <div className="max-h-80 overflow-y-auto space-y-3">
                                                            {Object.entries(cart || {}).map(([id, item]) => (
                                                                <div
                                                                    key={id}
                                                                    className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                                                >
                                                                    <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden bg-gray-100">
                                                                        <img
                                                                            src={item.image}
                                                                            alt={item.name}
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <h4 className="text-sm font-semibold text-gray-900 truncate">
                                                                            {item.name}
                                                                        </h4>
                                                                        <p className="text-xs text-gray-500 mt-0.5">
                                                                            {item.instructor}
                                                                        </p>
                                                                        <div className="flex items-center justify-between mt-1">
                                                                            <span className="text-xs text-gray-500">
                                                                                Qty: {item.quantity}
                                                                            </span>
                                                                            <span className="text-sm font-bold text-purple-600">
                                                                                ${item.price}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-sm font-medium text-gray-700">
                                                                    Total:
                                                                </span>
                                                                <span className="text-xl font-bold text-gray-900">
                                                                    ${cartTotal.toFixed(2)}
                                                                </span>
                                                            </div>
                                                            <button className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                                                                Go to Cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Profile Dropdown */}
                                        <div className="relative group">
                                            <Link
                                                href={`/profiles/${auth.user.id}`}
                                                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                <img
                                                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
                                                    alt="Profile"
                                                    className="w-8 h-8 rounded-full border-2 border-purple-500 object-cover"
                                                />
                                                <span className="text-sm font-medium text-gray-700 hidden xl:inline">
                                                    {auth.user.name}
                                                </span>
                                            </Link>

                                            {/* Profile Dropdown Menu */}
                                            <div className="invisible group-hover:visible absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                                <div className="p-2">
                                                    <Link
                                                        href={`/profiles/${auth.user.id}`}
                                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                                                    >
                                                        <User className="w-4 h-4 text-gray-600" />
                                                        <span className="text-sm font-medium text-gray-700">Profile</span>
                                                    </Link>
                                                    <Link
                                                        href="/my-learning"
                                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                                                    >
                                                        <BookOpen className="w-4 h-4 text-gray-600" />
                                                        <span className="text-sm font-medium text-gray-700">My Learning</span>
                                                    </Link>
                                                    <div className="my-2 border-t border-gray-200" />
                                                    <Link
                                                        href="/logout"
                                                        method="get"
                                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                                                    >
                                                        <LogOut className="w-4 h-4 text-red-600" />
                                                        <span className="text-sm font-medium text-red-600">Logout</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href="/login"
                                            className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors duration-200"
                                        >
                                            Log In
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Enhanced Category Navigation */}
                {auth.user && (
                    <div
                        className={`bg-white border-b border-gray-200 transition-all duration-300 ${
                            showCategories ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                        }`}
                    >
                        <div className="container mx-auto px-4 md:px-6 lg:px-8">
                            <div className="relative py-3">
                                {/* Gradient Fade Effects */}
                                <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
                                <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />

                                {/* Navigation Buttons */}
                                <button
                                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-8 w-8 flex items-center justify-center bg-white shadow-lg rounded-full border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 opacity-0 hover:opacity-100 group-hover:opacity-100"
                                    onClick={scrollPrev}
                                    aria-label="Previous"
                                    type="button"
                                >
                                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-8 w-8 flex items-center justify-center bg-white shadow-lg rounded-full border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 opacity-0 hover:opacity-100 group-hover:opacity-100"
                                    onClick={scrollNext}
                                    aria-label="Next"
                                    type="button"
                                >
                                    <ChevronRight className="w-4 h-4 text-gray-600" />
                                </button>


                                <div className="overflow-hidden" ref={emblaRef}>
                                    <div className="flex gap-2">
                                        {categories.map((category, index) => (
                                            <Link
                                                key={index}
                                                href={`/course/${category}`}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                                                    isActive(category)
                                                        ? "bg-purple-600 text-white shadow-md"
                                                        : "text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                                                }`}
                                            >
                                                {category}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsOpen(false)}
            />
            <div
                className={`lg:hidden fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                            Menu
                        </span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>

                    {/* Mobile Menu Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search courses..."
                                className="w-full h-12 pl-10 pr-4 rounded-lg border-2 border-gray-200 bg-gray-50 text-sm focus:border-purple-500 focus:bg-white focus:outline-none transition-all"
                            />
                        </div>

                        {/* Navigation Items */}
                        <div className="space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                                        isActive(item.path)
                                            ? "bg-purple-50 text-purple-600"
                                            : "text-gray-700 hover:bg-gray-50"
                                    }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.title}
                                </Link>
                            ))}
                        </div>

                        {/* User Section */}
                        {auth.user ? (
                            <div className="space-y-2 pt-4 border-t border-gray-200">
                                <Link
                                    href={`/profiles/${auth.user.id}`}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <User className="w-5 h-5 text-gray-600" />
                                    <span className="font-medium text-gray-700">Profile</span>
                                </Link>
                                <Link
                                    href="/cart"
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <ShoppingBag className="w-5 h-5 text-gray-600" />
                                    <span className="font-medium text-gray-700">Cart</span>
                                    {cartCount > 0 && (
                                        <span className="ml-auto bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    href="/logout"
                                    method="get"
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <LogOut className="w-5 h-5 text-red-600" />
                                    <span className="font-medium text-red-600">Logout</span>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3 pt-4 border-t border-gray-200">
                                <Link
                                    href="/login"
                                    className="block w-full px-6 py-3 text-center border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/register"
                                    className="block w-full px-6 py-3 text-center bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Navbar;
