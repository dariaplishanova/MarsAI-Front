import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { ErrorParagraph, FormGroup, Input, Label } from '@/components/ui/form';
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
        <RadioGroup
          value={civilityValue}
          onValueChange={value => setValue('civility', value as 'M.' | 'Mme')}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="M." id="m" />
            <Label htmlFor="m" className="cursor-pointer font-normal">
              {t('submit.step1.civility1')}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Mme" id="mme" />
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
          <Input {...register('lastName')} placeholder={t('placeholder.submitform1.lastname')} />
          {errors.lastName && <ErrorParagraph>{errors.lastName.message}</ErrorParagraph>}
        </FormGroup>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
        <FormGroup>
          <Label required>{t('submit.step1.mobile')}</Label>
          <Input type="tel" {...register('mobile')} placeholder={t('placeholder.submitform1.mobile')} />
          {errors.mobile && <ErrorParagraph>{errors.mobile.message}</ErrorParagraph>}
        </FormGroup>
      </div>

      <FormGroup>
        <Label required>{t('submit.step1.address')}</Label>
        <Input {...register('address')} placeholder={t('placeholder.submitform1.address')} />
        {errors.address && <ErrorParagraph>{errors.address.message}</ErrorParagraph>}
      </FormGroup>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormGroup>
          <Label required>{t('submit.step1.zip')}</Label>
          <Input {...register('postCode')} placeholder={t('placeholder.submitform1.zip')} />
          {errors.postCode && <ErrorParagraph>{errors.postCode.message}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.city')}</Label>
          <Input {...register('city')} placeholder={t('placeholder.submitform1.city')} />
          {errors.city && <ErrorParagraph>{errors.city.message}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.country')}</Label>
          <Input {...register('country')} placeholder={t('placeholder.submitform1.country')} />
          {errors.country && <ErrorParagraph>{errors.country.message}</ErrorParagraph>}
        </FormGroup>
      </div>

      <FormGroup>
        <Label required>{t('submit.step1.role')}</Label>
        <Input {...register('job')} placeholder={t('placeholder.submitform1.job')} />
        {errors.job && <ErrorParagraph>{errors.job.message}</ErrorParagraph>}
      </FormGroup>

      <div className="space-y-4 border-t border-border pt-6">
        <Label className="text-lg font-semibold">{t('submit.step1.social')}</Label>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormGroup>
            <Label>{t('youtube.name')}</Label>
            <Input {...register('youtube')} placeholder={t('placeholder.submitform1.youtubelink')} />
          </FormGroup>
          <FormGroup>
            <Label>{t('instagram.name')}</Label>
            <Input {...register('instagram')} placeholder={t('placeholder.submitform1.instagramlink')} />
          </FormGroup>
          <FormGroup>
            <Label>{t('linkedin.name')}</Label>
            <Input {...register('linkedin')} placeholder={t('placeholder.submitform1.linkedinlink')} />
          </FormGroup>
          <FormGroup>
            <Label>{t('facebook.name')}</Label>
            <Input {...register('facebook')} placeholder={t('placeholder.submitform1.facebooklink')} />
          </FormGroup>
          <FormGroup className="md:col-span-2">
            <Label>{t('twitter.name')}</Label>
            <Input {...register('twitter')} placeholder={t('placeholder.submitform1.twitterlink')} />
          </FormGroup>
        </div>
      </div>

      <FormGroup>
        <Label required>{t('submit.step1.question')}</Label>
        <select
          {...register('source')}
          className="focus:ring-primary w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none focus:ring-2"
        >
          <option value="">{t('placeholder.submitform1.select')}</option>
          <option value="Moteur de recherche">{t('submit.step1.source.search')}</option>
          <option value="Bouche-à-oreille">{t('submit.step1.source.word_of_mouth')}</option>
          <option value="Presse / Média">{t('submit.step1.source.press')}</option>
          <option value="Autre festival">{t('submit.step1.source.festival')}</option>
          <option value="Partenaire">{t('submit.step1.source.partner')}</option>
          <option value="Autre">{t('submit.step1.source.other')}</option>
        </select>
        {errors.source && <ErrorParagraph>{errors.source.message}</ErrorParagraph>}
      </FormGroup>

      <FormGroup className="flex flex-row items-center gap-3 space-y-0 rounded-xl border border-border bg-muted/50 p-5">
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