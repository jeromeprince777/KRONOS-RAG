import re

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "r", encoding="utf-8") as f:
    content = f.read()

# Fix GenerationEngine to catch Ollama errors so search results aren't blocked
gen_replacement = '''    def generate(self, query: str, context_docs: List[Dict]) -> str:
        """Generate response using Llama"""
        prompt = self.construct_prompt(query, context_docs)
        
        start_time = datetime.now()
        
        try:
            response = self.client.generate(
                model=self.config.LLM_MODEL,
                prompt=prompt,
                stream=False,
                options={
                    "temperature": 0.7,
                    "top_p": 0.95,
                    "num_ctx": self.config.CONTEXT_WINDOW,
                }
            )
            
            elapsed_time = (datetime.now() - start_time).total_seconds()
            token_count = len(response["response"].split())
            tokens_per_sec = token_count / elapsed_time if elapsed_time > 0 else 0
            
            performance_logger.info(f"Generation: {tokens_per_sec:.1f} tokens/sec, {elapsed_time:.2f}s total")
            
            return response["response"]
        except Exception as e:
            audit_logger.error(f"Ollama generation failed: {str(e)}")
            return "AI inference is currently unavailable. This is usually due to a CUDA driver/memory issue with Ollama on this hardware. Your search results are shown below."
'''

content = re.sub(
    r'    def generate\(self, query: str, context_docs: List\[Dict\]\) -> str:.*?return response\["response"\]\n',
    gen_replacement,
    content,
    flags=re.DOTALL
)

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "w", encoding="utf-8") as f:
    f.write(content)
