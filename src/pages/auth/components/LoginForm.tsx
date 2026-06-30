import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/Button';
import Form, { ErrorParagraph, FormGroup, Input, Label } from '@/components/ui/Form';
import { useAuth } from '@/hooks/useAuth';
import { type LoginFormData, loginSchema } from '@/schemas/login.schema';
import ForgotPasswordPopup from '../ForgotPasswordPage';

const Login = () => {
  const { t } = useTranslation();
  const schema = loginSchema(t);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const { login } = useAuth();

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

      login(result.token);
    } catch (err) {
      console.error('Erreur :', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        noValidate
        className="w-full max-w-md space-y-6 border-none bg-transparent shadow-none"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5">
          <FormGroup>
            <Label required>Email</Label>
            <div className="relative">
              <Mail className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2" size={18} />
              <Input type="email" placeholder="contact@example.com" {...register('email')} className="pl-10" />
            </div>
            {errors.email && <ErrorParagraph>{errors.email.message}</ErrorParagraph>}
          </FormGroup>

          <FormGroup>
            <Label required>{t('form.pass')}</Label>
            <div className="relative">
              <Lock className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2" size={18} />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="**********"
                {...register('password')}
                className="px-10"
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground absolute top-1/2 right-1 -translate-y-1/2 p-1.5"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
            {errors.password && <ErrorParagraph>{errors.password.message}</ErrorParagraph>}
          </FormGroup>
        </div>

        <Button
          type="button"
          aria-label={t('form.forgot_pass')}
          variant="ghost"
          onClick={() => setIsForgotPassword(true)}
        >
          {t('form.forgot_pass')}
        </Button>

        <Button type="submit" variant="purple" disabled={loading} className="w-full justify-center">
          {loading ? 'Connexion...' : t('button.signin')}
        </Button>
      </Form>
      <ForgotPasswordPopup open={isForgotPassword} onClose={() => setIsForgotPassword(false)} />
    </>
  );
};

export default Login;
