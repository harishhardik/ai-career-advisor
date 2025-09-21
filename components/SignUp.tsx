import React, { useState } from 'react';
import { User } from '../types';

interface SignUpProps {
  onSignUp: (userData: User) => void;
  onShowLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp, onShowLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Full Name is required.';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
        return;
    }
    setLoading(true);
    setErrors({});
    
    // Simulate API call for creating an account
    setTimeout(() => {
        const newUser: User = {
            _id: new Date().getTime().toString(),
            name: name,
            email: email,
            skills: '',
            careerGoals: '',
        };
        onSignUp(newUser);
        setLoading(false);
    }, 1000);
  };

  const getInputClasses = (fieldName: string) => {
    const baseClasses = "block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
    return errors[fieldName] ? `${baseClasses} border-red-500 dark:border-red-500` : baseClasses;
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
            Create your account to get started
          </p>
        </div>
      
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
             {errors.form && <p className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-900/20 p-2 rounded-md">{errors.form}</p>}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className={getInputClasses('name')}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>
            </div>
            
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
                  className={getInputClasses('email')}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
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
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="8+ characters"
                  className={getInputClasses('password')}
                />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>
            </div>

             <div>
              <label htmlFor="confirm-password"className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={getInputClasses('confirmPassword')}
                />
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
         <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <button onClick={onShowLogin} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;