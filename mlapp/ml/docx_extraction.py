# For DOCX
from docx import Document

def extract_text_from_docx(docx_path):
    doc = Document(docx_path)
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text

lists=extract_text_from_pdf(do_path)