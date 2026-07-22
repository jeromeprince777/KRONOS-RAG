import re

with open("src/SearchDashboard.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Remove the internal header
content = re.sub(r'<header className="bg-surface.*?</header>', '', content, flags=re.DOTALL)

# Add search results scrollable container and update AI Analysis to a Chat box
# Replace the Results grid section
old_grid = """      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Results List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-label-lg text-label-lg text-text-secondary uppercase tracking-wider">Top Results ({results.length} found)</h2>
            <div className="flex gap-2">
              <button className="p-1.5 rounded hover:bg-surface-container-low transition-colors text-text-secondary"><span className="material-symbols-outlined text-[20px]">sort</span></button>
              <button className="p-1.5 rounded hover:bg-surface-container-low transition-colors text-text-secondary"><span className="material-symbols-outlined text-[20px]">view_list</span></button>
            </div>
          </div>
          {results.map((res, idx) => (
            <div key={idx} className="result-card-hover bg-card border border-border p-5 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-title-lg text-title-lg font-bold text-primary dark:text-primary-fixed">{res.doc_id}</h3>
                <span className="bg-success-container text-on-success-container px-2 py-1 rounded text-xs font-bold">{(res.score * 100).toFixed(1)}% Match</span>
              </div>
              <p className="text-text-secondary font-body-md text-body-md line-clamp-3 mb-4">{res.text}</p>
              <div className="flex items-center gap-4 text-caption font-caption text-text-secondary">
                <span className="font-bold text-text-primary">Chunk {res.chunk_id}</span>
              </div>
            </div>
          ))}
          {results.length === 0 && !isSearching && (
            <div className="text-center py-12 text-text-secondary">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-50">search_off</span>
              <p className="text-lg">No results found for your query.</p>
            </div>
          )}
        </div>
        {/* AI Analysis Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-primary-container/20 border border-primary/20 rounded-xl p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              <h2 className="font-title-lg text-title-lg font-bold text-primary">AI Analysis</h2>
            </div>
            <div className="prose prose-sm dark:prose-invert">
              <p className="text-text-secondary leading-relaxed">
                {isSearching ? <span className="streaming-cursor">Analyzing documents</span> : aiAnswer}
              </p>
            </div>
          </div>
        </div>
      </div>"""

new_grid = """      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Search Dashboard</h2>
        <p className="text-text-secondary">Search across your entire document corpus and interact with the AI assistant.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Results List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-label-lg text-label-lg text-text-secondary uppercase tracking-wider">Top Results ({results.length} found)</h2>
          </div>
          
          <div className="max-h-[600px] overflow-y-auto pr-2 flex flex-col gap-4 custom-scrollbar">
            {results.map((res, idx) => (
              <div key={idx} className="result-card-hover bg-card border border-border p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-title-lg text-title-lg font-bold text-primary dark:text-primary-fixed">{res.doc_id}</h3>
                  <span className="bg-success-container text-on-success-container px-2 py-1 rounded text-xs font-bold">{(res.score * 100).toFixed(1)}% Match</span>
                </div>
                <p className="text-text-secondary font-body-md text-body-md mb-4">{res.text}</p>
                <div className="flex items-center gap-4 text-caption font-caption text-text-secondary">
                  <span className="font-bold text-text-primary">Chunk {res.chunk_id}</span>
                </div>
              </div>
            ))}
            {results.length === 0 && !isSearching && (
              <div className="text-center py-12 text-text-secondary border border-dashed border-border rounded-xl">
                <span className="material-symbols-outlined text-6xl mb-4 opacity-50">search_off</span>
                <p className="text-lg">No results found for your query.</p>
              </div>
            )}
          </div>
        </div>
        {/* AI Analysis Chat */}
        <div className="lg:col-span-1">
          <div className="bg-primary-container/20 border border-primary/20 rounded-xl flex flex-col h-[600px] sticky top-24">
            <div className="p-4 border-b border-primary/20 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              <h2 className="font-title-lg text-title-lg font-bold text-primary">AI Chat</h2>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
              {aiAnswer && (
                <div className="bg-surface border border-border p-3 rounded-lg mb-4">
                  <p className="text-text-primary text-sm whitespace-pre-wrap">{aiAnswer}</p>
                </div>
              )}
              {isSearching && (
                <div className="text-primary text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                  Analyzing...
                </div>
              )}
            </div>
            <div className="p-3 border-t border-primary/20 bg-surface rounded-b-xl flex gap-2">
              <input type="text" className="flex-grow bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary" placeholder="Ask a follow-up question..." />
              <button className="bg-primary text-white p-2 rounded hover:bg-primary-dark transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>"""

content = content.replace(old_grid, new_grid)

# Ensure custom-scrollbar CSS exists
if 'custom-scrollbar' not in content:
    content = content.replace('</style>', '  .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }\n        </style>')

with open("src/SearchDashboard.jsx", "w", encoding="utf-8") as f:
    f.write(content)
