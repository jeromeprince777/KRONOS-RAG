import re

with open("src/DocumentManager.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Remove the internal header
content = re.sub(r'<header className="bg-surface.*?</header>', '', content, flags=re.DOTALL)

# Add description
old_title = """      <h1 className="font-headline-lg text-headline-lg mb-6 text-text-primary text-center">Document Manager</h1>"""
new_title = """      <div className="mb-8 text-center">
        <h1 className="font-headline-lg text-headline-lg mb-2 text-text-primary">Document Manager</h1>
        <p className="text-text-secondary text-lg">Upload PDFs, CSVs, and Word docs for instant local indexing.</p>
      </div>"""

content = content.replace(old_title, new_title)

with open("src/DocumentManager.jsx", "w", encoding="utf-8") as f:
    f.write(content)
