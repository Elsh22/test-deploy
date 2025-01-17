"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Components
import Header from './components/layout/Header';
import SuccessMessage from './components/layout/SuccessMessage';
import PersonalInfo from './components/forms/PersonalInfo';
import ProfessionalInfo from './components/forms/ProfessionalInfo';
import Education from './components/forms/Education';
import SkillsInterests from './components/forms/SkillsInterests';
import ResumeUpload from './components/forms/ResumeUpload';
import AdditionalInfo from './components/forms/AdditionalInfo';

// Custom Hook
import { useFormData } from './hooks/useFormData';

const NonProfitSignup: React.FC = () => {
  const {
    formData,
    error,
    loading,
    submitted,
    selectedFileName,
    handleChange,
    handleFileChange,
    handleEducationChange,
    addEducation,
    handleSubmit,
    resetForm
  } = useFormData();

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Header />
          <SuccessMessage onClose={resetForm} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Header />
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <PersonalInfo 
              formData={formData} 
              handleChange={handleChange} 
            />

            <ProfessionalInfo 
              formData={formData} 
              handleChange={handleChange} 
            />

            <Education 
              formData={formData}
              handleEducationChange={handleEducationChange}
              addEducation={addEducation}
            />

            <SkillsInterests 
              formData={formData} 
              handleChange={handleChange} 
            />

            <ResumeUpload 
              formData={formData}
              handleFileChange={handleFileChange}
              selectedFileName={selectedFileName}
              error={error}
            />

            <AdditionalInfo 
              formData={formData} 
              handleChange={handleChange} 
            />

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`
                  px-8 py-3 rounded-lg text-white 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 
                  transition-colors duration-200
                  ${loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                  }
                `}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg 
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      />
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default NonProfitSignup;