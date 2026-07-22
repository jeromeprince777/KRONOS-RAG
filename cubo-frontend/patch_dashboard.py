import re

with open('src/SearchDashboard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
content = content.replace(
    'export default function SearchDashboard() {',
    "import { useState, useEffect, useCallback } from 'react';\n\nexport default function SearchDashboard() {\n"
    "  const [query, setQuery] = useState('');\n"
    "  const [results, setResults] = useState([]);\n"
    "  const [isSearching, setIsSearching] = useState(false);\n"
    "  const [aiAnswer, setAiAnswer] = useState('');\n\n"
    "  const handleSearch = async (searchQuery) => {\n"
    "    if (!searchQuery.trim()) {\n"
    "      setResults([]);\n"
    "      setAiAnswer('');\n"
    "      return;\n"
    "    }\n"
    "    setIsSearching(true);\n"
    "    try {\n"
    "      const res = await fetch(`http://localhost:8000/api/search?query=${encodeURIComponent(searchQuery)}&top_k=5`);\n"
    "      const data = await res.json();\n"
    "      setResults(data.results || []);\n"
    "      setAiAnswer(data.answer || 'No AI answer generated.');\n"
    "    } catch (err) {\n"
    "      console.error(err);\n"
    "    } finally {\n"
    "      setIsSearching(false);\n"
    "    }\n"
    "  };\n\n"
    "  useEffect(() => {\n"
    "    const timeoutId = setTimeout(() => handleSearch(query), 500);\n"
    "    return () => clearTimeout(timeoutId);\n"
    "  }, [query]);\n"
)

# Update Input Field
input_pattern = r'<input className="w-full h-\[56px\][^"]*" placeholder="Search documents, ask questions\.\.\." type="text" />'
replacement = '<input className="w-full h-[56px] pl-12 pr-32 bg-card border-2 border-border rounded-lg focus:ring-0 focus:border-primary transition-all shadow-sm font-body-lg text-body-lg" placeholder="Search documents, ask questions..." type="text" value={query} onChange={e => setQuery(e.target.value)} />'
content = re.sub(input_pattern, replacement, content)

# Update Result Cards
# We want to replace the whole Results div containing 3 cards with a dynamic map
results_container_start = content.find('<!-- Result Card 1 -->')
results_container_end = content.find('<!-- Right Column: AI Answer -->')

if results_container_start != -1 and results_container_end != -1:
    results_div = content[results_container_start:results_container_end]
    dynamic_results = """
        {isSearching && <p>Searching...</p>}
        {results.map((result, idx) => (
            <div key={idx} className="bg-card border border-border p-4 rounded-lg shadow-sm result-card-hover group cursor-pointer mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline-sm text-headline-sm text-primary group-hover:underline">{result.document_id}</h3>
                <span className="px-2 py-1 bg-secondary-container text-on-secondary-container rounded text-caption font-label-md">{(result.score * 100).toFixed(1)}% Match</span>
              </div>
              <p className="text-text-secondary font-body-md text-body-md line-clamp-2 mb-4">
                {result.text}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-caption font-caption text-text-secondary">
                  <span className="font-bold text-text-primary">Snippet</span>
                </div>
              </div>
            </div>
        ))}
    """
    content = content[:results_container_start] + dynamic_results + content[results_container_end:]

# Update AI Answer
ai_pattern = r'<span className="streaming-cursor">.*?</span>'
ai_replacement = '<span className="streaming-cursor">{aiAnswer}</span>'
content = re.sub(ai_pattern, ai_replacement, content, flags=re.DOTALL)

with open('src/SearchDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
