import React, { useState } from 'react';
import Link from 'next/link';
import { FaUserPlus, FaSignInAlt, FaInfoCircle, FaHome, FaPassport, FaUser } from 'react-icons/fa';
import SearchBar from './SearchBar';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const isAuthenticated = useAuth();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="bg-indigo-600 p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="text-white text-lg font-bold">
                <Link href="/">Ethio Memes</Link>
            </div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="text-white bg-gray-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                    Menu
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                        <Link href="/" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                            <FaHome className="mr-2" /> Home
                        </Link>
                        {!isAuthenticated && (
                            <>
                                <Link href="/auth/signup" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    <FaUserPlus className="mr-2" /> Sign Up
                                </Link>
                                <Link href="/auth/login" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    <FaSignInAlt className="mr-2" /> Login
                                </Link>
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                <Link href="/OPTIONS" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    <FaPassport className="mr-2" /> OPTIONS
                                </Link>
                                <Link href="/profile" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    <FaUser className="mr-2" /> Profile
                                </Link>
                            </>
                        )}
                        <Link href="/about" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                            <FaInfoCircle className="mr-2" /> About Us
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
