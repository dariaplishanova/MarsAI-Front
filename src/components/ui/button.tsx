import { ButtonProps } from '@/types/home';
import { buttonVariant } from '../utils/variants';
import { cn } from './utils';

const Button = ({ children,size, className, variant = 'default', icon, position = 'left', ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'z-10 flex h-fit w-fit items-center gap-3 rounded-md px-2 py-1 text-nowrap transition',
        buttonVariant[variant],
        className,
        size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base',
      )}
      {...props}
    >
      {position === 'left' && icon}
      {children}
      {position === 'right' && icon}
    </button>
  );
};

export default Button;
