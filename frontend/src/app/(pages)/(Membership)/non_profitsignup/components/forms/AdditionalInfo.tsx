import React from 'react';
import FormSection from '../shared/FormSection';
import InputField from '../shared/InputField';
import { NonProfitFormData } from '../../types/types';

interface AdditionalInfoProps {
  formData: NonProfitFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ formData, handleChange }) => {
  return (
    <FormSection title="Additional Information">
      <div className="grid grid-cols-1 gap-6">
        <InputField
          label="Previous Non-Profit Experience"
          name="previousNonProfitExp"
          value={formData.previousNonProfitExp}
          onChange={handleChange}
          type="textarea"
          rows={3}
          placeholder="Describe any previous experience with non-profit organizations..."
        />

        <InputField
          label="Why do you want to join DMC?"
          name="reasonForJoining"
          value={formData.reasonForJoining}
          onChange={handleChange}
          type="textarea"
          required
          minLength={20}
          rows={3}
          placeholder="Tell us why you'd like to join our organization..."
        />

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
    </FormSection>
  );
};

export default AdditionalInfo;