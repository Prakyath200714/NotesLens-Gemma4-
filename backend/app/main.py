from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import notes

app = FastAPI(title="NoteLens API", version="1.0.0")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(notes.router)

@app.get("/")
def read_root():
    return {
        "message": "NoteLens API is running",
        "status": "healthy",
        "version": "1.0.0"
    }
