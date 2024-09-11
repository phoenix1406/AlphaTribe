const User = require('../models/user');

// Get User Profile
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({ id: user._id, username: user.username, bio: user.bio, profilePicture: user.profilePicture });
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  const { username, bio } = req.body;
  let profilePicture;
 
  if (req.file) {
     profilePicture = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  } else {
    profilePicture = req.body.profilePicture;
  }

  try {
    const user = await User.findByIdAndUpdate(req.user.id, { username, bio, profilePicture }, { new: true });
    res.json({ success: true, message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
