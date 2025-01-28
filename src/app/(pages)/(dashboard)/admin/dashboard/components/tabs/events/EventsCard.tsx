// components/tabs/events/EventCard.tsx
import { formatDate } from '../../../utils/helpers';
import { EventSuggestion } from '../../../utils/types';
import { TimedStatusBadge } from '../../shared/StatusBadge';
import MarkSeenButton from '../../actions/MarkSeenButton';
import { Calendar, User, Mail, MapPin, Clock, Users } from 'lucide-react';

interface EventCardProps {
  event: EventSuggestion;
  onMarkSeen: (id: string) => Promise<void>;
}

export default function EventCard({ event, onMarkSeen }: EventCardProps) {
  // Convert proposedDate to Date object for comparison
  const proposedDateObj = typeof event.proposedDate === 'number' 
    ? new Date(event.proposedDate)
    : new Date(event.proposedDate);
    
  const isUpcoming = proposedDateObj > new Date();

  // Helper function to safely format dates
  const safeFormatDate = (date: string | number | Date) => {
    if (!date) return 'Not specified';
    try {
      return formatDate(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className={`h-5 w-5 ${isUpcoming ? 'text-green-500' : 'text-gray-500'}`} />
            <h3 className="text-lg font-medium">{event.eventTitle}</h3>
          </div>
          {event.location && (
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="h-4 w-4" />
              <p className="text-sm">{event.location}</p>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <TimedStatusBadge date={event.date} seen={event.seen} />
          <MarkSeenButton
            id={event._id}
            type="events"
            seen={event.seen}
            onMarkSeen={() => onMarkSeen(event._id)}
          />
        </div>
      </div>

      {/* Event Details */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>Proposed Date:</span>
            <span className="font-medium">{safeFormatDate(event.proposedDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="h-4 w-4" />
            <span>Expected Attendance:</span>
            <span className="font-medium">{event.expectedAttendance || 'Not specified'}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <User className="h-4 w-4" />
            <span>Organizer Role:</span>
            <span className="font-medium">{event.yourRole}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="h-4 w-4" />
            <a 
              href={`mailto:${event.contactEmail}`}
              className="text-blue-500 hover:text-blue-600"
            >
              {event.contactEmail}
            </a>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-4">
        <h4 className="font-medium mb-2">Event Description</h4>
        <p className="text-gray-600 whitespace-pre-wrap">{event.description}</p>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Submitted on {safeFormatDate(event.date)}</span>
          <span>Event ID: {event._id}</span>
        </div>
      </div>
    </div>
  );
}