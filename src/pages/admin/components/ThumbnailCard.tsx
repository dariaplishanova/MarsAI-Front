import { useTranslation } from 'react-i18next';
import { ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';

type Props = {
  thumbnail?: string;
};

export default function ThumbnailCard({ thumbnail }: Props) {
  const { t } = useTranslation();

  if (!thumbnail) {
    return null;
  }

  return (
    <Card variant="dashboard" className="mt-6 shadow-sm">
      <div className="text-primary mb-4 flex items-center gap-2">
        <ImageIcon className="size-5" />
        <h3 className="text-foreground text-lg font-semibold">{t('jury.thumbnail.title', 'Thumbnail')}</h3>
      </div>

      <div className="border-border overflow-hidden rounded-lg border">
        <img
          src={thumbnail}
          alt={t('jury.thumbnail.alt', 'Film thumbnail')}
          className="w-full cursor-pointer object-cover transition-transform duration-300 hover:scale-105"
          onClick={() => window.open(thumbnail, '_blank')}
        />
      </div>
    </Card>
  );
}
