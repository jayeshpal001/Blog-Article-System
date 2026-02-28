import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shodow-md transition" >
      <h3 className="text-xl font-semibold mb-2"> {post.title} </h3>
      <div className="flex gap-2 mb-4 flex-wrap">
        {post.tags.map(tag=>(
            <span key={tag} className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full font font-medium" >{tag}</span>
        ))}
      </div>
      <p className="text-gray-600 line-clamp-3 mb-4"> {post.content} </p>
      <div>
        Author: {post.author?.name || 'Unknown' }
      </div>
    </div>
  );
};

export default PostCard;
