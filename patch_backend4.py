import re

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "r", encoding="utf-8") as f:
    content = f.read()

new_endpoint = '''@app.get("/api/documents")
async def list_documents():
    """List all unique documents from chunks database"""
    db_path = config.DATA_DIR / "chunks_metadata.db"
    if not db_path.exists():
        return {"documents": []}
        
    import sqlite3
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT DISTINCT doc_id, MAX(timestamp), COUNT(*) FROM chunks GROUP BY doc_id")
        rows = cursor.fetchall()
        docs = [{"doc_id": row[0], "timestamp": row[1], "chunks": row[2]} for row in rows]
    except Exception as e:
        docs = []
    finally:
        conn.close()
    return {"documents": docs}

@app.get("/api/health")'''

content = content.replace('@app.get("/api/health")', new_endpoint)

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "w", encoding="utf-8") as f:
    f.write(content)
