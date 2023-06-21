const Comment = require('../models/Comment');
const Table = require('../models/Table');
const Todo = require('../models/Todo');
const User = require('../models/User');

const checkExistsById = async (model, id, errorMessage) => {
  const item = await model.findById(id);
  if (!item) {
    throw new Error(errorMessage);
  }
};

const checkCommentExistsById = async (commentId) => {
  await checkExistsById(Comment, commentId, 'No comment exists for this id');
};

const checkTodoExistsById = async (todoId) => {
  await checkExistsById(Todo, todoId, 'No todo exists for this id');
};

const checkTableExistsById = async (tableId) => {
  await checkExistsById(Table, tableId, 'No table exists for this id');
};

const checkUserExistsById = async (userId) => {
  await checkExistsById(User, userId, 'No user with this id was found');
};

const checkUserExistsByEmail = async (email, shouldExist = false) => {
  const user = await User.findOne({ email });

  if (shouldExist && !user) {
    throw new Error('Incorrect password / email');
  } else if (!shouldExist && user) {
    throw new Error('User exists with that email address');
  }
};

const validStatus = new Set(['start', 'progress', 'done']);

module.exports = {
  checkCommentExistsById,
  checkTodoExistsById,
  checkTableExistsById,
  checkUserExistsByEmail,
  checkUserExistsById,
  validStatus,
};
