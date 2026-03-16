import { FilmWithDirector } from '@/types/home';
import Popup from './ui/Popup';

interface FilmPopupProps {
  film: FilmWithDirector | null;
  open: boolean;
  onClose: () => void;
}

export default function FilmPopup({ open, onClose, film }: FilmPopupProps) {

  if (!film) return null;

  return (
    <Popup open={open} onClose={onClose} className="md:max-w-4xl">
      <div className="mb-6 pr-8">
        <h2 className="text-primary mb-1 text-3xl font-bold">{film.title}</h2>
        <p className="text-muted-foreground mt-2 mb-3 text-lg font-medium">
          {`${film.director_firstname} ${film.director_lastname}`}
        </p>
      </div>

      <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg border border-border">
        <video 
          controls 
          controlsList="nodownload"
          className="absolute inset-0 h-full w-full object-contain"
          src={film.video_url} 
          poster={film.thumbnail_url} 
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </Popup>
  );
}