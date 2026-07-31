import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { ErrorParagraph, FormGroup, Input, Label, Select } from '@/components/ui/Form';
import RadioGroup, { RadioGroupItem } from '@/components/ui/RadioGroup';
import { FilmSubmissionData } from '@/schemas/filmSubmission.schema';

export default function IdentitySection() {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<FilmSubmissionData>();

  const civilityValue = watch('civility');

  return (
    <Card variant="formSection" className="space-y-8 p-6 md:p-10">
      <div>
        <h2 className="pb-3 text-2xl font-semibold">
          <span className="text-primary">1. </span>
          {t('submit.step1.title')}
        </h2>
        <p className="text-muted-foreground">{t('submit.step1.description')}</p>
      </div>

      <div className="space-y-2">
        <Label className="text-base font-semibold">
          {t('submit.step1.civility')} <span className="text-primary">*</span>
        </Label>
        <RadioGroup className="flex gap-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="M." id="m" {...register('civility')} />
            <Label htmlFor="m" className="cursor-pointer font-normal">
              {t('submit.step1.civility1')}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Mme" id="mme" {...register('civility')} />
            <Label htmlFor="mme" className="cursor-pointer font-normal">
              {t('submit.step1.civility2')}
            </Label>
          </div>
        </RadioGroup>
        {errors.civility && <ErrorParagraph>{errors.civility.message}</ErrorParagraph>}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormGroup>
          <Label required>{t('submit.step1.firstname')}</Label>
          <Input {...register('firstName')} placeholder={t('placeholder.submitform1.firstname')} />
          {errors.firstName && <ErrorParagraph>{errors.firstName.message}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.lastname')}</Label>
          <Input
            {...register('lastName', {
              onChange: e => {
                e.target.value = e.target.value.toUpperCase();
              },
            })}
            placeholder={t('placeholder.submitform1.lastname')}
          />
          {errors.lastName && <ErrorParagraph>{errors.lastName.message}</ErrorParagraph>}
        </FormGroup>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormGroup>
          <Label required>{t('submit.step1.birthdate')}</Label>
          <Input type="date" {...register('birthDate')} />
          {errors.birthDate && <ErrorParagraph>{errors.birthDate.message}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.email')}</Label>
          <Input type="email" {...register('email')} placeholder={t('placeholder.submitform1.email')} />
          {errors.email && <ErrorParagraph>{errors.email.message}</ErrorParagraph>}
        </FormGroup>
      </div>

      <FormGroup>
        <Label required>{t('submit.step1.country')}</Label>
        <Input {...register('country')} placeholder={t('placeholder.submitform1.country')} />
        {errors.country && <ErrorParagraph>{errors.country.message}</ErrorParagraph>}
      </FormGroup>

      <FormGroup className="border-border bg-muted/50 flex flex-row items-center gap-3 space-y-0 rounded-xl border p-5">
        <input
          type="checkbox"
          id="newsletter"
          {...register('newsletter')}
          className="accent-primary size-5 cursor-pointer"
        />
        <Label htmlFor="newsletter" className="m-0 cursor-pointer font-normal">
          {t('submit.step1.newsletter')}
        </Label>
      </FormGroup>
    </Card>
  );
}
