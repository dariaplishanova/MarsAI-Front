import type { TFunction } from 'i18next';
import { z } from 'zod';

export const registerSchema = (t: TFunction) =>
  z.object({
    firstname: z.string().trim().min(2, t('errors.min_2_chars')),
    lastname: z.string().trim().min(2, t('errors.min_2_chars')),
    email: z.string().min(1, t('errors.required')).email(t('errors.invalid_email')),
    password: z
      .string()
      .min(8, t('errors.pass_min_8'))
      .regex(/[A-Z]/, t('errors.pass_uppercase'))
      .regex(/[0-9]/, t('errors.pass_number'))
      .regex(/[!@#$%^&*]/, t('errors.pass_special_char')),
  });

// THE MAGIC EXPORT: Extract the Type from the schema
export type RegisterFormData = z.infer<ReturnType<typeof registerSchema>>;
