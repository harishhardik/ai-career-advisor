import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import SkillGapAnalysis from './components/SkillGapAnalysis';
import ResumeReviewer from './components/ResumeReviewer';
import InterviewPrep from './components/InterviewPrep';
import MarketTrends from './components/MarketTrends';
import Contact from './components/Contact';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import LoadingSpinner from './components/LoadingSpinner';
import ForgotPassword from './components/ForgotPassword';
import { View, User } from './types';

type AuthView = 'LOGIN' | 'SIGNUP' | 'FORGOT_PASSWORD';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.HOME);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authView, setAuthView] = useState<AuthView>('LOGIN');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // For initial auth check

  useEffect(() => {
    const checkUserStatus = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to parse user from localStorage", error);
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    checkUserStatus();
  }, []);

  const handleAuthSuccess = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setActiveView(View.HOME);
    setIsAuthenticated(true);
    setAuthView('LOGIN');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setActiveView(View.HOME);
    setAuthView('LOGIN');
  };
  
  const handleUpdateProfile = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your session...</p>
        </div>
    )
  }

  if (!isAuthenticated) {
    switch (authView) {
        case 'SIGNUP':
            return <SignUp onSignUp={handleAuthSuccess} onShowLogin={() => setAuthView('LOGIN')} />;
        case 'FORGOT_PASSWORD':
            return <ForgotPassword onShowLogin={() => setAuthView('LOGIN')} />;
        case 'LOGIN':
        default:
            return <Login onLogin={handleAuthSuccess} onShowSignUp={() => setAuthView('SIGNUP')} onShowForgotPassword={() => setAuthView('FORGOT_PASSWORD')} />;
    }
  }

  const renderView = () => {
    switch (activeView) {
      case View.SKILL_GAP:
        return <SkillGapAnalysis />;
      case View.RESUME:
        return <ResumeReviewer />;
      case View.INTERVIEW:
        return <InterviewPrep />;
      case View.TRENDS:
        return <MarketTrends />;
      case View.CONTACT:
        return <Contact />;
      case View.PROFILE:
        return <Profile user={user} onUpdateProfile={handleUpdateProfile} />;
      case View.HOME:
      default:
        return <Home setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header setActiveView={setActiveView} activeView={activeView} onLogout={handleLogout} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;