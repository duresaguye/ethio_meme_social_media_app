// components/SearchBar.jsx
export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Search memes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
