#for images

import os
from dotenv import load_dotenv
from google.cloud import vision

# Load environment variables from .env file
load_dotenv()

# Get credentials path from .env
json_key_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

# Set the environment variable for Google Cloud
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = json_key_path

image_path = "test.png"

def extract_text_from_image(image_path):
    client = vision.ImageAnnotatorClient()
    with open(image_path, "rb") as image_file:
        content = image_file.read()
    image = vision.Image(content=content)
    response = client.text_detection(image)
    return response.text_annotations[0].description if response.text_annotations else ""

# Extract text
text = extract_text_from_image(image_path)
print(text)
