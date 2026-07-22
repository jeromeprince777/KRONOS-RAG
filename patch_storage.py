import re
import os

# 1. Update Backend
with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "r", encoding="utf-8") as f:
    backend = f.read()

storage_logic = """    import shutil
    import os
    total, used, free = shutil.disk_usage(config.DATA_DIR)
    
    # Calculate directory size
    dir_size = 0
    if config.DATA_DIR.exists():
        for path, dirs, files in os.walk(config.DATA_DIR):
            for f in files:
                fp = os.path.join(path, f)
                if not os.path.islink(fp):
                    dir_size += os.path.getsize(fp)
                    
    return {"documents": docs, "storage_used": dir_size, "storage_total": 10 * 1024 * 1024 * 1024} # 10 GB limit for demo"""

backend = backend.replace('return {"documents": docs}', storage_logic)
backend = backend.replace('return {"documents": []}', 'return {"documents": [], "storage_used": 0, "storage_total": 10 * 1024 * 1024 * 1024}')

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "w", encoding="utf-8") as f:
    f.write(backend)

# 2. Update Frontend
with open("cubo-frontend/src/DocumentManager.jsx", "r", encoding="utf-8") as f:
    frontend = f.read()

# Add state for storage
if "const [storage, setStorage]" not in frontend:
    frontend = frontend.replace(
        'const [documents, setDocuments] = useState([]);',
        'const [documents, setDocuments] = useState([]);\n  const [storage, setStorage] = useState({ used: 0, total: 10 * 1024 * 1024 * 1024 });'
    )
    
    frontend = frontend.replace(
        'setDocuments(data.documents || []);',
        'setDocuments(data.documents || []);\n      if (data.storage_total) {\n        setStorage({ used: data.storage_used, total: data.storage_total });\n      }'
    )
    
    old_storage = """        {/* Storage Status */}
        <section className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-label-md text-label-md text-text-primary">Storage Status</h3>
            <span className="text-caption text-secondary font-bold">45% Used</span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden mb-3">
            <div className="h-full bg-secondary transition-all duration-1000" style={{width: '45.2%'}} />
          </div>
          <div className="flex justify-between text-caption text-text-secondary">
            <span>45.2 GB</span>
            <span>100 GB</span>
          </div>
        </section>"""
        
    new_storage = """        {/* Storage Status */}
        <section className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-label-md text-label-md text-text-primary">Storage Status</h3>
            <span className="text-caption text-secondary font-bold">{((storage.used / storage.total) * 100).toFixed(1)}% Used</span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden mb-3">
            <div className="h-full bg-secondary transition-all duration-1000" style={{width: `${(storage.used / storage.total) * 100}%`}} />
          </div>
          <div className="flex justify-between text-caption text-text-secondary">
            <span>{(storage.used / (1024 * 1024)).toFixed(2)} MB</span>
            <span>{(storage.total / (1024 * 1024 * 1024)).toFixed(0)} GB</span>
          </div>
        </section>"""
        
    frontend = frontend.replace(old_storage, new_storage)
    
    with open("cubo-frontend/src/DocumentManager.jsx", "w", encoding="utf-8") as f:
        f.write(frontend)
