import requests
import base64
from app.config import OLLAMA_BASE_URL, OLLAMA_MODEL
from app.ai.prompts import ANALYSIS_PROMPT

def analyze_image_with_ollama(image_data: bytes) -> dict:
    """
    Send image to Ollama for analysis using Gemma 4 E4B model

    Args:
        image_data: Raw image bytes

    Returns:
        dict with analysis results
    """
    try:
        # Encode image to base64
        image_base64 = base64.b64encode(image_data).decode('utf-8')

        # Prepare request to Ollama
        url = f"{OLLAMA_BASE_URL}/api/generate"

        payload = {
            "model": OLLAMA_MODEL,
            "prompt": ANALYSIS_PROMPT,
            "images": [image_base64],
            "stream": False
        }

        response = requests.post(url, json=payload, timeout=60)
        response.raise_for_status()

        result = response.json()

        if "response" not in result:
            raise ValueError("Invalid response from Ollama model")

        return {
            "success": True,
            "analysis": result.get("response", ""),
            "model": OLLAMA_MODEL
        }

    except requests.exceptions.ConnectionError:
        return {
            "success": False,
            "error": f"Cannot connect to Ollama at {OLLAMA_BASE_URL}. Make sure Ollama is running and accessible.",
            "hint": f"Try running Ollama on the device and ensure it's accessible at {OLLAMA_BASE_URL}"
        }
    except requests.exceptions.Timeout:
        return {
            "success": False,
            "error": "Request to Ollama timed out. The model may be slow or unavailable."
        }
    except ValueError as e:
        return {
            "success": False,
            "error": f"Model response error: {str(e)}"
        }
    except Exception as e:
        return {
            "success": False,
            "error": f"Error analyzing image: {str(e)}"
        }
