import { Link } from 'react-router-dom';

export function MarsAILogo() {
  return (
    <Link to="/" className="group flex flex-col items-start gap-0.5 transition-opacity hover:opacity-80">
      <span className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase leading-none">
        Festival
      </span>
      <div className="flex items-baseline gap-0.5 leading-none">
        <span className="text-2xl font-bold tracking-tight text-foreground">
          mars
        </span>
        <span className="text-2xl font-bold tracking-tight text-primary">
          AI
        </span>
      </div>
      <span className="text-[10px] font-medium text-muted-foreground/80 leading-none">
        Marseille 2026
      </span>
    </Link>
  );
}