"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  Mail,
  School,
  CreditCard,
  Send
} from 'lucide-react';

const PartnershipPage = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    partnershipInterest: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    message: '',
    isError: false,
    isSubmitting: false
  });

  const partners = [
    {
      id: 1,
      name: "Virginia Credit Union",
      description: "Financial education partner providing literacy certifications and event sponsorship",
      type: "Financial Partner"
    },
    {
      id: 2,
      name: "CIS Richmond",
      description: "Mentoring initiative partner at Carver, Dogwood, and Fox schools in Richmond, VA",
      type: "Education Partner"
    }
  ];

  const tiers = [
    {
      name: "Community Partner",
      price: "Contact for pricing",
      icon: <School className="w-8 h-8" />,
      benefits: [
        "Participation in mentoring programs",
        "Co-branded educational initiatives",
        "Recognition at community events",
        "Impact report access"
      ]
    },
    {
      name: "Financial Sponsor",
      price: "Contact for pricing",
      icon: <CreditCard className="w-8 h-8" />,
      benefits: [
        "Premium logo placement",
        "Event hosting opportunities",
        "Annual recognition ceremony",
        "Custom partnership programs",
        "Priority event access"
      ]
    }
  ];

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setFormStatus({
      message: '',
      isError: false,
      isSubmitting: true
    });

    try {
      const response = await fetch('/api/partnership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus({
          message: Array.isArray(data.msg) ? data.msg[0] : data.msg,
          isError: false,
          isSubmitting: false
        });
        setFormData({
          organizationName: '',
          contactPerson: '',
          email: '',
          partnershipInterest: '',
          message: ''
        });
        setTimeout(() => setShowContactForm(false), 2000);
      } else {
        setFormStatus({
          message: Array.isArray(data.msg) ? data.msg[0] : 'Failed to submit partnership request',
          isError: true,
          isSubmitting: false
        });
      }
    } catch (error) {
      setFormStatus({
        message: 'An error occurred while submitting the form',
        isError: true,
        isSubmitting: false
      });
    }
  };

  return (
    <div className="bg-dmc-white min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="min-h-[60vh] relative bg-dmc-elegant px-4 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl font-bold mb-6 heading-dmc-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Our Valued Partners
          </motion.h1>
          <motion.p
            className="text-xl text-dmc-slate-gray mb-12 max-w-3xl mx-auto body-dmc-professional"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            We are deeply grateful to our partners who have been instrumental in our journey. 
            Their support enables us to make a lasting impact in our community through education and mentorship.
          </motion.p>

          {/* Current Partners Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {partners.map((partner) => (
              <motion.div
                key={partner.id}
                whileHover={{ scale: 1.02 }}
                className="card-dmc-elegant"
              >
                <div className="w-full h-32 bg-dmc-light-gray rounded-dmc mb-6 flex items-center justify-center">
                  <div className="text-dmc-warm-brown text-2xl font-bold">
                    {partner.name.split(' ').map(word => word.charAt(0)).join('')}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-dmc-charcoal">{partner.name}</h3>
                  <div className="text-sm text-dmc-warm-brown font-medium">{partner.type}</div>
                  <p className="text-dmc-slate-gray body-dmc-professional">{partner.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Partnership Opportunities */}
      <section className="py-20 px-4 bg-dmc-pearl">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 heading-dmc-secondary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Partnership Opportunities
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="card-dmc-professional"
              >
                <div className="text-center mb-8">
                  <div className="text-dmc-warm-brown mb-4 flex justify-center">{tier.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 text-dmc-charcoal">{tier.name}</h3>
                  <div className="text-lg text-dmc-warm-brown">{tier.price}</div>
                </div>
                <ul className="space-y-4">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-dmc-gold mr-3 mt-1 flex-shrink-0" />
                      <span className="text-dmc-slate-gray">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="btn-dmc-primary w-full mt-8 flex items-center justify-center gap-2"
                  onClick={() => setShowContactForm(true)}
                >
                  <Send className="w-4 h-4" />
                  Contact Us
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dmc-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-dmc-white rounded-dmc-lg p-8 max-w-2xl w-full shadow-dmc-elegant"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-6 heading-dmc-secondary">Partner with Us</h3>
              {formStatus.message && (
                <div className={`p-4 rounded-dmc mb-4 ${formStatus.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {formStatus.message}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-dmc-charcoal">Organization Name</label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    placeholder="Enter your organization name"
                    className="w-full px-4 py-2 border border-dmc-silver rounded-dmc focus:outline-none focus:ring-2 focus:ring-dmc-gold"
                    required
                    minLength={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-dmc-charcoal">Contact Person</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder="Enter contact person's name"
                    className="w-full px-4 py-2 border border-dmc-silver rounded-dmc focus:outline-none focus:ring-2 focus:ring-dmc-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-dmc-charcoal">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-dmc-silver rounded-dmc focus:outline-none focus:ring-2 focus:ring-dmc-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-dmc-charcoal">Partnership Interest</label>
                  <select 
                    name="partnershipInterest"
                    value={formData.partnershipInterest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-dmc-silver rounded-dmc focus:outline-none focus:ring-2 focus:ring-dmc-gold"
                    required
                  >
                    <option value="">Select partnership type</option>
                    <option value="community">Community Partner</option>
                    <option value="financial">Financial Sponsor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-dmc-charcoal">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your organization and partnership goals"
                    className="w-full px-4 py-2 border border-dmc-silver rounded-dmc h-32 focus:outline-none focus:ring-2 focus:ring-dmc-gold resize-none"
                    required
                    minLength={20}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button 
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="px-6 py-2 border border-dmc-silver rounded-dmc hover:bg-dmc-pearl text-dmc-charcoal transition-colors"
                    disabled={formStatus.isSubmitting}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="btn-dmc-primary disabled:opacity-50"
                    disabled={formStatus.isSubmitting}
                  >
                    {formStatus.isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PartnershipPage;