"use client";
import React, { useState } from 'react';
import { ChevronDown, FileText, Download, Plus, Minus } from 'lucide-react';

const ResourcesPage = () => {
  const [openFaqId, setOpenFaqId] = useState(null);

  const faqs = [
    {
      id: 1,
      category: "For Members",
      questions: [
        {
          id: "m1",
          q: "How do I join a local chapter?",
          a: "Contact your nearest chapter through our chapter directory or reach out to our member services team. They'll guide you through the membership process and connect you with local leadership."
        },
        {
          id: "m2",
          q: "What are the membership benefits?",
          a: "Members receive access to exclusive events, networking opportunities, professional development resources, mentorship programs, and our quarterly newsletter."
        },
        {
          id: "m3",
          q: "How can I get involved in leadership?",
          a: "Start by actively participating in your local chapter's events and committees. Express your interest to current leaders and look for open positions during annual elections."
        }
      ]
    },
    {
      id: 2,
      category: "For Chapters",
      questions: [
        {
          id: "c1",
          q: "How do we organize successful events?",
          a: "Plan events at least 2-3 months in advance, create a detailed budget, promote through multiple channels, and ensure clear communication with attendees. Download our event planning guide for detailed steps."
        },
        {
          id: "c2",
          q: "What resources are available for chapter growth?",
          a: "We provide marketing materials, recruitment strategies, leadership training, and funding opportunities. Contact your regional coordinator for specific support."
        }
      ]
    },
    {
      id: 3,
      category: "For Donors",
      questions: [
        {
          id: "d1",
          q: "How are donations used?",
          a: "Donations support chapter development, scholarship programs, educational resources, and community outreach initiatives. We provide detailed annual reports on fund allocation."
        },
        {
          id: "d2",
          q: "Are donations tax-deductible?",
          a: "Yes, all donations are tax-deductible. You'll receive an official receipt for your records within 5 business days of your donation."
        }
      ]
    }
  ];

  const guides = [
    {
      title: "Chapter Leadership Guide",
      description: "Comprehensive guide for chapter officers and leaders",
      format: "PDF",
      size: "2.4 MB"
    },
    {
      title: "Event Planning Template",
      description: "Step-by-step template for organizing successful events",
      format: "DOCX",
      size: "1.1 MB"
    },
    {
      title: "Membership Growth Toolkit",
      description: "Strategies and materials for recruiting new members",
      format: "ZIP",
      size: "3.8 MB"
    },
    {
      title: "Financial Management Guide",
      description: "Best practices for chapter treasury management",
      format: "PDF",
      size: "1.8 MB"
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Resources</h1>

      {/* FAQs Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium p-4 border-b">{category.category}</h3>
              <div className="p-4 space-y-3">
                {category.questions.map((faq) => (
                  <div key={faq.id} className="border rounded-lg">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium">{faq.q}</span>
                      {openFaqId === faq.id ? (
                        <Minus className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      ) : (
                        <Plus className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      )}
                    </button>
                    {openFaqId === faq.id && (
                      <div className="p-4 pt-0 text-gray-600">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guides Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Guides and Templates</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {guides.map((guide, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border hover:border-blue-500 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-500" />
                  <div>
                    <h3 className="font-medium">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {guide.format} • {guide.size}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-blue-50 rounded-full transition-colors">
                  <Download className="w-5 h-5 text-blue-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;