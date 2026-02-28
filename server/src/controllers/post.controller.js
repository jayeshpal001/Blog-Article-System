const asyncHandler = require("express-async-handler");
const Post = require("../models/post.model");

exports.createPost = asyncHandler(async (req, res) => {
  const { title, content, tags, status } = req.body;

  const newPost = await Post.create({
    title,
    content,
    tags,
    status: status || draft,
    author: req.user.id,
  });
  res.status(201).json({
    message: "Post created successfully",
    post: newPost,
  });
});

exports.getPublishedPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const searchQuery = req.query.search;
  let query = { status: "published" };
  if (searchQuery) {
    query.$or = [
      { title: { $regex: searchQuery, $options: "i" } },
      { content: { $regex: searchQuery, $options: "i" } },
      { tags: { $regex: searchQuery, $options: "i" } },
    ];
  }
  const posts = await Post.find(query)
    .populate("author", "name email")
    .sort({ createAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments(query);
  res.status(200).json({
    posts,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalPosts: total,
  });
});

exports.updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, status } = req.body;

  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (post.author.toString() !== req.user.id && req.user.role !== "Admin") {
    res.status(403);
    throw new Error("Not authorized to edit this post");
  }
  post.title = title || post.title;
  post.content = content || post.content;
  post.tags = tags || post.tags;
  post.status = status || post.status;

  const updatedPost = await post.save();

  res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
});

exports.deletePost = asyncHandler(async (req, res) => {
    const {id} = req.params; 
    const post = await Post.findById(id); 
    if (!post) {
        res.status(404)
        throw new Error("Post not found");
    }
    if (post.author.toString() !== req.user.id && req.user.role !=='admin') {
        res.status(403)
        throw new Error("Not authorized to delete this post");
    }
    await post.deleteOne(); 
    res.status(200).json({
        success: true, 
        message: "Post deleted successfully"
    })
})
