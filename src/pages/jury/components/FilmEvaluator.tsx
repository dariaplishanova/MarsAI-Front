import { useTranslation } from 'react-i18next';
import { FilmData } from '@/types/home';
import AiIdentityCard from './AiIdentityCard';
import RatingForm from './RatingForm';
import VideoPlayer from './VideoPlayer';
import ImageGallery from './ImageGallery';

export default function FilmEvaluator({ film }: { film: FilmData | undefined }) {
  const { t } = useTranslation();

  if (!film) {
    return <div className="text-muted-foreground flex h-full items-center justify-center">{t('jury.evaluator.select_film')}</div>;
  }
  
  const realImages = film.gallery_urls ? film.gallery_urls.split(',') : [];
  
  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20">
      <VideoPlayer film={film} />
      <ImageGallery images={realImages} />
      <AiIdentityCard film={film} />
      <RatingForm filmId={film.id} />
    </div>
  );
}