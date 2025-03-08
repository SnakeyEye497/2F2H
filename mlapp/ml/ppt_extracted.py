import os
from pptx import Presentation

def extract_text_from_ppt(ppt_path, output_file=None):
    """
    Extract text from a PowerPoint file.
    
    Args:
        ppt_path (str): Path to the PowerPoint file.
        output_file (str, optional): Path to save the extracted text. If None, prints to console.
    
    Returns:
        str: Extracted text.
    """
    if not os.path.exists(ppt_path):
        raise FileNotFoundError(f"The file {ppt_path} does not exist.")
    
    # Open presentation
    prs = Presentation(ppt_path)
    
    # Initialize text variable
    all_text = []
    
    # Iterate through slides
    for i, slide in enumerate(prs.slides):
        slide_text = [f"\n\n--- Slide {i+1} ---\n"]
        
        # Extract text from shapes
        for shape in slide.shapes:
            if hasattr(shape, "text") and shape.text:
                slide_text.append(shape.text)
                
        # Extract text from tables
        for shape in slide.shapes:
            if shape.has_table:
                for row in shape.table.rows:
                    row_text = [cell.text for cell in row.cells if cell.text]
                    if row_text:
                        slide_text.append(" | ".join(row_text))
        
        all_text.extend(slide_text)
    
    # Join all text
    full_text = "\n".join(all_text)
    
    # Output handling
    if output_file:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(full_text)
        print(f"Text extracted and saved to {output_file}")
    else:
        print(full_text)
    
    return full_text

# Set file paths
ppt_path = "/content/2F2H_ppt_MightyDucks.pptx"  # Update with your actual PPTX file path
output_path = "/content/extracted_text.txt"  # Change or set to None if you don't want to save

# Extract text
extract_text_from_ppt(ppt_path, output_path)