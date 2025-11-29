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

const Navbar = () => {
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
                                        : "text-violet-600 font-medium hover:text-primary "
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

                                <Link
                                    href="/cart"
                                    className=" h-15 w-15 py-4 px-4 relative overflow-hidden  group hover:overflow-visible focus-visible:outline-none  text-sm text-primary cursor-pointer  rounded-full font-medium hover:bg-primary hover:text-white transition"
                                    aria-describedby="tooltip-02"
                                >
                                    <ShoppingBagIcon className="" />
                                    <Badge className="absolute -top-8 -right-3 h-5 w-5 flex items-center rounded-full justify-center p-0 text-xs bg-purple-600 text-white">
                                        {cartCount}
                                    </Badge>
                                    <span
                                        role="tooltip"
                                        id="tooltip-02"
                                        className="invisible absolute top-full -left-20 z-50 mt-3 w-80 -translate-x-1/2 rounded-lg bg-white p-4 text-sm shadow-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
                                    >
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-bold text-gray-900">
                                                Your Cart
                                            </h3>

                                            {Object.keys(cart).length === 0 ? (
                                                <p className="py-4 text-center text-gray-500">
                                                    Your cart is empty
                                                </p>
                                            ) : (
                                                <div className="max-h-96 overflow-y-auto ">
                                                    {Object.entries(cart).map(
                                                        ([id, item]) => (
                                                            <div
                                                                key={id}
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
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </h4>
                                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                                        {
                                                                            item.instructor
                                                                        }
                                                                    </p>
                                                                    <p className="text-sm text-gray-500 mt-0.5">
                                                                        Quantity:{" "}
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </p>
                                                                    <p className="text-sm font-semibold text-purple-600 mt-1">
                                                                        $
                                                                        {
                                                                            item.price
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}

                                            {Object.keys(cart).length > 0 && (
                                                <div className="pt-2 border-t border-gray-100">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <span className="text-sm font-medium text-gray-700">
                                                            Total:
                                                        </span>
                                                        <span className="text-lg font-bold text-gray-900">
                                                            $
                                                            {Object.values(cart)
                                                                .reduce(
                                                                    (
                                                                        sum,
                                                                        item
                                                                    ) =>
                                                                        sum +
                                                                        item.price *
                                                                            item.quantity,
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
            {/* category nav */}
            {auth.user ? (
                <div className="bg-gray-50 border-t border-gray-100 py-2 relative  ">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-gray-50 to-transparent" />
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-gray-50 to-transparent" />
                            {/* Embla carousel */}
                            <div className="embla overflow-hidden ">
                                <div className="embla__viewport" ref={emblaRef}>
                                    <div className="flex gap-2 embla__container">
                                        {categories.map((category, index) => (
                                            <Link
                                                key={index}
                                                href={`/course/${category}`}
                                                className={`px-4 py-2 rounded-full text-purple-600 text-sm font-medium whitespace-nowrap transition embla__slide ${
                                                    isActive(category)
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-gray-600 hover:bg-gray-200"
                                                }`}
                                            >
                                                {category}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* <button
                                className="embla__prev absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow p-1 rounded-full border border-gray-200 hover:bg-primary/10 transition"
                                onClick={scrollPrev}
                                aria-label="Previous"
                                type="button"
                            >
                                <ChevronLeft />
                            </button>
                            <button
                                className="embla__next absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow p-1 rounded-full border border-gray-200 hover:bg-primary/10 transition"
                                onClick={scrollNext}
                                aria-label="Next"
                                type="button"
                            >
                                <ChevronRight />
                            </button> */}
                        </div>
                    </div>
                </div>
            ) : null}
        </nav>
    );
};

export default Navbar;
