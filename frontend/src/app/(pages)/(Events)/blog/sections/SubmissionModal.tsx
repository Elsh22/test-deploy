"use client";
import { ChevronRight, Mail } from 'lucide-react';

interface SubmissionModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const SubmissionModal = ({ showModal, setShowModal }: SubmissionModalProps) => {
  if (!showModal) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowModal(false)}
    >
      <div 
        className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold mb-6">Submission Guidelines</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Content Requirements</h4>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                <span>Article length should be between 1000-2000 words</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                <span>Include high-quality images or media (minimum 1200x800px)</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                <span>Content must be original and not published elsewhere</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                <span>Focus on practical insights, experiences, or impact stories</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Topic Guidelines</h4>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                <span>DMC impact stories and success cases</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                <span>Community development and engagement experiences</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                <span>Educational initiatives and outcomes</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                <span>Partnership and collaboration insights</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Submission Process</h4>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <p className="text-gray-600">Email your submission to:</p>
              <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="font-medium">submissions@dmc.org</span>
              </div>
              <p className="text-gray-600">Include in your email:</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Your full name and contact information</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Brief bio (2-3 sentences)</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Social media handles (if applicable)</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Article in Word or Google Doc format</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Review Process</h4>
            <p className="text-gray-600 mb-4">
              Our team will review your submission within 5-7 business days. If selected, we'll work
              with you to prepare your content for publication on our blog.
            </p>
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;