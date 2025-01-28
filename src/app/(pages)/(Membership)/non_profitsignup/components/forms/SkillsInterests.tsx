import React from 'react';
import FormSection from '../shared/FormSection';
import InputField from '../shared/InputField';
import { NonProfitFormData } from '../../types/types';

interface SkillsInterestsProps {
  formData: NonProfitFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const committees = [
  "Academic Committee",
  "Professional Development",
  "Community Service",
  "Events & Programming",
  "Marketing & Communications",
  "Membership & Recruitment",
  "Technology & Innovation"
];

const SkillsInterests: React.FC<SkillsInterestsProps> = ({ formData, handleChange }) => {
  return (
    <FormSection title="Skills & Interests">
      <div className="space-y-6">
        <InputField
          label="Professional Skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          type="textarea"
          required
          minLength={10}
          rows={3}
          placeholder="List your key professional skills..."
        />

        <InputField
          label="Areas of Interest"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          type="textarea"
          required
          minLength={10}
          rows={3}
          placeholder="What areas are you most interested in contributing to?"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Committees
          </label>
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
                      : formData.preferredCommittees.filter((c: string) => c !== committee);
                    handleChange({
                      target: {
                        name: 'preferredCommittees',
                        value: updatedCommittees
                      }
                    } as any);
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Availability Per Week
          </label>
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
    </FormSection>
  );
};

export default SkillsInterests;