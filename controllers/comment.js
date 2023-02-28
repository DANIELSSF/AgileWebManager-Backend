const { response } = require("express");
const Comment = require("../models/Comment");
const Todo = require("../models/Todo");
const Todos = require("../models/Todo");

const createComment = async (req, res = response) => {
  const { creatorId, todoId, comment } = req.body;

  if (!creatorId) {
    return res.status(404).json({
      ok: false,
      msg: "creator not found",
    });
  }
  if (!todoId) {
    return res.status(404).json({
      ok: false,
      msg: "Id todo not found",
    });
  }

  try {
    const newComment = new Comment({
      comment,
      date: new Date(),
      creator: creatorId,
    });
    const commentSaved = await newComment.save();

    const todo = await Todos.findById(todoId);
    todo.comments.push(commentSaved._id);
    await todo.save();

    res.status(201).json({
      ok: true,
      comment: commentSaved,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Contact the administrator",
    });
  }
};

const getComments = async (req, res = response) => {
  const comments = await Comment.find().populate("creator", "name");

  try {
    res.status(200).json({
      ok: true,
      comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Contact the administrator",
    });
  }
};

const deleteComment = async (req, res = response) => {
  const commentId = req.params.id;
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        ok: false,
        msg: "no comment with this id was found",
      });
    }

    const todos = await Todo.find({ "table.comment1": commentId });

    // Removes the comment from the list of comments for each found item
    todos.forEach(async (todo) => {
      const commentIndex = todo.comments.findIndex(
        (comment) => comment == commentId
      );
      if (commentIndex !== -1) {
        todo.comments.splice(commentIndex, 1);
        await todo.save();
      }
    });

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
};

module.exports = {
  createComment,
  deleteComment,
  getComments,
};
