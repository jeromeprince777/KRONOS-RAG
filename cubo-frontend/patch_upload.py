import re

with open('src/DocumentManager.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the "Upload Files" button with a label wrapping a hidden file input
button_pattern = r'<button className="flex items-center gap-2 bg-primary text-white px-6 py-2\.5 rounded-lg font-label-md text-label-md hover:shadow-lg active:scale-95 transition-all">.*?Upload Files.*?</button>'

replacement = """<label className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-label-md text-label-md hover:shadow-lg active:scale-95 transition-all cursor-pointer">
            <span className="material-symbols-outlined text-sm">north</span>
            Upload Files
            <input type="file" multiple className="hidden" onChange={handleFileUpload} />
          </label>"""

content = re.sub(button_pattern, replacement, content, flags=re.DOTALL)

with open('src/DocumentManager.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
