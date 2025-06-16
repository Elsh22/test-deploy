"use client";
import React, { useState } from "react";

const LabelInput = ({ name, type = "text", label, required, ...rest }) => (
  <div className="mb-6">
    <label htmlFor={name} className="block text-dmc-body font-medium text-dmc-black mb-2">
      {label}
      {required && <span className="text-dmc-gold ml-1">*</span>}
    </label>
    <input 
      type={type} 
      name={name} 
      id={name} 
      required={required} 
      className="w-full px-4 py-3 border-2 border-dmc-silver rounded-dmc focus:border-dmc-gold focus:outline-none transition-colors duration-300 bg-dmc-white text-dmc-black"
      {...rest} 
    />
  </div>
);

const LabelTextArea = ({ name, label, required, ...rest }) => (
  <div className="mb-6">
    <label htmlFor={name} className="block text-dmc-body font-medium text-dmc-black mb-2">
      {label}
      {required && <span className="text-dmc-gold ml-1">*</span>}
    </label>
    <textarea 
      name={name} 
      id={name} 
      required={required} 
      className="w-full px-4 py-3 border-2 border-dmc-silver rounded-dmc focus:border-dmc-gold focus:outline-none transition-colors duration-300 bg-dmc-white text-dmc-black resize-none"
      rows="5" 
      {...rest}
    />
  </div>
);

const DmcScholarshipApplication = () => {
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      dob: e.target.dob.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      city: e.target.city.value,
      state: e.target.state.value,
      zip: e.target.zip.value,
      schoolEmail: e.target.schoolEmail.value,
      classification: e.target.classification.value,
      gradDate: e.target.gradDate.value,
      major: e.target.major.value,
      gpa: e.target.gpa.value,
      involvementEssay: e.target.involvementEssay.value,
      financialChallengesEssay: e.target.financialChallengesEssay.value,
      goalsEssay: e.target.goalsEssay.value,
    };
    
    const JSONdata = JSON.stringify(formData);
    const endpoint = "/api/send";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    try {
      const response = await fetch(endpoint, options);
      const resData = await response.json();

      if (response.status === 200) {
        console.log("Message sent.");
        setApplicationSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dmc-light-gray">
      {applicationSubmitted ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-dmc-white rounded-dmc-xl p-12 shadow-dmc-elegant text-center max-w-2xl">
            <div className="w-20 h-20 bg-dmc-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-dmc-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h2 className="text-dmc-h1 font-dmc-primary text-dmc-gold mb-6">
              Application Submitted Successfully!
            </h2>
            
            <p className="text-dmc-body text-dmc-dark-gray mb-8 leading-relaxed">
              Thank you for applying to the DMC Scholarship. We will review your application 
              carefully and get back to you with next steps. You should receive a confirmation 
              email shortly.
            </p>
            
            <div className="space-y-4">
              <a href="/" className="btn-dmc-primary inline-block w-full text-center">
                Return to Homepage
              </a>
              <a href="/scholarship" className="btn-dmc-secondary inline-block w-full text-center">
                Learn More About Our Scholarship
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-16">
          {/* Header */}
          <div className="bg-gradient-to-r from-dmc-black via-dmc-charcoal to-dmc-black text-dmc-white py-16 mb-12">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h1 className="text-dmc-hero font-dmc-primary text-dmc-gold mb-4">
                DMC Scholarship Application
              </h1>
              <p className="text-dmc-h4 text-dmc-silver max-w-3xl mx-auto">
                Complete this application to be considered for the $1,000 DMC Scholarship
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-dmc-white rounded-dmc-xl p-8 shadow-dmc-sophisticated">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <section>
                  <h2 className="text-dmc-h2 font-dmc-primary text-dmc-gold mb-6 pb-3 border-b border-dmc-gold/30">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <LabelInput name="firstName" label="First Name" required />
                    <LabelInput name="lastName" label="Last Name" required />
                    <LabelInput name="dob" type="date" label="Date of Birth" required />
                    <LabelInput name="email" type="email" label="Email Address" required />
                    <LabelInput name="phone" type="tel" label="Phone Number" required />
                    <LabelInput name="address" label="Permanent Address" required />
                    <LabelInput name="city" label="City" required />
                    <LabelInput name="state" label="State" required />
                    <LabelInput name="zip" label="ZIP Code" required />
                  </div>
                </section>

                {/* Academic Information */}
                <section>
                  <h2 className="text-dmc-h2 font-dmc-primary text-dmc-gold mb-6 pb-3 border-b border-dmc-gold/30">
                    Academic Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <LabelInput name="schoolEmail" type="email" label="Current School Email" required />
                    <LabelInput name="classification" label="Classification (Year in School)" required />
                    <LabelInput name="gradDate" type="month" label="Expected Graduation Date" required />
                    <LabelInput name="major" label="Major/Area of Study" />
                    <LabelInput name="gpa" type="number" label="Cumulative GPA (4.0 scale)" step="0.01" min="0" max="4" required />
                  </div>
                </section>

                {/* Essay Questions */}
                <section>
                  <h2 className="text-dmc-h2 font-dmc-primary text-dmc-gold mb-6 pb-3 border-b border-dmc-gold/30">
                    Essay Questions
                  </h2>
                  <div className="space-y-6">
                    <LabelTextArea 
                      name="involvementEssay" 
                      label="Describe your involvement with the DMC initiative or similar activities (150-300 words)" 
                      required 
                      placeholder="Tell us about your engagement with DMC and how you've contributed to our community..."
                    />
                    <LabelTextArea 
                      name="financialChallengesEssay" 
                      label="Discuss significant financial challenges that make this scholarship important to you (150-300 words)" 
                      required 
                      placeholder="Help us understand your financial situation and how this scholarship would impact your education..."
                    />
                    <LabelTextArea 
                      name="goalsEssay" 
                      label="Outline your academic and professional goals (150-300 words)" 
                      required 
                      placeholder="Share your aspirations and how your education will help you achieve them..."
                    />
                  </div>
                </section>

                {/* Certification */}
                <section>
                  <h2 className="text-dmc-h2 font-dmc-primary text-dmc-gold mb-6 pb-3 border-b border-dmc-gold/30">
                    Certification and Agreement
                  </h2>
                  <div className="bg-dmc-light-gray p-6 rounded-dmc-lg">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="certify" 
                        required 
                        className="w-5 h-5 text-dmc-gold bg-dmc-white border-2 border-dmc-silver rounded focus:ring-dmc-gold focus:ring-2 mt-1"
                      />
                      <span className="text-dmc-body text-dmc-dark-gray leading-relaxed">
                        I certify that all information provided in this application is true, complete, and accurate 
                        to the best of my knowledge. I agree to allow the scholarship committee to review all the 
                        information included in this application. I understand that this application does not guarantee 
                        scholarship funding. If selected as a finalist, I agree to participate in an interview process 
                        with the scholarship committee.
                      </span>
                    </label>
                  </div>
                </section>

                {/* Submit Button */}
                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full btn-dmc-primary text-dmc-h4 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Application...
                      </span>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DmcScholarshipApplication;