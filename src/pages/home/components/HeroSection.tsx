import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Upload } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import CountDown from '@/components/ui/CountDown';

export default function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNaviagte = () => {
    navigate('/submit');
  };

  return (
    <section className="bg-background relative z-1 flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden px-4 py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[20%] h-100 w-100 rounded-full bg-[#F4A3A4]/40 blur-[100px] md:h-150 md:w-150" />

        <div className="absolute -right-[20%] -bottom-[10%] h-125 w-125 rounded-full bg-[#F9DFDF]/40 blur-[120px] md:h-175 md:w-175" />

        <div className="absolute top-[20%] right-[10%] h-75 w-75 rounded-full bg-[#9BA8B5]/30 blur-[80px] md:h-100 md:w-100" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800F_1px,transparent_1px),linear-gradient(to_bottom,#8080800F_1px,transparent_1px)] mask-[radial-gradient(ellipse_100%_100%_at_50%_40%,#000_60%,transparent_100%)] bg-size-[32px_32px] md:bg-size-[40px_40px]" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center space-y-10 text-center">
        <div className="space-y-4">
          <h1 className="text-foreground text-4xl leading-tight font-extrabold md:text-6xl">{t('hero.title')}</h1>
          <p className="text-muted-foreground text-lg font-medium md:text-xl">{t('hero.subtitle')}</p>
        </div>

        <Card
          variant="purple"
          className="w-full border-white/40 bg-white/60 p-4 shadow-sm backdrop-blur-md md:max-w-fit md:p-6"
        >
          <CountDown />
        </Card>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            icon={<Upload size={15} />}
            variant="purple"
            onClick={handleNaviagte}
            className="text-foreground px-6 py-3 text-lg shadow-md"
          >
            {t('nav.submit')}
          </Button>
        </div>
      </div>
    </section>
  );
}
