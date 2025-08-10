import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu, X, Search, Bell, MessageSquare, User, Bot } from "lucide-react";

const Navbar = () => {
    const { auth } = usePage().props;

    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Check if the current route matches the nav item
    const isActive = (path) => location.pathname === path;

    // Handle scroll event to change navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Logging navigation attempts
    const handleNavigation = (path) => {
        console.log(`Attempting to navigate to: ${path}`);
        navigate(path);
    };

    // Navigation items
    const navItems = [
        { title: "Home", path: "/" },
        { title: "Courses", path: "/coursespage" },
        { title: "Ai learning", path: "/ai", icon: Bot },
         { title: "Flashcard", path: "/flashcard" },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300  ${
                isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 py-4 "
            }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                                L
                            </span>
                        </div>
                        <span className="font-bold text-2xl text-dark">
                            Learnify
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.path}
                                className={`font-normal transition-colors hover:text-primary ${
                                    isActive(item.path)
                                        ? "text-primary"
                                        : "text-gray-600"
                                }`}
                            >
                                {item.title}
                            </Link>
                        ))}


                    </div>

                    {/* Desktop - Right side icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div>
                            <input
                                id="id-s03"
                                type="search"
                                name="id-s03"
                                placeholder="Search here..."
                                aria-label="Search content"
                                className="peer bg-white  relative h-10 rounded-full border border-slate-200 px-4 pr-12 text-sm text-slate-500 outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-purple-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute right-96  top-6.5 h-5 w-5  cursor-pointer stroke-primary peer-disabled:cursor-not-allowed"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                aria-hidden="true"
                                aria-label="Search icon"
                                role="graphics-symbol"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                        </div>

                        <button className="p-2 rounded-full hover:bg-soft-purple transition-colors">
                            <Bell className="w-5 h-5 text-gray-600" />
                        </button>

                        {auth.user && (
                        <Link
                            href={`/profiles/${auth.user.id}`}
                            className="flex items-center space-x-2"
                        >
                            <div className="w-9 h-9 rounded-full  flex items-center justify-center">
                                {/* <User className="w-5 h-5 text-white" /> */}
                                <img
                                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
                                    alt=""
                                    className="rounded-full text-white"
                                />
                            </div>
                        </Link>)}

                        {!auth.user ? (
                            <div>
                                <Link
                                    href="/register"
                                    className="bg-primary inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white hover:bg-soft-purple hover:text-white h-10 px-4 py-2"
                                >
                                    Signup
                                </Link>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-primary text-primary hover:bg-soft-purple hover:text-white h-10 px-4 py-2 mx-2"
                                >
                                    Login
                                </Link>
                            </div>
                        ) : (
                            <div>
                                  <Link
                            href={"/logout"}
                            method="get"
                         className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-primary text-primary hover:bg-soft-purple hover:text-white h-10 px-4 py-2"
                        >
                            LogOut
                        </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t mt-4">
                        <div className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.title}
                                    to={item.path}
                                    className={`px-4 py-2 rounded-md font-medium ${
                                        isActive(item.path)
                                            ? "bg-learnify-softPurple text-learnify-primary"
                                            : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            ))}
                            <hr className="my-2" />
                            <Link
                                href="/profile"
                                className="px-4 py-2 rounded-md flex items-center font-medium text-gray-600 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                <User className="w-5 h-5 mr-2" />
                                Profile
                            </Link>
                            <Link
                                to="/login"
                                className="mx-4  inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:opacity-90 h-10 px-4 py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Login / Sign Up
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
