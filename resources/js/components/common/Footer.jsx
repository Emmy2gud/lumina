import React from 'react'
import NewsletterSection from '../footer/NewsletterSection';
import PaymentMethods from '../footer/PaymentMethods';
import TrustBadges from '../footer/TrustBadges';
import SocialLinks from '../footer/SocialLinks';
import { ArrowRight, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

export default function Footer() {
      const currentYear = new Date().getFullYear();

  const shopCategories = [
    "Electronics & Gadgets",
    "Fashion & Apparel",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Sports & Fitness",
    "Books & Media",
    "Automotive",
    "Toys & Games"
  ];

  const customerHelp = [
    "Contact Support",
    "Track Your Order",
    "Shipping & Delivery",
    "Returns & Refunds",
    "Size Guide",
    "FAQs",
    "Product Reviews",
    "Order History"
  ];

  const vendorHub = [
    "Become a Seller",
    "Vendor Dashboard",
    "Seller Registration",
    "Commission Structure",
    "Vendor Policies",
    "Marketing Tools",
    "Analytics & Reports",
    "Seller Support"
  ];

  const company = [
    "About MarketPlace Pro",
    "Our Mission",
    "Careers",
    "Press & Media",
    "Investor Relations",
    "Sustainability",
    "Corporate Responsibility",
    "Partner With Us"
  ];

  const legal = [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
    "GDPR Compliance",
    "Accessibility",
    "Dispute Resolution",
    "Intellectual Property",
    "Platform Rules"
  ];

  return (
   <footer className="bg-gradient-to-b from-purple-900 via-violet-800 to-purple-900 text-white">

      <NewsletterSection />


      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">

          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent mb-4">
                MarketPlace Pro
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                The world's leading multi-vendor marketplace connecting millions of buyers with trusted sellers.
                Shop with confidence, sell with success.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm">support@marketplacepro.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-sm">123 Commerce St, Business District</span>
              </div>
            </div>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-slate-700 pb-2">
              Shop Categories
            </h3>
            <ul className="space-y-3">
              {shopCategories.map((category, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-slate-700 pb-2">
              Customer Help
            </h3>
            <ul className="space-y-3">
              {customerHelp.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-slate-700 pb-2">
              Vendor Hub
            </h3>
            <ul className="space-y-3">
              {vendorHub.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-slate-700 pb-2">
              Company
            </h3>
            <ul className="space-y-3 mb-8">
              {company.slice(0, 4).map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-md font-semibold mb-4 text-white border-b border-slate-700 pb-2">
              Legal
            </h4>
            <ul className="space-y-3">
              {legal.slice(0, 4).map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>


        <div className="mt-16 pt-8 border-t border-slate-700">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <TrustBadges/>
            <PaymentMethods />
          </div>
        </div>


        <div className="mt-12">
          <SocialLinks />
        </div>
      </div>


      <div className="bg-slate-950 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © {currentYear} MarketPlace Pro. All rights reserved.
              <span className="mx-2">|</span>
              <span className="text-blue-400">Trusted by over 10M+ customers worldwide</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <span className="flex items-center">
                <ShieldCheck className="h-4 w-4 mr-1 text-green-400" />
                SSL Secured
              </span>
              <span>Free Shipping $50+</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
