import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, Divider } from '@mui/material';
import { GraduationCap, Menu as MenuIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

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

  const navItems = ['Home', 'About Us', 'Classes', 'Schedule', 'Testimonials', 'Contact Us'];

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-md shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="h-9 w-9 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-indigo-200">
                <GraduationCap className="text-white h-5 w-5" />
              </div>
              <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-gray-900' : 'text-gray-900'}`}>
                R Academy
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    scrolled
                      ? 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-white/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <button
                    onClick={handleDashboardClick}
                    className="text-sm font-medium text-gray-600 hover:text-indigo-600 px-3 py-2 transition-colors"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleProfileClick}
                    className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm hover:ring-2 hover:ring-indigo-200 transition-all"
                  >
                    {userInitial}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLoginClick}
                    className="text-sm font-medium text-gray-600 hover:text-indigo-600 px-3 py-2 transition-colors"
                  >
                    Log in
                  </button>
                  <button
                    onClick={handleLoginClick}
                    className="bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 hover:-translate-y-0.5 transition-all shadow-sm"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-2">
              {user && (
                <button
                  onClick={handleProfileClick}
                  className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs"
                >
                  {userInitial}
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? (
                  <X size={22} className="text-gray-600" />
                ) : (
                  <MenuIcon size={22} className="text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 space-y-1 animate-in fade-in">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  {item}
                </button>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-2">
                {user ? (
                  <button
                    onClick={handleDashboardClick}
                    className="block w-full text-left px-4 py-3 text-sm font-semibold text-indigo-600"
                  >
                    Go to Dashboard
                  </button>
                ) : (
                  <button
                    onClick={handleLoginClick}
                    className="w-full bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-full mt-2"
                  >
                    Get Started
                  </button>
                )}
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
