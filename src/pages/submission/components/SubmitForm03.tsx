import { useTranslation } from 'react-i18next';
import RadioGroup, { RadioGroupItem } from '@/components/ui/RadioGroup';
import Form, { FormGroup, Label, TextArea } from '@/components/ui/form';
import useForm from '@/hooks/useForm';
import { identitySchema } from '@/schemas/identityForm.schema';

export function SubmitForm03() {
  const { t } = useTranslation();
  const schema = identitySchema(t);
  

  const { handleChange, handleSubmit, values } = useForm(
    {
      civility: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      email: '',
      mobile: '',
      postCode: '',
      address: '',
      city: '',
      country: '',
      job: '',
      youtube: '',
      instagram: '',
      linkedin: '',
      facebook: '',
      twitter: '',
      source: '',
      newsletter: false,
    },
    schema
  );

  const onSubmit = async () => {
  };
  return (
    <>
      <Form noValidate={true} className="m-auto w-4xl space-y-6 p-10" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2 className="pb-3 text-2xl font-semibold">
            <span className="text-primary">{t('submit.step')} 3: </span>
            {t('submit.step3.title')}
          </h2>
          <p className="text-muted-foreground">{t('submit.step3.description')}</p>
        </div>
        <div className="grid grid-cols-2 gap-4"></div>
        <Label required>{t('submit.step3.classification.label')}</Label>
        <FormGroup>
          <RadioGroup
            value={values.civility}
            onValueChange={value =>
              handleChange({ target: { name: 'civility', value } } as unknown as React.ChangeEvent<HTMLInputElement>)
            }
            className="flex flex-col gap-4"
          >
            <div className="border-border hover:border-primary flex flex-row gap-2 rounded-lg border p-4">
              <RadioGroupItem value="M" id="m" />
              <Label htmlFor="m">
                {t('submit.step3.classification.full')}{' '}
                <span className="text-muted-foreground">
                  {t('submit.step3.classification.full.help')}
                </span>
              </Label>
            </div>
            <div className="border-border hover:border-primary flex flex-row gap-2 rounded-lg border p-4">
              <RadioGroupItem value="Mme" id="mme" />
              <Label htmlFor="mme">
                {t('submit.step3.classification.hybrid')}{' '}
                <span className="text-muted-foreground">
                  {t('submit.step3.classification.hybrid.help')}
                </span>
              </Label>
            </div>
          </RadioGroup>
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step3.tools.label')}</Label>
          <TextArea className="placeholder:text-muted-foreground placeholder:text-wrap" placeholder={t('submit.step3.tools.placeholder')} />
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step3.methodology.label')}</Label>
          <TextArea className="placeholder:text-muted-foreground placeholder:text-wrap" placeholder={t('submit.step3.methodology.placeholder')} />
        </FormGroup>
      </Form>
    </>
  );
}

export default SubmitForm03;
