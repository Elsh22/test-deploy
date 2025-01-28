// components/tabs/nonprofits/NonProfitCard.tsx
import { formatDate } from '../../../utils/helpers';
import { DMCNonProfit } from '../../../utils/types';
import { TimedStatusBadge } from '../../shared/StatusBadge';
import MarkSeenButton from '../../actions/MarkSeenButton';
import { Download } from 'lucide-react';
import { 
  User, Mail, Phone, Building2, Briefcase, Clock, 
  GraduationCap, BookOpen, Heart, Link as LinkIcon 
} from 'lucide-react';

interface NonProfitCardProps {
  nonprofit: DMCNonProfit;
  onMarkSeen: (id: string) => Promise<void>;
  onDownloadResume: (fileId: string, name: string) => Promise<void>;
}

export default function NonProfitCard({ 
  nonprofit, 
  onMarkSeen,
  onDownloadResume 
}: NonProfitCardProps) {
  const availabilityColor = {
    '1-3': 'text-yellow-600',
    '4-6': 'text-blue-600',
    '7-10': 'text-purple-600',
    '10+': 'text-green-600'
  }[nonprofit.availabilityPerWeek] || 'text-gray-600';

  const handleDownload = async () => {
    if (nonprofit.resume) {
      const fileName = `${nonprofit.lastName}_${nonprofit.firstName}`;
      await onDownloadResume(nonprofit.resume, fileName);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-xl font-medium">
            {nonprofit.firstName} {nonprofit.lastName}
          </h3>
          <p className="text-gray-600">{nonprofit.jobTitle} at {nonprofit.company}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <TimedStatusBadge date={nonprofit.date} seen={nonprofit.seen} />
          <MarkSeenButton
            id={nonprofit._id}
            type="nonprofits"
            seen={nonprofit.seen}
            onMarkSeen={() => onMarkSeen(nonprofit._id)}
          />
        </div>
      </div>

      {/* Contact and Basic Info */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="h-4 w-4" />
            <a href={`mailto:${nonprofit.email}`} className="text-blue-500 hover:text-blue-600">
              {nonprofit.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="h-4 w-4" />
            <span>{nonprofit.phone}</span>
          </div>
          {nonprofit.linkedIn && (
            <div className="flex items-center gap-2 text-gray-600">
              <LinkIcon className="h-4 w-4" />
              <a 
                href={nonprofit.linkedIn} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                LinkedIn Profile
              </a>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <Briefcase className="h-4 w-4" />
            <span>{nonprofit.yearsOfExperience} years of experience</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className={`font-medium ${availabilityColor}`}>
              {nonprofit.availabilityPerWeek} hours/week availability
            </span>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="mt-6">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-gray-500" />
          Education
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nonprofit.education.map((edu, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-md">
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              <p className="text-sm text-gray-500">
                {edu.fieldOfStudy} • {edu.graduationYear}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills and Interests */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-gray-500" />
            Skills
          </h4>
          <p className="text-gray-600">{nonprofit.skills}</p>
        </div>
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Heart className="h-5 w-5 text-gray-500" />
            Interests
          </h4>
          <p className="text-gray-600">{nonprofit.interests}</p>
        </div>
      </div>

      {/* Previous Experience and Motivation */}
      <div className="mt-6 space-y-4">
        {nonprofit.previousNonProfitExp && (
          <div>
            <h4 className="font-medium mb-2">Previous Non-Profit Experience</h4>
            <p className="text-gray-600 whitespace-pre-wrap">{nonprofit.previousNonProfitExp}</p>
          </div>
        )}
        <div>
          <h4 className="font-medium mb-2">Reason for Joining</h4>
          <p className="text-gray-600 whitespace-pre-wrap">{nonprofit.reasonForJoining}</p>
        </div>
      </div>

      {/* Committee Preferences */}
      <div className="mt-6">
        <h4 className="font-medium mb-2">Preferred Committees</h4>
        <div className="flex flex-wrap gap-2">
          {nonprofit.preferredCommittees.map((committee, index) => (
            <span 
              key={index}
              className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
            >
              {committee}
            </span>
          ))}
        </div>
      </div>

      {/* Resume Download and Footer */}
      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Submitted on {formatDate(nonprofit.date)}
          </div>
          {nonprofit.resume && (
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </button>
          )}
        </div>
      </div>
    </div>
  );
}