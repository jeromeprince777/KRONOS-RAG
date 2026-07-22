import re

with open('src/SearchDashboard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Update the Top Results count to be dynamic
top_results_pattern = r'Top Results \(1,248 found\)'
top_results_repl = 'Top Results ({results.length} found)'
content = re.sub(top_results_pattern, top_results_repl, content)

# Find the start of the first result card and the end of the left column
results_start = content.find('{/* Result Card 1 */}')
results_end = content.find('{/* Right Column: AI Answer */}')

if results_start != -1 and results_end != -1:
    # We want to keep the closing </div> of the left column which is just before {/* Right Column...
    left_col_end = content.rfind('</div>', results_start, results_end)
    
    dynamic_results = """
        {isSearching && <p className="text-primary font-bold">Searching...</p>}
        {results.map((result, idx) => (
            <div key={idx} className="bg-card border border-border p-4 rounded-lg shadow-sm result-card-hover group cursor-pointer mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline-sm text-headline-sm text-primary group-hover:underline">{result.doc_id}</h3>
                <span className="px-2 py-1 bg-secondary-container text-on-secondary-container rounded text-caption font-label-md">{(result.relevance_score * 100).toFixed(1)}% Match</span>
              </div>
              <p className="text-text-secondary font-body-md text-body-md line-clamp-2 mb-4">
                {result.text}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-caption font-caption text-text-secondary">
                  <span className="font-bold text-text-primary">Chunk {result.chunk_id}</span>
                </div>
              </div>
            </div>
        ))}
      """
    
    content = content[:results_start] + dynamic_results + content[left_col_end:]

with open('src/SearchDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
