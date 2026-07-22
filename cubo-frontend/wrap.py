import glob
import os

for f in glob.glob('src/*.jsx'):
    if f.endswith('App.jsx') or f.endswith('main.jsx'):
        continue
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    comp_name = os.path.basename(f)[:-4]
    new_content = f"export default function {comp_name}() {{\n  return (\n{content}  );\n}}\n"
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(new_content)
