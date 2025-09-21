import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User | null;
  onUpdateProfile: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateProfile }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [skills, setSkills] = useState(user?.skills || '');
  const [careerGoals, setCareerGoals] = useState(user?.careerGoals || '');
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setSkills(user.skills);
      setCareerGoals(user.careerGoals);
    }
  }, [user]);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');
    setIsSaved(false);

    // Simulate API call to save data
    setTimeout(() => {
        try {
            const updatedUser: User = {
                ...user,
                name,
                skills,
                careerGoals,
            };
            onUpdateProfile(updatedUser);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save changes.');
        } finally {
            setLoading(false);
        }
    }, 1000);
  };
  
  if (!user) {
    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Not Found</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Could not load user profile. Please try logging in again.</p>
        </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your personal and career information.</p>
      </div>

      <form onSubmit={handleSaveChanges} className="space-y-6">
        {/* Profile Details Section */}
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Personal Information</h3>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <input type="email" id="email" value={email} disabled className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm sm:text-sm cursor-not-allowed" />
                </div>
            </div>
        </div>

        {/* Career Information Section */}
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Career Details</h3>
            <div className="mt-4 grid grid-cols-1 gap-y-6">
                 <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300">My Skills</label>
                    <textarea id="skills" value={skills} onChange={e => setSkills(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="List your skills, separated by commas..."></textarea>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">This information will be used to personalize your career recommendations.</p>
                </div>
                 <div>
                    <label htmlFor="careerGoals" className="block text-sm font-medium text-gray-700 dark:text-gray-300">My Career Goals</label>
                    <textarea id="careerGoals" value={careerGoals} onChange={e => setCareerGoals(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Describe your short-term and long-term career aspirations..."></textarea>
                </div>
            </div>
        </div>
        
        <div className="flex justify-end items-center gap-4">
            {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
            {isSaved && <p className="text-sm text-green-600 dark:text-green-400">Changes saved successfully!</p>}
            <button type="submit" disabled={loading} className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;