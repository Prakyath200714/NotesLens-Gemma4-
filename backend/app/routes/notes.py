from fastapi import APIRouter, UploadFile, File, HTTPException
from app.ai.model import analyze_image_with_ollama
from app.services.image_processing import validate_image, process_image

router = APIRouter(prefix="/api/notes", tags=["notes"])

@router.post("/analyse")
async def analyse_notes(file: UploadFile = File(...)):
    """
    Endpoint to upload an image of study notes and get AI analysis

    Args:
        file: Image file upload

    Returns:
        JSON with explanation, summary, important points, and quiz
    """
    try:
        # Read file content
        content = await file.read()

        # Validate image
        validation = validate_image(content, file.content_type)
        if not validation["valid"]:
            raise HTTPException(status_code=400, detail=validation["error"])

        # Process image
        try:
            processed_image = process_image(content)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

        # Analyze with Ollama
        analysis_result = analyze_image_with_ollama(processed_image)

        if not analysis_result["success"]:
            raise HTTPException(status_code=500, detail=analysis_result["error"])

        # Parse and structure the response
        analysis_text = analysis_result.get("analysis", "")

        return {
            "success": True,
            "analysis": analysis_text,
            "model": analysis_result.get("model", "gemma4:e4b")
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
