export enum View {
  HOME = 'HOME',
  SKILL_GAP = 'SKILL_GAP',
  RESUME = 'RESUME',
  INTERVIEW = 'INTERVIEW',
  TRENDS = 'TRENDS',
  CONTACT = 'CONTACT',
  SIGN_UP = 'SIGN_UP',
  PROFILE = 'PROFILE',
}

export interface User {
  _id: string;
  name: string;
  email: string;
  skills: string;
  careerGoals: string;
}

// FIX: Added missing UserAuthResponse interface to properly type authentication responses from the API, which include a token along with user data.
export interface UserAuthResponse extends User {
  token: string;
}

export interface CareerPath {
  careerTitle: string;
  description: string;
  salaryRange: string;
  outlook: string;
}

export interface SkillGapAnalysisResult {
  requiredSkills: string[];
  matchingSkills: string[];
  missingSkills: string[];
  learningSuggestions: {
    skill: string;
    suggestion: string;
  }[];
}

export interface ResumeReviewResult {
  strengths: string[];
  areasForImprovement: string[];
  actionableSuggestions: string[];
}

export interface InterviewQuestion {
  question: string;
  proTip: string;
}

export interface MarketTrendsResult {
  summary: string;
  sources: {
    web: {
      uri: string;
      title: string;
    }
  }[];
}
