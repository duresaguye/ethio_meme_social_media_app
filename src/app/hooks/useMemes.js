import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchMemes = async () => {
  const { data } = await axios.get('/api/memes');
  return data;
};

export const useMemes = () => {
  return useQuery({
    queryKey: ['memes'],
    queryFn: fetchMemes,
  });
};