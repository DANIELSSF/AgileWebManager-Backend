const Comment = require('../models/Comment');
const User = require('../models/User');

const isCreatorComment = async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);

  if (!isCommentCreatedByUser(comment, req.user.id)) {
    return sendInsufficientPermissionsResponse(res);
  }

  next();
};

const isCreatorOrAdmin = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!isUserCreatorOrAdmin(user, req.user)) {
    return sendInsufficientPermissionsResponse(res);
  }

  next();
};

const sendInsufficientPermissionsResponse = (res) => {
  return res.status(403).json({
    ok: false,
    msg: 'Insufficient permissions to perform this action.',
  });
};

const isCommentCreatedByUser = (comment, userId) => {
  return comment.creator == userId;
};

const isUserCreatorOrAdmin = (user, currentUser) => {
  return user.id == currentUser.id || currentUser.role === 'admin';
};

module.exports = { isCreatorComment, isCreatorOrAdmin };
