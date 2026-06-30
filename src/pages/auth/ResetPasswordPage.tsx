import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';
import Form, { FormGroup, Input, Label } from '@/components/ui/Form';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ResetPasswordPage() {
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

      const response = await fetch(
        `${API_URL}/auth/reset-password/${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || 'Reset failed');
        return;
      }

      alert('Password reset successful');
      reset();
    } catch (err) {
      console.error(err);
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