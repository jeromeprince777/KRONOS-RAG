import re

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "r", encoding="utf-8") as f:
    content = f.read()

# Update LLM_MODEL to 1b
content = content.replace(
    'LLM_MODEL: str = "llama3.2:3b"',
    'LLM_MODEL: str = "llama3.2:1b"'
)

# Maximize batch size in EmbeddingEngine (from 32 to 128)
content = content.replace(
    'batch_size=32,',
    'batch_size=128,'
)

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "w", encoding="utf-8") as f:
    f.write(content)
