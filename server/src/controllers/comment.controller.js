
const asyncHandler = require("express-async-handler"); 
const Post = require("../models/post.model");
const Comment = require("../models/comments.model");

exports.addComment = asyncHandler(async (req, res) => {
    const {postId} = req.params; 
    const {content} = req.body; 
    const post = await Post.findById(postId); 
    if (!post || post.status !== 'published') {
        res.status(404)
        throw new Error("Published post not found");
    }
    const newComment = new Comment({
        content, 
        post: postId, 
        author: req.user.id
    }); 
    await newComment.save(); 
    res.status(201).json({
        success: true, 
        message: "Comment added successfully", 
        comment: newComment
    })
})

exports.deleteComment = asyncHandler(async (req, res) => {
    const {commentId} = req.params; 
    const comment = await Comment.findById(commentId); 
    if (!comment) {
        res.status(404)
        throw new Error("Comment not found");
    }
    if (comment.author.toString() !== req.user.id&&req.user.role != 'Admin') {
        res.status(403)
        throw new Error("Not authorized to delete this comment");
    }
    await comment.deleteOne(); 
    res.status(200).json({
        success: true, 
        message: "Comment deleted successfully"
    }); 
})

