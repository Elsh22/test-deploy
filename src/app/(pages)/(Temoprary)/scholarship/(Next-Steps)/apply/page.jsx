"use client";
import React, { useState } from "react";

const LabelInput = ({ name, type = "text", label, required, ...rest }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium">{label}</label>
    <input type={type} name={name} id={name} required={required} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" {...rest} />
  </div>
);

const LabelTextArea = ({ name, label, required, ...rest }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium">{label}</label>
    <textarea name={name} id={name} required={required} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows="4" {...rest}></textarea>
  </div>
);

const DmcScholarshipApplication = () => {
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    const response = await fetch(endpoint, options);
    const resData = await response.json();

    if (response.status === 200) {
      console.log("Message sent.");
      setApplicationSubmitted(true);
    }
  };



  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
  {applicationSubmitted ? (
    <div className="text-center h-screen">
      <h2 className="text-2xl font-semibold text-green-600">Application Submitted Successfully</h2>
      <p className="mt-4 text-lg">Thank you for applying to the DMC Scholarship. We will review your application and get back to you.</p>
    </div>
  ) : (
    <div className="mt-20">
      <h1 className="text-3xl font-bold text-center mb-8">Developing Men of Color (DMC) Scholarship Application Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabelInput name="firstName" label="First Name" required />
            <LabelInput name="lastName" label="Last Name" required />
            <LabelInput name="dob" type="date" label="Date of Birth (MM/DD/YYYY)" required />
            <LabelInput name="email" type="email" label="Email Address" required />
            <LabelInput name="phone" type="tel" label="Phone Number" required />
            <LabelInput name="address" label="Permanent Address" required />
            <LabelInput name="city" label="City" required />
            <LabelInput name="state" label="State" required />
            <LabelInput name="zip" label="ZIP Code" required />
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">Academic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabelInput name="schoolEmail" type="email" label="Current School Email" required />
            <LabelInput name="classification" label="Classification (Grade)" required />
            <LabelInput name="gradDate" type="month" label="Expected Graduation Date (MM/YYYY)" required />
            <LabelInput name="major" label="Major/Area of Study (if applicable)" />
            <LabelInput name="gpa" type="number" label="Cumulative GPA (on a 4.0 scale)" step="0.01" min="0" max="4" required />
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">Short Essay Questions</h2>
          <LabelTextArea name="involvementEssay" label="Describe your involvement with the DMC initiative or similar activities (150-300 words)" required />
          <LabelTextArea name="financialChallengesEssay" label="Discuss significant financial challenges (150-300 words)" required />
          <LabelTextArea name="goalsEssay" label="Outline your academic and professional goals (150-300 words)" required />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">Certification and Signature</h2>
          <label className="inline-flex items-center">
            <input type="checkbox" name="certify" required className="text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <span className="ml-2">I certify that all information provided in this application is true, complete, and accurate to the best of my knowledge. I agree to allow the scholarship committee to review all the information included in this application. I understand that this application does not guarantee scholarship funding. (A small interview will be conducted if you are the chosen applicant)</span>
          </label>
        </section>
        <button type="submit" className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75">Submit Application</button>
      </form>
    </div>
  )}
</div>
  );
};

export default DmcScholarshipApplication;
