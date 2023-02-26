const { response, request } = require("express");
const Table = require("../models/Table");

const getTables = async (req, res = response) => {
  try {
    const tables = await Table.find().populate("todo", "name status");
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
    table.todo = [];
    const tableSaved = await table.save();

    res.status(201).json({
      ok: true,
      event: tableSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
};


const deleteTable = async (req,res = response) => {
    const tableId = req.params.id;
    try {
      const table = await Table.findById(tableId);
  
      if (!table) {
        return res.status(404).json({
          ok: false,
          msg: "no table found with this id",
        });
      }

      await Table.findByIdAndDelete(tableId);
  
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
}
module.exports = {
  getTables,
  createTable,
  deleteTable,
};
