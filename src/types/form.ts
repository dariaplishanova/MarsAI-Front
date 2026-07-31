export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  required?: boolean;
  children: React.ReactNode;
}
export interface SelectProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export interface CollaboratorType {
  id: string;
  firstname: string;
  lastname: string;
  job: string;
  email: string;
  movie_id?: number;
}
