import React from 'react';
import { Building2, Briefcase, Clock, LinkIcon, Globe } from 'lucide-react';
import FormSection from '../shared/FormSection';
import InputField from '../shared/InputField';
import { NonProfitFormData } from '../../types/types';

interface ProfessionalInfoProps {
  formData: NonProfitFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ProfessionalInfo: React.FC<ProfessionalInfoProps> = ({ formData, handleChange }) => {
  return (
    <FormSection title="Professional Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Company/Organization"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          icon={Building2}
        />

        <InputField
          label="Job Title"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          required
          icon={Briefcase}
        />

        <InputField
          label="Years of Experience"
          name="yearsOfExperience"
          value={formData.yearsOfExperience}
          onChange={handleChange}
          type="number"
          required
          min="0"
          icon={Clock}
        />

        <InputField
          label="LinkedIn Profile"
          name="linkedIn"
          value={formData.linkedIn}
          onChange={handleChange}
          type="url"
          placeholder="https://linkedin.com/in/..."
          pattern="^(https?:\/\/)?([\w\d-]+\.)*linkedin\.com\/\S*$"
          icon={LinkIcon}
        />

        <InputField
          label="Personal Website"
          name="personalWebsite"
          value={formData.personalWebsite}
          onChange={handleChange}
          type="url"
          placeholder="https://..."
          pattern="^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$"
          icon={Globe}
        />
      </div>
    </FormSection>
  );
};

export default ProfessionalInfo;