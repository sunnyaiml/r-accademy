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
  ChevronRight,
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
  activeSection?: number;
  onSectionChange?: (index: number) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  navItems,
  greeting,
  subtitle,
  bottomWidget,
  children,
  notificationCount = 0,
  activeSection,
  onSectionChange,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalActiveNav, setInternalActiveNav] = useState(0);

  // Support controlled & uncontrolled modes
  const activeNav = activeSection !== undefined ? activeSection : internalActiveNav;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavClick = (index: number, path?: string) => {
    if (onSectionChange) {
      onSectionChange(index);
    } else {
      setInternalActiveNav(index);
    }
    if (path) navigate(path);
    setMobileMenuOpen(false);
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';
  const roleColor = user?.role === 'admin' ? 'from-blue-600 to-teal-500'
    : user?.role === 'teacher' ? 'from-blue-600 to-blue-800'
    : user?.role === 'parent' ? 'from-teal-500 to-teal-700'
    : 'from-blue-500 to-blue-700';

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-[260px] bg-white border-r border-gray-100/80 flex-col z-30 hidden lg:flex">
        {/* Logo */}
        <div className="h-20 flex items-center px-7 border-b border-gray-50">
          <div className={`h-10 w-10 bg-gradient-to-br ${roleColor} rounded-xl flex items-center justify-center mr-3 shadow-lg`}>
            <GraduationCap className="text-white h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-bold text-gray-900 tracking-tight block leading-tight">R Academy</span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{user?.role || 'Portal'}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
          {navItems.map((item, index) => {
            const isActive = activeNav === index;
            return (
              <button
                key={index}
                onClick={() => handleNavClick(index, item.path)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold transition-all duration-200 w-full text-left group relative ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-blue-600 rounded-r-full" />
                )}
                <item.icon
                  size={19}
                  className={isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px] group-hover:stroke-2'}
                />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight size={14} className="opacity-50" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom Widget + Logout */}
        <div className="px-4 pb-6">
          {bottomWidget}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 mt-4 text-gray-400 hover:text-red-500 hover:bg-red-50 w-full rounded-xl transition-all duration-200 group"
          >
            <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="text-[13px] font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 z-50 px-4 py-2.5 flex justify-around items-center shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        {navItems.slice(0, 5).map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavClick(index, item.path)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 min-w-[52px] ${
              activeNav === index
                ? 'text-blue-600'
                : 'text-gray-400'
            }`}
          >
            <div className={`p-1.5 rounded-lg transition-all ${
              activeNav === index ? 'bg-blue-50' : ''
            }`}>
              <item.icon
                size={20}
                className={activeNav === index ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}
              />
            </div>
            <span className={`text-[9px] font-semibold ${activeNav === index ? 'text-blue-600' : 'text-gray-400'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white flex flex-col shadow-2xl">
            <div className="h-20 flex items-center justify-between px-6 border-b border-gray-50">
              <div className="flex items-center">
                <div className={`h-10 w-10 bg-gradient-to-br ${roleColor} rounded-xl flex items-center justify-center mr-3`}>
                  <GraduationCap className="text-white h-5 w-5" />
                </div>
                <span className="text-lg font-bold text-gray-900 tracking-tight">R Academy</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-5 space-y-0.5">
              {navItems.map((item, index) => {
                const isActive = activeNav === index;
                return (
                  <button
                    key={index}
                    onClick={() => handleNavClick(index, item.path)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 w-full text-left ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon size={20} className={isActive ? 'stroke-[2.5px]' : 'stroke-2'} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <div className="px-4 pb-6">
              {bottomWidget}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 mt-4 text-gray-400 hover:text-red-500 hover:bg-red-50 w-full rounded-xl transition-all"
              >
                <LogOut size={18} />
                <span className="text-[13px] font-semibold">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-[260px] pb-28 lg:pb-8">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-[#F0F4F8]/80 backdrop-blur-xl border-b border-gray-100/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 py-4 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={20} className="text-gray-700" />
              </button>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
                  {greeting}
                </h1>
                {subtitle && (
                  <p className="text-gray-400 mt-0.5 text-[13px] font-medium">{subtitle}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden xl:block">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
                />
              </div>

              <button className="relative p-2.5 bg-white rounded-xl border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-all group">
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 border-2 border-[#F0F4F8] rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2.5 bg-white p-1.5 pr-4 rounded-xl border border-gray-200 hover:border-blue-200 transition-all cursor-pointer group">
                <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${roleColor} flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform shadow-sm`}>
                  {userInitial}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-semibold text-gray-900 leading-none">{user?.name || 'User'}</p>
                  <p className="text-[10px] font-medium text-gray-400 mt-0.5 capitalize">{user?.role || 'Member'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
