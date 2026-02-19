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
              <div className="h-9 w-9 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <GraduationCap className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">R Academy</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering students with quality education, personalized learning paths, and expert guidance for academic excellence.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {['Instagram', 'Twitter', 'LinkedIn', 'YouTube'].map((social) => (
                <button
                  key={social}
                  className="h-9 w-9 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 transition-all text-xs font-bold"
                  aria-label={social}
                >
                  {social.charAt(0)}
                </button>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5">Programs</h4>
            <ul className="space-y-3">
              {['High School (8-12)', 'Test Preparation', 'Skill Development', 'Demo Lectures', 'Mentorship'].map((item) => (
                <li key={item}>
                  <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Campus */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5">Campus</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Faculty', 'Events', 'Gallery', 'Careers'].map((item) => (
                <li key={item}>
                  <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Sunny.work70@gmail.com</li>
              <li>+91 98765 43210</li>
              <li className="leading-relaxed">
                Room no. 36, Utkal Sadan,<br />
                Opp. to RK Jewellers,<br />
                Ganesh Chowk, Bhatwadi,<br />
                Thane - 400604
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} R Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-gray-500 text-sm hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-gray-500 text-sm hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </span>
            <p className="text-gray-500 text-sm">
              Created by Sunny Vishwakarma
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
