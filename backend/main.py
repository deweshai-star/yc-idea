from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from agent import app_workflow
import uvicorn

app = FastAPI(title="AI Agency Orchestrator")

class BriefSubmit(BaseModel):
    brand_name: str
    audience: str
    goals: str

@app.post("/api/submit_brief")
async def submit_brief(brief: BriefSubmit):
    try:
        # Construct human message for the agent
        initial_message = f"Brand: {brief.brand_name}, Audience: {brief.audience}, Goals: {brief.goals}"
        
        # Run the workflow
        result = app_workflow.invoke({
            "messages": [("user", initial_message)],
            "brief_data": {},
            "ad_variants": []
        })
        
        return {"status": "success", "variants": result.get("ad_variants", [])}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
