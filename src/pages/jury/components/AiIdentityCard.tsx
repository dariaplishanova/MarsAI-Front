import { useTranslation } from 'react-i18next';
import { Brain } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { FilmData } from '@/types/home';

export default function AiIdentityCard({ film }: { film: FilmData }) {
  const { t } = useTranslation();

  return (
    <Card variant="dashboard" className="shadow-sm">
      <div className="text-primary mb-1 flex items-center gap-2">
        <Brain className="size-5" />
        <h2 className="text-lg font-semibold text-foreground">{t('jury.ai_card.title')}</h2>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">{t('jury.ai_card.subtitle')}</p>

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {[
          {
            label: t('jury.ai_card.classification_type'),
            value: film.ia_type === '100' ? t('jury.ai_card.100_ai') : film.ia_type === 'hybrid' ? t('jury.ai_card.hybrid') : film.ia_type,
            active: !!film.ia_type,
          },
          {
            label: t('jury.ai_card.tools_used'),
            value: film.ai_tools || film.stack || t('jury.ai_card.not_provided'),
            active: !!film.ai_tools || (!!film.stack && film.stack.trim() !== ''),
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`rounded-xl border p-4 transition-colors ${
              item.active ? 'border-primary/50 bg-primary/5' : 'border-border bg-muted/30'
            }`}
          >
            <span className="mb-1 block text-xs text-muted-foreground">{item.label}</span>
            <span className={`text-sm font-medium ${item.active ? 'text-foreground' : 'text-muted-foreground'}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <Card variant="dashboard" className="rounded-xl border border-border bg-muted/30 p-4 shadow-none">
        <span className="mb-2 block text-xs text-muted-foreground">{t('jury.ai_card.methodology')}</span>
        <p className="text-sm leading-relaxed text-foreground">
          {film.methodology || t('jury.ai_card.no_methodology')}
        </p>
      </Card>
    </Card>
  );
}