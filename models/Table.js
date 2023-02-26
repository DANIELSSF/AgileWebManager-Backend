const { Schema, model } = require("mongoose");

const TableSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  todo: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

module.exports = model("Table", TableSchema);
