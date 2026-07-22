import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function TopNavBar() {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return isActive
      ? "text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed pb-1 font-body-md text-body-md"
      : "hover:text-primary transition-colors cursor-pointer font-body-md text-body-md";
  };

  return (
    <header className="bg-surface dark:bg-inverse-surface border-b border-border dark:border-outline-variant shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center px-margin-page h-16 w-full max-w-container-max mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed tracking-wider">KRONOS</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-text-secondary">
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/search" className={getLinkClass('/search')}>Search</Link>
            <Link to="/documents" className={getLinkClass('/documents')}>Documents</Link>
            <Link to="/analysis" className={getLinkClass('/analysis')}>Analysis</Link>
            <Link to="/reports" className={getLinkClass('/reports')}>Reports</Link>
            <Link to="/history" className={getLinkClass('/history')}>History</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/settings" className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </Link>
          <div className="h-8 w-8 rounded-full bg-primary-fixed-dim border border-border overflow-hidden cursor-pointer">
            <span className="material-symbols-outlined mt-1 text-center w-full">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
