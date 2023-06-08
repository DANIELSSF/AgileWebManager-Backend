const { response, request } = require('express');

const { writefile } = require('../helpers/writteHistoy');
const Table = require('../models/Table');
const Todo = require('../models/Todo');

const getTables = async (req, res = response) => {
  try {
    const tables = await Table.find();
    return res.status(200).json({
      ok: true,
      tables,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Talk to the administrator',
    });
  }
};

const createTable = async (req, res = response) => {
  const { name, desc, date = new Date(), todos = [] } = req.body;
  try {
    const createdTable = await Table.create({
      name,
      desc,
      date,
      todos,
    });

    writefile({
      ip: req.connection.remoteAddress,
      user: req.user.uid,
      date,
      operation: 'Create a table',
    });

    res.status(201).json({
      ok: true,
      table: createdTable,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Talk to the administrator',
    });
  }
};

const deleteTable = async (req, res = response) => {
  const { id } = req.params;
  try {
    const table = await Table.findById(id);

    if (!table) {
      return res.status(404).json({
        ok: false,
        msg: 'No table found with this id',
      });
    }

    const todos = table.todos;
    if (todos && todos.length > 0) {
      await Todo.deleteMany({ _id: { $in: todos } });
    }

    await Table.findByIdAndDelete(id);

    writefile({
      ip: req.connection.remoteAddress,
      user: req.user.uid,
      date: new Date(),
      operation: 'Deleted a table',
    });

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

const updateTable = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const table = await Table.findById(id);

    if (!table) {
      return res.status(404).json({
        ok: false,
        msg: 'Table does not exist for this id',
      });
    }

    const updatedFields = { ...req.body };
    const tableUpdate = await Table.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    writefile({
      ip: req.socket.remoteAddress,
      user: req.user.uid,
      date: new Date(),
      operation: 'Updated a table',
    });

    res.json({
      ok: true,
      table: tableUpdate,
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
  getTables,
  createTable,
  deleteTable,
  updateTable,
};
