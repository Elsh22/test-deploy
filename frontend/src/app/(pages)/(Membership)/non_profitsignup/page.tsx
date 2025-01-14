"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Briefcase,
  GraduationCap,
  Upload,
  Link as LinkIcon,
  Globe,
  Clock,
  MapPin 
} from 'lucide-react';

const NonProfitSignup = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',

    // Professional Information
    company: '',
    jobTitle: '',
    yearsOfExperience: '',
    linkedIn: '',
    personalWebsite: '',

    // Educational Background
    education: [{
      degree: '',
      institution: '',
      graduationYear: '',
      fieldOfStudy: ''
    }],

    // Skills & Interests
    skills: '',
    interests: '',
    availabilityPerWeek: '',
    preferredCommittees: [],
    
    // Resume
    resume: null,

    // Additional Information
    previousNonProfitExp: '',
    reasonForJoining: '',
    
    // Interest Checkboxes
    mentorshipInterest: false,
    boardInterest: false,
    volunteerInterest: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  const committees = [
    "Academic Committee",
    "Professional Development",
    "Community Service",
    "Events & Programming",
    "Marketing & Communications",
    "Membership & Recruitment",
    "Technology & Innovation"
  ];

  const handleChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e: { target: { files: any[]; }; }) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setError('Invalid file type. Only PDF, DOC, and DOCX files are allowed.');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size too large. Maximum size is 5MB.');
        return;
      }

      setFormData(prev => ({ ...prev, resume: file }));
      setSelectedFileName(file.name);
      setError('');
    }
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...formData.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      education: newEducation
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        degree: '',
        institution: '',
        graduationYear: '',
        fieldOfStudy: ''
      }]
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      if (formData.resume) {
        const fileData = new FormData();
        fileData.append('file', formData.resume);
        
        // Upload file to MongoDB GridFS
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: fileData,
        });
        
        const uploadResult = await uploadResponse.json();
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'File upload failed');
        }
  
        // Submit the form with the file reference
        const response = await fetch('/api/dmc-nonprofit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            resume: {
              fileId: uploadResult.fileId,
              originalName: formData.resume.name,
              contentType: formData.resume.type,
              uploadDate: new Date()
            },
            interest: {
              mentoring: formData.mentorshipInterest,
              boardMembership: formData.boardInterest,
              volunteering: formData.volunteerInterest,
            },
            yearsOfExperience: Number(formData.yearsOfExperience)
          }),
        });
  
        const result = await response.json();
        
        if (result.success) {
          setSubmitted(true);
          setError('');
        } else {
          setError(Array.isArray(result.msg) ? result.msg.join(', ') : result.msg);
        }
      } else {
        setError('Please upload your resume');
      }
    } catch (error) {
      setError('An error occurred while submitting the form. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join DMC Non-Profit Network</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with professionals, share your expertise, and make a difference in our community. 
            Join our network of leaders committed to fostering growth and success.
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You for Your Application!</h3>
            <p className="text-green-700">
              We've received your application to join the DMC Non-Profit network. Our team will review your information 
              and contact you soon about next steps.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        minLength={2}
                        maxLength={50}
                        className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        minLength={2}
                        maxLength={50}
                        className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        pattern="^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$"
                        className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        pattern="^\+?[\d\s-]{10,}$"
                        className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      pattern="^\d{5}(-\d{4})?$"
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Professional Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company/Organization</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="number"
                        name="yearsOfExperience"
                        value={formData.yearsOfExperience}
                        onChange={handleChange}
                        required
                        min="0"
                        className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="url"
                        name="linkedIn"
                        value={formData.linkedIn}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/..."
                        pattern="^(https?:\/\/)?([\w\d-]+\.)*linkedin\.com\/\S*$"
                        className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Personal Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="url"
                        name="personalWebsite"
                        value={formData.personalWebsite}
                        onChange={handleChange}
                        placeholder="https://..."
                        pattern="^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$"
                        className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Educational Background Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Educational Background</h2>
                {formData.education.map((edu, index) => (
                  <div key={index} className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Degree/Certification</label>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                            required
                            className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                            required
                            className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                        <input
                          type="text"
                          value={edu.fieldOfStudy}
                          onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
                          required
                          className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                        <input
                          type="number"
                          value={edu.graduationYear}
                          onChange={(e) => handleEducationChange(index, 'graduationYear', e.target.value)}
                          required
                          min="1950"
                          max="2030"
                          className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addEducation}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  + Add Another Education
                </button>
              </div>

              {/* Skills & Interests Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Skills & Interests</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Professional Skills</label>
                    <textarea
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      required
                      minLength={10}
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="List your key professional skills..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Areas of Interest</label>
                    <textarea
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      required
                      minLength={10}
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="What areas are you most interested in contributing to?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Committees</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {committees.map((committee) => (
                        <div key={committee} className="flex items-center">
                          <input
                            type="checkbox"
                            id={committee}
                            value={committee}
                            checked={formData.preferredCommittees.includes(committee)}
                            onChange={(e) => {
                              const updatedCommittees = e.target.checked
                                ? [...formData.preferredCommittees, committee]
                                : formData.preferredCommittees.filter(c => c !== committee);
                              setFormData({
                                ...formData,
                                preferredCommittees: updatedCommittees
                              });
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={committee} className="ml-2 text-sm text-gray-700">
                            {committee}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability Per Week</label>
                    <select
                      name="availabilityPerWeek"
                      value={formData.availabilityPerWeek}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    >
                      <option value="">Select availability</option>
                      <option value="1-3">1-3 hours</option>
                      <option value="4-6">4-6 hours</option>
                      <option value="7-10">7-10 hours</option>
                      <option value="10+">10+ hours</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Resume Upload Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Resume Upload</h2>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-600">
                      {selectedFileName || "Drag and drop your resume here, or click to select a file"}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      PDF, DOC, or DOCX up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Additional Information</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Previous Non-Profit Experience</label>
                    <textarea
                      name="previousNonProfitExp"
                      value={formData.previousNonProfitExp}
                      onChange={handleChange}
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="Describe any previous experience with non-profit organizations..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Why do you want to join DMC?</label>
                    <textarea
                      name="reasonForJoining"
                      value={formData.reasonForJoining}
                      onChange={handleChange}
                      required
                      minLength={20}
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="Tell us why you'd like to join our organization..."
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="mentorshipInterest"
                        id="mentorshipInterest"
                        checked={formData.mentorshipInterest}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="mentorshipInterest" className="ml-2 block text-sm text-gray-700">
                        I'm interested in mentoring DMC members
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="boardInterest"
                        id="boardInterest"
                        checked={formData.boardInterest}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="boardInterest" className="ml-2 block text-sm text-gray-700">
                        I'm interested in board membership opportunities
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="volunteerInterest"
                        id="volunteerInterest"
                        checked={formData.volunteerInterest}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="volunteerInterest" className="ml-2 block text-sm text-gray-700">
                        I'm interested in volunteer opportunities
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default NonProfitSignup;