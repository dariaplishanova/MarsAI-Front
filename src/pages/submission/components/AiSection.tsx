import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';
import { ErrorParagraph, FormGroup, Label, TextArea } from '@/components/ui/form';
import RadioGroup, { RadioGroupItem } from '@/components/ui/RadioGroup';
import { FilmSubmissionData } from '@/schemas/filmSubmission.schema';
import { Card } from '@/components/ui/Card';

export default function AiSection() {
  const { t } = useTranslation();
  
  const { register, formState: { errors }, watch, setValue } = useFormContext<FilmSubmissionData>();

  const aiClassification = watch('aiClassification');
  

  return (
    <Card variant="formSection" className="p-6 md:p-10 space-y-8">
      <div>
        <h2 className="pb-3 text-2xl font-semibold text-white">
          <span className="text-primary">2. </span>
          {t('submit.step3.title')}
        </h2>
        <p className="text-muted-foreground">{t('submit.step3.description')}</p>
      </div>

      <FormGroup className="space-y-4">
        <Label required className="text-base text-slate-200">
          {t('submit.step3.type')}
        </Label>
        <RadioGroup
          value={aiClassification}
          onValueChange={value => setValue('aiClassification', value as '100' | 'hybrid')}
          className="grid grid-cols-1 gap-4"
        >
          <div className={`flex items-start gap-3 rounded-xl border p-4 transition-all md:p-5 ${aiClassification === '100' ? 'border-primary bg-primary/5' : 'border-slate-800 bg-slate-900/50'}`}>
            <RadioGroupItem value="100" id="type-100" className="mt-1 shrink-0" />
            <Label htmlFor="type-100" className="cursor-pointer font-medium text-slate-200">
              {t('submit.step3.type.100')}
              <span className="mt-1 block text-sm font-normal text-slate-400">{t('submit.step3.type.100.desc')}</span>
            </Label>
          </div>

          <div className={`flex items-start gap-3 rounded-xl border p-4 transition-all md:p-5 ${aiClassification === 'hybrid' ? 'border-primary bg-primary/5' : 'border-slate-800 bg-slate-900/50'}`}>
            <RadioGroupItem value="hybrid" id="type-hybrid" className="mt-1 shrink-0" />
            <Label htmlFor="type-hybrid" className="cursor-pointer font-medium text-slate-200">
              {t('submit.step3.type.hybrid')}
              <span className="mt-1 block text-sm font-normal text-slate-400">{t('submit.step3.type.hybrid.desc')}</span>
            </Label>
          </div>
        </RadioGroup>
        {errors.aiClassification && <ErrorParagraph>{errors.aiClassification.message}</ErrorParagraph>}
      </FormGroup>

      <div className="grid grid-cols-1 gap-6">
        <FormGroup>
          <Label required>{t('submit.step3.techstack')}</Label>
          <TextArea
            {...register('techStack')}
            placeholder={t('submit.step3.techstack.placeholder')}
            className={`min-h-30 ${errors.techStack ? 'border-red-500' : ''}`}
          />
          {errors.techStack && <ErrorParagraph>{errors.techStack.message}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('submit.step3.methodology')}</Label>
          <TextArea
            {...register('methodology')}
            placeholder={t('submit.step3.methodology.placeholder')}
            className={`min-h-30 ${errors.methodology ? 'border-red-500' : ''}`}
          />
          {errors.methodology && <ErrorParagraph>{errors.methodology.message}</ErrorParagraph>}
        </FormGroup>
      </div>

      
    </Card>
  );
}