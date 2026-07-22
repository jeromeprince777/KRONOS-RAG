import re

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "r", encoding="utf-8") as f:
    content = f.read()

# Fix nprobe attribute error
content = content.replace(
    'self.index_engine.faiss_index.nprobe = self.config.FAISS_NPROBE',
    'if hasattr(self.index_engine.faiss_index, "nprobe"):\n            self.index_engine.faiss_index.nprobe = self.config.FAISS_NPROBE'
)

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "w", encoding="utf-8") as f:
    f.write(content)
