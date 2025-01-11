"use client";
import React from 'react';
import Profile from '../components/Profile';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
    return (
        <>
            <Navbar />
            <Profile />
        </>
    );
};

export default ProfilePage;
/*"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useAuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';

 
const ProfilePage = () => {
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
        <>
            <Navbar />
            <Profile />
        </>
    );
};

export default ProfilePage;*/