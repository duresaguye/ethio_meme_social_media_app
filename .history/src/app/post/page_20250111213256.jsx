"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';

const PostPage = () => {
  return (
    <div className='mt-20'>
      <Navbar />
      <PostCard />
    </div>
  );
};  

export default PostPage;  