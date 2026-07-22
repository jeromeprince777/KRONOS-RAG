import re

with open('src/DocumentManager.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the fake table data with dynamic rendering
pattern = re.compile(r'<tbody className="divide-y divide-border">.*?</tbody>', re.DOTALL)

dynamic_table = """<tbody className="divide-y divide-border">
              {documents.length === 0 && <tr><td colSpan="7" className="p-4 text-center text-text-secondary">No documents uploaded yet.</td></tr>}
              {documents.map((doc, idx) => (
              <tr key={idx} className="hover:bg-surface-container-lowest transition-colors group">
                <td className="p-4 text-center">
                  <input className="rounded border-outline-variant text-primary focus:ring-primary-container" type="checkbox" />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">description</span>
                    <span className="font-label-md text-label-md text-text-primary truncate max-w-[200px]">{doc.doc_id}</span>
                  </div>
                </td>
                <td className="p-4 font-body-md text-body-md text-text-secondary">DOCUMENT</td>
                <td className="p-4 font-body-md text-body-md text-text-secondary">-</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/10 text-secondary font-label-md text-[12px]">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    Complete
                  </span>
                </td>
                <td className="p-4 font-body-md text-body-md text-text-secondary">{doc.chunks}</td>
                <td className="p-4 font-body-md text-body-md text-text-secondary">{doc.timestamp}</td>
              </tr>
              ))}
            </tbody>"""

content = pattern.sub(dynamic_table, content)

with open('src/DocumentManager.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
