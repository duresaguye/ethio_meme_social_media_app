import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <div className="text-white text-lg font-bold">
                <Link href="/">Logo</Link>
            </div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="text-white bg-gray-700 px-3 py-1 rounded-md"
                >
                    Menu
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10">
                        <Link href="/signup" className="block px-3 py-1 text-gray-800 hover:bg-gray-200">
                            Sign Up
                        </Link>
                        <Link href="/login" className="block px-3 py-1 text-gray-800 hover:bg-gray-200">
                            Login
                        </Link>
                        <Link href="/about" className="block px-3 py-1 text-gray-800 hover:bg-gray-200">
                            About Us
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;