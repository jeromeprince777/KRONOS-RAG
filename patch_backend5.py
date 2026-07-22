import re

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "r", encoding="utf-8") as f:
    content = f.read()

# Fix LLM_MODEL config
content = content.replace(
    'LLM_MODEL: str = "llama-3.2:3b-instruct-q4_k_m"', 
    'LLM_MODEL: str = "llama3.2:3b"'
)

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "w", encoding="utf-8") as f:
    f.write(content)
