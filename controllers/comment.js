const { response } = require('express');

const Todo = require('../models/Todo');
const Comment = require('../models/Comment');

const createComment = async (req, res = response) => {
  const { todoId, comment } = req.body;

  try {
    const createdComment = await Comment.create({
      comment,
      date: new Date(),
      creator: req.user.id,
      todo: todoId,
    });

    await Todo.findByIdAndUpdate(todoId, {
      $push: { comments: createdComment._id },
    });

    res.status(201).json({
      ok: true,
      comment: createdComment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact the administrator',
    });
  }
};

const getComments = async (req, res = response) => {
  try {
    const comments = await Comment.find().populate('creator', 'name');
    res.status(200).json({
      ok: true,
      comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact the administrator',
    });
  }
};

const deleteComment = async (req, res = response) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);
    
    await Comment.findByIdAndDelete(id);
    await Todo.updateOne({ _id: comment.todo }, { $pull: { comments: id } });

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Talk to the administrator',
    });
  }
};

module.exports = {
  createComment,
  deleteComment,
  getComments,
};
