"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/Loading';

const PostPage = () => {
  const isAuthenticated = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
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