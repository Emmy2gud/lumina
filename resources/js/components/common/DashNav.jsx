import { useState, useEffect, useCallback } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import {
    Menu,
    X,
    Search,

    User,
    Bot,
    ChevronLeft,
    ChevronRight,
    ShoppingBagIcon,
    WandSparklesIcon,
} from "lucide-react";

import useEmblaCarousel from "embla-carousel-react";
import NotificationsDropdown from "./NotificationsDropdown";
import { Badge } from "@mui/material";

const DashNav = () => {
    const { auth, categories, cartCount, cart } = usePage().props;
    console.log(cart);
    const [emblaRef, emblaApi] = useEmblaCarousel();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavigation = (path) => {
        console.log(`Attempting to navigate to: ${path}`);
        navigate(path);
    };

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const navItems = [
        { title: "Home", path: "/" },
        { title: "Explore", path: "/explore" },
        { title: "Ai learning", path: "/ai", icon: WandSparklesIcon },

    ];

    return (
     <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300  ${
                isScrolled
                    ? "bg-white shadow-lg backdrop-blur-md py-2"
                    : "bg-white/80 backdrop-blur-md py-1"
            }`}
        >
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="ml-40">
                        <h1 className="text-3xl font-medium text-violet-600">Dashboard</h1>
                    </div>




                    {/* Desktop - Right side icons */}
                    <div className="hidden lg:flex items-center gap-4">
                        <div className="relative">
                            <input
                                type="search"
                                placeholder="Search..."
                                className="h-9 pl-4 pr-10 rounded-full border border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                            <Search className="absolute right-3 top-2.5 w-4 h-4 text-primary" />
                        </div>
                        <NotificationsDropdown />
                        {auth.user ? (
                            <Link
                                href={`/profiles/${auth.user.id}`}
                                className="flex items-center"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
                                    alt="Profile"
                                    className="w-9 h-9 rounded-full border-2 border-primary object-cover"
                                />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/register"
                                    className="bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-primary/90 transition"
                                >
                                    Signup
                                </Link>
                                <Link
                                    href="/login"
                                    className="border border-primary text-primary px-4 py-2 rounded-full font-medium hover:bg-primary hover:text-white transition ml-2"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                        {auth.user && (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/logout"
                                    method="get"
                                    className="ml-2 border border-primary text-primary px-4 py-2 mb-1 rounded-sm font-medium hover:bg-primary hover:text-white transition"
                                >
                                    LogOut
                                </Link>


                            </div>
                        )}
                    </div>

                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
                        isOpen
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    }`}
                    onClick={() => setIsOpen(false)}
                />
                <div
                    className={`lg:hidden fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-lg z-50 transform transition-transform duration-300 ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="flex flex-col h-full py-6 px-6 gap-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-xl text-primary">
                                Menu
                            </span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-md hover:bg-gray-100"
                                aria-label="Close menu"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.path}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition ${
                                        isActive(item.path)
                                            ? "bg-primary/10 text-primary"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.icon && (
                                        <item.icon className="w-4 h-4" />
                                    )}
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                        <hr />
                        {auth.user ? (
                            <Link
                                href={`/profiles/${auth.user.id}`}
                                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                <User className="w-5 h-5" />
                                Profile
                            </Link>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/register"
                                    className="bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-primary/90 transition"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Signup
                                </Link>
                                <Link
                                    href="/login"
                                    className="border border-primary text-primary px-4 py-2 rounded-full font-medium hover:bg-primary hover:text-white transition"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                        {auth.user && (
                            <Link
                                href="/logout"
                                method="get"
                                className="border border-primary text-primary px-4 py-2 rounded-full font-medium hover:bg-primary hover:text-white transition"
                                onClick={() => setIsOpen(false)}
                            >
                                LogOut
                            </Link>
                        )}
                        <div className="mt-auto">
                            <div className="flex gap-2">
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    className="h-9 pl-4 pr-10 rounded-full border border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all w-full"
                                />
                                <button className="absolute right-8 top-2.5">
                                    <Search className="w-4 h-4 text-primary" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* category nav */}

        </nav>
    );
};

export default DashNav;
