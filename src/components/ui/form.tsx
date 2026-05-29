import { ChevronDown } from 'lucide-react';
import { LabelProps } from '@/types/form';
import { cn } from '../../utils/utils';

export function FormGroup({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('flex w-full flex-col gap-2', className)}>{children}</div>;
}

export function Label({ className, required, children, ...props }: LabelProps) {
  return (
    <label
      htmlFor={props.htmlFor}
      className={cn('text-foreground flex gap-2 text-sm font-medium md:text-base', className)}
      {...props}
    >
      {children}
      {required && <span className="text-primary">*</span>}
    </label>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'border-border bg-background focus:ring-ring focus:border-ring text-foreground w-full rounded-md border px-3 py-2 text-base transition-all duration-200 focus:ring-2 focus:outline-none disabled:opacity-50 md:py-1.5',
        className
      )}
      {...props}
    />
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea
      className={cn(
        'border-border bg-background focus:ring-ring focus:border-ring text-foreground min-h-30 w-full rounded-md border px-3 py-2 text-base transition-all duration-200 focus:ring-2 focus:outline-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Form({ children, className, ...props }: FormProps) {
  return (
    <form
      className={cn(
        'bg-card border-border m-auto mt-6 flex w-full flex-col rounded-2xl border p-4 shadow-sm md:p-6',
        className
      )}
      {...props}
    >
      {children}
    </form>
  );
}

interface ErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

export function ErrorParagraph({ children, className, ...props }: ErrorProps) {
  return (
    <p className={cn('text-destructive mt-1 text-xs font-medium', className)} {...props}>
      {children}
    </p>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          'border-border bg-background focus:ring-ring focus:border-ring text-foreground w-full appearance-none rounded-md border px-4 py-3.5 text-base font-medium transition-all duration-200 focus:ring-2 focus:outline-none disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </select>

      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-4 flex items-center">
        <ChevronDown className="h-5 w-5" />
      </div>
    </div>
  );
}
