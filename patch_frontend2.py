import re

# 1. Fix Background color in index.html
with open("cubo-frontend/index.html", "r", encoding="utf-8") as f:
    index_html = f.read()

index_html = index_html.replace('<body>', '<body class="bg-background">')
with open("cubo-frontend/index.html", "w", encoding="utf-8") as f:
    f.write(index_html)


# 2. Fix Chat UI in SearchDashboard.jsx
with open("cubo-frontend/src/SearchDashboard.jsx", "r", encoding="utf-8") as f:
    search_jsx = f.read()

# Add states for chat
if "const [chatInput, setChatInput]" not in search_jsx:
    search_jsx = search_jsx.replace(
        "const [aiAnswer, setAiAnswer] = useState('');",
        "const [aiAnswer, setAiAnswer] = useState('');\n  const [chatInput, setChatInput] = useState('');\n  const [chatHistory, setChatHistory] = useState([]);"
    )

    # Replace the chat UI in SearchDashboard.jsx
    old_chat_input = """          <div className="p-3 border-t border-primary/20 bg-surface rounded-b-xl flex gap-2">
            <input type="text" className="flex-grow bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary" placeholder="Ask a follow-up question..." />
            <button className="bg-primary text-white p-2 rounded hover:bg-primary-dark transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>"""
          
    new_chat_input = """          <div className="p-3 border-t border-primary/20 bg-surface rounded-b-xl flex gap-2">
            <input 
              type="text" 
              className="flex-grow bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary" 
              placeholder="Ask a follow-up question..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const query = chatInput;
                  setChatHistory(prev => [...prev, {role: 'user', content: query}]);
                  setChatInput('');
                  setIsSearching(true);
                  fetch('http://localhost:8000/api/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: query, top_k: 3 })
                  }).then(res => res.json()).then(data => {
                    setChatHistory(prev => [...prev, {role: 'ai', content: data.generated_answer || 'No answer generated.'}]);
                    setIsSearching(false);
                  });
                }
              }}
            />
            <button 
              className="bg-primary text-white p-2 rounded hover:bg-primary-dark transition-colors flex items-center justify-center"
              onClick={() => {
                if (!chatInput.trim()) return;
                const query = chatInput;
                setChatHistory(prev => [...prev, {role: 'user', content: query}]);
                setChatInput('');
                setIsSearching(true);
                fetch('http://localhost:8000/api/search', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ query: query, top_k: 3 })
                }).then(res => res.json()).then(data => {
                  setChatHistory(prev => [...prev, {role: 'ai', content: data.generated_answer || 'No answer generated.'}]);
                  setIsSearching(false);
                });
              }}
            >
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>"""
          
    search_jsx = search_jsx.replace(old_chat_input, new_chat_input)

    # Replace the chat history rendering
    old_chat_history = """          <div className="flex-grow p-4 overflow-y-auto">
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
          </div>"""
          
    new_chat_history = """          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3">
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
          
    search_jsx = search_jsx.replace(old_chat_history, new_chat_history)
    
    with open("cubo-frontend/src/SearchDashboard.jsx", "w", encoding="utf-8") as f:
        f.write(search_jsx)

print("Patch applied")
