// utils/formValidation.ts
import { NonProfitFormData } from '../types/types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateZipCode = (zipCode: string): boolean => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

export const validateLinkedIn = (url: string): boolean => {
  const linkedInRegex = /^(https?:\/\/)?([\w\d-]+\.)*linkedin\.com\/\S*$/;
  return linkedInRegex.test(url);
};

export const validateWebsite = (url: string): boolean => {
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
  return urlRegex.test(url);
};

export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.'
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size too large. Maximum size is 5MB.'
    };
  }

  return { isValid: true };
};

export const validateFormData = (formData: NonProfitFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Personal Information validation
  if (!formData.firstName || formData.firstName.length < 2) {
    errors.push('First name must be at least 2 characters long');
  }
  if (!formData.lastName || formData.lastName.length < 2) {
    errors.push('Last name must be at least 2 characters long');
  }
  if (!validateEmail(formData.email)) {
    errors.push('Invalid email address');
  }
  if (!validatePhone(formData.phone)) {
    errors.push('Invalid phone number');
  }
  if (!validateZipCode(formData.zipCode)) {
    errors.push('Invalid ZIP code');
  }

  // Professional Information validation
  if (!formData.company) {
    errors.push('Company/Organization is required');
  }
  if (!formData.jobTitle) {
    errors.push('Job Title is required');
  }
  if (formData.linkedIn && !validateLinkedIn(formData.linkedIn)) {
    errors.push('Invalid LinkedIn URL');
  }
  if (formData.personalWebsite && !validateWebsite(formData.personalWebsite)) {
    errors.push('Invalid website URL');
  }

  // Education validation
  if (formData.education.length === 0) {
    errors.push('At least one education entry is required');
  }
  formData.education.forEach((edu: { degree: any; institution: any; graduationYear: any; }, index: number) => {
    if (!edu.degree) errors.push(`Degree is required for education entry ${index + 1}`);
    if (!edu.institution) errors.push(`Institution is required for education entry ${index + 1}`);
    if (!edu.graduationYear) errors.push(`Graduation year is required for education entry ${index + 1}`);
  });

  // Skills & Interests validation
  if (!formData.skills || formData.skills.length < 10) {
    errors.push('Professional skills must be at least 10 characters long');
  }
  if (!formData.interests || formData.interests.length < 10) {
    errors.push('Areas of interest must be at least 10 characters long');
  }
  if (!formData.availabilityPerWeek) {
    errors.push('Please select your availability per week');
  }

  // Resume validation
  if (!formData.resume) {
    errors.push('Please upload your resume');
  }

  // Additional Information validation
  if (!formData.reasonForJoining || formData.reasonForJoining.length < 20) {
    errors.push('Please provide a reason for joining (minimum 20 characters)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};