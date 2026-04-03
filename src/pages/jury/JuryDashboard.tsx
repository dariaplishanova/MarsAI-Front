import { useEffect, useState, useMemo } from 'react'; // Added useMemo
import { useTranslation } from 'react-i18next';
import FilmEvaluator from './components/FilmEvaluator';
import MobileSidebar from './components/MobileSidebar';
import SidebarContent from './components/SidebarContent';
import { useFetch } from '@/hooks/useFetch';

export default function JuryDashboard() {
  const { t } = useTranslation();
  
  const { data: films, isLoading, error } = useFetch<any[]>('/movies/jury');

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilmId, setActiveFilmId] = useState<string | null>(null);

  // 2. Safely filter and find films (check if films exists first)
  // We use useMemo for performance, but simple constants work too
  const filteredFilms = useMemo(() => {
    return (films || []).filter(f => 
      f.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [films, searchQuery]);

  const activeFilm = useMemo(() => {
    return (films || []).find(f => f.id.toString() === activeFilmId);
  }, [films, activeFilmId]);

  // 3. Set the first film as active when data arrives
  useEffect(() => {
    if (films && films.length > 0 && !activeFilmId) {
      setActiveFilmId(films[0].id.toString());
    }
  }, [films, activeFilmId]);

  const sidebarProps = {
    films: filteredFilms,
    activeFilmId,
    onSelectFilm: (id: string | number) => setActiveFilmId(id.toString()),
    setQuery: setSearchQuery,
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        {t('jury.dashboard.loading')}
      </div>
    );
  }

  if (error && (!films || films.length === 0)) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-destructive">
        {error}
      </div>
    );
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

        <div className="scrollbar flex-1 overflow-y-auto p-4 md:p-8">
          <FilmEvaluator film={activeFilm} />
        </div>
      </main>
    </div>
  );
}