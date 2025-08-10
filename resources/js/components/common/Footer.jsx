
import { Link } from "@inertiajs/react";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white  pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="font-bold text-2xl text-learnify-dark">Learnify</span>
            </div>
            <p className="text-gray-600 mb-6">
              Transform your learning journey with our interactive platform designed for students and teachers alike.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-learnify-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-learnify-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-learnify-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-learnify-primary">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-learnify-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-600 hover:text-learnify-primary transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-learnify-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/materials" className="text-gray-600 hover:text-learnify-primary transition-colors">
                  Materials
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-gray-600 hover:text-learnify-primary transition-colors">
                  Quiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/ai" className="text-gray-600 hover:text-learnify-primary transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-learnify-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-learnify-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-learnify-primary transition-colors">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-learnify-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-learnify-primary mt-1" />
                <span className="text-gray-600">support@learnify.com</span>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-learnify-primary transition-colors">
                  Send Feedback
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-learnify-primary transition-colors">
                  Report Issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Learnify. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-learnify-primary text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-learnify-primary text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-learnify-primary text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
