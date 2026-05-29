import { useTranslation } from 'react-i18next';
import Popup from '@/components/ui/Popup';
import AiIdentityCard from '@/pages/jury/components/AiIdentityCard';
import ImageGallery from '@/pages/jury/components/ImageGallery';
import VideoPlayer from '@/pages/jury/components/VideoPlayer';
import { AdminFilmPopupProps } from '@/types/admin';
import { Card } from '@/components/ui/Card';
import { CollaboratorSection } from './CollaboratorSection';

export default function AdminFilmPopup({ open, onClose, film }: AdminFilmPopupProps) {
  const { t } = useTranslation();

  if (!film) return null;

  const realImages = film.gallery_urls ? film.gallery_urls.split(',') : [];

  return (
    <Popup open={open} onClose={onClose} className="md:max-w-5xl">
      <div className="flex h-[80vh] flex-col gap-8 overflow-y-auto pr-4">
        <VideoPlayer film={film} />
        <AiIdentityCard film={film} />
        <ImageGallery images={realImages} />
        <CollaboratorSection film={film} />

        <Card>
          <p className="text-foreground mb-4 my-4 mx-4 text-xl font-bold">{t('admin.collaborators.title', 'Équipe du film')}</p>

          {film.collaborators && film.collaborators.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {film.collaborators.map(collab => (
                <div key={collab.id} className="bg-muted/30 rounded-b-2xl border p-4">
                  <p className="text-foreground font-semibold">
                    {collab.firstname} {collab.lastname}
                  </p>
                  <p className="text-accent-burgundy text-sm">{collab.job}</p>
                  <a href={`mailto:${collab.email}`} className="text-primary text-sm hover:underline">
                    {collab.email}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">Aucun collaborateur renseigné.</p>
          )}
        </Card>

        <div className="border-border border-t pt-6">
          <h3 className="text-foreground mb-4 flex items-center gap-2 text-xl font-bold">
            {t('admin.evaluations.title', 'Évaluations du Jury')}
            <span className="bg-primary/20 text-primary rounded-full px-2 py-1 text-sm">
              {film.ratings ? film.ratings.length : 0}
            </span>
          </h3>

          {film.ratings && film.ratings.length > 0 ? (
            <div className="space-y-4">
              {film.ratings.map(rating => (
                <div key={rating.id} className="border-border bg-muted/10 rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-foreground font-semibold">
                      {rating.jury_firstname} {rating.jury_lastname}
                    </p>
                    <div className="flex gap-3 text-sm font-medium">
                      <span title="Créativité">{rating.score_creativity}/10</span>
                      <span title="Technique">{rating.score_technical}/10</span>
                      <span title="Message">{rating.score_message}/10</span>
                    </div>
                  </div>
                  {rating.comment ? (
                    <p className="text-muted-foreground mt-2 text-sm italic">"{rating.comment}"</p>
                  ) : (
                    <p className="text-muted-foreground/50 mt-2 text-sm">Aucun commentaire.</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">Le jury n'a pas encore évalué ce film.</p>
          )}
        </div>
      </div>
    </Popup>
  );
}
