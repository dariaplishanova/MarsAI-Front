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
      <div className="text-primary mb-4 flex items-center gap-2">
        <ImageIcon className="size-5" />
        <h3 className="text-foreground text-lg font-semibold">{t('jury.gallery.title')}</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {safeImages.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="border-border aspect-video overflow-hidden rounded-lg border bg-black shadow-inner"
          >
            <img
              src={url}
              alt={t('jury.gallery.screenshot', { number: index + 1 })}
              className="h-full w-full cursor-pointer object-cover transition-transform duration-300 hover:scale-105"
              onClick={() => window.open(url, '_blank')}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
