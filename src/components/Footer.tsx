import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MarsAILogo } from './MarsAILogo';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-border bg-card mt-auto border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <MarsAILogo />
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">{t('footer.tagline')}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-foreground text-sm font-semibold">{t('footer.navigation')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('footer.gallery')}
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('footer.submit')}
                </Link>
              </li>
              <li>
                <Link to="/jury" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('footer.jury')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-foreground text-sm font-semibold">{t('footer.legal')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('footer.legal.notice')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('footer.gdpr')}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-foreground text-sm font-semibold">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@marsai.fr"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  contact@marsai.fr
                </a>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">Marseille, France</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border mt-12 border-t pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} marsAI. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
