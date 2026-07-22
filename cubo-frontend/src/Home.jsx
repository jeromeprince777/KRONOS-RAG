import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-5xl font-bold text-primary mb-4 tracking-tight">Welcome to KRONOS</h1>
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
