import re

with open('src/SearchDashboard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

fetch_pattern = r'const res = await fetch\(`http://localhost:8000/api/search\?query=\$\{encodeURIComponent\(searchQuery\)\}&top_k=5`\);'
fetch_replacement = """const res = await fetch('http://localhost:8000/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery, top_k: 5 })
      });"""

content = re.sub(fetch_pattern, fetch_replacement, content)

# The result mapping needs to bind to generated_answer instead of answer
answer_pattern = r"setAiAnswer\(data\.answer \|\| 'No AI answer generated\.'\);"
answer_replacement = "setAiAnswer(data.generated_answer || 'No AI answer generated.');"

content = re.sub(answer_pattern, answer_replacement, content)

with open('src/SearchDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
