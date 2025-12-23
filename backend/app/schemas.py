from pydantic import BaseModel
from typing import List

class ScanRequest(BaseModel):
    url: str

class Insight(BaseModel):
    category: str
    score: int
    feedback: str

class Question(BaseModel):
    question: str
    answer: str

class RewriteRequest(BaseModel):
    text: str
    tone: str

class RewriteResponse(BaseModel):
    original: str
    rewritten: str
    tone: str
