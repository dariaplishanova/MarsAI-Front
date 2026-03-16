import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/button';
import { FormGroup, Label, TextArea } from '@/components/ui/form';

export default function RatingForm({ filmId }: { filmId: string | number }) {
  const { t } = useTranslation();
  const [scores, setScores] = useState({ creativity: 1, technical: 1, narrative: 1 });
  const [comment, setComment] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const averageScore = Math.round((scores.creativity + scores.technical + scores.narrative) / 3);

  const handleSubmitRating = async () => {
    setIsSubmitting(true);
    setSubmitMessage(null);
    const API_URL = import.meta.env.VITE_API_URL;

    const payload = {
      user_id: 1,
      movie_id: Number(filmId),
      score_creativity: scores.creativity,
      score_technical: scores.technical,
      score_message: scores.narrative,
      comment: comment,
      score_total: averageScore,
    };

    try {
      const response = await fetch(`${API_URL}/rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      
      if (response.ok) {
        setSubmitMessage({ type: 'success', text: t('jury.rating.messages.success') });
      } else {
        setSubmitMessage({ type: 'error', text: data.message || t('jury.rating.messages.error_save') });
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      setSubmitMessage({ type: 'error', text: t('jury.rating.messages.error_server') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-border bg-card rounded-2xl border p-4 shadow-sm md:p-6">
      <div className="text-primary mb-6 flex items-center gap-2">
        <Star className="size-5" />
        <h2 className="text-foreground text-lg font-semibold">{t('jury.rating.title')}</h2>
      </div>

      <div className="border-border bg-muted/30 mb-10 rounded-xl border py-6 text-center">
        <p className="text-muted-foreground text-sm">{t('jury.rating.average_score')}</p>
        <div className="text-primary my-2 text-4xl font-bold">
          {averageScore} <span className="text-muted-foreground text-xl">/10</span>
        </div>
        <p className="text-muted-foreground text-xs">
          {t('jury.rating.score_breakdown', { 
            creativity: scores.creativity, 
            technical: scores.technical, 
            narrative: scores.narrative 
          })}
        </p>
      </div>

      <div className="space-y-10">
        {[
          {
            id: 'creativity',
            label: t('jury.rating.creativity.label'),
            desc: t('jury.rating.creativity.desc'),
          },
          {
            id: 'technical',
            label: t('jury.rating.technical.label'),
            desc: t('jury.rating.technical.desc'),
          },
          { 
            id: 'narrative', 
            label: t('jury.rating.narrative.label'), 
            desc: t('jury.rating.narrative.desc') 
          },
        ].map(slider => {
          const score = scores[slider.id as keyof typeof scores];
          const fillPercentage = ((score - 1) / 9) * 100;

          return (
            <div key={slider.id} className="space-y-3">
              <div className="flex items-end justify-between">
                <Label className="text-foreground text-base font-semibold">{slider.label}</Label>
                <span className="text-primary text-2xl font-bold">
                  {score} <span className="text-muted-foreground text-sm">/10</span>
                </span>
              </div>

              <div className="relative flex h-4 items-center">
                <div className="bg-muted absolute h-2 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full transition-all duration-150 ease-out"
                    style={{ width: `${fillPercentage}%` }}
                  />
                </div>

                <div
                  className="bg-primary shadow-primary/40 absolute h-4 w-4 rounded-full shadow-sm transition-all duration-150 ease-out"
                  style={{ left: `calc(${fillPercentage}% - 8px)` }}
                />

                <input
                  type="range"
                  min="1"
                  max="10"
                  value={score}
                  onChange={e => setScores({ ...scores, [slider.id]: Number(e.target.value) })}
                  className="absolute z-10 h-full w-full cursor-pointer opacity-0"
                />
              </div>

              <div>
                <div className="text-muted-foreground mb-1 flex justify-between text-xs">
                  <span>{t('jury.rating.scale.low')}</span>
                  <span className="text-primary font-medium">{t('jury.rating.scale.medium')}</span>
                  <span>{t('jury.rating.scale.high')}</span>
                </div>
                <p className="text-muted-foreground text-xs">{slider.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-border mt-10 border-t pt-6">
        <FormGroup>
          <Label className="text-foreground text-sm">{t('jury.rating.comments.label')}</Label>
          <TextArea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder={t('jury.rating.comments.placeholder')}
            className="mt-2 min-h-25"
          />
          <p className="text-muted-foreground mt-2 text-xs">{t('jury.rating.comments.hint')}</p>
        </FormGroup>

        {submitMessage && (
          <div className={`mt-4 rounded-md p-3 text-sm ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {submitMessage.text}
          </div>
        )}

        <Button 
          variant="purple" 
          onClick={handleSubmitRating}
          disabled={isSubmitting}
          className="mt-6 flex w-full items-center justify-center gap-2 py-3 disabled:opacity-50"
        >
          <Send className="size-4" /> 
          {isSubmitting ? t('jury.rating.buttons.submitting') : t('jury.rating.buttons.submit')}
        </Button>
      </div>
    </Card>
  );
}