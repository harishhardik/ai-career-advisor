import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (userData: User) => void;
  onShowSignUp: () => void;
  onShowForgotPassword: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onShowSignUp, onShowForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
        if (!email || !password) {
            setError('Please enter both email and password.');
            setLoading(false);
            return;
        }

        // For this demo, we create a mock user on login,
        // or load from localStorage if a user was created via the sign up page.
        const storedUserJSON = localStorage.getItem('user');
        if (storedUserJSON) {
            const storedUser: User = JSON.parse(storedUserJSON);
            if (storedUser.email === email) {
                // In a real local-only app, you can't securely check a password.
                // We'll accept the login if the email matches the one from sign-up.
                onLogin(storedUser);
                setLoading(false);
                return;
            }
        }

        // If no user from signup matches, create a generic one for demo purposes.
        const mockUser: User = {
            _id: new Date().getTime().toString(),
            name: 'Demo User',
            email: email,
            skills: 'React, TypeScript, Node.js',
            careerGoals: 'To become a Principal Engineer.',
        };
        onLogin(mockUser);
        setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-2">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009.828 16.5l-3.22 3.22a1 1 0 001.414 1.414l3.22-3.22a1 1 0 001.414 0l3.22 3.22a1 1 0 001.414-1.414l-3.22-3.22a1 1 0 00.263-1.031l5 1.428a1 1 0 001.17-1.409l-7-14z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">AI Career Advisor</h1>
          </div>
           <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Sign in to access your personalized career insights
          </p>
        </div>
      
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-900/20 p-2 rounded-md">{error}</p>}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password"className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            
             <div className="flex items-center justify-between">
              <div className="text-sm">
                <button 
                  type="button" 
                  onClick={onShowForgotPassword}
                  className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                  Forgot your password?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
         <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{' '}
          <button onClick={onShowSignUp} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;