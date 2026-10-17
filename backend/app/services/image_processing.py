from PIL import Image
from io import BytesIO
from app.config import MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES

def validate_image(file_content: bytes, content_type: str) -> dict:
    """
    Validate uploaded image

    Args:
        file_content: Raw image bytes
        content_type: MIME type of the image

    Returns:
        dict with validation result
    """
    try:
        # Check file size
        if len(file_content) > MAX_IMAGE_SIZE:
            return {
                "valid": False,
                "error": f"File too large. Maximum size is {MAX_IMAGE_SIZE / (1024*1024):.0f} MB"
            }

        # Check content type
        if content_type not in ALLOWED_IMAGE_TYPES:
            return {
                "valid": False,
                "error": f"Invalid file type. Allowed types: JPEG, PNG, WebP"
            }

        # Try to open and verify it's a valid image
        try:
            image = Image.open(BytesIO(file_content))
            image.verify()
        except Exception as e:
            return {
                "valid": False,
                "error": f"Invalid or corrupted image file: {str(e)}"
            }

        return {
            "valid": True
        }

    except Exception as e:
        return {
            "valid": False,
            "error": f"Error validating image: {str(e)}"
        }

def process_image(file_content: bytes) -> bytes:
    """
    Process and optimize image for AI analysis

    Args:
        file_content: Raw image bytes

    Returns:
        Processed image bytes
    """
    try:
        image = Image.open(BytesIO(file_content))

        # Convert RGBA to RGB if needed
        if image.mode == 'RGBA':
            rgb_image = Image.new('RGB', image.size, (255, 255, 255))
            rgb_image.paste(image, mask=image.split()[3])
            image = rgb_image

        # Return original or processed bytes
        output = BytesIO()
        image.save(output, format='JPEG', quality=85)
        return output.getvalue()

    except Exception as e:
        raise ValueError(f"Error processing image: {str(e)}")
