// components/TagFilter.jsx
const popularTags = ['Funny', 'Relatable', 'Animals', 'Fails', 'Gaming'];

export default function TagFilter({ selectedTag, setSelectedTag }) {
  return (
    <div className="flex gap-2 overflow-x-auto mb-4">
      {popularTags.map((tag) => (
        <button
          key={tag}
          onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
          className={`px-4 py-2 rounded-full ${
            selectedTag === tag
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}
