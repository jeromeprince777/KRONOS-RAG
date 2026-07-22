import re

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "r", encoding="utf-8") as f:
    content = f.read()

# Fallback for GenerationEngine if ollama fails to connect
generation_fallback = '''    def generate_answer(self, query: str, context: List[str]) -> str:
        """Generate response with local LLM"""
        prompt = self._build_prompt(query, context)
        
        try:
            response = ollama.chat(
                model=self.config.llm_model,
                messages=[{'role': 'user', 'content': prompt}],
                options={
                    'temperature': 0.1,
                    'num_predict': 512,
                    'top_k': 10,
                }
            )
            return response['message']['content']
        except Exception as e:
            audit_logger.error(f"Ollama generation failed: {str(e)}")
            return "Local AI generation is currently unavailable. Please ensure Ollama is installed and running on your system. Based on the context provided, your search returned matching chunks but they could not be summarized."
'''

content = re.sub(
    r'    def generate_answer\(self, query: str, context: List\[str\]\) -> str:.*?return response\[\'message\'\]\[\'content\'\]\n',
    generation_fallback,
    content,
    flags=re.DOTALL
)

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "w", encoding="utf-8") as f:
    f.write(content)
