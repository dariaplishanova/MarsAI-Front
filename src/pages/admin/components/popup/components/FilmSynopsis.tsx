import { Card } from '@/components/ui/Card';
import { AlignLeft } from 'lucide-react';
import { FilmData } from '@/types/home';

type Props = {
  film: FilmData;
};

export default function FilmSynopsis({ film }: Props) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 border-b pb-2 text-muted-foreground">
        <AlignLeft size={16} />
        <h3 className="text-sm font-semibold uppercase">Synopsis</h3>
      </div>

      <p className="mt-2 text-sm">
        {film.synopsis || 'No synopsis provided.'}
      </p>
    </Card>
  );
}