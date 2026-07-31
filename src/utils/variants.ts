export const buttonVariants = {
  default: 'border border-border hover:bg-muted text-foreground',
  purple: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-all',
  connexion: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10',
  green: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all',
  ghost: 'hover:bg-muted hover:text-muted-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
  active: 'bg-primary text-primary-foreground',
  outline: 'border border-border bg-background text-foreground hover:bg-muted',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  dropdown:
    'bg-card border-border hover:border-primary focus:ring-primary focus:ring-offset-background flex items-center gap-2 rounded-lg border px-3 py-1.5 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none',
} as const;

export const iconVariants = {
  default: 'bg-muted ring-border text-muted-foreground',
  // Blush Pink
  purple: 'bg-[#F4A3A4]/20 ring-[#F4A3A4]/40 text-[#D87D7D] hover:bg-[#F4A3A4]/30',
  // Soft Sage Green
  green: 'bg-[#AEC3B0]/30 ring-[#AEC3B0]/50 text-[#7A8C7C] hover:bg-[#AEC3B0]/40',
  // Dusty Blue
  blue: 'bg-[#9BA8B5]/20 ring-[#9BA8B5]/40 text-[#6B7988]',
  // Warm Gold/Sand
  gold: 'bg-[#D9C589]/20 ring-[#D9C589]/40 text-[#A6935B] hover:bg-[#D9C589]/30',
} as const;

export const cartVariants = {
  default: 'bg-card border-border shadow-sm text-foreground',
  // Cards now have distinct soft backgrounds and borders!
  purple: 'border-[#F4A3A4]/40 bg-[#F4A3A4]/10 hover:bg-[#F4A3A4]/20 transition-colors',
  green: 'border-[#AEC3B0]/40 bg-[#AEC3B0]/10 hover:bg-[#AEC3B0]/20 transition-colors',
  blue: 'border-[#9BA8B5]/40 bg-[#9BA8B5]/10',
  gold: 'border-[#D9C589]/40 bg-[#D9C589]/10 hover:bg-[#D9C589]/20 transition-colors',
  // Keep the rest the same...
  time_green: 'bg-white/60 border-secondary/50 backdrop-blur-md shadow-sm',
  time_purple: 'bg-white/80 border-primary/30 backdrop-blur-md ring-primary/20 shadow-sm',
  dashboard: 'rounded-2xl border border-border bg-card shadow-sm p-4 md:p-6',
  formSection: 'bg-card border-border shadow-lg shadow-primary/5 rounded-2xl p-6',
};

export const CardTitleVariants = {
  default: 'text-3xl md:text-4xl text-foreground mb-2',
  videoSection: 'text-2xl md:text-10 text-foreground mb-[7px]',
};

export const CardSubTitleVariant = {
  default: 'text-base text-muted-foreground',
  videoSection: 'text-6 text-muted-foreground',
};

export const filmStatusStyles = {
  approved: 'bg-green-100 text-green-700',
  official_selection: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-700',
  in_review: 'bg-yellow-100 text-yellow-700',
};

export type ButtonVariant = keyof typeof buttonVariants;
