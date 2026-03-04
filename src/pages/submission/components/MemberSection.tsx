import { useTranslation } from 'react-i18next';
import { Plus, Users } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/button';
import { FilmSubmissionData } from '@/schemas/filmSubmission.schema';
import TeamMember from './TeamMember';

export default function MemberSection() {
  const { t } = useTranslation();
  const { control } = useFormContext<FilmSubmissionData>();

  // This hook manages the collaborators list for us
  const { fields, append, remove } = useFieldArray({
    control,
    name: "collaborators"
  });

  const handleAddMember = () => {
    // We append a clean object
    append({ firstName: '', lastName: '', job: '', email: '' });
  };

  return (
    <Card variant="formSection" className="p-6 md:p-10 space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white">
            <span className="text-primary">4. </span>
            {t('submit.step5.title')}
          </h2>
          <p className="text-slate-400">{t('submit.step5.description')}</p>
        </div>
        <Button
          variant="default"
          type="button"
          className="bg-primary/10 text-primary border-primary/20 flex items-center gap-2 border px-6 hover:bg-primary/20"
          onClick={handleAddMember}
        >
          <Plus className="size-4" />
          {t('submit.step5.add')}
        </Button>
      </div>

      <div className="space-y-6">
        {fields.length === 0 ? (
          <Card className="flex flex-col items-center justify-center border-dashed border-slate-800 bg-slate-900/20 py-16 text-slate-500">
            <Users className="mb-4 size-16 opacity-20" />
            <p className="text-lg font-medium text-slate-400">{t('submit.step5.empty')}</p>
          </Card>
        ) : (
          fields.map((field, index) => (
            <TeamMember
              key={field.id} // useFieldArray provides a unique 'id'
              index={index}
              onDelete={() => remove(index)}
            />
          ))
        )}
      </div>
    </Card>
  );
}