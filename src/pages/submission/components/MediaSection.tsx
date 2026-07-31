import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Film, Image as ImageIcon, Images } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ErrorParagraph, FormGroup, Input, Label, TextArea } from '@/components/ui/Form';
import { useMediaHandling } from '@/hooks/useMediaHandling';
import { FilmSubmissionData } from '@/schemas/filmSubmission.schema';

export default function MediaSection() {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<FilmSubmissionData>();

  const { thumbnailPreview, videoPreview, galleryPreviews, handleThumbnailChange, handleGalleryChange } =
    useMediaHandling();

  const hasErrors = Object.keys(errors).length > 0;

  const fileInputClasses =
    'block w-full cursor-pointer rounded-lg border border-border bg-background p-2 text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90 transition-colors';

  return (
    <Card variant="formSection" className="space-y-8 p-6 md:p-10">
      <div>
        <h2 className="pb-3 text-2xl font-semibold">
          <span className="text-primary">3. </span>
          {t('submit.step2.title')} & {t('submit.step4.title')}
        </h2>
        <p className="text-muted-foreground">{t('submit.step2.description')}</p>
      </div>

      <FormGroup>
        <Label required>{t('submit.step2.title.fr')}</Label>
        <Input {...register('title')} placeholder={t('placeholder.submitform2.title.fr')} />
        {errors.title && <ErrorParagraph>{errors.title.message}</ErrorParagraph>}
      </FormGroup>

      <FormGroup>
        <Label required>{t('submit.step2.synopsis.label.fr')}</Label>
        <TextArea {...register('synopsis')} placeholder={t('placeholder.submitform2.synopsis')} />
        {errors.synopsis && <ErrorParagraph>{errors.synopsis.message}</ErrorParagraph>}
      </FormGroup>

      <div className="flex h-full flex-col gap-6">
        <FormGroup>
          <Label required className="mb-2 flex-1">
            {t('submit.step2.duration')}
          </Label>
          <Input type="number" {...register('duration', { valueAsNumber: true })} placeholder="Seconds" />
          {errors.duration && <ErrorParagraph>{errors.duration.message}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label required className="mb-2 flex-1">
            {t('submit.step2.language')}
          </Label>
          <Input {...register('language')} placeholder={t('placeholder.submitform2.language')} />
          {errors.language && <ErrorParagraph>{errors.language.message}</ErrorParagraph>}
        </FormGroup>
      </div>

      <div className="border-border space-y-6 border-t pt-6">
        <FormGroup>
          <Label required className="flex items-center gap-2">
            <Film className="text-primary size-4" />
            {t('submit.step4.video.label', 'Fichier vidéo')} (Max 500Mo)
          </Label>

          <Input
            {...register('video')}
            id="video"
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            className={fileInputClasses}
          />

          {videoPreview && (
            <div className="border-border mt-3 overflow-hidden rounded-md border">
              <video src={videoPreview} controls className="max-h-64 w-full bg-black object-contain" />
            </div>
          )}

          <p className="text-muted-foreground mt-1 text-xs">
            {t('submit.step4.video.hint', 'Formats acceptés: MP4, WebM, MOV')}
          </p>
          {errors.video && typeof errors.video.message === 'string' && (
            <ErrorParagraph>{errors.video.message}</ErrorParagraph>
          )}
        </FormGroup>

        <FormGroup>
          <Label required className="flex items-center gap-2">
            <ImageIcon className="text-primary size-4" />
            {t('submit.step4.thumbnail.label')} (Max 2Mo)
          </Label>
          <Input
            type="file"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleThumbnailChange}
            className={fileInputClasses}
          />

          {thumbnailPreview && (
            <div className="border-border bg-muted/30 mt-3 h-32 w-32 overflow-hidden rounded-md border">
              <img src={thumbnailPreview} alt="Thumbnail preview" className="h-full w-full object-cover" />
            </div>
          )}

          <p className="text-muted-foreground mt-1 text-xs">{t('submit.step4.thumbnail.hint')}</p>
          {errors.thumbnail && typeof errors.thumbnail.message === 'string' && (
            <ErrorParagraph>{errors.thumbnail.message}</ErrorParagraph>
          )}
        </FormGroup>

        <FormGroup>
          <Label className="flex items-center gap-2">
            <Images className="text-primary size-4" />
            {t('submit.step4.gallery.label', "Galerie d'images")} (Max 3)
          </Label>
          <Input
            type="file"
            multiple
            accept="image/jpeg, image/png, image/webp"
            onChange={handleGalleryChange}
            className={fileInputClasses}
          />

          {galleryPreviews.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-3">
              {galleryPreviews.map((url, index) => (
                <div key={index} className="border-border bg-muted/30 h-24 w-24 overflow-hidden rounded-md border">
                  <img src={url} alt={`Gallery preview ${index + 1}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <p className="text-muted-foreground mt-1 text-xs">
            {t('submit.step4.gallery.hint', "Sélectionnez jusqu'à 3 images (JPEG, PNG, WEBP)")}
          </p>
          {errors.gallery && typeof errors.gallery.message === 'string' && (
            <ErrorParagraph>{errors.gallery.message}</ErrorParagraph>
          )}
        </FormGroup>
      </div>

      {hasErrors && (
        <div className="bg-destructive/10 border-destructive/20 text-destructive flex items-center gap-2 rounded-md border p-3 text-sm">
          <AlertCircle className="size-4" />
          <p>{t('submit.validation.error')}</p>
        </div>
      )}
    </Card>
  );
}
