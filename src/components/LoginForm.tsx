import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { type LoginFormData, loginSchema } from '../schemas/login.schema';
import Button from './ui/button';
import Form, { FormGroup, Input, Label } from './ui/form';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const schema = loginSchema(t);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    <Form noValidate className="w-full max-w-md space-y-6 border-none bg-transparent shadow-none" onSubmit={handleSubmit(onSubmit)}>

      <div className="flex flex-col gap-5">
        <FormGroup>
          <Label required>Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input type="email" placeholder="contact@example.com" {...register('email')} className="pl-10" />
          </div>
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('form.pass')}</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
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
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </FormGroup>
      </div>

      <Link to="/" className="text-primary border-none text-sm">
        {t('form.forgot_pass')}
      </Link>

      <Button type="submit" variant="purple" disabled={loading} className='w-full justify-center'>
        {loading ? 'Connexion...' : t('button.signin')}
      </Button>
    </Form>
  );
};

export default Login;
