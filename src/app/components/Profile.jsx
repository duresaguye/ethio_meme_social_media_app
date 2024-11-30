import React, { useState } from 'react';

const Profile = () => {
    const [profile, setProfile] = useState({
        username: 'JohnDoe',
        bio: 'Meme enthusiast',
        avatar: 'https://via.placeholder.com/150'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle profile update logic here
        console.log('Profile updated:', profile);
    };

    return (
        <div className="profile p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold">Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={profile.username}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Bio:</label>
                    <textarea
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Avatar URL:</label>
                    <input
                        type="text"
                        name="avatar"
                        value={profile.avatar}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Update Profile
                </button>
            </form>
            <div className="profile-preview mt-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-semibold">Preview</h3>
                <img src={profile.avatar} alt="Avatar" className="w-24 h-24 rounded-full mx-auto" />
                <p className="mt-2 text-center text-lg font-medium">{profile.username}</p>
                <p className="mt-1 text-center text-gray-600">{profile.bio}</p>
            </div>
        </div>
    );
};

export default Profile;