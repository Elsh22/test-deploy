// components/tabs/chapters/ChapterCard.tsx
import { formatDate } from '../../../utils/helpers';
import { ChapterApplication } from '../../../utils/types';
import { TimedStatusBadge } from '../../shared/StatusBadge';
import MarkSeenButton from '../../actions/MarkSeenButton';
import { Building, MapPin, User, Mail } from 'lucide-react';

interface ChapterCardProps {
  chapter: ChapterApplication;
  onMarkSeen: (id: string) => Promise<void>;
}

export default function ChapterCard({ chapter, onMarkSeen }: ChapterCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium">{chapter.chapterName}</h3>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <MapPin className="h-4 w-4" />
            <p className="text-sm">{chapter.institution}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <TimedStatusBadge date={chapter.date} seen={chapter.seen} />
          <MarkSeenButton
            id={chapter._id}
            type="chapters"
            seen={chapter.seen}
            onMarkSeen={() => onMarkSeen(chapter._id)}
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <User className="h-4 w-4" />
          <span>Primary Contact:</span>
          <span className="font-medium">{chapter.primaryContact}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="h-4 w-4" />
          <span>Contact Email:</span>
          <a 
            href={`mailto:${chapter.email}`}
            className="text-blue-500 hover:text-blue-600"
          >
            {chapter.email}
          </a>
        </div>
      </div>

      {/* Additional Details */}
      {chapter.message && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Additional Information</h4>
          <p className="text-gray-600 whitespace-pre-wrap">{chapter.message}</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Submitted on {formatDate(chapter.date)}</span>
          <span>Application ID: {chapter._id}</span>
        </div>
      </div>
    </div>
  );
}