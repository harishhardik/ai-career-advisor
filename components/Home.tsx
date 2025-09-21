import React from 'react';
import { View } from '../types';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
  >
    <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">{description}</p>
    <span className="text-indigo-600 dark:text-indigo-400 font-semibold mt-4 text-sm self-end">Get Started &rarr;</span>
  </button>
);


interface HomeProps {
  setActiveView: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveView }) => {
  const features = [
    {
      title: 'Career Path & Skill Gap Analysis',
      description: 'Input your skills to discover potential career paths and identify what you need to learn to get there.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
      view: View.SKILL_GAP
    },
    {
      title: 'AI Resume Reviewer',
      description: 'Paste your resume and a target job to get AI-powered feedback on how to improve your application.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L15.232 5.232z" /></svg>,
      view: View.RESUME
    },
    {
      title: 'Interview Preparation',
      description: 'Enter a job title and receive a list of common interview questions and pro tips to ace your next interview.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
      view: View.INTERVIEW
    },
    {
      title: 'Job Market Trends',
      description: 'Explore current trends for any industry, including in-demand skills, salary expectations, and future outlook.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
      view: View.TRENDS
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-8 py-8 md:py-12">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Chart Your Course to a <span className="text-indigo-600 dark:text-indigo-400">Brighter Career</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Navigate your professional journey with confidence. Our AI-powered tools provide personalized advice, skill analysis, and market insights to help you achieve your goals.
          </p>
          <button 
            onClick={() => setActiveView(View.SKILL_GAP)}
            className="mt-8 inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg">
            Start Your Analysis
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center items-center">
          <svg className="w-full max-w-md h-auto" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#818CF8" d="M48,-62.4C63.2,-52.5,77.3,-38.4,82.4,-21.5C87.6,-4.6,83.9,15.1,75.1,32.2C66.3,49.3,52.5,63.8,36.2,71.1C19.9,78.3,1.2,78.4,-16.9,74.7C-35,71,-52.5,63.5,-64.8,50.2C-77.1,36.9,-84.2,18.5,-84.1,0.2C-84,-18,-76.7,-36.1,-64.6,-46.8C-52.5,-57.5,-35.6,-60.8,-20.5,-64.9C-5.4,-69,7.9,-73.9,23.3,-72.1C38.7,-70.3,55.1,-61.8,48,-62.4Z" transform="translate(100 100) scale(1.1)" opacity="0.1"></path>
            <g transform="translate(100 100)" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Person Icon */}
                <circle cx="-30" cy="20" r="10" className="stroke-indigo-500 dark:stroke-indigo-400"/>
                <path d="M-30 30 v15 a10 10 0 0 0 20 0 v-15" className="stroke-indigo-500 dark:stroke-indigo-400"/>
                {/* Chart/Graph lines */}
                <path d="M-60 60 L-40 40 L-20 50 L 0 30 L 20 40 L 40 20 L 60 30" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4"/>
                <path d="M-40 40 L 40 20 L 60 30" className="stroke-indigo-600 dark:stroke-indigo-400" />
                {/* Upward Arrow */}
                <path d="M 20 -40 L 50 -10" className="stroke-indigo-600 dark:stroke-indigo-400"/>
                <path d="M 50 -10 L 40 -15" className="stroke-indigo-600 dark:stroke-indigo-400"/>
                <path d="M 50 -10 L 55 -20" className="stroke-indigo-600 dark:stroke-indigo-400"/>
                {/* Floating nodes */}
                <circle cx="50" cy="-50" r="5" className="fill-indigo-400 stroke-indigo-400" />
                <circle cx="65" cy="50" r="8" className="fill-indigo-400 stroke-indigo-400" opacity="0.6"/>
                <circle cx="-55" cy="-20" r="6" className="fill-indigo-400 stroke-indigo-400" opacity="0.8"/>
            </g>
          </svg>
        </div>
      </section>

      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Your Personal AI Career Co-Pilot</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Unlock your potential with our suite of AI-powered tools.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} onClick={() => setActiveView(feature.view)} />
        ))}
      </div>
    </div>
  );
};

export default Home;