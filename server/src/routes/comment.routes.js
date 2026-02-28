const express = require("express"); 

const authMiddleware = require("../middleware/auth.middleware");

const { addComment, deleteComment } = require("../controllers/comment.controller");

const router = express.Router(); 
router.put('/:postId', authMiddleware,  addComment); 
router.delete('/:commentId',authMiddleware, deleteComment); 

module.exports = router; 