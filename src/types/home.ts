import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { ButtonVariant, CardTitleVariants, cartVariants, iconVariants } from '@/utils/variants';
import { CollaboratorType } from './form';

export interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  color: string;
  className?: string;
  variant?: keyof typeof iconVariants;
}

export interface ProgramCardProps {
  title: string;
  description: string;
  date: string;
  capacity: string;
  className?: string;
  icon: LucideIcon;
  variant?: keyof typeof cartVariants;
  iconVariant?: keyof typeof iconVariants;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof cartVariants;
  icon?: LucideIcon;
  ref?: React.Ref<HTMLDivElement>;
}

export interface DescribeProps {
  children: React.ReactNode;
  className?: string;
}

export interface TitleProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  variant?: keyof typeof CardTitleVariants;
}

export interface IconBadgeProps {
  icon?: LucideIcon;
  variant?: keyof typeof iconVariants;
  className?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  position?: 'left' | 'right';
}

export interface FilmData {
  score_total: number;
  id: number;
  title: string;
  duration: number;
  language: string;
  video_url: string;
  country?: string;
  release_date?: string;
  thumbnail?: string;
  synopsis?: string;
  ia_type?: string;
  ai_tools?: string;
  stack?: string;
  status: FilmStatus;
  director_id: string | number;
  director_firstname?: string;
  director_lastname?: string;
  gallery_urls?: string[];
  collaborators: CollaboratorType[];
  ratings?: {
    id: number;
    score_creativity: number;
    score_technical: number;
    score_message: number;
    comment: string;
    jury_firstname: string;
    jury_lastname: string;
    score_total: number;
  }[];
  created_at?: string;
  updated_at?: string;
}

type FilmStatus = 'approved' | 'official_selection' | 'rejected' | 'pending' | 'in_review';

export interface FilmWithDirector extends FilmData {
  director_firstname: string;
  director_lastname: string;
}
