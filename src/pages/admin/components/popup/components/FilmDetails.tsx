import { Calendar, Clock, Globe, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { FilmData } from '@/types/home';

type Props = {
  film: FilmData;
};

export default function FilmDetails({ film }: Props) {
  return (
    <div className="bg-muted/20 grid grid-cols-1 gap-4 rounded-xl border p-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex items-center gap-2 text-sm">
        <Clock className="text-muted-foreground size-4" />
        <div>
          <span className="text-muted-foreground text-xs">Duration</span>
          <p className="font-medium">{film.duration} min</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Globe className="text-muted-foreground size-4" />
        <div>
          <span className="text-muted-foreground text-xs">Language</span>
          <p className="font-medium">{film.language || '---'}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <MapPin className="text-muted-foreground size-4" />
        <div>
          <span className="text-muted-foreground text-xs">Country</span>
          <p className="font-medium">{film.country || '---'}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Calendar className="text-muted-foreground size-4" />
        <div>
          <span className="text-muted-foreground text-xs">Release</span>
          <p className="font-medium">{film.release_date ? new Date(film.release_date).toLocaleDateString() : '---'}</p>
        </div>
      </div>
    </div>
  );
}
