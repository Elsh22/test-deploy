// components/tabs/contacts/ContactCard.tsx
import { formatDate } from '../../../utils/helpers';
import { Contact } from '../../../utils/types';
import { TimedStatusBadge } from '../../shared/StatusBadge';
import MarkSeenButton from '../../actions/MarkSeenButton';

interface ContactCardProps {
  contact: Contact;
  onMarkSeen: (id: string) => Promise<void>;
}

export default function ContactCard({ contact, onMarkSeen }: ContactCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">{contact.fullname}</h3>
          <p className="text-sm text-gray-500">{contact.email}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <TimedStatusBadge date={contact.date} seen={contact.seen} />
          <MarkSeenButton
            id={contact._id}
            type="contacts"
            seen={contact.seen}
            onMarkSeen={() => onMarkSeen(contact._id)}
          />
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium mb-2">{contact.subject}</h4>
        <p className="text-gray-600 whitespace-pre-wrap">{contact.message}</p>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        Submitted on {formatDate(contact.date)}
      </div>
    </div>
  );
}