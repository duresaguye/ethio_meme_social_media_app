"use client";
import { useState } from 'react';
import { useUploadMeme } from '../hooks/useUploadMeme';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { mutate: uploadMeme, isLoading } = useUploadMeme();

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadMeme({ title, imageUrl });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Meme title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload Meme'}
      </button>
    </form>
  );
}