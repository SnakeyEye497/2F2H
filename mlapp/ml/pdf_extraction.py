# mlapp/ml/pdf_processor.py
import os
import uuid
import PyPDF2
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings

def extract_text_from_pdf(pdf_file, output_file=None):
    """
    Extract text from a PDF file and save it to a text file.
    
    Args:
        pdf_file: Can be either a file path string or a Django UploadedFile object
        output_file: Path where the extracted text will be saved. If None, a default path will be generated.
    
    Returns:
        str: Path to the saved text file
    """
    # If output_file is not provided, generate a default filename
    if output_file is None:
        # Create a directory for extracted texts if it doesn't exist
        extract_dir = os.path.join(settings.MEDIA_ROOT, 'extracted_texts')
        os.makedirs(extract_dir, exist_ok=True)
        
        # Generate a unique filename
        filename = f"pdf_extract_{uuid.uuid4().hex}.txt"
        output_file = os.path.join(extract_dir, filename)
    
    # If input is a Django UploadedFile or InMemoryUploadedFile
    if hasattr(pdf_file, 'read'):
        # Save the uploaded file temporarily
        temp_path = default_storage.save('mlapp/temp_pdfs/temp.pdf', ContentFile(pdf_file.read()))
        try:
            # Reset file pointer for future use
            pdf_file.seek(0)
            
            # Extract text from the PDF
            with open(default_storage.path(temp_path), "rb") as file:
                reader = PyPDF2.PdfReader(file)
                text = ""
                for page in reader.pages:
                    text += page.extract_text() + "\n\n"  # Add page breaks for readability
            
            # Write extracted text to file
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(text)
            
            return output_file
        finally:
            # Clean up the temp file
            if default_storage.exists(temp_path):
                default_storage.delete(temp_path)
    
    # If input is a file path
    else:
        # Assume pdf_file is a path string
        if not os.path.exists(pdf_file):
            raise FileNotFoundError(f"File not found: {pdf_file}")
        
        # Extract text from the PDF
        with open(pdf_file, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n\n"  # Add page breaks for readability
        
        # Write extracted text to file
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(text)
        
        return output_file


# -------------------------------------------------------------------------
# USAGE EXAMPLES
# -------------------------------------------------------------------------

# Example 1: Using in a Django view with an uploaded file
"""
# In any Django view:
def process_pdf_view(request):
    from django.http import JsonResponse
    import os
    
    if request.method == 'POST' and request.FILES.get('document'):
        pdf_file = request.FILES['document']
        
        # Check if the file is a PDF
        if not pdf_file.name.endswith('.pdf'):
            return JsonResponse({'error': 'Please upload a PDF file'}, status=400)
        
        try:
            # Extract and save to a text file
            output_path = extract_text_from_pdf(pdf_file)
            
            # Get the relative path for client-side use
            relative_path = os.path.relpath(output_path, settings.MEDIA_ROOT)
            url_path = os.path.join(settings.MEDIA_URL, relative_path)
            
            return JsonResponse({
                'success': True, 
                'file_path': output_path,
                'download_url': url_path
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Invalid request'}, status=400)
"""

# Example 2: Using with a file path and custom output
"""
# Anywhere in your Django project:
def process_existing_pdf(file_path, output_path=None):
    try:
        result_path = extract_text_from_pdf(file_path, output_path)
        print(f"Text extracted and saved to: {result_path}")
        return result_path
    except FileNotFoundError:
        print(f"The file {file_path} does not exist")
        return None
    except Exception as e:
        print(f"Error processing file: {e}")
        return None

# Example call
# output = process_existing_pdf('/path/to/your/document.pdf', '/path/to/output/text.txt')
"""

# Example 3: Using in a Django model method
"""
# In a Django model:
class PdfDocument(models.Model):
    title = models.CharField(max_length=255)
    pdf_file = models.FileField(upload_to='pdfs/')
    extracted_text_file = models.FileField(upload_to='extracted_texts/', blank=True)
    
    def extract_content(self):
        if self.pdf_file and self.pdf_file.name.endswith('.pdf'):
            # Generate output path
            filename = f"extract_{os.path.basename(self.pdf_file.name)}.txt"
            output_path = os.path.join(settings.MEDIA_ROOT, 'extracted_texts', filename)
            
            # Extract text to file
            result_path = extract_text_from_pdf(self.pdf_file.path, output_path)
            
            # Update model with the path
            relative_path = os.path.relpath(result_path, settings.MEDIA_ROOT)
            self.extracted_text_file = relative_path
            self.save()
            return True
        return False
"""

# Example 4: Using from another app
"""
# In another_app/views.py:
from mlapp.ml.pdf_processor import extract_text_from_pdf

def external_app_process(request):
    # Similar to Example 1
    pass

# Or import through the package if __init__.py is set up correctly:
# from mlapp.ml import extract_text_from_pdf
"""

# Example 5: Batch processing multiple PDFs
"""
# Process all PDFs in a directory:
def batch_process_pdfs(directory_path, output_directory=None):
    if output_directory is None:
        output_directory = os.path.join(settings.MEDIA_ROOT, 'extracted_texts', 'batch')
        os.makedirs(output_directory, exist_ok=True)
    
    results = []
    for filename in os.listdir(directory_path):
        if filename.lower().endswith('.pdf'):
            pdf_path = os.path.join(directory_path, filename)
            output_path = os.path.join(output_directory, filename.replace('.pdf', '.txt'))
            try:
                result_path = extract_text_from_pdf(pdf_path, output_path)
                results.append({
                    'pdf': filename,
                    'txt': os.path.basename(result_path),
                    'success': True
                })
            except Exception as e:
                results.append({
                    'pdf': filename,
                    'error': str(e),
                    'success': False
                })
    
    return results
"""

