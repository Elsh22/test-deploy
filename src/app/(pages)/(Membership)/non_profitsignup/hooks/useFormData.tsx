import { useState, useCallback } from 'react';
import { NonProfitFormData, Education } from '../types/types';
import { validateFormData, validateFile } from '../utils/formValidation';

interface UseFormDataReturn {
  formData: NonProfitFormData;
  error: string;
  loading: boolean;
  submitted: boolean;
  selectedFileName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEducationChange: (index: number, field: keyof Education, value: string) => void;
  addEducation: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setError: (error: string) => void;
  resetForm: () => void;
}

const initialFormState: NonProfitFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  company: '',
  jobTitle: '',
  yearsOfExperience: '',
  linkedIn: '',
  personalWebsite: '',
  education: [{
    degree: '',
    institution: '',
    graduationYear: '',
    fieldOfStudy: ''
  }],
  skills: '',
  interests: '',
  availabilityPerWeek: '',
  preferredCommittees: [],
  resume: null,
  previousNonProfitExp: '',
  reasonForJoining: '',
  mentorshipInterest: false,
  boardInterest: false,
  volunteerInterest: false
};

export const useFormData = (): UseFormDataReturn => {
  const [formData, setFormData] = useState<NonProfitFormData>(initialFormState);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');

  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setError('');
    setSelectedFileName('');
    setSubmitted(false);
  }, []);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = validateFile(file);
      if (!validation.isValid) {
        setError(validation.error || 'Invalid file');
        return;
      }
      setFormData((prev) => ({ ...prev, resume: file }));
      setSelectedFileName(file.name);
      setError('');
    }
  }, []);

  const handleEducationChange = useCallback((index: number, field: keyof Education, value: string) => {
    setFormData((prev: NonProfitFormData) => {
      const newEducation = [...prev.education];
      newEducation[index] = {
        ...newEducation[index],
        [field]: value
      };
      return {
        ...prev,
        education: newEducation
      };
    });
  }, []);

  const addEducation = useCallback(() => {
    setFormData((prev: NonProfitFormData) => ({
      ...prev,
      education: [...prev.education, {
        degree: '',
        institution: '',
        graduationYear: '',
        fieldOfStudy: ''
      }]
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const validation = validateFormData(formData);
    if (!validation.isValid) {
      setError(validation.errors.join(', '));
      setLoading(false);
      return;
    }

    try {
      if (formData.resume) {
        const fileData = new FormData();
        fileData.append('file', formData.resume);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: fileData,
        });
        
        const uploadResult = await uploadResponse.json();
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'File upload failed');
        }

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
            }
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

  return {
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
    setError,
    resetForm
  };
};