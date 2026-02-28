import React from "react";
import PostCard from "./PostCard";

const PostList = ({ posts, loading, error }) => {
  if (loading) {
    return <p className="text-gray-500 text-center py-10">Loading posts....</p>;
  }
  if (error) {
    return <p className="text-gray-500 text-center py-10">{error}</p>;
  }
  if (posts.length === 0) {
    return (
      <p className="text-gray-500 text-center py-10">
        No published posts found
      </p>
    );
  }
  return <div>
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Published posts</h2>
    <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post)=>(
            <PostCard key={post._id} post={post} />
        ))}
    </div>
  </div>;
};

export default PostList;
