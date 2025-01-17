import React from 'react';
import { Upload } from 'lucide-react';
import FormSection from '../shared/FormSection';
import { NonProfitFormData } from '../../types/types';

interface ResumeUploadProps {
  formData: NonProfitFormData;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFileName: string;
  error?: string;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({
  formData,
  handleFileChange,
  selectedFileName,
  error
}) => {
  return (
    <FormSection title="Resume Upload">
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6">
        <input
          type="file"
          name="resume"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Upload resume"
        />
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {selectedFileName || "Drag and drop your resume here, or click to select a file"}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            PDF, DOC, or DOCX up to 5MB
          </p>
          {formData.resume && (
            <p className="mt-2 text-sm text-green-600">
              File selected: {selectedFileName}
            </p>
          )}
          {error && (
            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>
    </FormSection>
  );
};

export default ResumeUpload;