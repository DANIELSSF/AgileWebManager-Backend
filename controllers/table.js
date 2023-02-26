const { response, request } = require("express");
const Table = require("../models/Table");

const getTables = async (req, res = response) => {
  try {
    const tables = await Table.find().populate("todo", "name", "status");
    return res.status(200).json({
      ok: true,
      tables,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please speak to the administrator",
    });
  }
};

module.exports = {
  getTables,
};
