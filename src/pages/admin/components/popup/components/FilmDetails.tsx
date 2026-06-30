import { Card } from '@/components/ui/Card';
import { Clock, Globe, MapPin, Calendar } from 'lucide-react';
import { FilmData } from '@/types/home';

type Props = {
  film: FilmData;
};

export default function FilmDetails({ film }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 bg-muted/20 rounded-xl p-4 border">
      <div className="flex items-center gap-2 text-sm">
        <Clock className="size-4 text-muted-foreground" />
        <div>
          <span className="text-xs text-muted-foreground">Duration</span>
          <p className="font-medium">{film.duration} min</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Globe className="size-4 text-muted-foreground" />
        <div>
          <span className="text-xs text-muted-foreground">Language</span>
          <p className="font-medium">{film.language || '---'}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <MapPin className="size-4 text-muted-foreground" />
        <div>
          <span className="text-xs text-muted-foreground">Country</span>
          <p className="font-medium">{film.country || '---'}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Calendar className="size-4 text-muted-foreground" />
        <div>
          <span className="text-xs text-muted-foreground">Release</span>
          <p className="font-medium">
            {film.release_date
              ? new Date(film.release_date).toLocaleDateString()
              : '---'}
          </p>
        </div>
      </div>
    </div>
  );
}