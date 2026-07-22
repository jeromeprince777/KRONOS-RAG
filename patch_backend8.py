import re

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "r", encoding="utf-8") as f:
    content = f.read()

# Add load_indexes method
load_method = '''
    def load_indexes(self):
        """Load indexes from disk if they exist"""
        faiss_path = self.config.DATA_DIR / "faiss_index.bin"
        bm25_path = self.config.DATA_DIR / "bm25_corpus.json"
        
        if faiss_path.exists():
            self.faiss_index = faiss.read_index(str(faiss_path))
            performance_logger.info("Loaded FAISS index from disk")
            
        if bm25_path.exists():
            with open(bm25_path, "r") as f:
                self.bm25_corpus = json.load(f)
                from rank_bm25 import BM25Okapi
                self.bm25_index = BM25Okapi(self.bm25_corpus)
            performance_logger.info("Loaded BM25 index from disk")
'''

content = content.replace(
    '        # Initialize FAISS index\n        self.faiss_index = faiss.IndexFlatL2(config.EMBEDDING_DIMENSION)',
    '        # Initialize FAISS index\n        self.faiss_index = faiss.IndexFlatL2(config.EMBEDDING_DIMENSION)\n        self.load_indexes()'
)

content = content.replace(
    '    def build_bm25_index(self, chunks: List[Dict]):',
    load_method + '\n    def build_bm25_index(self, chunks: List[Dict]):'
)

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "w", encoding="utf-8") as f:
    f.write(content)
