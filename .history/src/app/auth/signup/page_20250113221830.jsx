'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import GoogleLoginButton from '../../components/GoogleLoginButton';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleSignup = async (username, password, email) => {
        try {
            const response = await fetch("http://localhost:8000/api/signup/", {
               method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, email }),
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                alert("Signup successful!");
                console.log("Signup successful:", data.message);
                router.push('/profile'); // Redirect to the profile page
            } else {
                const errorData = await response.json();
                console.error("Signup failed:", errorData);
                alert("Signup failed: " + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            await handleSignup(username, password, email);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFacebookSignup = () => {
        window.location.href = '/api/auth/facebook';
    };

    const handleGoogleLogin = async (response) => {
        console.log("Google login response received:", response); // Check response object
        if (response.credential) {
            try {
                console.log("Sending Google credential to server...");
                const res = await fetch("http://localhost:8000/api/google-login/", {
                   method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ access_token: response.credential }),
                    credentials: "include",
                    
                });
    
                const data = await res.json();
                console.log("Server response:", res.status, data); // Log server response
    
                if (res.ok) {
                    console.log("Login successful, updating local storage and navigating...");
                    localStorage.setItem('access_token', data.access);
                    localStorage.setItem('refresh_token', data.refresh);
    
                    router.push('/profile'); // Redirect to profile or home after successful login
                } else {
                    console.error("Google login failed:", data);
                    alert("Google login failed: " + JSON.stringify(data));
                }
            } catch (error) {
                console.error("Error verifying Google token:", error);
                alert("An error occurred. Please try again.");
            }
        } else {
            console.warn("No credential found in response.");
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-900">Sign Up</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
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
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign Up
                    </button>
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
                    {/* Google login button integrated here */}
                    <div className="mt-6 text-center">
                        <GoogleLoginButton handleGoogleLogin={handleGoogleLogin} />
                    </div>
                </div>
            </div>
        </div>
    );
}