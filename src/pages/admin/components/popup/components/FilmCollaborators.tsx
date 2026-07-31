import { Users } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { FilmData } from '@/types/home';

type Props = {
  film: FilmData;
};

export default function FilmCollaborators({ film }: Props) {
  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center gap-2 border-b pb-3">
        <Users className="text-primary size-5" />
        <h3 className="font-bold">Team</h3>
      </div>

      {film.collaborators?.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {film.collaborators.map(c => (
            <div key={c.id} className="bg-muted/20 rounded-xl border p-4">
              <p className="font-semibold">
                {c.firstname} {c.lastname}
              </p>
              <p className="text-primary text-xs">{(c.job ?? '').toUpperCase()}</p>
              <p className="text-muted-foreground mt-1 text-xs">{c.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">No collaborators</p>
      )}
    </Card>
  );
}
