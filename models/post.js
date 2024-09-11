const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  stockSymbol: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
