
import { GoogleGenAI, Type } from "@google/genai";
import { CareerPath, SkillGapAnalysisResult, ResumeReviewResult, InterviewQuestion, MarketTrendsResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

export const getCareerPaths = async (skills: string): Promise<CareerPath[]> => {
    const response = await ai.models.generateContent({
        model,
        contents: `Based on the following skills: ${skills}, recommend 3 suitable career paths. For each path, provide a brief description, average salary range, and future outlook.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        careerTitle: { type: Type.STRING },
                        description: { type: Type.STRING },
                        salaryRange: { type: Type.STRING },
                        outlook: { type: Type.STRING },
                    },
                    required: ["careerTitle", "description", "salaryRange", "outlook"],
                }
            }
        }
    });

    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse career paths JSON:", e);
        throw new Error("Received an invalid format from the AI for career paths.");
    }
};

export const analyzeSkillGap = async (currentSkills: string, desiredCareer: string): Promise<SkillGapAnalysisResult> => {
    const response = await ai.models.generateContent({
        model,
        contents: `I want to become a ${desiredCareer}. My current skills are: ${currentSkills}. Analyze the skill gap. List the key skills required for this role. Identify which of my skills are relevant and which skills I'm missing. For the missing skills, suggest types of resources to learn them (e.g., online courses, certifications, books).`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                    matchingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                    missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                    learningSuggestions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                skill: { type: Type.STRING },
                                suggestion: { type: Type.STRING },
                            },
                            required: ["skill", "suggestion"]
                        }
                    }
                },
                required: ["requiredSkills", "matchingSkills", "missingSkills", "learningSuggestions"]
            }
        }
    });
    
    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse skill gap analysis JSON:", e);
        throw new Error("Received an invalid format from the AI for skill gap analysis.");
    }
};

export const reviewResume = async (resumeText: string, targetJob: string): Promise<ResumeReviewResult> => {
    const response = await ai.models.generateContent({
        model,
        contents: `Act as an expert career coach. Review the following resume for a '${targetJob}' position. Provide feedback focusing on clarity, impact, and relevance to the target role.\n\nResume:\n${resumeText}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                    areasForImprovement: { type: Type.ARRAY, items: { type: Type.STRING } },
                    actionableSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["strengths", "areasForImprovement", "actionableSuggestions"]
            }
        }
    });
    
    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse resume review JSON:", e);
        throw new Error("Received an invalid format from the AI for resume review.");
    }
};

export const getInterviewQuestions = async (jobTitle: string): Promise<InterviewQuestion[]> => {
    const response = await ai.models.generateContent({
        model,
        contents: `Generate a list of 10 common interview questions for a '${jobTitle}' role. Include a mix of behavioral, technical, and situational questions. For each question, provide a brief 'Pro Tip' on what the interviewer is looking for in the answer.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        proTip: { type: Type.STRING },
                    },
                    required: ["question", "proTip"]
                }
            }
        }
    });

    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse interview questions JSON:", e);
        throw new Error("Received an invalid format from the AI for interview questions.");
    }
};

export const getMarketTrends = async (field: string): Promise<MarketTrendsResult> => {
    const response = await ai.models.generateContent({
        model,
        contents: `Provide a summary of the current job market trends for the '${field}' industry. Include the most in-demand skills, typical salary ranges for entry-level to senior positions, and the future job outlook for the next 5 years. Use your search tool to find recent information.`,
        config: {
            tools: [{ googleSearch: {} }],
        }
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.filter(chunk => chunk.web) || [];

    return {
        summary: response.text,
        sources: sources as MarketTrendsResult['sources'],
    };
};
