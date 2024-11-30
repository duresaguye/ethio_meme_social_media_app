'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const signup = async (userData) => {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Signup failed');
        }

        return response.json();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup({ email, password, fullName, confirmPassword });
            router.push('/auth/login');
        } catch (error) {
            console.error(error);
        }
    };

    const handleFacebookSignup = () => {
        // Redirect to Facebook OAuth flow
        window.location.href = '/api/auth/facebook';
    };

    const handleGoogleSignup = () => {
        // Redirect to Google OAuth flow
        window.location.href = '/api/auth/google';
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-900">Sign Up</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Log in
                        </a>
                    </p>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        onClick={handleFacebookSignup}
                        className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <FaFacebook className="mr-2" /> Sign Up with Facebook
                    </button>
                    <button
                        onClick={handleGoogleSignup}
                        className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        <FaGoogle className="mr-2" /> Sign Up with Google
                    </button>
                </div>
            </div>
        </div>
    );
}