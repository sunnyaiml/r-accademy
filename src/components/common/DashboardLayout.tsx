import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  GraduationCap,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
} from 'lucide-react';

export interface NavItem {
  icon: React.FC<{ size?: number | string; className?: string }>;
  label: string;
  path?: string;
}

export interface DashboardLayoutProps {
  navItems: NavItem[];
  greeting: string;
  subtitle?: string;
  bottomWidget?: React.ReactNode;
  children: React.ReactNode;
  notificationCount?: number;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  navItems,
  greeting,
  subtitle,
  bottomWidget,
  children,
  notificationCount = 0,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavClick = (index: number, path?: string) => {
    setActiveNav(index);
    if (path) navigate(path);
    setMobileMenuOpen(false);
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 flex-col z-30 hidden lg:flex">
        {/* Logo */}
        <div className="h-20 flex items-center px-8">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-indigo-200">
            <GraduationCap className="text-white h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">R Academy</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(index, item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left ${
                activeNav === index
                  ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon
                size={20}
                className={activeNav === index ? 'stroke-[2.5px]' : 'stroke-2'}
              />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom Widget + Logout */}
        <div className="px-6 pb-6">
          {bottomWidget}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 mt-4 text-gray-500 hover:text-gray-900 w-full rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-6 py-3 flex justify-around items-center">
        {navItems.slice(0, 4).map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavClick(index, item.path)}
            className="p-2"
          >
            <item.icon
              size={22}
              className={activeNav === index ? 'text-indigo-600' : 'text-gray-400'}
            />
          </button>
        ))}
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-64 bg-white flex flex-col shadow-xl">
            <div className="h-20 flex items-center justify-between px-8">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                  <GraduationCap className="text-white h-5 w-5" />
                </div>
                <span className="text-xl font-bold text-gray-900">R Academy</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(index, item.path)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left ${
                    activeNav === index
                      ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="px-6 pb-6">
              {bottomWidget}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 mt-4 text-gray-500 hover:text-gray-900 w-full rounded-xl transition-colors"
              >
                <LogOut size={20} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pb-20 lg:pb-0">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-[#F8F9FC]/80 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 lg:p-8 lg:pb-0">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900">
                  {greeting}
                </h1>
                {subtitle && (
                  <p className="text-gray-500 mt-1 text-sm">{subtitle}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 lg:gap-6">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                />
              </div>

              <button className="relative p-2.5 bg-white rounded-full border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-100 shadow-sm transition-all">
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 border-2 border-white rounded-full" />
                )}
              </button>

              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-indigo-600 border-2 border-white shadow-md flex items-center justify-center text-white font-bold text-sm">
                {userInitial}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8 lg:pt-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
