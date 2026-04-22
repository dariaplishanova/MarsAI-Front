import { useTranslation } from 'react-i18next';
import { Shield, Users } from 'lucide-react';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">

      <div className="relative flex w-full flex-col justify-center overflow-hidden bg-primary/70 p-12 md:w-1/2 lg:p-24">
        
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[20%] -top-[10%] h-100 w-100 rounded-full bg-white/40 blur-[100px] md:h-150 md:w-150" />
          <div className="absolute -bottom-[10%] -right-[20%] h-125 w-125 rounded-full bg-[#FFD6D6]/60 blur-[120px] md:h-175 md:w-175" />
          <div className="absolute right-[10%] top-[20%] h-75 w-75 rounded-full bg-[#9BA8B5]/40 blur-[80px] md:h-100 md:w-100" />
        </div>

        <div className="z-10 mt-8 max-w-md">
          <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-sm md:text-6xl">{t('form.title')}</h1>
          <p className="text-xl font-medium text-white/80">{t('form.subtitle')}</p>
        </div>

      </div>

      <div className="flex w-full flex-col items-center justify-center bg-white p-8 md:w-1/2">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>

    </div>
  );
}