import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Upload } from 'lucide-react';
import heroImage from '@/assets/hero2.jpg';
import { Card } from '@/components/ui/Card';
import CountDown from '@/components/ui/CountDown';
import Button from '@/components/ui/button';

export default function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNaviagte = () => {
    navigate('/submit');
  };

  return (
    <section
      style={{ backgroundImage: `url(${heroImage})` }}
      className="relative z-1 flex min-h-150 w-full flex-col items-center justify-center bg-cover bg-center py-20"
    >
      <div className="absolute inset-0 bg-[#F4A3A4] mix-blend-color opacity-60"></div>
      
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 container mx-auto flex flex-col items-center space-y-10 px-4 text-center md:max-w-[70%]">
        <div className="space-y-4">
          <h1 className="text-4xl leading-tight font-semibold md:text-6xl text-[#6B5B5B]">
            {t('hero.title')}
          </h1>
          <p className="text-lg font-medium text-muted-foreground md:text-xl">
            {t('hero.subtitle')}
          </p>
        </div>

        <Card
          variant="purple"
          className="w-full p-4 shadow-md backdrop-blur-md md:max-w-fit md:p-6"
        >
          <CountDown />
        </Card>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button icon={<Upload size={15} />} variant="purple" onClick={handleNaviagte} className="px-3 py-2 text-xl shadow-lg">
            {t('nav.submit')}
          </Button>
        </div>
      </div>
    </section>
  );
}