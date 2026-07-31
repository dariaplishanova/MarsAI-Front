import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { MailCheck, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import RegisterForm from './components/RegisterForm';

export default function JuryRegisterPage() {
  const { t } = useTranslation();
  const { token } = useParams();
  const [invitedEmail, setInvitedEmail] = useState<string>('');
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const verifyInvite = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/verify-invite/${token}`);

        if (!res.ok) {
          toast.error(t('toast.auth.inviteVerificationFailed'));
          return;
        }

        const result = await res.json();
        setInvitedEmail(result.email);
      } catch (error) {
        console.error('Invite verification failed:', error);
        toast.error(t('toast.common.networkError'));
      }
    };

    verifyInvite();
  }, [token, t]);

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <div className="bg-primary/70 relative flex w-full flex-col justify-center overflow-hidden p-12 md:w-1/2 lg:p-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-[10%] -left-[20%] h-100 w-100 rounded-full bg-white/40 blur-[100px] md:h-150 md:w-150" />
          <div className="absolute -right-[20%] -bottom-[10%] h-125 w-125 rounded-full bg-[#FFD6D6]/60 blur-[120px] md:h-175 md:w-175" />
          <div className="absolute top-[20%] right-[10%] h-75 w-75 rounded-full bg-[#9BA8B5]/40 blur-[80px] md:h-100 md:w-100" />
        </div>

        <div className="z-10 mt-8 max-w-md space-y-6">
          <h1 className="text-foreground text-4xl font-bold md:text-6xl">{t('jury_register.title')}</h1>

          <h2 className="text- text-foreground">{t('jury_register.subtitle')}</h2>

          <div className="space-y-4 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-foreground mt-1" size={20} />
              <p className="text-foreground">{t('jury_register.step_2')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-white p-8 md:w-1/2">
        <div className="w-full max-w-sm">
          <RegisterForm invitedEmail={invitedEmail} />
        </div>
      </div>
    </div>
  );
}
