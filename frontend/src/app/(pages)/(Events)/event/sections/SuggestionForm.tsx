"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';

interface FormData {
  eventTitle: string;
  description: string;
  yourRole: string;
}

interface FormErrors {
  eventTitle?: string;
  description?: string;
  yourRole?: string;
  general?: string;
}

const SuggestionForm = () => {
  const [formData, setFormData] = useState<FormData>({
    eventTitle: '',
    description: '',
    yourRole: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | '';
    message: string;
  }>({ type: '', message: '' });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.eventTitle) {
      newErrors.eventTitle = 'Event title is required.';
    } else if (formData.eventTitle.length < 5) {
      newErrors.eventTitle = 'Event title must be larger than 5 characters';
    } else if (formData.eventTitle.length > 100) {
      newErrors.eventTitle = 'Event title must be lesser than 100 characters';
    }

    if (!formData.description) {
      newErrors.description = 'Event description is required.';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Please provide a more detailed description';
    }

    if (!formData.yourRole) {
      newErrors.yourRole = 'Your role is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: '', message: '' });
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: Array.isArray(data.msg) ? data.msg[0] : 'Event suggestion submitted successfully'
        });
        // Reset form on success
        setFormData({
          eventTitle: '',
          description: '',
          yourRole: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: Array.isArray(data.msg) ? data.msg[0] : 'Failed to submit suggestion'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred while submitting the form.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Suggest an Event</h2>
          <p className="text-gray-600">
            Have an idea for an event? We'd love to hear from you!
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6">
            {submitStatus.message && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === 'success'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="eventTitle" className="block text-sm font-medium mb-2">
                  Event Title
                </label>
                <input 
                  id="eventTitle"
                  name="eventTitle"
                  type="text"
                  value={formData.eventTitle}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.eventTitle ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.eventTitle && (
                  <p className="mt-1 text-sm text-red-600">{errors.eventTitle}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea 
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your event idea"
                  className={`w-full px-4 py-2 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              <div>
                <label htmlFor="yourRole" className="block text-sm font-medium mb-2">
                  Your Role
                </label>
                <input 
                  id="yourRole"
                  name="yourRole"
                  type="text"
                  value={formData.yourRole}
                  onChange={handleChange}
                  placeholder="Are you a speaker, organizer, or participant?"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.yourRole ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.yourRole && (
                  <p className="mt-1 text-sm text-red-600">{errors.yourRole}</p>
                )}
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors duration-200 
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SuggestionForm;