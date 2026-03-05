import { z } from 'zod';
import { TFunction } from 'i18next';

// Setting constants for our file validation to keep the schema clean
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const filmSubmissionSchema = (t: TFunction) => {
  return z.object({
    // ---------------------------------------------------------
    // 1. IDENTITY SECTION
    // ---------------------------------------------------------
    civility: z.enum(['M.', 'Mme'], { required_error: t('errors.required') }),
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
    
    // We expect a string from the select dropdown
    source: z.string().min(1, { message: t('errors.required') }),
    newsletter: z.boolean().default(false),
    
    // Social URLs: We use .optional().or(z.literal('')) so the user can leave it completely blank
    youtube: z.string().optional().or(z.literal('')),
    instagram: z.string().optional().or(z.literal('')),
    linkedin: z.string().optional().or(z.literal('')),
    facebook: z.string().optional().or(z.literal('')),
    twitter: z.string().optional().or(z.literal('')),

    // ---------------------------------------------------------
    // 2. AI SECTION
    // ---------------------------------------------------------
    aiClassification: z.string().min(1, { message: t('errors.required') }),
    techStack: z.string().min(2, { message: t('errors.required') }),
    methodology: z.string().min(10, { message: t('errors.required') }),

    // ---------------------------------------------------------
    // 3. MEDIA SECTION
    // ---------------------------------------------------------
    title: z.string().min(2, { message: t('errors.required') }),
    titleEn: z.string().min(2, { message: t('errors.required') }),
    synopsis: z.string().min(10, { message: t('errors.required') }),
    synopsisEn: z.string().min(10, { message: t('errors.required') }),
    
    // Coerce safely converts the string value from the HTML input into a strict Number
    duration: z.coerce.number().min(1, { message: t('errors.required') }),
    language: z.string().min(2, { message: t('errors.required') }),
    semanticTags: z.string().optional(),
    
    // YouTube URL must be a valid URL format if it is provided
    youtubeUrl: z.union([z.string().url({ message: t('errors.invalidUrl') }), z.literal('')]).optional(),
    hasSubtitles: z.boolean().default(false),

    // ---------------------------------------------------------
    // 4. FILES (THE TRICKY PART)
    // ---------------------------------------------------------
    thumbnail: z
      .any()
      .refine((file) => file instanceof File, t('errors.fileRequired'))
      .refine((file) => file?.size <= MAX_FILE_SIZE, t('errors.fileTooLarge'))
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), t('errors.invalidFileType')),
      
    gallery: z
      .array(z.any())
      // We limit to 3 to match the backend Multer configuration (maxCount: 3)
      .max(3, { message: t('errors.maxFiles') })
      .optional(),

    // ---------------------------------------------------------
    // 5. COLLABORATORS (DYNAMIC ARRAY)
    // ---------------------------------------------------------
    collaborators: z.array(
      z.object({
        firstName: z.string().min(2, { message: t('errors.required') }),
        lastName: z.string().min(2, { message: t('errors.required') }),
        gender: z.string().optional(),
        job: z.string().min(2, { message: t('errors.required') }),
        email: z.string().email({ message: t('errors.invalidEmail') }),
        role: z.string().optional(),
      })
    ).optional(),
  });
};

// We extract the TypeScript type directly from the Zod schema so we never have to write it twice!
export type FilmSubmissionData = z.infer<ReturnType<typeof filmSubmissionSchema>>;