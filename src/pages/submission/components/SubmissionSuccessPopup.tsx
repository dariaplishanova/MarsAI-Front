import { useTranslation } from 'react-i18next';
import { BadgeCheck } from 'lucide-react';
import IconBadge from '@/components/ui/IconBadge';
import Popup from '@/components/ui/Popup';
import Button from '@/components/ui/button';

interface SubmissionSuccessPopup {
  open: boolean;
  onClose: () => void;
}

export default function SubmissionSuccessPopup({ open, onClose }: SubmissionSuccessPopup) {
  const { t } = useTranslation();

  return (
    <Popup open={open} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <IconBadge variant="green" icon={BadgeCheck} />
        <h2 className="mb-4 text-2xl font-bold">{t('submission.success_title', 'Success!')}</h2>
        <p className="mb-8 text-gray-600">
          {t('submission.success_message', 'Your movie has been submitted successfully.')}
        </p>

        <Button type="button" onClick={onClose} variant="purple">
          {t('submission.close_btn')}
        </Button>
      </div>
    </Popup>
  );
}
