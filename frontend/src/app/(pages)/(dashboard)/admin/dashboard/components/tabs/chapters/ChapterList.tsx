// components/tabs/chapters/ChapterList.tsx
import { ChapterApplication } from '../../../utils/types';
import ChapterCard from './ChapterCard';

interface ChapterListProps {
  chapters: ChapterApplication[];
  onMarkSeen: (id: string) => Promise<void>;
}

export default function ChapterList({ chapters, onMarkSeen }: ChapterListProps) {
  return (
    <div className="space-y-4">
      {chapters.map(chapter => (
        <ChapterCard
          key={chapter._id}
          chapter={chapter}
          onMarkSeen={onMarkSeen}
        />
      ))}
    </div>
  );
}