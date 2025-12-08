from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gemini_service import generate_marketing_content
import uvicorn

app = FastAPI(
    title = "MarketingGenius AI",
    description="Generate full marketing kits for small businesses in 5 seconds",
    version="1.0"
)

#Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BusinessInput(BaseModel):
    business_name: str
    description: str | None = None 

@app.get("/")
def home():
    return {"message": "MarketingGenius AI is running! Go to /docs to test"}

@app.post("/generate")
async def generate_marketing(input: BusinessInput):
    try:
        result = generate_marketing_content(
            business_name=input.business_name,
            description=input.description
        )
        return result 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

 # Run the app with: uvicorn backend.main:app --reload 
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)