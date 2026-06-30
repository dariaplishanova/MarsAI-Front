import { useTranslation } from 'react-i18next';
import Popup from '@/components/ui/Popup';
import AiIdentityCard from '@/pages/jury/components/AiIdentityCard';
import { AdminFilmPopupProps } from '@/types/admin';
import FilmCollaborators from './components/FilmCollaborators';
import FilmDetails from './components/FilmDetails';
import FilmHeader from './components/FilmHeader';
import FilmMediaSection from './components/FilmMediaSection';
import FilmStats from './components/FilmStats';
import FilmSynopsis from './components/FilmSynopsis';
import FilmRatings from './components/FilmRating';

export default function AdminFilmPopup({ open, onClose, film }: AdminFilmPopupProps) {
  if (!film) return null;

  return (
    <Popup open={open} onClose={onClose} className="max-w-full md:max-w-5xl">
      <div className="text-foreground flex h-[85vh] flex-col gap-6 overflow-y-auto pr-2">
        <FilmHeader film={film} />
        <FilmStats film={film} />
        <FilmDetails film={film} />
        <FilmSynopsis film={film} />
        <AiIdentityCard film={film} />
        <FilmMediaSection film={film} />
        <FilmCollaborators film={film} />
        <FilmRatings film={film} />
      </div>
    </Popup>
  );
}
