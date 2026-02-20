import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, Divider } from '@mui/material';
import { Menu as MenuIcon, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo.png.jpeg';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    handleClose();
    setMobileMenuOpen(false);
    navigate('/student/login');
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
    navigate('/');
  };

  const handleDashboardClick = () => {
    handleClose();
    if (user?.role === 'student') navigate('/student/dashboard');
    else if (user?.role === 'teacher') navigate('/teacher/dashboard');
    else if (user?.role === 'parent') navigate('/parent/dashboard');
    else if (user?.role === 'admin') navigate('/admin/dashboard');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Faculties', path: '/faculties' },
    { name: 'Students', path: '/students' },
    { name: 'Timetable', path: '/timetable' },
    { name: 'Contact', path: '/contact' },
  ];



  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-md py-4'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center mr-4 shadow-sm border border-gray-100 group-hover:scale-105 group-hover:shadow-md transition-all duration-300 overflow-hidden">
                <img src={logo} alt="R Education Logo" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className={`text-2xl font-extrabold tracking-tight leading-none ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
                  R Education
                </span>
                <span className="text-[11px] font-bold text-primary-600 tracking-[0.2em] uppercase mt-1">
                  Tuition Institute
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${scrolled
                    ? 'text-slate-600 hover:text-primary-600 hover:bg-primary-50/80'
                    : 'text-slate-700 hover:text-primary-600 hover:bg-white/60'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => navigate('/contact')}
                className="bg-primary-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-primary-700 hover:-translate-y-0.5 transition-all shadow-md active:scale-95"
              >
                Enroll Now
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-2">
              {user && (
                <button
                  onClick={handleProfileClick}
                  className="h-9 w-9 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-xs"
                >
                  {userInitial}
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
              >
                {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl overflow-hidden animate-in slide-in-from-top duration-300">
              <div className="px-4 py-6 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-left px-4 py-4 text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-100 mt-4">
                  <button
                    onClick={() => { setMobileMenuOpen(false); navigate('/contact'); }}
                    className="w-full bg-primary-600 text-white text-base font-semibold py-4 rounded-xl shadow-lg active:scale-95 transition-transform"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20" />

      {/* Profile Menu (MUI for positioning) */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { borderRadius: 3, mt: 1, minWidth: 160 } }}
      >
        {user ? (
          <>
            <MenuItem onClick={handleDashboardClick} sx={{ fontSize: '0.875rem' }}>Dashboard</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ fontSize: '0.875rem', color: '#EF4444' }}>Logout</MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleLoginClick} sx={{ fontSize: '0.875rem' }}>Login</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Header;
