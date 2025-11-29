import React from 'react'
import NewsletterSection from '../footer/NewsletterSection';
import PaymentMethods from '../footer/PaymentMethods';
import TrustBadges from '../footer/TrustBadges';
import SocialLinks from '../footer/SocialLinks';
import { ArrowRight, Mail, MapPin, Phone, ShieldCheck, BookOpen, Users, Award, BarChart3, Globe, Heart } from 'lucide-react';

export default function Footer() {
      const currentYear = new Date().getFullYear();

      const lmsStats = [
        { label: 'Courses', value: '10K+', icon: BookOpen },
        { label: 'Learners', value: '1M+', icon: Users },
        { label: 'Instructors', value: '5K+', icon: Award },
        { label: 'Certifications', value: '200+', icon: BarChart3 }
      ];

  return (
   <footer className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white mt-20">



      {/* LMS Stats Section */}
      <div className="border-y border-slate-700/50">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {lmsStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-xl p-3 mb-3">
                    <Icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">

          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                Learnify
              </h2>
              <p className="text-xs text-purple-400 font-semibold tracking-wider mb-4">Your AI-Powered Learning Platform</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                Connect with expert instructors, learn at your own pace, and earn industry-recognized certifications. Access 10K+ courses across all skill levels.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors cursor-pointer group">
                <Phone className="h-4 w-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-light">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors cursor-pointer group">
                <Mail className="h-4 w-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-light">support@learnify.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors cursor-pointer group">
                <MapPin className="h-4 w-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-light">123 Learning Hub, Tech City</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-slate-700 pb-3">
              Learning
            </h3>
            <ul className="space-y-3">
              {['Browse Courses', 'Learning Paths', 'Certifications', 'Skill Assessments', 'Trending Topics'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors text-sm flex items-center group font-light">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-slate-700 pb-3">
              Resources
            </h3>
            <ul className="space-y-3">
              {['Documentation', 'API Reference', 'Community', 'Instructor Hub', 'Learning Guide'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors text-sm flex items-center group font-light">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-slate-700 pb-3">
              About
            </h3>
            <ul className="space-y-3 mb-8">
              {['About Learnify', 'Blog & Updates', 'Careers', 'Press Kit', 'For Business'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors text-sm flex items-center group font-light">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-md font-semibold mb-4 text-white border-b border-slate-700 pb-3">
              Legal
            </h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors text-sm flex items-center group font-light">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-slate-700">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <TrustBadges/>
            <PaymentMethods />
          </div>
        </div>

        <div className="mt-12">
          <SocialLinks />
        </div>
      </div>

      <div className="bg-slate-950 py-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/20 rounded-lg p-2">
                <ShieldCheck className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Secure & Verified</p>
                <p className="text-xs text-slate-500">SSL encrypted & trusted platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500/20 rounded-lg p-2">
                <Globe className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Global Community</p>
                <p className="text-xs text-slate-500">Learn from instructors worldwide</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-pink-500/20 rounded-lg p-2">
                <Heart className="h-5 w-5 text-pink-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Lifetime Access</p>
                <p className="text-xs text-slate-500">Learn at your own pace, forever</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-slate-500 text-sm font-light text-center md:text-left">
                © {currentYear} Learnify. All rights reserved.
                <span className="mx-2 text-slate-700">|</span>
                <span className="text-purple-400">Empowering learners worldwide</span>
              </div>
              <div className="flex items-center space-x-6 text-sm text-slate-500">
                <span className="hover:text-purple-400 transition-colors cursor-pointer">24/7 Support</span>
                <span className="text-slate-700">•</span>
                <span className="hover:text-purple-400 transition-colors cursor-pointer">Accessibility</span>
                <span className="text-slate-700">•</span>
                <span className="hover:text-purple-400 transition-colors cursor-pointer">Status</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
