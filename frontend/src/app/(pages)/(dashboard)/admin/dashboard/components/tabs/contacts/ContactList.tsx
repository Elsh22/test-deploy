// components/tabs/contacts/ContactList.tsx
import { Contact } from '../../../utils/types';
import ContactCard from './ContactCard';

interface ContactListProps {
  contacts: Contact[];
  onMarkSeen: (id: string) => Promise<void>;
}

export default function ContactList({ contacts, onMarkSeen }: ContactListProps) {
  return (
    <div className="space-y-4">
      {contacts.map(contact => (
        <ContactCard
          key={contact._id}
          contact={contact}
          onMarkSeen={onMarkSeen}
        />
      ))}
    </div>
  );
}
