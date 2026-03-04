import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Film, Image as ImageIcon } from 'lucide-react';
import { ErrorParagraph, FormGroup, Input, Label, TextArea } from '@/components/ui/form';
import { FilmSubmissionData } from '@/schemas/filmSubmission.schema';
import { Card } from '@/components/ui/Card';

export default function MediaSection() {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<FilmSubmissionData>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('thumbnail', file, { shouldValidate: true });
    }
  };

  return (
    <Card variant="formSection" className="p-6 md:p-10 space-y-8">
      <div>
        <h2 className="pb-3 text-2xl font-semibold text-white">
          <span className="text-primary">3. </span>
          {t('submit.step2.title')} & {t('submit.step4.title')}
        </h2>
        <p className="text-muted-foreground">{t('submit.step2.description')}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormGroup>
          <Label required>{t('submit.step2.title.fr')}</Label>
          <Input {...register('title')} placeholder={t('placeholder.submitform2.title.fr')} />
          {errors.title && <ErrorParagraph>{errors.title.message}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('submit.step2.title.en')}</Label>
          <Input {...register('titleEn')} placeholder={t('placeholder.submitform2.title.en')} />
          {errors.titleEn && <ErrorParagraph>{errors.titleEn.message}</ErrorParagraph>}
        </FormGroup>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormGroup>
          <Label required>{t('submit.step2.synopsis.label.fr')}</Label>
          <TextArea {...register('synopsis')} placeholder={t('placeholder.submitform2.synopsis')} />
          {errors.synopsis && <ErrorParagraph>{errors.synopsis.message}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('submit.step2.synopsis.label.en')}</Label>
          <TextArea {...register('synopsisEn')} placeholder={t('placeholder.submitform2.synopsis.en')} />
          {errors.synopsisEn && <ErrorParagraph>{errors.synopsisEn.message}</ErrorParagraph>}
        </FormGroup>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <FormGroup>
          <Label required>{t('submit.step2.duration')}</Label>
          <Input type="number" {...register('duration', { valueAsNumber: true })} placeholder="Seconds" />
          {errors.duration && <ErrorParagraph>{errors.duration.message}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('submit.step2.language')}</Label>
          <Input {...register('language')} placeholder={t('placeholder.submitform2.language')} />
          {errors.language && <ErrorParagraph>{errors.language.message}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('submit.step2.tags')}</Label>
          <Input {...register('semanticTags')} placeholder={t('placeholder.submitform2.tag')} />
          {errors.semanticTags && <ErrorParagraph>{errors.semanticTags.message}</ErrorParagraph>}
        </FormGroup>
      </div>

      <div className="space-y-6 border-t border-slate-800 pt-6">
        <FormGroup>
          <Label required className="flex items-center gap-2">
            <Film className="text-primary size-4" />
            {t('submit.step4.youtube.label')}
          </Label>
          <Input {...register('youtubeUrl')} type="url" placeholder="https://www.youtube.com/watch?v=..." />
          <p className="text-muted-foreground mt-1 text-xs">{t('submit.step4.youtube.hint')}</p>
          {errors.youtubeUrl && <ErrorParagraph>{errors.youtubeUrl.message}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label required className="flex items-center gap-2">
            <ImageIcon className="text-primary size-4" />
            {t('submit.step4.thumbnail.label')} (Max 2Mo)
          </Label>
          <Input
            type="file"
            accept="image/jpeg, image/png, image/gif"
            onChange={handleFileChange}
            className="file:bg-primary/10 file:text-primary cursor-pointer text-slate-300"
          />
          <p className="text-muted-foreground mt-1 text-xs">{t('submit.step4.thumbnail.hint')}</p>
          {errors.thumbnail && <ErrorParagraph>{errors.thumbnail.message}</ErrorParagraph>}
        </FormGroup>
      </div>
    </Card>
  );
}
