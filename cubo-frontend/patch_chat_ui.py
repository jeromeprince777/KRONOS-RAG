import re

with open("src/SearchDashboard.jsx", "r", encoding="utf-8") as f:
    content = f.read()

old_aside = """      <aside className="lg:w-[30%]">
        <div className="sticky top-24 border-2 border-primary-container bg-card rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <span className="material-symbols-outlined fill-1" data-icon="auto_awesome" data-weight="fill">auto_awesome</span>
            <h2 className="font-headline-sm text-headline-sm">AI Analysis</h2>
          </div>
          <div className="text-text-primary font-body-md text-body-md leading-relaxed min-h-[150px] mb-6" id="ai-answer">
            <span className="streaming-cursor">{aiAnswer}</span>
          </div>
          <div className="pt-4 border-t border-border flex items-center justify-between">
            <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-surface-container-low rounded-lg transition-colors text-text-secondary font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px]" data-icon="content_copy">content_copy</span> Copy
            </button>
            <div className="flex items-center gap-1">
              <span className="text-caption font-caption text-text-secondary mr-2">Helpful?</span>
              <button className="p-1.5 hover:bg-surface-container-low rounded-lg transition-colors text-text-secondary hover:text-secondary">
                <span className="material-symbols-outlined text-[20px]" data-icon="thumb_up">thumb_up</span>
              </button>
              <button className="p-1.5 hover:bg-surface-container-low rounded-lg transition-colors text-text-secondary hover:text-danger">
                <span className="material-symbols-outlined text-[20px]" data-icon="thumb_down">thumb_down</span>
              </button>
            </div>
          </div>
        </div>
      </aside>"""

new_chat = """      <aside className="lg:w-[30%]">
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
            {isSearching && !aiAnswer && (
              <div className="text-primary text-sm flex items-center gap-2">
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                Analyzing...
              </div>
            )}
            {!aiAnswer && !isSearching && (
              <div className="text-text-secondary text-sm text-center mt-10">
                Search for something to start the conversation!
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
      </aside>"""

content = content.replace(old_aside, new_chat)

with open("src/SearchDashboard.jsx", "w", encoding="utf-8") as f:
    f.write(content)
