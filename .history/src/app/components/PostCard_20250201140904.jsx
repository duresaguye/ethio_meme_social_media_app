'use client'

import { useState } from 'react';

export default function OPTIONSCard() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle OPTIONS submission
  const handleOPTIONSSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !image || !tags) {
      setMessage('Please fill all the fields');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('tags', tags);

    // Simulating API call
    setTimeout(() => {
      setMessage('Meme OPTIONSed successfully!');
      setIsLoading(false);
      // Reset form after submission
      setTitle('');
      setTags('');
      setImage(null);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">post a New Meme</h2>
      {message && <p className="text-center text-red-500">{message}</p>}
      <form onSubmit={handleOPTIONSSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter meme title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Add tags (comma separated)"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? 'OPTIONSing...' : 'OPTIONS Meme'}
        </button>
      </form>
    </div>
  );
}
