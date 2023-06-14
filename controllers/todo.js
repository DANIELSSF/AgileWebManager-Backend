const { response, request } = require('express');

const { writefile } = require('../helpers');

const Todo = require('../models/Todo');
const Table = require('../models/Table');
const Comment = require('../models/Comment');

const getTodos = async (req, res = response) => {
  try {
    const todos = await Todo.find().populate({
      path: 'comments', // populate comments
      select: { __v: 0 },
      populate: {
        path: 'creator',
        select: { name: 1, uid: 1 }, // in comments, populate creator
      },
    });
    res.status(200).json({
      ok: true,
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact the administrator',
    });
  }
};

const createTodo = async (req, res = response) => {
  const {
    tableId,
    name,
    desc,
    status,
    date = new Date(),
    comments = [],
  } = req.body;

  try {
    const newTodo = await Todo.create({
      name,
      status,
      date,
      comments,
      desc,
      table: tableId,
    });

    await Table.findByIdAndUpdate(tableId, {
      $push: { todos: newTodo._id },
    });

    writefile({
      ip: req.connection.remoteAddress,
      user: req.user.id,
      date: new Date(),
      operation: 'Created a todo',
    });

    res.status(201).json({
      ok: true,
      todo: newTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact the administrator',
    });
  }
};

const updateTodo = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    writefile({
      ip: req.socket.remoteAddress,
      user: req.user.id,
      date: new Date(),
      operation: 'Updated a todo',
    });

    res.status(200).json({
      ok: true,
      todo: updateTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact the administrator',
    });
  }
};

const deleteTodo = async (req, res = response) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);

    const comments = todo.comments;
    if (comments && comments.length > 0) {
      await Comment.deleteMany({ _id: { $in: comments } });
    }

    await Todo.findByIdAndDelete(id);

    writefile({
      ip: req.connection.remoteAddress,
      user: req.user.id,
      date: new Date(),
      operation: 'Deleted a todo',
    });

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact the administrator',
    });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
