import { useTranslation } from 'react-i18next';
import { Users } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { FilmData } from '@/types/home';

export const CollaboratorSection = ({ film }: { film: FilmData }) => {
  const { t } = useTranslation();

  return (
    <Card variant="dashboard" className="shadow-sm">
      <div className='text-primary flex items-center gap-2 mb-1'>
        <Users className="size-5" />
        <h2 className='font-semibold text-lg text-foreground'>Film Equip</h2>
      </div>
      {film.collaborators && film.collaborators.length > 0 ? (
        <div>
          {film.collaborators.map(collab => (
            <div key={collab.id}>
              <p>
                {collab.firstname} {collab.lastname}
              </p>
              <p>{collab.job}</p>
              <p>{collab.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p> no collaborator</p>
      )}
    </Card>
  );
};
