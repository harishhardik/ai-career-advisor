
import React, { useState } from 'react';
import { getMarketTrends } from '../services/geminiService';
import { MarketTrendsResult } from '../types';
import LoadingSpinner from './LoadingSpinner';

const MarketTrends: React.FC = () => {
    const [field, setField] = useState('');
    const [result, setResult] = useState<MarketTrendsResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!field) {
            setError('Please enter a career field or industry.');
            return;
        }
        setLoading(true);
        setError('');
        setResult(null);
        try {
            const trends = await getMarketTrends(field);
            setResult(trends);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Job Market Trends</h2>
            
            <div className="space-y-1">
                <label htmlFor="field" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Career Field or Industry</label>
                 <div className="flex gap-2">
                    <input
                        id="field"
                        type="text"
                        value={field}
                        onChange={(e) => setField(e.target.value)}
                        placeholder="e.g., Cybersecurity"
                        className="flex-grow mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                     <button onClick={handleSubmit} disabled={loading} className="inline-flex items-center mt-1 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed">
                        {loading ? 'Searching...' : 'Get Trends'}
                    </button>
                </div>
            </div>

            {loading && <LoadingSpinner />}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {result && (
                <div className="space-y-4 pt-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Trends for {field}</h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md">
                      {result.summary}
                    </div>

                    {result.sources && result.sources.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Sources from Google Search:</h4>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                {result.sources.map((source, index) => (
                                    <li key={index} className="text-sm">
                                        <a 
                                            href={source.web.uri} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                        >
                                            {source.web.title || source.web.uri}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MarketTrends;
