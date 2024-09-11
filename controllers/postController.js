const Post = require('../models/post');

// Create Post
exports.createPost = async (req, res) => {
  const { stockSymbol, title, description, tags } = req.body;

  try {
    const post = new Post({
      stockSymbol, title, description, tags, userId: req.user.id
    });
    await post.save();
    res.status(201).json({ success: true, postId: post._id, message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Posts (with filtering, sorting, pagination)
exports.getPosts = async (req, res) => {
  const { stockSymbol, tags, sortBy, page = 1, limit = 10 } = req.query;

  try {
    let query = {};
    if (stockSymbol) query.stockSymbol = stockSymbol;
    if (tags) query.tags = { $in: tags.split(',') };

    const posts = await Post.find(query)
      .sort(sortBy === 'likes' ? { likes: -1 } : { createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Post with Comments
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('userId').populate({ path: 'comments'}).populate('likes','username');
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post || post.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }
    await Post.findByIdAndDelete(req.params.postId);
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
