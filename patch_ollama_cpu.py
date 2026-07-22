import re

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "r", encoding="utf-8") as f:
    content = f.read()

# Update Ollama generation options to force CPU (num_gpu: 0) to bypass the CUDA stack buffer overrun on this specific Windows driver
old_options = """                options={
                    "temperature": 0.7,
                    "top_p": 0.95,
                    "num_ctx": self.config.CONTEXT_WINDOW,
                }"""

new_options = """                options={
                    "temperature": 0.7,
                    "top_p": 0.95,
                    "num_ctx": self.config.CONTEXT_WINDOW,
                    "num_gpu": 0,  # Force CPU inference to bypass CUDA kernel image invalid error on this hardware
                }"""

content = content.replace(old_options, new_options)

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "w", encoding="utf-8") as f:
    f.write(content)
