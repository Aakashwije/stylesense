import { apiClient } from "@/services/api/client";

export interface HairAnalysisResult {
  overallScore: number;
  metrics: {
    moisture: number;
    strength: number;
    shine: number;
    scalpHealth: number;
  };
  hairType: string;
  recommendations: string[];
  concerns: string[];
}

export interface StyleRecommendation {
  id: string;
  name: string;
  category: string;
  description: string;
  matchScore: number;
  imageUrl?: string;
}

export const aiService = {
  analyzeHair: async (imageFile: File): Promise<HairAnalysisResult> => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const res = await apiClient.post<HairAnalysisResult>(
      "/ai/analyze",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return res.data;
  },

  getRecommendations: async (
    analysisId?: string,
  ): Promise<StyleRecommendation[]> => {
    const res = await apiClient.get<StyleRecommendation[]>(
      "/ai/recommendations",
      {
        params: analysisId ? { analysisId } : undefined,
      },
    );
    return res.data;
  },

  virtualTryOn: async (
    imageFile: File,
    styleId: string,
    colorId?: string,
  ): Promise<{ resultUrl: string }> => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("styleId", styleId);
    if (colorId) formData.append("colorId", colorId);
    const res = await apiClient.post<{ resultUrl: string }>(
      "/ai/virtual-tryon",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return res.data;
  },

  chatMessage: async (
    message: string,
    conversationId?: string,
  ): Promise<{ reply: string; conversationId: string }> => {
    const res = await apiClient.post<{ reply: string; conversationId: string }>(
      "/ai/chat",
      { message, conversationId },
    );
    return res.data;
  },

  getBeautyReport: async (): Promise<
    HairAnalysisResult & { reportDate: string }
  > => {
    const res = await apiClient.get<
      HairAnalysisResult & { reportDate: string }
    >("/ai/report");
    return res.data;
  },
};
