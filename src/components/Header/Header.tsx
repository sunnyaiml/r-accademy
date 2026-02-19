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

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About Us', id: 'about' },
    { name: 'Classes', id: 'classes' },
    { name: 'Lectures', id: 'lectures' },
    { name: 'Testimonials', id: 'testimonials' },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/#' + id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
            : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <div className="h-10 w-10 bg-primary-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-primary-200 group-hover:scale-110 transition-transform">
                <GraduationCap className="text-white h-6 w-6" />
              </div>
              <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-gray-900' : 'text-gray-900'}`}>
                R Academy
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${scrolled
                      ? 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-white/50'
                    }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <button
                    onClick={handleDashboardClick}
                    className="text-sm font-medium text-gray-600 hover:text-primary-600 px-3 py-2 transition-colors"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleProfileClick}
                    className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-sm hover:ring-4 hover:ring-primary-100 transition-all"
                  >
                    {userInitial}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLoginClick}
                    className="text-sm font-medium text-gray-600 hover:text-primary-600 px-3 py-2 transition-colors"
                  >
                    Log in
                  </button>
                  <button
                    onClick={handleLoginClick}
                    className="bg-gray-900 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-primary-600 hover:-translate-y-0.5 transition-all shadow-md active:scale-95"
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
            <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl overflow-hidden animate-in slide-in-from-top duration-300">
              <div className="px-4 py-6 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-4 text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="pt-4 border-t border-gray-100 mt-4 space-y-3">
                  {user ? (
                    <button
                      onClick={handleDashboardClick}
                      className="block w-full text-center py-4 text-base font-semibold text-primary-600 bg-primary-50 rounded-xl"
                    >
                      Go to Dashboard
                    </button>
                  ) : (
                    <button
                      onClick={handleLoginClick}
                      className="w-full bg-gray-900 text-white text-base font-semibold py-4 rounded-xl shadow-lg active:scale-95 transition-transform"
                    >
                      Get Started
                    </button>
                  )}
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
