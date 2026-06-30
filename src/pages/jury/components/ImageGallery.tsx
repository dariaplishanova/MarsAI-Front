import { useTranslation } from 'react-i18next';
import { ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';

type Props = {
  images?: string[];
};

export default function ImageGallery({ images }: Props) {
  const { t } = useTranslation();

  // ✅ extra safety (handles undefined, null, wrong types)
  const safeImages: string[] = Array.isArray(images) ? images : [];

  if (safeImages.length === 0) {
    return null;
  }

  return (
    <Card variant="dashboard" className="mt-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-primary">
        <ImageIcon className="size-5" />
        <h3 className="text-lg font-semibold text-foreground">
          {t('jury.gallery.title')}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {safeImages.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="aspect-video overflow-hidden rounded-lg bg-black border border-border shadow-inner"
          >
            <img
              src={url}
              alt={t('jury.gallery.screenshot', { number: index + 1 })}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => window.open(url, '_blank')}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}