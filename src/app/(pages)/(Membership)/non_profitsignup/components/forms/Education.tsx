import React, { JSX } from 'react';
import { GraduationCap, Building2 } from 'lucide-react';
import FormSection from '../shared/FormSection';
import InputField from '../shared/InputField';
import { NonProfitFormData, Education as EducationType } from '../../types/types';

interface EducationProps {
  formData: NonProfitFormData;
  handleEducationChange: (index: number, field: keyof EducationType, value: string) => void;
  addEducation: () => void;
}

const Education: React.FC<EducationProps> = ({ 
  formData, 
  handleEducationChange, 
  addEducation 
}): JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <FormSection title="Educational Background">
      {formData.education.map((edu: EducationType, index: number) => (
        <div key={index} className="mb-6 py-4">
          {index > 0 && (
            <div className="border-t border-gray-200 mb-6" />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Degree/Certification"
              name={`education.${index}.degree`}
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
              required
              icon={GraduationCap}
            />

            <InputField
              label="Institution"
              name={`education.${index}.institution`}
              value={edu.institution}
              onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
              required
              icon={Building2}
            />

            <InputField
              label="Field of Study"
              name={`education.${index}.fieldOfStudy`}
              value={edu.fieldOfStudy}
              onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
              required
            />

            <InputField
              label="Graduation Year"
              name={`education.${index}.graduationYear`}
              value={edu.graduationYear}
              onChange={(e) => handleEducationChange(index, 'graduationYear', e.target.value)}
              type="number"
              required
              min="1950"
              max={(currentYear + 10).toString()}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addEducation}
        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2"
      >
        <span className="text-xl">+</span> Add Another Education
      </button>
    </FormSection>
  );
};

export default Education;