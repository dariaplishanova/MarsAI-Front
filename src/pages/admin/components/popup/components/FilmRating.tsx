import { Card } from '@/components/ui/Card';
import { FilmData } from '@/types/home';

type Props = {
  film: FilmData;
};

export default function FilmRatings({ film }: Props) {
  return (
    <Card className="p-4">
      <h3 className="mb-3 font-bold">Jury Ratings ({film.ratings?.length ?? 0})</h3>

      {film.ratings?.length ? (
        <div className="space-y-4">
          {film.ratings.map((r, i) => (
            <div key={i} className="rounded-xl border p-4">
              <p className="font-semibold">
                {r.jury_firstname} {r.jury_lastname}
              </p>

              <p className="text-muted-foreground mt-2 text-xs">
                Creativity: {r.score_creativity}/10 · Technical: {r.score_technical}/10 · Message: {r.score_message}/10
              </p>

              {r.comment && <p className="text-muted-foreground mt-2 text-sm italic">"{r.comment}"</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">No ratings yet</p>
      )}
    </Card>
  );
}
