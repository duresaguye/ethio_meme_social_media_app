'use client';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import MemeCard from './components/MemeCard';
import TagFilter from './components/TagFilter';
import { useMemes } from './hooks/useMemes';
import Navbar from './components/Navbar';

export default function HomePage() {
  const { data: memes, isLoading, error } = useMemes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  console.log('isLoading:', isLoading);
  console.log('error:', error);
  console.log('memes:', memes);

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
    </div>
  )
  if (error) return <div>Failed to load memes!</div>;

  const filteredMemes = (memes || []).filter((meme) => {
    return (
      (searchTerm === '' || meme.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedTag === null || meme.tags.includes(selectedTag))
    );
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl ml-20 mr-20 mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-6">
          {filteredMemes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
        </div>
      </div>
    </div>
  );
}