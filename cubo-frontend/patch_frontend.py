import os

# 1. Create TopNavBar.jsx
top_nav = """import React from 'react';
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
            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">CUBO</span>
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
"""

with open('src/TopNavBar.jsx', 'w') as f:
    f.write(top_nav)

# 2. Create Home.jsx
home_jsx = """import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-5xl font-bold text-primary mb-4">Welcome to CUBO</h1>
        <p className="text-xl text-text-secondary mb-12 max-w-2xl">
          Secure Local Document Intelligence Platform. Upload, analyze, and search your private data with AI.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          <Link to="/search" className="bg-surface p-8 rounded-xl shadow-sm border border-border hover:border-primary transition-all hover:-translate-y-1 group">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">search</span>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Semantic Search</h2>
            <p className="text-text-secondary">Search across your entire document corpus using hybrid BM25 and FAISS.</p>
          </Link>
          
          <Link to="/documents" className="bg-surface p-8 rounded-xl shadow-sm border border-border hover:border-primary transition-all hover:-translate-y-1 group">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">upload_file</span>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Document Manager</h2>
            <p className="text-text-secondary">Upload PDFs, CSVs, and Word docs for instant local indexing.</p>
          </Link>
          
          <Link to="/analysis" className="bg-surface p-8 rounded-xl shadow-sm border border-border hover:border-primary transition-all hover:-translate-y-1 group">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">analytics</span>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Analytics</h2>
            <p className="text-text-secondary">View trends, usage metrics, and intelligence across your data.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
"""

with open('src/Home.jsx', 'w') as f:
    f.write(home_jsx)

# 3. Update App.jsx
app_jsx = """import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import Home from './Home';
import SearchDashboard from './SearchDashboard';
import DocumentManager from './DocumentManager';
import SettingsConfig from './SettingsConfig';
import ComplianceReport from './ComplianceReport';

// Placeholders for new pages
const Placeholder = ({ title, desc }) => (
  <div className="p-12 text-center">
    <h1 className="text-3xl font-bold text-primary mb-2">{title}</h1>
    <p className="text-text-secondary">{desc}</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-text-primary font-body-md flex flex-col">
        <TopNavBar />
        <div className="flex-grow w-full max-w-container-max mx-auto px-margin-page py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchDashboard />} />
            <Route path="/documents" element={<DocumentManager />} />
            <Route path="/settings" element={<SettingsConfig />} />
            <Route path="/compliance" element={<ComplianceReport />} />
            <Route path="/analysis" element={<Placeholder title="Analysis Dashboard" desc="Analyze trends across your document corpus." />} />
            <Route path="/reports" element={<Placeholder title="Reports" desc="Generate scheduled and custom intelligence reports." />} />
            <Route path="/history" element={<Placeholder title="Search History" desc="Review your past queries and generated answers." />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
"""

with open('src/App.jsx', 'w') as f:
    f.write(app_jsx)
