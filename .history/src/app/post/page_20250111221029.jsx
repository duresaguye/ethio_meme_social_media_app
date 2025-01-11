
"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import { useAuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';

const PostPage = () => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (isLoading || isAuthenticated === null) {
    return <Loading />; // Show loading spinner while checking authentication
  }

  return (
    <div className='mt-20'>
      <Navbar />
      <PostCard />
    </div>
  );
};

export default PostPage;