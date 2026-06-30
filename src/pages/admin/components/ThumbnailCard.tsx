import { ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useTranslation } from 'react-i18next';

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
      <div className="mb-4 flex items-center gap-2 text-primary">
        <ImageIcon className="size-5" />
        <h3 className="text-lg font-semibold text-foreground">
          {t('jury.thumbnail.title', 'Thumbnail')}
        </h3>
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        <img
          src={thumbnail}
          alt={t('jury.thumbnail.alt', 'Film thumbnail')}
          className="w-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => window.open(thumbnail, '_blank')}
        />
      </div>
    </Card>
  );
}