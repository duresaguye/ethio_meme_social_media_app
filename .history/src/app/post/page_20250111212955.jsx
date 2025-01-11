// /home/dura/Codes/ethio_meme_social_media_app/src/hooks/useAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const router = useRouter();
  const isAuthenticated = false; // Replace with your actual authentication logic

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated;
};

export default useAuth;