
import React, { useState } from 'react';
import { getInterviewQuestions } from '../services/geminiService';
import { InterviewQuestion } from '../types';
import LoadingSpinner from './LoadingSpinner';

const InterviewPrep: React.FC = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!jobTitle) {
            setError('Please enter a job title.');
            return;
        }
        setLoading(true);
        setError('');
        setQuestions([]);
        try {
            const result = await getInterviewQuestions(jobTitle);
            setQuestions(result);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">AI Interview Prep</h2>
            
            <div className="space-y-1">
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Job Title</label>
                <div className="flex gap-2">
                    <input
                        id="jobTitle"
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g., Data Scientist"
                        className="flex-grow mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                     <button onClick={handleSubmit} disabled={loading} className="inline-flex items-center mt-1 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed">
                        {loading ? 'Generating...' : 'Generate'}
                    </button>
                </div>
            </div>

            {loading && <LoadingSpinner />}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {questions.length > 0 && (
                <div className="space-y-4 pt-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Interview Questions for a {jobTitle}</h3>
                    <div className="space-y-4">
                        {questions.map((q, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border-l-4 border-indigo-500">
                                <p className="font-semibold text-gray-800 dark:text-gray-100">{index + 1}. {q.question}</p>
                                <div className="mt-2 pl-4">
                                    <p className="text-sm text-indigo-800 dark:text-indigo-300"><span className="font-bold">Pro Tip:</span> {q.proTip}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterviewPrep;
