const Comment = require('../models/comment');

// Add Comment
exports.addComment = async (req, res) => {
  const { comment } = req.body;

  try {
    const newComment = new Comment({ comment, postId: req.params.postId, userId: req.user.id });
    await newComment.save();
    res.json({ success: true, commentId: newComment._id, message: 'Comment added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment || comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
