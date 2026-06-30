import { Card } from '@/components/ui/Card';
import { Users } from 'lucide-react';
import { FilmData } from '@/types/home';

type Props = {
  film: FilmData;
};

export default function FilmCollaborators({ film }: Props) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 border-b pb-3 mb-4">
        <Users className="size-5 text-primary" />
        <h3 className="font-bold">Team</h3>
      </div>

      {film.collaborators?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {film.collaborators.map((c) => (
            <div key={c.id} className="border rounded-xl p-4 bg-muted/20">
              <p className="font-semibold">
                {c.firstname} {c.lastname}
              </p>
              <p className="text-xs text-primary">
                {(c.job ?? '').toUpperCase()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {c.email}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No collaborators</p>
      )}
    </Card>
  );
}