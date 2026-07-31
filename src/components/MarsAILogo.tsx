import { Link } from 'react-router-dom';

export function MarsAILogo() {
  return (
    <Link to="/" className="group flex flex-col items-start gap-0.5 transition-opacity hover:opacity-80">
      <span className="text-muted-foreground text-[10px] leading-none font-semibold tracking-[0.2em] uppercase">
        Festival
      </span>
      <div className="flex items-baseline gap-0.5 leading-none">
        <span className="text-foreground text-2xl font-bold tracking-tight">mars</span>
        <span className="text-primary text-2xl font-bold tracking-tight">AI</span>
      </div>
      <span className="text-muted-foreground/80 text-[10px] leading-none font-medium">Marseille 2026</span>
    </Link>
  );
}
