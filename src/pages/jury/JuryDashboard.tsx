import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetch } from '@/hooks/useFetch';
import FilmEvaluator from './components/FilmEvaluator';
import MobileSidebar from './components/MobileSidebar';
import SidebarContent from './components/SidebarContent';

export default function JuryDashboard() {
  const { t } = useTranslation();

  const { data: films, isLoading, error } = useFetch<any[]>('/movies/jury');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilmId, setActiveFilmId] = useState<string | null>(null);

  const safeFilmsList = films || []; 

  const filteredFilms = safeFilmsList.filter((film) => 
    film.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeFilm = safeFilmsList.find((film) => 
    film.id.toString() === activeFilmId
  );

  useEffect(() => {
    if (safeFilmsList.length > 0 && activeFilmId === null) {
      setActiveFilmId(safeFilmsList[0].id.toString());
    }
  }, [safeFilmsList, activeFilmId]);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">{t('jury.dashboard.loading')}</div>;
  }

  if (error && safeFilmsList.length === 0) {
    return <div className="flex h-screen items-center justify-center text-destructive">{error}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      
      <aside className="hidden h-screen w-80 flex-col border-r border-border bg-card p-6 md:flex">
        <div className="mb-6 shrink-0">
          <h2 className="text-xl font-bold text-foreground">{t('jury.dashboard.title')}</h2>
          <p className="text-primary mt-1 text-sm">{t('jury.dashboard.subtitle')}</p>
        </div>
        
        <div className="min-h-0 flex-1 overflow-hidden">
          <SidebarContent 
            films={filteredFilms} 
            activeFilmId={activeFilmId} 
            onSelectFilm={setActiveFilmId} 
            setQuery={setSearchQuery} 
          />
        </div>
      </aside>

      <main className="flex flex-1 flex-col overflow-hidden">
        
        <header className="flex items-center justify-between border-b border-border bg-card p-4 md:hidden">
          <h1 className="text-lg font-bold text-foreground">{t('jury.dashboard.mobile_title')}</h1>
          <MobileSidebar 
            films={filteredFilms} 
            activeFilmId={activeFilmId} 
            onSelectFilm={setActiveFilmId} 
            setQuery={setSearchQuery} 
          />
        </header>

        <div className="scrollbar flex-1 overflow-y-auto p-4 md:p-8">
          <FilmEvaluator film={activeFilm} />
        </div>
        
      </main>
    </div>
  );
}