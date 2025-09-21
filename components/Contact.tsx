import React, { useState } from 'react';
import { sendContactMessage } from '../services/apiService';
import LoadingSpinner from './LoadingSpinner';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await sendContactMessage({ name, email, message });
      setSuccess('Your message has been sent successfully! We will get back to you shortly.');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message.includes('fetch') ? 'Could not connect to the server. Please ensure the backend is running.' : err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Contact Us</h2>
      <p className="text-center text-gray-600 dark:text-gray-300">
        Have questions or feedback? We'd love to hear from you.
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            placeholder="John Doe" 
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            placeholder="you@example.com" 
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
          <textarea 
            id="message" 
            name="message" 
            rows={4} 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            placeholder="Your message here..."
            required
          ></textarea>
        </div>
        
        {error && <p className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-900/20 p-2 rounded-md">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center bg-green-100 dark:bg-green-900/20 p-2 rounded-md">{success}</p>}

        <button type="submit" disabled={loading} className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed">
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default Contact;