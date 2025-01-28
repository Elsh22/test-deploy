import React from 'react';
import { Check } from 'lucide-react';

interface SuccessMessageProps {
  title?: string;
  message?: string;
  onClose?: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  title = "Thank You for Your Application!",
  message = "We've received your application to join the DMC Non-Profit network. Our team will review your information and contact you soon about next steps.",
  onClose
}) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-green-100 rounded-full p-2">
          <Check className="h-8 w-8 text-green-600" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-green-800 mb-3">
        {title}
      </h3>
      <p className="text-green-700 mb-6">
        {message}
      </p>
      {onClose && (
        <button
          onClick={onClose}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                   transition-colors duration-200"
        >
          Close
        </button>
      )}
    </div>
  );
};

export default SuccessMessage;