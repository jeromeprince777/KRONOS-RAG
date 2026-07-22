import re

with open('src/DocumentManager.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the upload form data key ('files' -> 'file') and handle only first file for now since endpoint is singular
upload_pattern = r"const formData = new FormData\(\);\n    for \(let i=0; i<files\.length; i\+\+\) \{\n      formData\.append\('files', files\[i\]\);\n    \}"
upload_replacement = """const formData = new FormData();
    formData.append('file', files[0]);"""
content = re.sub(upload_pattern, upload_replacement, content)

# Add state and useEffect for documents list
import_pattern = "import { useState } from 'react';"
import_replacement = "import { useState, useEffect } from 'react';"
content = content.replace(import_pattern, import_replacement)

state_pattern = "const [isUploading, setIsUploading] = useState(false);"
state_replacement = """const [isUploading, setIsUploading] = useState(false);
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/documents');
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);"""
content = content.replace(state_pattern, state_replacement)

# Ensure the upload refreshes the list
onload_pattern = """      xhr.onload = () => {
        if (xhr.status === 200) {
          alert('Upload complete');
        }
        setIsUploading(false);
      };"""
onload_replacement = """      xhr.onload = () => {
        if (xhr.status === 200) {
          alert('Upload complete');
          fetchDocuments();
        } else {
          alert('Upload failed: ' + xhr.responseText);
        }
        setIsUploading(false);
      };"""
content = content.replace(onload_pattern, onload_replacement)

# Replace the fake table data with dynamic rendering
table_start = content.find('<tbody>')
table_end = content.find('</tbody>')

if table_start != -1 and table_end != -1:
    dynamic_table = """<tbody>
              {documents.length === 0 && <tr><td colSpan="5" className="p-4 text-center text-text-secondary">No documents uploaded yet.</td></tr>}
              {documents.map((doc, idx) => (
              <tr key={idx} className="border-b border-border/50 hover:bg-surface-container-lowest transition-colors">
                <td className="p-4 w-12"><input className="rounded border-border text-primary focus:ring-primary" type="checkbox" /></td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-text-secondary">description</span>
                    <span className="font-label-md text-label-md text-text-primary font-medium">{doc.doc_id}</span>
                  </div>
                </td>
                <td className="p-4 text-text-secondary font-body-md text-body-md">DOCUMENT</td>
                <td className="p-4 text-text-secondary font-body-md text-body-md">{doc.chunks} chunks</td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5 text-secondary bg-secondary-container/30 px-2.5 py-1 rounded-full w-fit">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span className="font-label-sm text-label-sm font-bold">Complete</span>
                  </div>
                </td>
              </tr>
              ))}
            """
    content = content[:table_start] + dynamic_table + content[table_end:]

with open('src/DocumentManager.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
