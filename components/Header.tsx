import React, { useState } from 'react';
import { View } from '../types';

interface HeaderProps {
  setActiveView: (view: View) => void;
  activeView: View;
  onLogout: () => void;
}

const NavLink: React.FC<{
    view: View;
    activeView: View;
    onClick: (view: View) => void;
    children: React.ReactNode;
    isMobile?: boolean;
}> = ({ view, activeView, onClick, children, isMobile }) => {
    const isActive = activeView === view;
    const baseClasses = "font-medium rounded-md transition-colors duration-200";
    const mobileClasses = isMobile ? "block w-full text-left px-3 py-2 text-base" : "px-3 py-2 text-sm";
    const activeClasses = isActive ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";

    return (
        <button
            onClick={() => onClick(view)}
            className={`${baseClasses} ${mobileClasses} ${activeClasses}`}
            aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </button>
    );
};


const Header: React.FC<HeaderProps> = ({ setActiveView, activeView, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { view: View.HOME, label: 'Home' },
    { view: View.SKILL_GAP, label: 'Skill Analysis' },
    { view: View.RESUME, label: 'Resume Review' },
    { view: View.INTERVIEW, label: 'Interview Prep' },
    { view: View.TRENDS, label: 'Market Trends' },
    { view: View.CONTACT, label: 'Contact' },
  ];

  const handleNavLinkClick = (view: View) => {
      setActiveView(view);
      setIsMenuOpen(false); // Close menu on navigation
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <button onClick={() => handleNavLinkClick(View.HOME)} className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009.828 16.5l-3.22 3.22a1 1 0 001.414 1.414l3.22-3.22a1 1 0 001.414 0l3.22 3.22a1 1 0 001.414-1.414l-3.22-3.22a1 1 0 00.263-1.031l5 1.428a1 1 0 001.17-1.409l-7-14z" />
                </svg>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">AI Career Advisor</h1>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
                <NavLink key={item.view} view={item.view} activeView={activeView} onClick={setActiveView}>
                    {item.label}
                </NavLink>
            ))}
            <NavLink view={View.PROFILE} activeView={activeView} onClick={setActiveView}>
              My Profile
            </NavLink>
             <button
                onClick={onLogout}
                className="ml-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md transition-colors duration-200"
            >
                Logout
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                 <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {navItems.map(item => (
                <NavLink key={item.view} view={item.view} activeView={activeView} onClick={handleNavLinkClick} isMobile>
                    {item.label}
                </NavLink>
            ))}
            <NavLink view={View.PROFILE} activeView={activeView} onClick={handleNavLinkClick} isMobile>
              My Profile
            </NavLink>
             <button
                onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md transition-colors duration-200"
            >
                Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;