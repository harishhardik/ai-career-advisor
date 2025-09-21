
import React, { useState, useRef } from 'react';
import { reviewResume } from '../services/geminiService';
import { ResumeReviewResult } from '../types';
import LoadingSpinner from './LoadingSpinner';

// Declare global variables from CDN scripts for TypeScript
declare var pdfjsLib: any;
declare var Tesseract: any;

const ResumeReviewer: React.FC = () => {
    const [resumeText, setResumeText] = useState('');
    const [targetJob, setTargetJob] = useState('');
    const [result, setResult] = useState<ResumeReviewResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fileName, setFileName] = useState('');
    const [processingMessage, setProcessingMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        setResumeText('');
        setError('');
        setResult(null);

        if (file.type === 'application/pdf') {
            setProcessingMessage('Parsing PDF...');
            try {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    if (!e.target?.result) {
                        setError('Failed to read PDF file.');
                        setProcessingMessage('');
                        return;
                    }
                    const typedarray = new Uint8Array(e.target.result as ArrayBuffer);
                    const pdf = await pdfjsLib.getDocument(typedarray).promise;
                    let fullText = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        fullText += textContent.items.map((item: any) => item.str).join(' ');
                        fullText += '\n';
                    }
                    setResumeText(fullText);
                    setProcessingMessage('');
                };
                reader.onerror = () => {
                    setError('Failed to read the PDF file.');
                    setProcessingMessage('');
                };
                reader.readAsArrayBuffer(file);
            } catch (e) {
                console.error("PDF parsing error:", e);
                setError('An error occurred while parsing the PDF.');
                setProcessingMessage('');
            }
        } else if (file.type.startsWith('image/')) {
            setProcessingMessage('Extracting text from image (this may take a moment)...');
            try {
                const { data: { text } } = await Tesseract.recognize(file, 'eng');
                setResumeText(text);
            } catch (e) {
                setError('Failed to extract text from the image.');
                console.error("OCR error:", e);
            } finally {
                setProcessingMessage('');
            }
        } else if (file.type === 'text/plain' || file.type === 'text/markdown') {
            setProcessingMessage('Reading text file...');
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                setResumeText(text);
                setProcessingMessage('');
            };
            reader.onerror = () => {
                setError('Failed to read the file.');
                setProcessingMessage('');
            };
            reader.readAsText(file);
        } else {
            setError('Unsupported file type. Please upload a PDF, JPG, PNG, TXT, or MD file.');
            handleRemoveFile();
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };
    
    const handleRemoveFile = () => {
        setFileName('');
        setResumeText('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const handleSubmit = async () => {
        if (!resumeText || !targetJob) {
            setError('Please provide your resume content and a target job.');
            return;
        }
        setLoading(true);
        setError('');
        setResult(null);
        try {
            const review = await reviewResume(resumeText, targetJob);
            setResult(review);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const isProcessing = !!processingMessage;

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">AI Resume Reviewer</h2>
            
            <div className="space-y-4">
                <div>
                    <label htmlFor="targetJob" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Target Job Title</label>
                    <input
                        id="targetJob"
                        type="text"
                        value={targetJob}
                        onChange={(e) => setTargetJob(e.target.value)}
                        placeholder="e.g., Product Manager at Google"
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        disabled={isProcessing}
                    />
                </div>
                <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Resume</label>
                    <div className="mt-1">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".txt,.md,.pdf,.jpg,.jpeg,.png"
                            disabled={isProcessing}
                        />
                        {!fileName && !isProcessing ? (
                             <button
                                onClick={handleUploadClick}
                                type="button"
                                className="w-full mb-2 inline-flex justify-center items-center py-2 px-4 border border-dashed border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Upload Resume (.pdf, .jpg, .txt)
                            </button>
                        ) : (
                            !isProcessing && (
                                <div className="flex items-center justify-between p-2 mb-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{fileName}</span>
                                    <button onClick={handleRemoveFile} className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-bold">&times;</button>
                                </div>
                            )
                        )}
                         { isProcessing &&
                            <div className="flex items-center justify-center gap-2 p-2 mb-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-md">
                                <LoadingSpinner />
                                <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">{processingMessage}</p>
                            </div>
                         }
                         <p className="text-center text-xs text-gray-500 dark:text-gray-400 my-2">or paste your resume below</p>
                    </div>
                    <textarea
                        id="resume"
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste your full resume text here..."
                        className="block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows={10}
                        disabled={isProcessing}
                    />
                </div>
            </div>

            <button onClick={handleSubmit} disabled={loading || isProcessing} className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed">
                {loading ? 'Reviewing...' : 'Analyze Resume'}
            </button>
            
            {loading && <LoadingSpinner />}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {result && (
                <div className="space-y-6 pt-4">
                    <FeedbackSection title="Strengths 💪" items={result.strengths} color="green" />
                    <FeedbackSection title="Areas for Improvement 🧐" items={result.areasForImprovement} color="yellow" />
                    <FeedbackSection title="Actionable Suggestions 🚀" items={result.actionableSuggestions} color="indigo" />
                </div>
            )}
        </div>
    );
};

interface FeedbackSectionProps {
    title: string;
    items: string[];
    color: 'green' | 'yellow' | 'indigo';
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ title, items, color }) => {
    const colorClasses = {
        green: {
            bg: 'bg-green-50 dark:bg-green-900/20',
            text: 'text-green-800 dark:text-green-200',
            border: 'border-green-500',
        },
        yellow: {
            bg: 'bg-yellow-50 dark:bg-yellow-900/20',
            text: 'text-yellow-800 dark:text-yellow-200',
            border: 'border-yellow-500',
        },
        indigo: {
            bg: 'bg-indigo-50 dark:bg-indigo-900/20',
            text: 'text-indigo-800 dark:text-indigo-200',
            border: 'border-indigo-500',
        }
    };
    
    return (
        <div className={`${colorClasses[color].bg} p-4 rounded-lg`}>
            <h3 className={`font-semibold mb-2 ${colorClasses[color].text}`}>{title}</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
                {items.map((item, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default ResumeReviewer;