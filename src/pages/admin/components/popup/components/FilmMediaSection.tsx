import ImageGallery from '@/pages/jury/components/ImageGallery';
import { FilmData } from '@/types/home';
import ThumbnailCard from '../../ThumbnailCard';
import VideoAdminPlayer from '../../VideoAdminPlayer';

type Props = {
  film: FilmData;
};

export default function FilmMediaSection({ film }: Props) {
  const images = film.gallery_urls ?? [];

  return (
    <div className="space-y-4">
      <VideoAdminPlayer film={film} />
      <ThumbnailCard thumbnail={film.thumbnail} />
      <ImageGallery images={images} />
    </div>
  );
}
