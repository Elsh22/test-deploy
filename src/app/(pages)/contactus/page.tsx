"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MapPin,
  Send,
  Phone,
  Globe,
  Clock,
  CheckCircle
} from 'lucide-react';

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = {
    email: "contact@dmcorg.com",
    address: "123 Innovation Way, Tech City, TC 12345",
    phone: "+1 (555) 123-4567",
    hours: "Monday - Friday: 9AM - 5PM EST"
  };

  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError([]);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({
          fullname: '',
          email: '',
          subject: '',
          message: ''
        });
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError(['An error occurred while submitting the form.']);
    }
  };

  return (
    <div className="min-h-screen bg-dmc-elegant">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-dmc-light-gold rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20 relative">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6 heading-dmc-primary">Get in Touch</h1>
          <p className="text-xl text-dmc-slate-gray max-w-2xl mx-auto body-dmc-professional">
            Have questions or want to collaborate? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={formAnimation}
            initial="hidden"
            animate="visible"
          >
            <div className="card-dmc-elegant glass-dmc p-8 relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={fadeInUp} custom={0}>
                  <label className="block text-sm font-medium mb-2 text-dmc-charcoal">Name</label>
                  <input 
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border border-dmc-silver rounded-dmc focus:outline-none focus:ring-2 focus:ring-dmc-gold focus:border-dmc-gold transition-colors"
                  />
                </motion.div>

                <motion.div variants={fadeInUp} custom={1}>
                  <label className="block text-sm font-medium mb-2 text-dmc-charcoal">Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-dmc-silver rounded-dmc focus:outline-none focus:ring-2 focus:ring-dmc-gold focus:border-dmc-gold transition-colors"
                  />
                </motion.div>

                <motion.div variants={fadeInUp} custom={2}>
                  <label className="block text-sm font-medium mb-2 text-dmc-charcoal">Subject</label>
                  <input 
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What&apos;s this about?"
                    className="w-full px-4 py-2 border border-dmc-silver rounded-dmc focus:outline-none focus:ring-2 focus:ring-dmc-gold focus:border-dmc-gold transition-colors"
                  />
                </motion.div>

                <motion.div variants={fadeInUp} custom={3}>
                  <label className="block text-sm font-medium mb-2 text-dmc-charcoal">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    className="w-full px-4 py-2 border border-dmc-silver rounded-dmc h-32 focus:outline-none focus:ring-2 focus:ring-dmc-gold focus:border-dmc-gold resize-none transition-colors"
                  />
                </motion.div>

                {/* Error Messages */}
                {error.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    {error.map((err, index) => (
                      <p key={index} className="text-red-500 text-sm">
                        {err}
                      </p>
                    ))}
                  </motion.div>
                )}

                <motion.div 
                  variants={fadeInUp} 
                  custom={4}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button 
                    type="submit"
                    className="btn-dmc-primary w-full flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </button>
                </motion.div>
              </form>

              {/* Success Message */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-dmc-white/95 rounded-dmc-lg"
                  >
                    <div className="text-center">
                      <CheckCircle className="w-16 h-16 text-dmc-gold mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2 text-dmc-charcoal">Message Sent!</h3>
                      <p className="text-dmc-slate-gray">We&apos;ll get back to you soon.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {[
              { icon: <Mail className="w-6 h-6" />, title: "Email", content: contactInfo.email },
              { icon: <MapPin className="w-6 h-6" />, title: "Address", content: contactInfo.address },
              { icon: <Phone className="w-6 h-6" />, title: "Phone", content: contactInfo.phone },
              { icon: <Clock className="w-6 h-6" />, title: "Hours", content: contactInfo.hours }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02 }}
              >
                <div className="card-dmc-elegant glass-dmc-sophisticated p-6">
                  <div className="flex items-start">
                    <div className="text-dmc-warm-brown mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium mb-1 text-dmc-charcoal">{item.title}</h3>
                      <p className="text-dmc-slate-gray body-dmc-professional">{item.content}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Map Preview */}
            <motion.div
              variants={fadeInUp}
              custom={4}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-dmc-white rounded-dmc-lg shadow-dmc-sophisticated p-2 overflow-hidden">
                <div className="w-full h-48 bg-dmc-light-gray rounded relative flex items-center justify-center">
                  <div className="text-dmc-slate-gray text-lg">Map Location</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      className="px-4 py-2 bg-dmc-white text-dmc-warm-brown hover:bg-dmc-pearl rounded-dmc transition-colors duration-200 flex items-center shadow-dmc-silver"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      View on Map
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;