import React from "react";
import PostList from "../components/PostList";
import { useState, useEffect } from "react";

import axiosInstance from "../api/axiosInstance";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get("/posts");
        setPosts(res.data.posts); 
        setLoading(false); 
        console.log(res.data);
      } catch (error) {
        console.log(error);
        setError(error.response.data.message)
      }
    };
    fetchPosts();
  }, []);
  return <div>
    <PostList posts={posts} loading= {loading} error = {error}/>
  </div>;
};

export default Home;
