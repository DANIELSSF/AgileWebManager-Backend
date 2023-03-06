const { response, request } = require("express");
const { getName } = require("../helpers/getName");
const { writefile } = require("../helpers/wirtteHistoy");
const Table = require("../models/Table");
const Todo = require("../models/Todo");

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
      msg: "Talk to the administrator",
    });
  }
};

const createTable = async (req, res = response) => {
  const table = new Table(req.body);
  try {
    table.todos = [];
    table.date = new Date();
    const tableSaved = await table.save();

    const token = req.header("x-token");
    const ipAddress = req.connection.remoteAddress;
    writefile({
      ip: ipAddress,
      user: getName(token),
      date: new Date(),
      operation: "Creo una tabla",
    });

    res.status(201).json({
      ok: true,
      table: tableSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
};

const deleteTable = async (req, res = response) => {
  const tableId = req.params.id;
  try {
    const table = await Table.findById(tableId);

    if (!table) {
      return res.status(404).json({
        ok: false,
        msg: "no table found with this id",
      });
    }

    const todos = table.todos;

    if (todos) {
      todos.forEach(async (todo) => {
        await Todo.findByIdAndDelete(todo);
      });
    }
    await Table.findByIdAndDelete(tableId);

    const token = req.header("x-token");
    const ipAddress = req.connection.remoteAddress;
    writefile({
      ip: ipAddress,
      user: getName(token),
      date: new Date(),
      operation: "Elimino una tabla",
    });

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

const updateTable = async (req = request, res = response) => {
  const tableId = req.params.id;
  try {
    const table = await Table.findById(tableId);

    if (!table) {
      return res.status(404).json({
        ok: false,
        msg: "Table does not exist for this id",
      });
    }

    const newTable = {
      ...req.body,
    };

    const tableUpdate = await Table.findByIdAndUpdate(tableId, newTable, {
      new: true,
    });

    const token = req.header("x-token");
    const ipAddress = req.socket.remoteAddress;
    writefile({
      ip: ipAddress,
      user: getName(token),
      date: new Date(),
      operation: "Actualizo una tabla",
    });

    res.json({
      ok: true,
      table: tableUpdate,
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
  getTables,
  createTable,
  deleteTable,
  updateTable,
};
