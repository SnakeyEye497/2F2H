# mlapp/ml/image_processor.py
import os
import uuid
from google.cloud import vision
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings

def extract_text_from_image(image_file, output_file=None):
    """
    Extract text from an image using Google Cloud Vision API and save to a text file.
    
    Args:
        image_file: Can be either a file path string or a Django UploadedFile object
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
        filename = f"image_extract_{uuid.uuid4().hex}.txt"
        output_file = os.path.join(extract_dir, filename)
    
    # Initialize Google Cloud Vision client
    # Make sure GOOGLE_APPLICATION_CREDENTIALS is set in your Django settings or .env file
    if not os.environ.get("GOOGLE_APPLICATION_CREDENTIALS") and hasattr(settings, "GOOGLE_APPLICATION_CREDENTIALS"):
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = settings.GOOGLE_APPLICATION_CREDENTIALS
    
    client = vision.ImageAnnotatorClient()
    
    # If input is a Django UploadedFile or InMemoryUploadedFile
    if hasattr(image_file, 'read'):
        # Save the uploaded file temporarily
        temp_path = default_storage.save('mlapp/temp_images/temp_image.jpg', ContentFile(image_file.read()))
        try:
            # Reset file pointer for future use
            image_file.seek(0)
            
            # Read the image content
            with open(default_storage.path(temp_path), "rb") as image_file_content:
                content = image_file_content.read()
                
            # Process with Vision API
            image = vision.Image(content=content)
            response = client.text_detection(image=image)
            
            # Extract text from the response
            if response.error.message:
                raise Exception(f"Google Vision API error: {response.error.message}")
                
            # Get the extracted text or empty string if none
            extracted_text = response.text_annotations[0].description if response.text_annotations else ""
            
            # Write extracted text to file
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(extracted_text)
            
            return output_file
            
        finally:
            # Clean up the temp file
            if default_storage.exists(temp_path):
                default_storage.delete(temp_path)
    
    # If input is a file path
    else:
        # Assume image_file is a path string
        if not os.path.exists(image_file):
            raise FileNotFoundError(f"File not found: {image_file}")
        
        # Open the image file
        with open(image_file, "rb") as image_file_content:
            content = image_file_content.read()
            
        # Process with Vision API
        image = vision.Image(content=content)
        response = client.text_detection(image=image)
        
        # Extract text from the response
        if response.error.message:
            raise Exception(f"Google Vision API error: {response.error.message}")
            
        # Get the extracted text or empty string if none
        extracted_text = response.text_annotations[0].description if response.text_annotations else ""
        
        # Write extracted text to file
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(extracted_text)
        
        return output_file


# -------------------------------------------------------------------------
# USAGE EXAMPLES
# -------------------------------------------------------------------------

# Example 1: Using in a Django view with an uploaded image
"""
# In any Django view:
def process_image_view(request):
    from django.http import JsonResponse
    import os
    
    if request.method == 'POST' and request.FILES.get('image'):
        image_file = request.FILES['image']
        
        # Check if the file is an image
        if not image_file.content_type.startswith('image/'):
            return JsonResponse({'error': 'Please upload a valid image file'}, status=400)
        
        try:
            # Extract and save to a text file
            output_path = extract_text_from_image(image_file)
            
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
def process_existing_image(file_path, output_path=None):
    try:
        result_path = extract_text_from_image(file_path, output_path)
        print(f"Text extracted and saved to: {result_path}")
        return result_path
    except FileNotFoundError:
        print(f"The file {file_path} does not exist")
        return None
    except Exception as e:
        print(f"Error processing image: {e}")
        return None

# Example call
# output = process_existing_image('/path/to/your/image.jpg', '/path/to/output/text.txt')
"""

# Example 3: Using in a Django model method
"""
# In a Django model:
class ImageDocument(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/')
    extracted_text_file = models.FileField(upload_to='extracted_texts/', blank=True)
    
    def extract_content(self):
        if self.image:
            # Generate output path
            filename = f"extract_{os.path.basename(self.image.name)}.txt"
            output_path = os.path.join(settings.MEDIA_ROOT, 'extracted_texts', filename)
            
            # Extract text to file
            result_path = extract_text_from_image(self.image.path, output_path)
            
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
from mlapp.ml.image_processor import extract_text_from_image

def external_app_process(request):
    # Similar to Example 1
    pass
"""

# Example 5: Setup in Django settings.py
"""
# In your settings.py, add:
GOOGLE_APPLICATION_CREDENTIALS = os.path.join(BASE_DIR, 'path/to/your/google-credentials.json')

# Or use environment variables in .env file:
# GOOGLE_APPLICATION_CREDENTIALS=path/to/your/google-credentials.json