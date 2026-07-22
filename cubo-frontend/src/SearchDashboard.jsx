import { useState, useEffect, useRef, useCallback } from 'react';

const API_BASE = '';  // Vite proxy handles /api/* → localhost:8000

export default function SearchDashboard() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [aiAnswer, setAiAnswer] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const chatEndRef = useRef(null);

  const handleSearch = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setResults([]);
      setAiAnswer('');
      setError('');
      return;
    }
    setIsSearching(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery, top_k: 5 }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setResults(data.results || []);
      setAiAnswer(data.generated_answer || 'No AI answer generated.');
    } catch (err) {
      setError('Could not connect to the KRONOS backend. Is the server running on port 8000?');
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search — only fires after 600ms pause AND query length > 2
  useEffect(() => {
    if (!query || query.trim().length < 2) return;
    const timer = setTimeout(() => handleSearch(query), 600);
    return () => clearTimeout(timer);
  }, [query, handleSearch]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isSearching]);

  const sendChatMessage = async (messageText) => {
    if (!messageText.trim()) return;
    setChatHistory(prev => [...prev, { role: 'user', content: messageText }]);
    setChatInput('');
    setIsSearching(true);
    try {
      const res = await fetch(`${API_BASE}/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: messageText, top_k: 5 }),
      });
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
      }
      setChatHistory(prev => [...prev, {
        role: 'ai',
        content: data.generated_answer || 'No answer generated.',
        results: data.results || []
      }]);
    } catch {
      setChatHistory(prev => [...prev, {
        role: 'ai',
        content: '⚠️ Backend unavailable. Please ensure the CUBO server is running.',
      }]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCopyAnswer = () => {
    const textToCopy = aiAnswer || chatHistory.filter(m => m.role === 'ai').map(m => m.content).join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getSortedResults = () => {
    if (sortBy === 'relevance') {
      return [...results].sort((a, b) => b.relevance_score - a.relevance_score);
    }
    return results;
  };

  return (
    <div>
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-page py-12">
        {/* Hero Search Section */}
        <section className="max-w-3xl mx-auto mb-16 text-center">
          <h1 className="font-headline-lg text-headline-lg mb-6 text-text-primary">
            Discover your intelligence
          </h1>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-primary transition-colors">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="w-full h-[56px] pl-12 pr-32 bg-card border-2 border-border rounded-lg focus:ring-0 focus:border-primary transition-all shadow-sm font-body-lg text-body-lg"
              placeholder="Search documents, ask questions..."
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch(query)}
            />
            <div className="absolute inset-y-1.5 right-1.5">
              <button
                className="h-full px-6 bg-primary-container text-on-primary-container rounded-lg font-label-md text-label-md hover:bg-primary hover:text-white transition-colors active:scale-95"
                onClick={() => handleSearch(query)}
              >
                Search
              </button>
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-4 flex justify-center gap-6 text-caption font-caption text-text-secondary">
            <button
              className="hover:text-primary transition-colors flex items-center gap-1"
              onClick={() => setShowFilters(f => !f)}
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              Advanced Search
            </button>
            <button
              className="hover:text-primary transition-colors flex items-center gap-1"
              onClick={() => setShowFilters(f => !f)}
            >
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              Filters
            </button>
            <button
              className="hover:text-primary transition-colors flex items-center gap-1"
              onClick={() => { setQuery(''); setResults([]); setAiAnswer(''); setChatHistory([]); }}
            >
              <span className="material-symbols-outlined text-[16px]">history</span>
              Clear
            </button>
          </div>

          {/* Filter bar */}
          {showFilters && (
            <div className="mt-4 p-4 bg-card border border-border rounded-lg text-left flex flex-wrap gap-4 items-center shadow-sm">
              <div className="flex items-center gap-2">
                <label className="text-caption font-label-md text-text-secondary">Sort by:</label>
                <select
                  className="bg-background border border-border rounded px-2 py-1 text-sm"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="default">Default</option>
                </select>
              </div>
            </div>
          )}
        </section>

        {/* Error Banner */}
        {error && (
          <div className="max-w-3xl mx-auto mb-6 p-4 bg-error-container/20 border border-error rounded-lg flex items-center gap-3 text-on-error-container">
            <span className="material-symbols-outlined text-error">error</span>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-3xl mx-auto">
          {[
            "Summarize the IEEE paper findings",
            "What are the core operational frameworks?",
            "Key takeaways from Literature Survey",
            "Compare vector vs BM25 retrieval"
          ].map((promptText, pIdx) => (
            <button
              key={pIdx}
              onClick={() => {
                setQuery(promptText);
                handleSearch(promptText);
              }}
              className="text-xs bg-surface-container hover:bg-primary-container hover:text-white px-3 py-1.5 rounded-full border border-border transition-all shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              {promptText}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Search Results */}
          <div className="lg:w-[65%] space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-caption font-caption text-text-secondary uppercase tracking-wider">
                {isSearching ? 'Searching...' : `Top Results (${results.length} found)`}
              </p>
              <div className="flex gap-2">
                <button className="p-1.5 hover:bg-surface-container rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-[20px]">sort</span>
                </button>
                <button className="p-1.5 hover:bg-surface-container rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-[20px]">view_list</span>
                </button>
              </div>
            </div>

            {/* Loading skeletons */}
            {isSearching && results.length === 0 && (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-card border border-border p-4 rounded-lg h-28">
                    <div className="h-4 bg-surface-container-high rounded w-3/4 mb-3" />
                    <div className="h-3 bg-surface-container-high rounded w-full mb-2" />
                    <div className="h-3 bg-surface-container-high rounded w-5/6" />
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!isSearching && query.length >= 2 && results.length === 0 && !error && (
              <div className="text-center py-16 text-text-secondary">
                <span className="material-symbols-outlined text-5xl mb-4 block">search_off</span>
                <p className="text-lg font-semibold mb-1">No results found</p>
                <p className="text-sm">Try a different search term, or upload more documents.</p>
              </div>
            )}

            {/* Result cards */}
            {getSortedResults().map((result, idx) => {
              const scorePct = ((result.relevance_score || 0) * 100).toFixed(1);
              const scoreColor = scorePct >= 80 ? 'bg-emerald-500/15 text-emerald-700 border-emerald-300' :
                                 scorePct >= 60 ? 'bg-blue-500/15 text-blue-700 border-blue-300' :
                                 'bg-amber-500/15 text-amber-700 border-amber-300';
              return (
                <div
                  key={idx}
                  className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-all result-card-hover group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-sm text-headline-sm text-primary group-hover:underline truncate max-w-[70%]" title={result.doc_id}>
                      {result.doc_id}
                    </h3>
                    <span className={`px-2.5 py-1 border rounded-md text-caption font-bold whitespace-nowrap ${scoreColor}`}>
                      {scorePct}% Match
                    </span>
                  </div>

                  {/* Matched Line Highlight */}
                  {result.matched_line && (
                    <div className="mb-3 p-2.5 bg-primary-fixed-dim/15 border-l-4 border-primary rounded-r-md text-xs text-text-primary font-medium">
                      <span className="font-bold text-primary mr-1.5">📍 Matched Passage:</span>
                      <span className="italic">"{result.matched_line}"</span>
                    </div>
                  )}

                  <p className="text-text-secondary font-body-md text-body-md line-clamp-3 mb-4">
                    {result.text}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center gap-3 text-caption font-caption text-text-secondary">
                      <span className="material-symbols-outlined text-[16px]">description</span>
                      <span className="font-bold text-text-primary">Chunk #{result.chunk_id}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-2.5 py-1 text-xs bg-surface-container hover:bg-primary hover:text-white rounded transition-colors flex items-center gap-1 font-medium"
                        title="Copy text"
                        onClick={() => navigator.clipboard.writeText(result.text)}
                      >
                        <span className="material-symbols-outlined text-[14px]">content_copy</span>
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: AI Chat Panel */}
          <aside className="lg:w-[35%]">
            <div className="bg-card border border-border shadow-md rounded-2xl flex flex-col h-[650px] sticky top-24 overflow-hidden">
              {/* Chat Header */}
              <div className="p-4 bg-gradient-to-r from-primary to-primary-fixed text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <span className="material-symbols-outlined text-white text-sm">auto_awesome</span>
                  </div>
                  <div>
                    <h2 className="font-bold leading-none text-sm">KRONOS Intelligence</h2>
                    <span className="text-xs text-white/80">
                      {isSearching ? '● Analyzing...' : '● Online & Ready'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCopyAnswer}
                  className="p-1.5 hover:bg-white/20 rounded transition-colors"
                  title="Copy answer"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>

              {/* Messages area */}
              <div className="flex-grow p-5 overflow-y-auto custom-scrollbar flex flex-col gap-4 bg-background">
                {/* Initial AI answer from search */}
                {aiAnswer && chatHistory.length === 0 && (
                  <div className="flex flex-col gap-1 max-w-[90%] self-start">
                    <span className="text-xs text-text-secondary ml-1 font-bold">CUBO AI</span>
                    <div className="bg-surface border border-border p-4 rounded-2xl rounded-tl-sm shadow-sm">
                      <p className="text-text-primary text-sm whitespace-pre-wrap leading-relaxed">{aiAnswer}</p>
                    </div>
                  </div>
                )}

                {/* Chat history */}
                {chatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col gap-1 max-w-[90%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                  >
                    <span className="text-xs text-text-secondary mx-1 font-bold">
                      {msg.role === 'user' ? 'You' : 'CUBO AI'}
                    </span>
                    <div
                      className={`p-4 rounded-2xl shadow-sm text-sm whitespace-pre-wrap leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-primary text-white rounded-tr-sm'
                          : 'bg-surface border border-border text-text-primary rounded-tl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {/* Loading bubble */}
                {isSearching && (
                  <div className="flex flex-col gap-1 max-w-[85%] self-start">
                    <span className="text-xs text-text-secondary ml-1 font-bold">CUBO AI</span>
                    <div className="bg-surface border border-border p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-3 text-primary">
                      <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                      <span className="text-sm font-bold">Analyzing documents...</span>
                    </div>
                  </div>
                )}

                {/* Empty state */}
                {!aiAnswer && !isSearching && chatHistory.length === 0 && (
                  <div className="flex flex-col items-center justify-center mt-12 text-text-secondary opacity-70">
                    <span className="material-symbols-outlined text-4xl mb-3">forum</span>
                    <p className="text-sm text-center">Search for something or start a conversation with CUBO AI</p>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Chat input */}
              <div className="p-4 border-t border-border bg-surface flex items-center gap-3">
                <div className="flex-grow relative">
                  <input
                    type="text"
                    className="w-full bg-background border border-border rounded-full pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner transition-all"
                    placeholder="Ask a follow-up question..."
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') sendChatMessage(chatInput); }}
                    disabled={isSearching}
                  />
                </div>
                <button
                  className="bg-primary text-white p-3 rounded-full hover:opacity-90 transition-all flex items-center justify-center shadow-md active:scale-95 disabled:opacity-50"
                  onClick={() => sendChatMessage(chatInput)}
                  disabled={isSearching || !chatInput.trim()}
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border">
        <div className="border-b border-border py-4">
          <div className="max-w-container-max mx-auto px-margin-page flex flex-wrap gap-8 justify-center items-center text-caption font-caption text-text-secondary">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span>{results.length > 0 ? `${results.length} results indexed` : 'Documents Indexed'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">speed</span>
              <span>BM25 + FAISS Hybrid</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span>100% Local • GDPR Ready</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center py-8 px-margin-page w-full max-w-container-max mx-auto">
          <div className="mb-4 md:mb-0">
            <span className="font-label-md text-label-md font-black text-text-primary uppercase tracking-tighter">KRONOS</span>
            <p className="text-caption font-caption text-text-secondary mt-1">© 2026 KRONOS Document Intelligence. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-caption font-caption text-text-secondary hover:text-primary transition-opacity opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
            <a className="text-caption font-caption text-text-secondary hover:text-primary transition-opacity opacity-80 hover:opacity-100" href="#">Terms of Service</a>
            <a className="text-caption font-caption text-text-secondary hover:text-primary transition-opacity opacity-80 hover:opacity-100" href="#">System Status</a>
            <a className="text-caption font-caption text-text-secondary hover:text-primary transition-opacity opacity-80 hover:opacity-100" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
