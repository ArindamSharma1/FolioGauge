from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from . import scanner, analyzer
from .auth import get_current_user
from .limits import can_user_scan, increment_scan
from .supabase_client import supabase
import os

app = FastAPI(title="FolioGauge API")
# Force Reload Trigger

# -----------------------------
# CORS
# -----------------------------
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

# Add production frontend URL from env
prod_origin = os.getenv("FRONTEND_URL")
if prod_origin:
    # Strip trailing slash if present to match browser Origin header exactly
    prod_origin = prod_origin.rstrip("/")
    origins.append(prod_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Schemas
# -----------------------------
class ScanRequest(BaseModel):
    url: HttpUrl
    persona: str = "recruiter" # recruiter, design_lead, client

class QuestionPair(BaseModel):
    question: str
    answer: str

class ScanResponse(BaseModel):
    status: str
    scanned_url: str
    score: int
    insights: list[str]
    suggestions: list[str]
    ai_questions: list[QuestionPair] = []
    benchmarks: list[dict] = []
    persona_used: str

# -----------------------------
# Health Check
# -----------------------------
@app.get("/")
def health_check():
    return {"status": "running", "service": "FolioGauge API"}

# -----------------------------
# Scan Endpoint (AUTH REQUIRED)
# -----------------------------
@app.post("/scan", response_model=ScanResponse)
def scan_portfolio(
    payload: ScanRequest,
    user_id: str = Depends(get_current_user),
):
    url = str(payload.url)
    persona = payload.persona

    # ADMIN BYPASS
    ADMIN_USER_ID = os.getenv("ADMIN_USER_ID")
    if user_id != ADMIN_USER_ID:
        if not can_user_scan(user_id):
            raise HTTPException(
                status_code=403,
                detail="Daily scan limit reached"
            )

    try:
        from .limits import get_user_tier
        user_tier = get_user_tier(user_id)
        
        # Feature Gate: Personas are for Super Pro only
        if (user_id != ADMIN_USER_ID) and (user_tier != "super_pro") and (persona != "recruiter"):
            persona = "recruiter" # Fallback/Force default

        site_data = scanner.fetch_site_data(url)
        results = analyzer.calculate_score(site_data, persona)

        # Feature Gate: Free users get limited suggestions
        final_suggestions = results["suggestions"]
        if user_tier == "free":
            final_suggestions = final_suggestions[:3]

        # Feature Gate: AI Questions for Pro/Super Pro only
        final_questions = []
        if user_tier != "free":
            final_questions = results.get("ai_questions", [])

        # Save scan
        supabase.table("scans").insert({
            "user_id": user_id,
            "url": url,
            "score": results["score"],
            "result": {
                "insights": results["insights"],
                "suggestions": final_suggestions,
                "ai_questions": final_questions,
                "category_scores": results.get("category_scores", {})
            }
        }).execute()

        if user_id != ADMIN_USER_ID:
            increment_scan(user_id)

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"Scan Error: {e}")
        raise HTTPException(status_code=500, detail="Internal analysis error")

    return {
        "status": "success",
        "scanned_url": url,
        "score": results["score"],
        "insights": results["insights"],
        "suggestions": final_suggestions,
        "ai_questions": final_questions,
        "benchmarks": results.get("benchmarks", []),
        "persona_used": persona,
    }

# -----------------------------
# Tool Endpoints
# -----------------------------
class RewriteRequest(BaseModel):
    text: str
    tone: str

@app.post("/tools/rewrite")
def rewrite_bio(
    payload: RewriteRequest,
    user_id: str = Depends(get_current_user)
):
    try:
        from .limits import get_user_tier
        
        # ADMIN BYPASS
        ADMIN_USER_ID = os.getenv("ADMIN_USER_ID")
        if user_id != ADMIN_USER_ID:
            user_tier = get_user_tier(user_id)
            
            # Gating: Pro/Super Pro only
            if user_tier == "free":
                 print(f"Access Denied: User {user_id} is tier '{user_tier}'")
                 raise HTTPException(status_code=403, detail="Upgrade to Pro to use AI Rewrite.")

        rewritten_text = analyzer.rewrite_text(payload.text, payload.tone)
        
        return {
            "original": payload.text,
            "rewritten": rewritten_text,
            "tone": payload.tone
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Rewrite Error: {e}")
        raise HTTPException(status_code=500, detail="AI processing failed")



# -----------------------------
# User Usage Endpoint
# -----------------------------
@app.get("/user/usage")
def get_usage(user_id: str = Depends(get_current_user)):
    try:
        from .limits import get_usage_stats
        
        # ADMIN BYPASS
        ADMIN_USER_ID = os.getenv("ADMIN_USER_ID")
        
        if user_id == ADMIN_USER_ID:
            return {
                "tier": "super_pro",
                "used": 0,
                "limit": 9999
            }
            
        return get_usage_stats(user_id)
    except Exception as e:
        print(f"Usage Stats Error: {e}")
        raise HTTPException(status_code=500, detail="Could not fetch usage")


# -----------------------------
# User History Endpoint
# -----------------------------
@app.get("/user/history")
def get_history(user_id: str = Depends(get_current_user)):
    try:
        # Fetch last 10 scans
        response = supabase.table("scans") \
            .select("*") \
            .eq("user_id", user_id) \
            .order("created_at", desc=True) \
            .limit(10) \
            .execute()
        
        return response.data
    except Exception as e:
        print(f"History Error: {e}")
        raise HTTPException(status_code=500, detail="Could not fetch history")
