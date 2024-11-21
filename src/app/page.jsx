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

  if (isLoading) return <div>Loading memes...</div>;
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
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">ethio Memes</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TagFilter selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
        <div className="flex flex-col gap-4 mt-6">
          {filteredMemes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
        </div>
      </div>
    </div>
  );
}