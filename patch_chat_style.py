import re

with open("cubo-frontend/src/SearchDashboard.jsx", "r", encoding="utf-8") as f:
    search_jsx = f.read()

# Replace the chat history rendering with a more modern, iOS-style chat layout
old_chat_history = """          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3">
            {aiAnswer && chatHistory.length === 0 && (
              <div className="bg-surface border border-border p-3 rounded-lg">
                <p className="text-text-primary text-sm whitespace-pre-wrap">{aiAnswer}</p>
              </div>
            )}
            
            {chatHistory.map((msg, i) => (
              <div key={i} className={`p-3 rounded-lg max-w-[90%] ${msg.role === 'user' ? 'bg-primary text-white self-end' : 'bg-surface border border-border self-start'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))}

            {isSearching && (
              <div className="text-primary text-sm flex items-center gap-2 self-start bg-surface border border-border p-3 rounded-lg">
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                Analyzing...
              </div>
            )}
            
            {!aiAnswer && !isSearching && chatHistory.length === 0 && (
              <div className="text-text-secondary text-sm text-center mt-10 w-full">
                Search for something to start the conversation!
              </div>
            )}
          </div>"""

new_chat_history = """          <div className="flex-grow p-5 overflow-y-auto flex flex-col gap-4 bg-background">
            {aiAnswer && chatHistory.length === 0 && (
              <div className="flex flex-col gap-1 max-w-[85%] self-start">
                <span className="text-xs text-text-secondary ml-1 font-bold">CUBO AI</span>
                <div className="bg-surface border border-border p-4 rounded-2xl rounded-tl-sm shadow-sm">
                  <p className="text-text-primary text-sm whitespace-pre-wrap leading-relaxed">{aiAnswer}</p>
                </div>
              </div>
            )}
            
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex flex-col gap-1 max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
                <span className="text-xs text-text-secondary mx-1 font-bold">{msg.role === 'user' ? 'You' : 'CUBO AI'}</span>
                <div className={`p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-sm' : 'bg-surface border border-border text-text-primary rounded-tl-sm'}`}>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}

            {isSearching && (
              <div className="flex flex-col gap-1 max-w-[85%] self-start">
                <span className="text-xs text-text-secondary ml-1 font-bold">CUBO AI</span>
                <div className="bg-surface border border-border p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-3 text-primary">
                  <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                  <span className="text-sm font-bold">Analyzing...</span>
                </div>
              </div>
            )}
            
            {!aiAnswer && !isSearching && chatHistory.length === 0 && (
              <div className="flex flex-col items-center justify-center mt-12 text-text-secondary opacity-70">
                <span className="material-symbols-outlined text-4xl mb-3">forum</span>
                <p className="text-sm">Start a conversation with CUBO AI</p>
              </div>
            )}
          </div>"""

search_jsx = search_jsx.replace(old_chat_history, new_chat_history)

# Make the chat sidebar container prettier
old_sidebar_header = """        <div className="bg-primary-container/20 border border-primary/20 rounded-xl flex flex-col h-[600px] sticky top-24">
          <div className="p-4 border-b border-primary/20 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            <h2 className="font-title-lg text-title-lg font-bold text-primary">AI Chat</h2>
          </div>"""
          
new_sidebar_header = """        <div className="bg-card border border-border shadow-md rounded-2xl flex flex-col h-[650px] sticky top-24 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-primary to-primary-fixed text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <span className="material-symbols-outlined text-white text-sm">auto_awesome</span>
            </div>
            <div>
              <h2 className="font-title-md text-title-md font-bold leading-none">CUBO Intelligence</h2>
              <span className="text-xs text-white/80">Online & Ready</span>
            </div>
          </div>"""

search_jsx = search_jsx.replace(old_sidebar_header, new_sidebar_header)

old_chat_input = """          <div className="p-3 border-t border-primary/20 bg-surface rounded-b-xl flex items-center gap-2">
            <input 
              type="text" 
              className="flex-grow bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary" 
              placeholder="Ask a follow-up question..." """

new_chat_input = """          <div className="p-4 border-t border-border bg-surface flex items-center gap-3">
            <div className="flex-grow relative">
              <input 
                type="text" 
                className="w-full bg-background border border-border rounded-full pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner transition-all" 
                placeholder="Ask a follow-up question..." """

search_jsx = search_jsx.replace(old_chat_input, new_chat_input)

old_chat_button = """            <button 
              className="bg-primary text-white p-2 rounded hover:bg-primary-dark transition-colors flex items-center justify-center"
              onClick={() => {"""

new_chat_button = """            </div>
            <button 
              className="bg-primary text-white p-3 rounded-full hover:bg-primary-fixed hover:text-primary transition-all flex items-center justify-center shadow-md active:scale-95"
              onClick={() => {"""

search_jsx = search_jsx.replace(old_chat_button, new_chat_button)

with open("cubo-frontend/src/SearchDashboard.jsx", "w", encoding="utf-8") as f:
    f.write(search_jsx)
