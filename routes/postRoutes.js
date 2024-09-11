const express = require('express');
const { createPost, getPosts, getPost, deletePost } = require('../controllers/postController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, createPost);
router.get('/', getPosts);
router.get('/:postId', getPost);
router.delete('/:postId', protect, deletePost);

module.exports = router;
