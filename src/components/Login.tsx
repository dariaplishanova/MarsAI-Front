import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
// Import the type we just created
import { loginSchema, type LoginFormData } from '../schemas/login.schema';
import Button from './ui/button';
import Form, { FormGroup, Input, Label } from './ui/form';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const schema = loginSchema(t);
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        alert(result.message || 'Erreur de connexion');
        return;
      }

      authLogin(result.token, result.user);
      navigate('/');
    } catch (err) {
      console.error('Erreur :', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form noValidate className="mx-auto w-full max-w-md space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="pb-3 text-2xl font-semibold">{t('form.title')}</h2>
        <p className="text-muted-foreground">{t('form.subtitle')}</p>
      </div>

      <div className="flex flex-col gap-5">
        <FormGroup>
          <Label required>Email</Label>
          <Input
            type="email"
            placeholder="contact@example.com"
            {...register('email')}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('form.pass')}</Label>
          <Input
            type="password"
            placeholder="**********"
            {...register('password')}
          />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </FormGroup>
      </div>

      <Link to="/" className="text-primary border-none text-sm">
        {t('form.forgot_pass')}
      </Link>

      <Button type="submit" variant="purple" disabled={loading}>
        {loading ? 'Connexion...' : t('button.signin')}
      </Button>
    </Form>
  );
};

export default Login;