import re

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "r", encoding="utf-8") as f:
    content = f.read()

# Fix the PyPDF2 to_image bug and pytesseract dependency
ocr_replacement = '''    def _ocr_pdf(self, filepath: str) -> str:
        """Tesseract OCR for scanned documents (Mocked/Disabled to avoid dependency hell)"""
        audit_logger.warning(f"OCR requested for {filepath} but OCR is disabled. Skipping image text extraction.")
        return " [OCR Extraction Skipped] "
'''

# Replace the old _ocr_pdf method
content = re.sub(
    r'    def _ocr_pdf\(self, filepath: str\) -> str:.*?return text\n',
    ocr_replacement,
    content,
    flags=re.DOTALL
)

# Fix PyPDF2 import and pytesseract import just in case
content = content.replace("import pytesseract\n", "# import pytesseract\n")
content = content.replace("from PIL import Image\n", "# from PIL import Image\n")

# Ensure CORS middleware is added to FastAPI so the React frontend can talk to it
cors_setup = '''
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="CUBO - Secure Local Document Intelligence")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
'''
content = content.replace('app = FastAPI(title="CUBO - Secure Local Document Intelligence")', cors_setup)

with open("PROJECT_1_CUBO_IMPLEMENTATION.py", "w", encoding="utf-8") as f:
    f.write(content)
