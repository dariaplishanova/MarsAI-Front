import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormGroup, Input, Label, ErrorParagraph } from '@/components/ui/form';
import { FilmSubmissionData } from '@/schemas/filmSubmission.schema';

interface TeamMemberProps {
  index: number;
  onDelete: () => void;
}

export default function TeamMember({ index, onDelete }: TeamMemberProps) {
  const { t } = useTranslation();
  const { register, formState: { errors } } = useFormContext<FilmSubmissionData>();

  const memberErrors = (errors.collaborators as any)?.[index];

  return (
    <div className="relative space-y-6 rounded-xl border border-slate-800 bg-slate-900/40 p-6">
      <button 
        type="button" 
        onClick={onDelete} 
        className="absolute top-4 right-4 p-1 text-slate-500 hover:text-red-500 transition-colors"
      >
        <X className="size-5" />
      </button>

      <div className="border-primary flex items-center gap-2 border-l-4 pl-4">
        <h3 className="text-lg font-medium text-white">
          {t('submit.step5.collaborator')} #{index + 1}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormGroup>
          <Label required>{t('submit.step1.firstname')}</Label>
          <Input
            {...register(`collaborators.${index}.firstName` as const)}
            placeholder={t('placeholder.submitform1.firstname')}
            className={memberErrors?.firstName ? 'border-red-500' : ''}
          />
          {memberErrors?.firstName && <ErrorParagraph>{memberErrors.firstName.message}</ErrorParagraph>}
        </FormGroup>
        
        <FormGroup>
          <Label required>{t('submit.step1.lastname')}</Label>
          <Input
            {...register(`collaborators.${index}.lastName` as const)}
            placeholder={t('placeholder.submitform1.lastname')}
            className={memberErrors?.lastName ? 'border-red-500' : ''}
          />
          {memberErrors?.lastName && <ErrorParagraph>{memberErrors.lastName.message}</ErrorParagraph>}
        </FormGroup>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormGroup>
          <Label required>{t('submit.step5.role')}</Label>
          <Input
            {...register(`collaborators.${index}.job` as const)}
            placeholder={t('submit.step5.role.placeholder')}
            className={memberErrors?.job ? 'border-red-500' : ''}
          />
          {memberErrors?.job && <ErrorParagraph>{memberErrors.job.message}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('submit.step5.email')}</Label>
          <Input
            type="email"
            {...register(`collaborators.${index}.email` as const)}
            placeholder={t('placeholder.submitform1.email')}
            className={memberErrors?.email ? 'border-red-500' : ''}
          />
          {memberErrors?.email && <ErrorParagraph>{memberErrors.email.message}</ErrorParagraph>}
        </FormGroup>
      </div>
    </div>
  );
}