import re

with open("src/DocumentManager.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Remove the inner nav bar
content = re.sub(r'<nav className="bg-surface.*?</nav>', '', content, flags=re.DOTALL)

# Let's ensure the old_title was replaced properly, as my previous regex might have missed it if it changed.
old_title = """    <header className="mb-10">
      <h1 className="font-headline-lg text-headline-lg text-text-primary mb-2">Document Manager</h1>
      <p className="text-text-secondary font-body-lg text-body-lg">Manage your document corpus and monitor indexing status in real-time.</p>
    </header>"""

new_title = """    <div className="mb-10 text-center">
      <h1 className="text-3xl font-bold text-primary mb-2">Document Manager</h1>
      <p className="text-text-secondary text-lg">Manage your document corpus and monitor indexing status in real-time.</p>
    </div>"""

content = content.replace(old_title, new_title)

with open("src/DocumentManager.jsx", "w", encoding="utf-8") as f:
    f.write(content)
