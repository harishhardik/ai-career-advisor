
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 mt-auto">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} AI Career Advisor. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
