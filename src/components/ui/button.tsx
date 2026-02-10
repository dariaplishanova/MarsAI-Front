import { ButtonProps } from '@/types/home';
import { buttonVariant } from '../utils/viariants';
import { cn } from './utils';

const Button = ({ children, className, variant = 'default', icon, position = 'left', ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        buttonVariant[variant],
        'z-10 flex w-full items-center gap-3 rounded-md px-4 py-2 transition md:w-fit cursor-pointer active:scale-101',
        className
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
