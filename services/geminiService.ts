
import { CareerPath, SkillGapAnalysisResult, ResumeReviewResult, InterviewQuestion, MarketTrendsResult } from '../types';

// Browser-safe stub implementations for AI-related services.
// Reason: `@google/genai` is a Node-only package and importing it in the client bundle
// causes runtime failures on Vercel/static hosting. These stubs allow the frontend to
// load and function without AI; switch to server-side AI calls or implement server
// endpoints for real AI usage.

export const getCareerPaths = async (skills: string): Promise<CareerPath[]> => {
    // Return lightweight mock data so the UI can render without errors.
    return [
        {
            careerTitle: 'Frontend Developer',
            description: `Build user interfaces using frameworks like React. Based on skills: ${skills}`,
            salaryRange: '$60k - $120k',
            outlook: 'Strong demand with increasing focus on web performance and accessibility.'
        },
        {
            careerTitle: 'Full-Stack Developer',
            description: `Work across frontend and backend to deliver complete web applications.`,
            salaryRange: '$70k - $140k',
            outlook: 'High demand, especially for cloud-native and serverless skills.'
        },
        {
            careerTitle: 'Product Designer',
            description: `Design user experiences and collaborate with engineering teams.`,
            salaryRange: '$65k - $130k',
            outlook: 'Growing as companies prioritize UX and product-led growth.'
        }
    ];
};

export const analyzeSkillGap = async (currentSkills: string, desiredCareer: string): Promise<SkillGapAnalysisResult> => {
    const current = currentSkills.split(',').map(s => s.trim()).filter(Boolean);
    const required = ['Communication', 'Problem Solving', 'Domain Knowledge'];
    const matching = required.filter(r => current.map(c => c.toLowerCase()).includes(r.toLowerCase()));
    const missing = required.filter(r => !matching.includes(r));

    return {
        requiredSkills: required,
        matchingSkills: matching,
        missingSkills: missing,
        learningSuggestions: missing.map(m => ({ skill: m, suggestion: `Take an online course or read books focused on ${m}.` }))
    } as SkillGapAnalysisResult;
};

export const reviewResume = async (resumeText: string, targetJob: string): Promise<ResumeReviewResult> => {
    // Provide a simple mocked review to prevent runtime errors in the browser.
    return {
        strengths: ['Clear formatting', 'Relevant experience highlighted'],
        areasForImprovement: ['Add measurable impact (numbers)', 'Tailor skills to the job description'],
        actionableSuggestions: ['Start bullet points with strong verbs', 'Quantify achievements where possible']
    } as ResumeReviewResult;
};

export const getInterviewQuestions = async (jobTitle: string): Promise<InterviewQuestion[]> => {
    const qs: InterviewQuestion[] = [];
    for (let i = 1; i <= 6; i++) {
        qs.push({ question: `${jobTitle} interview question ${i}`, proTip: 'Structure your answer with Situation, Task, Action, Result (STAR).' });
    }
    return qs;
};

export const getMarketTrends = async (field: string): Promise<MarketTrendsResult> => {
    return {
        summary: `Mocked market trends for ${field}: demand for skills in this field is growing. Focus on continuous learning and networking.`,
        sources: []
    } as MarketTrendsResult;
};
