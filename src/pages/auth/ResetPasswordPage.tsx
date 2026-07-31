import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import Form, { FormGroup, Input, Label } from '@/components/ui/Form';

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ password: string }>({
    mode: 'onTouched',
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (data: { password: string }) => {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      await response.json();

      if (!response.ok) {
        toast.error(t('toast.auth.passwordResetFailed'));
        return;
      }

      toast.success(t('toast.auth.passwordResetSuccess'));
      reset();
    } catch (err) {
      console.error(err);
      toast.error(t('toast.common.networkError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="password"
          {...register('password', { required: 'Password is required' })}
        />
      </FormGroup>

      <Button type="submit" variant="purple" disabled={loading}>
        Submit
      </Button>
    </Form>
  );
}
