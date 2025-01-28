// components/tabs/nonprofits/NonProfitList.tsx
import { DMCNonProfit } from '../../../utils/types';
import NonProfitCard from './NonProfitCard';

interface NonProfitListProps {
  nonprofits: DMCNonProfit[];
  onMarkSeen: (id: string) => Promise<void>;
  onDownloadResume: (fileId: string, name: string) => Promise<void>;
}

export default function NonProfitList({ 
  nonprofits, 
  onMarkSeen, 
  onDownloadResume 
}: NonProfitListProps) {
  // Sort by experience level and submission date
  const sortedNonprofits = [...nonprofits].sort((a, b) => {
    if (a.yearsOfExperience !== b.yearsOfExperience) {
      return b.yearsOfExperience - a.yearsOfExperience;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-6">
      {sortedNonprofits.map(nonprofit => (
        <NonProfitCard
          key={nonprofit._id}
          nonprofit={nonprofit}
          onMarkSeen={onMarkSeen}
          onDownloadResume={onDownloadResume}
        />
      ))}
    </div>
  );
}