from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile

from ai_service.api.auth import get_optional_user_id
from ai_service.domain.beauty_report import get_beauty_report
from ai_service.domain.chat import send_chat_message
from ai_service.domain.hair_analysis import analyze_hair
from ai_service.domain.recommendations import get_recommendations
from ai_service.domain.schemas import (
    BeautyReport,
    ChatRequest,
    ChatResponse,
    HairAnalysisResult,
    StyleRecommendation,
    VirtualTryOnResult,
)
from ai_service.domain.virtual_tryon import virtual_tryon

router = APIRouter(prefix="/ai", tags=["ai"])

_MAX_IMAGE_BYTES = 10 * 1024 * 1024  # 10 MB — matches the frontend's UI hint


async def _read_image(image: UploadFile) -> tuple[bytes, str]:
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    data = await image.read()
    if len(data) == 0:
        raise HTTPException(status_code=400, detail="Empty image upload")
    if len(data) > _MAX_IMAGE_BYTES:
        raise HTTPException(status_code=413, detail="Image exceeds 10 MB limit")
    return data, image.content_type


@router.post("/analyze", response_model=HairAnalysisResult)
async def analyze(
    image: Annotated[UploadFile, File(description="Hair photo (JPG/PNG, up to 10 MB)")],
    user_id: Annotated[str | None, Depends(get_optional_user_id)] = None,
) -> HairAnalysisResult:
    data, content_type = await _read_image(image)
    return await analyze_hair(data, content_type, user_id=user_id)


@router.get("/recommendations", response_model=list[StyleRecommendation])
async def recommendations(
    analysisId: str | None = None,
) -> list[StyleRecommendation]:
    return await get_recommendations(analysisId)


@router.post("/virtual-tryon", response_model=VirtualTryOnResult)
async def tryon(
    image: Annotated[UploadFile, File()],
    styleId: Annotated[str, Form()],
    colorId: Annotated[str | None, Form()] = None,
) -> VirtualTryOnResult:
    data, _ = await _read_image(image)
    return await virtual_tryon(data, styleId, colorId)


@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest) -> ChatResponse:
    return await send_chat_message(payload.message, payload.conversationId)


@router.get("/report", response_model=BeautyReport)
async def report(
    user_id: Annotated[str | None, Depends(get_optional_user_id)] = None,
) -> BeautyReport:
    return await get_beauty_report(user_id)
