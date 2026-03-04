import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/button';
import Form from '@/components/ui/form';
import { FilmSubmissionData, filmSubmissionSchema } from '@/schemas/filmSubmission.schema';
import AiSection from './components/AiSection';
import IdentitySection from './components/IdentitySection';
import MediaSection from './components/MediaSection';
import MemberSection from './components/MemberSection';

export function FilmUpload() {
  const { t } = useTranslation();

  const methods = useForm({
    resolver: zodResolver(filmSubmissionSchema(t)),
    defaultValues: {
      civility: 'M.',
      firstName: '',
      lastName: '',
      birthDate: '',
      email: '',
      mobile: '',
      address: '',
      postCode: '',
      city: '',
      country: '',
      job: '',
      source: '',
      newsletter: false,
      youtube: '',
      instagram: '',
      linkedin: '',
      facebook: '',
      twitter: '',

      aiClassification: '100',
      techStack: '',
      methodology: '',

      title: '',
      titleEn: '',
      synopsis: '',
      synopsisEn: '',
      duration: 0,
      language: '',
      semanticTags: '',
      youtubeUrl: '',
      hasSubtitles: false,
      thumbnail: undefined,
      gallery: [],

      collaborators: [],
    },
  });

  const onSubmit = async (data: FilmSubmissionData) => {
    const formData = new FormData();

    /**
     * 1️⃣ TEXT / SIMPLE FIELDS
     * Everything here becomes a string in FormData
     */
    const textFields: Record<string, string> = {
      civility: data.civility,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      email: data.email,
      mobile: data.mobile,
      address: data.address,
      postCode: data.postCode,
      city: data.city,
      country: data.country,
      job: data.job,
      source: data.source,

      youtube: data.youtube ?? '',
      instagram: data.instagram ?? '',
      linkedin: data.linkedin ?? '',
      facebook: data.facebook ?? '',
      twitter: data.twitter ?? '',

      aiClassification: data.aiClassification,
      techStack: data.techStack,
      methodology: data.methodology,

      title: data.title,
      titleEn: data.titleEn,
      synopsis: data.synopsis,
      synopsisEn: data.synopsisEn,
      language: data.language,
      semanticTags: data.semanticTags ?? '',
      youtubeUrl: data.youtubeUrl ?? '',

      // numbers & booleans → string
      duration: String(data.duration),
      hasSubtitles: String(data.hasSubtitles),
      newsletter: String(data.newsletter),
    };

    Object.entries(textFields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    /**
     * 2️⃣ FILES
     */
    if (data.thumbnail) {
      formData.append('thumbnail', data.thumbnail);
    }

    data.gallery?.forEach(file => {
      formData.append('gallery', file);
    });

    /**
     * 3️⃣ COMPLEX DATA (arrays / objects)
     */
    formData.append('collaborators', JSON.stringify(data.collaborators ?? []));

    /**
     * 4️⃣ SEND TO BACKEND
     */
    await fetch('http://localhost:3000/submissions', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <div className="min-h-screen bg-[#06080D] py-12">
      <FormProvider {...methods}>
        <Form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mx-auto max-w-4xl space-y-8 border-none bg-transparent p-0 ring-0"
        >
          <IdentitySection />
          <AiSection />
          <MediaSection />
          <MemberSection />

          <div className="pt-6">
            <Button
              type="submit"
              variant="purple"
              icon={<Send className="size-5" />}
              position="right"
              className="w-full justify-center rounded-xl bg-purple-600 py-4 text-lg font-bold text-white shadow-lg shadow-purple-600/20 hover:bg-purple-700"
            >
              {t('common.submit')}
            </Button>
          </div>
        </Form>
      </FormProvider>
    </div>
  );
}
