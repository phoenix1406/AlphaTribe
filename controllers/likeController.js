const Post = require('../models/post');

// Like Post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id);
      await post.save();
    }
    res.json({ success: true, message: 'Post liked' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unlike Post
exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    post.likes = post.likes.filter(id => id.toString() !== req.user.id);
    await post.save();
    res.json({ success: true, message: 'Post unliked' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
