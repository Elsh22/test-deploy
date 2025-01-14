'use client';
import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      console.log('Submitting email:', email); // Debug log
      
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log('Response from API:', data); // Debug log

      if (!response.ok) {
        throw new Error(data.msg?.[0] || 'Failed to subscribe');
      }

      if (data.success) {
        setStatus({
          type: 'success',
          message: data.msg?.[0] || 'Thank you for subscribing to our newsletter!'
        });
        setEmail('');
        
        // Reset success message after 3 seconds
        setTimeout(() => {
          setStatus({ type: '', message: '' });
        }, 3000);
      } else {
        setStatus({
          type: 'error',
          message: data.msg?.[0] || 'Failed to subscribe. Please try again.'
        });
      }

    } catch (error) {
      console.error('Subscription error:', error);
      setStatus({
        type: 'error',
        message: error.message || 'Failed to subscribe. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-gray-50 text-center">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-8">
          Subscribe to our newsletter and get the latest updates, news, and
          insights delivered directly to your inbox.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <div className="relative w-full sm:w-3/4">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg transition-all ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gray-800 hover:bg-gray-900 text-white'
            }`}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {/* Status Messages */}
        {status.message && (
          <div 
            className={`mt-6 p-4 rounded-lg shadow-md ${
              status.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}
          >
            <p className={status.type === 'error' ? 'font-semibold' : ''}>
              {status.message}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;