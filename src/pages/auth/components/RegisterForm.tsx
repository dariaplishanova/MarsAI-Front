import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { type RegisterFormData, registerSchema } from '@/schemas/register.schema';
import Button from '../../../components/ui/Button';
import Form, { ErrorParagraph, FormGroup, Input, Label } from '../../../components/ui/Form';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const schema = registerSchema(t);
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/register`, {
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
      console.error('Erreur réseau :', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form noValidate className="mx-auto w-full max-w-md space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="pb-3 text-2xl font-semibold">{t('register_title')}</h2>
        <p className="text-muted-foreground">{t('register_subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormGroup>
          <Label required>Prénom</Label>
          <Input type="text" placeholder={t('placeholder.submitform1.firstname')} {...register('firstname')} />
          {errors.firstname && <ErrorParagraph>{errors.firstname.message}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>Nom</Label>
          <Input type="text" placeholder={t('placeholder.submitform1.lastname')} {...register('lastname')} />
          {errors.lastname && <ErrorParagraph>{errors.lastname.message}</ErrorParagraph>}
        </FormGroup>
      </div>

      <div className="flex flex-col gap-5">
        <FormGroup>
          <Label required>Email</Label>
          <Input
            type="email"
            placeholder="contact@example.com"
            {...register('email')}
            className={errors.email ? 'border-red-500 focus:ring-red-500' : ''}
          />
          {errors.email && <ErrorParagraph>{errors.email.message}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('form.pass')}</Label>
          <Input
            type="password"
            placeholder="**********"
            {...register('password')}
            className={errors.password ? 'border-red-500 focus:ring-red-500' : ''}
          />
          {errors.password && <ErrorParagraph>{errors.password.message}</ErrorParagraph>}
        </FormGroup>
      </div>

      <Button type="submit" variant="purple" disabled={loading}>
        {loading ? 'Connexion...' : t('button.signin')}
      </Button>
    </Form>
  );
};

export default Register;
