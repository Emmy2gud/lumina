import { useState, useEffect, useCallback } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Menu,
    X,
    Search,
    Bell,
    MessageSquare,
    User,
    Bot,
    ChevronLeft,
    ChevronRight,
    ShoppingBagIcon,
} from "lucide-react";

import useEmblaCarousel from "embla-carousel-react";

const DashNav = () => {
    const { auth } = usePage().props;
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
        { title: "Courses", path: "/coursespage" },
        { title: "Ai learning", path: "/ai", icon: Bot },
        { title: "Flashcard", path: "/flashcard" },
    ];

    const courseCategories = [
        { title: "Web Development", path: "/courses/web-development" },
        { title: "Data Science", path: "/courses/data-science" },
        { title: "Machine Learning", path: "/courses/machine-learning" },
        { title: "Mobile Development", path: "/courses/mobile-development" },
        { title: "Cloud Computing", path: "/courses/cloud-computing" },
        { title: "Cyber Security", path: "/courses/cyber-security" },
        { title: "AI & ML", path: "/courses/ai-ml" },
        { title: "Game Development", path: "/courses/game-development" },
    ];
    const cartitems = [
        {
            id: "1",
            title: "Modern JavaScript Mastery: ES6+ Deep Dive",
            instructor: "Ethan Miles",
            rating: 4.7,
            reviews: 12873,
            hours: 12,
            lessons: 96,
            price: 14.99,
            image: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3",
            badge: "Bestseller",
            category: "Development",
        },
        {
            id: "2",
            title: "UI/UX Design Foundations: From Wireframe to Prototype",
            instructor: "Hannah Lee",
            rating: 4.8,
            reviews: 9876,
            hours: 10.5,
            lessons: 80,
            price: 13.99,
            image: "https://images.unsplash.com/photo-1503602642458-232111445657",
            badge: "Hot",
            category: "Design",
        },
        {
            id: "3",
            title: "Data Science with Python: Build Real Dashboards",
            instructor: "Arjun Patel",
            rating: 4.7,
            reviews: 15642,
            hours: 14,
            lessons: 110,
            price: 16.99,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
            category: "Data Science",
        },
        {
            id: "4",
            title: "Python for Beginners: Your First 10 Projects",
            instructor: "Maya Chen",
            rating: 4.6,
            reviews: 20345,
            hours: 8,
            lessons: 62,
            price: 11.99,
            image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
            category: "Development",
        },
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
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-primary " />
                            <span className="text-xl font-extrabold text-primary">
                                Lumina
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2 mb-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.path}
                                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors duration-200 hover-scale   ${
                                    isActive(item.path)
                                        ? "bg-primary/10 text-primary font-semibold"
                                        : "text-gray-600 hover:text-primary "
                                }`}
                            >
                                {item.icon && <item.icon className="w-4 h-4" />}
                                {item.title}
                            </Link>
                        ))}
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
                        <button className="p-2 rounded-full hover:bg-primary/10 transition-colors">
                            <Bell className="w-5 h-5 text-gray-600" />
                        </button>
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

                                <Link
                                    href="/cart"
                                    className="ml-1 relative overflow-hidden  group hover:overflow-visible focus-visible:outline-none  text-sm text-primary cursor-pointer px-4 py-2 rounded-full font-medium hover:bg-primary hover:text-white transition"
                                >
                                    <ShoppingBagIcon />
                                    <span
                                        role="tooltip"
                                        id="tooltip-02"
                                        className="invisible absolute top-full -left-20 z-50 mt-3 w-80 -translate-x-1/2 rounded-lg bg-white p-4 text-sm shadow-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
                                    >
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-bold text-gray-900">
                                                Your Cart
                                            </h3>

                                            {cartitems.length === 0 ? (
                                                <p className="py-4 text-center text-gray-500">
                                                    Your cart is empty
                                                </p>
                                            ) : (
                                                <div className="max-h-96 overflow-y-auto">
                                                    {cartitems.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0"
                                                        >
                                                            <div className="flex-shrink-0 h-16 w-16 overflow-hidden rounded-md border border-gray-200">
                                                                <img
                                                                    src={
                                                                        item.image
                                                                    }
                                                                    alt={`${item.title} thumbnail`}
                                                                    loading="lazy"
                                                                    className="h-full w-full object-cover transition-transform hover:scale-105"
                                                                />
                                                            </div>

                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="text-sm font-medium text-gray-900 truncate">
                                                                    {item.title}
                                                                </h4>
                                                                <p className="text-xs text-gray-500 mt-0.5">
                                                                    {
                                                                        item.instructor
                                                                    }
                                                                </p>
                                                                <p className="text-sm font-semibold text-purple-600 mt-1">
                                                                    $
                                                                    {item.price}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {cartitems.length > 0 && (
                                                <div className="pt-2 border-t border-gray-100">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <span className="text-sm font-medium text-gray-700">
                                                            Total:
                                                        </span>
                                                        <span className="text-lg font-bold text-gray-900">
                                                            $
                                                            {cartitems
                                                                .reduce(
                                                                    (
                                                                        sum,
                                                                        item
                                                                    ) =>
                                                                        sum +
                                                                        item.price,
                                                                    0
                                                                )
                                                                .toFixed(2)}
                                                        </span>
                                                    </div>
                                                    <button className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors">
                                                        Checkout
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 transition"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
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
       
        </nav>
    );
};

export default DashNav;
