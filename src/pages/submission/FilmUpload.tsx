import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Send } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/button';
import Form from '@/components/ui/form';
import i18n from '@/i18n';
import { FilmSubmissionData, filmSubmissionSchema } from '@/schemas/filmSubmission.schema';
import AiSection from './components/AiSection';
import IdentitySection from './components/IdentitySection';
import MediaSection from './components/MediaSection';
import MemberSection from './components/MemberSection';
import SubmissionSuccessPopup from './components/SubmissionSuccessPopup';

export function FilmUpload() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleClosePopup = () => {
    navigate('/');
  };

  const methods = useForm({
    resolver: zodResolver(filmSubmissionSchema(t)),
    mode: 'onTouched',
    defaultValues: {
      civility: '',
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
      hasSubtitles: false,
      video: undefined,
      thumbnail: undefined,
      gallery: [],
      collaborators: [],
    },
  });

  useEffect(() => {
    const activeErrorFields = Object.keys(errors);

    if (activeErrorFields.length > 0) {
      methods.trigger(activeErrorFields as any);
    }
  }, [i18n.language]);

  const { isSubmitting, errors } = methods.formState;

  const onSubmit = async (data: FilmSubmissionData) => {
    setServerError(null);
    const formData = new FormData();

    const textFields: Record<string, any> = {
      ...data,
      duration: String(data.duration),
      hasSubtitles: String(data.hasSubtitles),
      newsletter: String(data.newsletter),
    };

    ['video', 'thumbnail', 'gallery', 'collaborators'].forEach(k => delete textFields[k]);

    Object.entries(textFields).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (data.video && data.video.length > 0) {
      formData.append('video', data.video[0]);
    }

    if (data.thumbnail) {
      formData.append('thumbnail', data.thumbnail);
    }

    if (data.gallery && data.gallery.length > 0) {
      data.gallery.forEach((file: File) => {
        formData.append('gallery', file);
      });
    }

    formData.append('collaborators', JSON.stringify(data.collaborators ?? []));

    try {
      const response = await fetch('http://localhost:3000/submissions', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur serveur (500)');
      }

      setShowSuccess(true);
    } catch (error: any) {
      console.error('Submission failed:', error);
      setServerError(error.message);
    }
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <FormProvider {...methods}>
        <Form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mx-auto max-w-4xl space-y-8 border-none bg-transparent p-0 ring-0"
        >
          <IdentitySection />
          <AiSection />
          <MediaSection />
          <MemberSection />

          {serverError && (
            <div className="bg-destructive/10 border-destructive/20 text-destructive flex items-center gap-3 rounded-xl border p-4">
              <AlertCircle className="size-5" />
              <p className="text-sm font-medium">Erreur : {serverError}</p>
            </div>
          )}

          <div className="pt-6">
            <Button
              type="submit"
              variant="purple"
              disabled={isSubmitting}
              className="w-full justify-center rounded-xl py-4 text-lg font-bold shadow-lg"
            >
              {isSubmitting ? t('submission.sending') : t('submission.submit')}
            </Button>
          </div>
        </Form>
      </FormProvider>

      <SubmissionSuccessPopup open={showSuccess} onClose={handleClosePopup} />
    </div>
  );
}
