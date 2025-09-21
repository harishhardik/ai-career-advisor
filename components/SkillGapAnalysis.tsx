
import React, { useState } from 'react';
import { getCareerPaths, analyzeSkillGap } from '../services/geminiService';
import { CareerPath, SkillGapAnalysisResult } from '../types';
import LoadingSpinner from './LoadingSpinner';

const SkillGapAnalysis: React.FC = () => {
    const [skills, setSkills] = useState('');
    const [desiredCareer, setDesiredCareer] = useState('');
    const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
    const [analysisResult, setAnalysisResult] = useState<SkillGapAnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleFindCareers = async () => {
        if (!skills) {
            setError('Please enter your skills.');
            return;
        }
        setLoading(true);
        setError('');
        setCareerPaths([]);
        setAnalysisResult(null);
        try {
            const result = await getCareerPaths(skills);
            setCareerPaths(result);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleAnalyzeGap = async () => {
        if (!skills || !desiredCareer) {
            setError('Please enter both your skills and a desired career.');
            return;
        }
        setLoading(true);
        setError('');
        setCareerPaths([]);
        setAnalysisResult(null);
        try {
            const result = await analyzeSkillGap(skills, desiredCareer);
            setAnalysisResult(result);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Career & Skill Analysis</h2>
            
            <div className="space-y-4">
                 <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Skills (comma-separated)</label>
                    <textarea
                        id="skills"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="e.g., JavaScript, React, Python, Project Management"
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows={3}
                    />
                </div>
                 <div>
                    <label htmlFor="desiredCareer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Desired Career Path (for Skill Gap Analysis)</label>
                    <input
                        id="desiredCareer"
                        type="text"
                        value={desiredCareer}
                        onChange={(e) => setDesiredCareer(e.target.value)}
                        placeholder="e.g., Senior Frontend Developer"
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={handleFindCareers} disabled={loading} className="flex-1 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed">
                    {loading ? 'Thinking...' : 'Recommend Careers'}
                </button>
                <button onClick={handleAnalyzeGap} disabled={loading} className="flex-1 w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-500 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-200 dark:disabled:bg-gray-600 disabled:cursor-not-allowed">
                    {loading ? 'Analyzing...' : 'Analyze Skill Gap'}
                </button>
            </div>

            {loading && <LoadingSpinner />}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            
            {careerPaths.length > 0 && (
                <div className="space-y-4 pt-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recommended Career Paths</h3>
                    {careerPaths.map(path => (
                        <div key={path.careerTitle} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-bold text-indigo-600 dark:text-indigo-400">{path.careerTitle}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{path.description}</p>
                            <div className="text-xs mt-2 grid grid-cols-2 gap-x-4">
                                <span><strong>Salary:</strong> {path.salaryRange}</span>
                                <span><strong>Outlook:</strong> {path.outlook}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {analysisResult && (
                <div className="space-y-6 pt-4">
                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Skill Gap Analysis for {desiredCareer}</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                           <h4 className="font-semibold mb-2">Matching Skills ✅</h4>
                           <ul className="list-disc list-inside text-sm space-y-1">{analysisResult.matchingSkills.map(s => <li key={s}>{s}</li>)}</ul>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                           <h4 className="font-semibold mb-2 text-red-800 dark:text-red-200">Missing Skills 🎯</h4>
                           <ul className="list-disc list-inside text-sm space-y-1">{analysisResult.missingSkills.map(s => <li key={s}>{s}</li>)}</ul>
                        </div>
                     </div>
                     <div>
                        <h4 className="font-semibold mb-2">Learning Suggestions 📚</h4>
                        <div className="space-y-2">
                         {analysisResult.learningSuggestions.map(s => (
                           <div key={s.skill} className="text-sm border-l-4 border-indigo-500 pl-3">
                              <p className="font-bold">{s.skill}</p>
                              <p className="text-gray-600 dark:text-gray-300">{s.suggestion}</p>
                           </div>
                         ))}
                        </div>
                     </div>
                </div>
            )}
        </div>
    );
};

export default SkillGapAnalysis;
