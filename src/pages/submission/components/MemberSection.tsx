import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Plus, Users } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FilmSubmissionData } from '@/schemas/filmSubmission.schema';
import TeamMember from './TeamMember';

export default function MemberSection() {
  const { t } = useTranslation();
  const { control } = useFormContext<FilmSubmissionData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'collaborators',
  });

  const handleAddMember = () => {
    append({ firstName: '', lastName: '', job: '', email: '' });
  };

  return (
    <Card variant="formSection" className="space-y-8 p-6 md:p-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">
            <span className="text-primary">4. </span>
            {t('submit.step5.title')}
          </h2>
          <p className="text-muted-foreground">{t('submit.step5.description')}</p>
        </div>
        <Button
          variant="default"
          type="button"
          className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 flex items-center gap-2 border px-6 transition-colors"
          onClick={handleAddMember}
        >
          <Plus className="size-4" />
          {t('submit.step5.add')}
        </Button>
      </div>

      <div className="space-y-6">
        {fields.length === 0 ? (
          <Card className="border-border bg-muted/30 text-muted-foreground flex flex-col items-center justify-center border-dashed py-16">
            <Users className="mb-4 size-16 opacity-30" />
            <p className="text-lg font-medium">{t('submit.step5.empty')}</p>
          </Card>
        ) : (
          fields.map((field, index) => <TeamMember key={field.id} index={index} onDelete={() => remove(index)} />)
        )}
      </div>
    </Card>
  );
}
