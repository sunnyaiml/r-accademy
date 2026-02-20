
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png.jpeg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-20">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center mr-4 shadow-lg overflow-hidden border border-slate-800">
                <img src={logo} alt="R Education Logo" className="h-full w-full object-cover" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">R Education</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 pr-4">
              Empowering students with quality education, personalized learning paths, and expert guidance for academic excellence.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {['Instagram', 'Twitter', 'LinkedIn', 'YouTube'].map((social) => (
                <button
                  key={social}
                  className="h-10 w-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-600 hover:border-primary-500 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                  aria-label={social}
                >
                  {social.charAt(0)}
                </button>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary-500 mb-8 font-mono">Academic System</h4>
            <ul className="space-y-4">
              {[
                { name: 'Weekly Timetable', path: '/timetable' },
                { name: 'Test Schedule', path: '/test-schedule' },
                { name: 'Parents Meeting', path: '/parents-meeting' },
                { name: 'Faculties', path: '/faculties' },
                { name: 'Students & Results', path: '/students' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-400 text-sm hover:text-white transition-all duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-3 h-0.5 bg-primary-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Campus */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary-500 mb-8 font-mono">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Extra-Curricular', path: '/activities' },
                { name: 'Testimonials', path: '/testimonials' },
                { name: 'Contact Us', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-400 text-sm hover:text-white transition-all duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-3 h-0.5 bg-primary-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary-500 mb-8 font-mono">Contact</h4>
            <ul className="space-y-5 text-slate-400 text-sm">
              <li className="flex items-center gap-3">
                <span className="text-primary-500">@</span>
                Sunny.work70@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary-500">#</span>
                +91 84336 13068
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
        <div className="border-t border-slate-900 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} R Education Tuition Institute. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 md:gap-8 justify-center">
            <span className="text-slate-500 text-sm hover:text-primary-400 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-slate-500 text-sm hover:text-primary-400 transition-colors cursor-pointer">
              Terms of Service
            </span>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-slate-400 text-xs font-semibold tracking-wide">
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
