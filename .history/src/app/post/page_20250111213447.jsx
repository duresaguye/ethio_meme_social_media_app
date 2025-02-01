"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import OPTIONSCard from '../components/OPTIONSCard';
import { useAuth } from '../hooks/useAuth';
const OPTIONSPage = () => {
  const isAuthenticated = useAuth();
  return (
    <div className='mt-20'>
      <Navbar />
      <OPTIONSCard />
    </div>
  );
};  

export default OPTIONSPage;  