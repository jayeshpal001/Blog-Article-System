const express = require("express"); 
const { createPost, getPublishedPosts, updatePost, deletePost } = require("../controllers/post.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authRoles = require("../middleware/role.middleware");


const router = express.Router(); 

router.get('/',authMiddleware, getPublishedPosts); 
router.post('/',authMiddleware, authRoles("Writer", "Admin"), createPost); 
router.put('/:id',authMiddleware, authRoles("Writer", "Admin"), updatePost); 
router.delete('/:id',authMiddleware, authRoles("Writer", "Admin"), deletePost); 

module.exports = router; 