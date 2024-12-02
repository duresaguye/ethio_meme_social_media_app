import { useState } from 'react';
import { FaHeart, FaRegHeart, FaCommentAlt } from 'react-icons/fa';

export default function MemeCard({ meme }) {
  const [likes, setLikes] = useState(meme.likes);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(meme.comments || []);
  const [newComment, setNewComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false); // To toggle comment input visibility

  // Handle the like button toggle
  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  // Handle adding a comment
  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
      setIsCommenting(false); // Close comment input after adding
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-xs mx-auto">
      <img
        src={meme.imageUrl}
        alt={meme.title}
        className="w-full h-auto rounded-lg"
      />
  
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-red-500"
        >
          {liked ? <FaHeart /> : <FaRegHeart />} {likes}
        </button>

        {/* Comment Button */}
        <button
          onClick={() => setIsCommenting(!isCommenting)} // Toggle comment section visibility
          className="flex items-center gap-1 text-gray-500"
        >
          <FaCommentAlt /> Comment
        </button>
      </div>

      {/* Conditionally render comment input if isCommenting is true */}
      {isCommenting && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            onClick={handleAddComment}
            className="mt-2 w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Comment
          </button>
        </div>
      )}

      {/* Display Comments */}
      <div className="mt-4">
        {comments.length > 0 && (
          <>
            <h3 className="text-lg font-bold mb-2">Comments</h3>
            <div className="space-y-2">
              {comments.map((comment, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded-lg">
                  {comment}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
