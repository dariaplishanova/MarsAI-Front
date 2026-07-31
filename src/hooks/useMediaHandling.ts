import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FilmSubmissionData } from '@/schemas/filmSubmission.schema';

export function useMediaHandling() {
  const { setValue, watch } = useFormContext<FilmSubmissionData>();

  const thumbnail = watch('thumbnail');
  const video = watch('video');
  const gallery = watch('gallery');

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setValue('thumbnail', file, { shouldValidate: true });
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (newFiles.length === 0) return;

    const existingFiles = Array.isArray(gallery)
      ? gallery
      : gallery && 'length' in gallery && typeof gallery !== 'string'
        ? Array.from(gallery as FileList)
        : [];
    const combinedFiles = [...existingFiles, ...newFiles].slice(0, 3);

    setValue('gallery', combinedFiles, { shouldValidate: true });
    e.target.value = '';
  };

  const removeGalleryImage = (indexToRemove: number) => {
    const existingFiles = Array.isArray(gallery) ? gallery : [];
    const updatedFiles = existingFiles.filter((_, index) => index !== indexToRemove);
    setValue('gallery', updatedFiles, { shouldValidate: true });
  };

  const createPreviews = (
    files: File | FileList | File[] | null | undefined,
    setState: (value: any) => void,
    multiple = false
  ) => {
    if (!files || (files instanceof FileList && files.length === 0) || (Array.isArray(files) && files.length === 0)) {
      setState(multiple ? [] : null);
      return () => {};
    }
    const fileArray = Array.isArray(files) ? files : files instanceof FileList ? Array.from(files) : [files];
    const urls = (fileArray as File[]).map(file => URL.createObjectURL(file));
    setState(multiple ? urls : urls[0]);
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  };

  useEffect(() => createPreviews(thumbnail, setThumbnailPreview), [thumbnail]);
  useEffect(() => createPreviews(video, setVideoPreview), [video]);
  useEffect(() => createPreviews(gallery, setGalleryPreviews, true), [gallery]);

  return {
    thumbnailPreview,
    videoPreview,
    galleryPreviews,
    handleThumbnailChange,
    handleGalleryChange,
    removeGalleryImage,
  };
}
