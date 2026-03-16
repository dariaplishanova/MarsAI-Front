import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FilmEvaluator from './components/FilmEvaluator';
import MobileSidebar from './components/MobileSidebar';
import SidebarContent from './components/SidebarContent';

export default function JuryDashboard() {
  const { t } = useTranslation();
  const [films, setFilms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilmId, setActiveFilmId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/movies/jury');
        const result = await response.json();

        if (result.success && result.data.length > 0) {
          setFilms(result.data);
          setActiveFilmId(result.data[0].id.toString());
        } else {
          setError(result.message || t('jury.dashboard.no_films_found'));
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(t('jury.dashboard.server_error'));
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [t]);

  const filteredFilms = films.filter(f => f.title?.toLowerCase().includes(searchQuery.toLowerCase()));
  const activeFilm = films.find(f => f.id.toString() === activeFilmId);

  const sidebarProps = {
    films: filteredFilms,
    activeFilmId,
    onSelectFilm: (id: string | number) => setActiveFilmId(id.toString()),
    setQuery: setSearchQuery,
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-background text-foreground">{t('jury.dashboard.loading')}</div>;
  }
  if (error && films.length === 0) {
    return <div className="flex h-screen items-center justify-center bg-background text-destructive">{error}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="hidden h-screen w-80 flex-col border-r border-border bg-card p-6 md:flex">
        <div className="mb-6 shrink-0">
          <h2 className="text-xl font-bold text-foreground">{t('jury.dashboard.title')}</h2>
          <p className="text-primary mt-1 text-sm">{t('jury.dashboard.subtitle')}</p>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">
          <SidebarContent {...sidebarProps} />
        </div>
      </aside>

      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-border bg-card p-4 md:hidden">
          <h1 className="text-lg font-bold text-foreground">{t('jury.dashboard.mobile_title')}</h1>
          <MobileSidebar {...sidebarProps} />
        </header>

        <div className="scrollbar flex-1 overflow-x-scroll p-4 md:p-8">
          <FilmEvaluator film={activeFilm} />
        </div>
      </main>
    </div>
  );
}