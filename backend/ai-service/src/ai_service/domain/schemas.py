"""Pydantic schemas shared across domain modules and API handlers.

These mirror the TypeScript interfaces in frontend/src/services/ai/index.ts —
keep them in sync.
"""

from __future__ import annotations

from pydantic import BaseModel, Field


class HairMetrics(BaseModel):
    moisture: int = Field(ge=0, le=100)
    strength: int = Field(ge=0, le=100)
    shine: int = Field(ge=0, le=100)
    scalpHealth: int = Field(ge=0, le=100)


class HairAnalysisResult(BaseModel):
    id: str
    overallScore: int = Field(ge=0, le=100)
    metrics: HairMetrics
    hairType: str
    recommendations: list[str]
    concerns: list[str]


class StyleRecommendation(BaseModel):
    id: str
    name: str
    category: str
    description: str
    matchScore: int = Field(ge=0, le=100)
    imageUrl: str | None = None


class VirtualTryOnResult(BaseModel):
    resultUrl: str
    styleId: str
    colorId: str | None = None


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    conversationId: str | None = None


class ChatResponse(BaseModel):
    reply: str
    conversationId: str


class BeautyReport(HairAnalysisResult):
    reportDate: str
