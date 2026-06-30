import * as React from 'react';
import { cn } from '../../utils/utils';

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function RadioGroup({ className, children, ...props }: RadioGroupProps) {
  return (
    <div className={cn('grid gap-3', className)} role="radiogroup" {...props}>
      {children}
    </div>
  );
}

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  description?: string;
}

export function RadioGroupItem({ className, id, label, description, ...props }: RadioGroupItemProps) {
  return (
    <label htmlFor={id} className="flex cursor-pointer gap-3 text-sm transition-all duration-200 select-none">
      <div className="flex h-5 items-center">
        <input
          type="radio"
          id={id}
          className={cn(
            'border-muted-foreground/40 text-primary focus:ring-ring bg-background checked:border-primary h-4 w-4 cursor-pointer appearance-none rounded-full border transition-all checked:border-4 focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
      </div>
      {(label || description) && (
        <div className="flex flex-col text-sm leading-none select-none">
          {label && <span className="text-foreground leading-tight font-semibold">{label}</span>}
          {description && <span className="text-muted-foreground mt-1 text-xs leading-normal">{description}</span>}
        </div>
      )}
    </label>
  );
}
