import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import Home from './Home';
import SearchDashboard from './SearchDashboard';
import DocumentManager from './DocumentManager';
import SettingsConfig from './SettingsConfig';
import ComplianceReport from './ComplianceReport';

// Minimal placeholder for routes that are not yet built
const Placeholder = ({ title, desc, icon }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12">
    <span className="material-symbols-outlined text-6xl text-primary mb-6 opacity-80">{icon || 'construction'}</span>
    <h1 className="text-3xl font-bold text-primary mb-3">{title}</h1>
    <p className="text-text-secondary max-w-md text-lg leading-relaxed">{desc}</p>
    <div className="mt-8 px-6 py-3 bg-surface border border-border rounded-xl text-caption text-text-secondary">
      Coming soon in v1.0
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-text-primary flex flex-col">
        <TopNavBar />
        <div className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchDashboard />} />
            <Route path="/documents" element={<DocumentManager />} />
            <Route path="/settings" element={<SettingsConfig />} />
            <Route path="/compliance" element={<ComplianceReport />} />
            <Route
              path="/analysis"
              element={
                <Placeholder
                  title="Analysis Dashboard"
                  desc="Analyze query volume trends, top search terms, and retrieval latency metrics across your document corpus."
                  icon="analytics"
                />
              }
            />
            <Route
              path="/reports"
              element={
                <Placeholder
                  title="Scheduled Reports"
                  desc="Generate and schedule custom intelligence reports from your document index. Export as PDF or CSV."
                  icon="summarize"
                />
              }
            />
            <Route
              path="/history"
              element={
                <Placeholder
                  title="Search History"
                  desc="Review your past queries, AI-generated answers, and retrieved document sources with full timestamps."
                  icon="history"
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
