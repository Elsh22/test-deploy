// components/tabs/partnerships/PartnershipList.tsx
import { Partnership } from '../../../utils/types';
import PartnershipCard from './PartnershipCard';

interface PartnershipListProps {
  partnerships: Partnership[];
  onMarkSeen: (id: string) => Promise<void>;
}

export default function PartnershipList({ partnerships, onMarkSeen }: PartnershipListProps) {
  // Sort partnerships by date and priority (financial first)
  const sortedPartnerships = [...partnerships].sort((a, b) => {
    if (a.partnershipInterest !== b.partnershipInterest) {
      return a.partnershipInterest === 'financial' ? -1 : 1;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-4">
      {sortedPartnerships.map(partnership => (
        <PartnershipCard
          key={partnership._id}
          partnership={partnership}
          onMarkSeen={onMarkSeen}
        />
      ))}
    </div>
  );
}