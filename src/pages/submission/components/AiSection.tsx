import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { ErrorParagraph, FormGroup, Label, TextArea } from '@/components/ui/Form';
import RadioGroup, { RadioGroupItem } from '@/components/ui/RadioGroup';
import { FilmSubmissionData } from '@/schemas/filmSubmission.schema';

export default function AiSection() {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<FilmSubmissionData>();

  const aiClassification = watch('aiClassification');

  return (
    <Card variant="formSection" className="space-y-8 p-6 md:p-10">
      <div>
        <h2 className="pb-3 text-2xl font-semibold">
          <span className="text-primary">2. </span>
          {t('submit.step3.title')}
        </h2>
        <p className="text-muted-foreground">{t('submit.step3.description')}</p>
      </div>

      <FormGroup className="space-y-4">
        <Label required className="text-base">
          {t('submit.step3.type')}
        </Label>
        <RadioGroup className="grid grid-cols-1 gap-4">
          <div
            className={`flex items-start gap-3 rounded-xl border p-4 transition-all md:p-5 ${aiClassification === '100' ? 'border-primary bg-primary/10' : 'border-border bg-background'}`}
          >
            <RadioGroupItem value="100" id="type-100" className="mt-1 shrink-0" {...register('aiClassification')} />
            <Label htmlFor="type-100" className="cursor-pointer font-medium">
              {t('submit.step3.type.100')}
              <span className="text-muted-foreground mt-1 block text-sm font-normal">
                {t('submit.step3.type.100.desc')}
              </span>
            </Label>
          </div>

          <div
            className={`flex items-start gap-3 rounded-xl border p-4 transition-all md:p-5 ${aiClassification === 'hybrid' ? 'border-primary bg-primary/10' : 'border-border bg-background'}`}
          >
            <RadioGroupItem
              value="hybrid"
              id="type-hybrid"
              className="mt-1 shrink-0"
              {...register('aiClassification')}
            />
            <Label htmlFor="type-hybrid" className="cursor-pointer font-medium">
              {t('submit.step3.type.hybrid')}
              <span className="text-muted-foreground mt-1 block text-sm font-normal">
                {t('submit.step3.type.hybrid.desc')}
              </span>
            </Label>
          </div>
        </RadioGroup>
        {errors.aiClassification && <ErrorParagraph>{errors.aiClassification.message}</ErrorParagraph>}
      </FormGroup>

      <div className="grid grid-cols-1 gap-6">
        <FormGroup>
          <Label required>{t('submit.step3.techstack')}</Label>
          <TextArea {...register('techStack')} placeholder={t('submit.step3.techstack.placeholder')} />
          {errors.techStack && <ErrorParagraph>{errors.techStack.message}</ErrorParagraph>}
        </FormGroup>
      </div>
    </Card>
  );
}
