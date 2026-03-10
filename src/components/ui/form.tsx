import { LabelProps } from '@/types/form';
import { cn } from './utils';

export function FormGroup({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('flex w-full flex-col gap-2', className)}>{children}</div>;
}

export function Label({ className, required, children, ...props }: LabelProps) {
  return (
    <label htmlFor={props.htmlFor} className={cn('flex gap-2 text-sm font-medium md:text-base text-foreground', className)} {...props}>
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
        // Changed to clean white background with a ring color that matches the theme
        'border-border bg-background focus:ring-ring focus:border-ring w-full rounded-md border px-3 py-2 transition-all duration-200 focus:ring-2 focus:outline-none disabled:opacity-50 md:py-1.5 text-foreground',
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
        // Changed to clean white background
        'border-border bg-background focus:ring-ring focus:border-ring min-h-30 w-full rounded-md border px-3 py-2 transition-all duration-200 focus:ring-2 focus:outline-none disabled:opacity-50 text-foreground',
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
        // Cleaned up the form wrapper
        'bg-card border-border m-auto mt-6 flex w-full flex-col rounded-2xl border p-4 md:p-6 shadow-sm',
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
    <p className={cn('mt-1 text-xs font-medium text-destructive', className)} {...props}>
      {children}
    </p>
  );
}