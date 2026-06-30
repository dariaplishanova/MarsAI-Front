import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next'; // Imported for internationalization
import Button from '@/components/ui/Button';
import Form, { ErrorParagraph, FormGroup, Input, Label } from '@/components/ui/Form';
import Popup from '@/components/ui/Popup';

interface ResetPasswordFormData {
  email: string;
}

interface ForgotPasswordPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function ForgotPasswordPopup({ open, onClose }: ForgotPasswordPopupProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || t('auth.forgot_password_failed', 'Demand failed'));
        return;
      }

      alert(t('auth.email_sent', 'Email sent'));
      reset();
      onClose(); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popup className="bg-white" open={open} onClose={onClose}>
      <Form noValidate onSubmit={handleSubmit(onSubmit, (errors) => console.log('Validation errors:', errors))}>
        <FormGroup>
          <Label htmlFor="email">{t('form.email', 'Email')}</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            aria-invalid={!!errors.email}
            {...register('email', { 
              required: t('validation.email_required', 'Email is required') 
            })}
          />
          {errors.email && <ErrorParagraph>{errors.email.message}</ErrorParagraph>}
        </FormGroup>
        <Button type="submit" variant="purple" disabled={loading}>
          {loading ? t('button.sending', 'Sending...') : t('button.submit', 'Submit')}
        </Button>
      </Form>
    </Popup>
  );
}