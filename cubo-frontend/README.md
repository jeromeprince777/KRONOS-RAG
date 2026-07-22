# 🎨 KRONOS — React 19 Frontend Web App

This directory contains the full responsive user interface for **KRONOS (Air-Gapped Document Intelligence & RAG Platform)**.

## 📁 Directory & Component Structure

```text
cubo-frontend/
├── public/                 <-- Static icons and favicon assets
├── src/
│   ├── assets/             <-- Images and branding assets
│   ├── App.jsx             <-- Core Router & Route Layouts
│   ├── Home.jsx            <-- Home Landing Page
│   ├── SearchDashboard.jsx <-- Hybrid Search, Line Passage Quotes, AI RAG Chat
│   ├── DocumentManager.jsx <-- File Upload Drag & Drop, Progress Bar, Metadata Table
│   ├── SettingsConfig.jsx  <-- Controlled Sliders, RAG Parameters, Live API Persistence
│   ├── ComplianceReport.jsx<-- GDPR Audit Log Metrics & CSV/JSON Exporters
│   ├── TopNavBar.jsx       <-- Navigation Bar with KRONOS Branding
│   ├── index.css           <-- Custom Tailwind Utility Styles & Tokens
│   └── main.jsx            <-- App Entry Point
├── index.html              <-- Main HTML Shell with Fonts & Material Symbols
├── package.json            <-- Node.js Dependencies
└── vite.config.js          <-- Dev Server & Backend API Proxy Configuration
```

## 🚀 Running Locally

```bash
# Install Node dependencies
npm install

# Start development server
npm run dev -- --host 0.0.0.0
```
*App will run on http://localhost:5173*
