import React from 'react';
import { GraduationCap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-5">
              <div className="h-10 w-10 bg-primary-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-primary-500/20">
                <GraduationCap className="text-white h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight">R Academy</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering students with quality education, personalized learning paths, and expert guidance for academic excellence.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {['Instagram', 'Twitter', 'LinkedIn', 'YouTube'].map((social) => (
                <button
                  key={social}
                  className="h-10 w-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
                  aria-label={social}
                >
                  {social.charAt(0)}
                </button>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary-500 mb-6 font-mono">Programs</h4>
            <ul className="space-y-4">
              {['High School (8-12)', 'Test Preparation', 'Skill Development', 'Demo Lectures', 'Mentorship'].map((item) => (
                <li key={item}>
                  <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all"></span>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Campus */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary-500 mb-6 font-mono">Campus</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Faculty', 'Events', 'Gallery', 'Careers'].map((item) => (
                <li key={item}>
                  <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all"></span>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary-500 mb-6 font-mono">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center gap-3">
                <span className="text-primary-500">@</span>
                Sunny.work70@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary-500">#</span>
                +91 98765 43210
              </li>
              <li className="leading-relaxed flex gap-3">
                <span className="text-primary-500 min-w-4">L</span>
                <span>
                  Room no. 36, Utkal Sadan,<br />
                  Opp. to RK Jewellers,<br />
                  Ganesh Chowk, Bhatwadi,<br />
                  Thane - 400604
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} R Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <span className="text-gray-500 text-sm hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-gray-500 text-sm hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
              <p className="text-gray-500 text-sm italic font-medium">
                Made by Sunny Vishwakarma
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
