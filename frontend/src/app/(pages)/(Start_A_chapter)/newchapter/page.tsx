"use client";
import React, { useState } from 'react';
import { CheckCircle, ChevronRight, Download, Send, Phone } from 'lucide-react';

const ChapterPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({
    chapterName: '',
    institution: '',
    primaryContact: ''
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage({ type: '', message: '' });

    try {
      const response = await fetch('/api/chapter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormMessage({
          type: 'success',
          message: Array.isArray(data.msg) ? data.msg[0] : data.msg
        });
        // Reset form on success
        setFormData({
          chapterName: '',
          institution: '',
          primaryContact: ''
        });
      } else {
        setFormMessage({
          type: 'error',
          message: Array.isArray(data.msg) ? data.msg[0] : 'Failed to submit application'
        });
      }
    } catch (error) {
      setFormMessage({
        type: 'error',
        message: 'Failed to submit application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sections = [
    {
      title: "Requirements",
      icon: <CheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Chapter Requirements</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-blue-500" />
              <span>Minimum of 5 founding members</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-blue-500" />
              <span>Completed constitution document</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-blue-500" />
              <span>Proposed chapter activities plan</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-blue-500" />
              <span>Faculty advisor confirmation</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      title: "Resources",
      icon: <Download className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Helpful Resources</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <span>Chapter Constitution Template</span>
              <Download className="w-4 h-4" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <span>Chapter Handbook</span>
              <Download className="w-4 h-4" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <span>Activity Planning Guide</span>
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      )
    },
    {
      title: "Application",
      icon: <Send className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Chapter Application</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="chapterName" className="block text-sm font-medium">Chapter Name</label>
              <input
                id="chapterName"
                name="chapterName"
                type="text"
                value={formData.chapterName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="institution" className="block text-sm font-medium">Institution</label>
              <input
                id="institution"
                name="institution"
                type="text"
                value={formData.institution}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="primaryContact" className="block text-sm font-medium">Primary Contact</label>
              <input
                id="primaryContact"
                name="primaryContact"
                type="text"
                value={formData.primaryContact}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            {formMessage.message && (
              <div className={`p-3 rounded-lg ${
                formMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {formMessage.message}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-500 text-white py-2 rounded-lg transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      )
    },
    {
      title: "Contact",
      icon: <Phone className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Need Help?</h3>
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="font-medium">Chapter Support Team</p>
              <p className="text-sm text-gray-600">Available Mon-Fri, 9am-5pm ET</p>
              <p className="mt-2">support@example.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="font-medium">Regional Coordinator</p>
              <p className="text-sm text-gray-600">For specific regional guidance</p>
              <p className="mt-2">coordinator@example.com</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleSectionClick = (index: React.SetStateAction<number>) => {
    setIsAnimating(true);
    setActiveSection(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Start a Chapter</h1>
      
      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        <div className="space-y-2">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => handleSectionClick(index)}
              className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all ${
                activeSection === index
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {section.icon}
              <span>{section.title}</span>
            </button>
          ))}
        </div>

        <div className={`bg-white p-6 rounded-lg shadow-sm transition-opacity duration-300 ${
          isAnimating ? 'opacity-0' : 'opacity-100'
        }`}>
          {sections[activeSection].content}
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;