import { useState } from 'react';

export const useImageUpload = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [thumbnailUrls, setThumbnailUrls] = useState<string[]>([]);

  const handleImageUpload = (
    files: FileList | null,
    type: 'image' | 'thumbnail',
    setValue: (name: 'image' | 'thumbnail', value: string | string[]) => void
  ) => {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const result = event.target.result as string;
          if (type === 'image') {
            setValue('image', result);
            setImagePreview(result);
          } else if (type === 'thumbnail') {
            const updatedThumbnails = [...thumbnailUrls, result];
            setThumbnailUrls(updatedThumbnails);
            setValue('thumbnail', updatedThumbnails);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (
    type: 'image' | 'thumbnail',
    setValue: (name: 'image' | 'thumbnail', value: string | string[] ) => void,
    index?: number
  ) => {
    if (type === 'image') {
      setImagePreview(null);
      setValue('image', '');
    } else if (type === 'thumbnail' && index !== undefined) {
      const updatedThumbnails = thumbnailUrls.filter((_, i) => i !== index);
      setThumbnailUrls(updatedThumbnails);
      setValue('thumbnail', updatedThumbnails);
    }
  };

  return {
    imagePreview,
    setImagePreview,
    thumbnailUrls,
    setThumbnailUrls,
    handleImageUpload,
    removeImage,
  };
};
