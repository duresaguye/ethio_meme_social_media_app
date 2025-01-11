"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import { useAuth } from '../hooks/useAuth';
const PostPage = () => {
  const isAuthenticated = useAuth();
  return (
    <div className='mt-20'>
      <Navbar />
      <PostCard />
    </div>
  );
};  

export default PostPage;  