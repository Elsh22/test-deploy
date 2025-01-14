// components/tabs/events/EventList.tsx
import { EventSuggestion } from '../../../utils/types';
import EventCard from './EventsCard';

interface EventListProps {
  events: EventSuggestion[];
  onMarkSeen: (id: string) => Promise<void>;
}

export default function EventList({ events, onMarkSeen }: EventListProps) {
  // Sort events by proposed date
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.proposedDate).getTime() - new Date(b.proposedDate).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedEvents.map(event => (
        <EventCard
          key={event._id}
          event={event}
          onMarkSeen={onMarkSeen}
        />
      ))}
    </div>
  );
}