import { useTranslation } from 'react-i18next';
import SearchBar from '@/components/ui/SearchBar';

interface SidebarContentProps {
  films: any[];
  activeFilmId: string | null;
  onSelectFilm: (id: string) => void;
  setQuery: (query: string) => void;
}

export default function SidebarContent({ films, activeFilmId, onSelectFilm, setQuery }: SidebarContentProps) {
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-col space-y-5 overflow-hidden">
      <div className="text-muted-foreground text-sm">{t('jury.sidebar.evaluated_count', { total: films.length })}</div>

      <div>
        <SearchBar setQuery={setQuery} className="border-border bg-background h-11 rounded-lg text-sm" />
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-2 pb-20 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {films.map(film => {
          const isActive = activeFilmId === film.id.toString();

          return (
            <button
              key={film.id}
              onClick={() => onSelectFilm(film.id.toString())}
              className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                isActive
                  ? 'border-primary bg-primary/10 shadow-primary/20 shadow-sm'
                  : 'hover:bg-muted border-transparent'
              }`}
            >
              <h3 className="text-foreground truncate text-lg font-semibold">{film.title}</h3>
              <p className="text-accent-burgundy mt-1 truncate text-sm">
                {`${film.director_firstname} ${film.director_lastname}`}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
