import { TFunction } from 'i18next';
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_VIDEO_SIZE = 524288000;

export const filmSubmissionSchema = (t: TFunction) => {
  return z.object({
    civility: z.string().min(1, { message: t('errors.required') }),
    firstName: z.string().min(2, { message: t('errors.tooShort') }),
    lastName: z.string().min(2, { message: t('errors.tooShort') }),
    birthDate: z.string().min(1, { message: t('errors.required') }),
    email: z.string().email({ message: t('errors.invalidEmail') }),
    mobile: z.string().min(5, { message: t('errors.required') }),
    address: z.string().min(5, { message: t('errors.required') }),
    postCode: z.string().min(2, { message: t('errors.required') }),
    city: z.string().min(2, { message: t('errors.required') }),
    country: z.string().min(2, { message: t('errors.required') }),
    job: z.string().min(2, { message: t('errors.required') }),
    source: z.string().min(1, { message: t('errors.required') }),
    newsletter: z.boolean().default(false),
    youtube: z.string().optional().or(z.literal('')),
    instagram: z.string().optional().or(z.literal('')),
    linkedin: z.string().optional().or(z.literal('')),
    facebook: z.string().optional().or(z.literal('')),
    twitter: z.string().optional().or(z.literal('')),
    aiClassification: z.string().min(1, { message: t('errors.required') }),
    techStack: z.string().min(2, { message: t('errors.required') }),
    methodology: z.string().min(2, { message: t('errors.required') }),
    title: z.string().min(2, { message: t('errors.required') }),
    titleEn: z.string().min(2, { message: t('errors.required') }),
    synopsis: z.string().min(2, { message: t('errors.required') }),
    synopsisEn: z.string().min(2, { message: t('errors.required') }),
    duration: z.coerce.number().min(1, { message: t('errors.required') }),
    language: z.string().min(2, { message: t('errors.required') }),
    semanticTags: z.string().min(1, { message: t('errors.required') }),
    video: z
      .any()
      .refine(files => files instanceof FileList && files.length > 0, {
        message: t('errors.videoRequired'),
      })
      .refine(files => files?.[0]?.size <= MAX_VIDEO_SIZE, {
        message: t('errors.videoTooLarge'),
      }),
    hasSubtitles: z.boolean().default(false),
    thumbnail: z
      .any()
      .refine(file => file instanceof File, t('errors.fileRequired'))
      .refine(file => file?.size <= MAX_FILE_SIZE, t('errors.fileTooLarge'))
      .refine(file => ACCEPTED_IMAGE_TYPES.includes(file?.type), t('errors.invalidFileType')),
    gallery: z
      .array(z.any()) 
      .max(3, { message: t('errors.maxFiles') })
      .optional(),
    collaborators: z
      .array(
        z.object({
          firstName: z.string().min(2, { message: t('errors.required') }),
          lastName: z.string().min(2, { message: t('errors.required') }),
          gender: z.string().optional(),
          job: z.string().min(2, { message: t('errors.required') }),
          email: z.string().email({ message: t('errors.invalidEmail') }),
          role: z.string().optional(),
        })
      )
      .optional(),
  });
};

export type FilmSubmissionData = z.infer<ReturnType<typeof filmSubmissionSchema>>;
