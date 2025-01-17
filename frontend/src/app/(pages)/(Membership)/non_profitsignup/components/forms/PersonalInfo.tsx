import React from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import FormSection from '../shared/FormSection';
import InputField from '../shared/InputField';
import { NonProfitFormData } from '../../types/types';

interface PersonalInfoProps {
  formData: NonProfitFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ formData, handleChange }) => {
  return (
    <FormSection title="Personal Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={50}
          icon={User}
        />

        <InputField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={50}
          icon={User}
        />

        <InputField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          required
          pattern="^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$"
          icon={Mail}
        />

        <InputField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          type="tel"
          required
          pattern="^\+?[\d\s-]{10,}$"
          icon={Phone}
        />

        <InputField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          icon={MapPin}
        />

        <InputField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <InputField
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />

        <InputField
          label="ZIP Code"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
          pattern="^\d{5}(-\d{4})?$"
        />
      </div>
    </FormSection>
  );
};

export default PersonalInfo;