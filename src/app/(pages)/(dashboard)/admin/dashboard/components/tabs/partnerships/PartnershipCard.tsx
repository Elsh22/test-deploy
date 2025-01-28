// components/tabs/partnerships/PartnershipCard.tsx
import { formatDate } from '../../../utils/helpers';
import { Partnership } from '../../../utils/types';
import { TimedStatusBadge } from '../../shared/StatusBadge';
import MarkSeenButton from '../../actions/MarkSeenButton';
import { Building2, User, Mail, PieChart, Users } from 'lucide-react';

interface PartnershipCardProps {
  partnership: Partnership;
  onMarkSeen: (id: string) => Promise<void>;
}

export default function PartnershipCard({ partnership, onMarkSeen }: PartnershipCardProps) {
  const interestTypeColor = partnership.partnershipInterest === 'financial' 
    ? 'text-green-500' 
    : 'text-purple-500';
  const interestIcon = partnership.partnershipInterest === 'financial' 
    ? PieChart 
    : Users;
  const InterestIconComponent = interestIcon;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium">{partnership.organizationName}</h3>
          </div>
          <div className="flex items-center gap-2">
            <InterestIconComponent className={`h-4 w-4 ${interestTypeColor}`} />
            <span className={`text-sm font-medium ${interestTypeColor} capitalize`}>
              {partnership.partnershipInterest} Partnership
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <TimedStatusBadge date={partnership.date} seen={partnership.seen} />
          <MarkSeenButton
            id={partnership._id}
            type="partnerships"
            seen={partnership.seen}
            onMarkSeen={() => onMarkSeen(partnership._id)}
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <User className="h-4 w-4" />
            <span>Contact Person:</span>
            <span className="font-medium">{partnership.contactPerson}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="h-4 w-4" />
            <a 
              href={`mailto:${partnership.email}`}
              className="text-blue-500 hover:text-blue-600"
            >
              {partnership.email}
            </a>
          </div>
        </div>
      </div>

      {/* Partnership Message */}
      <div className="mt-4">
        <h4 className="font-medium mb-2">Partnership Details</h4>
        <p className="text-gray-600 whitespace-pre-wrap">{partnership.message}</p>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Submitted on {formatDate(partnership.date)}</span>
          <span>Partnership ID: {partnership._id}</span>
        </div>
      </div>
    </div>
  );
}