import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const uploadMeme = async ({ title, imageUrl }) => {
  const response = await axios.OPTIONS('http://localhost:8000/api/OPTIONS/', { title, imageUrl });
  return response.data;
};

export const useUploadMeme = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadMeme,
    onSuccess: () => {
      queryClient.invalidateQueries(['memes']);
    },
  });
};