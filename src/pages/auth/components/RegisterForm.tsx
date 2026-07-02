import { useState, useEffect } from 'react'; // Added useEffect to handle dynamic prop updates if needed
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/Button';
import Form, { ErrorParagraph, FormGroup, Input, Label } from '@/components/ui/Form';
import { useAuth } from '@/hooks/useAuth';
import { type RegisterFormData, registerSchema } from '@/schemas/register.schema';

type RegisterFormProps = {
  invitedEmail: string;
};

const Register = ({ invitedEmail }: RegisterFormProps) => {
  const { t } = useTranslation();
  const schema = registerSchema(t);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: invitedEmail, 
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

      if (!result.token) {
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
    <Form
      noValidate
      className="w-full max-w-md space-y-6 border-none bg-transparent shadow-none"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-4">
        <FormGroup>
          <Label htmlFor="firstname" required>
            {t('form.firstname', 'Prénom')}
          </Label>
          <div className="relative">
            <User
              aria-hidden="true"
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
              size={18}
            />
            <Input
              type="text"
              id="firstname"
              autoComplete="given-name"
              placeholder={t('placeholder.submitform1.firstname')}
              aria-invalid={!!errors.firstname}
              {...register('firstname')}
              className="pl-10"
            />
          </div>
          {errors.firstname && <ErrorParagraph>{errors.firstname.message}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="lastname" required>
            {t('form.lastname', 'Nom')}
          </Label>
          <div className="relative">
            <User
              aria-hidden="true"
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
              size={18}
            />
            <Input
              type="text"
              id="lastname"
              autoComplete="family-name"
              placeholder={t('placeholder.submitform1.lastname')}
              aria-invalid={!!errors.lastname}
              {...register('lastname')}
              className="pl-10"
            />
          </div>
          {errors.lastname && <ErrorParagraph>{errors.lastname.message}</ErrorParagraph>}
        </FormGroup>
      </div>

      <div className="flex flex-col gap-5">
        <FormGroup>
          <Label htmlFor="email" required>
            Email
          </Label>
          <div className="relative">
            <Mail
              aria-hidden="true"
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
              size={18}
            />
            <Input 
              id="email" 
              readOnly
              className="pl-10" 
              {...register('email')}
            />
          </div>
          {errors.email && <ErrorParagraph>{errors.email.message}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password" required>
            {t('form.pass')}
          </Label>
          <div className="relative">
            <Lock
              aria-hidden="true"
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
              size={18}
            />
            <Input
              id="password"
              autoComplete="new-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="**********"
              aria-invalid={!!errors.password}
              {...register('password')}
              className="px-10"
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground absolute top-1/2 right-1 -translate-y-1/2 p-1.5"
              aria-label={showPassword ? t('form.hide_password') : t('form.show_password')}
            >
              {showPassword ? <EyeOff aria-hidden="true" size={18} /> : <Eye aria-hidden="true" size={18} />}
            </Button>
          </div>
          {errors.password && <ErrorParagraph>{errors.password.message}</ErrorParagraph>}
        </FormGroup>
      </div>

      <Button type="submit" variant="purple" disabled={loading} className="w-full justify-center">
        {loading ? t('button.signing_in', 'Inscription...') : t('button.signin')}
      </Button>
    </Form>
  );
};

export default Register;